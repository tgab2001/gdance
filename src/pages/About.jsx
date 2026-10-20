import React from 'react';
import { Sparkles, Award, Heart, CheckCircle2, Shield, Users } from 'lucide-react';

export function About({ setCurrentPage }) {
  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header Banner */}
      <section style={{
        padding: '70px 0 50px',
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(201, 162, 39, 0.2)',
        textAlign: 'center'
      }}>
        <div className="container">
          <div className="section-badge" style={{ margin: '0 auto 14px' }}>
            <Sparkles size={14} />
            <span>AKADÉMIÁNK TÖRTÉNETE ÉS FILOZÓFIÁJA</span>
          </div>
          <h1 className="section-title">
            BEMUTATKOZÁS
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Ahol a technikai precizitás, a mozgás szabadsága és a valódi összetartozás találkozik.
          </p>
        </div>
      </section>

      {/* Main Philosophy & History */}
      <div className="container" style={{ marginTop: '60px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center',
          marginBottom: '80px'
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#FFF', marginBottom: '20px' }}>
              A <span className="text-gradient-gold">G DANCE</span> KÜLDETÉSE
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '20px' }}>
              A G Dance-t 2018-ban hívtuk életre azzal a céllal, hogy a hazai táncoktatást egy új, európai szintre emeljük. Nem csupán lépéseket és koreográfiákat tanítunk: személyiséget építünk, önbizalmat adunk és egy olyan támogató közeget biztosítunk, ahová a táncosaink minden nap örömmel térnek vissza.
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '28px' }}>
              Edzéseinken a legmodernebb pedagógiai és anatómiai módszereket alkalmazzuk: a helyes bemelegítés, nyújtás és törzsizom-erősítés éppoly fontos, mint az érzelmek kifejezése és a zenei ritmusok mély megélése.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Egyénre szabott tehetséggondozás és korosztályos bontás',
                'Országos és nemzetközi versenyzési lehetőség',
                'Professzionálisan felszerelt balettpadlós, tükrös tánctermek',
                'Átlátható digitális tagi felület, edzésnaptár és jelenlét-követés'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E0E0E0', fontSize: '0.94rem' }}>
                  <CheckCircle2 size={18} color="var(--gold-primary)" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--border-gold)',
              boxShadow: '0 15px 40px rgba(0,0,0,0.8), 0 0 30px rgba(201,162,39,0.2)'
            }}>
              <img
                src="/images/director.jpg"
                alt="Művészeti vezetés"
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
              />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '-20px',
              left: '20px',
              right: '20px',
              background: '#141414',
              border: '1px solid var(--gold-primary)',
              borderRadius: '12px',
              padding: '16px 20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.9)'
            }}>
              <div style={{ fontWeight: 800, color: 'var(--gold-light)', fontSize: '1rem' }}>
                Kovács Zoltán & Nagy Viktória
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Alapítók & Művészeti Vezetők
              </div>
            </div>
          </div>
        </div>

        {/* Studio Values */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginTop: '60px'
        }}>
          <div className="card-luxury">
            <div style={{ color: 'var(--gold-light)', marginBottom: '16px' }}><Award size={36} /></div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '10px' }}>Kiválóság & Fegyelem</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              A tánc a kitartás művészete. Megtanítjuk táncosainknak, hogy a szorgalmas munka mindig meghozza a gyümölcsét.
            </p>
          </div>

          <div className="card-luxury">
            <div style={{ color: 'var(--gold-light)', marginBottom: '16px' }}><Heart size={36} /></div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '10px' }}>Összetartó Közösség</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              A G Dance nem csupán edzőterem, hanem egy család, ahol életre szóló barátságok szövődnek a próbákon és fellépéseken.
            </p>
          </div>

          <div className="card-luxury">
            <div style={{ color: 'var(--gold-light)', marginBottom: '16px' }}><Sparkles size={36} /></div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '10px' }}>Korszerű Módszertan</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7 }}>
              Naprakész zenei stílusok, nemzetközi workshopok és vendégkoreográfusok biztosítják a folyamatos fejlődést.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
