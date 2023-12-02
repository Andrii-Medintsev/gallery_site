'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { generatePagination } from '../lib/generatePagination';
import { useEffect, useState } from 'react';

type Props = {
  totalPages: number;
  onPageChange: (pageNum: number) => void;
  currentPage: number;
};

export const Pagination: React.FC<Props> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const allPages = generatePagination(currentPage, totalPages);

  return (
    allPages && (
      <div className='pagination'>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className='pagination__button'
        >
          <ArrowLeftIcon width={14} color={currentPage === 1 ? '#aaa' : '#111'}  />
        </button>

        <div className='pagination__buttons'>
          {allPages.map((page, index) => (
              <button
                key={index}
                onClick={() => {
                  if (page === '...') {
                    return;
                  }
                  onPageChange(+page)
                }}
                className={clsx(
                  'pagination__button',
                  { 'pagination__button--active': currentPage === page }
                )}
              >
                {page}
              </button>
            ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          className='pagination__button'
          disabled={currentPage === totalPages}
        >
          <ArrowRightIcon width={14} color={currentPage === totalPages ? '#aaa' : '#111'} />
        </button>
      </div>
    )
  );
};
