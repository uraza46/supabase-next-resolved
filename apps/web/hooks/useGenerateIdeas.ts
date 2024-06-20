import { useState } from 'react';

interface GenerateArticleParams {
  topic: string;
}

interface useGenerateIdeasReturn {
  ideas: {
    headline:string;
    angle:string
  }[];
  generateIdeas: (params: GenerateArticleParams) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

const useGenerateIdeas = (): useGenerateIdeasReturn => {
  const [ideas, setIdeas] = useState<{
    headline:string;
    angle:string
  }[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateIdeas = async ({topic }: GenerateArticleParams) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // dummy API
      const response = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate article');
      }

      const result = await response.json();
      setIdeas(result.article);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    ideas,
    generateIdeas,
    isGenerating,
    error,
  };
};

export default useGenerateIdeas;
