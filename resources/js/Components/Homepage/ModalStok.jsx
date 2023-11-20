import { useForm } from '@inertiajs/react';
import React from 'react';
import toastr from 'toastr';
const ModalStok = ({ modalData, closeModal }) => {
    const { data, setData, post, errors } = useForm({
        stok: '',
        id: modalData.id,
        ukuran: modalData.ukuran
    })
    const submit = (e) => {
        e.preventDefault()
        post('/stok-seragam', {
            preserveScroll: true,
            onSuccess: () => {
                toastr.success('Data Berhasil diinput', 'Sukses!')
                setData({
                    stok: '',
                    id: modalData.id,
                    ukuran: modalData.ukuran
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
                {modalData && (
                    <div
                        id="static-modal"
                        data-modal-backdrop="static"
                        tabIndex="-1"
                        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center  md:inset-0 h-[calc(100%-1rem)] min-h-screen bg-gray-900 bg-opacity-50"
                    >
                        <div className="w-full max-w-2xl">
                            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {modalData.seragam.nama_seragam}
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
                                    <div className="flex overflow-x-auto  p-3">
                                        <input type="hidden" value={data.id} />
                                        <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-10 mt-2">Ukuran</label>
                                        <input type="text" readOnly id="harga" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.ukuran} />
                                    </div>
                                    <div className="flex overflow-x-auto p-3">
                                        <label for="harga" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mr-14 mt-2">Stok</label>
                                        <input type="number" onChange={(e) => setData('stok', e.target.value)} id="stok" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={data.stok} />
                                        {errors.harga && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.stok}</p>}
                                    </div>
                                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button
                                            type="submit"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Simpan
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
                )}
            </div>
        </div>
    );
};

export default ModalStok;
