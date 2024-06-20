import { useState } from 'react';

interface CorrectGrammarParams {
  inputText: string;
  correctGrammar: boolean;
}

interface UseCorrectGrammarReturn {
  correctedText: string | null;
  correctGrammar: (params: CorrectGrammarParams) => Promise<void>;
  isCorrecting: boolean;
  error: string | null;
}

const useCorrectGrammar = (): UseCorrectGrammarReturn => {
  const [correctedText, setCorrectedText] = useState<string | null>(null);
  const [isCorrecting, setIsCorrecting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const correctGrammar = async ({ inputText, correctGrammar }: CorrectGrammarParams) => {
    setIsCorrecting(true);
    setError(null);
    
    try {
      const response = await fetch('/api/correct-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, correctGrammar }),
      });

      if (!response.ok) {
        throw new Error('Failed to correct grammar');
      }

      const result = await response.json();
      setCorrectedText(result.correctedText);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsCorrecting(false);
    }
  };

  return {
    correctedText,
    correctGrammar,
    isCorrecting,
    error,
  };
};

export default useCorrectGrammar;
