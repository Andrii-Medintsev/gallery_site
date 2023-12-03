import { Metadata } from 'next';
import { PhotoDetails } from '../ui/PhotoDetails';

export const metadata: Metadata = {
  title: 'Single photo details',
};

const SinglePhgotoPage = () => {
  return (
    <div className='photo-details'>
      <div className='container'>
        <div className='photo-details__content'>
          <PhotoDetails />
        </div>
      </div>
    </div>
  );
};

export default SinglePhgotoPage;
