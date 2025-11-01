// From https://stackoverflow.com/a/67243723
export function toKebabCase(camelCased: string): string {
  return camelCased.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
  );
}

// From https://stackoverflow.com/a/7225450
export function toTitleCase(camelCased: string): string {
  const result = camelCased.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}
