import React from 'react';
import { 
  Sparkles, Calendar, Award, ArrowRight, Play, Users, 
  MapPin, Clock, ChevronRight, CheckCircle2, ShieldCheck, Star
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Home({ setCurrentPage, onOpenAuth }) {
  const { currentUser, role } = useAuth();

  return (
    <div className="home-page">
      {/* =========================================================================
          HERO SECTION (High-end Black & Gold luxury aesthetic matching reference)
          ========================================================================= */}
      <section style={{
        position: 'relative',
        minHeight: 'calc(100vh - 110px)',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 0 80px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 70% 30%, rgba(201, 162, 39, 0.12) 0%, rgba(10, 10, 10, 0.95) 60%, #070707 100%)'
      }}>
        {/* Background Decorative Gold Rings */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          top: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 162, 39, 0.15)',
          pointerEvents: 'none'
        }} className="animate-pulse-glow" />
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '25%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px dashed rgba(229, 199, 107, 0.2)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px'
          }}>
            {/* Left Column: Hero Text & CTAs */}
            <div>
              <div className="section-badge">
                <Sparkles size={14} />
                <span>PRÉMIUM TÁNCKÖZÖSSÉG & AKADÉMIA</span>
              </div>

              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                letterSpacing: '0.04em',
                lineHeight: 1.1,
                color: '#FFFFFF',
                marginBottom: '16px'
              }}>
                G DANCE
              </h1>

              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                fontStyle: 'italic',
                color: 'var(--gold-light)',
                letterSpacing: '0.08em',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                MOZDULAT. RITMUS. KÖZÖSSÉG.
              </div>

              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                maxWidth: '540px',
                marginBottom: '36px'
              }}>
                Ahol a művészi fegyelem és a kortárs dinamika találkozik. Országos bajnok koreográfusok, modern próbatermek és egy összetartó tánccsalád vár rád 6 évestől felnőtt korig.
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="btn-gold"
                  style={{ padding: '16px 32px', fontSize: '0.94rem' }}
                >
                  <span>ISMERJ MEG MINKET</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => setCurrentPage('apply')}
                  className="btn-outline-gold"
                  style={{ padding: '15px 28px', fontSize: '0.94rem' }}
                >
                  <span>INGYENES PRÓBAÓRA</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '28px',
                marginTop: '45px',
                paddingTop: '30px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    14+
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Országos Bajnoki Cím
                  </div>
                </div>

                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }} />

                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    250+
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Aktív Táncos
                  </div>
                </div>

                <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.1)' }} />

                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--gold-light)' }}>
                    100%
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                    Szenvedély & Ritmus
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Circular Gold Badge Dancer Visual (Inspired by user ref) */}
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div className="animate-float" style={{ display: 'inline-block', position: 'relative' }}>
                {/* Gold Outer Glow Ring */}
                <div style={{
                  position: 'relative',
                  width: 'min(440px, 90vw)',
                  height: 'min(440px, 90vw)',
                  margin: '0 auto',
                  borderRadius: '50%',
                  padding: '6px',
                  background: 'linear-gradient(135deg, #E5C76B 0%, #C9A227 40%, #5E460B 80%, #E5C76B 100%)',
                  boxShadow: '0 0 50px rgba(201, 162, 39, 0.35), inset 0 0 20px rgba(201, 162, 39, 0.2)'
                }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#0D0D0D',
                    border: '3px solid #070707',
                    position: 'relative'
                  }}>
                    <img
                      src="/images/hero-dancer.jpg"
                      alt="G Dance Balett & Kortárs Táncos"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 20%'
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '40%',
                      background: 'linear-gradient(to top, rgba(7, 7, 7, 0.8), transparent)'
                    }} />
                  </div>

                  {/* Play Video Floating Badge */}
                  <div 
                    onClick={() => setCurrentPage('videos')}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-15px',
                      transform: 'translateY(-50%)',
                      background: '#121212',
                      border: '2px solid var(--gold-primary)',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.8), 0 0 20px rgba(201,162,39,0.4)',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(-50%) scale(1)'}
                  >
                    <Play size={24} color="var(--gold-light)" fill="var(--gold-light)" style={{ marginLeft: '4px' }} />
                  </div>
                </div>

                {/* Refined Gold Flourish Emblem underneath (like reference image) */}
                <div className="flourish-divider" style={{ marginTop: '24px' }}>
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                    <path d="M20 2C16 10 10 12 2 12C10 12 16 14 20 22C24 14 30 12 38 12C30 12 24 10 20 2Z" fill="url(#heroGoldGrad)" />
                    <defs>
                      <linearGradient id="heroGoldGrad" x1="0" y1="0" x2="40" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#E5C76B" />
                        <stop offset="1" stopColor="#C9A227" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  letterSpacing: '0.05em'
                }}>
                  "A mozdulat, ami megérinti a lelket"
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: SHORT ABOUT TEASER
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#0B0B0B', position: 'relative' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}>
            <div>
              <div className="section-badge">
                <Sparkles size={12} />
                <span>RÓLUNK RÖVIDEN</span>
              </div>
              <h2 className="section-title">
                TÖBB MINT TÁNCISKOLA — <span className="text-gradient-gold">ÉLETSTÍLUS</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '20px' }}>
                A G Dance 2018-ban indult azzal a világos küldetéssel, hogy Magyarországon megteremtse a legmagasabb színvonalú, modern táncoktatási és közösségi teret.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '30px' }}>
                Nálunk a precizitás nem a kreativitás rovására megy: a legmodernebb digitális csoportmenedzsmenttel, edzésnaptárral, jelenléti statisztikákkal és versenyfelkészítéssel támogatjuk növendékeinket.
              </p>
              <button
                onClick={() => setCurrentPage('about')}
                className="btn-outline-gold"
              >
                <span>Teljes bemutatkozás elolvasása</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div className="card-luxury">
                <div style={{ color: 'var(--gold-light)', marginBottom: '12px' }}>
                  <Award size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>Versenyfelkészítés</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Hazai és nemzetközi színpadi versenyek, formációk és szólók kidolgozása.
                </p>
              </div>

              <div className="card-luxury" style={{ marginTop: '20px' }}>
                <div style={{ color: 'var(--gold-light)', marginBottom: '12px' }}>
                  <Users size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>Korosztályos Csoportok</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Mini Stars (6-10), Junior Elite (11-15) és Felnőtt G-Force (16+) csapatok.
                </p>
              </div>

              <div className="card-luxury">
                <div style={{ color: 'var(--gold-light)', marginBottom: '12px' }}>
                  <Calendar size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>Tagi Dashboard</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Személyre szabott edzésnaptár, jelenléti statisztika és belső értesítések.
                </p>
              </div>

              <div className="card-luxury" style={{ marginTop: '20px' }}>
                <div style={{ color: 'var(--gold-light)', marginBottom: '12px' }}>
                  <ShieldCheck size={32} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: '#FFF' }}>Profi Szakembergárda</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Táncművészeti Egyetemet végzett mesterek és nemzetközi trénerek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DANCE GROUPS PREVIEW
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#070707' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 55px' }}>
            <div className="section-badge">
              <Sparkles size={12} />
              <span>VÁLOGATOTT CSAPATAINK</span>
            </div>
            <h2 className="section-title">
              TÁNCCSOPORTOK MINDEN KOROSZTÁLYNAK
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              A kezdő ritmusfejlesztéstől a profi színpadi versenyzésig mindenki megtalálja a saját tempóját és közösségét.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                title: 'G-Force Felnőtt Versenyző',
                age: '16+ év',
                style: 'Urban & Hip-Hop',
                coach: 'Kovács Zoltán',
                image: '/images/crew-stage.jpg',
                desc: 'Magyar bajnok elit formáció, fesztiválok és nemzetközi kupák állandó dobogósa.'
              },
              {
                title: 'Junior Modern Elite',
                age: '11-15 év',
                style: 'Kortárs & Modern',
                coach: 'Nagy Viktória',
                image: '/images/hero-dancer.jpg',
                desc: 'Művészi technika, hajlítások, modern színpadi táncszínházi koreográfiák.'
              },
              {
                title: 'Mini Stars Gyerekcsoport',
                age: '6-10 év',
                style: 'Alapozó Hip-Hop',
                coach: 'Szabó Eszter',
                image: 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=600&auto=format&fit=crop&q=80',
                desc: 'Játékos ritmusérzék fejlesztés, koordináció és színpadi magabiztosság már a legfiatalabbaknak.'
              },
              {
                title: 'Kezdő Showtánc & Girly',
                age: '16+ év',
                style: 'Show & Commercial',
                coach: 'Balogh Márk',
                image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
                desc: 'Felszabadító, nőies mozdulatok és energikus zenék a mindennapi kikapcsolódáshoz.'
              }
            ].map((group, idx) => (
              <div key={idx} className="card-luxury" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '200px', position: 'relative' }}>
                  <img
                    src={group.image}
                    alt={group.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.75)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '20px',
                    padding: '4px 10px',
                    color: 'var(--gold-light)',
                    fontSize: '0.74rem',
                    fontWeight: 700
                  }}>
                    {group.age}
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--gold-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                    {group.style}
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '10px' }}>
                    {group.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '18px' }}>
                    {group.desc}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '14px'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                      Oktató: <strong style={{ color: '#DDD' }}>{group.coach}</strong>
                    </span>
                    <button
                      onClick={() => setCurrentPage('groups')}
                      style={{
                        background: 'none',
                        color: 'var(--gold-light)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      Részletek <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => setCurrentPage('groups')}
              className="btn-outline-gold"
            >
              Összes tánccsoport és heti órarend megtekintése
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: UPCOMING EVENTS PREVIEW
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#0E0E0E' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '20px',
            marginBottom: '45px'
          }}>
            <div>
              <div className="section-badge">
                <Calendar size={12} />
                <span>KÖZELGŐ ESEMÉNYEK</span>
              </div>
              <h2 className="section-title">
                VERSENYEK, GÁLÁK & TÁBOROK
              </h2>
            </div>
            <button
              onClick={() => setCurrentPage('events')}
              className="btn-ghost"
            >
              Minden esemény listája <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {[
              {
                title: 'Országos Hip-Hop Bajnokság 2026',
                date: '2026. nov. 14.',
                location: 'Budapest, Tüskecsarnok',
                category: 'Bajnokság',
                image: '/images/crew-stage.jpg',
                groups: 'G-Force & Junior Elite'
              },
              {
                title: 'G Dance Téli Gála & Karácsonyi Show',
                date: '2026. dec. 19.',
                location: 'MOM Kulturális Központ',
                category: 'Gálaest',
                image: '/images/hero-dancer.jpg',
                groups: 'Minden Tánccsoport'
              },
              {
                title: 'Los Angeles Street Mesterkurzus',
                date: '2026. nov. 28.',
                location: 'G Dance Központi Stúdió',
                category: 'Workshop',
                image: 'https://images.unsplash.com/photo-1518834107812-67b0b7c58434?w=600&auto=format&fit=crop&q=80',
                groups: 'Haladó & Profi Táncosok'
              }
            ].map((evt, idx) => (
              <div key={idx} className="card-luxury" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '170px', borderRadius: '8px', overflow: 'hidden', marginBottom: '18px', position: 'relative' }}>
                  <img src={evt.image} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'var(--gold-gradient)',
                    color: '#000',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}>
                    {evt.category}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--gold-light)', fontSize: '0.84rem', marginBottom: '8px' }}>
                  <Calendar size={15} />
                  <span>{evt.date}</span>
                  <span style={{ color: 'var(--text-dim)' }}>•</span>
                  <MapPin size={15} />
                  <span>{evt.location}</span>
                </div>

                <h3 style={{ fontSize: '1.18rem', color: '#FFF', marginBottom: '10px', flex: 1 }}>
                  {evt.title}
                </h3>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '12px',
                  marginTop: '12px'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                    Érintett: <span style={{ color: '#CCC' }}>{evt.groups}</span>
                  </span>
                  <button
                    onClick={() => setCurrentPage('events')}
                    style={{ background: 'none', color: 'var(--gold-light)', fontSize: '0.82rem', fontWeight: 600 }}
                  >
                    Részvétel jelzése
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: TROPHIES & RECENT NEWS
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#070707' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px'
          }}>
            {/* Left: Trophies summary */}
            <div>
              <div className="section-badge">
                <Award size={12} />
                <span>EREDMÉNYEINK</span>
              </div>
              <h2 className="section-title">
                MAGYAR & NEMZETKÖZI DÍJAK
              </h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '24px' }}>
                Büszkék vagyunk rá, hogy táncosaink évről évre a legrangosabb hazai és nemzetközi versenyeken állnak a dobogó legfelső fokára.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { place: '🥇 1. Helyezés', event: 'Magyar Látványtánc Bajnokság 2026', cat: 'Felnőtt Formáció Hip-Hop' },
                  { place: '🏆 Grand Prix Különdíj', event: 'European Dance Open Masters 2026', cat: 'Legjobb Színpadi Koreográfia' },
                  { place: '🥈 2. Helyezés', event: 'World Dance Trophy 2025 - Pula', cat: 'Junior Kortárs Csoport' }
                ].map((item, idx) => (
                  <div key={idx} style={{
                    background: '#121212',
                    border: '1px solid var(--border-gold)',
                    borderRadius: '10px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--gold-light)', fontSize: '0.94rem', marginBottom: '2px' }}>
                        {item.place}
                      </div>
                      <div style={{ color: '#FFF', fontSize: '0.88rem' }}>{item.event}</div>
                      <div style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>{item.cat}</div>
                    </div>
                    <Award size={24} color="var(--gold-primary)" />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage('results')}
                className="btn-outline-gold"
                style={{ marginTop: '20px' }}
              >
                Minden év eredményének megtekintése
              </button>
            </div>

            {/* Right: Latest News Teaser */}
            <div>
              <div className="section-badge">
                <Sparkles size={12} />
                <span>LEGFRISSEBB HÍREK</span>
              </div>
              <h2 className="section-title">
                HÍREK & KÖZLEMÉNYEK
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div 
                  onClick={() => setCurrentPage('news')}
                  className="card-luxury"
                  style={{ display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <img
                    src="/images/crew-stage.jpg"
                    alt="Hír"
                    style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gold-light)', fontWeight: 700 }}>2026. OKTÓBER 12.</div>
                    <h4 style={{ fontSize: '1rem', color: '#FFF', margin: '4px 0' }}>
                      Történelmi siker: Dupla aranyérem az Országos Bajnokságon!
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      A G-Force és a Junior Elite is a dobogó legfelső fokára állhatott.
                    </p>
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentPage('news')}
                  className="card-luxury"
                  style={{ display: 'flex', gap: '16px', alignItems: 'center', cursor: 'pointer' }}
                >
                  <img
                    src="/images/hero-dancer.jpg"
                    alt="Hír"
                    style={{ width: '90px', height: '90px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--gold-light)', fontWeight: 700 }}>2026. SZEPTEMBER 01.</div>
                    <h4 style={{ fontSize: '1rem', color: '#FFF', margin: '4px 0' }}>
                      Elindult az őszi jelentkezés a G Dance csoportjaiba!
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Nyílt próbaórák gyerekeknek és felnőtteknek egyaránt.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setCurrentPage('news')}
                className="btn-ghost"
                style={{ marginTop: '20px' }}
              >
                Tovább a hírekhez <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: BIG LUXURY CALL TO ACTION BANNER
          ========================================================================= */}
      <section style={{
        padding: '100px 0',
        position: 'relative',
        background: 'linear-gradient(135deg, #151105 0%, #080808 60%, #171306 100%)',
        borderTop: '1px solid var(--border-gold)',
        borderBottom: '1px solid var(--border-gold)',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(201, 162, 39, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>
          <div className="section-badge" style={{ margin: '0 auto 16px' }}>
            <Sparkles size={14} />
            <span>KÖZÖSSÉG & FEJLŐDÉS</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            letterSpacing: '0.04em',
            color: '#FFFFFF',
            marginBottom: '20px'
          }}>
            KÉSZEN ÁLLSZ A <span className="text-gradient-gold">RITMUSRA?</span>
          </h2>

          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            maxWidth: '650px',
            margin: '0 auto 36px',
            lineHeight: 1.8
          }}>
            Várunk szeretettel a próbaóráinkon! Nem számít, hogy most lépsz először táncterembe, vagy már évek óta a színpadon élsz.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentPage('apply')}
              className="btn-gold"
              style={{ padding: '16px 36px', fontSize: '1rem' }}
            >
              <span>JELENTKEZZ PRÓBAÓRÁRA</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setCurrentPage('contact')}
              className="btn-outline-gold"
              style={{ padding: '16px 32px', fontSize: '1rem' }}
            >
              Kapcsolatfelvétel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
