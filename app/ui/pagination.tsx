import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { generatePagination } from '../lib/generatePagination';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const query = searchParams.get('query');

  const setQuery = (page: number) => {
    return query ? { page, query } : { page };
  }

  const allPages = generatePagination(currentPage, totalPages);

  return (
    allPages && (
      <div className='pagination'>
        <Link
          href={{
            pathname: '/',
            query: setQuery(currentPage - 1),
          }}
          className='pagination__button'
        >
          <ArrowLeftIcon
            width={14}
            color={currentPage === 1 ? '#aaa' : '#111'}
          />
        </Link>

        <div className='pagination__buttons'>
          {allPages.map((page, i) => {
            if (page === '...') {
              return (
                <div key={i} className='pagination__button'>
                  {page}
                </div>
              );
            } else {
              return (
                <Link
                  href={{
                    pathname: '/',
                    query: setQuery(+page),
                  }}
                  key={i}
                  className={clsx('pagination__button', {
                    'pagination__button--active': currentPage === page,
                  })}
                >
                  {page}
                </Link>
              );
            }
          })}
        </div>

        <Link
          href={{
            pathname: '/',
            query: setQuery(currentPage + 1),
          }}
          className='pagination__button'
        >
          <ArrowRightIcon
            width={14}
            color={currentPage === totalPages ? '#aaa' : '#111'}
          />
        </Link>
      </div>
    )
  );
};
