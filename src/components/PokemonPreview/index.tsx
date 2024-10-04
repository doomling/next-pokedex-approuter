import Link from "next/link";
import styles from "./styles.module.css";

type Props = {
  name: string;
};

export default async function PokemonPreview({ name }: Props) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!res.ok) {
      throw new Error(`Error fetching Pokémon data for ${name}`);
    }

    const pokemonDetails = await res.json();

    type Pokemon = {
      name: string;
      id: string;
      sprite: string;
    };

    const pokemon: Pokemon = {
      name: pokemonDetails.name,
      id: pokemonDetails.id,
      sprite: pokemonDetails.sprites.front_default,
    };

    const { id, sprite } = pokemon;

    return (
      <div className={styles.pokemonContainer}>
        <Link href={`/pokemon/${id}`}>
          <h2>
            {name} id: {id}{" "}
          </h2>
          <img src={sprite} alt={`Sprite of ${name}`} />
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);

    return (
      <div>
        <p>Failed to load Pokémon data for "{name}".</p>
      </div>
    );
  }
}
