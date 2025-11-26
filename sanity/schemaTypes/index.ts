import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './productType'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { orderType } from './orderType'
import { salesType } from './saleType'
import navigationType from './navigationType'
import newsletterType from './newsletterType'
import contact from './contact'
import review from './review'








export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    productType,
    blockContentType,
    categoryType,
    orderType,
    salesType,
    navigationType,
    newsletterType,
    contact,
    review
  ],
}
