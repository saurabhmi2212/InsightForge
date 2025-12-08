import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 text-white p-6 shadow-md border-b-4 border-yellow-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-4xl font-serif font-black tracking-tighter uppercase">The AI Chronicle</h1>
          <p className="text-slate-400 text-sm tracking-widest uppercase mt-1">Assignment Desk &bull; Powered by Gemini 3</p>
        </div>
        <div className="text-right hidden md:block">
          <div className="text-xs text-slate-500 uppercase font-bold">System Status</div>
          <div className="flex items-center justify-end gap-2 text-green-400 text-sm font-mono">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            ONLINE: GEMINI-3-PRO
          </div>
        </div>
      </div>
    </header>
  );
};