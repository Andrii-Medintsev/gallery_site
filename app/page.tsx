'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { createApi } from 'unsplash-js';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';
import { Pagination } from './ui/pagination';

// type Photo = {
//   id: string;
//   width: number;
//   height: number;
//   urls: { large: string; regular: string; raw: string; small: string };
//   color: string | null;
//   user: {
//     username: string;
//     name: string;
//     id: string;
//   };
// };

const api = createApi({
  accessKey: 'k-E4HkJ2fV55oW4gi3tgu_AuqqhoySG4RdzYQuDASOA',
});

// const PhotoComp: React.FC<{ photo: Photo }> = ({ photo }) => {
//   const { user, urls } = photo;

//   return (
//     <>
//       <Image className='img' alt={photo.user.name} src={urls.regular} />
//       <a
//         className='credit'
//         target='_blank'
//         href={`https://unsplash.com/@${user.username}`}
//       >
//         {user.name}
//       </a>
//     </>
//   );
// };

export default function Home() {
  const [data, setData] = useState<Photos>();

  useEffect(() => {
    // api.search.getPhotos({ query: 'cars'})
    api.photos
      .list({page: 2, perPage: 12})
      .then((result) => {
        if (!result.errors) {
          setData(result.response);
        }
      })
      .catch(() => {
        console.log('something went wrong!');
      });
  }, []);

  const items = data && data.results.map((photo) => (
      <div key={photo.id} className='photo'>
        <Link href={`photos/${photo.id}`} className='photo__link'>
          <Image
            src={photo.urls.small}
            alt={photo.description || 'photo'}
            width={200}
            height={photo.height / 20}
            className='photo__image'
            priority
          />
        </Link>
      </div>
    ));

return (
  <main className='main'>
    <div className='container'>
      <div className="main__content">
        <Masonry
          breakpointCols={5}
          className='my-masonry-grid'
          columnClassName='my-masonry-grid_column'
        >
          {items}
        </Masonry>

        <Pagination />
      </div>
    </div>
  </main>
);
}
