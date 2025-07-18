import type { Article } from "@/types";
import { formatDate } from "@/lib/utils";
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

  return (
    <a href={article.web_url} target="_blank" rel="noopener noreferrer" className="block">
      <Card className="flex h-full flex-col transition-all hover:bg-slate-50 hover:shadow-md dark:hover:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-lg leading-tight">{article.headline.main}</CardTitle>
          <CardDescription>
            {author} &middot; {formatDate(article.pub_date)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-slate-600 dark:text-slate-400">{article.snippet}</p>
        </CardContent>
        <CardFooter>
          {article.source && <Badge variant="outline">{article.source}</Badge>}
        </CardFooter>
      </Card>
    </a>
  );
};

export default ArticleCard;
