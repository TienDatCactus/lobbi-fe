import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

type AsyncStateProps = {
  loading?: boolean;
  error?: ReactNode;
  isEmpty?: boolean;
  loadingFallback?: ReactNode;
  errorTitle?: ReactNode;
  emptyTitle?: ReactNode;
  emptyDescription?: ReactNode;
  children: ReactNode;
};

function DefaultLoadingFallback() {
  return (
    <div className="space-y-3" aria-live="polite" aria-busy="true">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Spinner />
        <span>Loading data...</span>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

export function AsyncState({
  loading = false,
  error,
  isEmpty = false,
  loadingFallback,
  errorTitle = "Unable to load data",
  emptyTitle = "No results",
  emptyDescription = "Try adjusting filters or search criteria.",
  children,
}: AsyncStateProps) {
  if (loading) {
    return loadingFallback ?? <DefaultLoadingFallback />;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{errorTitle}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>{emptyTitle}</EmptyTitle>
          <EmptyDescription>{emptyDescription}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return <>{children}</>;
}
