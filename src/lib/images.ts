import type { ImageMetadata } from "astro";
import { getImage } from "astro:assets";

// Raster images live in src/assets/img so Astro can optimize them. Content data
// keeps referring to them by their public-style path ("/img/..."), resolved here.
const modules = import.meta.glob<{ default: ImageMetadata }>("../assets/img/**/*.{png,jpg,jpeg}", {
  eager: true,
});

const byPath = new Map(
  Object.entries(modules).map(([file, mod]) => [file.replace("../assets", ""), mod.default]),
);

/** Returns optimizable metadata for local assets, or the original string (remote URLs, SVG, GIF). */
export function resolveImage(src: string): ImageMetadata | string {
  return byPath.get(src) ?? src;
}

/** A URL suitable for meta tags (e.g. og:image), optimized when the source is a local asset. */
export async function imageUrl(src: string, width = 1200): Promise<string> {
  const resolved = resolveImage(src);
  if (typeof resolved === "string") return resolved;
  // JPEG has no alpha: flatten transparent cutouts onto the brand teal instead of black.
  const img = await getImage({
    src: resolved,
    width: Math.min(width, resolved.width),
    format: "jpg",
    background: "#b5e8dc",
  });
  return img.src;
}
