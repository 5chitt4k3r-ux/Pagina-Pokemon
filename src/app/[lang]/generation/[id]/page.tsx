import { getDictionary } from '@/i18n/get-dictionary'
import { getPokemonListByGeneration } from '@/lib/pokemonApi'
import PokemonCard from '@/components/PokemonCard'
import { notFound } from 'next/navigation'

// Página que cambia dinámicamente según el ID de la generación
export default async function Generation({ params }: { params: Promise<{ lang: string, id: string }> }) {
    const { lang, id } = await params
    // Obtenemos el diccionario según el idioma
    const dict = await getDictionary(lang as 'es' | 'en' | 'fr')
    const genId = parseInt(id)

    // Validación básica: solo aceptamos generaciones 1, 2 y 4 (La 3 debe dar 404 por requerimiento)
    if (isNaN(genId) || genId < 1 || genId === 3 || genId > 4) {
        notFound()
    }

    // Obtenemos la lista de pokemons de esa generación
    const pokemonList = await getPokemonListByGeneration(genId)

    return (
        <div className="w-full max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10 mt-5">
                {dict.generation.title.replace('%s', id)}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 justify-items-center">
                {pokemonList.map((pokemon) => (
                    <div key={pokemon.id} className="w-full max-w-[220px]">
                        <PokemonCard
                            id={pokemon.id!}
                            name={pokemon.name}
                            lang={lang}
                            compact={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
