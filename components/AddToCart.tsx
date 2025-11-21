'use client'

import { Button } from '@/components/ui/button'
import useCartStore from '@/app/(store)/store'
import { Product } from '@/sanity.types'
import { cn } from '@/lib/utils'

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export default function AddToCart({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useCartStore()

  return (
    <Button
      size='lg'
      onClick={() => !disabled && addItem(product)}
      disabled={disabled}
      className={cn(
        'w-full sm:w-[60%] md:w-[50%] lg:w-auto py-5 md:py-6 px-6 md:px-8 text-base md:text-lg font-semibold rounded-xl uppercase',
        disabled ? 'cursor-not-allowed opacity-50' : ''
      )}
    >
      {disabled ? 'Out of Stock' : 'Add To Cart'}
    </Button>
  )
}
