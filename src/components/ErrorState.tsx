import React from 'react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <div className="error-state" role="alert" aria-live="assertive">
    <div className="error-state__icon" aria-hidden="true">⚠️</div>
    <h2 className="error-state__title">Something went wrong</h2>
    <p className="error-state__text">{message}</p>
    <button className="btn btn-primary" onClick={onRetry}>
      Try Again
    </button>
  </div>
)

export default ErrorState
