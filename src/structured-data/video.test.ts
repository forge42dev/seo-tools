import type { VideoObject } from "schema-dts"
import { video } from "./video"

describe("video", () => {
	it("returns a video object", () => {
		const videoObject: VideoObject = {
			"@type": "VideoObject",
			name: "Title",
			description: "Description",
			thumbnailUrl: "https://example.com/thumbnail.jpg",
			uploadDate: "2022-01-01",
			duration: "PT1M",
			contentUrl: "https://example.com/video.mp4",
		}

		expect(video(videoObject)).toEqual({
			"@context": "https://schema.org",
			...videoObject,
		})
	})

	it("returns a video object with a transcript", () => {
		const videoObject: VideoObject = {
			"@type": "VideoObject",
			name: "Title",
			description: "Description",
			thumbnailUrl: "https://example.com/thumbnail.jpg",
			uploadDate: "2022-01-01",
			duration: "PT1M",
			contentUrl: "https://example.com",
			transcript: "Transcript",
		}

		expect(video(videoObject)).toEqual({
			"@context": "https://schema.org",
			...videoObject,
		})
	})

	it("returns a video object with a transcript and a caption", () => {
		const videoObject: VideoObject = {
			"@type": "VideoObject",
			name: "Title",
			description: "Description",
			thumbnailUrl: "https://example.com/thumbnail.jpg",
			uploadDate: "2022-01-01",
			duration: "PT1M",
			contentUrl: "https://example.com",
			transcript: "Transcript",
			caption: "Caption",
		}

		expect(video(videoObject)).toEqual({
			"@context": "https://schema.org",
			...videoObject,
		})
	})
})
