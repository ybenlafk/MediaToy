'use client';
import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import { getCookie } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'
import { useGlobalState } from '../globalState'
import { Input } from '@/components/ui/input';
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
        <div className='flex flex-col justify-center items-center py-40 w-full'>
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full flex justify-center items-center flex-col'
        >
        <div className="relative h-40 w-40 overflow-hidden rounded-full ring-4 ring-[#F4EEE0]">
            <Image
                src={(user && user?.picture) || '/user.png'}
                alt="Picture of the author"
                layout="fill"
                objectFit="cover"
            />
            <div className="absolute inset-0 h-full w-1/2 bg-white"></div>
        </div>
        <label htmlFor="uploadFile1"
            className="bg-white hover:bg-gray-200 text-[#000000] mt-4 text-sm px-4 py-2.5 outline-none rounded text-center w-[10%] cursor-pointer mx-auto block font-[sans-serif]">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-[#000000] inline" viewBox="0 0 32 32">
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000" />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000" />
            </svg>
              Upload an image
            <input type="file" accept="image/*" id='uploadFile1' className="hidden" />
          </label>
        </motion.div>
        <div className='flex flex-col justify-center items-center py-10 w-[15%]'>
            <form className='flex flex-col justify-center items-center w-full'>
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }} 
                className='flex flex-col w-full'>
                    <label htmlFor="Name" className='ml-2'>Name :</label>
                    <Input placeholder='Enter new name' type='text' className='w-full' />
                </motion.div>
                <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className='bg-[#F4EEE0] w-full text-[#312f38] rounded-md p-2 mt-4'>
                    Save
                </motion.button>
            </form>
            <div className="bg-gradient-to-r from-transparent via-neutral-400 to-transparent my-4 h-[1px] w-full" />
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