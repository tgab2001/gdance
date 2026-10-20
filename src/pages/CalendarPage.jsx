import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Users, Plus, 
  ChevronLeft, ChevronRight, Check, X, Sparkles, Filter 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTrainings, getGroups, createTraining, subscribeToDatabase } from '../services/database';

export function CalendarPage({ setCurrentPage }) {
  const { currentUser, role, isAdmin, isInstructor } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [groups, setGroups] = useState([]);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'week' | 'month'
  const [selectedGroupId, setSelectedGroupId] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for creating training
  const [newTraining, setNewTraining] = useState({
    title: '',
    groupId: 'grp_gforce',
    groupName: 'G-Force Felnőtt Versenyző',
    instructor: 'Kovács Zoltán',
    date: '2026-10-26',
    startTime: '18:00',
    endTime: '20:00',
    location: 'A Terem - Tükrös Főstúdió',
    notes: ''
  });

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setTrainings(state.trainings);
      setGroups(state.groups);
    });
    return unsub;
  }, []);

  // Filter trainings: Dancer only sees their own groups
  const filteredTrainings = trainings.filter(t => {
    if (role === 'dancer' && currentUser?.groupIds) {
      return currentUser.groupIds.includes(t.groupId);
    }
    if (selectedGroupId !== 'all') {
      return t.groupId === selectedGroupId;
    }
    return true;
  });

  const handleCreateTraining = async (e) => {
    e.preventDefault();
    const grp = groups.find(g => g.id === newTraining.groupId);
    await createTraining({
      ...newTraining,
      groupName: grp ? grp.name : newTraining.groupName
    });
    setShowAddModal(false);
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
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
                <CalendarIcon size={14} />
                <span>ÓRAREND & PRÓBÁK</span>
              </div>
              <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                EDZÉSNAPTÁR
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {role === 'dancer' ? 'Kizárólag a te tánccsoportod edzései' : 'Akadémiai központi edzésbeosztás'}
              </p>
            </div>

            {/* Actions & Add Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {(isAdmin || isInstructor) && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn-gold"
                  style={{ padding: '12px 22px', fontSize: '0.86rem' }}
                >
                  <Plus size={18} />
                  <span>Új edzés kiírása</span>
                </button>
              )}

              {(isAdmin || isInstructor) && (
                <button
                  onClick={() => setCurrentPage('attendance')}
                  className="btn-outline-gold"
                  style={{ padding: '12px 20px', fontSize: '0.86rem' }}
                >
                  <Check size={16} />
                  <span>Jelenléti ív</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {/* Controls Bar: View modes & Group filter */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#141414',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '14px 20px',
          marginBottom: '30px'
        }}>
          {/* View Mode Buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              Közelgő lista
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={viewMode === 'week' ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              Heti nézet
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={viewMode === 'month' ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              Havi nézet
            </button>
          </div>

          {/* Group Filter (For instructors/admins) */}
          {(isAdmin || isInstructor) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Filter size={16} color="var(--gold-light)" />
              <select
                className="input-luxury"
                style={{ padding: '8px 14px', fontSize: '0.84rem', width: 'auto' }}
                value={selectedGroupId}
                onChange={(e) => setSelectedGroupId(e.target.value)}
              >
                <option value="all">Minden tánccsoport</option>
                {groups.map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* VIEW 1: LIST VIEW */}
        {viewMode === 'list' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {filteredTrainings.length === 0 ? (
              <div className="card-luxury" style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                <CalendarIcon size={36} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
                <p>Nincs megjeleníthető edzés ebben a szűrésben.</p>
              </div>
            ) : (
              filteredTrainings.map(t => (
                <div
                  key={t.id}
                  className="card-luxury"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                    padding: '22px 28px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    {/* Date Block */}
                    <div style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2), rgba(229, 199, 107, 0.05))',
                      border: '1px solid var(--border-gold)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gold-light)', textTransform: 'uppercase', fontWeight: 700 }}>
                        {new Date(t.date).toLocaleDateString('hu-HU', { weekday: 'short' })}
                      </span>
                      <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>
                        {new Date(t.date).getDate()}
                      </span>
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span style={{
                          background: 'rgba(201, 162, 39, 0.15)',
                          color: 'var(--gold-light)',
                          fontWeight: 700,
                          fontSize: '0.74rem',
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}>
                          {t.groupName}
                        </span>
                        <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>• {t.date}</span>
                      </div>

                      <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '8px' }}>
                        {t.title}
                      </h3>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.84rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={14} color="var(--gold-primary)" />
                          <span>{t.startTime} - {t.endTime}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={14} color="var(--gold-primary)" />
                          <span>{t.location}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Users size={14} color="var(--gold-primary)" />
                          <span>Oktató: {t.instructor}</span>
                        </div>
                      </div>

                      {t.notes && (
                        <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--gold-light)', fontStyle: 'italic' }}>
                          Megjegyzés: {t.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {(isAdmin || isInstructor) && (
                    <button
                      onClick={() => setCurrentPage('attendance')}
                      className="btn-outline-gold"
                      style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    >
                      Jelenléti ív vezetése
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* VIEW 2: WEEKLY VIEW */}
        {viewMode === 'week' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '14px'
          }}>
            {['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap'].map((day, idx) => (
              <div key={idx} style={{
                background: '#131313',
                border: '1px solid var(--border-subtle)',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--gold-light)', fontSize: '0.9rem', marginBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px' }}>
                  {day}
                </div>
                {idx === 1 && (
                  <div style={{ background: '#1C190D', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', fontSize: '0.78rem', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--gold-light)', display: 'block' }}>G-Force Felnőtt</strong>
                    <span style={{ color: '#DDD' }}>18:00 - 20:00</span>
                    <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>A Terem</div>
                  </div>
                )}
                {idx === 2 && (
                  <div style={{ background: '#161616', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '10px', fontSize: '0.78rem', marginBottom: '8px' }}>
                    <strong style={{ color: '#FFF', display: 'block' }}>Junior Modern</strong>
                    <span style={{ color: '#DDD' }}>16:30 - 18:00</span>
                    <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>B Terem</div>
                  </div>
                )}
                {idx === 3 && (
                  <div style={{ background: '#1C190D', border: '1px solid var(--border-gold)', borderRadius: '6px', padding: '10px', fontSize: '0.78rem', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--gold-light)', display: 'block' }}>G-Force Akrobatika</strong>
                    <span style={{ color: '#DDD' }}>17:30 - 20:30</span>
                    <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>A Terem</div>
                  </div>
                )}
                {idx === 5 && (
                  <div style={{ background: '#161616', border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '10px', fontSize: '0.78rem', marginBottom: '8px' }}>
                    <strong style={{ color: 'var(--gold-light)', display: 'block' }}>Hétvégi Mesterkurzus</strong>
                    <span style={{ color: '#DDD' }}>10:00 - 13:00</span>
                    <div style={{ color: 'var(--text-dim)', marginTop: '4px' }}>A Terem</div>
                  </div>
                )}
                {![1, 2, 3, 5].includes(idx) && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic', padding: '10px 0' }}>
                    Nincs kiírt edzés
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* VIEW 3: MONTHLY VIEW */}
        {viewMode === 'month' && (
          <div className="card-luxury">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>2026. Október</h3>
              <div style={{ fontSize: '0.84rem', color: 'var(--gold-light)' }}>
                Arany jelzés: Kiírt táncedzések
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '6px',
              textAlign: 'center',
              fontSize: '0.84rem'
            }}>
              {['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'].map((d, i) => (
                <div key={i} style={{ color: 'var(--gold-light)', fontWeight: 700, padding: '8px 0' }}>
                  {d}
                </div>
              ))}

              {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                const hasPractice = [2, 6, 8, 13, 15, 20, 22, 24, 27, 29].includes(day);
                return (
                  <div
                    key={day}
                    style={{
                      height: '60px',
                      background: hasPractice ? 'rgba(201, 162, 39, 0.12)' : 'rgba(255,255,255,0.02)',
                      border: hasPractice ? '1px solid var(--gold-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: '6px',
                      padding: '4px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      cursor: hasPractice ? 'pointer' : 'default'
                    }}
                  >
                    <span style={{ fontWeight: hasPractice ? 800 : 400, color: hasPractice ? 'var(--gold-light)' : '#AAA' }}>
                      {day}
                    </span>
                    {hasPractice && (
                      <span style={{ fontSize: '0.65rem', color: 'var(--gold-light)', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', padding: '1px' }}>
                        Edzés
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add Training Modal for Instructors / Admins */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2500,
          padding: '20px'
        }}>
          <div style={{
            background: '#121212',
            border: '1px solid var(--gold-primary)',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '100%',
            padding: '30px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#FFF' }}>Új Edzés Kiírása</h3>
              <button onClick={() => setShowAddModal(false)} style={{ background: 'none', border: 'none', color: '#AAA', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTraining} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Edzés megnevezése *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. Versenyfelkészülés & Szinkrontréning"
                  value={newTraining.title}
                  onChange={(e) => setNewTraining({ ...newTraining, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Tánccsoport *
                  </label>
                  <select
                    className="input-luxury"
                    value={newTraining.groupId}
                    onChange={(e) => setNewTraining({ ...newTraining, groupId: e.target.value })}
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Oktató *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    value={newTraining.instructor}
                    onChange={(e) => setNewTraining({ ...newTraining, instructor: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Dátum *
                  </label>
                  <input
                    type="date"
                    required
                    className="input-luxury"
                    value={newTraining.date}
                    onChange={(e) => setNewTraining({ ...newTraining, date: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kezdés *
                  </label>
                  <input
                    type="time"
                    required
                    className="input-luxury"
                    value={newTraining.startTime}
                    onChange={(e) => setNewTraining({ ...newTraining, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Befejezés *
                  </label>
                  <input
                    type="time"
                    required
                    className="input-luxury"
                    value={newTraining.endTime}
                    onChange={(e) => setNewTraining({ ...newTraining, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Helyszín / Terem *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  value={newTraining.location}
                  onChange={(e) => setNewTraining({ ...newTraining, location: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Megjegyzés a táncosoknak
                </label>
                <input
                  type="text"
                  className="input-luxury"
                  placeholder="pl. Fekete fellépőcipő és törölköző kötelező"
                  value={newTraining.notes}
                  onChange={(e) => setNewTraining({ ...newTraining, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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
                  Edzés mentése
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
