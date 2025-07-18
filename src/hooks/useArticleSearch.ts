import { useCallback, useState } from "react";
import { searchArticles } from "@/services/api";
import type { Article } from "@/types";
import type { SortOption } from "@/components/features/SortOptions";

const useArticleSearch = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  const performSearch = useCallback(async (query: string, page: number, sort: SortOption) => {
    setIsLoading(true);
    setError(null);
    window.scrollTo(0, 0);

    try {
      const result = await searchArticles(query, page, sort);
      setArticles(result.articles);
      if (page === 0) {
        setTotalPages(Math.ceil(result.metadata.hits / 10));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      setArticles([]);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const executeSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setArticles([]);
        setHasSearched(false);
        setError(null);
        setCurrentPage(0);
        setTotalPages(0);
        setCurrentQuery("");
        return;
      }

      setHasSearched(true);
      setCurrentQuery(query);
      setCurrentPage(0);
      performSearch(query, 0, sortOption);
    },
    [sortOption, performSearch]
  );

  const changePage = useCallback(
    async (newPage: number) => {
      if (!currentQuery.trim() || newPage < 0 || newPage >= totalPages) {
        return;
      }

      setCurrentPage(newPage);
      performSearch(currentQuery, newPage, sortOption);
    },
    [currentQuery, totalPages, sortOption, performSearch]
  );

  const handleSortChange = useCallback(
    (newSortOption: SortOption) => {
      setSortOption(newSortOption);

      if (hasSearched && currentQuery) {
        setCurrentPage(0);
        performSearch(currentQuery, 0, newSortOption);
      }
    },
    [hasSearched, currentQuery, performSearch]
  );

  return {
    articles,
    isLoading,
    error,
    hasSearched,
    currentPage,
    totalPages,
    sortOption,
    executeSearch,
    changePage,
    handleSortChange,
  };
};

export default useArticleSearch;
