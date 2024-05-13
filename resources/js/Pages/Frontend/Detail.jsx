import Bottom from "@/Layouts/Frontend/Bottom";
import Navbar from "@/Layouts/Frontend/Navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function Detail(props) {
    const [quantity, setQuantity] = useState(1);

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleIncrement = () => {
        if (quantity < 99999) {
            setQuantity(prevQuantity => prevQuantity + 1);
        }
    };
    return (
        <div className=' min-h-screen bg-white bg-cover '>
            <Head title="Seragam" />
            <div className="">
                <Navbar />
            </div>
            <div className="mt-20 dark:bg-gray-900 p-2">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mb-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
                            {props.seragam.foto ?
                                <img className="p-5 max-lg:p-0 rounded-lg" src={"/storage/" + props.seragam.foto} alt="product image" />
                                : <img className="p-5 rounded-lg" src="/storage/null.png" alt="product image" />
                            }
                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-5">
                            <h1
                                className="text-2xl font-semibold text-gray-900 sm:text-3xl dark:text-white"
                            >
                                {props.seragam.nama_seragam}
                            </h1>
                            <div className="mt-2 sm:items-center sm:gap-4 sm:flex">
                                <p
                                    className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                >
                                    <NumericFormat value={props.seragam.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                </p>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                    </div>
                                    <p
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                    >
                                        (5.0)
                                    </p>
                                    <a
                                        href="#"
                                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                    >
                                        345 Reviews
                                    </a>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-5 mt-3">
                                <div>Ukuran</div>
                                <div class="grid grid-cols-5 gap-2 col-span-2">
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        S
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        M
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        L
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        S
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        M
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        L
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        S
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        M
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        L
                                    </button>
                                </div>
                                <div>Jenis</div>
                                <div class="grid grid-cols-2 gap-2 col-span-2">
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        Panjang
                                    </button>
                                    <button class="px-3 py-1 text-sm font-medium text-gray-900 bg-transparent border border-gray-500 rounded-lg transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                                        Pendek
                                    </button>
                                </div>
                                <div>Kuantitas</div>
                                <div className=" col-span-2">
                                    <form className="max-w-xs mx-auto">
                                        <div className="relative flex items-center max-w-[8rem]">
                                            <button type="button" onClick={handleDecrement} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                </svg>
                                            </button>
                                            <input type="text" id="quantity-input" min={1} value={quantity} className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                            <button type="button" onClick={handleIncrement} className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                                <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <a
                                    href="#"
                                    title=""
                                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    role="button"
                                >
                                    <svg
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                        />
                                    </svg>
                                    Tambah ke Keranjang
                                </a>
                                <a
                                    href="#"
                                    title=""
                                    className=" max-lg:mt-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    role="button"
                                >
                                    <svg
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                        />
                                    </svg>
                                    Tambah ke Keranjang
                                </a>
                            </div>

                            <hr className="my-2 md:my-4 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                Studio quality three mic array for crystal clear calls and voice
                                recordings. Six-speaker sound system for a remarkably robust and
                                high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                            </p>

                            <p className="text-gray-500 dark:text-gray-400">
                                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                                Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                                Magic Keyboard or Magic Keyboard with Touch ID.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Bottom keranjang={props.keranjang} />

        </div>
    )
}