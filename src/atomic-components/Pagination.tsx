import React, { FormEvent, useEffect, useId, useMemo, useState } from 'react';
import Button from 'atomic-components/Button';
import styles from './Pagination.module.scss';

export interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const DEFAULT_PAGE_SIZE_OPTIONS = [10, 15, 20, 50, 100];

const clampPageNumber = (page: number, totalPages: number) => {
  if (Number.isNaN(page)) {
    return 1;
  }

  if (page < 1) {
    return 1;
  }

  if (page > totalPages) {
    return totalPages;
  }

  return page;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onPageChange,
  onPageSizeChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pageSizeSelectId = useId();
  const pageJumpInputId = useId();
  const [pageInput, setPageInput] = useState(currentPage.toString());

  useEffect(() => {
    setPageInput(currentPage.toString());
  }, [currentPage]);

  const paginationRange = useMemo<(number | string)[]>(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set<number>();
    pages.add(1);
    pages.add(totalPages);
    pages.add(currentPage);
    pages.add(currentPage - 1);
    pages.add(currentPage + 1);

    if (currentPage <= 3) {
      pages.add(2);
      pages.add(3);
      pages.add(4);
    }

    if (currentPage >= totalPages - 2) {
      pages.add(totalPages - 1);
      pages.add(totalPages - 2);
      pages.add(totalPages - 3);
    }

    const sortedPages = Array.from(pages)
      .filter((pageNumber) => pageNumber >= 1 && pageNumber <= totalPages)
      .sort((a, b) => a - b);

    const range: (number | string)[] = [];

    sortedPages.forEach((pageNumber, index) => {
      if (index > 0 && pageNumber - sortedPages[index - 1] > 1) {
        range.push(`ellipsis-${sortedPages[index - 1]}-${pageNumber}`);
      }
      range.push(pageNumber);
    });

    return range;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    const nextPage = clampPageNumber(page, totalPages);
    if (nextPage !== currentPage) {
      onPageChange(nextPage);
    }
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const nextPageSize = Number(event.target.value);
    if (!Number.isNaN(nextPageSize) && nextPageSize !== pageSize) {
      onPageSizeChange(nextPageSize);
    }
  };

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageInput(event.target.value);
  };

  const handlePageJumpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPage = Number(pageInput);
    const nextPage = clampPageNumber(parsedPage, totalPages);
    onPageChange(nextPage);
    setPageInput(nextPage.toString());
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <div className={styles.pagination}>
      <div className={styles.pageSize}>
        <label htmlFor={pageSizeSelectId}>
          <span className={styles.labelFull}>Rows per page</span>
          <span className={styles.labelShort}>Rows</span>
        </label>
        <select
          id={pageSizeSelectId}
          value={pageSize}
          onChange={handlePageSizeChange}
          className={styles.pageSizeSelect}
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.controls}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ‹ Prev
        </Button>

        <div className={styles.pageNumbers}>
          {paginationRange.map((item) =>
            typeof item === 'string' ? (
              <span key={item} className={styles.ellipsis}>
                …
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant={item === currentPage ? 'primary' : 'outline'}
                size="sm"
                onClick={() => handlePageChange(item)}
                className={`${styles.pageButton} ${
                  item === currentPage ? styles.pageButtonActive : ''
                }`}
              >
                {item}
              </Button>
            ),
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next ›
        </Button>
      </div>

      <form className={styles.pageJump} onSubmit={handlePageJumpSubmit}>
        <label htmlFor={pageJumpInputId}>
          <span className={styles.labelFull}>Go to page</span>
          <span className={styles.labelShort}>Page</span>
        </label>
        <input
          id={pageJumpInputId}
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={handlePageInputChange}
          className={styles.pageJumpInput}
        />
        <Button type="submit" variant="outline" size="sm">
          Go
        </Button>
      </form>
    </div>
  );
};

export default Pagination;
