import ModalCheckout from "@/Components/Homepage/ModalCheckout"
import React from "react"
import { useState } from "react"
import { NumericFormat } from "react-number-format"

const Chekout = (jumlahSubTotal) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCheckoutClick = () => {
        setIsModalOpen(true);
    };
    return (
        <div className="fixed bottom-16 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-2 mx-auto font-medium">
                <button type="button" className=" text-gray-500 inline-flex flex-col  justify-center px-5 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 group border-x dark:border-gray-600">
                    Total
                    <NumericFormat value={jumlahSubTotal.jumlahSubTotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                </button>
                <button onClick={() => handleCheckoutClick()} className="inline-flex flex-col items-center justify-center px-5 border-gray-200 border-x hover:bg-gray-50 dark:hover:bg-gray-800 group dark:border-gray-600">
                    <svg className="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="m7.164 3.805-4.475.38L.327 6.546a1.114 1.114 0 0 0 .63 1.89l3.2.375 3.007-5.006ZM11.092 15.9l.472 3.14a1.114 1.114 0 0 0 1.89.63l2.36-2.362.38-4.475-5.102 3.067Zm8.617-14.283A1.613 1.613 0 0 0 18.383.291c-1.913-.33-5.811-.736-7.556 1.01-1.98 1.98-6.172 9.491-7.477 11.869a1.1 1.1 0 0 0 .193 1.316l.986.985.985.986a1.1 1.1 0 0 0 1.316.193c2.378-1.3 9.889-5.5 11.869-7.477 1.746-1.745 1.34-5.643 1.01-7.556Zm-3.873 6.268a2.63 2.63 0 1 1-3.72-3.72 2.63 2.63 0 0 1 3.72 3.72Z" />
                    </svg>
                    <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Chekout</span>
                </button>
            </div>
            {isModalOpen && (
                <ModalCheckout
                    closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div >
    )
}
export default Chekout