import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"


export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
     *[_type == "product"] 
     | order(name asc)
    `)

    try {
      //use sanityFetch to send the Query
      const products = await sanityFetch({
        query: ALL_PRODUCTS_QUERY,
      });

      //return the list of poructs or an empty array if none are found
     return products.data || []
    } catch (error){
      console.error("Error fetching products", error);
      return [];
    }
}