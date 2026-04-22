export default function ChatMessage({ message, onAction }) {
  if (message.role === 'user') {
    return (
      <div className="chat-message user">
        <div className="message-avatar user">U</div>
        <div className="message-bubble user">{message.text}</div>
      </div>
    );
  }

  return (
    <div className="chat-message assistant">
      <div className="message-avatar assistant">AI</div>
      <div className="message-bubble assistant">
        {message.title && <div className="message-title">{message.title}</div>}
        <div style={{ whiteSpace: 'pre-wrap' }}>{message.text}</div>
        {message.actions?.length > 0 && (
          <div className="message-actions">
            {message.actions.map((action, i) => (
              <button
                key={i}
                className="action-pill"
                onClick={() => onAction?.(action)}
              >
                {action} ↗
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
