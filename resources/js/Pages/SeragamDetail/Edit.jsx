import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import SubJudulHeader from '@/Components/SubJudulHeader';
import toastr from 'toastr';
import Select from 'react-select';
import { useEffect, useState } from 'react';

export default function Edit(props) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const seragamData = props.seragam || [];

        const newOptions = seragamData.map(item => {
            let label = '';

            if (item.kategori == 1) {
                label = 'Seragam PG';
            } else if (item.kategori == 2) {
                label = 'Seragam TK';
            } else if (item.kategori == 3) {
                label = 'Seragam SD';
            } else {
                label = 'Belum Masuk';
            }

            return {
                value: item.id,
                label: label + " - " + item.nama_seragam
            };
        });

        setOptions(newOptions);
    }, [props.seragam]);

    const { data, setData, post, errors, processing } = useForm({
        seragam_id: props.seragamDetail.seragam_id || null,
        ukuran: props.seragamDetail.ukuran || ''
    })
    const handleSeragamChange = (selectedOption) => {
        setData('seragam_id', selectedOption.value); // Menyimpan nilai seragam_id yang dipilih
    };
    const submit = (e) => {
        e.preventDefault()
        post(`/edit-seragam-detail/${props.seragamDetail.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Data Berhasil diperbarui', 'Sukses!')
                setData({
                    ukuran: '',
                    seragam_id: {
                        selected: ''
                    }
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
                <SubJudulHeader judul={props.title} subJudul="Ukuran Seragam" linkSubJudul="/seragam-detail" subSubJudul="Create" />
                <div className="relative  shadow-md sm:rounded-lg p-3">
                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label for="seragam_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pilih Seragam</label>
                            <Select
                                options={options}
                                value={options.find(option => option.value === data.seragam_id)} // Mengatur nilai terpilih berdasarkan data.seragam_id
                                onChange={handleSeragamChange} // Menggunakan fungsi handleSeragamChange untuk mengatur nilai seragam_id
                                className={{
                                    control: (state) =>
                                        state.isFocused ? 'border-red-600 bg-gray-50 w-full p-0.5 rounded-lg' : ' bg-gray-50 border-grey-300 p-0.5',
                                }}
                            />
                            {errors.seragam_id && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.seragam_id}</p>}
                        </div>
                        <div className="mb-4">
                            <label for="ukuran" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ukuran</label>
                            <input type="text" onChange={(e) => setData('ukuran', e.target.value)} id="ukuran" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.ukuran} />
                            {errors.ukuran && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.ukuran}</p>}
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    );
}