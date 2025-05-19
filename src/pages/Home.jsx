import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import '../css/Home.css';
import { getPopularMovies, searchMovies } from "../services/api"

function Home() {

    const [searchQuery, setSeachQuery] = useState("");
    const [movies, setMovies] = useState([]); // anytime we update the movies list it will re-render the component
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // If query is empty, load popular movies again
        if (!searchQuery.trim()) {
            const loadPopularMovies = async () => {
                setLoading(true);
                try {
                    const popularMovies = await getPopularMovies();
                    setMovies(popularMovies);
                    setError(null);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load movies...");
                } finally {
                    setLoading(false);
                }
            };
            loadPopularMovies();
            return;
        }

        const performSearch = async () => {
            setLoading(true);
            try {
                const results = await searchMovies(searchQuery);
                setMovies(results);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Failed to search movies");
            } finally {
                setLoading(false);
            }
        };

        performSearch();

    }, [searchQuery]);

    return (
        <div className="home">
            <form className="search-form" onSubmit={e => e.preventDefault()}>
                <input
                    type="text"
                    placeholder="Search for Movies..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSeachQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? (
                <h2 className="loading">Loading</h2>
            ) : (
                <>
                    {movies.length === 0 ? (
                        <div className="no-results">No results found</div>
                    ) : (
                        <div className="movies-grid">
                            {movies.map((movie) => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Home;