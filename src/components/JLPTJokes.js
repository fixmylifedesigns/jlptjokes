"use client";

import { useState } from "react";
import { SearchIcon, ArrowLeft, Star } from "lucide-react";
import Logo from "./logo.jpg";
import Image from "next/image";
import allJokes from './allJokes.json';

export default function JLPTJokes() {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [activeTab, setActiveTab] = useState("featured");

  const handleInputChange = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchInput(e.target.value);

    if (query) {
      const results = allJokes.puns.filter(
        (joke) =>
          joke.english.toLowerCase().includes(query) ||
          joke.punchline.toLowerCase().includes(query) ||
          joke.explanation.toLowerCase().includes(query)
      );
      setSearchResults(results);
    } else {
      setSearchResults(null);
    }
  };

  const clearSearch = () => {
    setSearchResults(null);
    setSearchInput("");
  };

  const now = new Date();
  const ninetyDaysAgo = new Date();
  ninetyDaysAgo.setDate(now.getDate() - 90);

  const displayJokes =
    searchResults !== null
      ? searchResults
      : activeTab === "featured"
      ? allJokes.puns.filter((joke) => joke.featured)
      : activeTab === "newest"
      ? allJokes.puns.filter(
          (joke) => new Date(joke.date) >= ninetyDaysAgo
        )
      : allJokes.puns; // For the "All" tab

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white flex flex-col">
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-4 flex flex-row items-center gap-4 animate-bounce justify-center">
            JLPT Jokes
            <div className="rounded-full border-2 border-black overflow-hidden w-24 h-24 relative">
              <Image
                src={Logo}
                alt="JLPT Jokes Logo"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </h1>
          <p className="text-2xl mb-8">Learn Japanese Through Laughter!</p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchInput}
              onChange={handleInputChange}
              placeholder="Search jokes in English or Japanese..."
              className="w-full px-4 py-3 rounded-full text-gray-900 shadow-lg focus:ring-4 focus:ring-red-300 focus:outline-none pr-12"
            />
            <SearchIcon className="absolute right-4 top-3 text-gray-400 w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex-grow">
        <div className="flex space-x-4 mb-8">
          {searchResults !== null ? (
            <button
              className="px-6 py-3 rounded-full font-bold bg-red-600 text-white shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
              onClick={clearSearch}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to All Jokes
            </button>
          ) : (
            <>
              <button
                className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 
                  ${
                    activeTab === "featured"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white bg-opacity-50 text-black"
                  }`}
                onClick={() => setActiveTab("featured")}
              >
                ⭐ Featured
              </button>
              <button
                className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105
                  ${
                    activeTab === "newest"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white bg-opacity-50 text-black"
                  }`}
                onClick={() => setActiveTab("newest")}
              >
                🆕 Newest
              </button>
              <button
                className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105
                  ${
                    activeTab === "all"
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-white bg-opacity-50 text-black"
                  }`}
                onClick={() => setActiveTab("all")}
              >
                📚 All
              </button>
            </>
          )}
        </div>

        <div className="grid gap-6">
          {displayJokes.map((joke, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            >
              {joke.featured && searchResults === null && (
                <Star className="w-6 h-6 text-yellow-500 mb-2" />
              )}
              <h3 className="text-xl mb-2 text-red-800">{joke.english}</h3>
              <p className="text-2xl font-bold mb-4 text-red-600">
                {joke.punchline}
              </p>
              <p className="text-gray-600 italic">{joke.explanation}</p>
            </div>
          ))}
          {displayJokes.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No jokes found matching your search 😢
            </div>
          )}
        </div>
      </div>

      <footer className="bg-gray-100 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-600">
                About JLPT Jokes
              </h3>
              <p className="text-gray-600">
                JLPT Jokes was created to make learning Japanese more enjoyable
                through wordplay and humor. Our collection of bilingual jokes
                helps students understand language nuances while having fun.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-600">
                Contact & Social
              </h3>
              <div className="flex flex-col space-y-2">
                <a
                  href="mailto:jlptjokes@gmail.com"
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  jlptjokes@gmail.com
                </a>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com/jlptjokesoffical"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://tiktok.com/@jlptjokes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm border-t border-gray-200 pt-8">
            © 2024 - 2025 JlptJokes. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
