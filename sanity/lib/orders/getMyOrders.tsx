import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
  if (!userId) {
    throw new Error('User Id is required')
  }
  //Define the query to get orders based on user Id, sorted by orderDate in descending order

  const MY_ORDERS_QUERY = defineQuery(`
  *[_type == 'order' && clerkUserId == $userId] | order(orderDate desc){
      ...,
      products[]{
        ...,
        product->
      }
    }
`)

    try{
      //use sanityFetch to send the Query
      const orders = await sanityFetch({
        query: MY_ORDERS_QUERY,
        params: { userId },
      });

      //return the list of poructs or an empty array if none are found
      return orders.data || []
    } catch (error){
      console.error("Error fetching orders", error);
      return [];
    }
}