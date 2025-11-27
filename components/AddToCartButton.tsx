'use client'

import { useCartStore } from '@/app/(store)/store'
import { Product } from '@/sanity.types'
import { Minus, Plus } from 'lucide-react'
import { toast } from 'sonner'

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

  const handleAdd = () => {
    if (disabled) return
    addItem(product)

    toast.success(`Added ${product.name} to your cart!`, {
      duration: 1800,
    })
  }

  const handleRemove = () => {
    if (itemCount <= 0) return

    removeItem(product._id)

    if (itemCount === 1) {
      toast.success(`Removed ${product.name} from your cart`, {
        duration: 1800,
      })
    }
  }

  return (
    <div className='flex items-center gap-4'>
      {/* Minus */}
      <button
        onClick={handleRemove}
        disabled={itemCount === 0}
        className={`
          w-11 h-11 flex cursor-pointer items-center justify-center rounded-xl border text-[15px]
          transition-all duration-300 shadow-sm backdrop-blur
          ${
            itemCount === 0
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white hover:border-red-500 active:scale-90'
          }
        `}
      >
        <Minus size={18} />
      </button>

      {/* Quantity */}
      <span className='min-w-8 text-center text-xl font-semibold text-gray-900'>
        {itemCount}
      </span>

      {/* Plus */}
      <button
        onClick={handleAdd}
        disabled={disabled}
        className={`
          w-11 h-11 flex cursor-pointer items-center justify-center rounded-xl border text-[15px]
          transition-all duration-300 shadow-sm backdrop-blur
          ${
            disabled
              ? 'border-gray-200 text-gray-300 cursor-not-allowed'
              : 'border-gray-300 text-gray-700 hover:bg-green-500 hover:text-white hover:border-green-500 active:scale-90'
          }
        `}
      >
        <Plus size={18} />
      </button>
    </div>
  )
}
