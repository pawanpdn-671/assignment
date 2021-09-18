// Initial Values

const API_key = 'f50ac189f241b240d4ab70717343a1e1';
const IMAGE_url = 'https://image.tmdb.org/t/p/w500';

function generateURL(path) {

    const url = `https://api.themoviedb.org/3${path}?api_key=${API_key}`;
    return url;

}

function requestMovies(url, onComplete, onError) {

    fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);

}

function searchMovie(value) {
    const path = '/search/movie';
    const url = generateURL(path) + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
    const path = '/movie/upcoming';
    const url = generateURL(path);
    requestMovies(url, renderMovies, handleError);
}

function getTopRateMovies() {
    const path = '/movie/top_rated';
    const url = generateURL(path);
    requestMovies(url, renderMovies, handleError);
}

function getPopularMovies() {
    const path = '/movie/popular';
    const url = generateURL(path);
    requestMovies(url, renderMovies, handleError);
}