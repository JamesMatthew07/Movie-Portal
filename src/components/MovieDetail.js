import React from "react";
import { useNavigate } from "react-router-dom";

function MovieDetail({ movie }) {
  const navigate = useNavigate();

  if (!movie) {
    return null;
  }

  const handleImageClick = () => {
    navigate(
      `/view?title=${encodeURIComponent(movie.Title)}&released=${encodeURIComponent(
        movie.Released
      )}&plot=${encodeURIComponent(movie.Plot)}&poster=${encodeURIComponent(movie.Poster)}`
    );
  };

  return (
    <div className="card h-100">
      <div className="position-relative">
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="card-img-top"
            style={{ height: '400px', objectFit: 'cover', cursor: 'pointer' }}
            onClick={handleImageClick}
          />
        ) : (
          <div 
            className="bg-secondary text-white d-flex align-items-center justify-content-center"
            style={{ height: '400px', cursor: 'pointer' }}
            onClick={handleImageClick}
          >
            No Image Available
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">
          <small className="text-muted">
            {movie.Year} • {movie.Runtime}
          </small>
        </p>
        <p className="card-text text-truncate">
          {movie.Plot}
        </p>
      </div>
    </div>
  );
}

export default MovieDetail;