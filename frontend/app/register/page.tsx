'use client'
import React from 'react'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/lable";

import { useForm } from "react-hook-form";
import { cn } from '@/components/cn';

import { IconBrandGoogle } from "@tabler/icons-react";
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const register = () => {
    const form = useForm();
    const router = useRouter();

    const onSubmit = (data : any) => {
        axios.post('http://localhost:8080/auth/signup', data)
        .then(res => {
          if (res.status === 200)
            router.push('/login');
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="max-w-md lg:w-full w-[80%] mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-[#312f38] ring-[0.2px] ring-[#F4EEE0] z-10">
            <h1
                className='text-[#F4EEE0] lg:text-4xl md:text-3xl text-2xl font-semibold mb-2 sm:mb-0 text-center'
                >
                Register
            </h1>

            <form className="my-8" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <LabelInputContainer>
                    <Label htmlFor="firstname">Name</Label>
                    <Input id="firstname" placeholder="Tyler" type="text" {...form.register("name")} />
                </LabelInputContainer>
                </div>
                {/* {(is === 1 || is === 2) && <p className="text-red-500 text-sm my-4">{error}</p>} */}
                <LabelInputContainer className="mb-4">
                <Label htmlFor="username">Email</Label>
                <Input id="username" placeholder="Tylerlol@gmail.com" type="text" {...form.register("email")} />
                {/* {is === 3 && <p className="text-red-500 text-sm my-4">{error}</p>} */}
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="••••••••" type="password" {...form.register("password")} />
                {/* {is === 4 && <p className="text-red-500 text-sm my-4">{error}</p>} */}
                </LabelInputContainer>
                <button
                className="bg-gradient-to-br relative group/btn bg-[#393646] w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                >
                Sign up &rarr;
                <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                <div className="flex flex-col space-y-4">
                    <button
                    className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-full  rounded-md h-10 font-medium shadow-input bg-[#393646]"
                    type="button"
                    //   onClick={handleGoogle}
                    >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-300" />
                    <span className="text-neutral-300 text-sm">
                        Google
                    </span>
                    <BottomGradient />
                    </button>
                </div>
            </form>
            <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            <div className="w-full flex justify-between">
                <Label className="text-gray-300 text-sm" >Already have an account?</Label>
                <Link href='/login' className="text-gray-300 text-sm" >Sign In &rarr;</Link>
            </div>
            </div>
        </div>
    )
}

export default register


const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-red-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
  };
  
  const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };