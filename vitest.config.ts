/// <reference types="vitest" />
import { defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		setupFiles: ["./tests/setup.ts"],
		environment: "node",
		globals: true,

		coverage: {
			all: false,
			provider: "v8",
			reporter: ["html", "json-summary", "text-summary"],
			thresholds: {
				statements: 80,
				branches: 80,
				functions: 80,
				lines: 80,
			},
		},
	},
})
