import { 
  collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, 
  query, where, orderBy, onSnapshot 
} from 'firebase/firestore';
import { db, isFirebaseAvailable } from './firebase';
import {
  initialUsers,
  initialGroups,
  initialTrainings,
  initialEvents,
  initialAttendance,
  initialNotifications,
  initialGallery,
  initialVideos,
  initialResults,
  initialNews
} from './mockData';

// Storage keys for local persistence
const STORAGE_PREFIX = 'gdance_db_';
function getLocalItem(key, defaultValue) {
  try {
    const saved = localStorage.getItem(STORAGE_PREFIX + key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalItem(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
}

// In-memory / LocalStorage state initialized from mock data
let localState = {
  users: getLocalItem('users', initialUsers),
  groups: getLocalItem('groups', initialGroups),
  trainings: getLocalItem('trainings', initialTrainings),
  events: getLocalItem('events', initialEvents),
  attendance: getLocalItem('attendance', initialAttendance),
  notifications: getLocalItem('notifications', initialNotifications),
  gallery: getLocalItem('gallery', initialGallery),
  videos: getLocalItem('videos', initialVideos),
  results: getLocalItem('results', initialResults),
  news: getLocalItem('news', initialNews),
  applications: getLocalItem('applications', [])
};

// Event listeners for state changes
const listeners = new Set();
function notifyChange() {
  listeners.forEach(cb => cb(localState));
}

export function subscribeToDatabase(callback) {
  listeners.add(callback);
  callback(localState);
  return () => listeners.delete(callback);
}

// ==========================================
// USER SERVICES
// ==========================================
export async function getUsers() {
  return localState.users;
}

export async function getUserById(userId) {
  return localState.users.find(u => u.id === userId) || null;
}

export async function updateUser(userId, updates) {
  localState.users = localState.users.map(u => {
    if (u.id === userId) {
      return { ...u, ...updates };
    }
    return u;
  });
  setLocalItem('users', localState.users);
  notifyChange();

  if (isFirebaseAvailable && db) {
    try {
      await updateDoc(doc(db, 'users', userId), updates);
    } catch (e) {
      console.warn('Firestore update failed (using local):', e.message);
    }
  }
  return localState.users.find(u => u.id === userId);
}

export async function createUser(userData) {
  const newUser = {
    id: `usr_${Date.now()}`,
    attendanceRate: 100,
    membershipActive: true,
    joinedDate: new Date().toISOString().split('T')[0],
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80",
    ...userData
  };
  localState.users = [newUser, ...localState.users];
  setLocalItem('users', localState.users);
  notifyChange();
  return newUser;
}

// ==========================================
// GROUPS SERVICES
// ==========================================
export async function getGroups() {
  return localState.groups;
}

export async function updateGroup(groupId, updates) {
  localState.groups = localState.groups.map(g => g.id === groupId ? { ...g, ...updates } : g);
  setLocalItem('groups', localState.groups);
  notifyChange();
  return localState.groups.find(g => g.id === groupId);
}

export async function createGroup(groupData) {
  const newGroup = {
    id: `grp_${Date.now()}`,
    memberCount: 0,
    tags: ["Tánc", "G Dance"],
    ...groupData
  };
  localState.groups = [...localState.groups, newGroup];
  setLocalItem('groups', localState.groups);
  notifyChange();
  return newGroup;
}

// ==========================================
// TRAININGS & SCHEDULE SERVICES
// ==========================================
export async function getTrainings(groupId = null) {
  if (groupId) {
    return localState.trainings.filter(t => t.groupId === groupId);
  }
  return localState.trainings;
}

export async function createTraining(trainingData) {
  const newTraining = {
    id: `trn_${Date.now()}`,
    status: 'upcoming',
    ...trainingData
  };
  localState.trainings = [newTraining, ...localState.trainings];
  setLocalItem('trainings', localState.trainings);
  notifyChange();
  return newTraining;
}

export async function updateTraining(trainingId, updates) {
  localState.trainings = localState.trainings.map(t => t.id === trainingId ? { ...t, ...updates } : t);
  setLocalItem('trainings', localState.trainings);
  notifyChange();
  return localState.trainings.find(t => t.id === trainingId);
}

export async function deleteTraining(trainingId) {
  localState.trainings = localState.trainings.filter(t => t.id !== trainingId);
  setLocalItem('trainings', localState.trainings);
  notifyChange();
  return true;
}

// ==========================================
// ATTENDANCE SERVICES
// ==========================================
export async function getAttendance(trainingId) {
  return localState.attendance[trainingId] || [];
}

export async function saveAttendance(trainingId, records) {
  localState.attendance = {
    ...localState.attendance,
    [trainingId]: records
  };
  setLocalItem('attendance', localState.attendance);

  // Recalculate each member's attendance rate
  records.forEach(record => {
    let totalTrainings = 0;
    let presentCount = 0;

    Object.values(localState.attendance).forEach(trainList => {
      const found = trainList.find(r => r.userId === record.userId);
      if (found) {
        totalTrainings++;
        if (found.status === 'present' || found.status === 'excused') {
          presentCount++;
        }
      }
    });

    if (totalTrainings > 0) {
      const newRate = Math.round((presentCount / totalTrainings) * 100);
      updateUser(record.userId, { attendanceRate: newRate });
    }
  });

  notifyChange();
  return true;
}

// ==========================================
// EVENTS & RSVP SERVICES
// ==========================================
export async function getEvents() {
  return localState.events;
}

export async function saveEventResponse(eventId, userId, responseStatus) {
  localState.events = localState.events.map(ev => {
    if (ev.id === eventId) {
      return {
        ...ev,
        rsvps: {
          ...(ev.rsvps || {}),
          [userId]: responseStatus
        }
      };
    }
    return ev;
  });
  setLocalItem('events', localState.events);
  notifyChange();
  return true;
}

export async function createEvent(eventData) {
  const newEvt = {
    id: `evt_${Date.now()}`,
    rsvps: {},
    ...eventData
  };
  localState.events = [newEvt, ...localState.events];
  setLocalItem('events', localState.events);
  notifyChange();
  return newEvt;
}

export async function deleteEvent(eventId) {
  localState.events = localState.events.filter(e => e.id !== eventId);
  setLocalItem('events', localState.events);
  notifyChange();
  return true;
}

// ==========================================
// NOTIFICATIONS SERVICES
// ==========================================
export async function getNotifications(userId, userRole, groupIds = []) {
  return localState.notifications.filter(n => {
    if (n.targetType === 'all') return true;
    if (n.targetType === 'user' && n.targetUserId === userId) return true;
    if (n.targetType === 'group' && groupIds.includes(n.targetGroupId)) return true;
    if (userRole === 'admin') return true;
    return false;
  });
}

export async function markNotificationAsRead(notifId, userId) {
  localState.notifications = localState.notifications.map(n => {
    if (n.id === notifId) {
      const readBy = n.readBy || [];
      if (!readBy.includes(userId)) {
        return { ...n, readBy: [...readBy, userId] };
      }
    }
    return n;
  });
  setLocalItem('notifications', localState.notifications);
  notifyChange();
  return true;
}

export async function sendNotification(notifData) {
  const newNotif = {
    id: `notif_${Date.now()}`,
    createdAt: new Date().toISOString(),
    readBy: [],
    ...notifData
  };
  localState.notifications = [newNotif, ...localState.notifications];
  setLocalItem('notifications', localState.notifications);
  notifyChange();
  return newNotif;
}

// ==========================================
// NEWS & ARTICLES SERVICES
// ==========================================
export async function getNews() {
  return localState.news;
}

export async function createNews(newsData) {
  const item = {
    id: `news_${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    ...newsData
  };
  localState.news = [item, ...localState.news];
  setLocalItem('news', localState.news);
  notifyChange();
  return item;
}

export async function deleteNews(newsId) {
  localState.news = localState.news.filter(n => n.id !== newsId);
  setLocalItem('news', localState.news);
  notifyChange();
  return true;
}

// ==========================================
// GALLERY & PHOTOS SERVICES
// ==========================================
export async function getGallery() {
  return localState.gallery;
}

export async function addPhotoToAlbum(albumId, photoData) {
  localState.gallery = localState.gallery.map(alb => {
    if (alb.id === albumId) {
      const newPhoto = { id: `p_${Date.now()}`, ...photoData };
      return {
        ...alb,
        photoCount: (alb.photoCount || 0) + 1,
        photos: [newPhoto, ...(alb.photos || [])]
      };
    }
    return alb;
  });
  setLocalItem('gallery', localState.gallery);
  notifyChange();
  return true;
}

export async function createAlbum(albumData) {
  const newAlbum = {
    id: `alb_${Date.now()}`,
    photos: [],
    photoCount: 0,
    ...albumData
  };
  localState.gallery = [newAlbum, ...localState.gallery];
  setLocalItem('gallery', localState.gallery);
  notifyChange();
  return newAlbum;
}

// ==========================================
// VIDEOS SERVICES
// ==========================================
export async function getVideos(includePrivate = false) {
  if (includePrivate) {
    return localState.videos;
  }
  return localState.videos.filter(v => v.isPublic);
}

export async function addVideo(videoData) {
  const newVideo = {
    id: `vid_${Date.now()}`,
    views: "1",
    ...videoData
  };
  localState.videos = [newVideo, ...localState.videos];
  setLocalItem('videos', localState.videos);
  notifyChange();
  return newVideo;
}

// ==========================================
// RESULTS & AWARDS SERVICES
// ==========================================
export async function getResults() {
  return localState.results;
}

export async function addResult(resultData) {
  const newRes = {
    id: `res_${Date.now()}`,
    ...resultData
  };
  localState.results = [newRes, ...localState.results];
  setLocalItem('results', localState.results);
  notifyChange();
  return newRes;
}

export async function deleteResult(resultId) {
  localState.results = localState.results.filter(r => r.id !== resultId);
  setLocalItem('results', localState.results);
  notifyChange();
  return true;
}

// ==========================================
// APPLICATIONS / TRIAL CLASS REGISTRATION
// ==========================================
export async function submitApplication(appData) {
  const newApp = {
    id: `app_${Date.now()}`,
    status: 'new', // new, contacted, enrolled, rejected
    submittedAt: new Date().toISOString(),
    ...appData
  };
  localState.applications = [newApp, ...localState.applications];
  setLocalItem('applications', localState.applications);
  notifyChange();
  return newApp;
}

export async function getApplications() {
  return localState.applications;
}

export async function updateApplicationStatus(appId, status) {
  localState.applications = localState.applications.map(a => a.id === appId ? { ...a, status } : a);
  setLocalItem('applications', localState.applications);
  notifyChange();
  return true;
}

// ==========================================
// FIRESTORE SYNC & SEED UTILITY
// ==========================================
export async function seedFirestore() {
  if (!isFirebaseAvailable || !db) {
    throw new Error("A Firebase kapcsolat jelenleg nem konfigurált az API kulcsokkal, vagy offline módban fut.");
  }

  // Upload initial seed data to Firestore collections
  const seedBatch = async (collectionName, items) => {
    for (const item of items) {
      await setDoc(doc(db, collectionName, item.id), item, { merge: true });
    }
  };

  await seedBatch('users', initialUsers);
  await seedBatch('groups', initialGroups);
  await seedBatch('trainings', initialTrainings);
  await seedBatch('events', initialEvents);
  await seedBatch('notifications', initialNotifications);
  await seedBatch('gallery', initialGallery);
  await seedBatch('videos', initialVideos);
  await seedBatch('results', initialResults);
  await seedBatch('news', initialNews);

  return { success: true, count: initialUsers.length + initialGroups.length + initialTrainings.length };
}

// Reset data to defaults if needed
export function resetLocalDatabase() {
  localStorage.clear();
  localState = {
    users: initialUsers,
    groups: initialGroups,
    trainings: initialTrainings,
    events: initialEvents,
    attendance: initialAttendance,
    notifications: initialNotifications,
    gallery: initialGallery,
    videos: initialVideos,
    results: initialResults,
    news: initialNews,
    applications: []
  };
  notifyChange();
}
