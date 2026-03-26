'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/lib/quiz';

interface QuizFormProps {
  questions: QuizQuestion[];
  studentName: string;
  onSubmit: (answers: number[]) => void;
  submitting: boolean;
}

export default function QuizForm({ questions, studentName, onSubmit, submitting }: QuizFormProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));

  const allAnswered = answers.every((a) => a !== null);
  const answeredCount = answers.filter((a) => a !== null).length;

  function handleSelect(questionIndex: number, optionIndex: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  }

  function handleSubmit() {
    if (!allAnswered) return;
    onSubmit(answers as number[]);
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 pb-12">
      {/* Attribution banner */}
      <div className="mb-6 bg-[#1F4E79]/8 border border-[#1F4E79]/20 rounded-lg p-4">
        <p className="text-sm text-[#1F4E79] font-medium">
          Frågorna baseras på Bergman &amp; Klefsjö – <em>Kvalitet från behov till användning</em>
        </p>
        <p className="text-xs text-[#64748B] mt-1">Läs kapitel 7, 8, 17 och 18 som förberedelse.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 mb-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-[#1a1a2e]">{studentName}</p>
          <p className="text-xs text-[#64748B]">Förkunskapsdugga – SPC och statistisk processtyrning</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-[#1F4E79]">{answeredCount}</span>
          <span className="text-[#64748B] text-sm">/{questions.length} besvarade</span>
        </div>
      </div>

      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5">
            <div className="flex items-start gap-3 mb-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1F4E79] text-white text-xs font-bold flex items-center justify-center">
                {q.id}
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] mb-1">{q.topic}</p>
                <p className="text-sm font-medium text-[#1a1a2e] leading-relaxed">{q.question}</p>
                <p className="text-[10px] text-[#94A3B8] mt-1">{q.reference}</p>
              </div>
            </div>
            <div className="space-y-2 ml-10">
              {q.options.map((option, oi) => {
                const selected = answers[qi] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => handleSelect(qi, oi)}
                    disabled={submitting}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                      selected
                        ? 'border-[#1F4E79] bg-[#1F4E79]/5 text-[#1F4E79] font-medium'
                        : 'border-[#E2E8F0] hover:border-[#2E75B6] hover:bg-[#F5F6F8] text-[#1a1a2e]'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + oi)}.</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 sticky bottom-4">
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="w-full bg-[#1F4E79] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#2E75B6] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
        >
          {submitting ? 'Lämnar in…' : `Lämna in svar (${answeredCount}/${questions.length})`}
        </button>
      </div>
    </div>
  );
}
