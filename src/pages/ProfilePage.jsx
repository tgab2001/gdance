import React, { useState } from 'react';
import { 
  User, Calendar, Clock, MapPin, Award, CheckCircle2, 
  Edit3, Save, Sparkles, Phone, Mail, Shield, QrCode 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { currentUser, updateProfile, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    nickname: currentUser?.nickname || '',
    phone: currentUser?.phone || '',
    bio: currentUser?.bio || '',
    emergencyContact: currentUser?.emergencyContact || ''
  });
  const [savedMsg, setSavedMsg] = useState(false);

  if (!currentUser) {
    return <div className="container" style={{ padding: '60px 0', color: '#FFF' }}>Nincs bejelentkezett felhasználó.</div>;
  }

  const handleSave = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      <section style={{
        padding: '50px 0 35px',
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(201, 162, 39, 0.25)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div className="section-badge">
                <User size={14} />
                <span>TAGSÁGI ADATOK & KÁRTYA</span>
              </div>
              <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                FELHASZNÁLÓI PROFIL
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Hivatalos akadémiai tagsági adatlap, csoporttagság és jelenléti történet.
              </p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? 'btn-ghost' : 'btn-outline-gold'}
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
            >
              <Edit3 size={16} />
              <span>{isEditing ? 'Mégse' : 'Profil szerkesztése'}</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {savedMsg && (
          <div style={{
            background: 'rgba(46, 204, 113, 0.2)',
            border: '1px solid var(--status-present)',
            color: '#64E798',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontWeight: 700
          }}>
            Profiladatok sikeresen elmentve!
          </div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {/* Left Column: ID Card with Black & Gold Luxury styling */}
          <div className="card-luxury" style={{
            background: 'linear-gradient(145deg, #161616 0%, #121008 100%)',
            border: '1px solid var(--gold-primary)',
            boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 25px rgba(201,162,39,0.25)',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              borderBottom: '1px solid rgba(201, 162, 39, 0.2)',
              paddingBottom: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--gold-light)" />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: '#FFF', letterSpacing: '0.1em' }}>
                  G DANCE PASS
                </span>
              </div>
              <span className={`badge-role badge-role-${currentUser.role}`}>
                {currentUser.role.toUpperCase()}
              </span>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                borderRadius: '50%',
                padding: '4px',
                background: 'var(--gold-gradient)',
                marginBottom: '14px'
              }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              <h2 style={{ fontSize: '1.45rem', color: '#FFF', marginBottom: '4px' }}>
                {currentUser.name}
              </h2>
              {currentUser.nickname && (
                <div style={{ color: 'var(--gold-light)', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '8px' }}>
                  „{currentUser.nickname}”
                </div>
              )}
              <div style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                ID: {currentUser.id} • Tagság kezdete: {currentUser.joinedDate}
              </div>
            </div>

            {/* Profile Meta Info */}
            <div style={{
              background: '#0E0E0E',
              borderRadius: '10px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              fontSize: '0.86rem',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>Tánccsoport:</span>
                <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>
                  {(currentUser.groupNames || ['G-Force'])[0]}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>Korosztály:</span>
                <span style={{ color: '#FFF' }}>{currentUser.ageGroup}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>Tagsági státusz:</span>
                <span style={{ color: 'var(--status-present)', fontWeight: 700 }}>
                  Aktív Tánctagság
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-dim)' }}>Jelenléti arány:</span>
                <span style={{ color: 'var(--gold-light)', fontWeight: 800 }}>
                  {currentUser.attendanceRate || 94}%
                </span>
              </div>
            </div>

            {/* Mock QR Code for future pass scanning */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '12px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              border: '1px dashed var(--border-gold)'
            }}>
              <QrCode size={28} color="var(--gold-light)" />
              <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', textAlign: 'left' }}>
                <strong style={{ color: 'var(--gold-light)', display: 'block' }}>Digitális Belépőkód</strong>
                QR jelenlét-beolvasáshoz a recepción
              </div>
            </div>
          </div>

          {/* Right Column: Edit or View Details */}
          <div className="card-luxury">
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '20px' }}>
              {isEditing ? 'Adatok Módosítása' : 'Részletes Profiladatok'}
            </h3>

            {isEditing ? (
              <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Teljes név
                  </label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Becenév
                    </label>
                    <input
                      type="text"
                      className="input-luxury"
                      value={formData.nickname}
                      onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      Telefonszám
                    </label>
                    <input
                      type="text"
                      className="input-luxury"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Vészhelyzeti Értesítendő Személy & Szám
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    placeholder="pl. Tóth Gábor (Apa) - +36 30 555 1234"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Bemutatkozás / Táncos céljaim
                  </label>
                  <textarea
                    rows="3"
                    className="input-luxury"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn-ghost"
                    style={{ flex: 1 }}
                  >
                    Mégse
                  </button>
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ flex: 1 }}
                  >
                    <Save size={16} />
                    <span>Mentés</span>
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    E-mail Cím:
                  </div>
                  <div style={{ color: '#FFF', fontSize: '0.94rem' }}>{currentUser.email}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Telefonszám:
                  </div>
                  <div style={{ color: '#FFF', fontSize: '0.94rem' }}>{currentUser.phone || 'Nincs megadva'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Vészhelyzeti Értesítendő:
                  </div>
                  <div style={{ color: 'var(--gold-light)', fontSize: '0.94rem' }}>
                    {currentUser.emergencyContact || 'Tóth Gábor (Apa) - +36 30 555 1234'}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Táncos Bemutatkozás:
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                    {currentUser.bio || 'Fő táncstílusom a contemporary és experimental hip-hop. Célom a 2026-os Európa Bajnokság dobogós helyezése.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
