import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Article } from "@/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getArticleImageUrl = (article: Article): string => {
  const imageUrl = article.multimedia?.default?.url || article.multimedia?.thumbnail?.url;
  if (!imageUrl) {
    return "https://placehold.co/600x400/png?text=No+Image+Available&font=Inter&text_color=000000&bg_color=FFFFFF";
  }

  return imageUrl.startsWith("https") ? imageUrl : `https://static01.nyt.com/${imageUrl}`;
};
