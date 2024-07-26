import { generateCanonicalLinks } from "./canonical"

const removeWhitespace = (str: string) => str.replace(/\s/g, "")

describe("generateCanonicalLinks", () => {
	it("should return a string of canonical and alternative links properly as a string", () => {
		const canonicalLinks = generateCanonicalLinks(
			{
				url: "/page",
				domain: "https://example.com",
				alternatives: ["en", "es"],
				urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			},
			false
		)
		expect(removeWhitespace(canonicalLinks)).toBe(
			removeWhitespace(
				`<link rel="canonical" href="https://example.com/page">
				<link rel="alternate" href="https://example.com/en/page">
				<link rel="alternate" href="https://example.com/es/page">`
			)
		)
	})

	it("should return links properly as an array of objects", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
			},
		])
	})

	it("should return links properly as an array of objects with canonical attributes", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			canonicalAttributes: { test: "test" },
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
				test: "test",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
			},
		])
	})

	it("should work when altenratives are an object array", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: [{ lang: "en" }, { lang: "es" }],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative.lang}${url}`,
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
			},
		])
	})

	it("should allow you to remove duplicate urls by returning null if they match with the canonical url", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain, canonicalUrl }) => {
				return `${domain}${url}` === canonicalUrl ? null : `${domain}/${alternative}${url}`
			},
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
			},
		])
	})

	it("should return links properly as an array of objects with alternative attributes", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			altAttributesTransformer: ({ url, alternative, domain }) => ({ test: "test" }),
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
				test: "test",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
				test: "test",
			},
		])
	})

	it("should return links properly as an array of objects with alternative attributes being different based on the function", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			altAttributesTransformer: ({ url, alternative, domain }) => ({ test: `test-${alternative}` }),
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
				test: "test-en",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
				test: "test-es",
			},
		])
	})

	it("should return links properly as an array of objects with canonical and alternative attributes", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			canonicalAttributes: { test: "test" },
			altAttributesTransformer: () => ({ test: "test" }),
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
				test: "test",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
				test: "test",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
				test: "test",
			},
		])
	})

	it("should return links properly as an array of objects with canonical and alternative attributes being different based on the function", () => {
		const canonicalLinks = generateCanonicalLinks({
			url: "/page",
			domain: "https://example.com",
			alternatives: ["en", "es"],
			urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
			canonicalAttributes: { test: "test" },
			altAttributesTransformer: ({ alternative }) => ({ test: `test-${alternative}` }),
		})
		expect(canonicalLinks).toEqual([
			{
				tagName: "link",
				rel: "canonical",
				href: "https://example.com/page",
				test: "test",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/en/page",
				test: "test-en",
			},
			{
				tagName: "link",
				rel: "alternate",
				href: "https://example.com/es/page",
				test: "test-es",
			},
		])
	})

	it("should return links properly as string with canonical and alternative attributes being different based on the function", () => {
		const canonicalLinks = generateCanonicalLinks(
			{
				url: "/page",
				domain: "https://example.com",
				alternatives: ["en", "es"],
				urlTransformer: ({ url, alternative, domain }) => `${domain}/${alternative}${url}`,
				canonicalAttributes: { test: "test" },
				altAttributesTransformer: ({ alternative }) => ({ test: `test-${alternative}` }),
			},
			false
		)
		expect(removeWhitespace(canonicalLinks)).toBe(
			removeWhitespace(
				`<link rel="canonical" href="https://example.com/page" test="test">
				<link rel="alternate" href="https://example.com/en/page" test="test-en">
				<link rel="alternate" href="https://example.com/es/page" test="test-es">`
			)
		)
	})
})
