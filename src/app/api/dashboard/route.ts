// pages/api/news.ts
import { NextResponse } from "next/server";

type Article = {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  source: {
    name: string;
  };
  publishedAt: string;
};

export async function GET() {
  try {
    const apiKey = process.env.NEWS_API_KEY; // Store your key in .env.local
    const url = `https://newsapi.org/v2/everything?q=diagnostic+automobile&language=fr&sortBy=publishedAt&apiKey=${apiKey}`;

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`News API request failed with status ${res.status}`);
    }

    const data = await res.json();

    // Optionally map only required fields for the frontend
    const articles = data.articles.map((article: Article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.urlToImage,
      source: article.source.name,
      publishedAt: article.publishedAt,
    }));

    return NextResponse.json({ articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news articles" },
      { status: 500 }
    );
  }
}
