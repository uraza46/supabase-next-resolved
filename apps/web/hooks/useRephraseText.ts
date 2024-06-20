import { useState } from 'react';

interface RephraseTextParams {
  inputText: string;
  mood: string;
  rephrase: boolean;
}

interface UseRephraseTextReturn {
  rephrasedText: string | null;
  rephraseText: (params: RephraseTextParams) => Promise<void>;
  isRephrasing: boolean;
  error: string | null;
}

const useRephraseText = (): UseRephraseTextReturn => {
  const [rephrasedText, setRephrasedText] = useState<string | null>(null);
  const [isRephrasing, setIsRephrasing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const rephraseText = async ({ inputText, mood, rephrase }: RephraseTextParams) => {
    setIsRephrasing(true);
    setError(null);
    
    try {
      // dummy API
      const response = await fetch('/api/rephrase-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, mood, rephrase }),
      });

      if (!response.ok) {
        throw new Error('Failed to rephrase text');
      }

      const result = await response.json();
      setRephrasedText(result.rephrasedText);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsRephrasing(false);
    }
  };

  return {
    rephrasedText,
    rephraseText,
    isRephrasing,
    error,
  };
};

export default useRephraseText;
