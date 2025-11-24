'use client'

import { useCartStore } from '@/app/(store)/store'
import { Product } from '@/sanity.types'

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export default function AddToCartButton({
  product,
  disabled,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const itemCount = useCartStore((s) => s.getItemCount(product._id))

  return (
    <div className='flex items-center justify-center space-x-2'>
      {/* Remove */}
      <button
        onClick={() => removeItem(product._id)}
        disabled={itemCount === 0}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
          itemCount === 0
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        <span className='text-xl font-bold text-gray-700'>-</span>
      </button>

      {/* Quantity */}
      <span className='w-8 text-center font-semibold'>{itemCount}</span>

      {/* Add */}
      <button
        onClick={() => addItem(product)}
        disabled={disabled}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
          disabled
            ? 'bg-gray-200 cursor-not-allowed'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
      >
        <span className='text-2xl font-bold text-gray-700'>+</span>
      </button>
    </div>
  )
}
