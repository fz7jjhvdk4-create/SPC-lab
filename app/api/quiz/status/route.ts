import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { QuizStatus } from '@/lib/quiz';
import quizConfig from '@/data/quiz-questions.json';

const COOLDOWN_MINUTES = quizConfig.meta.cooldownMinutes;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get('studentId');

  if (!studentId || studentId.trim() === '') {
    return NextResponse.json({ error: 'studentId krävs' }, { status: 400 });
  }

  const sql = getDb();

  try {
    const rows = await sql`
      SELECT passed, attempted_at
      FROM quiz_attempts
      WHERE student_id = ${studentId.trim()}
      ORDER BY attempted_at DESC
    `;

    const alreadyPassed = rows.some((r) => r.passed === true);
    const attemptCount = rows.length;

    let cooldownActive = false;
    let cooldownSecondsRemaining = 0;

    if (!alreadyPassed && attemptCount > 0) {
      const latestFailed = rows.find((r) => r.passed === false);
      if (latestFailed) {
        const attemptedAt = new Date(latestFailed.attempted_at as string).getTime();
        const now = Date.now();
        const elapsedSeconds = (now - attemptedAt) / 1000;
        const cooldownSeconds = COOLDOWN_MINUTES * 60;

        if (elapsedSeconds < cooldownSeconds) {
          cooldownActive = true;
          cooldownSecondsRemaining = Math.ceil(cooldownSeconds - elapsedSeconds);
        }
      }
    }

    const status: QuizStatus = {
      alreadyPassed,
      cooldownActive,
      cooldownSecondsRemaining,
      attemptCount,
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Quiz status error:', error);
    return NextResponse.json({ error: 'Databasfel' }, { status: 500 });
  }
}
