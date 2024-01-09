import React from 'react';
import { Link } from 'react-router-dom';
import './DogImageCard.css';

function DogImageCard({ dogcard }) {
  const { name, url, newID } = dogcard;

  return (
    <div className='dog-container'>
      <Link to={`/dog/${newID}`}>
        <img src={url} alt={name} className='dog-image' />
      </Link>
      <h2 className='dog-name'>{name}</h2>
    </div>
  );
}

export default DogImageCard;

