
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dogs from '../Dogs/Dogs';
import DogDetails from '../DogDetails/DogDetails';
import NotFound from '../NotFound/NotFound';
import dummydata from '../data/data';
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
    ]




  const [error, setError] = useState('')
  const [dogs, setDogs] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ')
      .then(response => response.json())
      .then(data => {
      const dogsWithFavorites = data.map(dog => ({ ...dog, isFavorite: false, newID: uuidv4() }));
      setDogs(dogsWithFavorites);
      })
      .catch(error => setError(error.message))
  }, []);


  
//Add to a favorite list

function toggleFavorite(newID) {
  //Find the dog with the given id and toggle its favorite status

  const updatedDogs = dogs.map(dog => {
    if (dog.newID === newID) {
      return {
        ...dog,
        isFavorite: !dog.isFavorite // toggle back and forth the true/false value
      }
    }
    return dog
  })
      setDogs(updatedDogs) //Changing the favorite state of dogs in the dogs array
}



// A separate list for favorite dogs, used for the /favorites route
const favoriteDogs = dogs.filter(dog => dog.isFavorite);


  
  return (
    <main className='App'>
      <header className='app-header'>
          <h1 className='big-heading'>Digital Dog Park</h1>
          <div className="buttons-container">
              <Link to="/favorites">View Favorites</Link> 
              <Link to="/">Back to Main</Link> 
          </div>
      </header>
      <section className='main-content'>
      <Routes>
        <Route
          path="/"
          element={<Dogs dogs={dogs} toggleFavorite={toggleFavorite}/>}
        />
        <Route path="/favorites" element={<Dogs dogs={favoriteDogs} toggleFavorite={toggleFavorite}/>} />
        <Route
            path="/dog/:id" 
            element={<DogDetails dogs={dogs} toggleFavorite={toggleFavorite}/>}
          />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
      </section>
      {error && <h2>Something went wrong, please try again later!</h2>}
   
    </main>
  );
}

export default App;
    
