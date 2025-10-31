import { useState, type Dispatch, type SetStateAction } from "react";
import type { FilterKey, Filters } from "src/hooks/useTagFilter";
import "@styles/modal.css";
import Bookmark from "@components/bookmark.tsx";
import { FilterIcon, FunnelX } from "lucide-react";
import Checkbox from "@components/checkbox.tsx";

export type FilterMenuProps = {
  filters: Filters;
  setFilters: Dispatch<SetStateAction<Filters>>;
  className: string;
};

type FilterOptionProps = {
  filterName: string;
  id: string;
  isEnabled: boolean;
  toggleFilter: () => void;
};

function FilterOption({
  filterName,
  id,
  isEnabled,
  toggleFilter,
}: FilterOptionProps) {
  return (
    <li role="menuitem" className="list-none" onMouseUp={toggleFilter}>
      <Checkbox controlled role="menuitemcheckbox" id={id} checked={isEnabled}>
        {" "}
        {filterName}
      </Checkbox>
    </li>
  );
}

function MenuContents({
  filters,
  toggleFilter,
}: {
  filters: Filters;
  toggleFilter: <K extends keyof Filters>(
    tagName: K,
    filterKey: FilterKey<K>,
    isEnabled: boolean,
  ) => void;
}) {
  return (
    <form aria-label="Filter menu">
      {Object.keys(filters).map((tagName) => {
        const castedTagName = tagName as keyof Filters;

        return (
          <details key={`group-${tagName}`}>
            <summary>{tagName}</summary>
            <fieldset className="ml-4 grid grid-flow-row grid-cols-2 gap-2 md:grid-cols-3">
              <legend className="sr-only">{tagName}</legend>

              {Object.keys(filters[castedTagName]).map((filterName) => {
                const filterKey = filterName as FilterKey<typeof castedTagName>;
                const isEnabled = filters[castedTagName][filterKey];
                const inputId = `checkbox-${filterName}`;

                return (
                  <FilterOption
                    key={inputId}
                    filterName={filterName}
                    id={inputId}
                    isEnabled={isEnabled}
                    toggleFilter={() =>
                      toggleFilter(castedTagName, filterKey, isEnabled)
                    }
                  />
                );
              })}
            </fieldset>
          </details>
        );
      })}
    </form>
  );
}

function FilterMenu({ filters, setFilters, className }: FilterMenuProps) {
  const [showModal, setShowModal] = useState(false);

  const modalStyles =
    showModal &&
    "z-50 fixed left-1/3 -translate-x-1/3 h-6/8 m-5 w-7/8 shadow-lg md:top-1/5 md:left-1/2 md:h-3/4 md:w-1/3 md:max-w-1/ overflow-hidden md:-translate-x-1/2";

  const toggleModal = () => setShowModal(!showModal);
  const toggleFilter = <K extends keyof Filters>(
    tagName: K,
    filterKey: FilterKey<K>,
    enabled: boolean,
  ) => {
    setFilters({
      ...filters,
      [tagName]: {
        ...filters[tagName],
        [filterKey]: !enabled,
      },
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 h-full w-full bg-black/50 backdrop-blur-md ${!showModal && "hidden"}`}
        onClick={toggleModal}
      />
      <Bookmark
        role="menu"
        variant={showModal ? "light" : "dark"}
        className={`p-3 transition-all duration-200 ${showModal ? modalStyles : "h-1/4 max-w-min"} ${className}`}
      >
        {showModal && (
          <>
            <FunnelX className="cursor-pointer" onClick={toggleModal} />
            <MenuContents filters={filters} toggleFilter={toggleFilter} />
          </>
        )}
        {!showModal && (
          <>
            <FilterIcon className="cursor-pointer" onClick={toggleModal} />
          </>
        )}
      </Bookmark>
    </>
  );
}

export default FilterMenu;
