import React, { useState, useEffect } from 'react';
import { Sparkles, Image as ImageIcon, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { getGallery, subscribeToDatabase } from '../services/database';

export function GalleryPage() {
  const [albums, setAlbums] = useState([]);
  const [activeAlbumId, setActiveAlbumId] = useState('alb_1');
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setAlbums(state.gallery);
    });
    return unsub;
  }, []);

  const activeAlbum = albums.find(a => a.id === activeAlbumId) || albums[0];

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
            <span>FOTÓARCHÍVUM ÉS PILLANATKÉPEK</span>
          </div>
          <h1 className="section-title">
            FOTÓGALÉRIA
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Böngéssz tematikus és év szerinti albumaink között! Színpadi sikerek, tábori naplementék és a próbaterem kulisszatitkai.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {/* Album Selector Tabs */}
        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '16px',
          marginBottom: '40px'
        }}>
          {albums.map(alb => {
            const isActive = alb.id === activeAlbumId;
            return (
              <button
                key={alb.id}
                onClick={() => setActiveAlbumId(alb.id)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : '#141414',
                  color: isActive ? '#000' : 'var(--text-main)',
                  border: isActive ? '1px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '12px 20px',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: isActive ? '0 0 15px rgba(201, 162, 39, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <ImageIcon size={16} />
                <span>{alb.title}</span>
                <span style={{
                  background: isActive ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.06)',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '0.74rem'
                }}>
                  {alb.photos?.length || alb.photoCount || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        {activeAlbum && (
          <div>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#FFF', fontFamily: 'var(--font-display)' }}>
                  {activeAlbum.title}
                </h2>
                <div style={{ fontSize: '0.84rem', color: 'var(--gold-light)' }}>
                  Kategória: {activeAlbum.category} ({activeAlbum.year})
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px'
            }}>
              {(activeAlbum.photos || []).map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  className="card-luxury"
                  style={{ padding: 0, height: '240px', position: 'relative', cursor: 'pointer', overflow: 'hidden' }}
                  onClick={() => setLightboxPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                    color: '#FFF',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 500 }}>{photo.caption}</span>
                    <Eye size={16} color="var(--gold-light)" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxPhoto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2500,
          padding: '20px'
        }}>
          <button
            onClick={() => setLightboxPhoto(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>

          <div style={{ maxWidth: '90vw', maxHeight: '85vh', textAlign: 'center' }}>
            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption}
              style={{
                maxWidth: '100%',
                maxHeight: '75vh',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '1px solid var(--border-gold)',
                boxShadow: '0 0 40px rgba(0,0,0,0.8)'
              }}
            />
            <div style={{ marginTop: '16px', color: 'var(--gold-light)', fontSize: '1rem', fontWeight: 600 }}>
              {lightboxPhoto.caption}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
