import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';
import DataTable from 'react-data-table-component';
import { NumericFormat } from 'react-number-format';
import Modal from '@/Components/Modal';
import ModalDetailPesanan from '@/Components/Homepage/ModalDetailPesanan';
import moment from 'moment';

export default function Index(props) {
    console.log(props)
    const [filterText, setFilterText] = useState('');
    const [perPage, setPerPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredItems = props.pesanan.filter(
        item =>
            (item.kode && item.kode.toLowerCase().includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className=' flex justify-between min-w-full'>
                <Link replace href={route('seragam.create')}>
                    <button type="button" className=" flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <svg className="w-[14px] h-[14px] text-center mr-2 mt-0.5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 1v16M1 9h16" />
                        </svg>
                        <span className='flex'>Tambah </span>
                    </button>
                </Link>
                <input type='text' placeholder='Klik untuk mencari data' onChange={e => setFilterText(e.target.value)} value={filterText} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        );
    }, [filterText]);

    const columns = [
        { name: 'No', selector: (row, index) => index + 1, width: '7%' },
        { name: 'Kode Pesanan', selector: row => row.kode, sortable: true, width: '12%' },
        { name: 'Nama Siswa', selector: row => row.nama + " " + "(" + row.kelas + ")", sortable: true, width: '25%' },
        {
            name: 'Total Harga',
            selector: row => (
                <NumericFormat
                    value={row.total_harga}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                />
            ),
            sortable: true,
            width: '15%'
        },
        {
            name: 'Status', selector: row => {
                if (row.status == 0) {
                    return <span class=" bg-yellow-300 text-slate-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300" > Pending</span>
                } else {
                    return <span class=" bg-blue-600 text-white text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300" > Selesai</span>
                }
            }, sortable: true, width: '12%'
        },
        { name: 'Tanggal', selector: row => (moment(row.created_at).utc().format('MM/DD/YYYY')), sortable: true, width: '15%' },
        {
            name: 'Detail',
            cell: (row) => (
                <div className="flex justify-center">
                    <button onClick={() => handleInfoClick(row.id)} type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center m-1">
                        <svg className="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9h2v5m-2 0h4M9.408 5.5h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>
            ),
            width: '14%'
        },
    ];

    const handleInfoClick = (id) => {
        const selectedData = props.pesanan.find(item => item.id === id);

        if (selectedData) {
            setModalData(selectedData);
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <Head title={props.title} />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-16">
                <JudulHeader judul={props.title} subJudul="Seragam" />
                <Modal />
                <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        highlightOnHover
                        striped
                        dense
                        paginationPerPage={perPage}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        paginationTotalRows={props.pesanan.total}
                        onChangePerPage={(perPage) => setPerPage(perPage)}
                        paginationDefaultPage={currentPage}
                        onChangePage={setCurrentPage}
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeader
                        persistTableHead
                    />
                </div>
                {isModalOpen && (
                    <ModalDetailPesanan
                        modalData={modalData}
                        closeModal={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
