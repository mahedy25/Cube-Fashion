import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className='bg-[#0f0f0f] text-gray-300 pt-16 pb-10'>
      {/* Top Section */}
      <div className='container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12'>
        {/* Brand */}
        <div>
          <h2 className='text-2xl font-bold text-white tracking-wide'>
            YourBrand
          </h2>
          <p className='mt-4 text-sm text-gray-400 leading-relaxed'>
            Premium quality products delivered straight to your doorstep.
            Experience the best with YourBrand.
          </p>

          {/* Social Icons */}
          <div className='flex gap-4 mt-6'>
            <Link href='#' className='hover:text-white transition'>
              <Facebook size={20} />
            </Link>
            <Link href='#' className='hover:text-white transition'>
              <Instagram size={20} />
            </Link>
            <Link href='#' className='hover:text-white transition'>
              <Twitter size={20} />
            </Link>
            <Link href='#' className='hover:text-white transition'>
              <Youtube size={20} />
            </Link>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>Shop</h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li>
              <Link className='hover:text-white' href='/products'>
                All Products
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/on-sale'>
                On Sale
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/categories'>
                Categories
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/new-arrivals'>
                New Arrivals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>
            Customer Support
          </h3>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li>
              <Link className='hover:text-white' href='/help'>
                Help Center
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/shipping'>
                Shipping Info
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/returns'>
                Returns & Refunds
              </Link>
            </li>
            <li>
              <Link className='hover:text-white' href='/contact'>
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className='text-lg font-semibold text-white mb-4'>
            Join Our Newsletter
          </h3>
          <p className='text-sm text-gray-400 mb-4'>
            Be the first to hear about new products and exclusive offers.
          </p>

          <form className='flex items-center'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-4 py-2 w-full rounded-l-md bg-gray-800 text-gray-200 border border-gray-700 focus:outline-none focus:border-[#D9004C]'
            />
            <button
              type='submit'
              className='px-4 py-2 bg-[#D9004C] hover:bg-[#A5003D] text-white font-semibold rounded-r-md transition'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-800 my-15 sm:my-20 pt-6'>
        <p className='text-center text-sm text-gray-500'>
          © {new Date().getFullYear()} YourBrand — All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}
