export function validateResult(data) {
  if (!data || typeof data !== "object") {
    return {
      valid: false,
      error: "The AI returned an invalid response.",
    };
  }

  if (!Array.isArray(data.cards)) {
    return {
      valid: false,
      error: "Flashcards were not returned correctly.",
    };
  }

  if (!Array.isArray(data.quiz)) {
    return {
      valid: false,
      error: "Quiz questions were not returned correctly.",
    };
  }

  if (data.cards.length === 0) {
    return {
      valid: false,
      error: "No flashcards were generated.",
    };
  }

  if (data.quiz.length === 0) {
    return {
      valid: false,
      error: "No quiz questions were generated.",
    };
  }

  for (const card of data.cards) {
    if (
      !card ||
      typeof card.question !== "string" ||
      typeof card.answer !== "string" ||
      !card.question.trim() ||
      !card.answer.trim()
    ) {
      return {
        valid: false,
        error: "One or more flashcards have an invalid format.",
      };
    }
  }

  for (const question of data.quiz) {
    if (
      !question ||
      typeof question.question !== "string" ||
      !Array.isArray(question.options) ||
      typeof question.correctAnswer !== "string"
    ) {
      return {
        valid: false,
        error: "One or more quiz questions have an invalid format.",
      };
    }

    if (question.options.length !== 4) {
      return {
        valid: false,
        error: "Each quiz question must have four options.",
      };
    }

    if (!question.options.includes(question.correctAnswer)) {
      return {
        valid: false,
        error: "A quiz answer does not match its options.",
      };
    }
  }

  return {
    valid: true,
    error: null,
  };
}