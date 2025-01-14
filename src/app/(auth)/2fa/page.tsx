"use client"
import React from 'react'
import Footer from '@/components/Footer'
import SplashScreen from '@/components/SplashScreen'
import { z } from 'zod'

import { Button } from "@/components/ui/button"
import { Switch } from '@/components/ui/switch'
import TwoFactorVerification from '@/components/2fa-verification'



const TwoFactorAuthenticationPage = () => {
    return (
        <div className='flex flex-col flex-1 h-full w-full'>
            <div className='flex w-full h-full'>
                <div className='w-0 md:w-1/2'><SplashScreen /></div>
                <div className='w-full md:w-1/2 flex items-center justify-center'>
                   <TwoFactorVerification email='ivantomdio@gmail.com' phone_number='+237650039773'/>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default TwoFactorAuthenticationPage