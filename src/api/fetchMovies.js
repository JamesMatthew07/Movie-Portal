export const fetchMovies = async (searchText, moviesCallBack, errorCallBack) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=d041143e&type=movie`);
        const data = await response.json();

        if (data.Response === 'True') {
            const movieDetailsPromises = data.Search.map((movie) => fetchMovieDetails(movie.imdbID, errorCallBack));
            const movieDetails = await Promise.all(movieDetailsPromises);
            
            moviesCallBack(movieDetails);
            errorCallBack(null);
        } else {
            moviesCallBack([]);
            errorCallBack(data.Error);
        }
    } catch (err) {
        moviesCallBack([]);
        errorCallBack('An error has occurred.');
    }
};

const fetchMovieDetails = async (id, errorCallBack) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=d041143e`);
        const data = await response.json();

        if (data.Response === 'True') {
            return data;
        } else {
            throw new Error(data.Error);
        }
    } catch (err) {
        errorCallBack('An error has occurred.');
        return null;
    }
};
