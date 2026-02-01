
import styles from "./pokemon.module.css";
import { getPokemonDetail } from "@/lib/pokemonApi";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ name: string }>;
}

export default async function PokemonDetail({ params }: PageProps) {
    const { name } = await params;
    const pokemon = await getPokemonDetail(name);

    if (!pokemon) {
        notFound();
    }

    const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>{pokemon.name}</h1>
                <div className={styles.imageContainer}>
                    {imageUrl && (
                        <Image
                            src={imageUrl}
                            alt={pokemon.name}
                            fill
                            className={styles.image}
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}
                </div>
                <Link href="/" className={styles.backLink}>
                    Back to List
                </Link>
            </div>
        </div>
    );
}
