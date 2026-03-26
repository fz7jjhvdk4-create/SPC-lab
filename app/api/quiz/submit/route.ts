import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { QuizSubmitResult } from '@/lib/quiz';
import { buildShuffle, evaluateShuffledAnswers } from '@/lib/shuffle';
import quizConfig from '@/data/quiz-questions.json';

const PASSING_SCORE = quizConfig.meta.passingScore;
const COOLDOWN_MINUTES = quizConfig.meta.cooldownMinutes;
const TOTAL_QUESTIONS = quizConfig.meta.totalQuestions;
const NUM_OPTIONS = 4;

export async function POST(request: NextRequest) {
  let body: { studentName?: unknown; studentId?: unknown; answers?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON-kropp' }, { status: 400 });
  }

  const { studentName, studentId, answers } = body;

  if (
    typeof studentName !== 'string' || studentName.trim() === '' ||
    typeof studentId !== 'string' || studentId.trim() === '' ||
    !Array.isArray(answers) || answers.length !== TOTAL_QUESTIONS ||
    !answers.every((a) => typeof a === 'number' && a >= 0 && a <= NUM_OPTIONS - 1)
  ) {
    return NextResponse.json({ error: 'Ogiltig inlämning' }, { status: 400 });
  }

  const cleanName = studentName.trim();
  const cleanId = studentId.trim();
  const sql = getDb();

  try {
    // Check if already passed
    const passedRows = await sql`
      SELECT id FROM quiz_attempts
      WHERE student_id = ${cleanId} AND passed = true
      LIMIT 1
    `;
    if (passedRows.length > 0) {
      return NextResponse.json({ error: 'already_passed' }, { status: 409 });
    }

    // Enforce cooldown server-side
    const latestFailed = await sql`
      SELECT attempted_at FROM quiz_attempts
      WHERE student_id = ${cleanId} AND passed = false
      ORDER BY attempted_at DESC
      LIMIT 1
    `;
    if (latestFailed.length > 0) {
      const attemptedAt = new Date(latestFailed[0].attempted_at as string).getTime();
      const elapsedSeconds = (Date.now() - attemptedAt) / 1000;
      const cooldownSeconds = COOLDOWN_MINUTES * 60;
      if (elapsedSeconds < cooldownSeconds) {
        const remaining = Math.ceil(cooldownSeconds - elapsedSeconds);
        return NextResponse.json(
          { error: 'cooldown_active', cooldownSecondsRemaining: remaining },
          { status: 429 }
        );
      }
    }

    // Reconstruct the same shuffle the student saw, using their student ID as seed.
    // This is identical to what the client computed in StudentIdForm.
    const shuffle = buildShuffle(cleanId, TOTAL_QUESTIONS, NUM_OPTIONS);

    // Evaluate answers using the shuffle mapping (correctIndex stays server-side only)
    const correctMask = evaluateShuffledAnswers(
      quizConfig.questions,
      shuffle,
      answers as number[]
    );

    const score = correctMask.filter(Boolean).length;
    const passed = score >= PASSING_SCORE;

    // Wrong question IDs in shuffled order (client can match these by position)
    const wrongQuestionIds = shuffle
      .map((s, i) => ({ id: quizConfig.questions[s.originalIndex].id, correct: correctMask[i] }))
      .filter((x) => !x.correct)
      .map((x) => x.id);

    // Persist to database
    await sql`
      INSERT INTO quiz_attempts (student_name, student_id, score, passed, answers, correct_mask)
      VALUES (
        ${cleanName},
        ${cleanId},
        ${score},
        ${passed},
        ${JSON.stringify(answers)},
        ${JSON.stringify(correctMask)}
      )
    `;

    const result: QuizSubmitResult = {
      passed,
      score,
      total: TOTAL_QUESTIONS,
      correctMask,
      wrongQuestionIds,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Quiz submit error:', error);
    return NextResponse.json({ error: 'Databasfel' }, { status: 500 });
  }
}
