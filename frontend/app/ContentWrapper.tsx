'use client'
import React from 'react'
import { GlobalStateProvider } from './components/globalState'
import Navbar from "./components/Navbar/Navbar";

interface Props {children: React.ReactNode;}

const ContentWrapper = ({children}: Props) => {

  return (
    <GlobalStateProvider>
        <Navbar />
        {children}
    </GlobalStateProvider>
  )
}

export default ContentWrapper