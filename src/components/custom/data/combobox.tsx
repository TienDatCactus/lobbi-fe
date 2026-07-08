"use client";

import { useMemo } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

type DataComboboxItem = {
  value: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
};

type DataComboboxProps = {
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  items: DataComboboxItem[];
  inputPlaceholder?: string;
  emptyLabel?: string;
  disabled?: boolean;
  loading?: boolean;
};

export function DataCombobox({
  value,
  defaultValue,
  onValueChange,
  items,
  inputPlaceholder = "Search...",
  emptyLabel = "No matches found",
  disabled = false,
  loading = false,
}: DataComboboxProps) {
  const selectedValue = useMemo(
    () => items.find((item) => item.value === value) ?? null,
    [items, value],
  );

  const defaultSelectedValue = useMemo(
    () => items.find((item) => item.value === defaultValue) ?? null,
    [defaultValue, items],
  );

  return (
    <Combobox
      value={selectedValue}
      defaultValue={defaultSelectedValue}
      disabled={disabled}
      onValueChange={(nextValue) => onValueChange?.(nextValue?.value ?? null)}
      itemToStringLabel={(item) => item.label}
      itemToStringValue={(item) => item.value}
      clearOnEscape
    >
      <ComboboxInput
        placeholder={loading ? "Loading..." : inputPlaceholder}
        disabled={disabled || loading}
        showClear
      />

      <ComboboxContent>
        <ComboboxList>
          <ComboboxEmpty>{loading ? "Loading..." : emptyLabel}</ComboboxEmpty>

          {items.map((item) => (
            <ComboboxItem
              key={item.value}
              value={item}
              disabled={item.disabled || loading}
              keywords={item.keywords}
            >
              {item.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
