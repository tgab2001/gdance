import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, Calendar, Award, Bell, Video, Image as ImageIcon, 
  FileText, Send, Plus, Check, Trash2, Cloud, RefreshCw, AlertCircle, Sparkles 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  getUsers, updateUser, createUser, 
  getGroups, createGroup, updateGroup,
  getEvents, createEvent, deleteEvent,
  sendNotification, createNews, deleteNews,
  addVideo, addResult, deleteResult,
  getApplications, updateApplicationStatus,
  seedFirestore, resetLocalDatabase, subscribeToDatabase 
} from '../services/database';
import { isFirebaseAvailable, firebaseConfig } from '../services/firebase';

export function AdminPage({ setCurrentPage }) {
  const { role, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('users');

  // Database state
  const [dbState, setDbState] = useState({
    users: [],
    groups: [],
    trainings: [],
    events: [],
    notifications: [],
    news: [],
    videos: [],
    results: [],
    applications: []
  });

  const [syncStatus, setSyncStatus] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Forms state
  const [newNotif, setNewNotif] = useState({
    title: '',
    message: '',
    targetType: 'all',
    targetGroupId: 'grp_gforce',
    type: 'general'
  });

  const [newNewsItem, setNewNewsItem] = useState({
    title: '',
    category: 'Hír',
    author: 'Kovács Zoltán',
    image: '/images/crew-stage.jpg',
    excerpt: '',
    content: ''
  });

  const [newVideoItem, setNewVideoItem] = useState({
    title: '',
    category: 'Gyakorlóvideók',
    duration: '4:20',
    isPublic: false,
    thumbnail: '/images/hero-dancer.jpg',
    youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    description: ''
  });

  const [newResultItem, setNewResultItem] = useState({
    year: '2026',
    badge: '🥇 1. hely',
    category: 'Felnőtt Hip-Hop',
    competition: 'Országos Bajnokság',
    group: 'G-Force Felnőtt',
    details: ''
  });

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setDbState(state);
    });
    return unsub;
  }, []);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Change user's role
  const handleChangeRole = async (userId, newRole) => {
    await updateUser(userId, { role: newRole });
    showToast(`Felhasználó jogosultsága módosítva: ${newRole}`);
  };

  // Move user to another group
  const handleMoveGroup = async (userId, newGroupId, newGroupName) => {
    await updateUser(userId, {
      groupIds: [newGroupId],
      groupNames: [newGroupName]
    });
    showToast(`Táncos átmozgatva a következő csoportba: ${newGroupName}`);
  };

  // Send in-app notification
  const handleSendNotification = async (e) => {
    e.preventDefault();
    if (!newNotif.title || !newNotif.message) return;
    await sendNotification(newNotif);
    setNewNotif({ title: '', message: '', targetType: 'all', targetGroupId: 'grp_gforce', type: 'general' });
    showToast('Értesítés sikeresen kiküldve a megcélzott tagoknak!');
  };

  // Publish news
  const handlePublishNews = async (e) => {
    e.preventDefault();
    if (!newNewsItem.title || !newNewsItem.content) return;
    await createNews(newNewsItem);
    setNewNewsItem({ title: '', category: 'Hír', author: 'Kovács Zoltán', image: '/images/crew-stage.jpg', excerpt: '', content: '' });
    showToast('Új hír sikeresen közzétéve a weboldalon!');
  };

  // Add video
  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideoItem.title) return;
    await addVideo(newVideoItem);
    setNewVideoItem({ title: '', category: 'Gyakorlóvideók', duration: '4:20', isPublic: false, thumbnail: '/images/hero-dancer.jpg', youtubeEmbed: 'https://www.youtube.com/embed/dQw4w9WgXcQ', description: '' });
    showToast('Új videó hozzáadva a videótárhoz!');
  };

  // Add award / result
  const handleAddResult = async (e) => {
    e.preventDefault();
    if (!newResultItem.competition) return;
    await addResult(newResultItem);
    setNewResultItem({ year: '2026', badge: '🥇 1. hely', category: 'Felnőtt Hip-Hop', competition: 'Országos Bajnokság', group: 'G-Force Felnőtt', details: '' });
    showToast('Új bajnoki eredmény rögzítve!');
  };

  // Cloud sync to Firestore
  const handleSeedCloud = async () => {
    setSyncStatus('Szinkronizálás folyamatban...');
    try {
      const res = await seedFirestore();
      setSyncStatus(`Sikeres Firebase Firestore szinkronizáció! (${res.count} rekord feltöltve)`);
    } catch (err) {
      setSyncStatus(`Hiba: ${err.message}`);
    }
  };

  const navTabs = [
    { id: 'users', label: 'Felhasználók', icon: <Users size={16} /> },
    { id: 'groups', label: 'Csoportok', icon: <Users size={16} /> },
    { id: 'applications', label: 'Jelentkezések', icon: <FileText size={16} /> },
    { id: 'notifications', label: 'Értesítésküldés', icon: <Bell size={16} /> },
    { id: 'news', label: 'Hírek', icon: <FileText size={16} /> },
    { id: 'videos', label: 'Videótár', icon: <Video size={16} /> },
    { id: 'results', label: 'Eredmények', icon: <Award size={16} /> },
    { id: 'database', label: 'Firebase & Felhő', icon: <Cloud size={16} /> }
  ];

  return (
    <div style={{ paddingBottom: '90px' }}>
      {/* Header */}
      <section style={{
        padding: '50px 0 35px',
        backgroundColor: '#090909',
        borderBottom: '1px solid rgba(201, 162, 39, 0.25)'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <div className="section-badge">
                <Shield size={14} />
                <span>KÖZPONTI MENEDZSMÉNT</span>
              </div>
              <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                ADMINISZTRÁTORI VEZÉRLŐPULT
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Felhasználók, jogosultságok, csoportáthelyezések, hírek, videók és Firebase Firestore adatbázis vezérlése.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setCurrentPage('calendar')}
                className="btn-outline-gold"
                style={{ padding: '10px 18px', fontSize: '0.84rem' }}
              >
                Edzésnaptár
              </button>
              <button
                onClick={() => setCurrentPage('attendance')}
                className="btn-gold"
                style={{ padding: '10px 18px', fontSize: '0.84rem' }}
              >
                Jelenléti ívek
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {toastMsg && (
          <div style={{
            background: 'rgba(201, 162, 39, 0.2)',
            border: '1px solid var(--gold-primary)',
            color: 'var(--gold-light)',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontWeight: 700
          }}>
            {toastMsg}
          </div>
        )}

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '12px',
          marginBottom: '30px'
        }}>
          {navTabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'var(--gold-gradient)' : '#141414',
                  color: isActive ? '#000' : 'var(--text-main)',
                  border: isActive ? '1px solid var(--gold-light)' : '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '10px 18px',
                  whiteSpace: 'nowrap',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: USERS & GROUP REASSIGNMENT */}
        {activeTab === 'users' && (
          <div className="card-luxury" style={{ padding: 0, overflowX: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>Regisztrált Tagok és Szerepkörök</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  Itt rendelhetsz új szerepkört a tagoknak, vagy áthelyezheted őket másik csoportba.
                </p>
              </div>
            </div>

            <table className="table-luxury">
              <thead>
                <tr>
                  <th>Név & Profil</th>
                  <th>E-mail</th>
                  <th>Jelenlegi Szerepkör</th>
                  <th>Csoport Áthelyezése</th>
                  <th>Tagság Kezdete</th>
                  <th>Jelenlét</th>
                </tr>
              </thead>
              <tbody>
                {dbState.users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={u.avatar}
                          alt={u.name}
                          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#FFF' }}>{u.name}</div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--gold-light)' }}>
                            {u.nickname || 'Nincs becenév'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                      {u.email}
                    </td>

                    <td>
                      <select
                        className="input-luxury"
                        style={{ padding: '6px 10px', fontSize: '0.8rem', width: 'auto' }}
                        value={u.role}
                        onChange={(e) => handleChangeRole(u.id, e.target.value)}
                      >
                        <option value="dancer">Táncos</option>
                        <option value="instructor">Oktató</option>
                        <option value="admin">Adminisztrátor</option>
                        <option value="parent">Szülő</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="input-luxury"
                        style={{ padding: '6px 10px', fontSize: '0.8rem', width: 'auto' }}
                        value={(u.groupIds || [])[0] || 'grp_gforce'}
                        onChange={(e) => {
                          const grp = dbState.groups.find(g => g.id === e.target.value);
                          handleMoveGroup(u.id, e.target.value, grp?.name || 'Új csoport');
                        }}
                      >
                        {dbState.groups.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    </td>

                    <td style={{ color: 'var(--text-dim)', fontSize: '0.82rem' }}>
                      {u.joinedDate}
                    </td>

                    <td>
                      <span style={{ fontWeight: 800, color: 'var(--gold-light)' }}>
                        {u.attendanceRate || 92}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 2: GROUPS MANAGEMENT */}
        {activeTab === 'groups' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {dbState.groups.map(g => (
              <div key={g.id} className="card-luxury">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#FFF' }}>{g.name}</h3>
                  <span style={{ background: 'var(--gold-gradient)', color: '#000', fontSize: '0.72rem', fontWeight: 800, padding: '3px 8px', borderRadius: '10px' }}>
                    {g.category}
                  </span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--gold-light)', marginBottom: '8px' }}>
                  Korosztály: {g.ageRange} • Oktató: {g.instructor}
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '16px' }}>
                  {g.description}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Időpontok: {g.scheduleDescription}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: APPLICATIONS (TRIAL CLASSES) */}
        {activeTab === 'applications' && (
          <div className="card-luxury" style={{ padding: 0, overflowX: 'auto' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#FFF' }}>Beérkezett Próbaóra Jelentkezések</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                Az online űrlapon beküldött jelentkezők és kapcsolatfelvételi státuszuk.
              </p>
            </div>

            {dbState.applications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '50px 20px', color: 'var(--text-muted)' }}>
                <FileText size={36} style={{ opacity: 0.3, margin: '0 auto 10px' }} />
                <p>Még nem érkezett új próbaóra jelentkezés. Teszteld a publikus "Jelentkezés" oldalon!</p>
              </div>
            ) : (
              <table className="table-luxury">
                <thead>
                  <tr>
                    <th>Név</th>
                    <th>E-mail</th>
                    <th>Telefon</th>
                    <th>Választott Csoport</th>
                    <th>Tapasztalat</th>
                    <th>Beküldve</th>
                    <th>Művelet</th>
                  </tr>
                </thead>
                <tbody>
                  {dbState.applications.map(app => (
                    <tr key={app.id}>
                      <td style={{ fontWeight: 700, color: '#FFF' }}>{app.name}</td>
                      <td style={{ color: 'var(--gold-light)' }}>{app.email}</td>
                      <td style={{ color: '#DDD' }}>{app.phone}</td>
                      <td style={{ color: '#FFF' }}>{app.preferredGroup}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{app.experience}</td>
                      <td style={{ color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                        {new Date(app.submittedAt).toLocaleDateString('hu-HU')}
                      </td>
                      <td>
                        <span style={{
                          background: app.status === 'enrolled' ? 'var(--status-present)' : 'rgba(201,162,39,0.2)',
                          color: app.status === 'enrolled' ? '#000' : 'var(--gold-light)',
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontSize: '0.74rem',
                          fontWeight: 700
                        }}>
                          {app.status === 'new' ? 'Új' : 'Kapcsolatba lépve'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 4: SEND NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="card-luxury" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '8px' }}>
              Belső Értesítés Kiküldése
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '22px' }}>
              Küldj azonnali közleményt minden tagnak, egy csoportnak vagy egyedi táncosnak.
            </p>

            <form onSubmit={handleSendNotification} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Értesítés Címe *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. Csütörtöki edzésidőpont módosítás"
                  value={newNotif.title}
                  onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Címzettek köre *
                  </label>
                  <select
                    className="input-luxury"
                    value={newNotif.targetType}
                    onChange={(e) => setNewNotif({ ...newNotif, targetType: e.target.value })}
                  >
                    <option value="all">Minden táncos és tag (Általános)</option>
                    <option value="group">Kijelölt csoport</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kategória
                  </label>
                  <select
                    className="input-luxury"
                    value={newNotif.type}
                    onChange={(e) => setNewNotif({ ...newNotif, type: e.target.value })}
                  >
                    <option value="general">Általános felhívás</option>
                    <option value="schedule">Edzésidőpont változás</option>
                    <option value="performance">Fellépési információ</option>
                    <option value="video">Új oktatóvideó</option>
                  </select>
                </div>
              </div>

              {newNotif.targetType === 'group' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Melyik csoport kapja meg? *
                  </label>
                  <select
                    className="input-luxury"
                    value={newNotif.targetGroupId}
                    onChange={(e) => setNewNotif({ ...newNotif, targetGroupId: e.target.value })}
                  >
                    {dbState.groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Üzenet szövege *
                </label>
                <textarea
                  required
                  rows="3"
                  className="input-luxury"
                  placeholder="pl. A csütörtöki edzés 18:00 helyett 17:30-kor kezdődik."
                  value={newNotif.message}
                  onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: '10px' }}>
                <Send size={16} />
                <span>Értesítés azonnali kiküldése</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: PUBLISH NEWS */}
        {activeTab === 'news' && (
          <div className="card-luxury" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '8px' }}>
              Új Hír vagy Cikk Közzététele
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              A közzétett hír azonnal megjelenik a főoldalon és a Hírek aloldalon.
            </p>

            <form onSubmit={handlePublishNews} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Hír címe *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. Történelmi siker a Magyar Bajnokságon"
                  value={newNewsItem.title}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kategória
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    value={newNewsItem.category}
                    onChange={(e) => setNewNewsItem({ ...newNewsItem, category: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Szerző
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    value={newNewsItem.author}
                    onChange={(e) => setNewNewsItem({ ...newNewsItem, author: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Rövid összefoglaló (Kiemelés a főoldalra)
                </label>
                <input
                  type="text"
                  className="input-luxury"
                  placeholder="1-2 mondatos felvezetés"
                  value={newNewsItem.excerpt}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, excerpt: e.target.value })}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Teljes cikk szövege *
                </label>
                <textarea
                  required
                  rows="4"
                  className="input-luxury"
                  placeholder="A hír részletes leírása..."
                  value={newNewsItem.content}
                  onChange={(e) => setNewNewsItem({ ...newNewsItem, content: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: '10px' }}>
                <Plus size={16} />
                <span>Hír közzététele</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 6: VIDEOS MANAGEMENT */}
        {activeTab === 'videos' && (
          <div className="card-luxury" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '8px' }}>
              Új Videó Feltöltése / Hozzáadása
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Állítsd be, hogy a videó publikus legyen, vagy csak bejelentkezett táncosok tekinthessék meg.
            </p>

            <form onSubmit={handleAddVideo} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Videó címe *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. [TAGOKNAK] Bajnoksági 3. Részlet Lassított Lépések"
                  value={newVideoItem.title}
                  onChange={(e) => setNewVideoItem({ ...newVideoItem, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kategória
                  </label>
                  <select
                    className="input-luxury"
                    value={newVideoItem.category}
                    onChange={(e) => setNewVideoItem({ ...newVideoItem, category: e.target.value })}
                  >
                    <option value="Fellépések">Fellépések</option>
                    <option value="Koreográfiák">Koreográfiák</option>
                    <option value="Gyakorlóvideók">Gyakorlóvideók</option>
                    <option value="Oktatóvideók">Oktatóvideók</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Hozzáférési szint *
                  </label>
                  <select
                    className="input-luxury"
                    value={newVideoItem.isPublic ? 'public' : 'private'}
                    onChange={(e) => setNewVideoItem({ ...newVideoItem, isPublic: e.target.value === 'public' })}
                  >
                    <option value="private">🔒 Csak Tagoknak (Privát)</option>
                    <option value="public">🌐 Nyilvános (Bárki láthatja)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Leírás a táncosoknak
                </label>
                <input
                  type="text"
                  className="input-luxury"
                  value={newVideoItem.description}
                  onChange={(e) => setNewVideoItem({ ...newVideoItem, description: e.target.value })}
                />
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: '10px' }}>
                <Plus size={16} />
                <span>Videó rögzítése</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 7: AWARDS & RESULTS */}
        {activeTab === 'results' && (
          <div className="card-luxury" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#FFF', marginBottom: '8px' }}>
              Új Bajnoki Trófea vagy Díj Rögzítése
            </h3>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Bővítsd az akadémia Eredményeink oldalát a legújabb érmekkel.
            </p>

            <form onSubmit={handleAddResult} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Év
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    value={newResultItem.year}
                    onChange={(e) => setNewResultItem({ ...newResultItem, year: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Helyezés / Jelvény *
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    placeholder="pl. 🥇 1. hely vagy 🏆 Különdíj"
                    value={newResultItem.badge}
                    onChange={(e) => setNewResultItem({ ...newResultItem, badge: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  Verseny Megnevezése *
                </label>
                <input
                  type="text"
                  required
                  className="input-luxury"
                  placeholder="pl. Országos Modern Tánckupa"
                  value={newResultItem.competition}
                  onChange={(e) => setNewResultItem({ ...newResultItem, competition: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Kategória
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    value={newResultItem.category}
                    onChange={(e) => setNewResultItem({ ...newResultItem, category: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    Csapat / Táncos
                  </label>
                  <input
                    type="text"
                    className="input-luxury"
                    value={newResultItem.group}
                    onChange={(e) => setNewResultItem({ ...newResultItem, group: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold" style={{ marginTop: '10px' }}>
                <Plus size={16} />
                <span>Trófea rögzítése</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 8: DATABASE & FIREBASE SEED */}
        {activeTab === 'database' && (
          <div className="card-luxury" style={{ maxWidth: '640px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#FFF', marginBottom: '8px' }}>
              Firebase Firestore Integráció & Szinkronizáció
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
              A weboldal be van állítva a Firebase <strong>tancweboldal</strong> (ID: {firebaseConfig.projectId}) projektre.
              Az adatok kettős rétegűen működnek: a böngésző helyi perzisztenciájában azonnal élnek, és egy kattintással átküldhetők a Firestore felhő adatbázisba!
            </p>

            <div style={{
              background: '#161616',
              borderRadius: '10px',
              padding: '18px',
              border: '1px solid var(--border-gold)',
              marginBottom: '24px'
            }}>
              <div style={{ fontSize: '0.84rem', color: 'var(--gold-light)', fontWeight: 700, marginBottom: '6px' }}>
                Firebase Projekt Információk:
              </div>
              <ul style={{ listStyle: 'none', fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>• Projekt azonosítója: <code style={{ color: '#FFF' }}>{firebaseConfig.projectId}</code></li>
                <li>• Auth domain: <code style={{ color: '#FFF' }}>{firebaseConfig.authDomain}</code></li>
                <li>• Storage bucket: <code style={{ color: '#FFF' }}>{firebaseConfig.storageBucket}</code></li>
                <li>• Projekt szám: <code style={{ color: '#FFF' }}>{firebaseConfig.messagingSenderId}</code></li>
              </ul>
            </div>

            {syncStatus && (
              <div style={{
                background: 'rgba(201, 162, 39, 0.15)',
                border: '1px solid var(--gold-primary)',
                color: 'var(--gold-light)',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.86rem',
                marginBottom: '20px'
              }}>
                {syncStatus}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleSeedCloud}
                className="btn-gold"
                style={{ width: '100%', padding: '14px' }}
              >
                <Cloud size={18} />
                <span>Kezdő adatok feltöltése a Firebase Firestore-ba</span>
              </button>

              <button
                onClick={() => { resetLocalDatabase(); showToast('Helyi mintaadatok sikeresen visszaállítva az alapértelmezettre!'); }}
                className="btn-ghost"
                style={{ width: '100%', padding: '12px', color: '#E74C3C', borderColor: 'rgba(231,76,60,0.3)' }}
              >
                <RefreshCw size={16} />
                <span>Helyi adatbázis visszaállítása alaphelyzetbe</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
