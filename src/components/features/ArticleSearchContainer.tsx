import useArticleSearch from "@/hooks/useArticleSearch";
import SearchForm from "@/components/features/SearchForm";
import SearchResults from "@/components/features/SearchResults";
import PaginationControls from "@/components/features/PaginationControls";
import SortOptions from "./SortOptions";

const ArticleSearchContainer = () => {
  const {
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
  } = useArticleSearch();

  return (
    <>
      <section className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <SearchForm onSubmit={executeSearch} isLoading={isLoading} />
        <SortOptions value={sortOption} onChange={handleSortChange} disabled={isLoading} />
      </section>
      <section>
        <SearchResults
          articles={articles}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
        {!isLoading && articles.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={changePage}
          />
        )}
      </section>
    </>
  );
};

export default ArticleSearchContainer;
