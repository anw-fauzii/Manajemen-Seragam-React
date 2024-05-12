import { Link } from "@inertiajs/react"
export default function Forbidden() {
    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center">
            <div className="container mx-auto px-4">
                <div className="max-w-screen-md mx-auto text-center">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-primary-600 dark:text-primary-500">403</h1>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">Oops! Something's missing.</p>
                    <p className="text-lg md:text-xl font-light text-gray-500 dark:text-gray-400 mb-8">Sorry, we couldn't find the page you're looking for.</p>
                    <Link replace href={route('welcome')}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Dashboard  </button>
                    </Link>
                </div>
            </div>
        </section>
    )
}