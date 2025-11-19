// schemas/blockContentType.ts

import { defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block", // Defines rich text content
      title: "Text",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
      },
    },
    {
      type: "image", // Allows images within block content
      title: "Image",
      options: {
        hotspot: true, // Enable image hotspot for resizing
      },
    },
  ],
});
