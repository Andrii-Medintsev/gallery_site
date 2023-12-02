'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getSinglePhoto } from '../lib/getData';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import Link from 'next/link';

type Tag = {
  type: string;
  title: string;
};

interface Photo extends Full {
  tags: Tag[];
  views: number;
  downloads: number;
}

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const SinglePhgotoPage = () => {
  const [currentPhoto, setCurrentPhoto] = useState<Photo | null>(null);

  const params = useSearchParams();
  const id = params.get('id');

  const fetchPhoto = (photoId: string) => {
    getSinglePhoto(photoId)
      .then((res) => res && setCurrentPhoto(res))
      // .then((res) => res && console.log(res))
      .catch(() => 'something went wrong');
  };

  useEffect(() => {
    if (id) {
      fetchPhoto(id);
    }
  }, [id]);

  return (
    <div className='photo-details'>
      <div className='container'>
        <div className='photo-details__content'>
          {currentPhoto && (
            <>
              <div className='photo-details__top'>
                <div className='photo-details__user'>
                  <Image
                    src={currentPhoto.user.profile_image.small}
                    width={32}
                    height={32}
                    alt={currentPhoto.user.name}
                  />
                  <Link
                    target='_blank'
                    href={currentPhoto.user.portfolio_url || '/'}
                    className='photo-details__name'
                  >
                    {currentPhoto.user.first_name}
                  </Link>
                </div>

                <div className='photo-details__likes'>
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    version='1.1'
                    aria-hidden='false'
                  >
                    <desc lang='en-US'>A heart</desc>
                    <path d='M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z'></path>
                  </svg>
                  <span>{currentPhoto.likes}</span>
                </div>
              </div>

              <Image
                src={currentPhoto.urls.regular}
                width={currentPhoto.width}
                height={currentPhoto.height}
                alt={currentPhoto.description || 'Photo'}
                className='photo-details__photo'
                priority
              />

              <div className='photo-details__statistics'>
                <div className='photo-details__statistics--container'>
                  <span className='photo-details__statistics--name'>Views</span>
                  <span className='photo-details__statistics--value'>
                    {numberWithCommas(currentPhoto.views)}
                  </span>
                </div>

                <div className='photo-details__statistics--container'>
                  <span className='photo-details__statistics--name'>
                    Downloads
                  </span>
                  <span className='photo-details__statistics--value'>
                    {numberWithCommas(currentPhoto.downloads)}
                  </span>
                </div>
              </div>

              {currentPhoto.description && (
                <p className='photo-details__description'>
                  {currentPhoto.description}
                </p>
              )}

              <div className='photo-details__tags'>
                {currentPhoto.tags.map((tag) => (
                  <Link href='/' className='photo-details__tag' key={tag.title}>
                    {tag.title}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePhgotoPage;
