import { useRef, useState } from "react";

import PromptInput from "./components/PromptInput";
import ResultView from "./components/ResultView";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";

import { generateStudyMaterial } from "./lib/api";
import { validateResult } from "./lib/validateResult";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastInput, setLastInput] = useState("");
  const requestIdRef = useRef(0);

  async function handleGenerate(input) {
    const requestId = ++requestIdRef.current;
    setLastInput(input);
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await generateStudyMaterial(input);
      if (requestId !== requestIdRef.current) return;

      const validation = validateResult(data);
      if (!validation.valid) throw new Error(validation.error);

      setResult(data);
    } catch (err) {
      if (requestId !== requestIdRef.current) return;
      setError(err.message || "Failed to generate study material.");
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }

  function handleRetry() {
    if (lastInput.trim()) handleGenerate(lastInput);
  }

  function startOver() {
    ++requestIdRef.current;
    setResult(null);
    setError("");
    setLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <button className="brand" onClick={startOver} type="button" aria-label="Study Assistant home">
            <span className="brand-icon">▣</span>
            <span>Study Assistant</span>
          </button>
          <nav className="topnav" aria-label="Primary navigation">
            <button className="active" type="button" onClick={startOver}>Home</button>
            <a href="#how-it-works">How it works</a>
            <a href="#examples">Examples</a>
          </nav>
        </div>
      </header>

      <main>
        {!result && !loading && !error && (
          <section className="hero-section">
            <div className="hero-glow hero-glow-one" />
            <div className="hero-glow hero-glow-two" />
            <div className="hero-inner">
              <div className="hero-copy">
                <span className="hero-kicker"><span>✦</span> AI-POWERED LEARNING</span>
                <h1>Turn Your Study Notes<br />into <span>Interactive Learning</span></h1>
                <p>Paste your notes or enter a topic and get AI-generated flashcards and quizzes to learn faster.</p>
                <div className="feature-pills">
                  <span><b>✦</b> AI Powered</span>
                  <span><b>▣</b> Flashcards</span>
                  <span><b>◉</b> Quizzes</span>
                  <span><b>◆</b> Interactive Learning</span>
                </div>
              </div>
              <div className="hero-illustration" aria-hidden="true">
                <div className="spark spark-a">✦</div>
                <div className="spark spark-b">✦</div>
                <div className="book book-back" />
                <div className="book book-front" />
                <div className="bulb">✦</div>
              </div>
            </div>
          </section>
        )}

        <section className={`workspace ${result || loading || error ? "results-workspace" : ""}`}>
          {!result && !loading && !error && (
            <PromptInput onGenerate={handleGenerate} disabled={loading} />
          )}

          {loading && <LoadingState />}

          {!loading && error && (
            <ErrorState message={error} onRetry={handleRetry} onStartOver={startOver} />
          )}

          {!loading && !error && !result && (
            <div className="empty-state" id="how-it-works">
              <div className="empty-icon">✦</div>
              <h2>Ready to study?</h2>
              <p>Enter a topic or paste your notes above to generate personalized study material.</p>
            </div>
          )}

          {!loading && !error && result && (
            <ResultView result={result} onStartOver={startOver} />
          )}
        </section>

        {!result && !loading && !error && (
          <section className="examples-section" id="examples">
            <div className="section-title-wrap">
              <span>TRY AN EXAMPLE</span>
              <h2>Start with any topic</h2>
            </div>
            <div className="example-grid">
              {[
                ["Photosynthesis", "🌱"],
                ["Machine Learning", "◈"],
                ["Data Structures", "⌘"],
                ["Cloud Computing", "☁"],
              ].map(([label, icon]) => (
                <button key={label} type="button" onClick={() => handleGenerate(label)}>
                  <span>{icon}</span>{label}<b>→</b>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">FLAM Study Assistant · Learn smarter with structured AI study tools</footer>
    </div>
  );
}

export default App;
