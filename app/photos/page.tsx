'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Full } from 'unsplash-js/dist/methods/photos/types';
import { getSinglePhoto } from '../lib/getData';
import { PhotoDetails } from '../ui/PhotoDetails';

const SinglePhgotoPage = () => {
  const [currentPhoto, setCurrentPhoto] = useState<Full | null>(null);

  const params = useSearchParams();
  const id = params.get('id');

  const fetchPhoto = (photoId: string) => {
    getSinglePhoto(photoId)
      .then((res) => res && setCurrentPhoto(res))
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
            <PhotoDetails currentPhoto={currentPhoto}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePhgotoPage;
