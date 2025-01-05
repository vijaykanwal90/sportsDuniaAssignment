'use client';

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApiDataContext } from "./Context/Store";
import { Filter } from "@/components/Filter";

// Define article type
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

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]); // Type the articles state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { setOriginalData } = useApiDataContext();

  const fetchData = async () => {
    try {
      const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      console.log("The key is " + key);

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const fromDate = new Date(currentDate);
      fromDate.setDate(currentDate.getDate() - 1);
      const fromYear = fromDate.getFullYear();
      const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
      const fromDay = String(fromDate.getDate()).padStart(2, '0');
      const formattedFromDate = `${fromYear}-${fromMonth}-${fromDay}`;

      const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=${formattedFromDate}&to=${formattedDate}&sortBy=popularity&apiKey=${key}`);
      const result = await response.json();

      const processedArticles = result.articles.map((article: any, index: number) => ({
        ...article,
        id: article.source.id || uuidv4(),
        urlToImage: article.urlToImage || "/placeholder.svg?height=200&width=300",
        title: article.title || "No Title Available",
        description: article.description || "Description not available",
        author: article.author || "Unknown Author",
        index: index + 1,
      }));

      setArticles(processedArticles);

      const extractedData = processedArticles.map((article) => ({
        name: article.author,
        title: article.title,
        urlToImage: article.urlToImage,
        index: article.index,
        url: article.url,
        date: article.publishedAt,
      }));

      setOriginalData(extractedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50 p-4 rounded-lg shadow-md">
        <p className="text-red-500 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600">
        News Articles
      </h1>

      <div className="mb-8 flex justify-center">
        <Filter />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
                <Skeleton className="h-4 w-2/3 bg-gray-300 rounded-md" />
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <Skeleton className="h-48 w-full bg-gray-300 rounded-md mb-4" />
                <Skeleton className="h-4 w-full bg-gray-300 rounded-md mb-2" />
                <Skeleton className="h-4 w-5/6 bg-gray-300 rounded-md" />
              </CardContent>
              <CardFooter className="p-4">
                <Skeleton className="h-10 w-28 bg-gray-300 rounded-md" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.index} className="flex flex-col h-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <CardHeader className="bg-gray-100 p-4 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800 line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="relative w-full pt-[56.25%] mb-4">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="rounded-md absolute top-0 left-0"
                  />
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
              </CardContent>
              <CardFooter className="p-4">
                <p className="text-sm text-gray-500">By {article.author}</p>
                <p className="text-xs text-gray-400">{new Date(article.publishedAt).toLocaleString()}</p>
                <Button size="sm" asChild className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-500">No articles found</p>
      )}
    </div>
  );
}
