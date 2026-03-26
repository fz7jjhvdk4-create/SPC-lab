/**
 * Deterministic shuffle utilities for quiz randomization.
 *
 * Uses a seeded PRNG (mulberry32) so that both client (display) and
 * server (answer evaluation) can independently recreate the exact same
 * shuffle from the student ID – without transmitting the correct answers.
 */

// Mulberry32 seeded PRNG – fast, simple, good distribution
function createPRNG(seed: number): () => number {
  let s = seed;
  return function (): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// djb2 string hash → 32-bit integer seed
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Fisher-Yates shuffle using provided RNG
function fisherYates<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export interface QuestionShuffle {
  originalIndex: number;       // which original question is at this shuffled position
  optionPermutation: number[]; // optionPermutation[shuffledPos] = originalOptionPos
}

/**
 * Build the full shuffle mapping for a student.
 * Call this with the same studentId on both client and server to get identical results.
 */
export function buildShuffle(
  studentId: string,
  numQuestions: number,
  numOptions: number
): QuestionShuffle[] {
  const rng = createPRNG(hashString(studentId));

  // Shuffle question order
  const questionIndices = Array.from({ length: numQuestions }, (_, i) => i);
  const shuffledQuestionIndices = fisherYates(questionIndices, rng);

  // Shuffle option order for each (shuffled) question
  return shuffledQuestionIndices.map((originalIndex) => {
    const optionIndices = Array.from({ length: numOptions }, (_, i) => i);
    const optionPermutation = fisherYates(optionIndices, rng);
    return { originalIndex, optionPermutation };
  });
}

/**
 * Apply a shuffle to questions (client-side, no correctIndex).
 * Returns questions with options reordered; original IDs and topics preserved.
 */
export function applyShuffleToQuestions<T extends { options: string[] }>(
  questions: T[],
  shuffle: QuestionShuffle[]
): T[] {
  return shuffle.map(({ originalIndex, optionPermutation }) => {
    const q = questions[originalIndex];
    return {
      ...q,
      options: optionPermutation.map((origPos) => q.options[origPos]),
    };
  });
}

/**
 * Evaluate student answers against the original questions using the shuffle mapping.
 * Returns a boolean mask in shuffled order: correctMask[i] = true if answer[i] is correct.
 */
export function evaluateShuffledAnswers(
  originalQuestions: Array<{ correctIndex: number }>,
  shuffle: QuestionShuffle[],
  answers: number[]
): boolean[] {
  return shuffle.map(({ originalIndex, optionPermutation }, i) => {
    const originalCorrectIndex = originalQuestions[originalIndex].correctIndex;
    const studentShuffledOptionIndex = answers[i];
    // Map the student's chosen shuffled option back to the original option position
    const originalOptionChosen = optionPermutation[studentShuffledOptionIndex];
    return originalOptionChosen === originalCorrectIndex;
  });
}
