import { Head, useForm } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import SubJudulHeader from '@/Components/SubJudulHeader';
import toastr from 'toastr';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function Create(props) {
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

    const handleSeragamChange = (selectedOption) => {
        setData('seragam_id', selectedOption.value);
    };

    const { data, setData, post, errors, processing } = useForm({
        seragam_id: props.HargaDasar.seragam_id || '',
        jenis_kain: props.HargaDasar.jenis_kain || '',
        ongkos: props.HargaDasar.ongkos || '',
        logo: props.HargaDasar.logo || '',
        keuntungan: props.HargaDasar.keuntungan || ''
    })

    const submit = (e) => {
        e.preventDefault()
        post(`/edit-perhitungan-harga-seragam/${props.HargaDasar.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Data Berhasil diinput', 'Sukses!')
                setData({
                    seragam_id: {
                        selected: ''
                    },
                    jenis_kain: '',
                    ongkos: '',
                    logo: '',
                    keuntungan: ''
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
                <SubJudulHeader judul={props.title} subJudul="Harga Seragam" linkSubJudul="/perhitungan-harga-seragam" subSubJudul="Create" />
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                    <form onSubmit={submit}>
                        <input type="hidden" value={data.seragam_id} />
                        <div className="mb-4">
                            <label htmlFor="jenis_kain" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Harga Kain</label>
                            <NumericFormat
                                id="jenis_kain"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.jenis_kain}
                                onValueChange={(values) => setData('jenis_kain', values.value)}
                                thousandSeparator={true}
                                prefix={''}
                            />
                            {errors.jenis_kain && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.jenis_kain}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ongkos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ongkos Jahit</label>
                            <NumericFormat
                                id="ongkos"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.ongkos}
                                onValueChange={(values) => setData('ongkos', values.value)}
                                thousandSeparator={true}
                                prefix={''}
                            />
                            {errors.ongkos && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.ongkos}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="logo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logo Sepaket</label>
                            <NumericFormat
                                id="logo"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={data.logo}
                                onValueChange={(values) => setData('logo', values.value)}
                                thousandSeparator={true}
                                prefix={''}
                            />
                            {errors.logo && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.logo}</p>}
                        </div>
                        <div className="mb-4">
                            <label for="keuntungan" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Keuntungan</label>
                            <div class="flex">
                                <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    %
                                </span>
                                <input type="number" maxLength="2" onChange={(e) => setData('keuntungan', e.target.value)} id="keuntungan" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.keuntungan} />
                            </div>
                            {errors.keuntungan && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.keuntungan}</p>}
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
        </div >
    );
}