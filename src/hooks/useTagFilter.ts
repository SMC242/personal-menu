import type { RecipeTags } from "@types/index.d.ts";

export type Filters = {
  [K in keyof RecipeTags]: Record<RecipeTags[K], boolean>;
};

// The & string is to avoid Symbol being included in the type
export type FilterKey<K extends keyof RecipeTags> = keyof Filters[K];

export type UseTagFilterProps<T extends { tags: RecipeTags }> = {
  items: T[];
  // TODO: make values be arrays of all values of each RecipeTag key
  filters: Filters | null;
};

// TODO: generate this automatically from `allDishes`
export function makeFilters(): Filters {
  return {
    cuisine: {
      "North Indian": true,
    },
    spiciness: {
      "Not spicy": true,
      Mild: true,
      Medium: true,
      Hot: true,
    },
  };
}

function useTagFilter<T extends { tags: RecipeTags }>({
  items,
  filters,
}: UseTagFilterProps<T>): T[] {
  if (filters === null) return items;

  return items.filter((e) => {
    let key: keyof RecipeTags;
    for (key in filters) {
      if (filters[key][e.tags[key] as keyof Filters[typeof key]]) return e;
    }
  });
}

export default useTagFilter;
