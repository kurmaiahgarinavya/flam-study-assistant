import { useState } from "react";

function PromptInput({ onGenerate, disabled }) {
  const [text, setText] = useState("");
  const maxLength = 2000;

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim() || disabled) return;
    onGenerate(text.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <div className="prompt-header">
        <label htmlFor="notes"><span className="input-icon">▣</span> Enter your notes or topic</label>
        <span className="character-count">{text.length}/{maxLength}</span>
      </div>

      <textarea
        id="notes"
        value={text}
        maxLength={maxLength}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste your study notes here or enter a topic...\n\nExample: Photosynthesis, Machine Learning, Operating Systems..."
        rows="6"
        disabled={disabled}
      />

      <div className="prompt-footer">
        <div className="mini-hint">✦ AI will turn your topic into flashcards and a quiz</div>
        <button type="submit" className="generate-button" disabled={disabled || !text.trim()}>
          <span>✦</span> Generate Study Material
        </button>
      </div>
    </form>
  );
}

export default PromptInput;
