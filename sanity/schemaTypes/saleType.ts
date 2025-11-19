import { ArrowUpDown } from "lucide-react";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
  name: "sale",
  title: "Sale",
  type: "document",
  icon: ArrowUpDown,
  fields: [
    // Basic Product Information
    defineField({
      name: "title",
      title: "Sale Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "discountAmount",
      title: "Discount Amount",
      type: "number",
      description: "Discount amount in percentage or fixed value",
    }),
    defineField({
      name: "couponCode",
      title: "Coupon Code",
      type: "string",
    }),
    defineField({
      name: "validFrom",
      title: "Valid From",
      type: "datetime",
    }),
    defineField({
      name: "validTill",
      title: "Valid Till",
      type: "datetime",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Toggle to activate or deactivate the sale",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      discountAmount: "discountAmount",
      couponCode: "couponCode",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, discountAmount, couponCode, isActive } = selection;
      const status = isActive ? "Active" : "Inactive";
      return {
        title: title,
        subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
      };
    },
  },
});
