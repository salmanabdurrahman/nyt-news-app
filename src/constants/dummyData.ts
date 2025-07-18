import type { Article } from "@/types";

const MOCK_ARTICLES: Article[] = [
  {
    _id: "nyt://article/8aafa34f-53ab-5977-acde-da7b259f9703",
    web_url: "https://www.nytimes.com/2025/07/18/business/indonesia-china-trade.html",
    snippet:
      "Long before President Trump wielded tariffs as a weapon to punish Indonesia, the country was fighting back a flood of cheap Chinese goods.",
    headline: {
      main: "Before Trump, Indonesia Had Another Trade Headache: China",
      kicker: "",
      print_headline: "",
    },
    byline: {
      original: "By Alexandra Stevenson, Hasya Nindita and Ulet Ifansasti",
      person: [],
    },
    pub_date: "2025-07-18T04:00:13Z",
    source: "The New York Times",
    multimedia: {
      caption: "",
      credit: "Ulet Ifansasti for The New York Times",
      default: {
        url: "https://static01.nyt.com/images/2025/07/18/multimedia/18Biz-Indonesia-China-01-zcvg/18Biz-Indonesia-China-01-zcvg-articleLarge.jpg",
        height: 400,
        width: 600,
      },
      thumbnail: {
        url: "https://static01.nyt.com/images/2025/07/18/multimedia/18Biz-Indonesia-China-01-zcvg/18Biz-Indonesia-China-01-zcvg-thumbStandard.jpg",
        height: 75,
        width: 75,
      },
    },
    word_count: 1308,
  },
  {
    _id: "nyt://article/4aeebf39-1217-5977-80e1-4553a19701cd",
    web_url: "https://www.nytimes.com/2025/07/17/opinion/trump-america-china.html",
    snippet:
      "China has been displaying intellectual and innovative vitality for decades and the United States has scarcely mobilized.",
    headline: {
      main: "Trump Is Winning the Race to the Bottom",
      kicker: "David Brooks",
      print_headline: "Trump Is Good at Competing for Last Place",
    },
    byline: {
      original: "By David Brooks",
      person: [],
    },
    pub_date: "2025-07-17T21:00:06Z",
    source: "The New York Times",
    multimedia: {
      caption: "",
      credit: "Aleksey Kondratyev for The New York Times",
      default: {
        url: "https://static01.nyt.com/images/2025/07/18/multimedia/17brooks1-vlzw/17brooks1-vlzw-articleLarge.jpg",
        height: 776,
        width: 600,
      },
      thumbnail: {
        url: "https://static01.nyt.com/images/2025/07/18/multimedia/17brooks1-vlzw/17brooks1-vlzw-thumbStandard.jpg",
        height: 75,
        width: 75,
      },
    },
    word_count: 1563,
  },
];

export { MOCK_ARTICLES };
