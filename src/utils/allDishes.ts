import { readdir } from "node:fs/promises";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export type DishMetadata = {
  slug: string;
  title: string;
  Component: AstroComponentFactory;
};

// From https://stackoverflow.com/a/67243723
function toKebabCase(camelCased: string): string {
  return camelCased.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
  );
}

// From https://stackoverflow.com/a/7225450
function toTitleCase(camelCased: string): string {
  const result = camelCased.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}

async function getAllDishes(): Promise<Record<string, DishMetadata>> {
  // Weird things going on with the path here
  const dishNames = await readdir("./src/dishes");
  console.debug(dishNames);
  const components = await Promise.all(
    dishNames.map((name) =>
      import(`../dishes/${name}`).then((module) => module.default),
    ),
  );

  return dishNames.reduce((obj, name, idx) => {
    const slug = toKebabCase(name.replace(".astro", ""));

    return {
      ...obj,
      [slug]: {
        slug: slug,
        title: toTitleCase(name),
        Component: components[idx],
      },
    };
  }, {});
}

export const allDishes = await getAllDishes();
