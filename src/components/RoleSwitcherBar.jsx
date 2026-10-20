import React, { useState } from 'react';
import { Shield, Sparkles, ChevronUp, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function RoleSwitcherBar() {
  const { role, switchRole, currentUser } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const roles = [
    { id: 'dancer', label: 'Táncos', name: 'Tóth Anna', badge: 'badge-role-dancer', desc: 'Saját profil, edzések, RSVP' },
    { id: 'instructor', label: 'Oktató', name: 'Nagy Viktória', badge: 'badge-role-instructor', desc: 'Jelenléti ív, csoportok kezelése' },
    { id: 'admin', label: 'Adminisztrátor', name: 'Kovács Zoltán', badge: 'badge-role-admin', desc: 'Teljes rendszerhozzáférés & Firestore' },
    { id: 'parent', label: 'Szülő', name: 'Kiss Beatrix', badge: 'badge-role-parent', desc: 'Gyermek programjai & jelenlét' }
  ];

  return (
    <div style={{
      background: 'linear-gradient(90deg, #121008 0%, #1A1709 50%, #121008 100%)',
      borderBottom: '1px solid rgba(201, 162, 39, 0.4)',
      padding: collapsed ? '6px 16px' : '8px 16px',
      fontSize: '0.82rem',
      position: 'relative',
      zIndex: 1100,
      transition: 'all 0.3s ease'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} color="var(--gold-light)" />
          <span style={{ fontWeight: 700, color: 'var(--gold-light)', letterSpacing: '0.04em' }}>
            DEMO SZEREPKÖRVÁLTÓ
          </span>
          <span style={{ color: 'var(--text-dim)' }} className="desktop-only-text">
            | Teszteld a 4 különböző jogosultsági szintet valós időben:
          </span>
        </div>

        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {roles.map(r => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => switchRole(r.id)}
                  style={{
                    background: isActive ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.05)',
                    color: isActive ? '#000000' : 'var(--text-main)',
                    border: isActive ? '1px solid var(--gold-light)' : '1px solid rgba(255, 255, 255, 0.1)',
                    fontWeight: isActive ? 800 : 500,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 0 12px rgba(201, 162, 39, 0.4)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  title={r.desc}
                >
                  {isActive && <CheckCircle2 size={12} />}
                  <span>{r.label}</span>
                  <span style={{ opacity: isActive ? 0.8 : 0.5, fontSize: '0.72rem' }}>
                    ({r.name.split(' ')[0]})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem'
          }}
          title={collapsed ? "Szerepkörváltó kibontása" : "Összecsukás"}
        >
          <span>{collapsed ? 'Váltás' : 'Elrejtés'}</span>
          {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        </button>
      </div>
    </div>
  );
}
