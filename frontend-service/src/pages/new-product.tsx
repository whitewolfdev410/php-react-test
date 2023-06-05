import React from 'react'
import Sidebar from '../components/sidebar'
import ProductForm from '../components/productForm'

const NewProduct = () => {
    return (
        <div className='bg-[#f5f5f5] min-h-screen min-w-screen flex justify-start'>
            <Sidebar />
            <div className='w-full p-10'>
                <div className='flex text-black justify-between'>
                    <div>
                        <h1 className='font-bold'>Register Product</h1>
                        <span className='text-[10px] text-[#00000088] font-semibold'>Detailed product info registration.</span>
                    </div>
                </div>
                <div className='py-10'>
                    <ProductForm />
                </div>
            </div>
        </div>
    )
}

export default NewProduct