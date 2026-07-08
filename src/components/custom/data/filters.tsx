import type { ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { DataSelect } from "@/components/custom/data/select";

type SelectFilterOption = {
  value: string;
  label: ReactNode;
};

type SelectFilter = {
  id: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectFilterOption[];
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  emptyLabel?: ReactNode;
};

type DataFiltersBarProps = {
  query?: string;
  onQueryChange?: (value: string) => void;
  queryPlaceholder?: string;
  searchAriaLabel?: string;
  selectFilters?: SelectFilter[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export function DataFiltersBar({
  query,
  onQueryChange,
  queryPlaceholder = "Search...",
  searchAriaLabel = "Search",
  selectFilters = [],
  leftSlot,
  rightSlot,
  className,
}: DataFiltersBarProps) {
  return (
    <div className={[
      "flex flex-col gap-3 md:flex-row md:items-center md:justify-between",
      className,
    ].filter(Boolean).join(" ")}>
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(event) => onQueryChange?.(event.target.value)}
          placeholder={queryPlaceholder}
          aria-label={searchAriaLabel}
          className="w-full md:max-w-sm"
        />

        {selectFilters.map((filter) => (
          <DataSelect
            key={filter.id}
            value={filter.value}
            onValueChange={filter.onValueChange}
            items={filter.options}
            placeholder={filter.placeholder}
            loading={filter.loading}
            disabled={filter.disabled}
            emptyLabel={filter.emptyLabel}
          />
        ))}

        {leftSlot}
      </div>

      {rightSlot ? <div className="flex items-center gap-2">{rightSlot}</div> : null}
    </div>
  );
}
