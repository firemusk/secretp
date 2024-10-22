'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchPhrase)}`);
  };

  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">
        eujobs.co<br />Policy work in Brussels
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mt-4 max-w-md mx-auto">
        <input
          type="search"
          className="border border-gray-400 w-full py-2 px-3 rounded-md"
          placeholder="Search phrase.."
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
        <button type="submit" className="transition-colors bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
          Search
        </button>
      </form>
    </section>
  );
}
