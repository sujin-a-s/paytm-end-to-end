import { Sidebaritems } from '@repo/ui/sidebaritems'
import React, { ReactNode } from 'react'


interface LayoutProps {
    children : React.ReactNode
}

const Layout = ({children}:LayoutProps) => {
  return (
    <div className='flex bg-gradient-to-r from-[#F1F0F7] to-blue-100 font-sans'>
        <div className='w-72 border-r border-slate-300 min-h-screen mr-4 pt-40'>
            <div>
                <Sidebaritems href="/transfer" icon={<TransferIcon/>} label="Transfer"/>
                <Sidebaritems href="/transaction" icon={<TransactionsIcon/>} label="Transactions"/>
            </div>
        </div>
        {children}
    </div>
  )
}



function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
  </svg>
}

function TransactionsIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
  
}

export default Layout