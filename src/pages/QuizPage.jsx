import { useState, useCallback } from 'react';
import { useLang } from '../context/LanguageContext';
import { quizQuestions } from '../constants/quizData';
import { RotateCcw } from 'lucide-react';

export default function QuizPage() {
  const { lang, t } = useLang();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = quizQuestions[currentQ];
  const qData = question?.[lang] || question?.en;

  const handleSelect = useCallback((idx) => {
    if (selected !== null) return; // already answered
    setSelected(idx);
    setShowExplanation(true);
    if (idx === qData.answer) {
      setScore(s => s + 1);
    }
  }, [selected, qData]);

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= quizQuestions.length) {
      setCompleted(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setShowExplanation(false);
    }
  }, [currentQ]);

  const handleRetry = useCallback(() => {
    setCurrentQ(0);
    setScore(0);
    setSelected(null);
    setShowExplanation(false);
    setCompleted(false);
  }, []);

  if (completed) {
    return (
      <div className="quiz-page">
        <div className="quiz-card glass-card">
          <div className="quiz-result">
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-md)' }}>🏆</div>
            <div className="quiz-score">{score}/{quizQuestions.length}</div>
            <div className="quiz-score-label">
              {t('yourScore')} — {Math.round((score / quizQuestions.length) * 100)}%
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
              {score === quizQuestions.length
                ? (lang === 'hi' ? '🎉 शानदार! आप चुनाव विशेषज्ञ हैं!' : '🎉 Perfect! You\'re an election expert!')
                : score >= quizQuestions.length * 0.7
                ? (lang === 'hi' ? '👏 बहुत अच्छा! आप काफ़ी जानते हैं।' : '👏 Great job! You know your elections well.')
                : (lang === 'hi' ? '📚 और सीखने का मौका है। फिर कोशिश करें!' : '📚 Room to learn more. Try again!')}
            </p>
            <button className="btn-primary" onClick={handleRetry} style={{ maxWidth: '240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <RotateCcw size={18} /> {t('retryQuiz')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="quiz-page">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
        <h2>{t('quizTitle')}</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginTop: 'var(--space-sm)' }}>
          {t('quizDesc')}
        </p>
      </div>

      <div className="quiz-card glass-card">
        {/* Progress dots */}
        <div className="quiz-progress">
          {quizQuestions.map((_, i) => (
            <div
              key={i}
              className={`quiz-progress-dot ${i < currentQ ? 'completed' : i === currentQ ? 'current' : ''}`}
            />
          ))}
        </div>

        <div className="quiz-question-num">
          {lang === 'hi' ? `प्रश्न ${currentQ + 1} / ${quizQuestions.length}` : `Question ${currentQ + 1} of ${quizQuestions.length}`}
        </div>

        <div className="quiz-question">{qData.q}</div>

        <div className="quiz-options">
          {qData.options.map((option, i) => {
            let className = 'quiz-option';
            if (selected !== null) {
              if (i === qData.answer) className += ' correct';
              else if (i === selected) className += ' wrong';
            }
            return (
              <button
                key={i}
                className={className}
                onClick={() => handleSelect(i)}
                id={`quiz-option-${i}`}
              >
                <span className="quiz-option-letter">{letters[i]}</span>
                {option}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div style={{
            marginTop: 'var(--space-lg)',
            padding: 'var(--space-md)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-card)',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            animation: 'cardFadeIn 0.3s var(--ease-out)',
          }}>
            💡 {question.explanation[lang]}
          </div>
        )}

        {selected !== null && (
          <button
            className="btn-primary"
            onClick={handleNext}
            style={{ marginTop: 'var(--space-lg)' }}
            id="next-question-btn"
          >
            {currentQ + 1 >= quizQuestions.length
              ? (lang === 'hi' ? 'परिणाम देखें' : 'See Results')
              : t('nextQuestion')} →
          </button>
        )}
      </div>
    </div>
  );
}
