function LoadingState() {
  return (
    <section className="loading-card">
      <div className="loading-illustration"><span>▣</span><i>✦</i></div>
      <span className="result-kicker">AI POWERED</span>
      <h2>Generating your study material...</h2>
      <p>This may take a few seconds while the AI creates your flashcards and quiz.</p>
      <div className="loading-bar"><span /></div>
      <div className="loading-steps">
        <span className="done">✓ <b>Analyzing your input</b></span>
        <span className="active">● <b>Generating flashcards...</b></span>
        <span>○ <b>Creating quiz questions...</b></span>
        <span>○ <b>Finalizing results...</b></span>
      </div>
    </section>
  );
}
export default LoadingState;
