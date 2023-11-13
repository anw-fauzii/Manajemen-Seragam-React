import { Head, router, useForm } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';
import toastr from 'toastr';

export default function Create(props) {
    console.log(props)
    const { data, setData, post, errors, processing } = useForm({
        nama_seragam: props.seragam.nama_seragam || '',
        harga: props.seragam.harga || '',
        kategori: props.seragam.kategori || '',
        foto: null
    })
    const submit = (e) => {
        e.preventDefault();
        post(`/edit-seragam/${props.seragam.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Data Berhasil diperbarui', 'Sukses!')
                setData({
                    nama_seragam: '',
                    kategori: {
                        selected: ''
                    },
                    harga: '',
                    foto: null
                })
            },
            onError: () => {
                toastr.error('Silahkan Periksa Kembali Inputan Anda', 'Error!')
            }
        }, data)
    }
    return (
        <div>
            <Head title={props.title} />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-16">
                <JudulHeader judul={props.title} />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label for="nama_seragam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Seragam</label>
                            <input type="text" onChange={(e) => setData('nama_seragam', e.target.value)} id="nama_seragam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.nama_seragam} />
                            {errors.nama_seragam && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nama_seragam}</p>}
                        </div>
                        <div className="mb-4">
                            <label for="kategori" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select your country</label>
                            <select id="kategori" value={data.kategori} onChange={(e) => setData('kategori', e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} selected disabled>-- Silahkan Pilih Kategori --</option>
                                <option value={"1"}>Play Group (PG)</option>
                                <option value={"2"}>Taman Kanak-Kanak (TK)</option>
                                <option value={"3"}>Sekolah Dasar (SD)</option>
                            </select>
                            {errors.kategori && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.kategori}</p>}
                        </div>
                        <div className="mb-4">
                            <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga</label>
                            <input type="number" onChange={(e) => setData('harga', e.target.value)} id="harga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.harga} />
                            {errors.harga && <p class="mt-2 text-sm text-red-600 dark:text-red-500">{errors.harga}</p>}
                        </div>
                        <div className='mb-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                            <input type="file" onChange={(e) => setData('foto', e.target.files[0])} class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    );
}