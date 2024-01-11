import React from 'react';
import { useParams } from 'react-router-dom';
import './DogDetails.css'; 

function DogDetails({ dogs, toggleFavorite }) {
    const { id } = useParams();
    const dog = dogs.find(d => d.newID === id);

    if (!dog) {
        return <p>Dog not found!</p>;
    }

    const { url } = dog;
    const breedDetails = dog.breeds[0] || {}; // Fallback to an empty object if no breed details
    const { name, bred_for, breed_group, life_span, temperament } = breedDetails;

    // Access the imperial weight
const weightImperial = breedDetails.weight ? breedDetails.weight.imperial : "";

// Access the imperial weight
const heightImperial = breedDetails.height ? breedDetails.height.imperial : "";

    return (
        <article className="dog-card">
            <button className="like-button" onClick={() => toggleFavorite(dog.newID)}>
                {dog.isFavorite ? "❤️" : "🤍"}
            </button>
            <div className='details-wrap'> 
                <section className="left-container">
                    <img src={url} alt={`${name} dog`} className="poster" />
                </section>
                <section className="right-container">
                    <h2 className="name">{name}</h2>
                    <h3 className="bred_for">Bred For: {bred_for}</h3>
                    <h3 className="breed_group">Breed Group: {breed_group}</h3>
                    <p className="life_span">Life Span: {life_span}</p>
                    <p className='temperament'>Temperament: {temperament}</p>
                    <p className="orgin">Weight: {weightImperial} lbs</p>
                    <p className="orgin">Height: {heightImperial} inches</p>
                </section>
            </div>
        </article>
    );
}

export default DogDetails;


