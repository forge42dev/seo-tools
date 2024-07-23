import type { Recipe } from "schema-dts"
import { recipe } from "./recipe"

describe("recipe", () => {
	it("should return a recipe structured data object", () => {
		const structuredData: Recipe = {
			"@type": "Recipe",
			name: "Mushroom Risotto",
			image: "https://example.com/photos/1x1/photo.jpg",
			description: "This mushroom risotto recipe is delicious!",
			recipeIngredient: [
				"1 tbsp olive oil",
				"1 onion, chopped",
				"2 garlic cloves, minced",
				"1 cup arborio rice",
				"1/2 cup white wine",
				"4 cups vegetable stock",
				"2 cups mushrooms, sliced",
				"1/2 cup grated parmesan cheese",
				"Salt and pepper to taste",
			],
			recipeInstructions: [
				{
					"@type": "HowToStep",
					text: "In a large pot, heat olive oil over medium heat.",
					url: "https://example.com/p/1",
				},
				{
					"@type": "HowToStep",
					text: "Add chopped onions and garlic. Cook until onions are soft.",
					url: "https://example.com/p/2",
				},
				{
					"@type": "HowToStep",
					text: "Add arborio rice and cook for 2 minutes.",
					url: "https://example.com/p/3",
				},
				{
					"@type": "HowToStep",
					text: "Add white wine and cook until wine is absorbed.",
					url: "https://example.com/p/4",
				},
				{
					"@type": "HowToStep",
					text: "Add vegetable stock 1 cup at a time, stirring frequently.",
					url: "https://example.com/p/5",
				},
				{
					"@type": "HowToStep",
					text: "Add mushrooms and cook until rice is tender.",
					url: "https://example.com/p/6",
				},
				{
					"@type": "HowToStep",
					text: "Stir in parmesan cheese, salt, and pepper.",
					url: "https://example.com/p/7",
				},
				{
					"@type": "HowToStep",
					text: "Serve hot and enjoy!",
					url: "https://example.com/p/8",
				},
			],
			recipeYield: "4 servings",
			totalTime: "PT45M",
		}

		expect(recipe(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})

	it("should return a recipe structured data object with a VideoObject type", () => {
		const structuredData: Recipe = {
			"@type": "Recipe",
			video: {
				"@type": "VideoObject",
				name: "Mushroom Risotto",
				description: "This mushroom risotto recipe is delicious!",
				thumbnailUrl: "https://example.com/photos/1x1/photo.jpg",
			},
			name: "Mushroom Risotto",
			image: "https://example.com/photos/1x1/photo.jpg",
			description: "This mushroom risotto recipe is delicious!",
			recipeIngredient: [
				"1 tbsp olive oil",
				"1 onion, chopped",
				"2 garlic cloves, minced",
				"1 cup arborio rice",
				"1/2 cup white wine",
				"4 cups vegetable stock",
				"2 cups mushrooms, sliced",
				"1/2 cup grated parmesan cheese",
				"Salt and pepper to taste",
			],
			recipeInstructions: [
				{
					"@type": "HowToStep",
					text: "In a large pot, heat olive oil over medium heat.",
					url: "https://example.com/p/1",
				},
				{
					"@type": "HowToStep",
					text: "Add chopped onions and garlic. Cook until onions are soft.",
					url: "https://example.com/p/2",
				},
				{
					"@type": "HowToStep",
					text: "Add arborio rice and cook for 2 minutes.",
					url: "https://example.com/p/3",
				},
				{
					"@type": "HowToStep",
					text: "Add white wine and cook until wine is absorbed.",
					url: "https://example.com/p/4",
				},
				{
					"@type": "HowToStep",
					text: "Add vegetable stock 1 cup at a time, stirring frequently.",
					url: "https://example.com/p/5",
				},
				{
					"@type": "HowToStep",
					text: "Add mushrooms and cook until rice is tender.",
					url: "https://example.com/p/6",
				},
				{
					"@type": "HowToStep",
					text: "Stir in parmesan cheese, salt, and pepper.",
					url: "https://example.com/p/7",
				},
				{
					"@type": "HowToStep",
					text: "Serve hot and enjoy!",
					url: "https://example.com/p/8",
				},
			],
			recipeYield: "4 servings",
			totalTime: "PT45M",
		}

		expect(recipe(structuredData)).toEqual({
			"@context": "https://schema.org",
			...structuredData,
		})
	})
})
