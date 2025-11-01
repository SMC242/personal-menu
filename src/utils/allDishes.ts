import { readdir } from "node:fs/promises";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";
import type { RecipeTags } from "@types/index.d.ts";
import { toKebabCase, toTitleCase } from "src/utils/casing.ts";

export type DishMetadata = {
  slug: string;
  title: string;
  Component: AstroComponentFactory;
  tags: RecipeTags;
};

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
