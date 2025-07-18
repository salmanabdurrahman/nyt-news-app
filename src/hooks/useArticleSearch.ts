import { useCallback, useState } from "react";
import { searchArticles } from "@/services/api";
import type { Article } from "@/types";

const useArticleSearch = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>("");

  const executeSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setArticles([]);
      setHasSearched(false);
      setError(null);
      setCurrentPage(0);
      setTotalPages(0);
      setCurrentQuery("");
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentQuery(query);
    setCurrentPage(0);

    try {
      const result = await searchArticles(query, 0);
      setArticles(result.articles);
      setTotalPages(Math.ceil(result.metadata.hits / 10));
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

  const changePage = useCallback(
    async (newPage: number) => {
      if (!currentQuery.trim() || newPage < 0 || newPage >= totalPages) {
        return;
      }

      setIsLoading(true);
      setError(null);
      window.scrollTo(0, 0);

      try {
        const result = await searchArticles(currentQuery, newPage);
        setArticles(result.articles);
        setCurrentPage(newPage);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred while changing pages.");
        }
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentQuery, totalPages]
  );

  return {
    articles,
    isLoading,
    error,
    hasSearched,
    currentPage,
    totalPages,
    executeSearch,
    changePage,
  };
};

export default useArticleSearch;
