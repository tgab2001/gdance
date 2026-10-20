import React, { useState } from 'react';
import { Sparkles, CheckCircle2, User, Phone, Mail, Calendar, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitApplication } from '../services/database';

export function ApplyPage({ setCurrentPage }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ageGroup: '16+ év (Felnőtt)',
    preferredGroup: 'G-Force Felnőtt Versenyző',
    experience: 'Haladó (2-4 év)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await submitApplication(formData);
      setSubmitted(true);
      // Trigger golden celebratory confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5C76B', '#C9A227', '#FFFFFF']
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            <Sparkles size={14} />
            <span>CSATLAKOZZ HOZZÁNK</span>
          </div>
          <h1 className="section-title">
            ONLINE JELENTKEZÉS
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Jelentkezz ingyenes próbaóránkra vagy válogatónkra! Töltsd ki az űrlapot, és munkatársunk 24 órán belül felveszi veled a kapcsolatot.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px', maxWidth: '720px' }}>
        {submitted ? (
          <div className="card-luxury" style={{ textAlign: 'center', padding: '60px 30px' }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              background: 'rgba(201, 162, 39, 0.2)',
              border: '2px solid var(--gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              boxShadow: '0 0 30px rgba(201,162,39,0.4)'
            }}>
              <CheckCircle2 size={36} color="var(--gold-light)" />
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: '#FFF', marginBottom: '12px' }}>
              SIKERES JELENTKEZÉS!
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 30px' }}>
              Köszönjük a bizalmadat! Rendszerünk rögzítette a jelentkezésedet a <strong>{formData.preferredGroup}</strong> csoportba. Hamarosan küldjük a próbaóra részleteit az e-mail címedre!
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                onClick={() => setSubmitted(false)}
                className="btn-ghost"
              >
                Újabb jelentkezés leadása
              </button>
              <button
                onClick={() => setCurrentPage('home')}
                className="btn-gold"
              >
                Vissza a főoldalra
              </button>
            </div>
          </div>
        ) : (
          <div className="card-luxury">
            <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '6px' }}>
              Próbaóra Jelentkezési Lap
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
              A csillaggal (*) jelölt mezők kitöltése kötelező.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Jelentkező teljes neve *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. Tóth Balázs"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    E-mail cím *
                  </label>
                  <input
                    type="email"
                    required
                    className="input-luxury"
                    placeholder="balazs@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Telefonszám (szülőé, ha kiskorú) *
                  </label>
                  <input
                    type="tel"
                    required
                    className="input-luxury"
                    placeholder="+36 30 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Korosztály *
                  </label>
                  <select
                    className="input-luxury"
                    value={formData.ageGroup}
                    onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                  >
                    <option value="6-10 év (Mini)">6-10 év (Mini Stars)</option>
                    <option value="11-15 év (Junior)">11-15 év (Junior)</option>
                    <option value="16+ év (Felnőtt)">16+ év (Felnőtt)</option>
                    <option value="25+ év (Hobbi)">25+ év (Felnőtt Hobbi)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Kiválasztott tánccsoport *
                  </label>
                  <select
                    className="input-luxury"
                    value={formData.preferredGroup}
                    onChange={(e) => setFormData({ ...formData, preferredGroup: e.target.value })}
                  >
                    <option value="G-Force Felnőtt Versenyző">G-Force Felnőtt Versenyző</option>
                    <option value="Junior Modern Elite">Junior Modern Elite</option>
                    <option value="Mini Stars Gyerek Tánccsoport">Mini Stars Gyerek Tánccsoport</option>
                    <option value="Kezdő Showtánc & Girly">Kezdő Showtánc & Girly Hip-Hop</option>
                    <option value="Még nem tudom / Szintfelmérőt kérek">Még nem tudom (Szintfelmérőt kérek)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Korábbi tánctapasztalat
                </label>
                <select
                  className="input-luxury"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                >
                  <option value="Teljesen kezdő">Teljesen kezdő (nincs korábbi tapasztalat)</option>
                  <option value="Alapszint (1-2 év)">Alapszint (1-2 év tánc vagy sport)</option>
                  <option value="Haladó (2-4 év)">Haladó (2-4 év tánciskolai tapasztalat)</option>
                  <option value="Versenyzői szint (4+ év)">Versenyzői szint (4+ év versenyzés)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Egyéb megjegyzés vagy kérdés
                </label>
                <textarea
                  rows="3"
                  className="input-luxury"
                  placeholder="Bármilyen információ, amit szeretnél megosztani velünk..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold"
                style={{ width: '100%', padding: '15px', marginTop: '10px' }}
              >
                <Sparkles size={18} />
                <span>{loading ? 'Jelentkezés küldése...' : 'Jelentkezés beküldése'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
