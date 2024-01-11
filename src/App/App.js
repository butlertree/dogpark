import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dogs from '../Dogs/Dogs';
import DogDetails from '../DogDetails/DogDetails';
import NotFound from '../NotFound/NotFound';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const dummydata = [
    {
      "breeds": [
        {
          "weight": {
            "imperial": "6 - 13",
            "metric": "3 - 6"
          },
          "height": {
            "imperial": "9 - 11.5",
            "metric": "23 - 29"
          },
          "id": 1,
          "name": "Affenpinscher",
          "bred_for": "Small rodent hunting, lapdog",
          "breed_group": "Toy",
          "life_span": "10 - 12 years",
          "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
          "origin": "Germany, France",
          "reference_image_id": "BJa4kxc4X"
        }
      ],
      "id": "BJa4kxc4X",
      "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X_1280.jpg",
      "width": 1600,
      "height": 1199
    },
  ];

  const [error, setError] = useState('');
  const [dogs, setDogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ')
      .then(response => response.json())
      .then(data => {
        const dogsWithFavorites = data.map(dog => ({ ...dog, isFavorite: false, newID: uuidv4() }));
        setDogs(dogsWithFavorites);
      })
      .catch(error => setError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const fetchMoreDogs = () => {
    setIsLoading(true);
    fetch('https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ')
      .then(response => response.json())
      .then(newDogs => {
        const uniqueNewDogs = newDogs.filter(newDog =>
          !dogs.some(existingDog => existingDog.url === newDog.url)
        );
        const dogsWithFavorites = uniqueNewDogs.map(dog => ({
          ...dog,
          isFavorite: false,
          newID: uuidv4()
        }));
        setDogs(prevDogs => [...prevDogs, ...dogsWithFavorites]);
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function toggleFavorite(newID) {
    const updatedDogs = dogs.map(dog => {
      if (dog.newID === newID) {
        return {
          ...dog,
          isFavorite: !dog.isFavorite
        };
      }
      return dog;
    });
    setDogs(updatedDogs);
  }

  const favoriteDogs = dogs.filter(dog => dog.isFavorite);



  
  
  
  
  
  function filterDogsByBreedGroup(breedGroup) {
    if (!dogs) {
      return [{ name: "Loading..." }];
    }
  
    const filteredDogs = dogs.filter(dog => dog.breeds && dog.breeds[0]?.breed_group === breedGroup);
  
    if (filteredDogs.length === 0) {
      return [{ name: "No breeds found" }];
    }
  
    return filteredDogs;
  }
  
  

  return (
    <main className='App'>
      <header className='app-header'>
        <h1 className='big-heading'>Digital Dog Park</h1>
        <nav className="buttons-breed">
          <Link to="/group/working"><i className="fas fa-paw"></i>Working</Link>
          <Link to="/group/herding"><i className="fas fa-paw"></i>Herding</Link>
          <Link to="/group/non_sporting"><i className="fas fa-paw"></i>Non-Sporting</Link>
          <Link to="/group/toy"><i className="fas fa-paw"></i>Toy</Link>
          <Link to="/group/hound"><i className="fas fa-paw"></i>Hound</Link>
          <Link to="/group/terrier"><i className="fas fa-paw"></i>Terrier</Link>
          <Link to="/group/sporting"><i className="fas fa-paw"></i>Sporting</Link>
        </nav>
        <div className="buttons-container">
          <Link to="/favorites">View Favorites</Link>
          <Link to="/">Back to Main</Link>
        </div>
      </header>
      <section className='main-content'>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <Routes>
            <Route path="/" element={<Dogs dogs={dogs} toggleFavorite={toggleFavorite} />} />
            <Route
          path="/favorites"
          element={
            <>
              {favoriteDogs === null || favoriteDogs.length === 0 ? (
                <h2>No favorite dogs selected.</h2>
              ) : (
                <Dogs dogs={favoriteDogs} toggleFavorite={toggleFavorite} />
              )}
            </>
          }
        />
            <Route path="/dog/:id" element={<DogDetails dogs={dogs} toggleFavorite={toggleFavorite} />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/group/working" element={<Dogs dogs={filterDogsByBreedGroup('Working')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/sporting" element={<Dogs dogs={filterDogsByBreedGroup('Sporting')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/herding" element={<Dogs dogs={filterDogsByBreedGroup('Herding')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/non_sporting" element={<Dogs dogs={filterDogsByBreedGroup('Non-Sporting')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/toy" element={<Dogs dogs={filterDogsByBreedGroup('Toy')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/hound" element={<Dogs dogs={filterDogsByBreedGroup('Hound')} toggleFavorite={toggleFavorite} />} />
            <Route path="/group/terrier" element={<Dogs dogs={filterDogsByBreedGroup('Terrier')} toggleFavorite={toggleFavorite} />} />
          </Routes>
        )}
      </section>
      {error && <h2>Something went wrong, please try again later!</h2>}
      
      <footer className="app-footer">
        <h2 className='footer-heading'>Digital Dog Park</h2>
        <div className="footer-button-container">
          <button onClick={fetchMoreDogs} className="dog-tag-button">
            <i className="fa-solid fa-dog-leashed"></i> Fetch More Dogs
          </button>
        </div>
      </footer>
    </main>
  );
}

export default App;
