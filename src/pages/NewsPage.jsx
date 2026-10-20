import React, { useState, useEffect } from 'react';
import { Calendar, User, Sparkles, ArrowRight, X } from 'lucide-react';
import { getNews, subscribeToDatabase } from '../services/database';

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setNews(state.news);
    });
    return unsub;
  }, []);

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
            <span>KÖZLEMÉNYEK ÉS SIKEREK</span>
          </div>
          <h1 className="section-title">
            HÍREK & CIKKEK
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Minden fontos akadémiai információ, versenyeredmény és felhívás egy helyen.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
          {news.map(item => (
            <div
              key={item.id}
              className="card-luxury"
              style={{ padding: 0, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
              onClick={() => setActiveArticle(item)}
            >
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
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
                  borderRadius: '16px'
                }}>
                  {item.category}
                </div>
              </div>

              <div style={{ padding: '24px 28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--text-dim)', fontSize: '0.8rem', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={13} color="var(--gold-primary)" />
                    <span>{item.date}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={13} color="var(--gold-primary)" />
                    <span>{item.author}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '10px', lineHeight: 1.4 }}>
                  {item.title}
                </h3>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                  {item.excerpt}
                </p>

                <div style={{
                  color: 'var(--gold-light)',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span>Teljes cikk elolvasása</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            background: '#121212',
            border: '1px solid var(--border-gold)',
            borderRadius: '16px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9)'
          }}>
            <button
              onClick={() => setActiveArticle(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(0,0,0,0.6)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <img
              src={activeArticle.image}
              alt={activeArticle.title}
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: 'var(--gold-light)', fontSize: '0.82rem', marginBottom: '12px' }}>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>Szerző: {activeArticle.author}</span>
                <span>•</span>
                <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>{activeArticle.category}</span>
              </div>

              <h2 style={{ fontSize: '1.6rem', color: '#FFF', marginBottom: '16px', lineHeight: 1.3 }}>
                {activeArticle.title}
              </h2>

              <div style={{ color: 'var(--text-muted)', fontSize: '0.96rem', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '16px', fontWeight: 600, color: '#EEE' }}>
                  {activeArticle.excerpt}
                </p>
                <p>
                  {activeArticle.content}
                </p>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'right' }}>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="btn-gold"
                  style={{ padding: '10px 24px' }}
                >
                  Bezárás
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
