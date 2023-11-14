import React, { useEffect, useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import { NumericFormat } from 'react-number-format';
import JudulHeader from '@/Components/JudulHeader';
import Swal from 'sweetalert2';
import toastr from 'toastr';
import DataTable from 'react-data-table-component';

export default function Index(props) {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = props.seragam.data.filter(
        item => item.nama_seragam && item.nama_seragam.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <input type='text' onChange={e => setFilterText(e.target.value)} onClear={handleClear} value={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const [perPage, setPerPage] = useState(10);

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
        { name: 'Nama Seragam', selector: 'nama_seragam', sortable: true },
        { name: 'Harga', selector: 'harga', sortable: true },
        { name: 'Category', selector: 'category', sortable: true },
        { name: 'Price', selector: 'price', sortable: true },
        {
            name: 'Edit | Hapus',
            cell: (row) => (
                <div className="flex justify-center">
                    <Link href={route('seragam.edit', row.id)}>
                        <button type="button" className="...">
                            {/* ... Tombol Edit */}
                            Edit
                        </button>
                    </Link>
                    <button
                        type="button"
                        className="..."
                        onClick={() => handleDelete(row.id)}
                    >
                        {/* ... Tombol Hapus */}
                        Hapus
                    </button>
                </div>
            ),
        },
    ];

    const data = props.seragam.data.map((data, i) => ({
        ...data,
        category: 'Laptop', // Ganti dengan data sesuai kebutuhan
        price: '$2999', // Ganti dengan data sesuai kebutuhan
    }));

    return (
        <div>
            <Head title={props.title} />
            <Sidebar />

            <div className="p-4 sm:ml-64 mt-14">
                <JudulHeader judul={props.title} />
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
                    subHeaderComponent={subHeaderComponentMemo}
                    subHeader
                    persistTableHead
                />
            </div>
        </div>
    );
}
