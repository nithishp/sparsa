import { Phone } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className='p-10 w-screen h-auto flex justify-between items-center absolute'>
        <h1 className='font-normal text-foreground text-2xl'>Sparsa</h1>
        <div className='bg-foreground px-6 rounded-full flex items-center justify-center py-2 gap-2'>
            <Phone className='text-background '/><h1 className='text-background'>Call Us Now</h1>
        </div>
    </header>
  )
}

export default Header