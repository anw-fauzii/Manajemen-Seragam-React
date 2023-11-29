import { Link, Head } from '@inertiajs/react';
import Bottom from '@/Layouts/Frontend/Bottom';
import Navbar from '@/Layouts/Frontend/Navbar';
import Judul from '@/Components/Judul';
import React from 'react';

export default function Welcome(props) {
    return (
        <div className=' top-0 left-0 min-h-screen bg-gray-100 bg-cover '>
            <Head title="Welcome" />
            <div className="">
                <Navbar />
            </div>
            <div className=' flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-4 mt-16 p-4 mb-16'>
                <Judul gambar="/storage/PG.jpg" kategori="1" />
                <Judul gambar="/storage/TK.jpg" kategori="2" />
                <Judul gambar="/storage/SD.jpg" kategori="3" />
            </div>
            <Bottom keranjang={props.keranjang} />
        </div>
    );
}
