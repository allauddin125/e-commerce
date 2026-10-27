import React from 'react'

const TopHeader = () => {
  return (
    <header className="bg-[#29A56C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile - Promotional Text Only */}
        <div className="md:hidden text-center py-3 text-xs font-semibold text-white">
          FREE SHIPPING WORLDWIDE FOR ORDERS OVER $100
        </div>

        {/* Desktop - All Three Sections */}
        <div className="hidden md:flex items-center justify-between py-3 gap-4 relative">
          {/* Left Side - Navigation Links */}
          <div className="flex items-center gap-3 text-sm text-white">
            <a
              href="#about"
              className="hover:text-gray-100 transition-colors duration-200"
            >
              About Us
            </a>
            <span className="text-white/50">|</span>
            <a
              href="#account"
              className="hover:text-gray-100 transition-colors duration-200"
            >
              My Account
            </a>
            <span className="text-white/50">|</span>
            <a
              href="#wishlist"
              className="hover:text-gray-100 transition-colors duration-200"
            >
              Wishlist
            </a>
            <span className="text-white/50">|</span>
            <a
              href="#tracking"
              className="hover:text-gray-100 transition-colors duration-200"
            >
              Order Tracking
            </a>
          </div>

          {/* Center - Promotional Text */}
          <div className="absolute left-1/2 transform -translate-x-1/2 text-center text-xs font-semibold text-white px-4">
            FREE SHIPPING WORLDWIDE FOR ORDERS OVER $100
          </div>

          {/* Right Side - Help Text and Phone */}
          <div className="flex items-center gap-2 text-sm text-white whitespace-nowrap ml-auto">
            <span>Need Help? Call Us:</span>
            <a
              href="tel:+18009000"
              className="font-semibold hover:text-gray-100 transition-colors duration-200"
            >
              +1 800 900
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default TopHeader
