import PropTypes from 'prop-types';

import { useEffect } from 'react';

const Modal = ({ largeImage, imageName, onCloseModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal">
        <img src={largeImage} alt={imageName} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
