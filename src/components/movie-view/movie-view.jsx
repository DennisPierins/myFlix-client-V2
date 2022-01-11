import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
  Image,
} from "react-bootstrap";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  // Code executed right after the component is added to the DOM.
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  // Code executed just before the moment the component gets removed from the DOM
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  addToFavoriteMovies(movie) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user");
    axios
      .post(
        `https://themyflixapi.herokuapp.com/users/${userId}/Movies/${movie._id}`,
        { username: localStorage.getItem("user") },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res);
        alert("This movie has been added to your Favorites.");
      });
  }

  render() {
    const { movie } = this.props;
    return (
      <div className="movie-view">
        <Card style={{ width: "50rem" }}>
          <Image src={movie.ImagePath} fluid={true} />
          <Card.Body>
            <Card.Title className="text-center">{movie.Title}</Card.Title>

            <Card.Text>
              <b>Description:</b> {movie.Description}
            </Card.Text>
          </Card.Body>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link" style={{ margin: "10px" }}>
              Director: {movie.Director.Name}
            </Button>
          </Link>

          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link" style={{ margin: "10px" }}>
              Genre: {movie.Genre.Name}
            </Button>
          </Link>
        </Card>
        <Link to={"/"}>
          <Button
            className="back-button"
            variant="secondary"
            style={{ margin: "10px" }}
          >
            Go Back
          </Button>
          <Button
            onClick={() => this.addToFavoriteMovies(movie)}
            className="button-add-favorite"
          >
            Add to Favorite Movies
          </Button>
        </Link>
      </div>
      // <div className="movie-view">
      //   <div className="movie-poster">
      //     <img src={movie.ImagePath} width="300" height="500" />
      //   </div>
      //   <div className="movie-title">
      //     <span className="label">Title: </span>
      //     <span className="value">{movie.Title}</span>
      //   </div>
      //   <div className="movie-description">
      //     <span className="label">Description: </span>
      //     <span className="value">{movie.Description}</span>
      //   </div>
      //   <Button variant="primary" onClick={() => onBackClick(null)}>
      //     Back
      //   </Button>
      // </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }),
};
