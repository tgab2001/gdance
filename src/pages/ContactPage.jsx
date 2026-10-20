import React, { useState } from 'react';
import { Sparkles, MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <section style={{
        padding: '70px 0 50px',
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(201, 162, 39, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="section-badge" style={{ margin: '0 auto 14px' }}>
            <Mail size={14} />
            <span>KAPCSOLAT ÉS ELÉRHETŐSÉG</span>
          </div>
          <h1 className="section-title">
            LÉPJ VELÜNK KAPCSOLATBA
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Kérdésed van az órákkal, szintfelmérővel vagy tagdíjakkal kapcsolatban? Keress minket bizalommal!
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px'
        }}>
          {/* Contact Details */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFF', marginBottom: '20px' }}>
              G DANCE <span className="text-gradient-gold">STÚDIÓ</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.8, marginBottom: '30px' }}>
              Központi stúdiónk Budapest belvárosában, kiváló megközelíthetőséggel és prémium balettpadlós tánctermekkel várja növendékeit.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={20} color="var(--gold-light)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF', fontSize: '1rem', marginBottom: '2px' }}>Címünk:</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    1052 Budapest, Kossuth Lajos utca 14. (Főbejárat a belső udvar felől)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} color="var(--gold-light)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF', fontSize: '1rem', marginBottom: '2px' }}>Telefon:</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    +36 (30) 123-4567 (Hétköznap 10:00 - 18:00)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={20} color="var(--gold-light)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF', fontSize: '1rem', marginBottom: '2px' }}>E-mail:</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    info@gdance.hu / vezetoseg@gdance.hu
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(201, 162, 39, 0.1)',
                  border: '1px solid var(--border-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={20} color="var(--gold-light)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#FFF', fontSize: '1rem', marginBottom: '2px' }}>Nyitvatartás:</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Hétfő - Péntek: 14:00 - 21:00 | Szombat: 09:30 - 15:00
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card-luxury">
            <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '8px' }}>
              Üzenetküldés
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Írj nekünk, és 24 órán belül válaszolunk megkeresésedre!
            </p>

            {sent ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'rgba(46, 204, 113, 0.1)',
                border: '1px solid var(--status-present)',
                borderRadius: '12px'
              }}>
                <CheckCircle2 size={48} color="var(--status-present)" style={{ margin: '0 auto 16px' }} />
                <h4 style={{ color: '#FFF', fontSize: '1.2rem', marginBottom: '8px' }}>Köszönjük az üzenetet!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Hamarosan felvesszük veled a kapcsolatot a megadott e-mail címen.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Teljes név *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Kovács Anna"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      E-mail cím *
                    </label>
                    <input
                      type="email"
                      required
                      className="input-luxury"
                      placeholder="anna@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                      Telefonszám
                    </label>
                    <input
                      type="tel"
                      className="input-luxury"
                      placeholder="+36 30 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Üzenet szövege *
                  </label>
                  <textarea
                    required
                    rows="4"
                    className="input-luxury"
                    placeholder="Miben segíthetünk?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '14px', marginTop: '10px' }}
                >
                  <Send size={16} />
                  <span>Üzenet elküldése</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
