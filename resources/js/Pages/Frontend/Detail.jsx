import Bottom from "@/Layouts/Frontend/Bottom";
import Navbar from "@/Layouts/Frontend/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import toastr, { error } from "toastr";

export default function Detail(props) {
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedSizeStock, setSelectedSizeStock] = useState(0);
    const [selectedSize2, setSelectedSize2] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [chekout, setCheckout] = useState(false)

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', window.midtransClientKey);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleBeliSekarangClick = () => {
        setShowForm(true);
        setCheckout(true);
    };

    const { data, setData, post, errors } = useForm({
        jumlah: '',
        id: props.seragam.id,
        ukuran: '',
        catatan: '',
        nama: '',
        kelas: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        post('/keranjang', {
            preserveScroll: true,
            onSuccess: (response) => {
                toastr.success('Data berhasil dimasukan ke keranjang', 'Sukses!');
                setData({
                    jumlah: '',
                    id: props.seragam.id,
                    ukuran: '',
                    catatan: '',
                    nama: '',
                    kelas: '',
                });
                setIsSubmitting(false);
            },
            onError: (error) => {
                if (error) {
                    Object.values(error).forEach(error => {
                        toastr.warning(error, 'Error');
                    });
                } else {
                    toastr.error('Data gagal disimpan', 'Error')
                }

                setIsSubmitting(false); // Reset isSubmitting setelah error
            }
        }, data);
    };
    const handlePayment = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        post('/payment-sekarang', {
            preserveScroll: true,
            onSuccess: (response) => {
                window.snap.pay(response.props.flash.message, {
                    onSuccess: function (result) {
                        alert('Payment success!');
                        console.log(result);
                    },
                    onPending: function (result) {
                        alert('Waiting for your payment!');
                        console.log(result);
                    },
                    onError: function (result) {
                        alert('Payment failed!');
                        console.log(result);
                    },
                    onClose: function () {
                        alert('You closed the popup without finishing the payment');
                    },
                });
                toastr.success('Data Berhasil dipesan', 'Sukses!');
                setIsSubmitting(false);
            },
            onError: (error) => {
                if (error) {
                    Object.values(error).forEach(error => {
                        toastr.warning(error, 'Error');
                    });
                } else {
                    toastr.error('Data gagal disimpan', 'Error')
                }

                setIsSubmitting(false); // Reset isSubmitting setelah error
            }
        }, data);
    };

    const handleChange = (e) => {
        const newSize = Number(e.target.value);
        setSelectedSize(newSize);
        setData('ukuran', newSize);

        // Ambil informasi stok untuk ukuran yang dipilih
        const selectedSizeStock = props.seragam.seragam_detail.find(item => item.id === newSize)?.stok;

        // Jika stok cukup untuk ukuran baru, atur ulang kuantitas menjadi 0
        if (selectedSizeStock < quantity) {
            setQuantity(selectedSizeStock);
            setData('jumlah', selectedSizeStock);
        }
    };

    useEffect(() => {
        if (selectedSize) {
            const selectedSizeData = props.seragam.seragam_detail.find(detail => detail.id === selectedSize);
            setSelectedSizeStock(selectedSizeData.stok);
        }
    }, [selectedSize, props.seragam.seragam_detail]);

    const handleIncrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            if (isStockAvailable(selectedSize, newQuantity)) {
                setData('jumlah', newQuantity);
                return newQuantity;
            } else {
                // Tidak melakukan apa-apa jika stok tidak mencukupi
                return prevQuantity;
            }
        });
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 1;
            if (isStockAvailable(selectedSize, newQuantity)) {
                setData('jumlah', newQuantity);
                return newQuantity;
            } else {
                // Tidak melakukan apa-apa jika stok tidak mencukupi
                return prevQuantity;
            }
        });
    };
    const isStockAvailable = (size, quantity) => {
        // Ambil informasi stok untuk ukuran yang dipilih
        const selectedSizeStock = props.seragam.seragam_detail.find(item => item.id === size)?.stok;
        // Kembalikan apakah stok mencukupi untuk kuantitas yang diminta
        return selectedSizeStock >= quantity;
    };

    const handleChangeJumlah = (e) => {
        const value = Math.max(1, parseInt(e.target.value) || 1);
        setQuantity(value);
    };


    return (
        <div className=' min-h-screen bg-white bg-cover '>
            <Head title="Seragam" />
            <div className="">
                <Navbar />
            </div>
            <div className="mt-20 dark:bg-gray-900 p-2">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 mb-16">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                            <Carousel>
                                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                            </Carousel>
                        </div>
                        <div className="mt-6 sm:mt-8 lg:mt-5">
                            <h1
                                className="text-3xl font-semibold text-gray-900 sm:text-3xl dark:text-white"
                            >
                                {props.seragam.nama_seragam}
                            </h1>
                            <div className="mt-1 sm:items-center sm:gap-4 sm:flex">
                                <p
                                    className="text-xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                                >
                                    <NumericFormat value={props.seragam.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                </p>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                        <svg
                                            className="w-4 h-4 text-yellow-300"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                            />
                                        </svg>
                                    </div>
                                    <p
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                    >
                                        (5.0)
                                    </p>
                                    <a
                                        href="#"
                                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                                    >
                                        345 Reviews
                                    </a>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-3 gap-5 max-lg:gap-3 mt-3">
                                    <div>Ukuran</div>
                                    <div className="grid grid-cols-5 gap-2 col-span-2">
                                        {props.seragam.seragam_detail.map((data, i) => (
                                            <label
                                                key={i}
                                                className={`flex items-center justify-center px-3 py-1 text-sm font-medium transition duration-300 ease-in-out cursor-pointer border rounded-lg ${selectedSize === data.id
                                                    ? 'text-white bg-gray-900 border-gray-900 outline outline-2 outline-gray-500'
                                                    : data.stok === 0 ?
                                                        ' text-gray-500'
                                                        : 'text-gray-900 bg-transparent border-gray-500 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="ukuran"
                                                    value={data.id}
                                                    className="hidden" disabled={data.stok === 0}
                                                    onChange={handleChange}
                                                />
                                                {data.ukuran}
                                            </label>
                                        ))}
                                    </div>
                                    <div>Jenis</div>
                                    <div className="grid grid-cols-2 gap-2 col-span-2">
                                        {['Panjang', 'Pendek'].map((panjangPendek, i) => (
                                            <label
                                                key={i}
                                                className={`flex items-center justify-center px-3 py-1 text-sm font-medium transition duration-300 ease-in-out cursor-pointer border rounded-lg ${selectedSize2 === panjangPendek
                                                    ? 'text-white bg-blue-600 border-blue-600 outline outline-2 outline-gray-500'
                                                    : 'text-gray-900 bg-transparent border-blue-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="panjangPendek"
                                                    value={panjangPendek}
                                                    className="hidden"
                                                    onChange={() => setSelectedSize2(panjangPendek)}
                                                />
                                                {panjangPendek}
                                            </label>
                                        ))}
                                    </div>
                                    <div>Kuantitas</div>
                                    <div className="col-span-2">
                                        <div className="flex">
                                            <button
                                                type="button"
                                                onClick={handleDecrement}
                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-gray-900 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 2"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M1 1h16"
                                                    />
                                                </svg>
                                            </button>
                                            <input
                                                type="text"
                                                name="jumlah"
                                                onChange={handleChangeJumlah}
                                                id="quantity-input"
                                                min={1}
                                                value={quantity}
                                                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="999"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={handleIncrement}
                                                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-gray-900 dark:text-white"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 18 18"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M9 1v16M1 9h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                        {/* Tampilkan pesan jika kuantitas mencapai stok maksimum */}
                                        {quantity >= selectedSizeStock && (
                                            <p className="text-red-500">Kuantitas melebihi stok yang tersedia</p>
                                        )}
                                    </div>
                                </div>
                                {showForm && (
                                    <div className="grid grid-cols-3 gap-5 mt-5">
                                        <div>Nama</div>
                                        <div className="col-span-2">
                                            <input type="text" onChange={(e) => setData('nama', e.target.value)} id="nama" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                                        </div>
                                        <div>Kelas</div>
                                        <div className="col-span-2">
                                            <input type="text" onChange={(e) => setData('kelas', e.target.value)} id="kelas" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                                        </div>
                                    </div>
                                )}
                                <div className="grid lg:grid-cols-2 mt-6 lg:gap-3">
                                    <button
                                        type="submit"
                                        title=""
                                        className={`flex items-center justify-center py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border transition ${isSubmitting
                                            ? 'text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed'
                                            : 'text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                                            }`}
                                        role="button"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        <svg
                                            className="w-5 h-5 -ms-2 me-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                            />
                                        </svg>
                                        {isSubmitting ? 'Menambah...' : 'Tambah ke Keranjang'}
                                    </button>

                                    {chekout ? (
                                        <button
                                            type="submit"
                                            title=""
                                            className={`flex max-lg:mt-2 items-center justify-center py-2.5 px-5 text-sm font-medium focus:outline-none rounded-lg border transition ${isSubmitting
                                                ? 'text-gray-400 bg-gray-200 border-gray-200 cursor-not-allowed'
                                                : ' text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-400 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                                                }`}
                                            role="button"
                                            onClick={handlePayment}
                                            disabled={isSubmitting}
                                        >
                                            <svg
                                                className="w-5 h-5 -ms-2 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                                />
                                            </svg>
                                            {isSubmitting ? 'Checkout...' : 'Checkout'}
                                        </button>
                                    ) :
                                        <a
                                            href="#"
                                            title=""
                                            className=" max-lg:mt-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white focus:outline-none bg-blue-600 rounded-lg border border-gray-200 hover:bg-blue-400 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            role="button"
                                            onClick={handleBeliSekarangClick}
                                        >
                                            <svg
                                                className="w-5 h-5 -ms-2 me-2"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                            </svg>

                                            Beli Sekarang
                                        </a>}
                                </div>
                            </form>

                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                Studio quality three mic array for crystal clear calls and voice
                                recordings. Six-speaker sound system for a remarkably robust and
                                high-quality audio experience. Up to 256GB of ultrafast SSD storage.
                            </p>

                            <p className="text-gray-500 dark:text-gray-400">
                                Two Thunderbolt USB 4 ports and up to two USB 3 ports. Ultrafast
                                Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched Magic Mouse with
                                Magic Keyboard or Magic Keyboard with Touch ID.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Bottom keranjang={props.keranjang} />

        </div>
    )
}