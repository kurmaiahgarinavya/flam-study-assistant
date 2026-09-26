import { useState } from "react";

function Quiz({ questions }) {
  const [activeQuestions, setActiveQuestions] = useState(questions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [finished, setFinished] = useState(false);
  const currentQuestion = activeQuestions[currentIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === currentQuestion.correctAnswer) {
      setScore((value) => value + 1);
    } else {
      setWrongQuestions((previous) => [...previous, currentQuestion]);
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer("");
    if (currentIndex === activeQuestions.length - 1) setFinished(true);
    else setCurrentIndex((index) => index + 1);
  };

  const restartQuiz = () => {
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setWrongQuestions([]);
    setFinished(false);
  };

  const retestWrong = () => {
    if (!wrongQuestions.length) return;
    setActiveQuestions(wrongQuestions);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setScore(0);
    setWrongQuestions([]);
    setFinished(false);
  };

  if (!questions?.length) return null;

  if (finished) {
    const percentage = Math.round((score / activeQuestions.length) * 100);
    return (
      <section className="quiz-section quiz-complete">
        <div className="score-ring"><strong>{percentage}%</strong><span>score</span></div>
        <span className="result-kicker">QUIZ COMPLETE</span>
        <h2>Nice work!</h2>
        <p>You scored <b>{score}</b> out of <b>{activeQuestions.length}</b>.</p>
        <div className="quiz-actions">
          <button onClick={restartQuiz} type="button">↻ Restart Quiz</button>
          {wrongQuestions.length > 0 && <button className="primary-action" onClick={retestWrong} type="button">↻ Retest Wrong Answers</button>}
        </div>
      </section>
    );
  }

  const progress = ((currentIndex + 1) / activeQuestions.length) * 100;

  return (
    <section className="quiz-section">
      <div className="quiz-topline">
        <div>
          <span className="result-kicker">KNOWLEDGE CHECK</span>
          <h2>Test yourself</h2>
        </div>
        <span className="question-count">{currentIndex + 1} / {activeQuestions.length}</span>
      </div>
      <div className="quiz-progress-track"><span style={{ width: `${progress}%` }} /></div>
      <div className="quiz-card">
        <p className="question-number">Question {currentIndex + 1}</p>
        <h3>{currentQuestion.question}</h3>
        <div className="options">
          {currentQuestion.options.map((option, index) => {
            let className = "quiz-option";
            if (selectedAnswer) {
              if (option === currentQuestion.correctAnswer) className += " correct";
              else if (option === selectedAnswer) className += " incorrect";
            }
            return (
              <button key={option} className={className} onClick={() => handleAnswer(option)} disabled={Boolean(selectedAnswer)} type="button">
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span>{option}</span>
                {selectedAnswer && option === currentQuestion.correctAnswer && <b>✓</b>}
                {selectedAnswer && option === selectedAnswer && option !== currentQuestion.correctAnswer && <b>×</b>}
              </button>
            );
          })}
        </div>
        {selectedAnswer && (
          <div className={`answer-feedback ${selectedAnswer === currentQuestion.correctAnswer ? "good" : "bad"}`}>
            <span>{selectedAnswer === currentQuestion.correctAnswer ? "✓" : "!"}</span>
            <div><strong>{selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Not quite."}</strong><p>{selectedAnswer === currentQuestion.correctAnswer ? "Great job. Keep going!" : `The correct answer is ${currentQuestion.correctAnswer}.`}</p></div>
          </div>
        )}
        {selectedAnswer && <button className="next-button" onClick={nextQuestion} type="button">{currentIndex === activeQuestions.length - 1 ? "Finish Quiz" : "Next Question →"}</button>}
      </div>
    </section>
  );
}

export default Quiz;
