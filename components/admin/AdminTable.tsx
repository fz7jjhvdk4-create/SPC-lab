'use client';

import { useState } from 'react';
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

interface AdminTableProps {
  students: StudentSummary[];
  totalAttempts: number;
}

export default function AdminTable({ students, totalAttempts }: AdminTableProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const passedCount = students.filter((s) => s.passed).length;

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
          <div className="text-3xl font-bold text-[#1F4E79]">{students.length}</div>
          <div className="text-xs text-[#64748B] mt-1">Studenter</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
          <div className="text-3xl font-bold text-[#1D9E75]">{passedCount}</div>
          <div className="text-xs text-[#64748B] mt-1">Godkända</div>
        </div>
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 text-center">
          <div className="text-3xl font-bold text-[#64748B]">{totalAttempts}</div>
          <div className="text-xs text-[#64748B] mt-1">Totala försök</div>
        </div>
      </div>

      {students.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 text-center text-[#64748B] text-sm">
          Inga duggaförsök registrerade ännu.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F5F6F8]">
                <th className="text-left px-4 py-3 font-semibold text-[#1a1a2e]">Namn</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1a1a2e]">Student-ID</th>
                <th className="text-center px-4 py-3 font-semibold text-[#1a1a2e]">Försök</th>
                <th className="text-center px-4 py-3 font-semibold text-[#1a1a2e]">Bästa poäng</th>
                <th className="text-center px-4 py-3 font-semibold text-[#1a1a2e]">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-[#1a1a2e]">Senaste försök</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <>
                  <tr
                    key={s.student_id}
                    className="border-b border-[#E2E8F0] hover:bg-[#F5F6F8] transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-[#1a1a2e]">{s.student_name}</td>
                    <td className="px-4 py-3 text-[#64748B] font-mono text-xs">{s.student_id}</td>
                    <td className="px-4 py-3 text-center text-[#1a1a2e]">{s.attemptCount}</td>
                    <td className="px-4 py-3 text-center font-bold text-[#1F4E79]">{s.bestScore}/10</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          s.passed
                            ? 'bg-[#1D9E75]/10 text-[#1D9E75]'
                            : 'bg-[#E24B4A]/10 text-[#E24B4A]'
                        }`}
                      >
                        {s.passed ? '✓ Godkänd' : '✗ Ej godkänd'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#64748B] text-xs">
                      {new Date(s.lastAttempt).toLocaleString('sv-SE', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setExpandedId(expandedId === s.student_id ? null : s.student_id)}
                        className="text-xs text-[#1F4E79] hover:text-[#2E75B6]"
                      >
                        {expandedId === s.student_id ? 'Dölj' : 'Detaljer'}
                      </button>
                    </td>
                  </tr>
                  {expandedId === s.student_id && (
                    <tr key={`${s.student_id}-detail`} className="bg-[#F5F6F8]">
                      <td colSpan={7} className="px-6 py-3">
                        <p className="text-xs font-semibold text-[#64748B] mb-2">Alla försök:</p>
                        <div className="space-y-1">
                          {s.attempts.map((a) => (
                            <div key={a.id} className="flex items-center gap-4 text-xs text-[#1a1a2e]">
                              <span className={`w-16 font-medium ${a.passed ? 'text-[#1D9E75]' : 'text-[#E24B4A]'}`}>
                                {a.passed ? '✓ Godkänd' : '✗ Misslyckad'}
                              </span>
                              <span className="font-bold">{a.score}/10</span>
                              <span className="text-[#64748B]">
                                {new Date(a.attempted_at).toLocaleString('sv-SE')}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
