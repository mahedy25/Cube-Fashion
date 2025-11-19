import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { salesType } from './saleType'



export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    blockContentType,
    categoryType,
    orderType,
    salesType
  ],
}
