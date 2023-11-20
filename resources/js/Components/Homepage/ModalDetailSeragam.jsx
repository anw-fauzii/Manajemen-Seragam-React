import React from 'react';

const ModalDetailSeragam = ({ modalData, closeModal }) => {
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
                                        {modalData.nama_seragam}
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
                                <div className="p-4 md:p-5 space-y-4 flex">
                                    {modalData.foto ?
                                        <img className="rounded-t-lg mr-2" width="30%" src={"/storage/" + modalData.foto} alt="product image" />
                                        : <img className="rounded-t-lg" width="35%" src="/storage/null.png" alt="product image" />
                                    }
                                    <div className="relative overflow-x-auto w-full">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-center">
                                                        Ukuran
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-center">
                                                        Stok
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {modalData.seragam_details.length > 0 ? modalData.seragam_details.map((data, i) => (
                                                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                                        <td key={i} className="px-6 py-4">
                                                            {data.ukuran}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {data.stok}
                                                        </td>
                                                    </tr>
                                                )) :
                                                    <tr className="bg-white dark:bg-gray-800">
                                                        <td colSpan={2} className="px-6 py-4 text-center">
                                                            Data Belum Tersedia
                                                        </td>
                                                    </tr>}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        I accept
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        type="button"
                                        className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                                    >
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalDetailSeragam;
