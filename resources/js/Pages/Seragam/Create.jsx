import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import SubJudulHeader from '@/Components/SubJudulHeader';
import toastr from 'toastr';

export default function Create(props) {
    const { data, setData, post, errors, processing } = useForm({
        nama_seragam: '',
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
                    foto: ''
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
                <SubJudulHeader judul={props.title} subJudul="Seragam" linkSubJudul="/seragam" subSubJudul="Create" />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label for="nama_seragam" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Seragam</label>
                            <input type="text" onChange={(e) => setData('nama_seragam', e.target.value)} id="nama_seragam" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.nama_seragam} />
                            {errors.nama_seragam && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nama_seragam}</p>}
                        </div>
                        <div className="mb-4">
                            <label for="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Unit Seragam</label>
                            <select id="kategori" onChange={(e) => setData('kategori', e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={""} selected disabled>-- Silahkan Pilih Kategori --</option>
                                <option value={"1"}>Play Group (PG)</option>
                                <option value={"2"}>Taman Kanak-Kanak (TK)</option>
                                <option value={"3"}>Sekolah Dasar (SD)</option>
                            </select>
                            {errors.kategori && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.kategori}</p>}
                        </div>
                        <div className='mb-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="user_avatar">Upload file</label>
                            <input type="file" onChange={(e) => setData('foto', e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="user_avatar_help" id="user_avatar" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    );
}