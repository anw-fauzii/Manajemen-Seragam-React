import Bottom from "@/Layouts/Frontend/Bottom";
import Chekout from "@/Layouts/Frontend/Chekout";
import Navbar from "@/Layouts/Frontend/Navbar";
import { Head, router } from "@inertiajs/react";
import { Button, Dropdown, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";
import toastr from "toastr";

const Pesanan = (props) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalData, setModalData] = useState(null);

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

    const handlePayment = (id) => {
        Swal.fire({
            title: 'Konfirmasi',
            text: 'Silahkan pilih metode pembayaran',
            icon: 'warning',
            showCancelButton: true,
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            denyButtonColor: '#338c22',
            confirmButtonText: 'Non Tunai',
            cancelButtonText: 'Batal',
            denyButtonText: 'Tunai'
        }).then((result) => {
            if (result.isConfirmed) {
                window.snap.pay(id, {
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
            } else if (result.isDenied) {
                toastr.success('Silahkan hubungi bendahara sekolah untuk pembayaran', 'Sukses!');
            }
        });
    };

    const handleInfoClick = (id) => {
        const selectedData = props.pesanan.find(item => item.id === id);

        if (selectedData) {
            setModalData(selectedData);
            setOpenModal(true);
        }
    };

    return (
        <div className='min-h-screen bg-gray-100 bg-cover '>
            <Head title="Pesanan Anda" />
            <Navbar />
            <div className="flex flex-col items-center gap-4 mt-16 p-4">
                <nav className="flex" aria-label="Breadcrumb">
                    {/* ...Your breadcrumb code here... */}
                </nav>
                <h2 className="text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Pesanan Anda</h2>
            </div>
            <div className=' flex justify-center flex-col lg:flex-row lg:flex-wrap lg:items-stretch items-center gap-3 px-64 max-lg:px-4 max-lg:mb-16 pb-20'>
                {props.pesanan.length > 0 ? props.pesanan.map((data, i) => {
                    return (
                        <div key={i} className="p-3 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center mb-2">
                                <svg className="w-8 h-8 mr-2 text-gray-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 3v4a1 1 0 0 1-1 1H5m8-2h3m-3 3h3m-4 3v6m4-3H8M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM8 12v6h8v-6H8Z" />
                                </svg>
                                <div className="lg:flex flex-grow items-center">
                                    <div className="flex lg:flex-1 lg:w-20">
                                        <p className="font-semibold text-gray-900 dark:text-white">{data.kode}
                                            <span className={`${data.status === "Pending" ? 'bg-yellow-100 text-yellow-800' : ' bg-blue-300 text-blue-900'}  text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300`}>{data.status}</span>
                                        </p>
                                    </div>
                                    <div className="flex lg:flex-auto lg:w-20">
                                        <p className=" text-sm text-gray-700 dark:text-white mt-1">{data.nama} ({data.kelas})</p>
                                    </div>
                                    <div className="flex lg:flex-auto lg:w-20">
                                        <p className=" text-sm text-gray-700 dark:text-white mt-1"><NumericFormat value={data.total_harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} /></p>
                                    </div>
                                </div>
                                <Dropdown label="" dismissOnClick={false} renderTrigger={() => <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M12 6h.01M12 12h.01M12 18h.01" />
                                </svg>
                                }>
                                    <Dropdown.Item onClick={() => handleInfoClick(data.id)}>Detail Pesanan</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handlePayment(data.kode_pembayaran)}>Pembayaran</Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                    )
                })
                    :
                    <div className="">
                        <svg className="w-44 h-44 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.024 3.783A1 1 0 0 1 6 3h12a1 1 0 0 1 .976.783L20.802 12h-4.244a1.99 1.99 0 0 0-1.824 1.205 2.978 2.978 0 0 1-5.468 0A1.991 1.991 0 0 0 7.442 12H3.198l1.826-8.217ZM3 14v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-4.43a4.978 4.978 0 0 1-9.14 0H3Z" />
                        </svg>
                    </div>
                }

            </div>
            <Bottom keranjang={props.keranjang} />
            {modalData &&
                <Modal show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Detail Pesanan {modalData.kode}</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6 overflow-x-auto">
                            <Table striped>
                                <Table.Head>
                                    <Table.HeadCell>Seragam</Table.HeadCell>
                                    <Table.HeadCell>Qty</Table.HeadCell>
                                    <Table.HeadCell>Subtotal</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {modalData.pesanan_detail.map((data, i) => {

                                        return (
                                            <>
                                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                    <Table.Cell key={i} className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{data.seragam_detail.seragam.nama_seragam} ({data.seragam_detail.ukuran})</Table.Cell>
                                                    <Table.Cell>{data.jumlah}</Table.Cell>
                                                    <Table.Cell>
                                                        <NumericFormat value={data.subtotal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            </>
                                        )
                                    })}
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell colSpan={2} className=" text-center whitespace-nowrap font-medium text-gray-900 dark:text-white">Total</Table.Cell>
                                        <Table.Cell>
                                            <NumericFormat value={modalData.total_harga} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            }
        </div >
    );
};

export default Pesanan;
