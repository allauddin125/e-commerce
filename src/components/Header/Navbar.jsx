import React, { useState } from 'react'
import { FiSearch, FiMenu, FiHeart, FiShoppingCart, FiUser, FiPackage, FiLogOut } from 'react-icons/fi'
import { FaChevronDown } from 'react-icons/fa'
import logo from '../../assets/images/logo/logo1.png'

const Navbar = ({ isMobileNavOpen = false, setIsMobileNavOpen }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [isAccountOpen, setIsAccountOpen] = useState(false)

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
  ]

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Categories */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="E-Shop Logo"
                  className="h-20 w-auto object-contain"
                />
              </a>
            </div>

            {/* Categories Dropdown - Hidden on Mobile */}
            <div className="hidden md:block relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#29A56C] transition-colors duration-200"
              >
                <span>{selectedCategory}</span>
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setSelectedCategory('All Categories')
                      setIsCategoryOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#29A56C] rounded-t-lg transition-colors duration-200"
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsCategoryOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#29A56C] last:rounded-b-lg transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Section - Search Bar - Hidden on Mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#29A56C] focus:ring-1 focus:ring-[#29A56C] transition-all duration-200"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#29A56C] transition-colors duration-200">
                <FiSearch size={18} />
              </button>
            </div>
          </div>

          {/* Right Section - Icons */}
          <div className="flex items-center gap-2 sm:gap-6">
            {/* Mobile Menu Toggle - Hamburger only */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className={`p-2 text-gray-700 hover:text-[#29A56C] hover:bg-gray-100 rounded transition-all z-50 ${!isMobileNavOpen ? 'md:hidden' : 'hidden'}`}
              aria-label="Toggle menu"
            >
              <FiMenu size={24} />
            </button>

            {/* Wishlist Icon with Text */}
            <a
              href="#wishlist"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200 relative"
            >
              <FiHeart size={20} />
              <span className="text-sm font-medium">Wishlist</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                3
              </span>
            </a>

            {/* Wishlist Icon Mobile */}
            <a
              href="#wishlist"
              className="sm:hidden relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200"
            >
              <FiHeart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                3
              </span>
            </a>

            {/* Cart Icon with Text */}
            <a
              href="#cart"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200 relative"
            >
              <FiShoppingCart size={20} />
              <span className="text-sm font-medium">Cart</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                2
              </span>
            </a>

            {/* Cart Icon Mobile */}
            <a
              href="#cart"
              className="sm:hidden relative flex items-center justify-center w-10 h-10 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200"
            >
              <FiShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-sm">
                2
              </span>
            </a>

            {/* Account Icon with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsAccountOpen(true)}
              onMouseLeave={() => setIsAccountOpen(false)}
            >
              {/* Account Button with Text */}
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200"
              >
                <FiUser size={20} />
                <span className="text-sm font-medium">Account</span>
              </button>

              {/* Account Icon Mobile */}
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="sm:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-white hover:bg-[#29A56C] rounded-lg transition-all duration-200"
              >
                <FiUser size={20} />
              </button>

              {/* Account Dropdown Menu */}
              {isAccountOpen && (
                <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="#my-account"
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#29A56C] rounded-t-lg transition-all duration-200"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FiUser size={18} className="flex-shrink-0" />
                    <span>My Account</span>
                  </a>
                  <a
                    href="#order-tracking"
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#29A56C] transition-all duration-200"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FiPackage size={18} className="flex-shrink-0" />
                    <span>Order Tracking</span>
                  </a>
                  <a
                    href="#wishlist"
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#29A56C] transition-all duration-200"
                    onClick={() => setIsAccountOpen(false)}
                  >
                    <FiHeart size={18} className="flex-shrink-0" />
                    <span>Wishlist</span>
                  </a>
                  <button
                    className="flex items-center gap-3 w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-b-lg transition-all duration-200 border-t border-gray-100"
                    onClick={() => {
                      setIsAccountOpen(false)
                      // Add logout logic here
                    }}
                  >
                    <FiLogOut size={18} className="flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-[#29A56C] focus:ring-1 focus:ring-[#29A56C] transition-all duration-200"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#29A56C] transition-colors duration-200">
              <FiSearch size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>  )
}

export default Navbar
