'use client'

import { useState } from 'react'
import Image from 'next/image'
import { imageUrl } from '@/lib/ImageUrl'
import { Product } from '@/sanity.types'

// unify image type so TS stops complaining
type GalleryImage = NonNullable<Product['image']>

export default function ProductGallery({ product }: { product: Product }) {
  const images: GalleryImage[] = [
    product.image,
    ...(product.gallery || []),
  ].filter(Boolean) as GalleryImage[]

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className='w-full'>
      {/* Main Image */}
      <div className='relative aspect-square w-full overflow-hidden rounded-xl shadow-lg'>
        <Image
          src={imageUrl(images[activeIndex]).url()}
          alt={product.name || 'Product Image'}
          fill
          className='object-contain'
        />
      </div>

      {/* Thumbnails */}
      <div className='flex gap-3 mt-4 overflow-x-auto pb-2'>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border-2 transition 
              ${activeIndex === i ? 'border-[#670626]' : 'border-transparent'}`}
          >
            <Image
              src={imageUrl(img).url()}
              alt='Product Thumbnail'
              fill
              className='object-cover'
            />
          </button>
        ))}
      </div>
    </div>
  )
}
