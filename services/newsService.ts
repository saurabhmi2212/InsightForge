import { GoogleGenAI, Type } from "@google/genai";
import { Assignment, NewsOutput, GenerateResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const submitAssignment = async (assignment: Assignment): Promise<GenerateResponse> => {
  try {
    const modelId = "gemini-3-pro-preview";

    const prompt = `
      You are a veteran journalist and senior editor simulation running on Gemini 3.
      
      PART 1: THE REPORTER
      Write a news article based on the following assignment:
      - Topic: ${assignment.topic}
      - Additional Context/Details: ${assignment.context}
      - Tone: ${assignment.tone}
      - Target Length: Approx ${assignment.wordCount} words
      
      PART 2: THE EDITOR (Self-Reflection)
      After writing the article, step back and analyze your own performance as an AI model attempting to do journalism. 
      Be critically honest about the limitations of Large Language Models in this specific context.
      
      Identify specific nuances you captured successfully ("What it got right") and specific areas where you might have hallucinated, used clichés, lacked on-the-ground context, or failed to capture human emotion accurately ("What it got wrong").
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 2048 }, // Enable thinking for deeper self-reflection
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            subheadline: { type: Type.STRING },
            dateline: { type: Type.STRING, description: "City, Country - Date" },
            body_content: { type: Type.STRING, description: "The full article text in Markdown format." },
            image_prompt_description: { type: Type.STRING, description: "A description of a photo that would accompany this article." },
            critique: {
              type: Type.OBJECT,
              properties: {
                what_gemini_got_right: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      point: { type: Type.STRING, description: "A short summary of the success" },
                      explanation: { type: Type.STRING, description: "Detailed explanation of why this was successful" }
                    }
                  }
                },
                what_gemini_got_wrong: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      point: { type: Type.STRING, description: "A short summary of the failure or limitation" },
                      explanation: { type: Type.STRING, description: "Detailed explanation of the AI limitation or error" }
                    }
                  }
                },
                editor_score: { type: Type.INTEGER, description: "A score from 0 to 100 based on quality." },
                editor_notes: { type: Type.STRING, description: "Overall summary from the editor's perspective." }
              }
            }
          }
        }
      }
    });

    if (!response.text) {
      throw new Error("No text returned from model");
    }

    const data = JSON.parse(response.text) as NewsOutput;
    
    return {
      success: true,
      data: data
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    };
  }
};