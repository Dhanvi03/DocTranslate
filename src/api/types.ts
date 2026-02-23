// src/api/types.ts

export interface DocumentIntelligenceResponse {
  extracted_text: string;
  error?: string;
}

export interface TranslationResponse {
  translated_text: string;
  error?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionResponse {
  choices?: Array<{
    message: {
      content: string;
    };
  }>;
  error?: string;
}

export interface DetectLanguageResponse {
  language: string;
  error?: string;
}

export interface SavedDocument {
  id: string;
  title: string;
  extractedText: string;
  translatedText: string;
  language: string;
  image: string | null;
  date: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  text: string;
}

export interface AppPreferences {
  defaultLanguage: string;
  saveHistory: boolean;
}