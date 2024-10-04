import styles from "./page.module.css";

type PageParams = {
  params: { id: string };
};

export default async function PokemonById({ params }: PageParams) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`, {
      next: { revalidate: 60 }, // Revalida cada 60 segundos
    });

    if (!res.ok) {
      throw new Error(`Error fetching Pokémon data for ${params.id}`);
    }

    const pokemonDetails = await res.json();

    type Pokemon = {
      name: string;
      id: string;
      sprite: string;
    };

    const { name, weight, height, sprites, moves } = pokemonDetails;

    // Extraer los sprites front y back
    const spriteFront = sprites.front_default;
    const spriteBack = sprites.back_default;

    // Extraer los tres primeros movimientos
    const firstThreeMoves = moves
      .slice(0, 3)
      .map((moveData: any) => moveData.move.name);

    // Crear el objeto final
    const pokemon = {
      name,
      weight,
      height,
      sprites: {
        front: spriteFront,
        back: spriteBack,
      },
      moves: firstThreeMoves,
    };

    console.log(moves);

    return (
      <div className={styles.pokemonContainer}>
        <h1>{name}</h1>
        <div>
          <img src={spriteFront} />
          <img src={spriteBack} />
        </div>
        <text>
          Peso: {weight}, Altura: {height}
        </text>
        <div>
          <p>Movimientos principales:</p>
          {firstThreeMoves.map((move: string, i: number) => {
            return <li key={i}>{move}</li>;
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);

    return (
      <div>
        <p>Failed to load.</p>
      </div>
    );
  }
}
