import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import useArticleSearch from "@/hooks/useArticleSearch";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SearchForm from "@/components/features/SearchForm";
import SearchResults from "@/components/features/SearchResults";
import SortOptions from "./SortOptions";

const ArticleSearchContainer = () => {
  const {
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
  } = useArticleSearch();
  const { ref, isIntersecting } = useIntersectionObserver({ rootMargin: "100px" });

  useEffect(() => {
    if (hasSearched && isIntersecting && hasNextPage && !isLoading && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasSearched, isIntersecting, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <section className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <SearchForm onSubmit={executeSearch} isLoading={isLoading} />
        <SortOptions
          value={sortOption}
          onChange={handleSortChange}
          disabled={isLoading || isFetchingNextPage}
        />
      </section>
      <section>
        <SearchResults
          articles={articles}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
        <div ref={ref} className="mt-8 flex justify-center py-6">
          {isFetchingNextPage && <Loader2 className="h-8 w-8 animate-spin text-slate-500" />}
          {!hasNextPage && hasSearched && articles.length > 0 && (
            <p className="text-slate-500">Anda telah mencapai akhir hasil pencarian.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default ArticleSearchContainer;
