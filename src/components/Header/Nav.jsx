import React, { useState, useEffect } from 'react'
import { FaChevronDown, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'
import logo from '../../assets/images/logo/logo1.png'

const Nav = ({ isMobileNavOpen = false, setIsMobileNavOpen }) => {
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileNavOpen])


  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop', hasDropdown: true },
    { name: 'Categories', path: '/categories', hasDropdown: true },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },,
  ]

  const shopItems = ['New Arrivals', 'Best Sellers', 'On Sale', 'Featured']
  const categoryItems = ['Fruits & Vegetables', 'Dairy & Eggs', 'Meat & Fish', 'Bakery', 'Beverages']

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative hidden md:flex items-center justify-center h-14">
          {/* Desktop Menu */}
          <div className="md:flex items-center gap-3 hidden">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#29A56C] hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                    <span>{item.name}</span>
                    <FaChevronDown
                      size={12}
                      className="transition-transform group-hover:rotate-180"
                    />
                  </button>
                ) : (
                  <a
                    href={item.path}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#29A56C] hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    {item.name}
                  </a>
                )}

                {/* Dropdowns */}
                {item.name === 'Shop' && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    {shopItems.map((shopItem) => (
                      <a key={shopItem} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#29A56C] transition-colors duration-200">
                        {shopItem}
                      </a>
                    ))}
                  </div>
                )}

                {item.name === 'Categories' && (
                  <div className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                    {categoryItems.map((categoryItem) => (
                      <a key={categoryItem} href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#29A56C] transition-colors duration-200">
                        {categoryItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Sidebar Menu - Always mounted for smooth animation */}
        <>
          {/* Dark Overlay - Semi-transparent with fade animation */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-400 ease-in-out ${isMobileNavOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileNavOpen(false)}
          />

          {/* Sidebar - Slides from right with smooth animation */}
          <div className={`fixed top-0 right-0 h-screen w-full max-w-sm bg-white z-50 md:hidden overflow-y-auto flex flex-col transition-transform duration-400 ease-in-out ${isMobileNavOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              {/* Header with Logo and Close Button - Close only shows when sidebar is open */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <img src={logo} alt="Logo" className="h-16 w-auto" />
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className={`p-1 text-gray-400 hover:text-gray-600 transition-colors ${isMobileNavOpen ? '' : 'hidden'}`}
                  aria-label="Close menu"
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search for items..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#29A56C]"
                />
              </div>

              {/* Menu Items Container - Scrollable */}
              <div className="flex-1 overflow-y-auto">
                <div className="space-y-0 px-2 py-3">
                  {menuItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => {
                              if (item.name === 'Shop') {
                                setIsShopDropdownOpen(!isShopDropdownOpen)
                              } else if (item.name === 'Categories') {
                                setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)
                              }
                            }}
                            className="flex items-center justify-between w-full px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#29A56C]"
                          >
                            <span>{item.name}</span>
                            <FaChevronDown
                              size={12}
                              className={`transition-transform duration-300 text-gray-400 ${
                                (item.name === 'Shop' && isShopDropdownOpen) ||
                                (item.name === 'Categories' && isCategoriesDropdownOpen)
                                  ? 'rotate-180'
                                  : ''
                              }`}
                            />
                          </button>

                          {item.name === 'Shop' && isShopDropdownOpen && (
                            <div className="bg-gray-50 space-y-0 animate-in fade-in duration-200">
                              {shopItems.map((shopItem) => (
                                <a
                                  key={shopItem}
                                  href="#"
                                  className="block px-8 py-2 text-sm text-gray-600 hover:text-[#29A56C]"
                                  onClick={() => setIsMobileNavOpen(false)}
                                >
                                  {shopItem}
                                </a>
                              ))}
                            </div>
                          )}

                          {item.name === 'Categories' && isCategoriesDropdownOpen && (
                            <div className="bg-gray-50 space-y-0 animate-in fade-in duration-200">
                              {categoryItems.map((categoryItem) => (
                                <a
                                  key={categoryItem}
                                  href="#"
                                  className="block px-8 py-2 text-sm text-gray-600 hover:text-[#29A56C]"
                                  onClick={() => setIsMobileNavOpen(false)}
                                >
                                  {categoryItem}
                                </a>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <a
                          href={item.path}
                          className="block px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#29A56C]"
                          onClick={() => setIsMobileNavOpen(false)}
                        >
                          {item.name}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Contact Information */}
              <div className="px-4 py-4 border-b border-gray-200">
                <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase">Our Location</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt size={16} className="text-[#29A56C] mt-1 flex-shrink-0" />
                    <p className="text-xs text-gray-600">123 Main Street, City, Country</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone size={14} className="text-[#29A56C] flex-shrink-0" />
                    <a href="tel:+12345678900" className="text-xs text-[#29A56C] hover:underline">+1 234-567-890</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope size={14} className="text-[#29A56C] flex-shrink-0" />
                    <a href="mailto:info@nest.com" className="text-xs text-[#29A56C] hover:underline">info@nest.com</a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="px-4 py-4 border-b border-gray-200">
                <h3 className="text-xs font-bold text-gray-800 mb-3 uppercase">Follow Us</h3>
                <div className="flex items-center gap-2 justify-center">
                  <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#29A56C] text-white hover:bg-opacity-80 transition-all">
                    <FaFacebook size={16} />
                  </a>
                  <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#29A56C] text-white hover:bg-opacity-80 transition-all">
                    <FaTwitter size={16} />
                  </a>
                  <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#29A56C] text-white hover:bg-opacity-80 transition-all">
                    <FaInstagram size={16} />
                  </a>
                  <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#29A56C] text-white hover:bg-opacity-80 transition-all">
                    <FaLinkedin size={16} />
                  </a>
                  <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#29A56C] text-white hover:bg-opacity-80 transition-all">
                    <FaYoutube size={16} />
                  </a>
                </div>
              </div>

              {/* Copyright */}
              <div className="px-4 py-3 text-center bg-gray-50 text-xs text-gray-600">
                <p>Copyright © 2024 Nest. All rights reserved. Powered by Nest</p>
              </div>
            </div>
        </>

      </div>
    </nav>
  )
}

export default Nav
