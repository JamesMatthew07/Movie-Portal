import React from "react";
import { useSearchParams } from "react-router-dom";

const View = () => {
  const [searchParams] = useSearchParams();
  const movieTitle = searchParams.get("title") || "Unknown Title";
  const movieReleased = searchParams.get("released") || "Unknown Date";
  const moviePlot = searchParams.get("plot") || "No plot available";
  const moviePoster = searchParams.get("poster");

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          {moviePoster && moviePoster !== 'N/A' ? (
            <img
              src={moviePoster}
              alt={movieTitle}
              className="img-fluid rounded shadow-sm mb-3"
              style={{ maxWidth: '100%' }}
            />
          ) : (
            <div className="bg-secondary text-white d-flex align-items-center justify-content-center rounded"
                 style={{ height: '400px' }}>
              <span>No Image Available</span>
            </div>
          )}
        </div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">{movieTitle}</h3>
              <h6 className="card-subtitle mb-3 text-muted">{movieReleased}</h6>
              <p className="card-text" style={{ whiteSpace: 'pre-line' }}>{moviePlot}</p>
              <div className="mt-4">
                <a
                  href={`https://www.imdb.com/find/?q=${encodeURIComponent(movieTitle)}&ref_=nv_sr_sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary me-3"
                >
                  View on IMDB
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(movieTitle)}+trailer`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-danger"
                >
                  Watch Trailer
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;