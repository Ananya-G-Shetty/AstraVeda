/**
 * NASA CADET FRONTEND AUTHENTICATION SERVICE
 * 
 * NOTE FOR BACKEND DEVELOPER:
 * This module manages frontend session state and currently persists profiles in browser localStorage.
 * When your backend API server and database (e.g. Node/Express, Flask, Django, Supabase, Firebase)
 * are ready, replace the mock localStorage blocks with fetch() calls to your backend endpoints.
 * Look for "BACKEND INTEGRATION POINT" comments throughout this file.
 */

import { getCountryMeta } from './countries';

const STORAGE_KEY_ACTIVE = 'nasa_active_cadet';
const STORAGE_KEY_REGISTRY = 'nasa_cadets_registry';

/**
 * Helper to fetch all registered cadets from frontend localStorage
 */
function getLocalRegistry() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REGISTRY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading cadet registry:', err);
    return [];
  }
}

/**
 * Helper to save registered cadets array to frontend localStorage
 */
function saveLocalRegistry(registry) {
  try {
    localStorage.setItem(STORAGE_KEY_REGISTRY, JSON.stringify(registry));
  } catch (err) {
    console.error('Error saving cadet registry:', err);
  }
}

export const authService = {
  /**
   * Get currently authenticated active cadet profile
   * @returns {Object|null}
   */
  getCurrentCadet() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error('Error reading active cadet session:', err);
      return null;
    }
  },

  /**
   * Register a new cadet account
   * Required fields: name, username, password, class, country
   * 
   * @param {Object} cadetData
   * @param {string} cadetData.name - Full Name
   * @param {string} cadetData.username - Callsign / Username
   * @param {string} cadetData.password - Secret access key
   * @param {string} cadetData.class - Grade / Academic class
   * @param {string} cadetData.country - Country of origin
   * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
   */
  async registerCadet({ name, username, password, class: cadetClass, country }) {
    // 1. Basic frontend validation
    const trimmedName = (name || '').trim();
    const trimmedUsername = (username || '').trim().toLowerCase();
    const trimmedClass = (cadetClass || '').trim();
    const trimmedCountry = (country || '').trim();

    if (!trimmedName) return { success: false, error: 'Cadet Name is required.' };
    if (!trimmedUsername || trimmedUsername.length < 3) {
      return { success: false, error: 'Callsign / Username must be at least 3 characters long.' };
    }
    if (!password || password.length < 4) {
      return { success: false, error: 'Security Password must be at least 4 characters long.' };
    }
    if (!trimmedClass) return { success: false, error: 'Cadet Class / Grade is required.' };
    if (!trimmedCountry) return { success: false, error: 'Country of origin is required.' };

    /* 
      ================================================================================
      BACKEND INTEGRATION POINT (Register):
      When your backend endpoint is up, replace the code below with:
      
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: trimmedName,
            username: trimmedUsername,
            password,
            class: trimmedClass,
            country: trimmedCountry,
          }),
        });
        const data = await response.json();
        if (!response.ok) return { success: false, error: data.message || 'Registration failed' };
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(data.user));
        return { success: true, user: data.user };
      } catch (err) {
        return { success: false, error: 'Network error connecting to auth server.' };
      }
      ================================================================================
    */

    // Mock frontend registration:
    const registry = getLocalRegistry();
    const existing = registry.find(
      (c) => c.username.toLowerCase() === trimmedUsername
    );
    if (existing) {
      return {
        success: false,
        error: `Callsign '@${trimmedUsername}' is already claimed by another astronaut. Please choose a unique callsign.`
      };
    }

    const countryMeta = getCountryMeta(trimmedCountry);
    const newCadet = {
      id: 'cadet_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: trimmedName,
      username: trimmedUsername,
      password, // In real backend, hash with bcrypt/argon2
      class: trimmedClass,
      country: countryMeta.name,
      countryCode: countryMeta.code,
      countryFlag: countryMeta.flag,
      isGuest: false,
      role: 'Registered Cadet',
      registeredAt: new Date().toISOString(),
      avatar: '👨‍🚀',
    };

    registry.push(newCadet);
    saveLocalRegistry(registry);

    // Set active session (exclude raw password from session store)
    const sessionCadet = { ...newCadet };
    delete sessionCadet.password;
    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(sessionCadet));

    return { success: true, user: sessionCadet };
  },

  /**
   * Sign in an existing cadet
   * 
   * @param {Object} credentials
   * @param {string} credentials.username - Callsign / Username
   * @param {string} credentials.password - Secret code
   * @returns {Promise<{success: boolean, user?: Object, error?: string}>}
   */
  async loginCadet({ username, password }) {
    const trimmedUsername = (username || '').trim().toLowerCase();

    if (!trimmedUsername) return { success: false, error: 'Please enter your Mission Callsign / Username.' };
    if (!password) return { success: false, error: 'Please enter your Security Password.' };

    /* 
      ================================================================================
      BACKEND INTEGRATION POINT (Login):
      When your backend endpoint is up, replace the code below with:

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: trimmedUsername, password }),
        });
        const data = await response.json();
        if (!response.ok) return { success: false, error: data.message || 'Invalid credentials' };
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(data.user));
        return { success: true, user: data.user };
      } catch (err) {
        return { success: false, error: 'Network error connecting to auth server.' };
      }
      ================================================================================
    */

    // Mock frontend login verification:
    const registry = getLocalRegistry();
    const cadet = registry.find(
      (c) => c.username.toLowerCase() === trimmedUsername
    );

    if (!cadet) {
      return {
        success: false,
        error: `No cadet found with callsign '@${trimmedUsername}'. Please verify or create an account.`
      };
    }

    if (cadet.password !== password) {
      return {
        success: false,
        error: 'Incorrect security password. Please re-enter or check your credentials.'
      };
    }

    const sessionCadet = { ...cadet };
    delete sessionCadet.password;
    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(sessionCadet));

    return { success: true, user: sessionCadet };
  },

  /**
   * Guest Sign In (No prior account needed)
   * Instant 1-click clearance pass into the mission cockpit!
   * 
   * @param {Object} [optionalOverrides]
   * @param {string} [optionalOverrides.name]
   * @param {string} [optionalOverrides.country]
   * @param {string} [optionalOverrides.class]
   * @returns {Promise<{success: boolean, user: Object}>}
   */
  async guestLogin(optionalOverrides = {}) {
    /* 
      ================================================================================
      BACKEND INTEGRATION POINT (Guest Session):
      If your backend tracks anonymous guest tokens, call your guest endpoint here:
      const res = await fetch('/api/auth/guest', { method: 'POST' });
      ================================================================================
    */

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const defaultCountry = optionalOverrides.country || 'Planetary Cadet (Earth / Orbit)';
    const countryMeta = getCountryMeta(defaultCountry);

    const guestCadet = {
      id: 'guest_' + Date.now().toString(36) + randomSuffix,
      name: optionalOverrides.name?.trim() || `Cadet Explorer-${randomSuffix}`,
      username: `guest_${randomSuffix}`,
      class: optionalOverrides.class?.trim() || 'Junior Explorer Division',
      country: countryMeta.name,
      countryCode: countryMeta.code,
      countryFlag: countryMeta.flag,
      isGuest: true,
      role: 'Guest Cadet (Trial Clearance)',
      registeredAt: new Date().toISOString(),
      avatar: '🚀',
    };

    localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(guestCadet));
    return { success: true, user: guestCadet };
  },

  /**
   * Logout current cadet session
   */
  logoutCadet() {
    try {
      localStorage.removeItem(STORAGE_KEY_ACTIVE);
      return { success: true };
    } catch (err) {
      console.error('Error during logout:', err);
      return { success: false };
    }
  }
};
