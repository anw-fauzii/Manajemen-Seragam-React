import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';
import JudulHeader from '@/Components/JudulHeader';

export default function Dashboard(props) {
    return (
        <div>
            <Head title="Dashboard" />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-14">
                <JudulHeader judul="Dashboard" />
                <div className="grid lg:grid-cols-4 gap-3">
                    <div className="bg-red-100 border border-red-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-red-800 mb-2">Pemasanan</h2>
                            <p className="text-xl font-bold text-red-700">{props.pesanan}</p>
                            <p className="text-sm text-red-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-3 8a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Zm2 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-2-1a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                        </svg>
                    </div>

                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Pemasukan</h2>
                            <p className="text-xl font-bold text-green-700">$5,000</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg className="w-14 h-14 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z" />
                        </svg>

                    </div>
                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Pemasukan</h2>
                            <p className="text-xl font-bold text-green-700">$5,000</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v3.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 7.586V4a1 1 0 0 1 1-1zM4 8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H5v3a1 1 0 0 1-1 1zm0 4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h3a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1zm12-1a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3h-3a1 1 0 1 1 0-2h2v-3a1 1 0 0 1 1-1h3zM4 17a1 1 0 0 1-1 1H3a3 3 0 0 1-3-3v-2a1 1 0 0 1 2 0v1h2a1 1 0 0 1 1 1zm12 0a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0v2zm0-4a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3h-2a1 1 0 0 1 0-2h1v-3a1 1 0 0 1 1-1h3z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="bg-green-100 border border-green-200 p-6 rounded-lg flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-green-800 mb-2">Pemasukan</h2>
                            <p className="text-xl font-bold text-green-700">$5,000</p>
                            <p className="text-sm text-green-600">Bulan ini</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 0 1 1 1v3.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L9 7.586V4a1 1 0 0 1 1-1zM4 8a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3a1 1 0 0 1 0 2H5v3a1 1 0 0 1-1 1zm0 4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h3a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3v-3a1 1 0 0 1 1-1zm12-1a1 1 0 0 1 1 1v3a3 3 0 0 1-3 3h-3a1 1 0 1 1 0-2h2v-3a1 1 0 0 1 1-1h3zM4 17a1 1 0 0 1-1 1H3a3 3 0 0 1-3-3v-2a1 1 0 0 1 2 0v1h2a1 1 0 0 1 1 1zm12 0a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0v2zm0-4a1 1 0 0 1-1 1h-1v-1a1 1 0 1 1 2 0v2a3 3 0 0 1-3 3h-2a1 1 0 0 1 0-2h1v-3a1 1 0 0 1 1-1h3z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}
