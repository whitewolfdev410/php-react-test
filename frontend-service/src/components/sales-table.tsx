import React, { useState } from 'react'
import { IProduct, ISales } from '../utils/custom.data'

const SalesTable = (data: any) => {
    return (
        <table className='w-full'>
            <thead className='border-solid border-b-2 h-12 border-gray-200 '>
                <tr className='text-slate-700 font-bold text-left text-[12px]'>
                    <th className='px-4'>#</th>
                    <th>Name</th>
                    <th>Price </th>
                    <th>Tax</th>
                    <th>Date</th>
                    <th>TBD</th>
                </tr>
            </thead>
            <tbody>
                {data ? data.map((sale: any, i: number) => (
                    <tr key={i} className=" text-black font-light hover:bg-slate-200  hover:cursor-pointer group duration-500 text-[12px]">
                        <td className='px-4'>
                            # {i + 1}
                        </td>
                        <td className='py-5'>
                            <span>{sale?.name}</span>
                        </td>
                        <td className='text-left'>{sale?.price}</td>
                        <td className='text-left'>{sale?.tax}</td>
                        <td className='text-left'>{sale?.createdAt.toDateString()}</td>
                        <td className='text-left'>{sale?.price * sale?.tax}</td>
                    </tr>
                )) :
                    <tr className='text-[14px] bg-slate-900 flex justify-center'>
                        <td className='p-6'>No Data Fetch</td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default SalesTable