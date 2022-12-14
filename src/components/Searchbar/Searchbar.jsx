import PropTypes from 'prop-types';

import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

import Notiflix from 'notiflix';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(text);

    if (text === '') {
      Notiflix.Notify.failure('Please write something.');
    }
  };

  const handleChange = e => {
    const { value } = e.currentTarget;

    setText(value);
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          <BsSearch className="button-label"></BsSearch>
        </button>

        <input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
