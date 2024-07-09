import Bottom from '@/Layouts/Frontend/Bottom';
import Navbar from '@/Layouts/Frontend/Navbar';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Tentang(props) {
    return (
        <div className='min-h-screen bg-gray-100 bg-cover'>
            <Head title="Tentang" />
            <Navbar />
            <div className="flex flex-col items-center gap-4 mt-16 p-4">
                <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Tentang Aplikasi</h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 text-justify">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lorem dolor, vulputate nec orci blandit, commodo efficitur mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend commodo sem, id auctor ante blandit eget. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus quis accumsan tellus. Donec sit amet suscipit sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ac purus volutpat, vehicula ipsum eget, volutpat nibh. Nam at elementum risus. Pellentesque eros lectus, mollis vel mattis ac, ultrices non diam. Sed a accumsan leo, sit amet tristique magna. Nullam aliquet purus quis diam mollis faucibus iaculis nec odio. Sed ultrices sapien laoreet vehicula malesuada.
                </p>
                <video class="w-full" autoplay controls>
                    <source src="https://www.youtube.com/watch?v=f6juAO2Vgmo" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Tambahkan informasi lebih lanjut tentang aplikasi jika diperlukan */}
            </div>
            <Bottom keranjang={props.keranjang} />
        </div>
    );
}
