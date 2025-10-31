import type { DishMetadata } from "src/utils/allDishes";
import ListItem from "@components/listItem.tsx";
import { astroUrl } from "src/utils/astro";
import useTagFilter, {
  type Filters,
  makeFilters,
} from "src/hooks/useTagFilter";
import { useState } from "react";
import FilterMenu from "@components/filterMenu.tsx";
import Link from "@components/link.tsx";

export type DishListProps = {
  dishes: DishMetadata[];
};

function DishList({ dishes }: DishListProps) {
  const [filters, setFilters] = useState<Filters>(makeFilters());
  const filteredDishes = useTagFilter({
    items: dishes,
    filters,
  });

  return (
    <div className="relative grid grid-cols-3 grid-rows-1 gap-4">
      <FilterMenu
        className="col-start-3 mx-3 justify-self-end"
        filters={filters}
        setFilters={setFilters}
      />
      <ul className="col-start-2 row-start-1 justify-self-center text-left">
        {filteredDishes.map((dish) => (
          <ListItem key={dish.slug}>
            <Link href={`dishes/${dish.slug}`}>{dish.title}</Link>
          </ListItem>
        ))}
      </ul>
    </div>
  );
}
export default DishList;
