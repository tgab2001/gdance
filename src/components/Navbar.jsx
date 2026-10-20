import React, { useState } from 'react';
import { 
  Menu, X, Bell, User, Shield, Sparkles, ChevronDown, 
  LogIn, LogOut, Calendar, Award, BookOpen, Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar({ currentPage, setCurrentPage, onOpenAuth, onOpenNotifs }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, role, logout, unreadCount, switchRole } = useAuth();

  const navLinks = [
    { id: 'home', label: 'Főoldal' },
    { id: 'about', label: 'Bemutatkozás' },
    { id: 'groups', label: 'Tánccsoportok' },
    { id: 'instructors', label: 'Oktatók' },
    { id: 'events', label: 'Események' },
    { id: 'performances', label: 'Fellépések' },
    { id: 'news', label: 'Hírek' },
    { id: 'gallery', label: 'Galéria' },
    { id: 'videos', label: 'Videók' },
    { id: 'results', label: 'Eredmények' },
    { id: 'contact', label: 'Kapcsolat' },
    { id: 'apply', label: 'Jelentkezés' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const roleLabels = {
    admin: 'Adminisztrátor',
    instructor: 'Oktató / Koreográfus',
    dancer: 'Táncos',
    parent: 'Szülő',
    guest: 'Vendég'
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: 'rgba(9, 9, 9, 0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(201, 162, 39, 0.25)',
      boxShadow: '0 4px 25px rgba(0, 0, 0, 0.7)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E5C76B 0%, #C9A227 50%, #8C6F16 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(201, 162, 39, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.4rem',
              color: '#0A0A0A',
              letterSpacing: '-0.05em'
            }}>G</span>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.35rem',
              letterSpacing: '0.12em',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              G DANCE
              <span style={{
                fontSize: '0.65rem',
                color: 'var(--gold-light)',
                fontWeight: 600,
                letterSpacing: '0.18em'
              }}>ACADEMY</span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '20px'
        }} className="desktop-nav">
          {navLinks.slice(0, 7).map(link => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                color: currentPage === link.id ? 'var(--gold-light)' : 'var(--text-muted)',
                fontWeight: currentPage === link.id ? 700 : 500,
                fontSize: '0.88rem',
                letterSpacing: '0.02em',
                padding: '6px 2px',
                borderBottom: currentPage === link.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}
            >
              {link.label}
            </button>
          ))}

          {/* More menu dropdown for remaining pages */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              style={{
                background: 'none',
                color: ['gallery', 'videos', 'results', 'contact', 'apply'].includes(currentPage) ? 'var(--gold-light)' : 'var(--text-muted)',
                fontWeight: 500,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 2px'
              }}
            >
              Továbbiak
              <ChevronDown size={14} />
            </button>
            {userDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '12px',
                width: '180px',
                background: '#141414',
                border: '1px solid var(--border-gold)',
                borderRadius: '8px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                padding: '8px 0',
                zIndex: 100
              }}>
                {navLinks.slice(7).map(link => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      padding: '9px 18px',
                      color: currentPage === link.id ? 'var(--gold-light)' : 'var(--text-main)',
                      fontSize: '0.88rem',
                      display: 'block'
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Icons & Dashboard Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Notification Button */}
          {currentUser && (
            <button
              onClick={onOpenNotifs}
              title="Értesítések"
              style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: unreadCount > 0 ? 'var(--gold-light)' : 'var(--text-muted)',
                transition: 'all 0.2s ease'
              }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--gold-primary)',
                  color: '#000',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* User Status / Dashboard CTA */}
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={currentPage === 'dashboard' ? 'btn-gold' : 'btn-outline-gold'}
                style={{
                  padding: '9px 18px',
                  fontSize: '0.84rem'
                }}
              >
                <Layers size={16} />
                <span>DASHBOARD</span>
              </button>

              <button
                onClick={() => handleNavClick('profile')}
                title="Profilom"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid var(--border-gold)',
                  borderRadius: '20px',
                  padding: '4px 10px 4px 4px',
                  color: 'var(--text-main)',
                  fontSize: '0.82rem'
                }}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '1px solid var(--gold-light)'
                  }}
                />
                <span style={{ fontWeight: 600 }} className="desktop-only-text">
                  {currentUser.nickname || currentUser.name.split(' ')[0]}
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-gold"
              style={{
                padding: '10px 20px',
                fontSize: '0.85rem'
              }}
            >
              <LogIn size={16} />
              <span>BELÉPÉS</span>
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}
            className="mobile-hamburger-btn"
            aria-label="Menü megnyitása"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#0D0D0D',
          borderTop: '1px solid var(--border-gold)',
          padding: '20px 24px 30px',
          maxHeight: 'calc(100vh - 76px)',
          overflowY: 'auto'
        }}>
          {currentUser && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: '#161616',
              borderRadius: '10px',
              marginBottom: '16px',
              border: '1px solid var(--border-subtle)'
            }}>
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#FFF' }}>{currentUser.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--gold-light)' }}>
                  {roleLabels[currentUser.role] || currentUser.role}
                </div>
              </div>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="btn-gold"
                style={{ padding: '6px 12px', fontSize: '0.75rem' }}
              >
                Dashboard
              </button>
            </div>
          )}

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '20px'
          }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{
                  textAlign: 'left',
                  background: currentPage === link.id ? 'rgba(201, 162, 39, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: currentPage === link.id ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  padding: '12px 14px',
                  color: currentPage === link.id ? 'var(--gold-light)' : 'var(--text-main)',
                  fontWeight: currentPage === link.id ? 700 : 500,
                  fontSize: '0.9rem'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
            {currentUser ? (
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="btn-ghost"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <LogOut size={16} />
                Kijelentkezés
              </button>
            ) : (
              <button
                onClick={() => { onOpenAuth(); setMobileMenuOpen(false); }}
                className="btn-gold"
                style={{ width: '100%' }}
              >
                <LogIn size={16} />
                Belépés a tagi felületre
              </button>
            )}
          </div>
        </div>
      )}

      {/* Responsive CSS tweaks */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
        @media (max-width: 600px) {
          .desktop-only-text {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
