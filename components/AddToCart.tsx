'use client'

import { Button } from '@/components/ui/button'
import { Product } from '@/sanity.types'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/app/(store)/store'
import { toast } from 'sonner'


interface AddToCartProps {
  product: Product
  disabled?: boolean
  className?: string
}

export default function AddToCart({
  product,
  disabled,
  className,
}: AddToCartProps) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    if (disabled) return

    // Add to cart
    addItem(product)

    // Toast Notification
    toast.success(`Added ${product.name} to your cart!`, {
      duration: 2000,
    })
  }

  return (
    <Button
      size='lg'
      onClick={handleAdd}
      disabled={disabled}
      className={cn(
        `
        bg-black 
        hover:bg-[#bf0042]
        text-white font-medium
        transition-all shadow-sm hover:ring-2 hover:shadow
        rounded-lg

        /* Product Card Y size */
        px-4 py-3 text-sm

        /* Larger on product page */
        md:py-3.5 md:text-base md:rounded-xl
        lg:py-4 lg:text-lg

        ${disabled ? 'opacity-50 cursor-not-allowed hover:bg-[#D9004C]' : ''}
      `,
        className
      )}
    >
      {disabled ? 'Out of Stock' : 'Add To Cart'}
    </Button>
  )
}
