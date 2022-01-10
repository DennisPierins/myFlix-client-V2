import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <div>
        <Card style={{ height: "43rem" }}>
          <Card.Img
            variant="top"
            src={movie.ImagePath}
            width="300"
            height="400"
          />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Movie Details</Button>
            </Link>
          </Card.Body>
        </Card>
        <br></br>
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
};
