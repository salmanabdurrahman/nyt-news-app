import { Loader2, Newspaper, SearchX } from "lucide-react";
import type { Article } from "@/types";
import ArticleList from "@/components/features/ArticleList";

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  articles: Article[];
}

const SearchResults = ({ isLoading, error, hasSearched, articles }: SearchResultsProps) => {
  const containerClasses =
    "mt-12 flex flex-col items-center justify-center text-center p-12 motion-safe:animate-fadeIn";

  if (isLoading) {
    return (
      <div className={containerClasses}>
        <Loader2 className="h-12 w-12 animate-spin text-slate-500" />
        <p className="mt-4 text-lg font-medium text-slate-700 dark:text-slate-300">
          Mencari artikel...
        </p>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div
        className={`${containerClasses} rounded-lg border border-red-200 bg-red-50/50 dark:border-red-900/50 dark:bg-red-950/20`}
      >
        <SearchX className="h-12 w-12 text-red-500" />
        <h3 className="mt-4 text-xl font-semibold text-red-800 dark:text-red-200">
          Oops! Terjadi Kesalahan
        </h3>
        <p className="mt-2 max-w-md text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (hasSearched && articles.length === 0) {
    return (
      <div
        className={`${containerClasses} rounded-lg border border-dashed border-slate-300 dark:border-slate-700`}
      >
        <SearchX className="h-12 w-12 text-slate-400 dark:text-slate-500" />
        <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-300">
          Hasil Tidak Ditemukan
        </h3>
        <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
          Kami tidak dapat menemukan artikel yang cocok dengan kata kunci Anda. Coba gunakan kata
          kunci lain.
        </p>
      </div>
    );
  }

  if (hasSearched && articles.length > 0) {
    return (
      <>
        <ArticleList articles={articles} />
        {error && (
          <div className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
            Gagal memuat lebih banyak artikel: {error}
          </div>
        )}
      </>
    );
  }

  return (
    <div
      className={`${containerClasses} rounded-lg border border-dashed border-slate-300 dark:border-slate-700`}
    >
      <Newspaper className="h-12 w-12 text-slate-400 dark:text-slate-500" />
      <h3 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-300">
        Selamat Datang!
      </h3>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
        Mulai pencarian untuk menemukan artikel menarik dari The New York Times.
      </p>
    </div>
  );
};

export default SearchResults;
