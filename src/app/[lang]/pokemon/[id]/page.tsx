import PokemonDetailView from '@/components/PokemonDetailView'

export default async function Page({ params }: { params: Promise<{ lang: string, id: string }> }) {
    const { lang, id } = await params

    return (
        <div className="container mx-auto py-10">
            <PokemonDetailView id={id} lang={lang as 'es' | 'en' | 'fr'} />
        </div>
    )
}
