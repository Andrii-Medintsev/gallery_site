'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { getPhotos } from '../lib/getData';
import { Pagination } from './Pagination';

export const MainPageGrid = () => {
  const [data, setData] = useState<{ results: Basic[]; total: number }>();
  const [isFiveColumns, setIsFiveColumns] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const currentPage = searchParams.get('page') || 1;

  const fetchPhotos = (page: number, query?: string) => {
    getPhotos(page, query)
      .then((res) => {
        if (!res || res?.total === 0) {
          return;
        }

        setTotalPages(Math.ceil(res.total / 30));
        setData(res)
      })
      .catch(() => console.log('something went wrong!'));
  };

  useEffect(() => {
    fetchPhotos(+currentPage, searchQuery || '');
  }, [currentPage, searchQuery]);

  const items =
    data &&
    data.results.map((photo) => (
      <div key={photo.id} className='main-grid-photo'>
        <Link
          href={{
            pathname: 'photos/',
            query: {
              id: photo.id,
            },
          }}
          className='main-grid-photo__link'
        >
          <Image
            src={photo.urls.small}
            alt={photo.description || 'photo'}
            width={photo.width}
            height={photo.height}
            className='main-grid-photo__image'
            priority
          />
        </Link>
      </div>
    ));

  return (
    <main className='main'>
      <div className='container'>
        {data && (
          <div className='main__content'>
            <label className='switch__label' htmlFor='switch'>
              {`Switch to ${isFiveColumns ? 3 : 5} columns grid`}
              <input
                type='checkbox'
                className='switch'
                id='switch'
                hidden
                onChange={() => setIsFiveColumns(!isFiveColumns)}
              />
            </label>

            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 768: isFiveColumns ? 5 : 3 }}
            >
              <Masonry gutter='1rem'>{items}</Masonry>
            </ResponsiveMasonry>

            <Pagination totalPages={totalPages} />
          </div>
        )}
      </div>
    </main>
  );
}
