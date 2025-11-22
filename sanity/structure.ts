import {
  InlineIcon,
} from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Cube Fashion")
    .items([
      S.documentTypeListItem("product").title("Products"),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("order").title("Orders"),
      S.documentTypeListItem("sale").title("Sales"),
      S.documentTypeListItem("newsletter").title("Newsletter Subscriptions"),
      S.documentTypeListItem("navigation").title("Navigation"),

      S.divider(),

      // --- Contact Section Inserted Here ---
      S.listItem()
        .title("Contact Form Submissions")
        .icon(InlineIcon)
        .child(
          S.list()
            .title("Contact Form Submissions")
            .items([
              S.listItem()
                .title("New Submissions")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("New Submissions")
                    .filter('_type == "contact" && status == "new"'),
                ),

              S.listItem()
                .title("Archived")
                .icon(InlineIcon)
                .child(
                  S.documentTypeList("contact")
                    .title("Archived Submissions")
                    .filter('_type == "contact" && status == "archived"'),
                ),
            ]),
        ),

      S.divider(),

      // Keep all other leftover schema types
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          ![
            "product",
            "category",
            "order",
            "sale",
            "newsletter",
            "navigation",
            "contact", // prevent double-listing since we added it manually
          ].includes(item.getId()!)
      ),
    ]);
