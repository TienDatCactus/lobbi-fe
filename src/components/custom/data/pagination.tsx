import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { clampPage, getPaginationWindow } from "./utils/pagination";

type DataPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
  previousText?: string;
  nextText?: string;
};

export function DataPagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className,
  previousText,
  nextText,
}: DataPaginationProps) {
  const safePage = clampPage(page, totalPages);
  const windowItems = getPaginationWindow(safePage, totalPages, siblingCount);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text={previousText}
            onClick={(event) => {
              event.preventDefault();
              if (safePage > 1) {
                onPageChange(safePage - 1);
              }
            }}
            aria-disabled={safePage === 1}
            className={safePage === 1 ? "pointer-events-none opacity-50" : undefined}
          />
        </PaginationItem>

        {windowItems.map((item, index) => (
          <PaginationItem key={`${item}-${index}`}>
            {item === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={item === safePage}
                onClick={(event) => {
                  event.preventDefault();
                  if (item !== safePage) {
                    onPageChange(item);
                  }
                }}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            text={nextText}
            onClick={(event) => {
              event.preventDefault();
              if (safePage < totalPages) {
                onPageChange(safePage + 1);
              }
            }}
            aria-disabled={safePage === totalPages}
            className={
              safePage === totalPages ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
