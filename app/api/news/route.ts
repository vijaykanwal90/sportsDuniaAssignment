import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Define types for the article and news response
interface Article {
  id: string;
  urlToImage: string;
  title: string;
  description: string;
  author: string;
  index: number;
  publishedAt: string;
  url: string;
}

type NewsResponse = {
  status: string;
  articles: Array<{
    id?: string; // Optional because the API might not return an `id`
    urlToImage: string | null;
    title: string | null;
    description: string | null;
    author: string | null;
    publishedAt: string | null;
    url: string | null;
  }>;
};

export async function GET() {
  try {
    const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    if (!key) {
      throw new Error("API key is missing");
    }
    console.log("The key is " + key);

    const currentDate = new Date();
//     const year = currentDate.getFullYear();
// const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 as months are zero-indexed
// const day = String(currentDate.getDate()).padStart(2, '0');
    const fromDate = new Date(currentDate);
    fromDate.setDate(currentDate.getDate() - 1);
    // const fromYear = fromDate.getFullYear();
    // const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
    // const fromDay = String(fromDate.getDate()).padStart(2, '0');
    // const formattedFromDate = `${fromYear}-${fromMonth}-${fromDay}`;
// const formattedDate = `${year}-${month}-${day}`;
    console.log("the date is " +fromDate)

    // Fetch articles from the API
    // const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=${formattedFromDate}&to=${formattedDate}&sortBy=popularity&apiKey=${key}`);
    const response = await fetch(`https://newsapi.org/v2/everything?q=tesla&from=${fromDate}&sortBy=publishedAt&apiKey=${key}`);
    const result: NewsResponse = await response.json();
    // console.log(result)
    // console.log("The result is " + result.articles);
    if (result.status !== 'ok') {
      throw new Error(result.status || "Failed to fetch data.");
    }

    // Process articles with type-safe transformations
    const processedArticles: Article[] = result.articles.map((article, index): Article => ({
      id: article.id || uuidv4(), // Use UUID if `id` is missing
      urlToImage: article.urlToImage || "/placeholder.svg?height=200&width=300", // Fallback to placeholder image
      title: article.title || "No Title Available", // Fallback title
      description: article.description || "Description not available", // Fallback description
      author: article.author || "Unknown Author", // Fallback author
      index: index + 1, // Set index based on position
      publishedAt: article.publishedAt || "Unknown date", // Fallback for date
      url: article.url || "#", // Fallback URL
    }));

    // console.log("Processed articles:", processedArticles);

    // Return the processed data as JSON
    return NextResponse.json({ articles: processedArticles });

  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
  }
}
