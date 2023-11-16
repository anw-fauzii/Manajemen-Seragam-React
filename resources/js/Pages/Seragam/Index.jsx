import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import DataTable from 'react-data-table-component';
import { NumericFormat } from 'react-number-format';

export default function Index(props) {
    const [filterText, setFilterText] = useState('');
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredItems = props.seragam.data.filter(
        item => item.nama_seragam && item.nama_seragam.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className=' flex justify-between min-w-full'>
                <Link href={route('seragam.create')}>
                    <button type="button" className=" flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <svg class="w-[14px] h-[14px] text-center mr-2 mt-0.5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M9 1v16M1 9h16" />
                        </svg>
                        <span className='flex'>Tambah </span>
                    </button>
                </Link>
                <input type='text' onChange={e => setFilterText(e.target.value)} value={filterText} class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                router.delete(`/seragam/${id}`);
                toastr.success('Data Berhasil Dihapus', 'Sukses!');
            }
        });
    };

    const columns = [
        { name: 'No', selector: (row, index) => index + 1 + (perPage * (currentPage - 1)), },
        { name: 'Nama Seragam', selector: 'nama_seragam', sortable: true },
        {
            name: 'Harga',
            selector: 'harga',
            sortable: true,
            cell: row => (
                <NumericFormat
                    value={row.harga}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                />
            ),
        },
        {
            name: 'Kategori', selector: 'kategori', cell: (row) => {
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
            }, sortable: true
        },
        {
            name: 'Edit | Hapus',
            cell: (row) => (
                <div className="flex justify-center">
                    <Link href={route('seragam.edit', row.id)}>
                        <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2">
                            <svg class="w-4 h-4 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                                <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                            </svg>
                        </button>
                    </Link>
                    <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 text-center me-2">
                        <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                        </svg>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <Head title={props.title} />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-14">
                <JudulHeader judul={props.title} />
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
                        paginationTotalRows={props.seragam.total}
                        onChangePerPage={(perPage) => setPerPage(perPage)}
                        paginationDefaultPage={currentPage}
                        onChangePage={setCurrentPage}
                        subHeaderComponent={subHeaderComponentMemo}
                        subHeader
                        persistTableHead
                    />
                </div>
            </div>
        </div>
    );
}
