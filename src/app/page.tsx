import PokemonSearch from "@/components/PokemonSearch";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  let data = await fetch("https://pokeapi.co/api/v2/generation/");
  let generations = await data.json();

  type Generation = {
    name: String;
    url: String;
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PokemonSearch />
        <div className={styles.pokemonGrid}>
          {generations.results.map((gen: Generation, i: number) => {
            return (
              <li key={i}>
                <Link href={`/generation/${gen.name}`}>{gen.name}</Link>
              </li>
            );
          })}
        </div>
      </main>
    </div>
  );
}
