import Bottom from "@/Layouts/Frontend/Bottom";
import Navbar from "@/Layouts/Frontend/Navbar";
import { Head } from "@inertiajs/react";
import { useState } from "react";

const Keranjang = () => {
    const [quantity, setQuantity] = useState(1)

    const tambah = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const kurang = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Keranjang" />
            <Navbar />
            <div className="flex flex-col items-center gap-4 mt-16 p-4">
                <nav className="flex" aria-label="Breadcrumb">
                    {/* ...Your breadcrumb code here... */}
                </nav>
                <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Keranjang Anda</h2>
            </div>

            <div className=' flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 p-4 mb-16'>

                <div className="p-4 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                        <img src="https://dailyspin.id/wp-content/uploads/2021/02/Immortality.png" className="w-auto h-20 mr-4" alt="Apple Watch" />
                        <div className="lg:flex flex-grow items-center">
                            <div className="lg:flex-1 lg:w-20">
                                <p className="font-semibold text-gray-900 dark:text-white">Seragam Blazer SD Garut Islamic School Prima Insani</p>
                                <p className=" text-gray-900 dark:text-white mt-1">XL</p>
                            </div>
                            <div className="lg:flex-1 lg:w-20">
                                <p className=" text-gray-900 dark:text-white mt-1">Rp. 50,000</p>
                            </div>
                            <div className="flex lg:flex-1 lg:w-20">
                                <button onClick={kurang} disabled={quantity === 1} class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span class="sr-only">Quantity button</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                    </svg>
                                </button>
                                <div>
                                    <input type="number"
                                        value={quantity} min="1"
                                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                        id="first_product" class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1" required />
                                </div>
                                <button onClick={tambah} class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                    <span class="sr-only">Quantity button</span>
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </button>
                            </div>
                            <div className="lg:flex-1 lg:w-20">
                                <p className=" text-gray-900 dark:text-white mt-1 hidden lg:block">$599</p>
                            </div>
                            <div className="lg:flex-1 lg:w-20">
                                <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2 text-center">
                                    <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>

            <Bottom />
        </div>
    );
};

export default Keranjang;
