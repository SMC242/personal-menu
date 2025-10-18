import { readdir } from "node:fs/promises";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { RecipeTags } from "@types/index.d.ts";

export type DishMetadata = {
  slug: string;
  title: string;
  Component: AstroComponentFactory;
  tags: RecipeTags;
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
  const dishNames = (await readdir("./src/dishes")).map((name) =>
    name.replace(".astro", ""),
  );
  console.debug(dishNames);
  const dishData: [AstroComponentFactory, RecipeTags][] = await Promise.all(
    dishNames.map((name) =>
      import(`../dishes/${name}.astro`).then((module) => {
        if (!("tags" in module))
          throw Error(`Missing tags in dish ${name}.astro`);

        return [
          module.default as AstroComponentFactory,
          module.tags as RecipeTags,
        ] satisfies [AstroComponentFactory, RecipeTags];
      }),
    ),
  );

  return dishNames.reduce((obj, name, idx) => {
    const slug = toKebabCase(name);

    return {
      ...obj,
      [slug]: {
        slug: slug,
        title: toTitleCase(name),
        Component: dishData[idx][0],
        tags: dishData[idx][1],
      },
    };
  }, {});
}

export const allDishes = await getAllDishes();
