import PokemonPreview from "@/components/PokemonPreview";
import Link from "next/link";
import styles from "./page.module.css";

type PageParams = {
  params: { name: string };
};

export default async function GenerationDetails({ params }: PageParams) {
  let data = await fetch(`https://pokeapi.co/api/v2/generation/${params.name}`);
  let genDetails = await data.json();
  const genPokemons = genDetails.pokemon_species;

  type pokemon = {
    name: string;
  };

  return (
    <div className={styles.pokemonGrid}>
      {genPokemons.map((pokemon: pokemon, i: number) => {
        return (
          <>
            <Link href={`/pokemon/${pokemon.name}`}>
              <PokemonPreview name={pokemon.name} />
            </Link>
          </>
        );
      })}
    </div>
  );
}
