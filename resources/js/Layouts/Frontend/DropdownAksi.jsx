import { Link, usePage } from '@inertiajs/react';
import React, { useState, } from 'react';

function DropdownAksi(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(prevIsOpen => !prevIsOpen);
    };

    return (
        <div className="relative inline-block">
            <button onClick={toggleDropdown} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-9 py-2.5 mb-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Unit <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
            </svg>
            </button>

            <div id="dropdown" className={`absolute z-10 ${isOpen ? "" : "hidden"} bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <Link replace href={route(props.dataUrl, 1)} className="block text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">PG</Link>
                    </li>
                    <li>
                        <Link replace href={route(props.dataUrl, 2)} className="block text-left  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">TK</Link>
                    </li>
                    <li>
                        <Link replace href={route(props.dataUrl, 3)} className="block text-left  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">SD</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DropdownAksi;
