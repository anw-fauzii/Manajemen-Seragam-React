import { useForm } from '@inertiajs/react';
import React from 'react';
import toastr from 'toastr';
const ModalFrontend = ({ closeModal }) => {
    const { data, setData, post, errors } = useForm({
        nama: '',
        kelas: ''
    })
    const submit = (e) => {
        e.preventDefault()
        post('/pesanan', {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Seragam Berhasil Dipesan', 'Sukses!')
                setData({
                    nama: '',
                    kelas: ''
                })
                closeModal()
            },
            onError: () => {
                toastr.error('Silahkan Periksa Kembali Inputan Anda', 'Error!')
            }
        }, data)
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <div
                    id="static-modal"
                    data-modal-backdrop="static"
                    tabIndex="-1"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center md:inset-0 h-[calc(100%-1rem)] p-2 min-h-screen bg-gray-900 bg-opacity-50"
                >
                    <div className=" bottom-0 w-full max-w-2xl">
                        <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Konfirmasi Pemesanan
                                </h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <form onSubmit={submit}>
                                <div className="flex overflow-x-auto p-3">
                                    <label for="nama" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-8 mt-2">Nama</label>
                                    <input type="text" min="1" onChange={(e) => setData('nama', e.target.value)} id="nama" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.nama} />
                                    {errors.nama && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.nama}</p>}
                                </div>
                                <div className="flex overflow-x-auto p-3">
                                    <label for="kelas" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-9 mt-2">Kelas</label>
                                    <input type="text" min="1" onChange={(e) => setData('kelas', e.target.value)} id="kelas" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.kelas} />
                                    {errors.kelas && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.kelas}</p>}
                                </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Pesan
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        batal
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalFrontend;
