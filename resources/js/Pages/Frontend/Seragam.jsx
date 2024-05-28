import { Head, Link } from '@inertiajs/react';
import Bottom from '@/Layouts/Frontend/Bottom';
import Navbar from '@/Layouts/Frontend/Navbar';
import React from 'react';
import { NumericFormat } from 'react-number-format';
import Pencarian from './Pencarian';

export default function Seragam(props) {
    return (
        <div className='min-h-screen bg-gray-100'>
            <Head title="Seragam" />
            <div className="">
                <Navbar />
            </div>
            <div className="mt-20 px-4">
                <Pencarian />
            </div>
            <div className="flex flex-col items-center gap-4 px-4">
                <h3 className="text-xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">{props.title}</h3>
            </div>
            <div className=' flex max-lg:grid max-lg:grid-cols-2 justify-center flex-col lg:flex-row lg:flex-wrap items-stretch gap-4 max-lg:gap-2 p-4 mb-16'>
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
                }) : <p className=' text-center col-span-2'>Belum ada data</p>}
            </div>
            <Bottom keranjang={props.keranjang} />
        </div >
    );
}
