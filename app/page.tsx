'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Basic } from 'unsplash-js/dist/methods/photos/types';
import { getPhotos } from './lib/getData';
import { Pagination } from './ui/pagination';

export default function Home() {
  const [data, setData] = useState<{ results: Basic[]; total: number }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(3);

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
      <div key={photo.id} className='photo'>
        <Link
          href={{
            pathname: 'photos/',
            query: {
              id: photo.id,
            },
          }}
          className='photo__link'
        >
          <Image
            src={photo.urls.small}
            alt={photo.description || 'photo'}
            width={photo.width}
            height={photo.height}
            className='photo__image'
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
            <Masonry
              breakpointCols={columns}
              className='my-masonry-grid'
              columnClassName='my-masonry-grid_column'
            >
              {items}
            </Masonry>

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
