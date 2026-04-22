import { useState } from 'react';
import { useLang } from './context/LanguageContext';
import NavBar from './components/NavBar';
import OnboardingPage from './pages/OnboardingPage';
import ChatPage from './pages/ChatPage';
import MapPage from './pages/MapPage';
import TimelinePage from './pages/TimelinePage';
import QuizPage from './pages/QuizPage';

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedState, setSelectedState] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState(null);

  const handleOnboardComplete = (state, constituency) => {
    setSelectedState(state);
    setSelectedConstituency(constituency);
    setOnboarded(true);
  };

  const handleSkip = () => {
    setOnboarded(true);
  };

  if (!onboarded) {
    return <OnboardingPage onComplete={handleOnboardComplete} onSkip={handleSkip} />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <ChatPage
            selectedState={selectedState}
            selectedConstituency={selectedConstituency}
            onConstituencyChange={setSelectedConstituency}
          />
        );
      case 'map':
        return <MapPage onSelectState={setSelectedState} />;
      case 'timeline':
        return <TimelinePage />;
      case 'quiz':
        return <QuizPage />;
      default:
        return <ChatPage selectedState={selectedState} selectedConstituency={selectedConstituency} />;
    }
  };

  return (
    <div className="app-shell">
      <NavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        constituency={selectedConstituency}
        onReset={() => setOnboarded(false)}
      />
      <div className="page-container">
        {renderPage()}
      </div>
    </div>
  );
}
