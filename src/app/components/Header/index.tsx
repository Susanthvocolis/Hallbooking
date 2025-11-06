'use client';
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { DecodeJwtToken } from "@/app/utils/DecodeJwtToken";
import { getUserById } from "@/app/services/UserService/userService";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';

type HeaderProps = {
    title: string;
};
type User = {
    id: string;
    fullName: string;
    email: string;
}

const Header = ({ title }: HeaderProps) => {
    const Popup = dynamic(() => import('reactjs-popup'), { ssr: false });
    const decode = DecodeJwtToken();
    const router = useRouter()
    const [userData, setUserData] = useState<User | null>(null);

    const fetchUserData = async () => {
        if (decode && decode.id) {
            const user = await getUserById(decode.id);
            setUserData(user?.data);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const onClickLogout = () => {
        Cookies.remove('jwt_token');
        router.push('/')
    }

    return (
        <div className="flex justify-between items-center h-[10vh] px-5 py-2 border-b border-gray-300">
            <div>
                <h1 className="text-2xl font-bold hidden md:block">{title}</h1>
            </div>
            <div className="flex gap-5">
                <div>
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full px-2 py-2 sm:py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors pr-10 text-sm sm:text-base"
                            placeholder="Search..."
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                        >
                            <BsSearch />
                        </button>

                    </div>
                </div>
                <Popup trigger={
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="cursor-pointer bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg font-bold">
                            {userData?.fullName?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <div className="cursor-pointer font-semibold text-xs sm:text-sm">{userData?.fullName}</div>
                            <div className="cursor-pointer text-xs text-gray-500 truncate">
                                {userData?.email}
                            </div>
                        </div>
                    </div>
                } position="bottom right">
                    <ul key="1" className='bg-[#000] w-40 p-2'>
                        <li className='flex justify-around items-center text-white cursor-pointer mr-4' onClick={onClickLogout}><MdLogout />Logout</li>
                    </ul>
                </Popup>
            </div>
        </div>
    )
}

export default Header;