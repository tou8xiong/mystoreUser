import LogoImg from '../public/logo.png'
import Image from 'next/image'
import { IoSettings } from "react-icons/io5";

export default function Header(){
    return(
        <div className="bg-white fixed w-full p-0 flex text-xl items-center justify-between shadow-lg shadow-gray-900 border-b-1 border-gray-700 font-serif ">
            <div className='flex items-center gap-4 '>
                <h1 className='ml-2 font-bold text-2xl'>MyStoreUsers</h1>
                <Image src={LogoImg} alt='logoiamge' width={75} className='border-0 border-amber-400'/>
            </div>
            <div className='flex border-0 border-amber-500 gap-5'>
                <button className='p-2 hover:bg-gray-600 rounded-md hover:text-amber-50'>Prodecut Detail</button>
                <button  className='p-2 hover:bg-gray-600 rounded-md hover:text-amber-50'>Employee Detail</button>
                <button  className='p-2 hover:bg-gray-600 rounded-md hover:text-amber-50'>User Detail</button>
                <button  className='p-2 hover:bg-gray-600 rounded-md hover:text-amber-50'>Marketing Detail</button>
            </div>
            <div className='m-3'>
                <IoSettings size={30}/>
            </div>
        </div>
    )
}