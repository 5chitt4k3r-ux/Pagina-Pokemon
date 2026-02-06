import Image from 'next/image'
import Link from 'next/link'
import styles from './PokemonCard.module.css'

interface PokemonCardProps {
    id: number;
    name: string;
    lang: string;
    compact?: boolean;
}

export default function PokemonCard({ id, name, lang, compact = false }: PokemonCardProps) {
    
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

    return (
        <div className={styles.card}>
            <div className={`${styles.imageContainer} ${compact ? styles.compact : ''}`}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width={150}
                    height={150}
                    className={styles.image}
                    priority={false}
                />
            </div>
            <div className={styles.content}>
                <span className={styles.number}>#{String(id).padStart(3, '0')}</span>
                <h3 className={styles.name}>{name}</h3>
                <Link href={`/${lang}/pokemon/${id}`} className={styles.button}>
                    Ver Detalles
                </Link>
            </div>
        </div>
    )
}
