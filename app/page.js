"use client"
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [cc, setCC] = useState([]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  }

  useEffect(() => {
    axios
      .get(`https://date.nager.at/api/v3/publicholidays/2024/${cc}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [cc]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${query}`)
      .then((res) => setCC(res.data[0].altSpellings[0]))
      .catch((err) => console.error(err));
  }, [query]);
  // https://restcountries.com/v3.1/name/{name}?fullText=true

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-cyan-800 to-white">
      <h1 className="text-4xl font-bold mt-16">Public Holidays - Global Search</h1>
      <form onSubmit={handleSubmit} className="mt-10">
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={handleSearch}
          className="p-4 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="ml-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>

      <div className="mt-10 w-screen flex flex-col items-center">
        <h2 className="text-lg font-bold mb-2">Search Results</h2>
        {data.length > 0 ? (
          data.map((country, index) => (
            <div key={index} className="bg-gray-300 opacity-90 shadow-lg rounded-lg p-6 mb-6 w-1/3 ring-2 ring-gray-400">
              <h1 className="text-2xl font-bold mb-2"> {country.name}</h1>
              <p className="text-md mb-2">Local Name: {country.localName}</p>
              <p className="text-md mb-2">Date: {country.date}</p>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-600">No countries found</p>
        )}
      </div> 
    </main>
  );
}
