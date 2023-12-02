'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { getPhotos } from './lib/getData';
import { Pagination } from './ui/pagination';

export default function Home() {
  const [data, setData] = useState<{ results: Basic[]; total: number }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiveColumns, setIsFiveColumns] = useState(false);

  const fetchPhotos = (page: number) => {
    getPhotos(page)
      .then((res) => res && setData(res))
      .catch(() => console.log('something went wrong!'));
  };

  useEffect(() => {
    // api.search.getPhotos({ query: 'cars'})
    fetchPhotos(currentPage);
  }, [currentPage]);

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

            <Pagination
              totalPages={9914}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </main>
  );
}
