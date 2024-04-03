'use client'
import React, {useEffect} from 'react'
import { GlobalStateProvider } from './components/globalState'
import Navbar from "./components/Navbar/Navbar";
import { getCookie } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Props {children: React.ReactNode;}

const ContentWrapper = ({children}: Props) => {

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

  return (
    <GlobalStateProvider>
        <Navbar />
        {children}
    </GlobalStateProvider>
  )
}

export default ContentWrapper