import { Head } from '@inertiajs/react';
import Sidebar from '@/Layouts/Admin/Sidebar';

export default function Dashboard({ auth }, props) {
    return (
        <div>
            <Head title="Dashboard" />
            <Sidebar />
            <div className="p-4 sm:ml-64 mt-14">

            </div>
        </div>
    );
}
