import React from 'react';
import { Sparkles, Calendar, MapPin, Play, Award } from 'lucide-react';

export function Performances({ setCurrentPage }) {
  const performances = [
    {
      title: "Nemzeti Táncszínház Évzáró Gála",
      venue: "Nemzeti Táncszínház, Budapest",
      date: "2025. december",
      image: "/images/hero-dancer.jpg",
      desc: "Teltházas nagyszínpadi előadás a teljes akadémiai tagság részvételével, vendégművészekkel és élőzenekari kísérettel.",
      style: "Kortárs Balett & Modern Show"
    },
    {
      title: "Városligeti Street Dance Fesztivál",
      venue: "Budapest, Városliget Nagyszínpad",
      date: "2025. augusztus",
      image: "/images/crew-stage.jpg",
      desc: "Több mint 3000 fős közönség előtt bemutatott energikus 20 perces urban dance fúziós előadás.",
      style: "Hip-Hop & Break Akrobatika"
    },
    {
      title: "Televíziós Gálashow Élő Adás",
      venue: "MTVA Stúdió 1.",
      date: "2024. november",
      image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80",
      desc: "Élő televíziós táncprodukció a G-Force elit csapattal és hazai sztárfellépőkkel.",
      style: "Commercial Dance"
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
            <span>SZÍNPADI PILLANATOK</span>
          </div>
          <h1 className="section-title">
            FELLÉPÉSEK & GÁLÁK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            A próbatermi izzadságos munka a színpad fényében válik varázslattá. Tekintsd meg legemlékezetesebb nagyszínpadi fellépéseinket!
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {performances.map((perf, idx) => (
            <div key={idx} className="card-luxury" style={{ padding: 0 }}>
              <div style={{ height: '240px', position: 'relative' }}>
                <img src={perf.image} alt={perf.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  left: '14px',
                  background: 'var(--gold-gradient)',
                  color: '#000',
                  fontWeight: 800,
                  fontSize: '0.74rem',
                  padding: '4px 12px',
                  borderRadius: '16px'
                }}>
                  {perf.style}
                </div>
              </div>

              <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--gold-light)', fontSize: '0.82rem', marginBottom: '8px' }}>
                  <Calendar size={14} />
                  <span>{perf.date}</span>
                </div>

                <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '8px' }}>
                  {perf.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.84rem', marginBottom: '14px' }}>
                  <MapPin size={14} color="var(--gold-primary)" />
                  <span>{perf.venue}</span>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {perf.desc}
                </p>

                <button
                  onClick={() => setCurrentPage('videos')}
                  className="btn-outline-gold"
                  style={{ width: '100%', padding: '10px', fontSize: '0.82rem' }}
                >
                  <Play size={14} />
                  Videó megtekintése a videótárban
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
