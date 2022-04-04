import React from 'react'
import NavBar from '../NavBar/index.js'
import Footer from '../Footer'

export default function HeaderFooterWrapper({ children }) {
  return (
    <>
      <NavBar />
        {children}
      <Footer />
    </>
  )
}
