import React from 'react';
import ReactMarkdown from 'react-markdown';
import { NewsOutput } from '../types';

interface Props {
  data: NewsOutput;
}

export const ArticleView: React.FC<Props> = ({ data }) => {
  return (
    <article className="bg-white p-8 md:p-12 shadow-sm border border-slate-200">
      <div className="border-b-2 border-black pb-6 mb-6">
        <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
          {data.dateline}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight mb-4">
          {data.headline}
        </h1>
        <h2 className="text-xl md:text-2xl font-serif text-slate-600 italic leading-snug">
          {data.subheadline}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full md:w-1/3 shrink-0">
             <div className="bg-slate-200 aspect-square w-full flex flex-col items-center justify-center p-4 text-center border border-slate-300">
                <span className="text-xs font-bold text-slate-500 uppercase mb-2">Image Placeholder</span>
                <p className="text-sm text-slate-600 italic font-serif">"{data.image_prompt_description}"</p>
             </div>
        </div>
        <div className="w-full md:w-2/3">
           <div className="prose prose-slate font-serif max-w-none prose-p:indent-6 prose-p:text-lg prose-headings:font-sans">
            <ReactMarkdown>{data.body_content}</ReactMarkdown>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-4 border-t border-slate-300 text-center">
        <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">
          End of Dispatch &bull; Gemini 3 Generation
        </p>
      </div>
    </article>
  );
};