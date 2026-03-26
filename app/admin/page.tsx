import AdminTable from '@/components/admin/AdminTable';
import { getDb } from '@/lib/db';
import type { QuizAttempt } from '@/lib/quiz';

interface StudentSummary {
  student_name: string;
  student_id: string;
  attemptCount: number;
  bestScore: number;
  passed: boolean;
  lastAttempt: string;
  attempts: QuizAttempt[];
}

interface AdminPageProps {
  searchParams: Promise<{ password?: string }>;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const { password } = await searchParams;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!password) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-8 max-w-sm w-full mx-4">
          <h1 className="text-xl font-bold text-[#1a1a2e] mb-2">Lärarportal</h1>
          <p className="text-sm text-[#64748B] mb-6">Ange lösenord i URL-parametern för att komma åt resultaten.</p>
          <div className="bg-[#F5F6F8] rounded-lg p-3 font-mono text-xs text-[#64748B]">
            /admin?password=DITTLÖSENORD
          </div>
        </div>
      </div>
    );
  }

  if (!adminPassword || password !== adminPassword) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="bg-white rounded-xl border border-[#E24B4A] shadow-sm p-8 max-w-sm w-full mx-4 text-center">
          <p className="text-[#E24B4A] font-medium">Fel lösenord.</p>
        </div>
      </div>
    );
  }

  let students: StudentSummary[] = [];
  let totalAttempts = 0;
  let error = '';

  try {
    const sql = getDb();
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

    totalAttempts = attempts.length;

    const studentMap = new Map<string, StudentSummary>();
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
    students = Array.from(studentMap.values());
  } catch (e) {
    console.error('Admin page DB error:', e);
    error = 'Databasfel – kontrollera att DATABASE_URL är korrekt konfigurerad.';
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="bg-white rounded-xl border border-[#E24B4A] shadow-sm p-8 max-w-sm w-full mx-4 text-center">
          <p className="text-[#E24B4A] font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className="max-w-4xl mx-auto pt-8 px-4 pb-12">
        <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1">Lärarportal</h1>
        <p className="text-sm text-[#64748B] mb-6">Duggoresultat per student – SPC-Lab</p>
        <AdminTable students={students} totalAttempts={totalAttempts} />
      </div>
    </div>
  );
}
