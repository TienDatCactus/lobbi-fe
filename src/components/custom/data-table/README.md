# Data Table Module

This folder follows the shadcn base Data Table guide structure and composes TanStack Table with existing UI primitives.

## Files

- `data-table.tsx`: core table composition (sorting, filtering, visibility, row selection, pagination).
- `data-table-column-header.tsx`: sortable/hideable header control.
- `data-table-view-options.tsx`: column visibility dropdown.
- `data-table-pagination.tsx`: footer pagination and selected-row summary.

## Basic usage

```tsx
"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableColumnHeader } from "@/components/custom/data-table";

type Payment = {
  id: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  amount: number;
};

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];

export function PaymentsTable({ data }: { data: Payment[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumnId="email"
      filterPlaceholder="Filter emails..."
    />
  );
}
```
