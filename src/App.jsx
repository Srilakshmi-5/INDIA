import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import { OfflineBanner } from './components/layout/OfflineBanner';
import { Footer } from './components/layout/Footer';
import { LoginPage } from './pages/LoginPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { DigitalTwinPage } from './pages/DigitalTwinPage';
import { WhatIfSimulatorPage } from './pages/WhatIfSimulatorPage';
import { ActionCenterPage } from './pages/ActionCenterPage';
import { ResilienceScoresPage } from './pages/ResilienceScoresPage';
import { AuditLogPage } from './pages/AuditLogPage';

const AppContent = () => {
  const { isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState('command-center');

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setActiveTab('command-center')} />;
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenterPage onNavigateTab={setActiveTab} />;
      case 'digital-twin':
        return <DigitalTwinPage onNavigateTab={setActiveTab} />;
      case 'what-if':
        return <WhatIfSimulatorPage onNavigateTab={setActiveTab} />;
      case 'action-center':
        return <ActionCenterPage onNavigateTab={setActiveTab} />;
      case 'resilience':
        return <ResilienceScoresPage onNavigateTab={setActiveTab} />;
      case 'audit-log':
        return <AuditLogPage onNavigateTab={setActiveTab} />;
      default:
        return <CommandCenterPage onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050911] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Tactical Top Header */}
      <Header />

      {/* Primary Navigation Tabs */}
      <Navigation activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Persistent Offline Continuity Mode Banner */}
      <OfflineBanner />

      {/* Main Operational Tactical Screen */}
      <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
        {renderActiveScreen()}
      </main>

      {/* Military Classification Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
