"use client";

import {
  Pagination,
  PaginationEllipsis,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
  PaginationContent,
} from "@/components/ui/pagination";
import { FC } from "react";

interface ScrapTablePaginationProps {
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}
const ScrapTablePagination: FC<ScrapTablePaginationProps> = ({
  page,
  pageSize,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const items = [];
    const maxVisiblePages = 5;

    /** 페이지 수가 5 이하일때 */
    if (pageSize <= maxVisiblePages) {
      for (let i = 1; i <= pageSize; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      /** 페이지 수가 5 이상일때 */
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink isActive={page === 1} onClick={() => onPageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
      );

      //현재 페이지가 3 이상이면 ...으로
      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      //페이지번호 2부터 시작
      const start = Math.max(2, page - 1);
      const end = Math.min(pageSize - 1, page + 1); // 현재 페이지로포함 3개 페이지 표시

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={page === i}
              onClick={() => onPageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      //전체 페이지 size-2 보다 더 적으면 ...으로
      if (page < pageSize - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      //마지막 페이지
      items.push(
        <PaginationItem key={pageSize}>
          <PaginationLink
            isActive={page === pageSize}
            onClick={() => onPageChange(pageSize)}
          >
            {pageSize}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <Pagination>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            {/** 이전 클릭 */}
            <PaginationPrevious
              aria-disabled={page === 1}
              tabIndex={page === 1 ? -1 : undefined}
              className={
                page === 1 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
          {renderPageNumbers()}
          {/** 다음 클릭 */}
          <PaginationItem>
            <PaginationNext
              aria-disabled={page === pageSize}
              tabIndex={page === pageSize ? -1 : undefined}
              className={
                page === pageSize ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => onPageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ScrapTablePagination;
