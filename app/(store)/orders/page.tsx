export const dynamic = 'force-dynamic'
import { formatCurrency } from '@/lib/formatCurrency'
import { imageUrl } from '@/lib/ImageUrl'
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders'
import { auth } from '@clerk/nextjs/server'
import { Cinzel } from 'next/font/google'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const cinzel = Cinzel({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

export default async function Orders() {
  const { userId } = await auth()

  if (!userId) return redirect('/')

  const orders = await getMyOrders(userId)

  return (
    <div className='min-h-screen py-16 px-4 bg-[#FAF8F7] flex justify-center'>
      <div className='w-full max-w-5xl'>
        <h1
          className={`${cinzel.className} text-3xl md:text-4xl font-semibold text-[#670626] text-center`}
        >
          My Orders
        </h1>

        <div className='w-40 h-1 bg-linear-to-r from-[#670626] via-[#D9004C] to-[#670626] mx-auto mt-3 rounded-full'></div>

        {!orders || orders.length === 0 ? (
          <div className='text-center text-gray-600 py-20'>
            <p className='text-lg'>You haven’t placed any orders yet.</p>
          </div>
        ) : (
          <div className='mt-12 space-y-10'>
            {orders.map((order, index) => (
              <div
                key={order._id ?? order.orderNumber ?? index}
                className='bg-white rounded-2xl shadow-md hover:shadow-lg transition border border-gray-100'
              >
                {/* ORDER HEADER */}
                <div className='p-6 border-b border-gray-200'>
                  <div className='flex flex-col md:flex-row md:justify-between gap-6'>
                    <div>
                      <p className='text-sm text-gray-700 font-medium'>
                        Order Number
                      </p>
                      <p className='font-mono text-sm text-[#670626] mt-1 break-all'>
                        {order.orderNumber ?? 'Unknown'}
                      </p>
                    </div>

                    <div className='md:text-right'>
                      <p className='text-sm text-gray-700 font-medium'>
                        Order Date
                      </p>
                      <p className='mt-1 text-gray-900'>
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : 'N/A'}
                      </p>
                    </div>
                  </div>

                  {/* STATUS + TOTAL */}
                  <div className='mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-6'>
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-700 font-medium'>
                        Status:
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                          order.status === 'paid'
                            ? 'bg-green-100 text-green-700 border border-green-200'
                            : 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                        }`}
                      >
                        {order.status ?? 'pending'}
                      </span>
                    </div>

                    <div className='md:text-right'>
                      <p className='text-sm text-gray-700 font-medium'>
                        Total Amount
                      </p>
                      <p className='text-xl font-bold text-[#670626] mt-1'>
                        {formatCurrency(order.totalPrice ?? 0, order.currency)}
                      </p>
                    </div>
                  </div>

                  {/* DISCOUNT */}
                  {order.amountDiscount ? (
                    <div className='mt-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                      <p className='text-red-600 font-medium'>
                        Discount Applied:{' '}
                        {formatCurrency(order.amountDiscount, order.currency)}
                      </p>
                      <p className='text-sm text-gray-700 mt-1'>
                        Original Subtotal:{' '}
                        {formatCurrency(
                          (order.totalPrice ?? 0) + order.amountDiscount,
                          order.currency
                        )}
                      </p>
                    </div>
                  ) : null}
                </div>

                {/* ORDER ITEMS */}
                <div className='p-6'>
                  <p className='text-sm font-semibold text-gray-700 mb-4'>
                    Order Items
                  </p>

                  <div className='space-y-4'>
                    {order.products?.map((product, i) => (
                      <div
                        key={product._key ?? `${order._id}-product-${i}`}
                        className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b last:border-none'
                      >
                        <div className='flex items-center gap-4'>
                          {product.product?.image && (
                            <div className='relative h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden shadow-sm'>
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product?.name ?? ''}
                                fill
                                className='object-cover'
                              />
                            </div>
                          )}

                          <div>
                            <p className='font-medium text-gray-900'>
                              {product.product?.name ?? 'Unknown product'}
                            </p>
                            <p className='text-sm text-gray-700 mt-1'>
                              Quantity: {product.quantity ?? 1}
                            </p>
                          </div>
                        </div>

                        <p className='text-right font-semibold text-gray-900'>
                          {product.product?.price && product.quantity
                            ? formatCurrency(
                                product.product.price * product.quantity,
                                order.currency
                              )
                            : 'N/A'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
