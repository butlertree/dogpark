
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dogs from '../Dogs/Dogs';
import DogDetails from '../DogDetails/DogDetails';
import NotFound from '../NotFound/NotFound';
import dummydata from '../data/data';




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
  const [dogs, setDogs] = useState(dummydata);

  // useEffect(() => {
  //   fetch('https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_00isfy9kzQCyFWWBludIQFj4g1pDwEoM87PH2PTVx8njhE7q1oEBDzg5lOhHq0QZ')
  //     .then(response => response.json())
  //     .then(data => setDogs(data))
  //     .catch(error => setError(error.message))
  // }, []);



  
  return (
    <main className='App'>
      <header className='app-header'>
          <h1 className='big-heading'>Digital Dog Park</h1>
      </header>
      <section className='main-content'>
      <Routes>
        <Route
          path="/"
          element={<Dogs dogs={dogs}/>}
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
    
