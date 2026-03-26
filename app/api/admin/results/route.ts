import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import type { QuizAttempt } from '@/lib/quiz';

// NOTE: This uses a simple query-parameter password suitable for US-000.
// US-010 will replace this with proper middleware-based authentication.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const password = searchParams.get('password');
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || password !== adminPassword) {
    return NextResponse.json({ error: 'Obehörig' }, { status: 401 });
  }

  const sql = getDb();

  try {
    const rows = await sql`
      SELECT id, student_name, student_id, score, passed, answers, correct_mask, attempted_at
      FROM quiz_attempts
      ORDER BY attempted_at DESC
    `;

    const attempts: QuizAttempt[] = rows.map((r) => ({
      id: r.id as number,
      student_name: r.student_name as string,
      student_id: r.student_id as string,
      score: r.score as number,
      passed: r.passed as boolean,
      answers: r.answers as number[],
      correct_mask: r.correct_mask as boolean[],
      attempted_at: r.attempted_at instanceof Date
        ? r.attempted_at.toISOString()
        : String(r.attempted_at),
    }));

    // Aggregate per student
    const studentMap = new Map<string, {
      student_name: string;
      student_id: string;
      attemptCount: number;
      bestScore: number;
      passed: boolean;
      lastAttempt: string;
      attempts: QuizAttempt[];
    }>();

    for (const a of attempts) {
      const existing = studentMap.get(a.student_id);
      if (!existing) {
        studentMap.set(a.student_id, {
          student_name: a.student_name,
          student_id: a.student_id,
          attemptCount: 1,
          bestScore: a.score,
          passed: a.passed,
          lastAttempt: a.attempted_at,
          attempts: [a],
        });
      } else {
        existing.attemptCount += 1;
        if (a.score > existing.bestScore) existing.bestScore = a.score;
        if (a.passed) existing.passed = true;
        existing.attempts.push(a);
      }
    }

    return NextResponse.json({
      students: Array.from(studentMap.values()),
      totalAttempts: attempts.length,
    });
  } catch (error) {
    console.error('Admin results error:', error);
    return NextResponse.json({ error: 'Databasfel' }, { status: 500 });
  }
}
