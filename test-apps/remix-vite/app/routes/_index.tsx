import type { MetaFunction } from "@remix-run/node";
// Import and test your package
import { generateMeta } from "seo-tools/remix/metadata";
import { article } from "seo-tools/structured-data/article";
import { course } from "seo-tools/structured-data/course";

export const meta: MetaFunction = () => {
  const meta = generateMeta({
    title: "test",
    description: "test",
    url: "test",
  }, [
    {
      "script:ld+json": article({
        "@type": "Article",
        headline: "Article headline",
        image: "https://example.com/image.jpg",
        datePublished: "2021-01-01T00:00:00Z",
      })
    },
    {
      "script:ld+json": course({
        "@type": "Course",
        name: "Course name",
        description: "Course description",
      })
    }
  ])
  return meta
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/blog" rel="noreferrer">
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/tutorials/jokes" rel="noreferrer">
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
