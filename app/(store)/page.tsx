import ProductsView from "@/components/sections/ProductsView";
import SaleBanner from "@/components/sections/SaleBanner";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";

import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export const dynamic = 'force-static'
export const revalidate = 60;

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();
  return (
    <div className='px-2 md:px-6 xl:px-10'>
      <SaleBanner />
      <div>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  )
}
