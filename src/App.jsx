import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { RoleSwitcherBar } from './components/RoleSwitcherBar';
import { AuthModal } from './components/AuthModal';
import { NotificationModal } from './components/NotificationModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Groups } from './pages/Groups';
import { Instructors } from './pages/Instructors';
import { EventsPage } from './pages/EventsPage';
import { Performances } from './pages/Performances';
import { NewsPage } from './pages/NewsPage';
import { GalleryPage } from './pages/GalleryPage';
import { VideosPage } from './pages/VideosPage';
import { ResultsPage } from './pages/ResultsPage';
import { ContactPage } from './pages/ContactPage';
import { ApplyPage } from './pages/ApplyPage';
import { Dashboard } from './pages/Dashboard';
import { CalendarPage } from './pages/CalendarPage';
import { AttendancePage } from './pages/AttendancePage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [notifModalOpen, setNotifModalOpen] = useState(false);

  // Render current active page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'groups':
        return <Groups setCurrentPage={setCurrentPage} />;
      case 'instructors':
        return <Instructors setCurrentPage={setCurrentPage} />;
      case 'events':
        return <EventsPage onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'performances':
        return <Performances setCurrentPage={setCurrentPage} />;
      case 'news':
        return <NewsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'videos':
        return <VideosPage onOpenAuth={() => setAuthModalOpen(true)} />;
      case 'results':
        return <ResultsPage />;
      case 'contact':
        return <ContactPage />;
      case 'apply':
        return <ApplyPage setCurrentPage={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} onOpenNotifs={() => setNotifModalOpen(true)} />;
      case 'calendar':
        return <CalendarPage setCurrentPage={setCurrentPage} />;
      case 'attendance':
        return <AttendancePage setCurrentPage={setCurrentPage} />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminPage setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} onOpenAuth={() => setAuthModalOpen(true)} />;
    }
  };

  return (
    <div className="app-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Interactive Floating Role Switcher for seamless demo & persona testing */}
      <RoleSwitcherBar />

      {/* Main Luxury Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenNotifs={() => setNotifModalOpen(true)}
      />

      {/* Active Page Body */}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Notifications Drawer */}
      <NotificationModal
        isOpen={notifModalOpen}
        onClose={() => setNotifModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
