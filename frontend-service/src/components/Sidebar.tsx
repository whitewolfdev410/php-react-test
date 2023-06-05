import React, { useState } from 'react'
import { ILInk, sideBarArr } from '../utils/custom.data'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [links, setLinks] = useState<ILInk[]>(sideBarArr);
    const changeHeader = (path: string) =>{
        if(path === location.pathname){
          return 'text-main bg-slate-100'
        }
      }
    return (
        <aside className='bg-white min-h-screen min-w-[20vw] px-6 py-8'>
            <h1 className='text-[black] font-semibold text-[12px]'>MAIN MENU</h1>
            <div className='flex flex-col gap-4 py-10'>
                {links && links.map((link: ILInk) => (
                    <Link key={link.link_id} to={link.link_url} className={`${changeHeader(`${link.link_url}`)} flex py-4 place-items-center hover:bg-slate-100 px-4 rounded-md text-[14px] hover:text-main text-slate-500 flex-row gap-8`}>
                        <span>{link.link_icon_name}</span>
                        <p>{link.link_name}</p>
                    </Link>
                ))}
            </div>

        </aside>
    )
}

export default Sidebar