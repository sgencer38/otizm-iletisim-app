import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database } from '../services/firebase';
import { ref, get, set } from 'firebase/database';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    cardSize: 'medium', // small, medium, large
    fontSize: 'medium', // small, medium, large
    theme: 'light', // light, dark
    favorites: [],
  });

  useEffect(() => {
    const loadUserSettings = async () => {
      const user = auth.currentUser;
      if (user) {
        const settingsRef = ref(database, `users/${user.uid}/settings`);
        const snapshot = await get(settingsRef);
        if (snapshot.exists()) {
          setSettings(snapshot.val());
        }
      }
    };

    loadUserSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    const user = auth.currentUser;
    if (user) {
      const settingsRef = ref(database, `users/${user.uid}/settings`);
      await set(settingsRef, newSettings);
      setSettings(newSettings);
    }
  };

  const toggleFavorite = async (cardId) => {
    const newFavorites = settings.favorites.includes(cardId)
      ? settings.favorites.filter(id => id !== cardId)
      : [...settings.favorites, cardId];
    
    await updateSettings({ ...settings, favorites: newFavorites });
  };

  return (
    <SettingsContext.Provider value={{
      settings,
      updateSettings,
      toggleFavorite,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};
