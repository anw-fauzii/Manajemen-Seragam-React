import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import DataTable from 'react-data-table-component';
import Modal from '@/Components/Modal';
import ModalStok from '@/Components/Homepage/ModalStok';
import Dropdown from '@/Layouts/Frontend/Dropdown';
import { NumericFormat } from 'react-number-format';

export default function Index(props) {
    console.log(props.seragam.data)
    const [filterText, setFilterText] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalData, setModalData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filteredItems = props.seragam.data.filter(
        item =>
            (item.seragam_detail.ukuran && item.seragam_detail.ukuran.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.nama_seragam && item.nama_seragam.toLowerCase().includes(filterText.toLowerCase())),
    );

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className=' flex justify-between min-w-full'>
                <div className='flex'>
                    <Link replace href={route('seragam-detail.create')}>
                        <button type="button" className=" flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            <svg className="w-[14px] h-[14px] text-center mr-2 mt-0.5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 1v16M1 9h16" />
                            </svg>
                            <span className='flex'>Tambah </span>
                        </button>
                    </Link>
                    <Dropdown dataUrl="laporan-laba-rugi.show" />
                </div>
                <input type='text' placeholder='Klik untuk mencari data' onChange={e => setFilterText(e.target.value)} value={filterText} className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        );
    }, [filterText]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Ketika dihapus tidak dapat kembali',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/seragam-detail/${id}`);
                toastr.success('Data Berhasil Dihapus', 'Sukses!');
            }
        });
    };

    const columns = [
        { name: 'No', selector: (row, index) => index + 1 + (perPage * (currentPage - 1)), width: '8%' },
        {
            name: 'Kategori', selector: row => {
                let priceText = '';
                if (row.kategori == 1) {
                    priceText = 'Seragam PG';
                } else if (row.kategori == 2) {
                    priceText = 'Seragam TK';
                } else if (row.kategori == 3) {
                    priceText = 'Seragam SD';
                } else {
                    priceText = 'Belum Masuk Unit';
                }
                return <span>{priceText}</span>;
            },
            sortable: true,
            width: '12%'
        },
        { name: 'Nama Seragam', selector: row => row.nama_seragam, sortable: true, width: '15%' },
        { name: 'Stok', selector: row => row.seragam_detail.reduce((accumulator, currentValue) => accumulator + currentValue.stok, 0), sortable: true, width: '10%' },
        {
            name: 'HPP',
            selector: row => (
                <NumericFormat
                    value={row.harga_dasar * row.seragam_detail.reduce((accumulator, currentValue) => accumulator + currentValue.stok, 0)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                />
            ),
            sortable: true, width: '18%'
        },
        {
            name: 'Penjualan',
            selector: row => (
                <NumericFormat
                    value={row.harga * row.seragam_detail.reduce((accumulator, currentValue) => accumulator + currentValue.stok, 0)}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                />
            ),
            sortable: true, width: '18%'
        },
        {
            name: 'Laba Rugi',
            selector: row => (
                <NumericFormat
                    value={(row.harga * row.seragam_detail.reduce((accumulator, currentValue) => accumulator + currentValue.stok, 0)) -
                        (row.harga_dasar * row.seragam_detail.reduce((accumulator, currentValue) => accumulator + currentValue.stok, 0))}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                />
            ),
            sortable: true, width: '18%'
        },
    ];

    return (
        <div>
            <Head title={props.title} />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-16">
                <JudulHeader judul={props.title} subJudul="Laporan Laba Rugi" />
                <Modal />
                <div className="grid lg:grid-cols-3 gap-3">
                    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-red-800 mb-2">Hasil Pokok Penjualan</h2>
                            <p className="text-xl font-bold text-red-700">
                                <NumericFormat
                                    value={props.total_hpp}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                />
                            </p>
                            <p className="text-sm text-red-600">Bulan ini</p>
                        </div>
                        <svg class="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5" />
                        </svg>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-red-800 mb-2">Penjualan</h2>
                            <p className="text-xl font-bold text-red-700">
                                <NumericFormat
                                    value={props.total_penjualan}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                />
                            </p>
                            <p className="text-sm text-red-600">Bulan ini</p>
                        </div>
                        <svg class="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667" />
                        </svg>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-red-800 mb-2">Laba - Rugi</h2>
                            <p className="text-xl font-bold text-red-700">
                                <NumericFormat
                                    value={props.total_penjualan - props.total_hpp}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'Rp. '}
                                />
                            </p>
                            <p className="text-sm text-red-600">Bulan ini</p>
                        </div>

                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fill-rule="evenodd" d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z" clip-rule="evenodd" />
                            <path fill-rule="evenodd" d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="mt-3 w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <DataTable
                        columns={columns}
                        data={filteredItems}
                        pagination
                        highlightOnHover
                        striped
                        dense
                        paginationPerPage={perPage}
                        paginationRowsPerPageOptions={[10, 25, 50, 100]}
                        paginationTotalRows={props.seragam.total}
                        onChangePerPage={(perPage) => setPerPage(perPage)}
                        paginationDefaultPage={currentPage}
                        onChangePage={setCurrentPage}
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeader
                        persistTableHead
                    />
                </div>
                {isModalOpen && (
                    <ModalStok
                        modalData={modalData} supplierData={props.supplier}
                        closeModal={() => setIsModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
