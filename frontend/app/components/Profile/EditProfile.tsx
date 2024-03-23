'use client';
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { getCookie } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import { useGlobalState } from '../globalState'
import axios from 'axios';

const EditProfile = () => {
    const router = useRouter();

    const accessToken = getCookie('access_token');
    useEffect(() => {
        axios.get("http://localhost:8080/auth/protected", {
        headers: { 'Authorization': `Bearer ${accessToken}` }
        })
        .then(res => {
        if (res.status !== 200)
            router.push('/login');
        })
        .catch(()=>{router.push('/login');});
    }, []);
    const {state} = useGlobalState();
    const {user} = state;

    if (!user) return (
        <div className='flex flex-col justify-center items-center h-screen'>
          <div className='loader'/>
        </div>
      )
    return (
        <div className='flex flex-col justify-center items-center py-40'>
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        >
        <Image
            src={(user && user?.picture) || '/user.png'}
            alt='Picture of the author'
            width={500}
            height={500}
            className='rounded-full h-40 w-40 ring-4 ring-[#F4EEE0] object-cover'
        />
        </motion.div>
        <div className='flex flex-col justify-center items-center py-10'>
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-2xl font-bold'
        >
            {user && user?.name}
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='text-gray-500 w-[50%] text-center'
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </motion.p>
        <div className='flex space-x-4 mt-4'>
            <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href='#'
            className='text-gray-500 hover:text-[#F4EEE0]'
            >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
            </motion.a>
            <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            href='#'
            className='text-gray-500 hover:text-[#F4EEE0]'
            >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
            </motion.a>
            <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            href='#'
            className='text-gray-500 hover:text-[#F4EEE0]'
            >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
            </motion.a>
        </div>
        </div>
    </div>
    )
}

export default EditProfile