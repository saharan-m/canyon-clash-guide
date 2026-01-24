'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('light-mode', savedTheme === 'light');
    document.documentElement.classList.toggle('dark-mode', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('light-mode', newTheme === 'light');
    document.documentElement.classList.toggle('dark-mode', newTheme === 'dark');
  };

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
        <div className="w-5 h-5 rounded-full bg-slate-600"></div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Sun Icon */}
      <svg
        className={`absolute w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 transition-all duration-500 ${
          theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-0'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
      
      {/* Moon Icon */}
      <svg
        className={`absolute w-5 h-5 sm:w-6 sm:h-6 text-blue-400 transition-all duration-500 ${
          theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
      } opacity-0 group-hover:opacity-100 blur-sm`}></div>
    </button>
  );
}

