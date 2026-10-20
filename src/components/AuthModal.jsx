import React, { useState } from 'react';
import { X, Lock, Mail, Sparkles, UserCheck, Shield, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthModal({ isOpen, onClose }) {
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Kérjük, add meg az e-mail címedet!');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      onClose();
    } catch (err) {
      setError('Sikertelen bejelentkezés. Ellenőrizd az adataidat.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (roleId) => {
    switchRole(roleId);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.82)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        background: '#121212',
        border: '1px solid var(--gold-primary)',
        boxShadow: '0 15px 50px rgba(0,0,0,0.9), 0 0 30px rgba(201, 162, 39, 0.25)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Top Gold Bar */}
        <div style={{
          height: '4px',
          background: 'var(--gold-gradient)'
        }} />

        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)'
          }}
        >
          <X size={18} />
        </button>

        <div style={{ padding: '32px 28px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(201, 162, 39, 0.2), rgba(229, 199, 107, 0.05))',
              border: '1px solid var(--gold-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 0 20px rgba(201, 162, 39, 0.3)'
            }}>
              <Lock size={22} color="var(--gold-light)" />
            </div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              marginBottom: '6px'
            }}>
              TAGI BELÉPÉS
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)' }}>
              Jelentkezz be a G Dance táncos, oktatói vagy szülői fiókodba!
            </p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid #E74C3C',
              color: '#FF7675',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '18px'
            }}>
              {error}
            </div>
          )}

          {/* Quick Demo Shortcuts */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              color: 'var(--gold-light)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '10px'
            }}>
              <Sparkles size={12} />
              Gyorsbelépés Tesztfiókkal:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px'
            }}>
              <button
                type="button"
                onClick={() => handleQuickDemo('dancer')}
                className="btn-ghost"
                style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'flex-start' }}
              >
                <span style={{ color: 'var(--status-present)' }}>●</span>
                Táncos (Anna)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('instructor')}
                className="btn-ghost"
                style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'flex-start' }}
              >
                <span style={{ color: '#3498DB' }}>●</span>
                Oktató (Viki)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="btn-ghost"
                style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'flex-start' }}
              >
                <span style={{ color: 'var(--gold-light)' }}>●</span>
                Admin (Zoltán)
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('parent')}
                className="btn-ghost"
                style={{ padding: '8px 10px', fontSize: '0.8rem', justifyContent: 'flex-start' }}
              >
                <span style={{ color: '#9B59B6' }}>●</span>
                Szülő (Beatrix)
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            color: 'var(--text-dim)',
            fontSize: '0.75rem'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
            <span>VAGY E-MAIL CÍMMEL</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(255, 255, 255, 0.08)' }} />
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                E-mail cím
              </label>
              <input
                type="email"
                className="input-luxury"
                placeholder="pelda@gdance.hu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                Jelszó
              </label>
              <input
                type="password"
                className="input-luxury"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', marginTop: '10px' }}
            >
              {loading ? 'Bejelentkezés folyamatban...' : 'Bejelentkezés'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
