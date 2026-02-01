import Modal from '@/components/Modal'
import PokemonDetailView from '@/components/PokemonDetailView'

export default async function Page({ params }: { params: Promise<{ lang: string, id: string }> }) {
    const { lang, id } = await params

    return (
        <Modal>
            <PokemonDetailView id={id} lang={lang as 'es' | 'en' | 'fr'} />
        </Modal>
    )
}
