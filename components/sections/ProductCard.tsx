'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/sanity.types'
import { imageUrl } from '@/lib/ImageUrl'
import { Star } from 'lucide-react'

// EXTENDED TYPE (safe & optional, doesn't break Sanity)
type ProductWithRatings = Product & {
  ratings?: Array<{
    rating: number | null
    userName: string | null
    title: string | null
    comment: string | null
  }>
  reviews?: Array<{
    rating: number | null
    userName: string | null
    title: string | null
    comment: string | null
  }>
}

export default function ProductCard({
  product,
}: {
  product: ProductWithRatings
}) {
  const isOutOfStock = product.stock != null && product.stock <= 0
  const price = typeof product.price === 'number' ? product.price : undefined
  const discount =
    typeof product.discountPrice === 'number'
      ? product.discountPrice
      : undefined

  // ⭐ Average rating safely
  const avgRating =
    product.ratings && product.ratings.length > 0
      ? (
          product.ratings.reduce((sum, r) => sum + (r.rating ?? 0), 0) /
          product.ratings.length
        ).toFixed(1)
      : null

  const reviewCount = product.reviews?.length ?? 0

  // extract text description
  const description = product.description
    ? product.description
        .map((block) =>
          block._type === 'block'
            ? block.children?.map((child) => child.text).join('')
            : ''
        )
        .join('')
    : 'No description available'

  const truncatedDescription =
    description.length > 100
      ? description.substring(0, 90) + '...'
      : description

  const percentOff =
    price && discount && price > 0
      ? Math.round(((price - discount) / price) * 100)
      : null

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col items-start justify-between gap-4 p-5 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
        isOutOfStock ? 'opacity-50 pointer-events-none' : ''
      } max-w-[300px] h-[440px] shrink-0 bg-white`}
    >
      {/* Image + Sale Badge */}
      <div className='relative w-full h-[220px] overflow-hidden rounded-lg'>
        {discount && (
          <span className='absolute top-3 left-3 z-10 inline-block px-2 py-1 text-xs font-semibold rounded-md bg-[#D9004C] text-white shadow'>
            {percentOff ? `${percentOff}% OFF` : 'Sale'}
          </span>
        )}

        {product.image && (
          <Image
            className='object-cover transition-transform duration-300'
            src={imageUrl(product.image).url()}
            alt={product.name || 'Product Image'}
            fill
          />
        )}

        {isOutOfStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg'>
            <span className='text-white text-sm font-semibold'>
              Out of stock
            </span>
          </div>
        )}
      </div>

      {/* Text Content */}
      <div className='w-full flex flex-col justify-between h-[170px]'>
        <div>
          <h2 className='text-lg font-semibold text-gray-800'>
            {product.name}
          </h2>

          <p className='mt-2 text-sm text-gray-600 line-clamp-3'>
            {truncatedDescription}
          </p>

          {/* ⭐ Rating Preview */}
          <div className='flex items-center gap-1 mt-2'>
            <Star className='w-4 h-4 text-yellow-500 fill-yellow-500' />

            <span className='text-sm font-medium'>
              {avgRating ? avgRating : '0.0'}
            </span>

            <span className='text-xs text-gray-500'>
              ({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className='mt-3 flex items-baseline gap-3'>
          {discount && price ? (
            <>
              <div className='text-lg font-bold text-gray-900'>
                ${discount.toFixed(2)}
              </div>
              <div className='text-sm text-gray-500 line-through'>
                ${price.toFixed(2)}
              </div>
            </>
          ) : price ? (
            <div className='text-lg font-bold text-gray-900'>
              ${price.toFixed(2)}
            </div>
          ) : (
            <div className='text-lg font-bold text-gray-900'>—</div>
          )}
        </div>
      </div>
    </Link>
  )
}
