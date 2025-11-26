import AddToCart from '@/components/AddToCart'
import ProductGallery from '@/components/sections/ProductGallary'
import ReviewForm from '@/components/ReviewForm'

import { getProductBySlug } from '@/sanity/lib/products/getProductBySlug'
import { PortableText } from 'next-sanity'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = 60

export default async function Product({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return notFound()

  const price = typeof product.price === 'number' ? product.price : undefined
  const discount =
    typeof product.discountPrice === 'number'
      ? product.discountPrice
      : undefined

  const percentOff =
    price && discount ? Math.round(((price - discount) / price) * 100) : null

  const isOutOfStock = product.stock != null && product.stock <= 0

  // ⭐ Average rating
  const avgRating = product.ratings?.length
    ? (
        product.ratings.reduce((sum, r) => sum + (r.rating || 0), 0) /
        product.ratings.length
      ).toFixed(1)
    : null

  return (
    <div className='container mx-auto px-6 py-16 min-h-svh'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
        {/* Product Image Gallery */}
        <ProductGallery product={product} />

        {/* Product Details */}
        <div className='flex flex-col justify-start'>
          <div>
            <h1 className='text-4xl sm:text-5xl font-bold text-[#670626] mb-2'>
              {product.name}
            </h1>

            {/* ⭐ Rating Display */}
            {avgRating ? (
              <p className='text-yellow-600 text-lg mb-4'>
                ⭐ {avgRating} / 5 ({product.reviews?.length || 0} reviews)
              </p>
            ) : (
              <p className='text-gray-500 mb-4'>No ratings yet</p>
            )}

            {/* Pricing */}
            <div className='mb-4'>
              {discount && price ? (
                <div className='flex items-baseline gap-4'>
                  <div className='text-3xl font-extrabold text-gray-900'>
                    ${discount.toFixed(2)}
                  </div>

                  <div className='text-lg text-gray-500 line-through'>
                    ${price.toFixed(2)}
                  </div>

                  {percentOff !== null && (
                    <div className='ml-2 inline-block px-2 py-1 text-sm font-semibold bg-[#D9004C] text-white rounded'>
                      Save {percentOff}%
                    </div>
                  )}
                </div>
              ) : price ? (
                <div className='text-2xl font-semibold text-gray-800'>
                  ${price.toFixed(2)}
                </div>
              ) : (
                <div className='text-2xl font-semibold text-gray-800'>—</div>
              )}
            </div>

            {/* Description */}
            <div className='prose max-w-none text-gray-700'>
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>
          </div>

          {/* Add To Cart Button */}
          <div className='my-8'>
            <AddToCart product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>

      {/* ⭐ Review Form */}
      <ReviewForm productId={product._id} />

      {/* ⭐ Review List */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>

        {product.reviews?.length ? (
          product.reviews.map((review, i) => (
            <div
              key={i}
              className='border p-5 rounded-xl mb-4 bg-gray-50 shadow-sm'
            >
              <p className='text-yellow-600 text-lg mb-1'>
                {'★'.repeat(review.rating || 0)}
                {'☆'.repeat(5 - (review.rating || 0))}
              </p>

              <h3 className='font-semibold'>{review.title}</h3>

              <p className='text-sm text-gray-500 mb-2'>by {review.userName}</p>

              <p className='text-gray-700'>{review.comment}</p>
            </div>
          ))
        ) : (
          <p className='text-gray-600'>
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  )
}
