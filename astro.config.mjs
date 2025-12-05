// @ts-check

import solid from "@astrojs/solid-js";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
    // Enable Solid to support Solid JSX components.
    integrations: [solid()],
    site: "https://zbrogz.github.io",
    base: "/quizzington/",
    trailingSlash: "always",
    vite: {
        plugins: [tailwindcss()],
    },
});
