# FLAM Study Assistant

A React-based AI Study Assistant built for the FLAM Frontend Internship Assignment.

The application takes a user's study topic or notes and uses an AI model to generate structured study material in the form of flashcards and quiz questions.

The generated content is rendered as an interactive UI rather than as a chatbot response.

## Features

- Free-form input for a study topic or notes
- AI-generated flashcards
- Interactive flashcard flipping
- AI-generated multiple-choice quiz
- Quiz progress tracking
- Immediate answer feedback
- Re-test functionality for incorrect answers
- Loading state while AI content is generated
- Error state with retry option
- Empty state before generating content
- Validation of AI-generated structured data
- Protection against stale API responses
- Responsive mobile-friendly interface
- Backend API proxy to keep the AI API key out of the browser

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Hooks
- CSS

### Backend

- Node.js
- Express.js
- CORS
- dotenv

### AI

- Groq API
- Groq JavaScript SDK
- `openai/gpt-oss-20b`

## Project Structure

```text
flam-study-assistant/
│
├── src/
│   ├── components/
│   │   ├── PromptInput.jsx
│   │   ├── FlashcardDeck.jsx
│   │   ├── Quiz.jsx
│   │   ├── LoadingState.jsx
│   │   ├── ErrorState.jsx
│   │   └── ResultView.jsx
│   │
│   ├── lib/
│   │   ├── api.js
│   │   └── validateResult.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server/
│   ├── generate.js
│   ├── .env
│   └── .env.example
│
├── public/
├── README.md
├── package.json
└── .gitignore
```

## How It Works

1. The user enters a study topic or notes.
2. The React frontend sends the input to the backend.
3. The backend sends a structured prompt to the Groq AI model.
4. The AI returns structured JSON containing flashcards and quiz questions.
5. The backend validates the generated result.
6. The validated result is returned to the frontend.
7. React renders the flashcards and quiz as interactive components.
8. The user can flip flashcards, answer quiz questions, and re-test incorrect answers.

The application does not display the model's raw response as a chatbot message. Instead, the structured response is parsed and rendered as interactive UI components.

## API Key Security

The Groq API key is stored only in the backend `.env` file.

The API key is not placed in the React frontend or exposed to the browser.

Create:

```text
server/.env
```

and add:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Do not commit the `.env` file to GitHub.

The repository contains `.env.example` as a template:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## Installation

Clone the repository:

```bash
git clone https://github.com/kurmaiahgarinavya/flam-study-assistant.git
```

Move into the project:

```bash
cd flam-study-assistant
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd server
npm install
```

Create the environment file:

```text
server/.env
```

Add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

## Running the Application

### Start the Backend

From the `server` folder:

```bash
node generate.js
```

The backend runs on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and go to the project root:

```bash
cd flam-study-assistant
```

Run:

```bash
npm run dev
```

Vite will provide the local frontend URL, normally:

```text
http://localhost:5173
```

Open that URL in the browser.

## Example Usage

Enter a topic such as:

```text
Photosynthesis
```

or:

```text
Explain the basics of DBMS including keys, normalization and SQL.
```

The application sends the input to the AI model and generates:

- 5 flashcards
- 5 multiple-choice quiz questions
- 4 options for each quiz question
- Correct answers for the quiz

The user can then:

- Flip through flashcards
- Take the quiz
- See whether answers are correct
- View quiz progress
- Re-test incorrect answers
- Start over with a new topic

## AI Integration

The application uses the Groq API through a backend Express server.

The backend sends a strict prompt requesting structured JSON rather than unrestricted text.

The generated result is validated before it is sent to the frontend.

The expected structure contains:

```json
{
  "text": "Study material",
  "cards": [
    {
      "question": "Question",
      "answer": "Answer"
    }
  ],
  "quiz": [
    {
      "question": "Question",
      "options": [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4"
      ],
      "correctAnswer": "Option 1"
    }
  ]
}
```

The frontend only renders the result after validation.

## Error Handling

The application handles several possible AI and API failure cases.

### Empty Input

The user cannot generate study material without entering a study topic or notes.

### Invalid AI Response

The backend validates the AI response before returning it.

If the generated response does not contain the expected structure, the request fails safely instead of rendering invalid data.

### Failed API Request

If the AI API request fails, the frontend displays an error state and provides a retry option.

### Slow Request

A loading state is displayed while the application waits for the AI response.

The frontend also uses a request timeout so that a request does not remain stuck indefinitely.

### Stale Responses

The application uses request tracking so that an older, slower request cannot overwrite the result of a newer request.

### Network Errors

Network failures are caught and displayed as a user-friendly error instead of causing the application to crash.

## Responsive Design

The application is designed to work on both desktop and mobile screen sizes.

The layout, flashcards, quiz options, buttons, and input area adapt to smaller screen widths.

## AI Usage Note

AI tools were used during development for assistance with:

- Understanding the assignment requirements
- Planning the application structure
- Debugging development issues
- Reviewing and improving code
- Generating implementation suggestions
- Improving UI and error-handling approaches

The final application was tested and adjusted during development, and the code and implementation decisions are understood as part of the project.

## Known Limitations

- The quality of generated flashcards and quiz questions depends on the AI model's response.
- AI-generated content may occasionally contain factual inaccuracies.
- The application currently generates a fixed number of flashcards and quiz questions.
- The application requires an active Groq API key.
- Free-tier API limits may affect how many requests can be made.
- Study sessions are not permanently stored.
- Authentication is not implemented because it is not required for the assignment.

## Time Spent

Approximately 8 hours were spent developing and testing the core assignment.

The work focused on the required functionality:

- React frontend
- Backend API proxy
- AI integration
- Structured JSON generation
- Response validation
- Interactive flashcards
- Interactive quiz
- Error handling
- Loading and empty states
- Responsive UI
- Testing and debugging
- Documentation

## Assignment Requirements Covered

The implementation addresses the main requirements of the FLAM Frontend Internship Assignment:

- React with functional components and hooks
- Free-form text input
- Real LLM API
- Structured AI output
- Parsing and validation
- Interactive stateful UI
- Handling malformed or invalid AI output
- Loading, error, and empty states
- Stale response protection
- Mobile-friendly interface
- Backend API key protection
- README documentation

## License

This project was created as part of the FLAM Frontend Internship Assignment.