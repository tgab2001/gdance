import React from 'react';
import { Sparkles, Award, Mail } from 'lucide-react';

export function Instructors({ setCurrentPage }) {
  const instructors = [
    {
      name: 'Kovács Zoltán',
      role: 'Alapító & Művészeti Vezető',
      style: 'Urban Dance, Hip-Hop Choreography, Krump',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      bio: 'Több mint 15 éves nemzetközi tánctapasztalattal rendelkező mesteroktató. 3-szoros magyar bajnok koreográfus, aki számos televíziós showműsor és koncert vezető koreográfiáját jegyzi.',
      achievements: ['Magyar Bajnoki Cím 2024, 2026', 'Best European Choreographer Nominee', 'Nemzetközi zsűritag']
    },
    {
      name: 'Nagy Viktória',
      role: 'Vezető Koreográfus',
      style: 'Modern & Kortárs Tánc, Floorwork, Lyrical Jazz',
      image: '/images/director.jpg',
      bio: 'A Magyar Táncművészeti Egyetemen szerzett diplomát modern tánc szakon. Különleges stílusa a technikai feszesség és a mély érzelmi kifejezés ötvözetéből születik.',
      achievements: ['Grand Prix Koreográfiai Különdíj 2026', 'Magyar Táncművészeti Egyetem Alumna', 'Színházi táncszólista']
    },
    {
      name: 'Balogh Márk',
      role: 'Hip-Hop & Akrobatika Tréner',
      style: 'Breakdance, Bboying, Power Moves, Commercial Hip-Hop',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
      bio: 'Dinamikus, energikus óráin a táncosok testtudata és fizikai állóképessége robbanásszerű fejlődésen megy keresztül. Kiemelt figyelmet fordít a biztonságos akrobatikára.',
      achievements: ['Red Bull BC One Regional Finalist', '10+ év akrobatika oktatói tapasztalat']
    },
    {
      name: 'Szabó Eszter',
      role: 'Klasszikus Balett & Nyújtás Specialista',
      style: 'Balett technika, Stretching, Gyermek Ritmuskészség',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
      bio: 'A tiszta vonalak, a tartás és a hajlékonyság mestere. A Mini Stars csoportok szeretett oktatója, akinél a legkisebbek is játékosan sajátítják el a tánc fegyelmét.',
      achievements: ['Klasszikus Balett Pedagógus', 'Stretching & Flexibility Cert']
    }
  ];

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
            <span>AKADÉMIAI SZAKEMBERGÁRDA</span>
          </div>
          <h1 className="section-title">
            OKTATÓINK & KOREOGRÁFUSAINK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Elismert szakemberek, akik nem csupán oktatnak, hanem inspirálnak és példát mutatnak a mindennapokban.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {instructors.map((ins, idx) => (
            <div key={idx} className="card-luxury" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ height: '320px', position: 'relative' }}>
                <img
                  src={ins.image}
                  alt={ins.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '50%',
                  background: 'linear-gradient(to top, #121212, transparent)'
                }} />
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{
                  fontSize: '0.78rem',
                  color: 'var(--gold-primary)',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  marginBottom: '4px'
                }}>
                  {ins.role}
                </div>

                <h3 style={{ fontSize: '1.4rem', color: '#FFF', marginBottom: '8px' }}>
                  {ins.name}
                </h3>

                <div style={{
                  fontSize: '0.84rem',
                  color: 'var(--gold-light)',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  marginBottom: '16px'
                }}>
                  {ins.style}
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '20px' }}>
                  {ins.bio}
                </p>

                <div style={{
                  background: '#161616',
                  borderRadius: '8px',
                  padding: '14px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                    Kiemelt Elismerések:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {ins.achievements.map((ach, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#DDD' }}>
                        <Award size={14} color="var(--gold-primary)" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentPage('apply')}
                  className="btn-outline-gold"
                  style={{ width: '100%', padding: '11px', fontSize: '0.84rem' }}
                >
                  Jelentkezés az óráira
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
