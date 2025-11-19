import Image from 'next/image'

import { Button } from '../ui/button'
import { getActiveSaleByCouponCode } from '@/sanity/lib/sales/getActiveSaleByCouponCode'
import { COUPON_CODES } from '@/sanity/lib/sales/couponCodes'

export default async function SaleBanner() {
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.BFRIDAY25)

  if (!sale?.isActive) return null

  return (
  
    <div className='bg-linear-to-r from-[#670626] to-[#D9004C] text-white py-8 px-6 sm:px-10 font-semibold shadow-lg rounded-lg flex flex-col sm:flex-row items-center sm:items-center justify-between'>
      {/* Left Side - Text */}
      <div className='sm:w-1/2 text-center sm:text-left mb-6 sm:mb-0 flex flex-col justify-center'>
        <h2 className='text-2xl sm:text-4xl font-bold'>🎉 {sale.title}</h2>
        <p className='mt-3 text-lg sm:text-xl'>{sale.description}</p>
        <div className='mt-4'>
          <h3 className='text-lg sm:text-xl font-semibold'>
            Use Code:{' '}
            <span className='font-bold text-yellow-300'>{sale.couponCode}</span>
          </h3>
          <h4 className='text-md sm:text-lg mt-1'>
            for <span className='font-bold'>{sale.discountAmount}%</span> off <span>on a $30 or more purchase</span>
          </h4>
        </div>
        <div>
          <Button className='mt-6 uppercase'>Shop Now</Button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className='hidden sm:w-1/2 mt-6 sm:mt-0 md:flex justify-center sm:justify-end'>
        <Image
          src='/images/sale.jpg' // Add your sale-related image here
          alt='Weekend Sale'
          width={250} // Adjust the width and height as needed
          height={250}
          className='object-contain rounded-lg shadow-xl'
        />
      </div>
    </div>
  )
}
