'use client'


import useCartStore from '@/app/(store)/store'
import { Product } from '@/sanity.types'
import { useEffect, useState } from 'react'

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem, removeItem, getItemCount } = useCartStore()
  const itemCount = getItemCount()(product._id) // Call getItemCount as a function first, then pass product._id

  const [isClient, setIsClient] = useState(false)

  // Use useEffect to set isClient to true after component mounts
  useEffect(() => {
    // Use setTimeout to delay state change and ensure it only happens once on client-side
    if (typeof window !== 'undefined' && !isClient) {
      setTimeout(() => setIsClient(true), 0) // Delay the state update to avoid synchronous issues
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array ensures it runs only once after mount

  // If it's not client-side, don't render anything (to prevent hydration mismatch errors)
  if (!isClient) {
    return null
  }

  return (
    <div className='flex items-center justify-center space-x-2'>
      <button
        onClick={() => removeItem(product._id)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          itemCount === 0
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
        } `}
        disabled={itemCount === 0 || disabled}
      >
        <span
          className={`text-xl font-bold ${
            itemCount === 0 ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          -
        </span>
      </button>
      <span className='w-8 text-center font-semibold'>{itemCount}</span>
      <button
        onClick={() => addItem(product)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
          disabled
            ? 'bg-gray-100 cursor-not-allowed'
            : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
        }`}
        disabled={disabled}
      >
        <span className='text-2xl font-bold'>+</span>
      </button>
    </div>
  )
}

export default AddToCartButton
