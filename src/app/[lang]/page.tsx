import { getDictionary } from '@/i18n/get-dictionary'
import { getRandomPokemon } from '@/lib/pokemonApi'
import PokemonCard from '@/components/PokemonCard'
import styles from './page.module.css'

export const dynamic = 'force-dynamic' // Mantiene la página dinámica para que el Pokemon aleatorio cambie siempre

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
    const lang = (await params).lang
    const dict = await getDictionary(lang as 'es' | 'en' | 'fr')
    const randomPokemon = await getRandomPokemon()

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{dict.home.welcome}</h1>
            <p className={styles.subtitle}>{dict.home.randomPokemon}</p>

            {randomPokemon && (
                <div className={styles.featured}>
                    <PokemonCard
                        id={randomPokemon.id}
                        name={randomPokemon.name}
                        lang={lang}
                    />
                </div>
            )}
        </div>
    )
}
