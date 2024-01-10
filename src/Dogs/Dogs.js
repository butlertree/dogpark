import React from 'react';
import './Dogs.css';
import DogImageCard from '../DogImageCard/DogImageCard';

function Dogs({ dogs, toggleFavorite }) {
  // Filter out dogs with an empty breeds array
  const filteredDogs = dogs.filter(dog => dog.breeds.length > 0);

  return (
    <div className='dogs-container'>
      {filteredDogs.map((dog) => (
        <DogImageCard
          key={dog.newID} // key
          id={dog.newID} //unique ID
          dogcard={dog} 
          isFavorite={dog.isFavorite}
          toggleFavorite={() => toggleFavorite(dog.newID)} // Pass the idea ID to toggleFavorit
        />
      ))}
    </div>
  );
}

export default Dogs;
