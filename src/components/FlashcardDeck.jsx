import { useState } from "react";

function FlashcardDeck({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const currentCard = cards[currentIndex];

  function nextCard() {
    setShowAnswer(false);
    setCurrentIndex((index) => (index === cards.length - 1 ? 0 : index + 1));
  }

  function previousCard() {
    setShowAnswer(false);
    setCurrentIndex((index) => (index === 0 ? cards.length - 1 : index - 1));
  }

  return (
    <section className="flashcard-section">
      <div className="flashcard-meta">
        <span>Card {currentIndex + 1} of {cards.length}</span>
        <div className="progress-dots">
          {cards.map((_, index) => <i className={index === currentIndex ? "on" : ""} key={index} />)}
        </div>
      </div>

      <button type="button" className={`flashcard ${showAnswer ? "answer" : ""}`} onClick={() => setShowAnswer((value) => !value)}>
        <span className="flip-badge">{showAnswer ? "ANSWER" : "QUESTION"}</span>
        <span className="flashcard-icon">{showAnswer ? "✓" : "▣"}</span>
        <strong>{showAnswer ? currentCard.answer : currentCard.question}</strong>
        <small>{showAnswer ? "Click to see the question" : "Click to flip and reveal the answer"}</small>
      </button>

      <div className="card-controls">
        <button type="button" onClick={previousCard}>← <span>Previous</span></button>
        <button type="button" className="next-card" onClick={nextCard}><span>Next</span> →</button>
      </div>
    </section>
  );
}

export default FlashcardDeck;
