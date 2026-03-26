'use client';

import { useState } from 'react';
import type { QuizQuestion, QuizStatus } from '@/lib/quiz';
import QuizForm from './QuizForm';
import QuizResult from './QuizResult';
import type { QuizSubmitResult } from '@/lib/quiz';

type Stage =
  | { type: 'IDLE' }
  | { type: 'CHECKING' }
  | { type: 'ALREADY_PASSED'; attemptCount: number }
  | { type: 'COOLDOWN_ACTIVE'; secondsRemaining: number; attemptCount: number }
  | { type: 'READY_FOR_QUIZ'; attemptCount: number }
  | { type: 'SUBMITTING' }
  | { type: 'RESULT'; result: QuizSubmitResult };

interface StudentIdFormProps {
  questions: QuizQuestion[];
  cooldownMinutes: number;
}

export default function StudentIdForm({ questions, cooldownMinutes }: StudentIdFormProps) {
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [stage, setStage] = useState<Stage>({ type: 'IDLE' });
  const [error, setError] = useState('');

  async function checkStatus() {
    if (!studentName.trim() || !studentId.trim()) {
      setError('Fyll i både namn och student-ID.');
      return;
    }
    setError('');
    setStage({ type: 'CHECKING' });

    try {
      const res = await fetch(`/api/quiz/status?studentId=${encodeURIComponent(studentId.trim())}`);
      const data: QuizStatus = await res.json();

      if (data.alreadyPassed) {
        setStage({ type: 'ALREADY_PASSED', attemptCount: data.attemptCount });
      } else if (data.cooldownActive) {
        setStage({ type: 'COOLDOWN_ACTIVE', secondsRemaining: data.cooldownSecondsRemaining, attemptCount: data.attemptCount });
      } else {
        setStage({ type: 'READY_FOR_QUIZ', attemptCount: data.attemptCount });
      }
    } catch {
      setError('Kunde inte kontrollera status. Försök igen.');
      setStage({ type: 'IDLE' });
    }
  }

  async function handleSubmit(answers: number[]) {
    setStage({ type: 'SUBMITTING' });
    try {
      const res = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentName: studentName.trim(), studentId: studentId.trim(), answers }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setStage({ type: 'ALREADY_PASSED', attemptCount: 1 });
        return;
      }
      if (res.status === 429) {
        setStage({ type: 'COOLDOWN_ACTIVE', secondsRemaining: data.cooldownSecondsRemaining ?? 600, attemptCount: 1 });
        return;
      }
      if (!res.ok) {
        setError('Fel vid inlämning. Försök igen.');
        setStage({ type: 'READY_FOR_QUIZ', attemptCount: 0 });
        return;
      }

      setStage({ type: 'RESULT', result: data as QuizSubmitResult });
    } catch {
      setError('Nätverksfel. Försök igen.');
      setStage({ type: 'READY_FOR_QUIZ', attemptCount: 0 });
    }
  }

  function handleRetry() {
    setStage({ type: 'IDLE' });
  }

  if (stage.type === 'READY_FOR_QUIZ' || stage.type === 'SUBMITTING') {
    return (
      <QuizForm
        questions={questions}
        studentName={studentName.trim()}
        onSubmit={handleSubmit}
        submitting={stage.type === 'SUBMITTING'}
      />
    );
  }

  if (stage.type === 'RESULT') {
    return (
      <QuizResult
        result={stage.result}
        questions={questions}
        studentName={studentName.trim()}
        cooldownMinutes={cooldownMinutes}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-8 px-4">
      {stage.type === 'ALREADY_PASSED' && (
        <div className="mb-6 bg-[#1D9E75]/10 border border-[#1D9E75] rounded-lg p-4 text-[#1D9E75] font-medium">
          ✓ Du är redan godkänd på duggan och har tillgång till laborationen.
        </div>
      )}

      {stage.type === 'COOLDOWN_ACTIVE' && (
        <div className="mb-6 bg-[#BA7517]/10 border border-[#BA7517] rounded-lg p-4 text-[#BA7517]">
          <p className="font-medium">Du har nyligen gjort ett misslyckat försök.</p>
          <p className="text-sm mt-1">Vänta {Math.ceil(stage.secondsRemaining / 60)} minuter innan du försöker igen.</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6">
        <h2 className="text-xl font-bold text-[#1a1a2e] mb-1">Identifiera dig</h2>
        <p className="text-sm text-[#64748B] mb-6">
          Ange ditt namn och student-ID för att kontrollera din behörighet eller starta duggan.
        </p>

        {error && (
          <div className="mb-4 bg-[#E24B4A]/10 border border-[#E24B4A] rounded-lg p-3 text-[#E24B4A] text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Namn
            </label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="För- och efternamn"
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
              disabled={stage.type === 'CHECKING'}
              onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
            />
          </div>
          <div>
            <label htmlFor="studentId" className="block text-sm font-medium text-[#1a1a2e] mb-1">
              Student-ID
            </label>
            <input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="t.ex. abc123"
              className="w-full border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4E79] focus:border-transparent"
              disabled={stage.type === 'CHECKING'}
              onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
            />
          </div>
          <button
            onClick={checkStatus}
            disabled={stage.type === 'CHECKING'}
            className="w-full bg-[#1F4E79] text-white py-2.5 rounded-lg font-medium text-sm hover:bg-[#2E75B6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {stage.type === 'CHECKING' ? 'Kontrollerar…' : 'Kontrollera status'}
          </button>
        </div>
      </div>
    </div>
  );
}
