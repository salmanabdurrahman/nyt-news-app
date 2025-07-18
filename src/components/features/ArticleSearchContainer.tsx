import useArticleSearch from "@/hooks/useArticleSearch";
import SearchForm from "@/components/features/SearchForm";
import SearchResults from "@/components/features/SearchResults";
import PaginationControls from "@/components/features/PaginationControls";

const ArticleSearchContainer = () => {
  const {
    articles,
    isLoading,
    error,
    hasSearched,
    currentPage,
    totalPages,
    executeSearch,
    changePage,
  } = useArticleSearch();

  return (
    <>
      <section className="mb-12 flex justify-center">
        <SearchForm onSubmit={executeSearch} isLoading={isLoading} />
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
