import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUsers, updateUser, getNotifications, subscribeToDatabase } from '../services/database';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('gdance_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [unreadCount, setUnreadCount] = useState(0);

  // Subscribe to database updates
  useEffect(() => {
    const unsubscribe = subscribeToDatabase((state) => {
      setUsers(state.users);
      if (currentUser) {
        const freshUser = state.users.find(u => u.id === currentUser.id);
        if (freshUser) {
          setCurrentUser(freshUser);
          localStorage.setItem('gdance_active_user', JSON.stringify(freshUser));
        }

        // Calculate unread notifications
        const unread = state.notifications.filter(n => {
          const isTarget = n.targetType === 'all' || 
            (n.targetType === 'user' && n.targetUserId === currentUser.id) ||
            (n.targetType === 'group' && (currentUser.groupIds || []).includes(n.targetGroupId)) ||
            currentUser.role === 'admin';
          const hasRead = (n.readBy || []).includes(currentUser.id);
          return isTarget && !hasRead;
        }).length;
        setUnreadCount(unread);
      }
    });

    return unsubscribe;
  }, [currentUser?.id]);

  // If no user is logged in, log in as dancer by default for rich instant demo experience, or null
  useEffect(() => {
    if (!currentUser && users.length > 0) {
      // Default to dancer Anna so the user immediately experiences the dashboard
      const defaultDancer = users.find(u => u.role === 'dancer') || users[0];
      setCurrentUser(defaultDancer);
      localStorage.setItem('gdance_active_user', JSON.stringify(defaultDancer));
    }
  }, [users]);

  // Login handler
  const login = async (email, password) => {
    const allUsers = await getUsers();
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setCurrentUser(found);
      localStorage.setItem('gdance_active_user', JSON.stringify(found));
      return { success: true, user: found };
    }
    // If not found in mock, create a demo dancer
    const newDemoUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0],
      email: email,
      role: 'dancer',
      groupIds: ['grp_gforce'],
      groupNames: ['G-Force Felnőtt'],
      attendanceRate: 100,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setCurrentUser(newDemoUser);
    localStorage.setItem('gdance_active_user', JSON.stringify(newDemoUser));
    return { success: true, user: newDemoUser };
  };

  // Switch role directly (Admin, Instructor, Dancer, Parent)
  const switchRole = async (targetRole) => {
    const allUsers = await getUsers();
    const userForRole = allUsers.find(u => u.role === targetRole);
    if (userForRole) {
      setCurrentUser(userForRole);
      localStorage.setItem('gdance_active_user', JSON.stringify(userForRole));
    }
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gdance_active_user');
    setUnreadCount(0);
  };

  // Update own profile
  const handleUpdateProfile = async (updates) => {
    if (!currentUser) return;
    const updated = await updateUser(currentUser.id, updates);
    setCurrentUser(updated);
    localStorage.setItem('gdance_active_user', JSON.stringify(updated));
    return updated;
  };

  const role = currentUser ? currentUser.role : 'guest';

  const value = {
    currentUser,
    role,
    isAdmin: role === 'admin',
    isInstructor: role === 'instructor' || role === 'admin',
    isDancer: role === 'dancer',
    isParent: role === 'parent',
    login,
    logout,
    switchRole,
    updateProfile: handleUpdateProfile,
    unreadCount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
