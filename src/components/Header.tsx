'use client' // Indica que este componente se ejecuta en el cliente (navegador) para permitir interactividad
import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export default function Header({ dict, lang }: { dict: any, lang: string }) {
    // Estado para controlar si el menú desplegable está abierto o cerrado
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    {/* Enlace a la página de inicio respetando el idioma actual */}
                    <Link href={`/${lang}`}>PokéNext</Link>
                </div>
                <ul className={styles.menu}>
                    <li><Link href={`/${lang}`}>{dict.nav.home}</Link></li>
                    <li
                        className={styles.dropdownContainer}
                        // Eventos para mostrar/ocultar el menú al pasar el ratón
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className={styles.dropdownTrigger}>{dict.nav.generations}</span>
                        {/* Renderizado condicional del menú desplegable */}
                        {dropdownOpen && (
                            <ul className={styles.dropdown}>
                                <li><Link href={`/${lang}/generation/1`}>{dict.nav.gen1}</Link></li>
                                <li><Link href={`/${lang}/generation/2`}>{dict.nav.gen2}</Link></li>
                                <li>
                                    <span style={{ display: 'block', padding: '0.5rem 1rem', cursor: 'default' }}>{dict.nav.others} ▸</span>
                                    <ul className={styles.nestedDropdown}>
                                        <li><Link href={`/${lang}/generation/3`}>{dict.nav.gen3}</Link></li>
                                        <li><Link href={`/${lang}/generation/4`}>{dict.nav.gen4}</Link></li>
                                    </ul>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li><Link href={`/${lang}/contact`}>{dict.nav.contact}</Link></li>
                </ul>
                <LanguageSwitcher />
            </nav>
        </header>
    )
}
