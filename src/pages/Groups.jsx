import React, { useState, useEffect } from 'react';
import { Users, Clock, Calendar, Sparkles, Check, ArrowRight } from 'lucide-react';
import { getGroups } from '../services/database';

export function Groups({ setCurrentPage }) {
  const [groups, setGroups] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const data = await getGroups();
    setGroups(data);
  };

  const filtered = groups.filter(g => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'competition') return g.category.includes('Versenyző');
    if (selectedFilter === 'kids') return g.category.includes('Gyermek');
    if (selectedFilter === 'hobby') return g.category.includes('Hobbi');
    return true;
  });

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{
        padding: '70px 0 50px',
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(201, 162, 39, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="section-badge" style={{ margin: '0 auto 14px' }}>
            <Sparkles size={14} />
            <span>KOROSZTÁLYOK ÉS TÁNCSZINTEK</span>
          </div>
          <h1 className="section-title">
            TÁNCCSOPORTOK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Találd meg a stílusodhoz és korosztályodhoz legjobban illő csoportot, vagy jelentkezz nyílt szintfelmérőnkre!
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '45px'
        }}>
          {[
            { id: 'all', label: 'Összes csoport' },
            { id: 'competition', label: 'Versenyzői csapatok' },
            { id: 'kids', label: 'Gyermek tánccsoportok' },
            { id: 'hobby', label: 'Felnőtt hobbi órák' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={selectedFilter === f.id ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '9px 20px', fontSize: '0.86rem' }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Groups Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '30px'
        }}>
          {filtered.map(group => (
            <div key={group.id} className="card-luxury" style={{ padding: 0, display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={group.image}
                  alt={group.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {group.category}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(6px)',
                  color: 'var(--gold-light)',
                  border: '1px solid var(--border-gold)',
                  fontWeight: 700,
                  fontSize: '0.74rem',
                  padding: '4px 12px',
                  borderRadius: '20px'
                }}>
                  {group.ageRange}
                </div>
              </div>

              <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.35rem', color: '#FFF', marginBottom: '10px' }}>
                  {group.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px', flex: 1 }}>
                  {group.description}
                </p>

                {/* Details List */}
                <div style={{
                  background: '#161616',
                  borderRadius: '10px',
                  padding: '16px',
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  fontSize: '0.85rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-main)' }}>
                    <Users size={16} color="var(--gold-primary)" />
                    <span>Vezetőedző: <strong style={{ color: 'var(--gold-light)' }}>{group.instructor}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-main)' }}>
                    <Clock size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{group.scheduleDescription}</span>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }}>
                  {group.tags.map((tag, i) => (
                    <span key={i} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '14px',
                      padding: '3px 10px',
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)'
                    }}>
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage('apply')}
                  className="btn-gold"
                  style={{ width: '100%', padding: '13px' }}
                >
                  <span>Jelentkezés a csoportba</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
