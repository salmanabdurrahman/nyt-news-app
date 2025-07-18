import axios from "axios";
import type { Article, ArticleSearchResponse, MetaData } from "@/types";

const API_KEY = import.meta.env.VITE_NYT_API_KEY;

const apiClient = axios.create({
  baseURL: "https://api.nytimes.com/svc/search/v2",
});

apiClient.interceptors.request.use(config => {
  if (!API_KEY) {
    throw new Error(
      "NYT API key is not defined. Please set VITE_NYT_API_KEY in your environment variables."
    );
  }

  config.params = {
    ...config.params,
    "api-key": API_KEY,
  };
  return config;
});

export interface ArticleSearchResult {
  articles: Article[];
  metadata: MetaData;
}

export const searchArticles = async (
  query: string,
  page: number = 0
): Promise<ArticleSearchResult> => {
  try {
    const response = await apiClient.get<ArticleSearchResponse>("/articlesearch.json", {
      params: {
        fq: query,
        page: page,
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
