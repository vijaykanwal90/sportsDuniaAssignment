'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { useApiDataContext,DataItem} from "@/app/Context/Store"; // Import Article type

import { SignInButton, SignedIn, SignedOut, UserButton, useAuth } from '@clerk/nextjs'
// import { useApiDataContext } from '@/app/Context/Store'
import ThemeToggler from './ThemeToggler'


export function Navbar() {
  const { originalData } = useApiDataContext();
  const [searchText, setSearchText] = useState('')
  const [searchedData, setSearchedData] = useState<DataItem[]>([]); 
  const { isSignedIn } = useAuth();
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const filteredArticles = originalData.filter((article: DataItem) => {
        // Check if the article is of type Article and then filter based on title and author
        if ('title' in article && 'author' in article) {
          const title = article.title?.toLowerCase() || '';  // Default to empty string if title is undefined
          const author = article.author?.toLowerCase() || '';  // Default to empty string if author is undefined
  
          return title.includes(searchText.toLowerCase()) || author.includes(searchText.toLowerCase());
        }
  
        return false; // In case it's not an Article, return false
      });
  
      setSearchedData(filteredArticles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSearchedData([]);
    }
  };

  return (
    <nav className="bg-white shadow dark:bg-gray-800">
  <div className="container mx-auto px-6 py-3">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-gray-800 dark:text-white text-xl font-bold md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">
          InfoBreeze
        </Link>
      </div>
      
      {/* Dashboard link (conditionally displayed) */}
      {isClient && isSignedIn && (
        <div className='ml-4'>
          <Link href="/dashboard" className="text-gray-800 dark:text-white text-xl font-bold md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">
            Dashboard
          </Link>
        </div>
      )}
      
      {/* Search Bar */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="w-5 h-5 text-gray-400" />
          </span>
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchText}
            onChange={handleChange}
            onKeyDown={handleSearch}
            className="w-full sm:w-auto py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>
        
        {/* Theme Toggle */}
        {isClient && (
          <div>
            <ThemeToggler />
          </div>
        )}

        {/* Sign In/Sign Out Logic */}
        {isClient && (
          <header>
      {/* @ts-expect-error Async Server Component */}

            <SignedOut>
              <SignInButton />
            </SignedOut>
      {/* @ts-expect-error Async Server Component */}

            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
        )}
      </div>
    </div>
  </div>

  {/* Optional: Display search results below navbar */}
  {searchedData.length > 0 && (
    <div className="bg-white shadow-md p-4 mt-4">
      <h2 className="font-semibold text-lg">Search Results</h2>
      <ul className="mt-2">
        {searchedData.map((article, index) => (
          <li key={index} className="mb-2">
            <Link href={article.url || "#"} className="text-blue-500 hover:underline">
              <span className="text-gray-600">{article.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )}
</nav>

  );
}