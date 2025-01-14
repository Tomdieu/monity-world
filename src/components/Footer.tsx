import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-y-2 items-center justify-between p-4 bg-primary-DEFAULT text-primary-foreground'>
        <p className='text-black text-sm'>Copyrigth (c) 2024 Monity World. All rights reserved.</p>
        <div className='flex gap-5 text-sm items-center justify-between text-muted-foreground'>
            <a href='#'>Terms of Use</a>
            <a href='#'>Cookie preferences</a>
            <a href='#'>Privacy</a>
        </div>
    </div>
  )
}

export default Footer