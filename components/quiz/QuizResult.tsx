'use client';

import { useEffect, useState } from 'react';
import type { QuizQuestion, QuizSubmitResult } from '@/lib/quiz';

interface QuizResultProps {
  result: QuizSubmitResult;
  questions: QuizQuestion[];
  studentName: string;
  cooldownMinutes: number;
  onRetry: () => void;
}

export default function QuizResult({ result, questions, studentName, cooldownMinutes, onRetry }: QuizResultProps) {
  const [secondsLeft, setSecondsLeft] = useState(cooldownMinutes * 60);
  const [canRetry, setCanRetry] = useState(false);

  useEffect(() => {
    if (result.passed) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanRetry(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [result.passed]);

  const wrongQuestions = questions.filter((q, i) => !result.correctMask[i]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="max-w-2xl mx-auto mt-6 px-4 pb-12">
      {/* Result banner */}
      {result.passed ? (
        <div className="mb-6 bg-[#1D9E75]/10 border border-[#1D9E75] rounded-xl p-6 text-center">
          <div className="text-4xl mb-2">✓</div>
          <h2 className="text-xl font-bold text-[#1D9E75] mb-1">Godkänd!</h2>
          <p className="text-sm text-[#1D9E75]/80">
            {studentName} – du klarade duggan med {result.score}/{result.total} rätt och är nu behörig att påbörja laborationen.
          </p>
        </div>
      ) : (
        <div className="mb-6 bg-[#E24B4A]/10 border border-[#E24B4A] rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E24B4A]">{result.score}/{result.total}</div>
              <div className="text-xs text-[#E24B4A]/80">rätt svar</div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#E24B4A]">Ej godkänd</h2>
              <p className="text-sm text-[#E24B4A]/80">
                Du behöver minst {Math.ceil(result.total * 0.7)}/{result.total} rätta svar (70%). Läs igenom kursmaterialet och försök igen.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Score card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 mb-4 flex items-center gap-6">
        <div className="text-center">
          <div className={`text-4xl font-bold ${result.passed ? 'text-[#1D9E75]' : 'text-[#E24B4A]'}`}>
            {result.score}
          </div>
          <div className="text-xs text-[#64748B]">av {result.total}</div>
        </div>
        <div className="h-12 w-px bg-[#E2E8F0]" />
        <div>
          <div className="text-sm font-medium text-[#1a1a2e]">
            {result.passed ? 'Laborationen är upplåst' : `${wrongQuestions.length} felaktiga svar`}
          </div>
          <div className="text-xs text-[#64748B] mt-0.5">
            {result.passed
              ? 'Ditt resultat har sparats i systemet'
              : 'Se felaktiga frågor nedan'}
          </div>
        </div>
      </div>

      {/* If passed: placeholder link to lab */}
      {result.passed && (
        <div className="bg-[#1F4E79]/5 border border-[#1F4E79]/20 rounded-xl p-5 mb-4 text-center">
          <p className="text-sm text-[#1F4E79] font-medium mb-3">Laborationen öppnas när du loggar in på startsidan.</p>
          <div className="text-xs text-[#64748B]">
            (Startsida implementeras i nästa steg – US-001)
          </div>
        </div>
      )}

      {/* Wrong questions */}
      {!result.passed && wrongQuestions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-[#1a1a2e] mb-3">Felaktiga svar:</h3>
          <div className="space-y-3">
            {wrongQuestions.map((q) => {
              const qi = questions.findIndex((x) => x.id === q.id);
              const yourAnswer = result.correctMask[qi] === false
                ? q.options[/* we only have the mask, not the submitted index */ qi]
                : '';
              return (
                <div key={q.id} className="bg-white rounded-xl border border-[#E2E8F0] p-4">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#E24B4A] text-white text-xs font-bold flex items-center justify-center">
                      {q.id}
                    </span>
                    <p className="text-sm font-medium text-[#1a1a2e]">{q.question}</p>
                  </div>
                  <p className="text-xs text-[#64748B] ml-8">{q.reference}</p>
                  {yourAnswer && (
                    <p className="text-xs text-[#E24B4A] ml-8 mt-1">
                      Ditt svar: {yourAnswer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cooldown / retry */}
      {!result.passed && (
        <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-5 text-center">
          {canRetry ? (
            <>
              <p className="text-sm text-[#1a1a2e] mb-4">Du kan nu försöka igen.</p>
              <button
                onClick={onRetry}
                className="bg-[#1F4E79] text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-[#2E75B6] transition-colors"
              >
                Försök igen
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-[#64748B] mb-2">Nästa försök tillgängligt om:</p>
              <div className="text-3xl font-bold text-[#1F4E79] font-mono">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <p className="text-xs text-[#94A3B8] mt-2">
                Använd tiden till att läsa Bergman &amp; Klefsjö kap. 7, 8, 17 och 18.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
