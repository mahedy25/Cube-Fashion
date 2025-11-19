import { Category, Product } from '@/sanity.types'
import ProductGrid from './ProductGrid'
import { CategorySelector } from './CategorySelector'

interface ProductsViewProps {
  products: Product[]
  categories: Category[]
}

const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className='flex flex-col gap-6 p-4'>
      {/* Categories Section */}
      <div className='justify-center md:justify-start items-center flex'>
        <div className='w-[200px]'>
          <CategorySelector categories={categories} />
        </div>
      </div>

      {/* Products Section */}
      <div className='w-full bg-white p-4 rounded-lg shadow-md'>
        {/* Render All The Products */}
        <ProductGrid products={products} />
      </div>
    </div>
  )
}

export default ProductsView
