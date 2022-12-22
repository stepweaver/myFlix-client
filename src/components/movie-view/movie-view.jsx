export const MovieView = ({ movieData }) => {
  return (
    <div>
      <div>
        <img src={movieData.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movieData.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movieData.director}</span>
      </div>
    </div>
  );
};