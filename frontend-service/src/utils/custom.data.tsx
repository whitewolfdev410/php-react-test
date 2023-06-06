import React from 'react';
import { FaChartPie, FaAddressBook, FaSalesforce, FaUser, FaProductHunt, FaShoppingCart, FaBox, FaChartBar } from 'react-icons/fa'
export interface ILInk {
    link_name: string;
    link_url: string;
    link_icon_name: any;
    link_id: number;
}
export const sideBarArr: ILInk[] = [
    {
        link_name: 'Home',
        link_url: '/',
        link_icon_name: <FaChartPie />,
        link_id: 1
    }, {
        link_name: 'Sales',
        link_url: '/sales',
        link_icon_name: <FaSalesforce />,
        link_id: 2
    }
]

export interface IProduct {
    id: string;
    icon: any;
    name: number;
    product_name: string;
    past_week_quantity: number;
    past_month_quantity: number;
}

export interface ISales {
    id: string;
    price: number;
    tax: number;
    product_name: string;
    dateInfo: Date;
    TBD: number;
}
export const SampleSales: ISales[] = [
    {
        id: '1',
        price: 50,
        tax: 5,
        product_name: 'Product 1',
        dateInfo: new Date('2023-05-01'),
        TBD: 2,
    },
    {
        id: '2',
        price: 100,
        tax: 10,
        product_name: 'Product 2',
        dateInfo: new Date('2023-05-05'),
        TBD: 5,
    },
    {
        id: '3',
        price: 75,
        tax: 7.5,
        product_name: 'Product 3',
        dateInfo: new Date('2023-05-10'),
        TBD: 3,
    }
]
export interface ICategory {
    id: string;
    name: string;
    desription: string;
}