import { getDictionary } from '@/i18n/get-dictionary'

export default async function Contact({ params }: { params: Promise<{ lang: string }> }) {
    const lang = (await params).lang
    const dict = await getDictionary(lang as 'es' | 'en' | 'fr')

    return (
        <div className="max-w-2xl mx-auto p-8 text-center bg-white rounded-lg shadow-md mt-10">
            <h1 className="text-3xl font-bold mb-6">{dict.contact.title}</h1>
            <p className="text-xl text-gray-700">Esta web está generada en NEXT por el alumno Matias Garcia del IES Cura Valera.</p>
        </div>
    )
}
