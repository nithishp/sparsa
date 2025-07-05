import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-screen h-max lg:h-max bg-foreground'>
        <div className='flex flex-col justify-center items-center h-full px-6'>
            <Image src={"/sparsa-footer-logo.png"} width={200} height={200} alt="Sparsa Logo" className='w-52 object-contain' />
            <p className='text-white mt-5 text-center'>Developed by Scottech Technologies Pvt. Ltd. © 2021 All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer