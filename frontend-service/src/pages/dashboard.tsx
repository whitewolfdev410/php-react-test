import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar'
import { IProduct } from '../utils/custom.data'
import { Link } from 'react-router-dom'
import mainService from '../services/main.service'
import { notifyError, notifySuccess } from '../utils/alerts'
const Dashboard = () => {
    const [productData, setProductData] = useState<IProduct[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const data = await mainService.allProducts();
            setProductData(data.data.products)
            if(!data.data.products){
                notifyError('Error')
            }
        }
        fetchProducts();
    }, [])
    const purchaseProduct = async (res: IProduct) => {
        const data = await mainService.purchaseProduct(res);
        if (data.data.purchase) {
            notifySuccess('Successful purchase')
        }
    }
    return (
        <div className='bg-[#f5f5f5] min-h-screen min-w-screen flex justify-start'>
            <Sidebar />
            <div className='w-full p-10'>
                <div className='flex text-black justify-between'>
                    <div>
                        <h1 className='font-bold'>Product Statistics</h1>
                        <span className='text-[10px] text-[#00000088] font-semibold'>Detailed product info</span>
                    </div>
                    <div className='flex gap-2'>
                        <button className='py-4 flex place-items-center text-white font-bold justify-center rounded-md text-sm px-10 bg-main'>
                            <Link to={`/new/product`}>New Product</Link>
                        </button>
                    </div>
                </div>
                <div className='max-h-[80vh] overflow-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 place-content-stretch lg:grid-cols-3 py-10 gap-6'>
                        {productData && productData.map((product: any) => (
                            <div key={product.id} className='bg-white rounded-lg h-44 w-80 shadow-md shadow-slate-200 flex flex-col p-5 border-solid'>
                                <div className='flex place-items-center justify-between pb-4'>
                                    <div className='flex gap-4'>
                                        <div className='p-5 text-main border-2 border-main border-solid rounded-full text-linearG'>
                                            {product.icon}
                                        </div>
                                        <div>
                                            <h1 className='text-black font-bold'>{product.name}</h1>
                                            <p className='text-sm text-slate-500'>{product.quantity}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => purchaseProduct(product)} className='px-2 py-2 text-[10px] rounded-sm bg-main font-bold text-white'>Purchase</button>
                                    </div>
                                </div>
                                <div className=' border-t-2 border-[#00000012] border-solid flex '>
                                    <div className='border-r-2 w-1/2 flex flex-col py-2 border-[#00000012] border-solid place-items-center'>
                                        <h1 className='text-black font-bold text-sm'> <span className='text-main'>+</span>{product.tax}</h1>
                                        <p className='text-[10px] text-slate-500'>Tax</p>
                                    </div>
                                    <div className=' w-1/2 flex flex-col py-2 place-items-center'>
                                        <h1 className='text-black font-bold text-sm'> <span className='text-main'>+</span>{product.price} </h1>
                                        <p className='text-[10px] text-slate-500'>Price</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard