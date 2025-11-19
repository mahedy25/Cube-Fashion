import ProductGrid from '@/components/sections/ProductGrid'
import { Button } from '@/components/ui/button'
import { searchPruductsByName } from '@/sanity/lib/products/searchPruductsByName'

export default async function Search({
  searchParams,
}: {
  searchParams: {
    query: string
  }
}) {
  const { query } = await searchParams
  const products = await searchPruductsByName(query)

  if (!products.length) {
    return (
      <div className='flex items-center justify-center min-h-screen p-6'>
        <div className='bg-white p-8 rounded-lg shadow-lg text-center w-full max-w-md'>
          <h1 className='text-3xl font-semibold text-[#670626]'>
            No products found for <span className='text-red-500'>{query}</span>
          </h1>
          <p className='mt-4 text-sm text-gray-500'>
            Sorry, we couldn&apos;t find anything matching your search. Try
            again later.
          </p>
          <Button className='mt-6 w-full text-sm py-2 bg-[#D9004C] text-white hover:bg-[#670626] rounded-md transition-all'>
            Back to Shop
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center justify-start min-h-screen bg-gray-50 p-6'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-full '>
        <h1 className='text-3xl font-semibold text-[#670626] mb-6 text-center'>
          Search results for{' '}
          <span className='font-bold text-[#198a0b]'>{query}</span>
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  )
}
