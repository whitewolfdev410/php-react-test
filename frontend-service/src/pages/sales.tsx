import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { IProduct, ISales, SampleSales } from '../utils/custom.data'
import { Link } from 'react-router-dom'
import SalesTable from '../components/sales-table'
import mainService from '../services/main.service'
import { notifyError } from '../utils/alerts'
const Sales = () => {
    const [salesData, setsalesData] = useState<any>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await mainService.getPurchasedProducts();
            setsalesData(data.data.purchases)
            if (!data.data.purchases) {
                notifyError('No purchases fetched')
            }
        }
        fetchProducts();
    }, [])
    return (
        <div className='bg-[#f5f5f5] min-h-screen min-w-screen flex justify-start'>
            <Sidebar />
            <div className='w-full p-10'>
                <div className='flex text-black justify-between'>
                    <div>
                        <h1 className='font-bold'>Sales Statistics</h1>
                        <span className='text-[10px] text-[#00000088] font-semibold'>Detailed sales info</span>
                    </div>
                    <div className='flex gap-2'>
                        <button className='py-4 flex place-items-center text-white font-bold justify-center rounded-md text-sm px-10 bg-main'>
                            <Link to={`/new/product`}>New Product</Link>
                        </button>
                    </div>
                </div>
                <div className='py-10'>
                    <div className='overflow-auto h-[70vh] bg-white shadow-md shadow-slate-100 w-full rounded-md'>
                        <SalesTable data={salesData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales