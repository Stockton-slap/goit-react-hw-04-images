import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';

import Status from 'status';

import { useState } from 'react';

const ImageGallery = ({ images, imageName, status }) => {
  const [isOpenImageIndex, setIsOpenImageIndex] = useState(null);

  const handleImageClick = index => {
    setIsOpenImageIndex(index);
  };

  const onCloseModal = () => {
    setIsOpenImageIndex(null);
  };

  if (status === Status.RESOLVED && images.length === 0) {
    return <p className="empty-results">Sorry, there is no images found.</p>;
  }

  return (
    <>
      <ul className="gallery">
        {images.map(({ id, webformatURL }, index) => (
          <ImageGalleryItem
            key={id}
            smallImage={webformatURL}
            imageName={imageName}
            handleImageClick={() => handleImageClick(index)}
          />
        ))}
      </ul>
      {isOpenImageIndex !== null && (
        <Modal
          largeImage={images[isOpenImageIndex].largeImageURL}
          imageName={imageName}
          onCloseModal={onCloseModal}
        />
      )}
    </>
  );
};

export default ImageGallery;
