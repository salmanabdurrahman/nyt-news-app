import type { Article } from "@/types";
import ArticleCard from "@/components/features/ArticleCard";

interface ArticleListProps {
  articles: Article[];
}

const ArticleList = ({ articles }: ArticleListProps) => {
  if (articles.length === 0) {
    return <div className="text-center text-gray-500">Tidak ada artikel yang ditemukan.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map(article => (
        <ArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
