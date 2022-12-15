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
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (imageName === '') {
      setStatus(Status.IDLE);
      setImages([]);
      setTotalImages(0);
    }
  }, [imageName]);

  const getImages = (pageNumber, query) => {
    setPage(pageNumber);
    setImageName(query);
    setStatus(Status.PENDING);

    if (query === '') {
      setStatus(Status.IDLE);

      return;
    }

    fetchImages(query, pageNumber)
      .then(({ data }) => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const handleLoadMoreClick = () => {
    getImages(page + 1, imageName);
  };

  const handleSearchSubmit = imageName => {
    setImages([]);

    getImages(1, imageName);

    setTotalImages(0);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchSubmit} />
      {status === Status.REJECTED && <p>Error: {error.message}</p>}

      <ImageGallery imageName={imageName} images={images} status={status} />
      {status === Status.PENDING && <Loader />}
      {totalImages > images.length && <Button onClick={handleLoadMoreClick} />}
    </div>
  );
};
