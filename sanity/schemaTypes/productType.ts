// schemas/product.ts
import { TrolleyIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: "product",
  title: "Products",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    // Basic Product Information
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.min(0).required(),
    }),
    // Optional discount price
    defineField({
      name: "discountPrice",
      title: "Discount Price",
      type: "number",
      description: "Optional. Enter a lower price when the product is on sale.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const price = context?.document?.price;
          if (value === undefined || value === null) return true;
          if (typeof value !== "number") {
            return "Discount price must be a number";
          }
          if (typeof price === "number" && value >= price) {
            return "Discount price must be LESS than the regular price";
          }
          return true;
        }),
    }),

    // Categories
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }],
        },
      ],
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),

    // Simple colors array with availability toggle
    defineField({
      name: "colors",
      title: "Available Colors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "color",
              title: "Color",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "available",
              title: "Available?",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: { color: "color", available: "available" },
            prepare({ color, available }) {
              return { title: color, subtitle: available ? "Available" : "Unavailable" };
            },
          },
        },
      ],
    }),

    // Simple sizes array with availability toggle
    defineField({
      name: "sizes",
      title: "Available Sizes",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "size",
              title: "Size",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "available",
              title: "Available?",
              type: "boolean",
              initialValue: true,
            },
          ],
          preview: {
            select: { size: "size", available: "available" },
            prepare({ size, available }) {
              return { title: size, subtitle: available ? "Available" : "Unavailable" };
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "name",
      media: "image",
      price: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        Subtitle: `$${select.price}`,
        media: select.media,
      };
    },
  },
});
