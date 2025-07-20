import { useCallback, useRef, useState } from "react";
import { searchArticles } from "@/services/articleService";
import type { Article } from "@/types";
import type { SortOption } from "@/components/features/SortOptions";

const useArticleSearch = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [currentQuery, setCurrentQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("relevance");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const throttleLock = useRef<boolean>(false);

  const performSearch = useCallback(
    async (query: string, page: number, sort: SortOption, isNewSearch: boolean) => {
      isNewSearch ? setIsLoading(true) : setIsFetchingNextPage(true);
      setError(null);

      try {
        const result = await searchArticles(query, page, sort);
        setArticles(prev => (isNewSearch ? result.articles : [...prev, ...result.articles]));

        const totalFetched = (page + 1) * 10;
        setHasNextPage(totalFetched < result.metadata.hits);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred.");
        if (isNewSearch) {
          setArticles([]);
        }
      } finally {
        isNewSearch ? setIsLoading(false) : setIsFetchingNextPage(false);
      }
    },
    []
  );

  const executeSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      if (!trimmedQuery) {
        setArticles([]);
        setHasSearched(false);
        setError(null);
        return;
      }

      setHasSearched(true);
      setCurrentQuery(trimmedQuery);
      setCurrentPage(0);
      setArticles([]);
      performSearch(trimmedQuery, 0, sortOption, true);
    },
    [sortOption, performSearch]
  );

  const fetchNextPage = useCallback(() => {
    if (isLoading || isFetchingNextPage || !hasNextPage || throttleLock.current) return;

    throttleLock.current = true;

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    performSearch(currentQuery, nextPage, sortOption, false);

    setTimeout(() => {
      throttleLock.current = false;
    }, 1700);
  }, [
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    currentPage,
    currentQuery,
    sortOption,
    performSearch,
  ]);

  const handleSortChange = useCallback(
    (newSortOption: SortOption) => {
      setSortOption(newSortOption);

      if (!hasSearched || !currentQuery) return;

      setCurrentPage(0);
      setArticles([]);
      performSearch(currentQuery, 0, newSortOption, true);
    },
    [hasSearched, currentQuery, performSearch]
  );

  return {
    articles,
    isLoading,
    isFetchingNextPage,
    error,
    hasSearched,
    hasNextPage,
    sortOption,
    executeSearch,
    handleSortChange,
    fetchNextPage,
  };
};

export default useArticleSearch;
