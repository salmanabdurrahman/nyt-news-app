import { useCallback, useState } from "react";
import { searchArticles } from "@/services/api";
import type { Article } from "@/types";

const useArticleSearch = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const executeSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setArticles([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const result = await searchArticles(query);
      setArticles(result);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { articles, isLoading, error, hasSearched, executeSearch };
};

export default useArticleSearch;
