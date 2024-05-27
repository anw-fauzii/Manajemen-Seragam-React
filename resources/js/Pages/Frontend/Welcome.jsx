import { Link, Head, useForm, router } from '@inertiajs/react';
import Bottom from '@/Layouts/Frontend/Bottom';
import Navbar from '@/Layouts/Frontend/Navbar';
import Judul from '@/Components/Judul';
import React from 'react';
import { Carousel } from 'flowbite-react';
import { NumericFormat } from 'react-number-format';
import { useState } from 'react';

export default function Welcome(props) {
    const query = props.query || '';
    const [searchQuery, setSearchQuery] = useState(query);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/data-seragam/cari', { q: searchQuery });
    };

    return (
        <div className='top-0 left-0 min-h-screen bg-gray-100 bg-cover'>
            <Head title="Welcome" />
            <Navbar />

            <div className='hidden lg:flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 mt-16 p-4 mb-16'>
                <Judul gambar="/storage/PG.jpg" kategori="1" />
                <Judul gambar="/storage/TK.jpg" kategori="2" />
                <Judul gambar="/storage/SD.jpg" kategori="3" />
            </div>
            <div className="h-64 sm:h-64 xl:h-80 2xl:h-96 mt-16 p-4 block lg:hidden bg-gray-100 bg-cover">
                <form onSubmit={handleSearch} className="max-w-md mx-auto mb-4">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Cari</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Cari seragam ..." required />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cari</button>
                    </div>
                </form>

                <Carousel className='h-full mb-4'>
                    <img src="/storage/PG.jpg" className='w-full h-full object-cover' alt="PG" />
                    <img src="/storage/TK.jpg" className='w-full h-full object-cover' alt="TK" />
                    <img src="/storage/SD.jpg" className='w-full h-full object-cover' alt="SD" />
                </Carousel>

                <p className='mb-4'><strong>Kategori</strong></p>
                <div className='grid grid-cols-3 gap-3 mb-4'>
                    <Link href={route('data-seragam', 1)} >
                        <img src="/storage/kategori/PG.png" className=' rounded-2xl w-full h-full object-cover' alt="PG" />
                    </Link>
                    <Link href={route('data-seragam', 2)} >
                        <img src="/storage/kategori/TK.png" className=' rounded-2xl w-full h-full object-cover' alt="TK" />
                    </Link>
                    <Link href={route('data-seragam', 3)} >
                        <img src="/storage/kategori/SD.png" className=' rounded-2xl w-full h-full object-cover' alt="SD" />
                    </Link>
                </div>
                <p className='mb-4'><strong>Semua Produk</strong></p>
                <div className=' flex max-lg:grid max-lg:grid-cols-2 justify-center flex-col lg:flex-row lg:flex-wrap items-stretch gap-4 max-lg:gap-2 pb-20'>
                    {props.seragam.length > 0 ? props.seragam.map((data, i) => {
                        return (
                            <div key={i} className="max-lg:max-w-sm lg:w-1/6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                <a href="#">
                                    {data.foto ?
                                        <img className="p-5 max-lg:p-3 rounded-lg" src={"/storage/" + data.foto} alt="product image" />
                                        : <img className="p-10 rounded-lg" src="/storage/null.png" alt="product image" />
                                    }
                                </a>
                                <div className="px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                                    <a href="#">
                                        <h5 className="text-xl max-lg:text-sm font-semibold tracking-tight text-gray-900 dark:text-white">{data.nama_seragam}</h5>
                                    </a>
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-l max-lg:text-sm font-bold text-gray-900 dark:text-white"><NumericFormat value={data.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></span>
                                        {data.total_stok > 0 && data.seragam_detail.some(detail => detail.total_stok > 0) ?
                                            <div>
                                                <Link href={route('detail', data.id)}>
                                                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center m-1">
                                                        <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                            : <p className='text-xs'><em>Kosong</em></p>}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <p>Belum ada adata</p>}
                </div>
            </div>
            <Bottom keranjang={props.keranjang} />

        </div >
    );
}
