import { Link } from 'react-router-dom'

import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-[#2d2a30] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Copyright Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-[#22C55E] text-2xl font-bold">Alam</span>
              <span className="text-white text-2xl">kitab</span>
            </Link>
            <p className="text-sm text-gray-400">
              Copyright © 2024 Alamkitab. All rights reserved.
            </p>
            <div className="text-sm text-gray-400">
              Website developed by <a href="#" className="text-[#F59E0B] hover:text-[#F59E0B]/80">Wahaj</a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <HiLocationMarker className="w-5 h-5" />
              <span>Karachi, Pakistan</span>
            </div>
            <div className="flex items-center space-x-2">
              <HiPhone className="w-5 h-5" />
              <a href="tel:+923322440544" className="text-[#22C55E] hover:text-[#22C55E]/80">
                +92 332 2440544
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <HiMail className="w-5 h-5" />
              <a href="mailto:contactus@alamkitab.com" className="hover:text-[#22C55E]">
                contactus@alamkitab.com
              </a>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="text-sm leading-relaxed">
            <p>
              Welcome to Alamkitab, Discover a one-stop online bookstore delivering across Pakistan! 
              Explore a wide range of books and enjoy convenient online printing services for 
              all your personal and business needs. Fast delivery, easy ordering, and reliable service!
            </p>
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-white hover:text-[#22C55E]" aria-label="Facebook">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-[#22C55E]" aria-label="Instagram">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-white hover:text-[#22C55E]" aria-label="TikTok">
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 