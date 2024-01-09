import React from 'react';
import './Dogs.css';
import DogImageCard from '../DogImageCard/DogImageCard';

function Dogs({ dogs }) {
  // Filter out dogs with an empty breeds array
  const filteredDogs = dogs.filter(dog => dog.breeds.length > 0);

  return (
    <div className='dogs-container'>
      {filteredDogs.map((dog) => (
        <DogImageCard
          key={dog.id} // key
          dogcard={dog} 
        />
      ))}
    </div>
  );
}

export default Dogs;
