import 'bootstrap/dist/js/bootstrap.js';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { fetchMovies } from './api/fetchMovies';
import Header from './components/Header';
import MovieDetail from "./components/MovieDetail";
import View from './components/View';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) return;

    setLoading(true);
    setError(null);

    await fetchMovies(
      searchText,
      (movieResults) => {
        setMovies(movieResults.filter(movie => movie !== null));
        setLoading(false);
      },
      (errorMessage) => {
        setError(errorMessage);
        setLoading(false);
      }
    );
  };

  return (
    <Router basename="/Movie-Portal"
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div>
        <Header />
        <br />
        <div className='container'>
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for movies..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="text-center mt-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Routes */}
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="row">
                  {movies.map((movie, index) => (
                    <div key={movie.imdbID || index} className="col-md-6 col-lg-4 mb-4">
                      <MovieDetail movie={movie} />
                    </div>
                  ))}
                </div>
              } 
            />
            <Route path="/view" element={<View />} />
          </Routes>
        </div>
      </div>
    </Router>
    
  );

}

export default App;