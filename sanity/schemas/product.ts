export const product = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
    {
      name: "pricePerKg",
      title: "Price per KG (RSD)",
      type: "number",
      validation: (Rule: { required: () => { positive: () => unknown } }) =>
        Rule.required().positive(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "storage",
      title: "Storage Instructions",
      type: "text",
    },
    {
      name: "ingredients",
      title: "Ingredients",
      type: "text",
    },
    {
      name: "nutrition",
      title: "Nutrition (per 100g)",
      type: "object",
      fields: [
        { name: "energy", title: "Energy (kcal)", type: "number" },
        { name: "protein", title: "Protein (g)", type: "number" },
        { name: "carbs", title: "Carbohydrates (g)", type: "number" },
        { name: "fat", title: "Fat (g)", type: "number" },
        { name: "fiber", title: "Fiber (g)", type: "number" },
        { name: "salt", title: "Salt (g)", type: "number" },
      ],
    },
    {
      name: "allergens",
      title: "Allergens",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Gluten", value: "gluten" },
          { title: "Milk", value: "milk" },
          { title: "Eggs", value: "eggs" },
          { title: "Nuts", value: "nuts" },
          { title: "Soy", value: "soy" },
          { title: "Sesame", value: "sesame" },
        ],
      },
    },
  ],
}
