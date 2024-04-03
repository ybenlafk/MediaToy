'use client'
import React, {useEffect, useState} from 'react'
import UserPage from '../components/user/UserPage'
import { useSearchParams } from 'next/navigation'
import { getCookie } from '@/utils/utils'
import axios from 'axios'
import { useGlobalState } from '../components/globalState'
import { useRouter } from 'next/navigation'


const ProfilePage = () => { 
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const accessToken = getCookie('access_token');
    const {state} = useGlobalState();
    const router = useRouter();
    const {user} = state;

    if (user && id === user?.id) router.push('/Dashboard/User');
    
    const [target, setTarget] = useState(null);

    useEffect(() => {
        if (!id) return;
        axios.get(`http://localhost:8080/user/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            setTarget(res.data);
        })
        }, [id]);
  return (
    <UserPage target={target}/>
  )
}

export default ProfilePage