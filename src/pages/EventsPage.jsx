import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Check, X, HelpCircle, Sparkles, AlertCircle } from 'lucide-react';
import { getEvents, saveEventResponse, subscribeToDatabase } from '../services/database';
import { useAuth } from '../context/AuthContext';

export function EventsPage({ onOpenAuth }) {
  const { currentUser, role, isAdmin, isInstructor } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setEvents(state.events);
    });
    return unsub;
  }, []);

  const handleRsvp = async (eventId, status) => {
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    await saveEventResponse(eventId, currentUser.id, status);
    setFeedbackMsg(`Válaszodat rögzítettük: ${status === 'going' ? 'Ott leszek! 🎉' : status === 'declined' ? 'Nem tudok menni' : 'Még nem tudom'}`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const filteredEvents = events.filter(e => {
    if (selectedFilter === 'all') return true;
    return e.category === selectedFilter;
  });

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
            <Calendar size={14} />
            <span>NAPTÁR ÉS RÉSZVÉTEL</span>
          </div>
          <h1 className="section-title">
            ESEMÉNYEK & VERSENYEK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Kövesd nyomon táncakadémiánk összes fellépését, bajnokságát és táborát! Tagjaink közvetlenül itt jelezhetik részvételi szándékukat.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {feedbackMsg && (
          <div style={{
            background: 'rgba(201, 162, 39, 0.2)',
            border: '1px solid var(--gold-primary)',
            color: 'var(--gold-light)',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: 600,
            animation: 'fadeIn 0.3s ease'
          }}>
            {feedbackMsg}
          </div>
        )}

        {/* Categories */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {['all', 'Verseny', 'Fellépés', 'Workshop'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={selectedFilter === cat ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '8px 18px', fontSize: '0.84rem' }}
            >
              {cat === 'all' ? 'Összes kategória' : cat}
            </button>
          ))}
        </div>

        {/* Events List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {filteredEvents.map(evt => {
            const userRsvp = currentUser ? (evt.rsvps || {})[currentUser.id] : null;
            const rsvpCounts = {
              going: Object.values(evt.rsvps || {}).filter(s => s === 'going').length,
              declined: Object.values(evt.rsvps || {}).filter(s => s === 'declined').length,
              undecided: Object.values(evt.rsvps || {}).filter(s => s === 'undecided').length
            };

            return (
              <div key={evt.id} className="card-luxury" style={{ padding: 0 }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '0'
                }}>
                  {/* Event Poster/Photo */}
                  <div style={{ height: '280px', position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={evt.image}
                      alt={evt.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      background: 'var(--gold-gradient)',
                      color: '#000',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      padding: '5px 14px',
                      borderRadius: '20px'
                    }}>
                      {evt.category}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--gold-light)', fontSize: '0.88rem', marginBottom: '8px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={16} />
                        <span>{evt.date}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Clock size={16} />
                        <span>{evt.time}</span>
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.45rem', color: '#FFF', marginBottom: '12px' }}>
                      {evt.title}
                    </h3>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '14px' }}>
                      <MapPin size={16} color="var(--gold-primary)" />
                      <span>{evt.location}</span>
                    </div>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                      {evt.description}
                    </p>

                    <div style={{
                      background: '#161616',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      marginBottom: '20px',
                      fontSize: '0.82rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      <span style={{ color: 'var(--text-dim)' }}>
                        Érintett csoportok: <strong style={{ color: '#EEE' }}>{evt.affectedGroups}</strong>
                      </span>
                      {(isAdmin || isInstructor) && (
                        <span style={{ color: 'var(--gold-light)', fontWeight: 600 }}>
                          Jelentkezők: {rsvpCounts.going} fő | Nem jön: {rsvpCounts.declined} fő
                        </span>
                      )}
                    </div>

                    {/* RSVP Selector */}
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
                        {currentUser ? 'Részvételi szándékod:' : 'Jelentkezz be a részvétel jelzéséhez:'}
                      </div>

                      {currentUser ? (
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleRsvp(evt.id, 'going')}
                            style={{
                              background: userRsvp === 'going' ? 'var(--status-present)' : 'rgba(46, 204, 113, 0.1)',
                              color: userRsvp === 'going' ? '#000' : 'var(--status-present)',
                              border: '1px solid var(--status-present)',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <Check size={14} />
                            Ott leszek ({rsvpCounts.going})
                          </button>

                          <button
                            onClick={() => handleRsvp(evt.id, 'declined')}
                            style={{
                              background: userRsvp === 'declined' ? 'var(--status-absent)' : 'rgba(231, 76, 60, 0.1)',
                              color: userRsvp === 'declined' ? '#FFF' : 'var(--status-absent)',
                              border: '1px solid var(--status-absent)',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <X size={14} />
                            Nem tudok menni
                          </button>

                          <button
                            onClick={() => handleRsvp(evt.id, 'undecided')}
                            style={{
                              background: userRsvp === 'undecided' ? 'var(--gold-light)' : 'rgba(229, 199, 107, 0.1)',
                              color: userRsvp === 'undecided' ? '#000' : 'var(--gold-light)',
                              border: '1px solid var(--gold-light)',
                              borderRadius: '8px',
                              padding: '8px 16px',
                              fontSize: '0.82rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}
                          >
                            <HelpCircle size={14} />
                            Még nem tudom
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={onOpenAuth}
                          className="btn-outline-gold"
                          style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                        >
                          Bejelentkezés szükséges
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
