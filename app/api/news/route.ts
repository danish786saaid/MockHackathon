import { NextResponse } from "next/server";

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = "https://newsapi.org/v2/top-headlines";

export async function GET() {
  if (!NEWS_API_KEY) {
    return NextResponse.json({ error: "NEWS_API_KEY not configured" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `${NEWS_API_URL}?category=business&pageSize=20&language=en&apiKey=${NEWS_API_KEY}`,
      { next: { revalidate: 300 } }
    );

    if (!res.ok) {
      const body = await res.text();
      return NextResponse.json({ error: body }, { status: res.status });
    }

    const data = await res.json();

    const articles = (data.articles ?? []).map(
      (a: { title: string; source: { name: string }; url: string; publishedAt: string; urlToImage: string | null }, i: number) => ({
        id: `news-${i}`,
        headline: a.title,
        source: a.source?.name ?? "Unknown",
        url: a.url,
        publishedAt: a.publishedAt,
        image: a.urlToImage,
      })
    );

    return NextResponse.json({ articles });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch news" },
      { status: 500 }
    );
  }
}
