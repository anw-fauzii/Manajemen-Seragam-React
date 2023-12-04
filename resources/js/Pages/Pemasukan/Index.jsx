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
    const [filterText, setFilterText] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredItems = props.pemasukan.data.filter(
        item =>
            (item.seragam_detail.ukuran && item.seragam_detail.ukuran.toLowerCase().includes(filterText.toLowerCase()))
    );

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className=' flex justify-between min-w-full'>
                <input type='text' placeholder='Klik untuk mencari data' onChange={e => setFilterText(e.target.value)} value={filterText} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        );
    }, [filterText]);

    const columns = [
        { name: 'No', selector: (row, index) => index + 1 + (perPage * (currentPage - 1)), width: '8%' },
        { name: 'Tanggal', selector: row => (moment(row.created_at).utc().format('MM/DD/YYYY')), sortable: true, width: '20%' },
        { name: 'Nama Seragam', selector: row => row.seragam_detail.seragam.nama_seragam, sortable: true, width: '30%' },
        { name: 'Jumlah', selector: row => row.stok, sortable: true, width: '20%' },
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
            width: '15%'
        },
    ];

    const handleInfoClick = (id) => {
        const selectedData = props.pemasukan.data.find(item => item.id === id);

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
                        paginationTotalRows={props.pemasukan.total}
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
