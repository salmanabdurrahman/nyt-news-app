import axios from "axios";
import type { Article, ArticleSearchResponse } from "@/types";

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

export const searchArticles = async (query: string): Promise<Article[]> => {
  if (!query) {
    return [];
  }

  try {
    const response = await apiClient.get<ArticleSearchResponse>("/articlesearch.json", {
      params: {
        q: query,
      },
    });
    return response.data.response.docs;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw new Error("Failed to fetch articles from NYT API");
  }
};
