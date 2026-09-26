const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

if (!process.env.GROQ_API_KEY) {
  console.error("GROQ_API_KEY is missing in server/.env");
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function validateResult(result) {
  if (!result || typeof result !== "object") {
    throw new Error("AI returned an invalid response.");
  }

  if (typeof result.text !== "string" || !result.text.trim()) {
    throw new Error("AI returned empty study material.");
  }

  if (!Array.isArray(result.cards) || result.cards.length !== 5) {
    throw new Error("AI did not return exactly 5 flashcards.");
  }

  if (!Array.isArray(result.quiz) || result.quiz.length !== 5) {
    throw new Error("AI did not return exactly 5 quiz questions.");
  }

  result.cards.forEach((card, index) => {
    if (
      !card ||
      typeof card.question !== "string" ||
      typeof card.answer !== "string" ||
      !card.question.trim() ||
      !card.answer.trim()
    ) {
      throw new Error(`Flashcard ${index + 1} has an invalid format.`);
    }
  });

  result.quiz.forEach((question, index) => {
    if (
      !question ||
      typeof question.question !== "string" ||
      !Array.isArray(question.options) ||
      typeof question.correctAnswer !== "string"
    ) {
      throw new Error(`Quiz question ${index + 1} has an invalid format.`);
    }

    if (question.options.length !== 4) {
      throw new Error(
        `Quiz question ${index + 1} must have exactly 4 options.`
      );
    }

    if (!question.options.includes(question.correctAnswer)) {
      throw new Error(
        `Quiz question ${index + 1} has an invalid correct answer.`
      );
    }
  });

  return result;
}

app.post("/api/generate", async (req, res) => {
  const studyMaterial =
  req.body?.text ||
  req.body?.prompt ||
  req.body?.input ||
  req.body?.studyMaterial;

  if (!studyMaterial || typeof studyMaterial !== "string") {
    return res.status(400).json({
      error: "Please enter a study topic, question, or notes.",
    });
  }

  if (!studyMaterial.trim()) {
    return res.status(400).json({
      error: "Please enter something to study.",
    });
  }

  try {
    const prompt = `
You are a Study Assistant.

The user will provide a study topic, question, or study notes.

Your job is to understand the actual subject being requested and create useful study material about THAT subject.

IMPORTANT:
- Do NOT create questions about the Study Assistant itself.
- Do NOT ask questions about the user's input.
- Do NOT mention "the user", "your input", "the provided text", or "these notes".
- If the user gives a topic, teach that topic.
- If the user gives a question, understand the subject of the question and create study material about that subject.
- Keep the content educational, accurate, and easy for a student to understand.
- Do not add unnecessary information unrelated to the requested subject.

Generate exactly:
1. One short summary in "text".
2. Exactly 5 flashcards.
3. Exactly 5 multiple-choice quiz questions.
4. Every quiz question must contain exactly 4 options.
5. "correctAnswer" must exactly match one of the four options.

Return ONLY the JSON structure required by the schema.

Study material:
${studyMaterial.trim()}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],

      response_format: {
        type: "json_schema",
        json_schema: {
          name: "study_assistant_result",
          strict: true,
          schema: {
            type: "object",

            properties: {
              text: {
                type: "string",
              },

              cards: {
                type: "array",
                items: {
                  type: "object",

                  properties: {
                    question: {
                      type: "string",
                    },

                    answer: {
                      type: "string",
                    },
                  },

                  required: ["question", "answer"],
                  additionalProperties: false,
                },
              },

              quiz: {
                type: "array",
                items: {
                  type: "object",

                  properties: {
                    question: {
                      type: "string",
                    },

                    options: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },

                    correctAnswer: {
                      type: "string",
                    },
                  },

                  required: [
                    "question",
                    "options",
                    "correctAnswer"
                  ],

                  additionalProperties: false,
                },
              },
            },

            required: ["text", "cards", "quiz"],
            additionalProperties: false,
          },
        },
      },

      temperature: 0.4,
      max_completion_tokens: 5000,
    });

    const content = completion.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned an empty response.");
    }

    let result;

    try {
      result = JSON.parse(content);
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError);
      throw new Error("AI returned malformed JSON.");
    }

    const validatedResult = validateResult(result);

    return res.json(validatedResult);
  } catch (error) {
    console.error("Groq request failed:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        error:
          "Groq API rate limit or quota was reached. Please wait and try again.",
      });
    }

    if (error?.status >= 500) {
      return res.status(503).json({
        error:
          "The AI service is temporarily unavailable. Please try again.",
      });
    }

    return res.status(500).json({
      error:
        error?.message ||
        "Failed to generate study material. Please try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});