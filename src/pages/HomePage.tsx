import { useState } from "react";
import { searchArticles } from "@/services/api";
import type { Article } from "@/types";
import SearchForm from "@/components/features/SearchForm";
import SearchResults from "@/components/features/SearchResults";

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
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
  };

  return (
    <main className="container mx-auto min-h-screen p-4 md:p-8">
      <header className="mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl dark:text-slate-50">
          Pencarian Artikel
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
          Gunakan mesin pencari di bawah ini untuk menjelajahi jutaan artikel dari The New York
          Times.
        </p>
      </header>
      <section className="mb-12 flex justify-center">
        <SearchForm onSubmit={handleSearch} isLoading={isLoading} />
      </section>
      <section>
        <SearchResults
          articles={articles}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
        />
      </section>
    </main>
  );
};

export default HomePage;
