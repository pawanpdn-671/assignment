
// Selecting elements from the DOM

const searchBtn = document.querySelector('.search-btn-container');
const inputField = document.querySelector('#inputValue');
const searchedOutput = document.querySelector('#searchedResultBox');
const getMovieContainer = document.querySelector('.movie-container');

// Event Handler

searchBtn.addEventListener('click', (e) => {
    const value = inputField.value;

    e.preventDefault();
    searchMovie(value); 
    inputField.value = '';
});


// FUNCTIONS

function renderSearchMovies(data){
    searchedOutput.innerHTML = '';
    const title = 'Search Results';

    const getMoviesList = createMovieContainer(data.results, title);
    searchedOutput.appendChild(getMoviesList);
}

function getMovieDetail(movies) {
    const section = document.createElement('section');
    section.classList = 'section';

    movies.map((movie) => {
        
        if (movie.poster_path) {
            const img = document.createElement('img');
            img.src = IMAGE_url + movie.poster_path; 
            img.setAttribute('data-movie-id', movie.id);

            section.appendChild(img);
        }

    })
    return section;
}

function renderMovies(data) {
    const movies = data.results;
    const getMoviesList = createMovieContainer(movies, this.title);
    getMovieContainer.appendChild(getMoviesList);
}

function createMovieContainer(movies, title) {

    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const heading = document.createElement('h3');
    heading.innerHTML = title;

    const content = document.createElement('div');
    content.classList = 'content';

    const contentClose = '<p id="content-close">Close</p>'
    content.innerHTML = contentClose;

    const section = getMovieDetail(movies);

    movieElement.appendChild(heading);
    movieElement.appendChild(section);
    movieElement.appendChild(content);

    return movieElement;

}

function createVideoTemplate(data, content) {
    console.log(data);
    content.innerHTML = '<p id="content-close">Close</p>';
    const videos = data.results;
    const length = videos.length > 4 ? 4 : videos.length;
    const iframeContainer = document.createElement('div');
    iframeContainer.setAttribute('class', 'movieClips');

    for (let i = 0; i < length; i++){
        const video = videos[i];
        const iframe = createIframe(video);
        iframeContainer.appendChild(iframe);
        content.appendChild(iframeContainer);
    }    
}

function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.allowFullscreen = true;

    return iframe;
}

function handleError(error) {
    console.log('Error:', error);
}

//Event Delegation

document.onclick = function(event) {
    const target = event.target;
    
    if(target.tagName.toLowerCase() === 'img') {
        const movieID = event.target.dataset.movieId;
        console.log(movieID);

        const getParent1 = event.target.parentElement;
        const getParentSibling = getParent1.nextElementSibling;

        getParentSibling.classList.add('content-display');

        const path = `/movie/${movieID}/videos`;
        const url = generateURL(path);
        //Fetching Movie Video

        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            createVideoTemplate(data, getParentSibling);
        })
    }

    if(target.id === 'content-close'){
        const getParent2 = event.target.parentElement;
        getParent2.classList.remove('content-display');
    }
}


getUpcomingMovies();
getTopRateMovies();
getPopularMovies();
