import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DataSelectItem = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

type DataSelectGroup = {
  label?: ReactNode;
  items: DataSelectItem[];
};

type DataSelectProps = {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  items?: DataSelectItem[];
  groups?: DataSelectGroup[];
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  emptyLabel?: ReactNode;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
};

function renderItems(items: DataSelectItem[]) {
  return items.map((item) => (
    <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
      {item.label}
    </SelectItem>
  ));
}

export function DataSelect({
  value,
  defaultValue,
  onValueChange,
  items = [],
  groups,
  placeholder = "Select an option",
  loading = false,
  disabled = false,
  emptyLabel = "No options available",
  className,
  triggerClassName,
  contentClassName,
}: DataSelectProps) {
  const hasItems = Boolean(groups?.length ? groups.some((group) => group.items.length > 0) : items.length);
  const isDisabled = disabled || loading || (!hasItems && !groups?.length);

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={isDisabled}
    >
      <SelectTrigger className={cn(className, triggerClassName)}>
        <SelectValue placeholder={loading ? "Loading..." : placeholder} />
      </SelectTrigger>

      <SelectContent className={contentClassName}>
        {loading ? (
          <SelectItem value="__loading" disabled>
            Loading...
          </SelectItem>
        ) : hasItems ? (
          groups?.length ? (
            groups.map((group, groupIndex) => {
              const groupItems = group.items;

              if (!groupItems.length) {
                return null;
              }

              return (
                <SelectGroup key={`${group.label ?? "group"}-${groupIndex}`}>
                  {group.label ? <SelectLabel>{group.label}</SelectLabel> : null}
                  {renderItems(groupItems)}
                </SelectGroup>
              );
            })
          ) : (
            renderItems(items)
          )
        ) : (
          <SelectItem value="__empty" disabled>
            {emptyLabel}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
