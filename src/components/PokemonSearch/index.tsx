"use client";

import { useState } from "react";
import Link from "next/link";

export default function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Pokémon not found");
      }

      const data = await response.json();
      setPokemonData(data);
    } catch (err: any) {
      setError(err.message);
      setPokemonData(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 ml-2">
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {pokemonData && (
        <Link href={`/pokemon/${pokemonData.id}`}>
          <h3 className="text-2xl">{pokemonData.name}</h3>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="mt-2"
          />
          <p>
            Type:{" "}
            {pokemonData.types.map((type: any) => type.type.name).join(", ")}
          </p>
        </Link>
      )}
    </div>
  );
}
