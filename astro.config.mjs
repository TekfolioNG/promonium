import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import fauxRemarkEmbedder from "@remark-embedder/core";
import fauxOembedTransformer from "@remark-embedder/transformer-oembed";
import icon from "astro-icon";
import { astroImageTools } from "astro-imagetools";
import m2dx from "astro-m2dx";
import { defineConfig } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

const remarkEmbedder = fauxRemarkEmbedder.default;
const oembedTransformer = fauxOembedTransformer.default;

import vue from "@astrojs/vue";

const m2dxOptions = {
  exportComponents: true,
  unwrapImages: true,
  autoImports: true,
};

// https://astro.build/config
export default defineConfig({
  site: "https://promoniumng.com",
  integrations: [
    icon({
      include: {
        local: [
          "pro-box",
          "pro-truck",
          "pro-fulfilment",
          "pro-consult",
          "pro-security",
          "pro-warehouse",
          "pro-inventory",
          "pro--distribution",
          "proi--storage",
          "pro-order-complete",
          "map-marker",
        ],
      },
      paths: {
        local: "/src/icons/", // Path to your icons folder
      },
    }),
    mdx({}),
    sitemap(),
    tailwind(),
    vue({
      appEntrypoint: "/src/pages/_app",
      jsx: true,
    }),
    astroImageTools,
  ],
  
  markdown: {
    extendDefaultPlugins: true,
    remarkPlugins: [
      [
        remarkEmbedder,
        {
          transformers: [oembedTransformer],
        },
      ],
      [m2dx, m2dxOptions],
    ],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow"],
          target: ["_blank"],
        },
      ],
    ],
  },
  vite: {
    build: {
      rollupOptions: {
        external: [
          "/_pagefind/pagefind.js",
          "/_pagefind/pagefind-ui.js",
          "/_pagefind/pagefind-ui.css",
        ],
      },
      assetsInlineLimit: 10096,
      assetsInclude: ["**/*.mp4", "**/*.webm", "**/*.ogg", "**/*.png"], // Includes video assets
    },
  },

  build: {
    inlineStylesheets: "always",
  },
  scopedStyleStrategy: "attribute",
  prefetch: {
    defaultStrategy: "viewport",
  },
});
