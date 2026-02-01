'use client'
import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'
import styles from './Header.module.css'

export default function Header({ dict, lang }: { dict: any, lang: string }) {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link href={`/${lang}`}>PokéNext</Link>
                </div>
                <ul className={styles.menu}>
                    <li><Link href={`/${lang}`}>{dict.nav.home}</Link></li>
                    <li
                        className={styles.dropdownContainer}
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                    >
                        <span className={styles.dropdownTrigger}>{dict.nav.generations}</span>
                        {dropdownOpen && (
                            <ul className={styles.dropdown}>
                                <li><Link href={`/${lang}/generation/1`}>{dict.nav.gen1}</Link></li>
                                <li><Link href={`/${lang}/generation/2`}>{dict.nav.gen2}</Link></li>
                                <li><Link href={`/${lang}/generation/3`}>{dict.nav.gen3}</Link></li>
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
