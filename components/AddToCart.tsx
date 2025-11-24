'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/sanity.types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/app/(store)/store'

interface AddToCartProps {
  product: Product
  disabled?: boolean
}

export default function AddToCart({ product, disabled }: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem)

  return (
    <Button
      size='lg'
      onClick={() => !disabled && addItem(product)}
      disabled={disabled}
      className={cn(
        'w-full sm:w-[60%] md:w-[50%] lg:w-auto py-5 md:py-6 px-8 text-base md:text-lg font-semibold rounded-xl uppercase',
        disabled ? 'cursor-not-allowed opacity-50' : ''
      )}
    >
      {disabled ? 'Out of Stock' : 'Add To Cart'}
    </Button>
  )
}
