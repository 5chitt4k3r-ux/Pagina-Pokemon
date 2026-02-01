'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const router = useRouter()

    const redirectedPathName = (locale: string) => {
        if (!pathname) return '/'
        const segments = pathname.split('/')
        segments[1] = locale
        return segments.join('/')
    }

    return (
        <div className="flex gap-10 items-center ml-8">
            <Link href={redirectedPathName('es')} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 font-bold text-black shadow-sm transition-colors border border-gray-300">ES</Link>
            <Link href={redirectedPathName('en')} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 font-bold text-black shadow-sm transition-colors border border-gray-300">EN</Link>
            <Link href={redirectedPathName('fr')} className="px-4 py-2 bg-white rounded-lg hover:bg-gray-100 font-bold text-black shadow-sm transition-colors border border-gray-300">FR</Link>
        </div>
    )
}
