import './Home.css';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import NavBar from '../NavBar/NavBar';
import { useState, useEffect } from 'react';

const API_URL = `https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies`;

function Home() {
  const [movies, setMovies] = useState([]);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setMovies(data || []); 
      })
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  const updateVote = (id, voteDirection) => {
    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ vote_direction: voteDirection })
    })
      .then((response) => response.json())
      .then((updatedMovie) => {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === id ? { ...movie, vote_count: updatedMovie.vote_count } : movie
          )
        );
      })
      .catch((error) => console.error('Error updating vote:', error));
  };

  const downVote = (id) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      updateVote(id, 'down'); 
    }
  };

  const upVote = (id) => {
    const movie = movies.find((m) => m.id === id);
    if (movie) {
      updateVote(id, 'up'); 
    }
  };

  return (
    <main className='Home'>
        <NavBar setDetails={setDetails} details={details}/>
        <MoviesContainer movies={movies} downVote={downVote} upVote={upVote}/> 
    </main>
  );
}
export default Home;