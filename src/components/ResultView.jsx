import { useState } from "react";
import FlashcardDeck from "./FlashcardDeck";
import Quiz from "./Quiz";

function ResultView({ result, onStartOver }) {
  const [activeTab, setActiveTab] = useState("flashcards");

  return (
    <section className="result-view">
      <div className="result-heading">
        <div>
          <span className="result-kicker">✦ YOUR STUDY MATERIAL</span>
          <h1>Ready to learn</h1>
          <p>Review the flashcards, then test yourself with the quiz.</p>
        </div>
        <button className="start-over" type="button" onClick={onStartOver}>↻ Start Over</button>
      </div>

      <div className="result-tabs" role="tablist" aria-label="Study material">
        <button className={activeTab === "flashcards" ? "selected" : ""} onClick={() => setActiveTab("flashcards")} type="button">▣ Flashcards <span>{result.cards.length}</span></button>
        <button className={activeTab === "quiz" ? "selected" : ""} onClick={() => setActiveTab("quiz")} type="button">◉ Quiz <span>{result.quiz.length}</span></button>
      </div>

      {activeTab === "flashcards" ? (
        <FlashcardDeck cards={result.cards} />
      ) : (
        <Quiz questions={result.quiz} />
      )}
    </section>
  );
}

export default ResultView;
