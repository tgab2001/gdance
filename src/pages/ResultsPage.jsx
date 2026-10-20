import React, { useState, useEffect } from 'react';
import { Award, Sparkles, Trophy, Medal, Star } from 'lucide-react';
import { getResults, subscribeToDatabase } from '../services/database';

export function ResultsPage() {
  const [results, setResults] = useState([]);
  const [selectedYear, setSelectedYear] = useState('all');

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setResults(state.results);
    });
    return unsub;
  }, []);

  const years = ['all', '2026', '2025', '2024'];

  const filtered = results.filter(r => {
    if (selectedYear === 'all') return true;
    return r.year === selectedYear;
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
            <Award size={14} />
            <span>VERSENYEK ÉS ELISMERÉSEK</span>
          </div>
          <h1 className="section-title">
            EREDMÉNYEINK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A kemény munka és kitartás eredménye: dobogós helyezéseink a legrangosabb hazai és nemzetközi táncversenyeken.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {/* Year Filter */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '45px' }}>
          {years.map(y => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              className={selectedYear === y ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '10px 24px', fontSize: '0.9rem' }}
            >
              {y === 'all' ? 'Minden év' : `${y}. év`}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '850px', margin: '0 auto' }}>
          {filtered.map(res => (
            <div
              key={res.id}
              className="card-luxury"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                padding: '24px 30px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2), rgba(229, 199, 107, 0.05))',
                  border: '1px solid var(--gold-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(201, 162, 39, 0.25)',
                  flexShrink: 0
                }}>
                  <Trophy size={26} color="var(--gold-light)" />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '1.05rem',
                      fontWeight: 800,
                      color: 'var(--gold-light)'
                    }}>
                      {res.badge}
                    </span>
                    <span style={{
                      background: 'rgba(255,255,255,0.06)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '0.74rem',
                      color: 'var(--text-dim)'
                    }}>
                      {res.year}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '4px' }}>
                    {res.competition}
                  </h3>

                  <div style={{ fontSize: '0.86rem', color: 'var(--gold-primary)', fontWeight: 600, marginBottom: '6px' }}>
                    {res.category} — {res.group}
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    {res.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
