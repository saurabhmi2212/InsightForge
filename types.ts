export enum Tone {
  OBJECTIVE = 'Objective',
  SENSATIONAL = 'Sensational',
  INVESTIGATIVE = 'Investigative',
  SATIRICAL = 'Satirical',
  OPINIONATED = 'Opinionated'
}

export interface Assignment {
  topic: string;
  context: string;
  tone: Tone;
  wordCount: number;
}

export interface CritiquePoint {
  point: string;
  explanation: string;
}

export interface NewsOutput {
  headline: string;
  subheadline: string;
  dateline: string;
  body_content: string; // Markdown formatted
  image_prompt_description: string;
  critique: {
    what_gemini_got_right: CritiquePoint[];
    what_gemini_got_wrong: CritiquePoint[];
    editor_score: number; // 0 to 100
    editor_notes: string;
  };
}

export interface GenerateResponse {
  success: boolean;
  data?: NewsOutput;
  error?: string;
}