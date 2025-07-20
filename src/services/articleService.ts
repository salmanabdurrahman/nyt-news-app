import { apiClient } from "@/lib/axios";
import type { Article, ArticleSearchResponse, MetaData } from "@/types";
import type { SortOption } from "@/components/features/SortOptions";

export interface ArticleSearchResult {
  articles: Article[];
  metadata: MetaData;
}

export const searchArticles = async (
  query: string,
  page: number = 0,
  sort: SortOption = "relevance"
): Promise<ArticleSearchResult> => {
  try {
    const response = await apiClient.get<ArticleSearchResponse>("/articlesearch.json", {
      params: {
        q: query,
        page,
        sort,
      },
    });

    return {
      articles: response.data.response?.docs || [],
      metadata: response.data.response?.metadata || { hits: 0, offset: 0, time: 0 },
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles from The New York Times API.");
  }
};
