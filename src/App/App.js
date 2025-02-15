import './App.css';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import moviePosters from '../data/movie_posters';
import movieDetails from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useState } from 'react';

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const [details , setDetails] = useState(null);

  const downVote = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, vote_count: Math.max(movie.vote_count - 1, 0) };
      } 
      return movie; 
    });
    setMovies(updatedMovies);
  };

  const upVote = (id) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {...movie, vote_count: movie.vote_count +1}
      }
      return movie;
    })
    setMovies(updatedMovies);
  };

  function findDetails() {
      setDetails(movieDetails)
  }

  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
      {!details ? (<MoviesContainer movies={movies} downVote={downVote} upVote={upVote} findDetails={findDetails}/> )
      : ( <MovieDetails details={details}/>)}
    </main>
  );
}

export default App;