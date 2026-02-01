import Image from 'next/image'
import { getDictionary } from '@/i18n/get-dictionary'
import { getPokemonDetail } from '@/lib/pokemonApi'
import { notFound } from 'next/navigation'

export default async function PokemonDetailView({
    id,
    lang
}: {
    id: string,
    lang: 'es' | 'en' | 'fr'
}) {
    const dict = await getDictionary(lang)
    const pokemon = await getPokemonDetail(id)

    if (!pokemon) {
        return notFound()
    }

    const imageUrl = pokemon.sprites.other?.['official-artwork'].front_default || pokemon.sprites.front_default

    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-lg p-6 max-w-sm mx-auto">
            <div className="flex justify-center bg-gray-100 rounded-full p-6 mb-6">
                <Image
                    src={imageUrl}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="object-contain"
                />
            </div>

            <div className="text-center">
                <span className="text-gray-500 font-medium">#{String(pokemon.id).padStart(3, '0')}</span>
                <h1 className="text-3xl font-bold capitalize mb-4 text-gray-800">{pokemon.name}</h1>

                <div className="space-y-4 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold border-b-2 border-gray-300 pb-2 mb-2" style={{ color: 'black' }}>{dict.pokemon.stats}</h3>

                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold" style={{ color: 'black' }}>{dict.pokemon.hp}:</span>
                        <span className="font-bold" style={{ color: 'black' }}>{pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold" style={{ color: 'black' }}>{dict.pokemon.attack}:</span>
                        <span className="font-bold" style={{ color: 'black' }}>{pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                        <span className="font-bold" style={{ color: 'black' }}>{dict.pokemon.defense}:</span>
                        <span className="font-bold" style={{ color: 'black' }}>{pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
