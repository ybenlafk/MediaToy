'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, cleanCookie } from '@/utils/utils'
import axios from 'axios'
import { useGlobalState } from '../globalState'
import { io } from "socket.io-client";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {state, dispatch} = useGlobalState();
  const {user, reload} = state;
  let socket : any = null;
  const signup = () => { router.push('/register') }
  const signin = () => { router.push('/login') }
  let accessToken = getCookie('access_token');

  
  useEffect(() => {
    console.log("reload")
    axios.get("http://localhost:8080/auth/protected", {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(res => {
      if (res.status === 200)
      {
        setIsAuthenticated(true);
        socket = io('http://localhost:8080', {query: { userId: res?.data?.id } });
        dispatch({type: 'UPDATE_SOCKET', payload: socket});
        dispatch({type: 'UPDATE_USER', payload: res.data});
      }
      else
        setIsAuthenticated(false);
    })
    .catch(() => {setIsAuthenticated(false);})
    .finally(() => { setLoading(true) });

    return () => {
      if (socket)
        socket.disconnect();
    }
  } , [accessToken, reload])

  const handleLogout = async () => {
    handleToggle();
    axios.post(
      'http://localhost:8080/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ).then((res) => {
      cleanCookie();
      router.push('/');
      dispatch({type: 'UPDATE_RELOAD', payload: !reload});
    }
    ).catch((err) => {
      console.log("err");
    });
  }
  const handleToggle = () => { setIsOpen(!isOpen) }

  return (
    <div className='flex justify-center items-center h-[4%] bg-[#4F4557]'>
        <div className='flex justify-between items-center w-[90%] 2xl:w-[50%]'>
            <Link href='/' className='text-2xl text-[#F4EEE0] cursor-pointer'>MediaToy</Link>
            {loading && 
              <div className='flex space-x-4 items-center'>
                  {isAuthenticated ?
                    <div className="relative inline-block text-left">
                      <button 
                      onClick={handleToggle}
                      className="flex items-center text-sm pe-1 font-medium text-[#F4EEE0] rounded-full p-2 hover:bg-[#695d73] transition duration-300 focus:outline-none" 
                      >
                      <span className="sr-only">{user && user?.name}</span>
                      <Image className="w-8 h-8 me-2 rounded-full" src="/user.png" alt="user photo" width={100} height={100} />
                      {user && user?.name}
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                      </button>
                      <div  className={`absolute z-20 divide-y divide-gray-100 rounded-lg shadow w-44 bg-[#4F4557] ${isOpen ? "" : "hidden"}`}>
                        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                          <div className="truncate">{user && user?.email}</div>
                        </div>
                        <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
                          <li onClick={handleToggle}>
                            <Link href="/User" className="block px-4 py-2 hover:bg-[#7c6e88]">Profile</Link>
                          </li>
                          <li onClick={handleToggle}>
                            <Link href="#" className="block px-4 py-2 hover:bg-[#7c6e88]">My posts</Link>
                          </li>
                        </ul>
                        <div className="py-2" onClick={handleLogout}>
                          <a href="#" className="block px-4 py-2 text-sm text-white hover:bg-[#7c6e88]">Sign out</a>
                        </div>
                      </div>
                    </div>
                    :
                    <>
                      <button onClick={signin} className="px-4 h-10 rounded-xl border border-neutral-600 text-[#F4EEE0] bg-[#393646] hover:bg-[#6D5D6E] transition duration-200">
                          Sign In
                      </button>
                      <button onClick={signup} className="px-4 h-10 rounded-xl border border-neutral-600 text-[#F4EEE0] bg-[#393646] hover:bg-[#6D5D6E] transition duration-200">
                          Sign Up
                      </button>
                    </>
                  }
                </div>
              }
        </div>
    </div>
  )
}

export default Navbar