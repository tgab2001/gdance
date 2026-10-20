import React from 'react';
import { MapPin, Phone, Mail, Clock, Sparkles, Globe, Video, Share2 } from 'lucide-react';

export function Footer({ setCurrentPage }) {
  return (
    <footer style={{
      backgroundColor: '#070707',
      borderTop: '1px solid rgba(201, 162, 39, 0.25)',
      paddingTop: '60px',
      paddingBottom: '30px',
      position: 'relative',
      marginTop: '80px'
    }}>
      {/* Subtle top gold glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '400px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #E5C76B, transparent)',
        boxShadow: '0 0 20px #E5C76B'
      }} />

      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Col */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--gold-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#000',
                fontWeight: 900,
                fontFamily: 'var(--font-display)'
              }}>G</div>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.3rem',
                letterSpacing: '0.1em',
                color: '#FFF'
              }}>G DANCE</span>
            </div>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              marginBottom: '20px'
            }}>
              Prémium táncoktatás, modern koreográfiák és összetartó közösség. Ahol a mozdulat művészetté válik.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--gold-light)',
              fontFamily: 'var(--font-display)',
              fontSize: '0.82rem',
              letterSpacing: '0.12em'
            }}>
              <Sparkles size={14} />
              MOZDULAT. RITMUS. KÖZÖSSÉG.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-light)',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              marginBottom: '18px'
            }}>
              NAVIGÁCIÓ
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              fontSize: '0.88rem',
              color: 'var(--text-muted)'
            }}>
              {[
                { id: 'about', label: 'Bemutatkozás' },
                { id: 'groups', label: 'Tánccsoportok' },
                { id: 'instructors', label: 'Oktatók' },
                { id: 'events', label: 'Események' },
                { id: 'performances', label: 'Fellépések' },
                { id: 'news', label: 'Hírek' },
                { id: 'gallery', label: 'Galéria' },
                { id: 'videos', label: 'Videók' },
                { id: 'results', label: 'Eredmények' },
                { id: 'apply', label: 'Jelentkezés' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  style={{
                    background: 'none',
                    textAlign: 'left',
                    color: 'var(--text-muted)',
                    padding: '4px 0',
                    transition: 'color 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--gold-light)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-light)',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              marginBottom: '18px'
            }}>
              ELÉRHETŐSÉG
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>1052 Budapest, Kossuth Lajos u. 14. (Tükrös Stúdió)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span>+36 (30) 123-4567</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span>info@gdance.hu</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={18} color="var(--gold-primary)" style={{ flexShrink: 0 }} />
                <span>Hétfő - Szombat: 14:00 - 21:00</span>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--gold-light)',
              fontSize: '1rem',
              letterSpacing: '0.08em',
              marginBottom: '18px'
            }}>
              KÖVESS MINKET
            </h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Nézd meg legfrissebb versenyszerepléseinket és próbatermi videóinkat!
            </p>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: <Globe size={18} />, label: 'Web' },
                { icon: <Video size={18} />, label: 'YouTube' },
                { icon: <Share2 size={18} />, label: 'Közösség' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--gold-light)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--gold-gradient)';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = 'var(--gold-light)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>

            <button
              onClick={() => { setCurrentPage('apply'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="btn-gold"
              style={{ width: '100%', padding: '12px', fontSize: '0.84rem' }}
            >
              Próbaóra jelentkezés
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '25px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.82rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            © {new Date().getFullYear()} G DANCE ACADEMY. Minden jog fenntartva.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Adatkezelési tájékoztató</span>
            <span>Házirend</span>
            <span>Firebase & GitHub Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
