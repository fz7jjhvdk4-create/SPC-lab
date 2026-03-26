import quizConfig from '@/data/quiz-questions.json';
import type { QuizQuestion } from '@/lib/quiz';
import StudentIdForm from '@/components/quiz/StudentIdForm';

// Strip correctIndex before passing questions to the client
function stripCorrectIndex(questions: typeof quizConfig.questions): QuizQuestion[] {
  return questions.map(({ id, topic, question, options, reference }) => ({
    id, topic, question, options, reference,
  }));
}

export default function QuizPage() {
  const questions = stripCorrectIndex(quizConfig.questions);
  const { cooldownMinutes, passingScore, totalQuestions, source } = quizConfig.meta;

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <div className="max-w-2xl mx-auto pt-8 px-4">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1a1a2e]">Förkunskapsdugga</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Besvara {totalQuestions} frågor om statistisk processtyrning. Du behöver minst {passingScore}/{totalQuestions} rätta svar ({Math.round(passingScore / totalQuestions * 100)}%) för att låsa upp laborationen.
          </p>
        </div>

        {/* Info box */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 mb-6 shadow-sm">
          <h2 className="text-sm font-semibold text-[#1a1a2e] mb-3">Vad du behöver kunna</h2>
          <p className="text-xs text-[#64748B] mb-3">
            Frågorna baseras på <strong>{source}</strong> och täcker följande ämnen:
          </p>
          <ul className="text-xs text-[#64748B] space-y-1 list-disc list-inside">
            <li>Variation – slumpmässig vs urskiljbar variation (common/special cause)</li>
            <li>Styrdiagrammets syfte och uppbyggnad</li>
            <li>Skillnaden mellan styrgränser (UCL/LCL) och toleransgränser (USL/LSL)</li>
            <li>Vad det innebär att en process är under statistisk kontroll</li>
            <li>Processduglighetsindex Cp och Cpk</li>
            <li>Tolkning av högt respektive lågt Cpk-värde</li>
            <li>Syftet med delgrupper</li>
            <li>Nelsonregel 1</li>
          </ul>
          <p className="text-xs text-[#94A3B8] mt-3">
            Vid underkänt resultat gäller {cooldownMinutes} minuters väntetid innan nytt försök.
          </p>
        </div>
      </div>

      <StudentIdForm questions={questions} cooldownMinutes={cooldownMinutes} />
    </div>
  );
}
