import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Lock, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import { getVideos, subscribeToDatabase } from '../services/database';
import { useAuth } from '../context/AuthContext';

export function VideosPage({ onOpenAuth }) {
  const { currentUser, role } = useAuth();
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [playingVideo, setPlayingVideo] = useState(null);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setVideos(state.videos);
    });
    return unsub;
  }, []);

  const categories = ['all', 'Fellépések', 'Koreográfiák', 'Gyakorlóvideók', 'Oktatóvideók'];

  const filteredVideos = videos.filter(v => {
    if (selectedCategory === 'all') return true;
    return v.category === selectedCategory;
  });

  const handleVideoClick = (video) => {
    if (!video.isPublic && !currentUser) {
      onOpenAuth();
      return;
    }
    setPlayingVideo(video);
  };

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
            <span>KOREOGRÁFIÁK ÉS GYAKORLÓANYAGOK</span>
          </div>
          <h1 className="section-title">
            VIDEÓTÁR & ARCHÍVUM
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Nyilvános színpadi bemutatók és kizárólag bejelentkezett tagjaink számára elérhető privát gyakorló- és oktatóvideók.
          </p>
        </div>
      </section>

      <div className="container" style={{ marginTop: '50px' }}>
        {/* Category Filters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'btn-gold' : 'btn-ghost'}
              style={{ padding: '8px 18px', fontSize: '0.84rem' }}
            >
              {cat === 'all' ? 'Összes videó' : cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px'
        }}>
          {filteredVideos.map(video => {
            const isLocked = !video.isPublic && !currentUser;

            return (
              <div
                key={video.id}
                className="card-luxury"
                style={{ padding: 0, display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: isLocked ? 'grayscale(80%) brightness(50%)' : 'none'
                    }}
                  />

                  {/* Play or Lock Icon Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    background: isLocked ? 'rgba(0,0,0,0.8)' : 'var(--gold-gradient)',
                    border: '2px solid var(--gold-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 20px rgba(0,0,0,0.8)'
                  }}>
                    {isLocked ? (
                      <Lock size={22} color="var(--gold-light)" />
                    ) : (
                      <Play size={22} color="#000" fill="#000" style={{ marginLeft: '3px' }} />
                    )}
                  </div>

                  {/* Privacy Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: video.isPublic ? 'rgba(0,0,0,0.7)' : 'rgba(201, 162, 39, 0.9)',
                    color: video.isPublic ? '#FFF' : '#000',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    {video.isPublic ? 'Nyilvános' : '🔒 Csak Tagoknak'}
                  </div>

                  {/* Duration */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.8)',
                    color: '#FFF',
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '0.76rem', color: 'var(--gold-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    {video.category}
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#FFF', marginBottom: '8px', lineHeight: 1.4 }}>
                    {video.title}
                  </h3>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>
                    {video.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '12px',
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)'
                  }}>
                    <span>{video.views} megtekintés</span>
                    <span style={{ color: isLocked ? 'var(--gold-light)' : 'var(--status-present)', fontWeight: 600 }}>
                      {isLocked ? 'Belépés szükséges' : 'Lejátszható'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 3000,
          padding: '20px'
        }}>
          <div style={{
            background: '#121212',
            border: '1px solid var(--gold-primary)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '800px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.9), 0 0 30px rgba(201,162,39,0.3)'
          }}>
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h4 style={{ color: '#FFF', fontSize: '1.1rem' }}>{playingVideo.title}</h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-light)' }}>{playingVideo.category} ({playingVideo.duration})</div>
              </div>
              <button
                onClick={() => setPlayingVideo(null)}
                className="btn-ghost"
                style={{ padding: '6px 12px' }}
              >
                Bezárás
              </button>
            </div>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
              <iframe
                src={`${playingVideo.youtubeEmbed}?autoplay=1`}
                title={playingVideo.title}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
