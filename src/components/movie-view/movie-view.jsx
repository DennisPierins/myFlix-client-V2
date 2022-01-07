import React from "react";

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

  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <button onClick={() => onBackClick(null)}>Back</button>
      </div>
    );
  }
}
