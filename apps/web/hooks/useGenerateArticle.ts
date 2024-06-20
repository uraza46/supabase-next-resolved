import { useState } from 'react';

interface GenerateArticleParams {
  inputText: string;
  identifier: string;
  mood: string;
}

interface UseGenerateArticleReturn {
  article: string | null;
  generateArticle: (params: GenerateArticleParams) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

const useGenerateArticle = (): UseGenerateArticleReturn => {
  const [article, setArticle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateArticle = async ({ inputText, identifier, mood }: GenerateArticleParams) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // dummy API
      const response = await fetch('/api/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputText, identifier, mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const result = await response.json();
      setArticle(result.article);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    article,
    generateArticle,
    isGenerating,
    error,
  };
};

export default useGenerateArticle;
