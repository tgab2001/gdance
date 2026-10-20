import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, Users, Award, Bell, ChevronRight, 
  ArrowRight, CheckCircle2, AlertCircle, Shield, Plus, Sparkles, TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTrainings, getEvents, getNews, getNotifications, subscribeToDatabase } from '../services/database';

export function Dashboard({ setCurrentPage, onOpenNotifs }) {
  const { currentUser, role, isAdmin, isInstructor, isDancer, isParent, unreadCount } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [userGroupTrainings, setUserGroupTrainings] = useState([]);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setTrainings(state.trainings);
      setEvents(state.events);
      setNews(state.news);

      if (currentUser) {
        const userGroups = currentUser.groupIds || [];
        // Dancer sees their group's trainings, Admin sees all
        const filtered = state.trainings.filter(t => {
          if (role === 'admin') return true;
          return userGroups.includes(t.groupId);
        });
        setUserGroupTrainings(filtered);
      }
    });

    return unsub;
  }, [currentUser, role]);

  if (!currentUser) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#FFF', marginBottom: '16px' }}>Kérjük, jelentkezz be a Tagfelület megtekintéséhez!</h2>
        <button onClick={() => setCurrentPage('home')} className="btn-gold">
          Vissza a főoldalra
        </button>
      </div>
    );
  }

  const nextTraining = userGroupTrainings[0] || trainings[0];
  const nextEvent = events[0];
  const latestNews = news.slice(0, 2);

  // Role badges & titles
  const roleNameMap = {
    admin: 'Vezetőségi Dashboard',
    instructor: 'Oktatói Menedzsment',
    dancer: 'Táncos Tagfelület',
    parent: 'Szülői Kapcsolattartás'
  };

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Top Welcome Banner */}
      <section style={{
        padding: '50px 0 35px',
        background: 'linear-gradient(180deg, #121008 0%, #0B0B0B 100%)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid var(--gold-light)',
                    boxShadow: '0 0 20px rgba(201, 162, 39, 0.35)'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '2px',
                  right: '2px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: 'var(--status-present)',
                  border: '2px solid #000'
                }} />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                    color: '#FFFFFF'
                  }}>
                    Szia, {currentUser.nickname || currentUser.name.split(' ')[0]}! 👋
                  </h1>
                  <span className={`badge-role badge-role-${currentUser.role}`}>
                    {currentUser.role.toUpperCase()}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  {roleNameMap[currentUser.role]} • Csoport: <strong style={{ color: 'var(--gold-light)' }}>{(currentUser.groupNames || ['Általános'])[0]}</strong>
                </p>
              </div>
            </div>

            {/* Quick Action Buttons for Role */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setCurrentPage('calendar')}
                className="btn-gold"
                style={{ padding: '11px 20px', fontSize: '0.84rem' }}
              >
                <Calendar size={16} />
                <span>Edzésnaptár</span>
              </button>

              {(isInstructor || isAdmin) && (
                <button
                  onClick={() => setCurrentPage('attendance')}
                  className="btn-outline-gold"
                  style={{ padding: '11px 20px', fontSize: '0.84rem' }}
                >
                  <CheckCircle2 size={16} />
                  <span>Jelenlét beírása</span>
                </button>
              )}

              {isAdmin && (
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="btn-outline-gold"
                  style={{ padding: '11px 20px', fontSize: '0.84rem' }}
                >
                  <Shield size={16} />
                  <span>Admin Vezérlőpult</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard Cards Grid */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '35px'
        }}>
          {/* CARD 1: Következő edzés */}
          <div className="card-luxury" style={{ borderLeft: '4px solid var(--gold-primary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Clock size={16} />
                <span>KÖVETKEZŐ EDZÉS</span>
              </div>
              <span style={{ background: 'rgba(201, 162, 39, 0.15)', color: 'var(--gold-light)', fontSize: '0.74rem', padding: '2px 8px', borderRadius: '10px' }}>
                Közelgő
              </span>
            </div>

            {nextTraining ? (
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '10px' }}>
                  {nextTraining.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={14} color="var(--gold-primary)" />
                    <span>{nextTraining.date} | {nextTraining.startTime} - {nextTraining.endTime}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MapPin size={14} color="var(--gold-primary)" />
                    <span>{nextTraining.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={14} color="var(--gold-primary)" />
                    <span>Oktató: {nextTraining.instructor}</span>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentPage('calendar')}
                  className="btn-ghost"
                  style={{ width: '100%', fontSize: '0.82rem', justifyContent: 'space-between' }}
                >
                  <span>Naptár megnyitása</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nincs kiírt edzés a héten.</p>
            )}
          </div>

          {/* CARD 2: Jelenléti Statisztika */}
          <div className="card-luxury">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <TrendingUp size={16} />
                <span>JELENLÉTI ARÁNY</span>
              </div>
              <span style={{ color: 'var(--status-present)', fontSize: '0.78rem', fontWeight: 700 }}>
                Kiváló aktív tagság
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '16px' }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: 'conic-gradient(var(--gold-light) 0% 94%, #222 94% 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(201, 162, 39, 0.25)'
              }}>
                <div style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '50%',
                  backgroundColor: '#121212',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: 'var(--gold-light)'
                }}>
                  {currentUser.attendanceRate || 94}%
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.9rem', color: '#FFF', fontWeight: 600, marginBottom: '4px' }}>
                  {currentUser.nickname || currentUser.name} – {currentUser.attendanceRate || 94}% jelenlét
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Utolsó 20 edzésből 19 alkalommal pontos és felkészült megjelenés.
                </p>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage(isInstructor ? 'attendance' : 'profile')}
              className="btn-ghost"
              style={{ width: '100%', fontSize: '0.82rem', justifyContent: 'space-between' }}
            >
              <span>{isInstructor ? 'Jelenléti ívek kezelése' : 'Részletes jelenléti történet'}</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* CARD 3: Következő esemény & RSVP */}
          <div className="card-luxury">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Award size={16} />
                <span>KÖVETKEZŐ ESEMÉNY</span>
              </div>
              <span style={{ background: 'rgba(46, 204, 113, 0.15)', color: 'var(--status-present)', fontSize: '0.74rem', padding: '2px 8px', borderRadius: '10px' }}>
                Ott leszel
              </span>
            </div>

            {nextEvent ? (
              <div>
                <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '8px' }}>
                  {nextEvent.title}
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '4px' }}>
                  {nextEvent.date} • {nextEvent.location}
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px', lineHeight: 1.5 }}>
                  Határidő a részvételi létszám véglegesítésére: {nextEvent.rsvpDeadLine}
                </p>
                <button
                  onClick={() => setCurrentPage('events')}
                  className="btn-ghost"
                  style={{ width: '100%', fontSize: '0.82rem', justifyContent: 'space-between' }}
                >
                  <span>Esemény részletei & RSVP</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Nincs közelgő esemény.</p>
            )}
          </div>
        </div>

        {/* Second Row: Notifications & Studio News */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {/* Notifications Card */}
          <div className="card-luxury">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Bell size={18} color="var(--gold-light)" />
                <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>Belső Értesítések</h3>
              </div>
              {unreadCount > 0 && (
                <span style={{
                  background: 'var(--gold-primary)',
                  color: '#000',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {unreadCount} ÚJ
                </span>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                background: 'rgba(201, 162, 39, 0.08)',
                border: '1px solid var(--border-gold)',
                borderRadius: '8px',
                padding: '14px'
              }}>
                <div style={{ fontWeight: 700, color: 'var(--gold-light)', fontSize: '0.88rem', marginBottom: '4px' }}>
                  Edzésidőpont módosítás csütörtökön!
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  A csütörtöki edzés 18:00 helyett 17:30-kor kezdődik a közelgő verseny miatt.
                </p>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '14px'
              }}>
                <div style={{ fontWeight: 600, color: '#FFF', fontSize: '0.88rem', marginBottom: '4px' }}>
                  Új videó feltöltve a privát videótárba
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  A 3. felvonás szinkronrészletét már visszanézheted és gyakorolhatod.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenNotifs}
              className="btn-ghost"
              style={{ width: '100%', marginTop: '16px', fontSize: '0.82rem' }}
            >
              Összes értesítés megtekintése
            </button>
          </div>

          {/* Quick Group Info */}
          <div className="card-luxury">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} color="var(--gold-light)" />
                <h3 style={{ fontSize: '1.15rem', color: '#FFF' }}>Saját Csoportod</h3>
              </div>
              <button
                onClick={() => setCurrentPage('profile')}
                style={{ background: 'none', color: 'var(--gold-light)', fontSize: '0.8rem', fontWeight: 600 }}
              >
                Profilom
              </button>
            </div>

            <div style={{
              background: '#161616',
              borderRadius: '10px',
              padding: '18px',
              marginBottom: '16px'
            }}>
              <div style={{ fontSize: '1.15rem', color: '#FFF', fontWeight: 700, marginBottom: '6px' }}>
                {(currentUser.groupNames || ['G-Force Felnőtt'])[0]}
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--gold-light)', marginBottom: '12px' }}>
                Korosztály: {currentUser.ageGroup} • Tagság kezdete: {currentUser.joinedDate}
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Heti 3 intenzív próbatermi felkészülés, akrobatika és színpadi jelenlétfejlesztés.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setCurrentPage('videos')}
                className="btn-outline-gold"
                style={{ flex: 1, padding: '10px', fontSize: '0.82rem' }}
              >
                Gyakorlóvideók
              </button>
              <button
                onClick={() => setCurrentPage('groups')}
                className="btn-ghost"
                style={{ flex: 1, padding: '10px', fontSize: '0.82rem' }}
              >
                Csoport részletei
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
