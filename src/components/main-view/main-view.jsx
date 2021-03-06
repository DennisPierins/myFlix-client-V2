import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { NavBar } from "../navbar-view/nav-bar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";
import { ProfileUpdate } from "../profile-update/profile-update";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      // selectedMovie: null,
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://themyflixapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  // setSelectedMovie(movie) {
  //   this.setState({ selectedMovie: movie });
  // }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  render() {
    const { movies, user } = this.state;

    // /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    // if (!user)
    //   return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // // Before the movies have been loaded
    // if (movies.length === 0) return <div className="main-view" />;

    // <Button
    //   variant="primary"
    //   type="submit"
    //   className="logout-button"
    //   onClick={this.onLoggedOut}
    // >
    //   Log Out
    // </Button>
    return (
      <Router>
        <Container className="main-view">
          <NavBar user={user} />
          <br></br>
          <br></br>
          <br></br>

          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0)
                  return <Container className="main-view"></Container>;
                return movies.map((m) => (
                  <Col md={4} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (!movies) return <Container className="main-view" />;
                return (
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                  />
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match }) => {
                if (!movies) return <Container className="main-view" />;
                return (
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                  />
                );
              }}
            />
            <Route
              exact
              path="/users/:Username"
              render={() => <ProfileView movies={movies} />}
            />
            <Route
              exact
              path="/users/:Username/update"
              render={() => <ProfileUpdate movies={movies} />}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView;
