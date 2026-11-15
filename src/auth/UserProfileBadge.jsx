import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  LogOut,
  UserCheck,
  ChevronDown,
  Globe,
  GraduationCap,
  Sparkles,
  RefreshCw,
  Shield
} from 'lucide-react';
import { sound } from '../utils/soundEngine';

export function UserProfileBadge({ cadet, onOpenAuth, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    sound.playClick('normal');
    setIsOpen(!isOpen);
  };

  const handleSwitch = () => {
    sound.playClick('normal');
    setIsOpen(false);
    if (onOpenAuth) onOpenAuth();
  };

  const handleSignOut = () => {
    sound.playClick('decision');
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  // If no cadet is loaded yet
  if (!cadet) {
    return (
      <button
        onClick={onOpenAuth}
        className="pointer-events-auto flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.2)]"
        title="Sign in or register your cadet profile"
      >
        <User className="w-3.5 h-3.5" />
        <span className="text-xs font-mono font-bold tracking-wider">CADET SIGN IN</span>
      </button>
    );
  }

  const isGuest = cadet.isGuest;

  return (
    <div className="relative pointer-events-auto" ref={dropdownRef}>
      {/* Badge Button in Navigation */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel transition-all cursor-pointer ${
          isGuest
            ? 'border-amber-500/40 hover:border-amber-400 bg-amber-500/10'
            : 'border-cyan-500/40 hover:border-cyan-400 bg-cyan-500/10'
        }`}
        title="View Cadet Profile & Settings"
      >
        <span className="text-sm select-none" role="img" aria-label="country-flag">
          {cadet.countryFlag || '🌍'}
        </span>

        <div className="flex flex-col text-left max-w-[120px] sm:max-w-[150px]">
          <span className="text-[10px] font-mono font-bold text-white truncate leading-none">
            {cadet.name}
          </span>
          <span
            className={`text-[9px] font-mono truncate leading-tight ${
              isGuest ? 'text-amber-300' : 'text-cyan-300'
            }`}
          >
            {isGuest ? 'Guest Cadet' : `@${cadet.username}`}
          </span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
        />
      </button>

      {/* Profile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-xl p-4 z-50 text-left"
          >
            {/* Header info */}
            <div className="flex items-start space-x-3 pb-3 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-xl shrink-0 shadow-inner">
                {cadet.countryFlag || '🚀'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-sm font-bold text-white font-mono truncate">{cadet.name}</h4>
                  {isGuest ? (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      GUEST
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      VERIFIED
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-cyan-400 truncate">@{cadet.username}</p>
              </div>
            </div>

            {/* Profile Meta Info */}
            <div className="py-3 space-y-2 text-xs font-mono border-b border-slate-800 text-slate-300">
              {/* Class */}
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Class:</span>
                <span className="text-white truncate font-medium">{cadet.class || 'Cadet Division'}</span>
              </div>

              {/* Country */}
              <div className="flex items-center space-x-2">
                <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Country:</span>
                <span className="text-white truncate font-medium">
                  {cadet.countryFlag} {cadet.country || 'Global Space Command'}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center space-x-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-slate-400">Status:</span>
                <span className={`font-semibold ${isGuest ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {cadet.role || 'Active Astronaut'}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 space-y-2">
              <button
                onClick={handleSwitch}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-cyan-300 text-xs font-mono font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Switch Cadet Account</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 hover:border-rose-500/60 text-rose-300 text-xs font-mono font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out of Terminal</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
