import React, { useState } from 'react'
import TopHeader from './TopHeader.jsx'
import Navbar from './Navbar.jsx'
import Nav from './Nav.jsx'

import './style.css'

const Header = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  return (
    <>
      <TopHeader />
      <Navbar isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
      <Nav isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />
    </>
  )
}

export default Header
