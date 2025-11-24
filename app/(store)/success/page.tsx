'use client'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useCartStore } from '../store'

export default function Success() {
  const searchParams = useSearchParams()
  const orderNumber = searchParams.get('orderNumber')
  const sessionId = searchParams.get('session_id')
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    // Only clear cart if we have both order number and session id (ensures successful payment)
    if (orderNumber && sessionId) {
      console.log('Order Number:', orderNumber)
      console.log('Payment successful, clearing cart...')

      clearCart() // Clear Zustand state
      useCartStore.persist.clearStorage() // Clear persisted cart in localStorage

      // Force a re-render by updating a local state (this can help reset cart count if needed)
      // You can use a dummy state trigger here if necessary
    }
  }, [orderNumber, sessionId, clearCart])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6'>
      <div className='flex flex-col items-center mb-12'>
        <div className='flex justify-center mb-6'>
          <div className='h-20 w-20 bg-green-100 rounded-full flex items-center justify-center shadow-lg'>
            <svg
              className='h-12 w-12 text-green-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 13l4 4L19 7'
              />
            </svg>
          </div>
        </div>
        <h1 className='text-3xl font-semibold text-green-700 text-center mb-4'>
          Thanks for Your Order!
        </h1>
        <p className='text-lg text-gray-600 text-center'>
          Your order is being processed.
        </p>
        <div className='space-y-2'>
          {orderNumber && (
            <p className='text-lg text-gray-600 text-center'>
              Order Number: {orderNumber}
            </p>
          )}
          {sessionId && (
            <p className='text-lg text-gray-600 text-center'>
              Session ID: {sessionId}
            </p>
          )}
        </div>
      </div>
      <div className='space-y-4'>
        <p className='text-gray-600'>
          A confirmation email will be sent to your email address.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button asChild className='bg-green-500 hover:bg-green-700'>
            <Link href='/orders'>View Order History</Link>
          </Button>
          <Button asChild variant='outline'>
            <Link href='/'>Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
