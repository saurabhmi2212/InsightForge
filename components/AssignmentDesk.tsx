import React, { useState } from 'react';
import { Assignment, Tone } from '../types';
import { LucideSend, LucideNewspaper } from 'lucide-react';

interface Props {
  onAssign: (assignment: Assignment) => void;
  isProcessing: boolean;
}

export const AssignmentDesk: React.FC<Props> = ({ onAssign, isProcessing }) => {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [tone, setTone] = useState<Tone>(Tone.OBJECTIVE);
  const [wordCount, setWordCount] = useState(400);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic) return;
    onAssign({ topic, context, tone, wordCount });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-slate-200 h-fit sticky top-6">
      <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center gap-2">
        <LucideNewspaper className="text-slate-600 w-5 h-5" />
        <h2 className="font-bold text-slate-700 uppercase tracking-wide text-sm">Assignment Desk</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Headline Topic</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. A localized Mars colony opens its first coffee shop"
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Key Facts / Context</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Provide details the reporter must include..."
            className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all h-32 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {Object.values(Tone).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Length (Words)</label>
            <input
              type="number"
              min="100"
              max="1000"
              step="50"
              value={wordCount}
              onChange={(e) => setWordCount(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isProcessing || !topic}
          className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md font-bold text-white uppercase tracking-wider transition-all
            ${isProcessing 
              ? 'bg-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
        >
          {isProcessing ? (
            <>
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              Gemini is Thinking...
            </>
          ) : (
            <>
              <LucideSend className="w-4 h-4" />
              Dispatch Reporter
            </>
          )}
        </button>
      </form>
    </div>
  );
};