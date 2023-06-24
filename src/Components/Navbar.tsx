import React from 'react'
import { MdInsights } from "react-icons/md";
export const Navbar = () => {
  return (
    <nav className='sticky top-0 flex items-center gap-2 w-full py-4 px-16 bg-black/25 '>
        <MdInsights size={24}/>
        <span className=' font-semibold text-xl '>EtherInsights</span>
    </nav>
  )
}
