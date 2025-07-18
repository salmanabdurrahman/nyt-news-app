import useArticleSearch from "@/hooks/useArticleSearch";
import SearchForm from "@/components/features/SearchForm";
import SearchResults from "@/components/features/SearchResults";
import PaginationControls from "@/components/features/PaginationControls";

const HomePage = () => {
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
    <main className="container mx-auto min-h-screen p-4 md:p-10">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
          Pencarian Artikel
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Gunakan mesin pencari di bawah ini untuk menjelajahi artikel dari The New York Times.
        </p>
      </header>
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
    </main>
  );
};

export default HomePage;
