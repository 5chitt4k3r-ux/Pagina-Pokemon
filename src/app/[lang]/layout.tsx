import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { getDictionary } from '@/i18n/get-dictionary'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Next.js Pokemon App',
    description: 'A multilingual Pokemon application',
}

export async function generateStaticParams() {
    return [{ lang: 'es' }, { lang: 'en' }, { lang: 'fr' }]
}

export default async function RootLayout({
    children,
    modal,
    params
}: {
    children: React.ReactNode
    modal: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const lang = (await params).lang
    const dict = await getDictionary(lang as 'es' | 'en' | 'fr')

    return (
        <html lang={lang}>
            <body className={`${inter.className} min-h-screen flex flex-col`}>
                <Header dict={dict} lang={lang} />
                <main className="flex-grow w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
                    {children}
                    {modal}
                </main>
                <Footer />
            </body>
        </html>
    )
}
