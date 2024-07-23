import { defineConfig } from "tsup"

export default defineConfig({
	entryPoints: [
		"src/robots.ts",
		"src/canonical.ts",
		"src/sitemap.ts",
		"src/remix",
		"src/structured-data",
		"!src/**/*.test.*",
	],

	format: ["cjs", "esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	minify: true,
})
