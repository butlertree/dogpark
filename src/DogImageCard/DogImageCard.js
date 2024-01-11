import React from 'react';
import { Link } from 'react-router-dom';
import './DogImageCard.css';
                                            //i don't need newID because it is passed as a prop (id) from Dogs.js
function DogImageCard({ dogcard, toggleFavorite, isFavorite, id }) {
  const { url } = dogcard;
  const name = dogcard.breeds[0]?.name;  //if dogcard.breeds[0] index 0 is not null it access the name of the dog

  return (
    <div className='dog-container'>
      <Link to={`/dog/${id}`}>
        <img src={url} alt={`${name} dog`} className='dog-poster' />
      </Link>
      <div className="dog-breed-name">{name}</div>
      <button className="like-button" onClick={() => toggleFavorite(id)}>
        {isFavorite ? "❤️" : "🤍"}
      </button>
    </div>
  );
}

export default DogImageCard;

