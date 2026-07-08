# Custom Data Components

This folder contains reusable data-facing components built on top of `src/components/ui`.

## Components

- `DataSelect`: controlled/uncontrolled select with loading and empty states.
- `DataPagination`: controlled pagination with ellipsis windowing.
- `DataTable`: moved to `src/components/custom/data-table` to follow the shadcn base Data Table module split.
- `DataCombobox`: searchable selection with string-value API.
- `DataFiltersBar`: search + select filter composition for list pages.

## Usage

### DataSelect

```tsx
import { DataSelect } from "@/components/custom/data/select";

<DataSelect
  value={status}
  onValueChange={setStatus}
  items={[
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "archived", label: "Archived" },
  ]}
  placeholder="Status"
  loading={isLoadingStatuses}
/>;
```

### DataPagination

```tsx
import { DataPagination } from "@/components/custom/data/pagination";

<DataPagination
  page={page}
  totalPages={meta.totalPages}
  onPageChange={setPage}
/>;
```

### DataTable

```tsx
import { DataTable } from "@/components/custom/data-table";
import type { ColumnDef } from "@tanstack/react-table";

type UserRow = { id: string; name: string; email: string };

const columns: ColumnDef<UserRow>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
];

<DataTable columns={columns} data={users} filterColumnId="email" />;
```

### DataCombobox

```tsx
import { DataCombobox } from "@/components/custom/data/combobox";

<DataCombobox
  value={selectedAssigneeId}
  onValueChange={setSelectedAssigneeId}
  items={assignees.map((user) => ({
    value: user.id,
    label: user.name,
    keywords: [user.email],
  }))}
  inputPlaceholder="Find assignee"
/>;
```

### DataFiltersBar

```tsx
import { DataFiltersBar } from "@/components/custom/data/filters";

<DataFiltersBar
  query={search}
  onQueryChange={setSearch}
  selectFilters={[
    {
      id: "status",
      value: status,
      onValueChange: setStatus,
      options: [
        { value: "all", label: "All" },
        { value: "open", label: "Open" },
        { value: "closed", label: "Closed" },
      ],
      placeholder: "Status",
    },
  ]}
/>;
```

## Boundary Rules

- Keep data fetching in feature hooks/modules.
- Pass async status and mapped view data into these components as props.
- Keep query params, endpoints, and domain transforms outside this folder.
