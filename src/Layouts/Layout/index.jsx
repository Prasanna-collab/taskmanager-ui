import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'

const Layout = () => {
  return (
    <div className='py-4 px-8 flex flex-col min-height-screen'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout