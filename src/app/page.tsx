'use client';

import { useState, useEffect } from "react";
// import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/Skeleton";
import { useApiDataContext } from "./Context/Store";
import { Filter } from "@/components/Filter";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const {  data , originalData , setOriginalData } = useApiDataContext();

  const fetchData = async () => {
    try {
      const key = process.env.NEXT_PUBLIC_NEWS_API_KEY;
      console.log("the key is " +key)
      // Get the current date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add 1 as months are zero-indexed
const day = String(currentDate.getDate()).padStart(2, '0');

// Format the current date
const formattedDate = `${year}-${month}-${day}`;

// Get the date 5 days earlier
const fromDate = new Date(currentDate);
fromDate.setDate(currentDate.getDate() - 1); // Subtract 5 days

// Format the 'fromDate' (5 days earlier)
const fromYear = fromDate.getFullYear();
const fromMonth = String(fromDate.getMonth() + 1).padStart(2, '0');
const fromDay = String(fromDate.getDate()).padStart(2, '0');
const formattedFromDate = `${fromYear}-${fromMonth}-${fromDay}`;

// Example output: '2025-01-05'

      const response = await fetch(`https://newsapi.org/v2/everything?q=apple&from=${formattedFromDate}&to=${formattedDate}&sortBy=popularity&apiKey=${key}`);
      const result = await response.json();
      
      const processedArticles = result.articles.map((article, index) => ({
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
        date: article.publishedAt
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">News Articles</h1>
      
      <div className="mb-8">
        <Filter />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="flex flex-col h-full">
              <CardHeader>
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-28" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Card key={article.index} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="relative w-full pt-[56.25%] mb-4">
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    layout="fill"
                    objectfit="cover"
                    className="rounded-md absolute top-0 left-0"
                  />
                </div>
                <p className="text-sm line-clamp-3">{article.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start space-y-2">
                <p className="text-sm text-gray-500">By {article.author}</p>
                <p className="text-xs text-gray-400">{new Date(article.publishedAt).toLocaleString()}</p>
                <Button size="sm" asChild className="w-full">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No articles found</p>
      )}
    </div>
  );
}

