import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  UserPlus,
  LogIn,
  Key,
  Lock,
  Globe,
  GraduationCap,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  X,
  Rocket,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { authService } from './authService';
import { COUNTRIES, CADET_CLASSES } from './countries';
import { sound } from '../utils/soundEngine';

export function AuthModal({ isOpen, onClose, onAuthSuccess, initialTab = 'guest', canCloseWithoutAuth = false }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'signin' | 'register' | 'guest'

  // Sign In Form State
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Register Form State (Required: name, username, password, class, country)
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regClass, setRegClass] = useState(CADET_CLASSES[2]); // Default Middle School / Voyagers
  const [customClass, setCustomClass] = useState('');
  const [isCustomClass, setIsCustomClass] = useState(false);
  const [regCountry, setRegCountry] = useState('United States');

  // Guest Quick Form State
  const [guestName, setGuestName] = useState('');
  const [guestCountry, setGuestCountry] = useState('Planetary Cadet (Earth / Orbit)');

  // Status & Validation State
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    sound.playClick('normal');
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab(tab);
  };

  // 1. Submit Sign In
  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await authService.loginCadet({
        username: signInUsername,
        password: signInPassword,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to authenticate.');
        setIsLoading(false);
        return;
      }

      sound.playClick('decision');
      setSuccessMsg(`Welcome back, Commander ${res.user.name}! Callsign @${res.user.username} verified.`);
      setTimeout(() => {
        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(res.user);
        if (onClose) onClose();
      }, 700);
    } catch (err) {
      setErrorMsg('Unexpected authorization error.');
      setIsLoading(false);
    }
  };

  // 2. Submit Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const finalClass = isCustomClass ? customClass : regClass;

    try {
      const res = await authService.registerCadet({
        name: regName,
        username: regUsername,
        password: regPassword,
        class: finalClass,
        country: regCountry,
      });

      if (!res.success) {
        setErrorMsg(res.error || 'Registration failed.');
        setIsLoading(false);
        return;
      }

      sound.playClick('decision');
      setSuccessMsg(`Cadet Account Commissioned! Welcome aboard, ${res.user.name}.`);
      setTimeout(() => {
        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(res.user);
        if (onClose) onClose();
      }, 800);
    } catch (err) {
      setErrorMsg('Unexpected authorization error.');
      setIsLoading(false);
    }
  };

  // 3. Submit Guest Sign In (Instant 1-Click Pass)
  const handleGuestLaunch = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await authService.guestLogin({
        name: guestName.trim() || undefined,
        country: guestCountry || undefined,
        class: 'Guest Explorer Division',
      });

      sound.playClick('decision');
      setSuccessMsg(`Guest clearance granted! Welcome, ${res.user.name}.`);
      setTimeout(() => {
        setIsLoading(false);
        if (onAuthSuccess) onAuthSuccess(res.user);
        if (onClose) onClose();
      }, 600);
    } catch (err) {
      setErrorMsg('Failed to create guest session.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto py-6 sm:py-8">
      {/* Readable Welcome Heading Outside the User Profile Card */}
      

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl my-auto rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden shrink-0"
      >
        {/* Top Glowing Header Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-amber-500" />

        {/* Close Button (if authenticated or allow close) */}
        {canCloseWithoutAuth && onClose && (
          <button
            onClick={() => {
              sound.playClick('normal');
              onClose();
            }}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Close Terminal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Modal Interior Padding */}
        <div className="p-6 sm:p-8">
          {/* Header & Logo */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                <Rocket className="w-8 h-8 text-cyan-400" />
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-cyan-500 text-[9px] font-mono font-bold text-slate-950">
                NASA
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-wide">
              NASA Explorer ACCESS
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm">
              Your Gateway to <b>Lunar & Martian</b> Expeditions.<br></br> Create an account, Sign in or Launch as a Guest to begin.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-900/90 rounded-2xl border border-cyan-500/20 mb-6">
            <button
              type="button"
              onClick={() => handleTabChange('signin')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'signin'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>SIGN IN</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('register')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'text-slate-400 hover:text-cyan-300 hover:bg-white/5'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>CREATE ACC</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('guest')}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-mono font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                activeTab === 'guest'
                  ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                  : 'text-slate-400 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>GUEST</span>
            </button>
          </div>

          {/* Alerts: Error / Success */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center space-x-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {successMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center space-x-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{successMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================================================= */}
          {/* TAB 1: SIGN IN PAGE */}
          {/* ======================================================= */}
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1.5">
                  Mission Callsign / Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={signInUsername}
                    onChange={(e) => setSignInUsername(e.target.value)}
                    placeholder="e.g. astro_alex or cadet_nova"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1.5">
                  Security Access Code (Password)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showSignInPassword ? 'text' : 'password'}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="Enter security key..."
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isLoading ? 'AUTHENTICATING CLEARANCE...' : 'INITIALIZE CADET TERMINAL'}</span>
              </button>

              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
                <span>New astronaut trainee?</span>
                <div className="space-x-3">
                  <button
                    type="button"
                    onClick={() => handleTabChange('register')}
                    className="text-cyan-400 hover:underline cursor-pointer font-mono"
                  >
                    Create Account
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => handleTabChange('guest')}
                    className="text-amber-400 hover:underline cursor-pointer font-mono"
                  >
                    Instant Guest Pass
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ======================================================= */}
          {/* TAB 2: CREATE ACCOUNT PAGE */}
          {/* ======================================================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1">
                  Cadet Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Alex Johnson"
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                  />
                </div>
              </div>

              {/* Username / Callsign & Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Username */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1">
                    Callsign / Username <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Rocket className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                      placeholder="astro_alex"
                      className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1">
                    Security Password <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 4 characters"
                      className="w-full pl-9 pr-8 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Class / Grade Division */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                    Cadet Class / Grade Level <span className="text-rose-400">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomClass(!isCustomClass)}
                    className="text-[10px] text-cyan-400 hover:underline font-mono"
                  >
                    {isCustomClass ? '← Choose from presets' : 'Enter custom grade/role →'}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  {isCustomClass ? (
                    <input
                      type="text"
                      required
                      value={customClass}
                      onChange={(e) => setCustomClass(e.target.value)}
                      placeholder="e.g. Grade 7, Astronomy Club, University Researcher..."
                      className="w-full pl-10 pr-3.5 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                    />
                  ) : (
                    <select
                      value={regClass}
                      onChange={(e) => setRegClass(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono cursor-pointer"
                    >
                      {CADET_CLASSES.map((item) => (
                        <option key={item} value={item} className="bg-slate-900 text-white">
                          {item}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300 mb-1">
                  Country of Origin <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <select
                    value={regCountry}
                    onChange={(e) => setRegCountry(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 bg-slate-900/80 border border-slate-700 focus:border-cyan-400 rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all font-mono cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.name} className="bg-slate-900 text-white">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>{isLoading ? 'COMMISSIONING CADET...' : 'COMMISSION ASTRONAUT BADGE'}</span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-400">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('signin')}
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ======================================================= */}
          {/* TAB 3: GUEST SIGN IN (1-Click Instant Bypass) */}
          {/* ======================================================= */}
          {activeTab === 'guest' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                <div className="flex items-center space-x-2 mb-2 font-display font-bold text-amber-400">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span>1-CLICK INSTANT GUEST PASS</span>
                </div>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  No email or password needed! Dive straight into the lunar & martian expeditions immediately. Your mission discoveries and unlocked badges will be securely preserved in this browser session.
                </p>
              </div>

              {/* Optional Quick Customization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-amber-300 mb-1">
                    Cadet Nickname (Optional)
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Star Rover, Nova"
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-amber-300 mb-1">
                    Country Flag (Optional)
                  </label>
                  <select
                    value={guestCountry}
                    onChange={(e) => setGuestCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-700 focus:border-amber-400 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all font-mono cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.name} className="bg-slate-900 text-white">
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Launch CTA */}
              <button
                type="button"
                onClick={handleGuestLaunch}
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_30px_rgba(251,191,36,0.35)] disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
              >
                <Compass className="w-5 h-5" />
                <span>{isLoading ? 'PREPARING PASS...' : 'CONTINUE AS GUEST CADET'}</span>
              </button>

              <div className="pt-2 text-center text-xs text-slate-400">
                Want to claim an official astronaut callsign?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('register')}
                  className="text-cyan-400 hover:underline font-mono"
                >
                  Create an Account
                </button>
              </div>
            </div>
          )}

          {/* Footer note for teammate / backend */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>NASA CADET SYSTEM v2.6 • FRONTEND READY</span>
            <span className="text-cyan-400/80">API HOOKS READY</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
