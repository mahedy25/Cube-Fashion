import Fuse from 'fuse.js'
import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const searchPruductsByName = async (searchParamm: string) => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
      _type == "product"
    ] | order(name asc)
  `)

  try {
    // Fetch all products from Sanity
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {},  // No need to filter here; Fuse.js will handle it
    })

    // Initialize Fuse.js with product names and descriptions for fuzzy search
    const fuse = new Fuse(products.data, {
      keys: ['name', 'description'],  // You can add other fields here if needed
      threshold: 0.3,  // Adjust the fuzziness (0 is exact match, 1 is full tolerance)
      includeScore: true,  // Optional: to get the match score
    })

    // Perform the search
    const results = fuse.search(searchParamm)
    
    // Return the matched products
    const formattedResults = results.map(result => result.item)

    return formattedResults
  } catch (error) {
    console.error('Error fetching products by name:', error)
    return []
  }
}
