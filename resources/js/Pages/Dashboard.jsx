import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import ModalDetailPesanan from '@/Components/Homepage/ModalDetailPesanan';
import { useState, useEffect } from 'react';

export default function Dashboard(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [options, setOptions] = useState({});

    useEffect(() => {
        // Initialize an array to hold series data
        const series = [];

        // Loop through each year's data
        Object.keys(props.seriesData).forEach(year => {
            // Initialize an array to hold month data for the current year
            const data = [];

            // Loop through each month's data for the current year
            Object.values(props.seriesData[year]).forEach(month => {
                // Push the month's data to the array
                data.push({ name: month.name, y: month.data[0] });
            });

            // Push the year's data as a series
            series.push({ name: year, data });
        });

        // Set Highcharts options
        setOptions({
            chart: {
                type: 'column'
            },
            title: {
                text: 'Total Pemesanan'
            },
            xAxis: {
                type: 'category'
            },
            series
        });
    }, [props.seriesData]);

    const handleInfoClick = (id) => {
        const selectedData = props.pesanan.find(item => item.id === id);

        if (selectedData) {
            setModalData(selectedData);
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <Head title="Dashboard" />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-16">
                <JudulHeader judul="Dashboard" />
                <div className="grid lg:grid-cols-4 gap-3">
                    <div className="bg-red-100 border border-red-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-red-800 mb-2">Pemesanan</h2>
                            <p className="text-xl font-bold text-red-700">{props.jumlah_pesanan}</p>
                            <p className="text-sm text-red-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Supplier</h2>
                            <p className="text-xl font-bold text-green-700">{props.supplier}</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
                        </svg>

                    </div>
                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Semua Stok</h2>
                            <p className="text-xl font-bold text-green-700">{props.stok_seragam}</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M5.005 10.19a1 1 0 0 1 1 1v.233l5.998 3.464L18 11.423v-.232a1 1 0 1 1 2 0V12a1 1 0 0 1-.5.866l-6.997 4.042a1 1 0 0 1-1 0l-6.998-4.042a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1ZM5 15.15a1 1 0 0 1 1 1v.232l5.997 3.464 5.998-3.464v-.232a1 1 0 1 1 2 0v.81a1 1 0 0 1-.5.865l-6.998 4.042a1 1 0 0 1-1 0L4.5 17.824a1 1 0 0 1-.5-.866v-.81a1 1 0 0 1 1-1Z" clip-rule="evenodd" />
                            <path d="M12.503 2.134a1 1 0 0 0-1 0L4.501 6.17A1 1 0 0 0 4.5 7.902l7.002 4.047a1 1 0 0 0 1 0l6.998-4.04a1 1 0 0 0 0-1.732l-6.997-4.042Z" />
                        </svg>

                    </div>
                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Users</h2>
                            <p className="text-xl font-bold text-green-700">{props.user}</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-3 mt-3">
                    <div className="w-full p-2 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className="relative overflow-x-auto">
                            <h4 class="text-2xl font-bold dark:text-white">Pesanan Terbaru</h4>
                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Kode Pesanan
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Nama
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Kelas
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.pesanan.length > 0 ? props.pesanan.map((data, i) => {
                                        return (
                                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {data.kode}
                                                </th>
                                                <td scope="col" className="px-6 py-3">
                                                    {data.nama}
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    {data.kelas}
                                                </td>
                                                <td scope="col" className="px-6 py-3">
                                                    <button onClick={() => handleInfoClick(data.id)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center m-1">
                                                        <svg className="w-3 h-3 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                        <tr>
                                            <td></td>
                                        </tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <HighchartsReact highcharts={Highcharts} options={options} />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalDetailPesanan
                    modalData={modalData}
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
