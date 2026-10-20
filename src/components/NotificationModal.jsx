import React, { useState, useEffect } from 'react';
import { X, Bell, Check, Clock, AlertCircle, Video, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, markNotificationAsRead } from '../services/database';

export function NotificationModal({ isOpen, onClose }) {
  const { currentUser, role } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all'); // all, unread

  useEffect(() => {
    if (isOpen && currentUser) {
      loadNotifications();
    }
  }, [isOpen, currentUser]);

  const loadNotifications = async () => {
    if (!currentUser) return;
    const notifs = await getNotifications(currentUser.id, role, currentUser.groupIds || []);
    setNotifications(notifs);
  };

  const handleMarkRead = async (notifId) => {
    if (!currentUser) return;
    await markNotificationAsRead(notifId, currentUser.id);
    loadNotifications();
  };

  const handleMarkAllRead = async () => {
    if (!currentUser) return;
    for (const n of notifications) {
      await markNotificationAsRead(n.id, currentUser.id);
    }
    loadNotifications();
  };

  if (!isOpen) return null;

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') {
      return !(n.readBy || []).includes(currentUser?.id);
    }
    return true;
  });

  const getIconForType = (type) => {
    switch (type) {
      case 'schedule':
        return <Calendar size={18} color="var(--gold-light)" />;
      case 'video':
        return <Video size={18} color="#3498DB" />;
      case 'performance':
        return <Sparkles size={18} color="#E74C3C" />;
      default:
        return <AlertCircle size={18} color="var(--gold-primary)" />;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
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
        width: '100%',
        maxWidth: '520px',
        maxHeight: '85vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(201, 162, 39, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bell size={18} color="var(--gold-light)" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: '#FFF', fontFamily: 'var(--font-display)' }}>
                ÉRTESÍTÉSEK
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Belső tánccsoport és akadémiai közlemények
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter & Action bar */}
        <div style={{
          padding: '12px 24px',
          background: '#161616',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                background: filter === 'all' ? 'var(--gold-primary)' : 'transparent',
                color: filter === 'all' ? '#000' : 'var(--text-muted)',
                fontWeight: filter === 'all' ? 700 : 500,
                padding: '4px 12px',
                borderRadius: '14px',
                fontSize: '0.78rem'
              }}
            >
              Mind ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              style={{
                background: filter === 'unread' ? 'var(--gold-primary)' : 'transparent',
                color: filter === 'unread' ? '#000' : 'var(--text-muted)',
                fontWeight: filter === 'unread' ? 700 : 500,
                padding: '4px 12px',
                borderRadius: '14px',
                fontSize: '0.78rem'
              }}
            >
              Olvasatlan ({notifications.filter(n => !(n.readBy || []).includes(currentUser?.id)).length})
            </button>
          </div>

          <button
            onClick={handleMarkAllRead}
            style={{
              background: 'none',
              color: 'var(--gold-light)',
              fontSize: '0.76rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Check size={14} />
            Mind olvasottnak
          </button>
        </div>

        {/* Notifications list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {filteredNotifs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <Bell size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <p style={{ fontSize: '0.9rem' }}>Nincs megjeleníthető értesítés ebben a nézetben.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredNotifs.map(notif => {
                const isRead = (notif.readBy || []).includes(currentUser?.id);
                return (
                  <div
                    key={notif.id}
                    onClick={() => !isRead && handleMarkRead(notif.id)}
                    style={{
                      background: isRead ? 'rgba(255, 255, 255, 0.02)' : 'rgba(201, 162, 39, 0.08)',
                      border: isRead ? '1px solid var(--border-subtle)' : '1px solid var(--border-gold)',
                      borderRadius: '10px',
                      padding: '14px 16px',
                      cursor: isRead ? 'default' : 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative'
                    }}
                  >
                    {!isRead && (
                      <div style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: 'var(--gold-light)',
                        boxShadow: '0 0 8px var(--gold-light)'
                      }} />
                    )}

                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: '#1A1A1A',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {getIconForType(notif.type)}
                      </div>

                      <div style={{ flex: 1, paddingRight: !isRead ? '16px' : '0' }}>
                        <h4 style={{
                          fontSize: '0.92rem',
                          color: isRead ? 'var(--text-main)' : 'var(--gold-light)',
                          fontWeight: isRead ? 600 : 700,
                          marginBottom: '4px'
                        }}>
                          {notif.title}
                        </h4>
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '8px' }}>
                          {notif.message}
                        </p>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={12} />
                          <span>{new Date(notif.createdAt).toLocaleDateString('hu-HU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
