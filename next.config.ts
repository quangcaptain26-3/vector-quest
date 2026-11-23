import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  webpack(config) {
    for (const rule of config.module?.rules ?? []) {
      if (rule && typeof rule === "object" && Array.isArray(rule.oneOf)) {
        for (const one of rule.oneOf) {
          if (
            one &&
            typeof one === "object" &&
            Array.isArray(one.use) &&
            one.use.some(
              (u: unknown) =>
                typeof u === "object" &&
                u !== null &&
                "loader" in u &&
                typeof (u as { loader?: unknown }).loader === "string" &&
                (u as { loader: string }).loader.includes("css-loader")
            )
          ) {
            one.use.push("@tailwindcss/turbopack");
          }
        }
      }
    }
    return config;
  },
};

export default nextConfig;
