import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, XCircle, AlertCircle, Save, Calendar, 
  Users, Sparkles, TrendingUp, Check 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTrainings, getUsers, getAttendance, saveAttendance, subscribeToDatabase } from '../services/database';

export function AttendancePage({ setCurrentPage }) {
  const { currentUser, role, isAdmin, isInstructor } = useAuth();
  const [trainings, setTrainings] = useState([]);
  const [selectedTrainingId, setSelectedTrainingId] = useState('');
  const [dancers, setDancers] = useState([]);
  const [records, setRecords] = useState({});
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const unsub = subscribeToDatabase((state) => {
      setTrainings(state.trainings);
      if (state.trainings.length > 0 && !selectedTrainingId) {
        setSelectedTrainingId(state.trainings[0].id);
      }
      // Dancers list
      const dancerList = state.users.filter(u => u.role === 'dancer');
      setDancers(dancerList);
    });
    return unsub;
  }, [selectedTrainingId]);

  useEffect(() => {
    if (selectedTrainingId) {
      loadAttendanceForTraining(selectedTrainingId);
    }
  }, [selectedTrainingId]);

  const loadAttendanceForTraining = async (tId) => {
    const existing = await getAttendance(tId);
    const recMap = {};

    dancers.forEach(d => {
      const found = existing.find(r => r.userId === d.id);
      recMap[d.id] = {
        status: found ? found.status : 'present',
        notes: found ? found.notes : ''
      };
    });

    setRecords(recMap);
  };

  const handleStatusChange = (userId, status) => {
    setRecords(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status
      }
    }));
  };

  const handleNotesChange = (userId, notes) => {
    setRecords(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        notes
      }
    }));
  };

  const handleSave = async () => {
    if (!selectedTrainingId) return;
    const recordsArray = Object.keys(records).map(userId => {
      const dancer = dancers.find(d => d.id === userId);
      return {
        userId,
        name: dancer ? dancer.name : 'Táncos',
        status: records[userId].status,
        notes: records[userId].notes
      };
    });

    await saveAttendance(selectedTrainingId, recordsArray);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const selectedTraining = trainings.find(t => t.id === selectedTrainingId);

  return (
    <div style={{ paddingBottom: '90px' }}>
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
                <CheckCircle2 size={14} />
                <span>OKTATÓI JELENLÉTI RENDSZER</span>
              </div>
              <h1 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>
                JELENLÉTI ÍV VEZETÉSE
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Rögzítsd a táncosok edzéslátogatottságát, hiányzásait és igazolásait az automatikus statisztikákhoz.
              </p>
            </div>

            <button
              onClick={handleSave}
              className="btn-gold"
              style={{ padding: '12px 26px', fontSize: '0.9rem' }}
            >
              <Save size={18} />
              <span>Jelenléti ív mentése</span>
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: '40px' }}>
        {savedSuccess && (
          <div style={{
            background: 'rgba(46, 204, 113, 0.2)',
            border: '1px solid var(--status-present)',
            color: '#64E798',
            padding: '12px 20px',
            borderRadius: '10px',
            marginBottom: '24px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Check size={18} />
            <span>Jelenlét sikeresen elmentve! A táncosok jelenléti statisztikái automatikusan frissültek.</span>
          </div>
        )}

        {/* Training selector bar */}
        <div style={{
          background: '#141414',
          border: '1px solid var(--border-subtle)',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '280px' }}>
            <Calendar size={22} color="var(--gold-light)" />
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                Válaszd ki a szerkesztendő edzést:
              </label>
              <select
                className="input-luxury"
                value={selectedTrainingId}
                onChange={(e) => setSelectedTrainingId(e.target.value)}
              >
                {trainings.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.date} — {t.title} ({t.groupName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {selectedTraining && (
            <div style={{
              background: '#1A1A1A',
              padding: '10px 18px',
              borderRadius: '8px',
              border: '1px solid var(--border-gold)',
              fontSize: '0.84rem'
            }}>
              <span style={{ color: 'var(--gold-light)', fontWeight: 700 }}>{selectedTraining.groupName}</span>
              <span style={{ color: 'var(--text-dim)' }}> • {selectedTraining.location}</span>
            </div>
          )}
        </div>

        {/* Dancer Attendance Table */}
        <div className="card-luxury" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="table-luxury">
            <thead>
              <tr>
                <th>Táncos Neve</th>
                <th>Csoport & Kor</th>
                <th>Aktuális Jelenléti Arány</th>
                <th>Állapot Ezen az Edzésen</th>
                <th>Megjegyzés / Indoklás</th>
              </tr>
            </thead>
            <tbody>
              {dancers.map(dancer => {
                const cur = records[dancer.id] || { status: 'present', notes: '' };

                return (
                  <tr key={dancer.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={dancer.avatar}
                          alt={dancer.name}
                          style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, color: '#FFF' }}>{dancer.name}</div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--gold-light)' }}>
                            {dancer.nickname ? `„${dancer.nickname}”` : ''}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ color: 'var(--text-muted)' }}>
                      {(dancer.groupNames || ['G-Force'])[0]}
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{dancer.ageGroup}</div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{
                          fontWeight: 800,
                          color: (dancer.attendanceRate || 92) >= 90 ? 'var(--status-present)' : 'var(--gold-light)'
                        }}>
                          {dancer.attendanceRate || 92}%
                        </span>
                        <TrendingUp size={14} color="var(--gold-primary)" />
                      </div>
                    </td>

                    <td>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(dancer.id, 'present')}
                          style={{
                            background: cur.status === 'present' ? 'var(--status-present)' : 'rgba(46, 204, 113, 0.1)',
                            color: cur.status === 'present' ? '#000' : 'var(--status-present)',
                            border: '1px solid var(--status-present)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Jelen
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(dancer.id, 'absent')}
                          style={{
                            background: cur.status === 'absent' ? 'var(--status-absent)' : 'rgba(231, 76, 60, 0.1)',
                            color: cur.status === 'absent' ? '#FFF' : 'var(--status-absent)',
                            border: '1px solid var(--status-absent)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Hiányzik
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(dancer.id, 'excused')}
                          style={{
                            background: cur.status === 'excused' ? 'var(--gold-light)' : 'rgba(229, 199, 107, 0.1)',
                            color: cur.status === 'excused' ? '#000' : 'var(--gold-light)',
                            border: '1px solid var(--gold-light)',
                            borderRadius: '6px',
                            padding: '6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Igazolt
                        </button>
                      </div>
                    </td>

                    <td>
                      <input
                        type="text"
                        className="input-luxury"
                        placeholder="pl. Betegség igazolva"
                        style={{ padding: '6px 10px', fontSize: '0.82rem', maxWidth: '240px' }}
                        value={cur.notes}
                        onChange={(e) => handleNotesChange(dancer.id, e.target.value)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
