import React, { useState } from 'react';
import { Header } from './components/Header';
import { AssignmentDesk } from './components/AssignmentDesk';
import { ArticleView } from './components/ArticleView';
import { EditorFeedback } from './components/EditorFeedback';
import { Assignment, NewsOutput } from './types';
import { submitAssignment } from './services/newsService';
import { LucidePenTool } from 'lucide-react';

const App: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [output, setOutput] = useState<NewsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAssignment = async (assignment: Assignment) => {
    setIsProcessing(true);
    setError(null);
    setOutput(null);

    const result = await submitAssignment(assignment);

    if (result.success && result.data) {
      setOutput(result.data);
    } else {
      setError(result.error || "Failed to generate assignment.");
    }

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Assignment Desk */}
        <section className="lg:col-span-4">
          <AssignmentDesk onAssign={handleAssignment} isProcessing={isProcessing} />
          
          <div className="mt-8 p-6 bg-slate-800 rounded-lg text-slate-300 text-sm leading-relaxed shadow-lg">
            <h4 className="font-bold text-white mb-2 uppercase tracking-wide flex items-center gap-2">
              <LucidePenTool size={16} />
              Behind the Scenes
            </h4>
            <p className="mb-2">
              This application uses <strong>Gemini 3 Pro</strong> with structured JSON output and "Thinking" enabled (2k token budget).
            </p>
            <p>
              It asks the model to perform two distinct tasks in one pass:
            </p>
            <ol className="list-decimal pl-5 mt-2 space-y-1 text-slate-400">
              <li>Act as a reporter to generate creative content.</li>
              <li>Act as a critic to analyze its own limitations, hallucinations, or lack of human nuance.</li>
            </ol>
          </div>
        </section>

        {/* Right Column: Output Area */}
        <section className="lg:col-span-8 flex flex-col gap-8">
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-sm" role="alert">
              <p className="font-bold">Transmission Error</p>
              <p>{error}</p>
            </div>
          )}

          {!output && !isProcessing && !error && (
            <div className="bg-white border-2 border-dashed border-slate-300 rounded-lg h-96 flex flex-col items-center justify-center text-slate-400">
              <div className="bg-slate-50 p-6 rounded-full mb-4">
                <LucidePenTool className="w-12 h-12 text-slate-300" />
              </div>
              <p className="font-medium text-lg">Newsroom Standby</p>
              <p className="text-sm">Submit an assignment to begin production.</p>
            </div>
          )}

          {isProcessing && (
             <div className="bg-white border border-slate-200 rounded-lg h-96 flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-700">Gemini is Drafting...</p>
                  <p className="text-sm text-slate-500">Checking facts, writing copy, and reviewing details.</p>
                </div>
             </div>
          )}

          {output && (
            <div className="animate-fade-in-up space-y-8">
              <ArticleView data={output} />
              <EditorFeedback critique={output.critique} />
            </div>
          )}

        </section>
      </main>

      <footer className="bg-slate-200 border-t border-slate-300 py-6 text-center text-slate-500 text-sm">
        <p>Built with React, Tailwind, and Google Gemini API</p>
      </footer>
    </div>
  );
};

export default App;