import type { Article } from "@/types";
import { formatDate, getArticleImageUrl } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const author = article.byline.original || "Penulis tidak diketahui";
  const imageUrl = getArticleImageUrl(article);

  return (
    <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card className="group flex h-full flex-col overflow-hidden pt-0 transition-all hover:shadow-xl dark:hover:border-slate-600 dark:hover:bg-slate-800/50">
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={imageUrl}
            alt={`Gambar untuk artikel: ${article.headline.main}`}
            className="h-full w-full object-fill transition-transform duration-300 ease-in-out group-hover:scale-105"
            onError={e => (e.currentTarget.style.display = "none")}
            loading="lazy"
          />
        </div>
        <div className="flex flex-grow flex-col p-4">
          <CardHeader className="p-0">
            <CardTitle className="text-lg leading-tight hover:text-slate-600">
              {article.headline.main}
            </CardTitle>
            <CardDescription className="pt-2">
              {author} &middot; {formatDate(article.pub_date)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow p-0 pt-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">{article.snippet}</p>
          </CardContent>
          <CardFooter className="p-0 pt-4">
            {article.source && <Badge variant="outline">{article.source}</Badge>}
          </CardFooter>
        </div>
      </Card>
    </a>
  );
};

export default ArticleCard;
