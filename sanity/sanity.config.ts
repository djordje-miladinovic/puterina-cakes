import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"

export default defineConfig({
  name: "puterina-cakes-studio",
  title: "Puterina Cakes Studio",

  projectId: "uo9eeei7",
  dataset: "production",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
