
export interface Pokemon {
  name: string;
  url: string;
  id?: number; // Helper for easier access
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: PokemonStat[];
}

const BASE_URL = 'https://pokeapi.co/api/v2';

// Función para obtener una lista de Pokemons con paginación
export async function getPokemonList(limit: number = 151, offset: number = 0): Promise<Pokemon[]> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon list: ${response.statusText}`);
    }
    const data: PokemonListResponse = await response.json();
    // Mapeamos los resultados para añadir el ID extraído de la URL
    return data.results.map(p => ({
      ...p,
      id: parseInt(p.url.split('/').filter(Boolean).pop() || '0')
    }));
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
    return [];
  }
}

export async function getPokemonDetail(nameOrId: string | number): Promise<PokemonDetail | null> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon detail for ${nameOrId}: ${response.statusText}`);
    }
    const data: PokemonDetail = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching pokemon detail for ${nameOrId}:`, error);
    return null;
  }
}

const GENERATION_RANGES: Record<number, { limit: number; offset: number }> = {
  1: { limit: 151, offset: 0 },
  2: { limit: 100, offset: 151 },
  3: { limit: 135, offset: 251 },
  4: { limit: 107, offset: 386 },
};

export async function getPokemonListByGeneration(genId: number): Promise<Pokemon[]> {
  const range = GENERATION_RANGES[genId];
  if (!range) return [];

  // We fetch ALL pokemon of the generation to then pick 10 random ones on the server side
  // This is efficient enough for these small numbers.
  const allGenPokemon = await getPokemonList(range.limit, range.offset);

  // Shuffle and pick 10
  const shuffled = allGenPokemon.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
}

export async function getRandomPokemon(): Promise<PokemonDetail | null> {
  // Random ID between 1 and 386 (Gen 1-3 coverage roughly, or just general)
  const randomId = Math.floor(Math.random() * 386) + 1;
  return getPokemonDetail(randomId);
}
