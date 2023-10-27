import { Link, Head } from '@inertiajs/react';
import Bottom from '@/Components/Bottom';
import Navbar from '@/Components/Navbar';
import Judul from '@/Components/Judul';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="">
                <Navbar />
            </div>
            <div className=' flex justify-center flex-col lg:flex-row items-center gap-4 mt-16 p-4 mb-16'>
                <Judul gambar="/storage/PG.jpg" />
                <Judul gambar="/storage/TK.jpg" />
                <Judul gambar="/storage/SD.jpg" />
            </div>
            <Bottom />
        </>
    );
}
