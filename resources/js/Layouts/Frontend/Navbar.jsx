import { Link } from "@inertiajs/react"

const Navbar = () => {
    return (
        <nav className="border-gray-200 bg-blue-500 shadow-md shadow-blue-400 dark:bg-gray-800 dark:border-gray-700 fixed top-0 z-50 w-full h-16">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Prima Insani</span>
                </Link>
            </div>
        </nav>
    )
}
export default Navbar