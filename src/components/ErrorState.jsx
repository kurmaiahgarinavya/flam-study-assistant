function ErrorState({ message, onRetry, onStartOver }) {
  return (
    <section className="error-state-card">
      <div className="error-icon">!</div>
      <span className="result-kicker">GENERATION ERROR</span>
      <h2>Something went wrong</h2>
      <p>{message}</p>
      <div className="error-actions">
        <button className="primary-action" type="button" onClick={onRetry}>↻ Try Again</button>
        <button type="button" onClick={onStartOver}>Start Over</button>
      </div>
      <div className="common-issues"><strong>Common issues</strong><span>• The AI service may be temporarily unavailable.</span><span>• Your request may need another try.</span></div>
    </section>
  );
}
export default ErrorState;
