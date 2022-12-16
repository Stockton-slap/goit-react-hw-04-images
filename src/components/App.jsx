import { useState, useEffect } from 'react';

import '../styles.css';
import Status from 'status';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader';

import fetchImages from 'fetchImages';

export const App = () => {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [isShowBtn, setIsShowBtn] = useState(false);

  const handleLoadMoreClick = () => {
    setPage(page => page + 1);
    setIsShowBtn(false);
  };

  useEffect(() => {
    setIsShowBtn(false);

    if (!imageName) {
      setStatus(Status.IDLE);
      setImages([]);
    }

    if (imageName !== '') {
      setStatus(Status.PENDING);

      fetchImages(imageName, page)
        .then(({ data }) => {
          const images = data.hits;

          setImages(prevImages => [
            ...prevImages,
            ...images.map(({ id, webformatURL, largeImageURL }) => ({
              id,
              webformatURL,
              largeImageURL,
            })),
          ]);

          setIsShowBtn(data.totalHits > images.length);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          console.log(error);
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
  }, [imageName, page]);

  const handleSearchSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchSubmit} />
      {status === Status.REJECTED && <p>Error: {error.message}</p>}

      <ImageGallery imageName={imageName} images={images} status={status} />
      {status === Status.PENDING && <Loader />}
      {isShowBtn && <Button onClick={handleLoadMoreClick} />}
    </div>
  );
};
