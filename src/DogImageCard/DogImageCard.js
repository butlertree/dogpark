import React from 'react';
import { Link } from 'react-router-dom';
import './DogImageCard.css';

function DogImageCard({ dogcard, toggleFavorite, isFavorite, id }) {
  const { name, url, newID } = dogcard;

  return (
    <div className='dog-container'>
      <Link to={`/dog/${newID}`}>
        <img src={url} alt={name} className='dog-image' />
      </Link>
      <div className="dog-breed-name">{name}</div>
      <button className="like-button" onClick={() => toggleFavorite(id)}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default DogImageCard;

