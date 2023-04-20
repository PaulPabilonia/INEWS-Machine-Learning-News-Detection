import React from 'react'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const WithNav = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    <Footer />
    </>
  )
}

export default WithNav 