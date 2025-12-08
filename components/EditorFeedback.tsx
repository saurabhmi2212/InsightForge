import React from 'react';
import { NewsOutput } from '../types';
import { LucideCheckCircle, LucideXCircle, LucideAlertTriangle } from 'lucide-react';

interface Props {
  critique: NewsOutput['critique'];
}

export const EditorFeedback: React.FC<Props> = ({ critique }) => {
  const scoreColor = critique.editor_score >= 80 ? 'text-green-600' : critique.editor_score >= 60 ? 'text-yellow-600' : 'text-red-600';
  const scoreBorder = critique.editor_score >= 80 ? 'border-green-600' : critique.editor_score >= 60 ? 'border-yellow-600' : 'border-red-600';

  return (
    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <LucideAlertTriangle size={120} className="text-yellow-600" />
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide font-sans flex items-center gap-2">
          <span className="bg-red-600 text-white px-2 py-1 text-sm rounded-sm">Confidential</span>
          Editor's Critique
        </h3>
        <div className={`border-4 ${scoreBorder} rounded-full w-16 h-16 flex items-center justify-center font-black text-2xl ${scoreColor} bg-white shadow-sm`}>
          {critique.editor_score}
        </div>
      </div>

      <p className="text-slate-700 italic mb-8 border-l-4 border-yellow-400 pl-4 py-1 bg-yellow-100/50 rounded-r">
        "{critique.editor_notes}"
      </p>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        
        {/* What it got right */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-green-700 font-bold border-b border-green-200 pb-2">
            <LucideCheckCircle size={20} />
            <h4>What Gemini Got Right</h4>
          </div>
          <ul className="space-y-4">
            {critique.what_gemini_got_right.map((item, idx) => (
              <li key={idx} className="bg-white p-3 rounded-md shadow-sm border border-green-100">
                <span className="block font-bold text-slate-800 text-sm mb-1">{item.point}</span>
                <span className="block text-slate-600 text-sm leading-relaxed">{item.explanation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What it got wrong */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-red-700 font-bold border-b border-red-200 pb-2">
            <LucideXCircle size={20} />
            <h4>What Gemini Got Wrong</h4>
          </div>
          <ul className="space-y-4">
            {critique.what_gemini_got_wrong.map((item, idx) => (
              <li key={idx} className="bg-white p-3 rounded-md shadow-sm border border-red-100">
                <span className="block font-bold text-slate-800 text-sm mb-1">{item.point}</span>
                <span className="block text-slate-600 text-sm leading-relaxed">{item.explanation}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};