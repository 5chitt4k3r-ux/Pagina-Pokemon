import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <h2 className={styles.subtitle}>¡Pokémon no encontrado!</h2>
            <p className={styles.text}>Parece que te has perdido en la hierba alta.</p>
            <Link href="/" className={styles.button}>
                Volver al Centro Pokémon (Inicio)
            </Link>
        </div>
    )
}
