'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import {Input} from '@/components/ui/input';

const UserProfile = () => {
  // Dummy data for demonstration
  const [followersCount, setFollowersCount] = useState(100);
  const [followingCount, setFollowingCount] = useState(50);
  const [isEditing, setIsEditing] = useState(false); // State to track if the user is editing the profile

  // Handler for toggling edit mode
  const toggleEditMode = () => {
    setIsEditing(prevState => !prevState);
  };

  return (
    <div className='flex flex-col justify-center items-center py-40'>
      <Image
        src='/user.png'
        alt='Picture of the author'
        width={500}
        height={500}
        className='rounded-full h-40 w-40 ring-4 ring-[#F4EEE0]'
      />
      <div className='flex flex-col justify-center items-center py-10'>
        <h1 className='text-2xl font-bold'>Jane Doe</h1>
        <p className='text-gray-500 w-[50%] text-center'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
       
        <button
          onClick={toggleEditMode}
          className='mt-4 px-4 py-2 rounded-full text-white bg-[#4F4557] hover:bg-[#6D5D6E]'
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>

        {isEditing && (
          <form className='mt-4 w-[50%] flex flex-col justify-center'>
            <Input type='text' placeholder='Name' className='block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md' />
            <Input type='text' placeholder='Bio' className='block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md' />
            <div className='flex justify-center w-full'>
                <button type='submit' className='mt-4 px-4 py-2 w-[60%] rounded-full  text-white bg-[#4F4557] hover:bg-[#6D5D6E]'>
                Save Changes
                </button>
            </div>
          </form>
        )}

        <div className='flex justify-center items-center mt-2'>
          <p className='mr-2'>
            Followers: <span className='font-light'>{followersCount}</span>
          </p>
          <p>
            Following: <span className='font-light'>{followingCount}</span>
          </p>
        </div>
        <div className='flex space-x-4 mt-4'>
          <a href='#' className='text-gray-500 hover:text-[#F4EEE0]'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
            </svg>
          </a>
          <a href='#' className='text-gray-500 hover:text-[#F4EEE0]'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
            </svg>
          </a>
          <a href='#' className='text-gray-500 hover:text-[#F4EEE0]'>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
