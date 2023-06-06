import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import mainService from '../services/main.service';
import { notifySuccess } from '../utils/alerts';
const ProductForm = () => {
    const [categoryArr, setCategoryArr] = useState([]);
    const [categorysingle, setcategorySingle] = useState('')
    useEffect(() => {
        const fetchCategory = async () => {
            const data = await mainService.listCategory();
            setCategoryArr(data.data.categories)
        }
        fetchCategory()
    }, [])

    const [formData, setformData] = useState({
        name: '',
        amount: 0,
        description: '',
        category: '',
        tax: 0,
        quantity: 0
    });
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const data = await mainService.addProduct(formData);
            if (data.data.message == 'Product created successfully!') {
                notifySuccess('Product created successfully!')
                setformData({
                    name: '',
                    amount: 0,
                    description: '',
                    category: '',
                    tax: 0,
                    quantity: 0
                })
                navigate('/')
            }
        } catch (error: any) {
            console.log(error)
            return;
        }
    }
    const createCategory = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (categorysingle) {
                const data = await mainService.createCategory(categorysingle);
                if (data.data.message == 'Category created successfully!') {
                    notifySuccess('Category created successfully!')
                    setcategorySingle('')
                }
            }
        } catch (error: any) {
            console.log(error)
            return;
        }
    }
    return (
        <form onSubmit={handleSubmit} className='bg-white pt-8 px-8 rounded-md overflow-auto'>
            <div className="relative z-0 w-full mb-6 group">
                <input value={formData.name} onChange={(e) => setformData({ ...formData, name: e.target.value })} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Product Name</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input value={formData.amount} onChange={(e) => setformData({ ...formData, amount: e.target.valueAsNumber })} type="number" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Product Amount</label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <select value={formData?.category} onChange={(e) => setformData({ ...formData, category: e.target.value })} className="shadow hover:border-solid hover:border-2 duration-500 rounded-md hover:border-backG border-2 border-white appearance-none bg-inputG w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Select the status">
                    <option value={''}>{'Select category'}</option>
                    {categoryArr && categoryArr.map((option: any) => (
                        <option key={option.id} value={option.id}>{option.name}</option>
                    ))}
                </select>
                {!categoryArr &&
                    <form onSubmit={createCategory}>
                        <div>
                            <input value={categorysingle} onChange={(e) => setcategorySingle(e.target.value)} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder="" required />
                            <label className="pee-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 -translate-y-6">Category</label>
                        </div>
                        <div className='flex justify-between py-6'>
                            <button type="submit" className="text-white hover:font-bold bg-main px-20 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 text-center dark:bg-main dark:hover:bg-teal-900 duration-500 dark:focus:ring-slate-50">Submit</button>
                        </div>
                    </form>
                }
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                    <input value={formData.description} onChange={(e) => setformData({ ...formData, description: e.target.value })} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Product description</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input value={formData.tax} onChange={(e) => setformData({ ...formData, tax: e.target.valueAsNumber })} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8">Tax</label>
                </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
                <input value={formData.quantity} onChange={(e) => setformData({ ...formData, quantity: e.target.valueAsNumber })} type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-main peer" placeholder="" required />
                <label className="pee-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-main  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 -translate-y-6">quantity</label>
            </div>
            <div className='flex justify-between py-6'>
                <button type="submit" className="text-white hover:font-bold bg-main px-20 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 text-center dark:bg-main dark:hover:bg-teal-900 duration-500 dark:focus:ring-slate-50">Submit</button>
                <button type="button" className="text-white hover:font-bold bg-slate-500 px-20 hover:bg-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto py-4 text-center dark:bg-slate-500 dark:hover:bg-slate-800 dark:focus:ring-slate-600 duration-500">Cancel</button>
            </div>
        </form>
    )
}

export default ProductForm