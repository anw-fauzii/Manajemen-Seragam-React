import Bottom from "@/Layouts/Frontend/Bottom";
import Chekout from "@/Layouts/Frontend/Chekout";
import Navbar from "@/Layouts/Frontend/Navbar";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import toastr from "toastr";

const Checkout = (props) => {
    const { data, setData, post, errors, processing } = useForm({
        nama_seragam: '',
        harga: '',
        kategori: '',
        foto: ''
    })

    const submit = (e) => {
        e.preventDefault()
        post('/seragam', {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Data Berhasil diinput', 'Sukses!')
                setData({
                    nama_seragam: '',
                    kategori: {
                        selected: ''
                    },
                    harga: '',
                    foto: ''
                })
            },
            onError: () => {
                toastr.error('Silahkan Periksa Kembali Inputan Anda', 'Error!')
            }
        }, data)
    }
    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Keranjang" />
            <Navbar />
            <div className="flex flex-col items-center gap-4 mt-16 p-4">
                <nav className="flex" aria-label="Breadcrumb">
                    {/* ...Your breadcrumb code here... */}
                </nav>
                <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Konfirmasi Pemesanan</h2>
            </div>
            <div className="relative overflow-x-auto p-8">
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label for="nama_seragam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Seragam</label>
                        <input type="text" onChange={(e) => setData('nama_seragam', e.target.value)} id="nama_seragam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.nama_seragam} />
                        {errors.nama_seragam && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nama_seragam}</p>}
                    </div>
                    <div className="mb-4">
                        <label for="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                        <select id="kategori" onChange={(e) => setData('kategori', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value={""} selected disabled>-- Silahkan Pilih Kategori --</option>
                            <option value={"1"}>Play Group (PG)</option>
                            <option value={"2"}>Taman Kanak-Kanak (TK)</option>
                            <option value={"3"}>Sekolah Dasar (SD)</option>
                        </select>
                        {errors.kategori && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.kategori}</p>}
                    </div>
                    <div className="mb-4">
                        <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                        <input type="number" onChange={(e) => setData('harga', e.target.value)} id="harga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.harga} />
                        {errors.harga && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.harga}</p>}
                    </div>
                    <div className='mb-4'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                        <input type="file" onChange={(e) => setData('foto', e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
            <Bottom keranjang={props.keranjang} />
        </div >
    );
};

export default Checkout;
