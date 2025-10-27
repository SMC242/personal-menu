/// Prepend the base URL (Astro-specific)
// @param path Must not start with a /
// See https://docs.astro.build/en/reference/configuration-reference/#base
export function astroUrl(path: string): string {
  return `${import.meta.env.BASE_URL}/{path}`;
}
