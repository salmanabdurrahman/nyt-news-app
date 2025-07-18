export interface Headline {
  main: string;
  kicker: string | null;
  print_headline: string | null;
}

export interface Byline {
  original: string | null;
  person: {
    firstname: string;
    lastname: string;
    role: string;
  }[];
}

export interface Multimedia {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
}

export interface Article {
  _id: string;
  web_url: string;
  snippet: string;
  headline: Headline;
  byline: Byline;
  pub_date: string;
  source: string;
  multimedia: Multimedia[];
  word_count: number;
}

export interface Meta {
  hits: number;
  offset: number;
  time: number;
}

export interface ArticleSearchResponse {
  status: string;
  copyright: string;
  response: {
    docs: Article[];
    meta: Meta;
  };
}
