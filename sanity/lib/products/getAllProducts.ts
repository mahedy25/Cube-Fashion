import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"

export const getAllProducts = async () => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type == "product"]{
      ...,
      
      // ⭐ Fetch all ratings only (numbers only)
      "ratings": *[
        _type == "review" && product._ref == ^._id
      ]{
        rating
      },

      // ⭐ Fetch full reviews
      "reviews": *[
        _type == "review" && product._ref == ^._id
      ]{
        rating,
        userName,
        title,
        comment
      }
    } | order(_createdAt desc)
  `)

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    })

    return products.data || []
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}
