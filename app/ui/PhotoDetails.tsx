import React from 'react';
import Link from 'next/link';
import { numberWithCommas } from '../lib/utils';
import Image from 'next/image';
import { Full } from 'unsplash-js/dist/methods/photos/types';

type Props = {
  currentPhoto: Full;
};

export const PhotoDetails: React.FC<Props> = ({ currentPhoto }) => {
  const currentPhotoTags = currentPhoto
  && Array.from(
    new Set(
      currentPhoto.tags
        .map(tag => tag.type === 'landing_page' ? tag.source?.title : tag.title)
      )
  )

  return (
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
          <span className='photo-details__statistics--name'>Downloads</span>
          <span className='photo-details__statistics--value'>
            {numberWithCommas(currentPhoto.downloads)}
          </span>
        </div>
      </div>

      {currentPhoto.description && (
        <p className='photo-details__description'>{currentPhoto.description}</p>
      )}

      <div className='photo-details__tags'>
        {currentPhotoTags &&
          currentPhotoTags.map((tag) => (
            <Link
              href={{
                pathname: '/',
                query: {
                  query: tag,
                },
              }}
              className='photo-details__tag'
              key={tag}
            >
              {tag}
            </Link>
          ))}
      </div>
    </>
  );
};

