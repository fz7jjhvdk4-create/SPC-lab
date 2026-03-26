export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: string[];
  reference: string;
}

export interface QuizQuestionWithAnswer extends QuizQuestion {
  correctIndex: number;
}

export interface QuizConfig {
  meta: {
    source: string;
    chapters: string[];
    passingScore: number;
    totalQuestions: number;
    cooldownMinutes: number;
  };
  questions: QuizQuestionWithAnswer[];
}

export interface QuizAttempt {
  id: number;
  student_name: string;
  student_id: string;
  score: number;
  passed: boolean;
  answers: number[];
  correct_mask: boolean[];
  attempted_at: string;
}

export interface QuizStatus {
  alreadyPassed: boolean;
  cooldownActive: boolean;
  cooldownSecondsRemaining: number;
  attemptCount: number;
}

export interface QuizSubmitResult {
  passed: boolean;
  score: number;
  total: number;
  correctMask: boolean[];
  wrongQuestionIds: number[];
}
