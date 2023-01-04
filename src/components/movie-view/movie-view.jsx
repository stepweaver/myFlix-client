export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <div>
        <img width='100%' src={movieData.image} />
      </div>
      <br />
      <div>{movieData.title}</div><br />
      <div>
        <span>Year: </span>
        <span>{movieData.year}, </span>
        <span>Rated: </span>
        <span>{movieData.rating}</span>
      </div><br />
      <div>
        <span>Genre: </span>
        <span>{movieData.genre}</span>
      </div><br />
      <div>{movieData.description}</div><br />
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};