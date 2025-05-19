import "../css/Favorites.css"
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from "../components/MovieCard";

function Favorites() {

    const { favorites } = useMovieContext();

    if (favorites) {
        return(
            <div className="favorites">
                <h2>Your Favorite Movie</h2>
            <div className="movies-grid">
            {favorites.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
            ))}
        </div>
        </div>
        )
    }
    return (
        <div className="favorites">
            <div className="favorites-empty">
                <h2>No Favorite Movies Yet</h2>
                <p>Add your favorites</p>
            </div>
        </div>
    )
}
export default Favorites;