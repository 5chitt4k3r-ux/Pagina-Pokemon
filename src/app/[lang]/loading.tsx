// Componente de carga que se muestra automáticamente mientras se obtienen datos (Suspense)
export default function Loading() {
    return (
        <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-500"></div>
        </div>
    )
}
