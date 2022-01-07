import React from "react";
import PropTypes from "prop-types";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <div className="movie-card" onClick={onMovieClick}>
        {movie.Title}
      </div>
    );
  }
}

// MovieCard propTypes:
// The props object MUST include a movie object (shape({...}) means that it’s an object).
// The movie prop (object) MAY contain a Title key; if it does, then it MUST be of type string.
// The props object MUST contain onMovieClick and it MUST be a function.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
