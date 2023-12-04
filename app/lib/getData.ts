'use server';

import { createApi } from 'unsplash-js';

const ACCESS_KEY = process.env.ACCESS_KEY;

const api = createApi({
  accessKey: `${ACCESS_KEY}`,
})

export const getSinglePhoto = (id: string) => {
  return fetch(
    `https://api.unsplash.com/photos/${id}/?client_id=${ACCESS_KEY}`
  )
    .then((res) => res.json())
    .catch(() => 'something went wrong');
  // return api.photos.get({ photoId: id })
  //   .then(res => res.response)
  //   .catch(() => console.log('something went wrong'));
};

export const getPhotos = (page: number, query?: string) => {
  let promise;
  if (query) {
    promise = api.search.getPhotos({ query, page, perPage: 30 });
  } else {
    promise = api.photos.list({ page, perPage: 30 });
  }

  return promise
    .then(res => res.response)
    .catch(() => console.log('something went wrong'));
};
