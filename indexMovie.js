const autocompleteConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `
        <img src= "${imgSrc}" />
        ${movie.Title} (${movie.Year})
    `;
},
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                apikey: 'f7b30202',
               s: searchTerm
            }
        });
        
if (response.data.Error) {
         return [];
        }
    
    return response.data.Search;
    }
};

createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('left-summary'), 'left');
    },
});
createAutoComplete({
    ...autocompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, document.querySelector('#right-summary'),'right');
    },
});

let leftmovie;
let rightmovie;
const onMovieSelect = async (movie, summaryElement, side) => {
const response = await axios.get('http://www.omdbapi.com/', {
    params: {
        apikey: 'f7b30202',
        i: movie.imdbID
    }
});

   summaryElement.innerHTML = movieTemplate(response.data);

    if ( side=== 'left') {
        leftmovie = response.data;
 } else {
    rightmovie= response.data;
 }

 if (leftmovie && rightMovie) {
    runComparison();
 }
};

const runComparison = () => {
    const leftsidestats = document.querySelectorAll(
    '#left-summary .notification'
    );
    const rightSideStats = document.querySelectorAll(
        '#right-summary .notification'
        );

    leftsidestats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = LeftStat.dataSet.value;
        const rightSideValue = rightState.Dataset.value;

        if (rightSideValue > LeftSideValue) {
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    });
};
    
    const movieTemplate = movieDetail => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
    );
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imbdRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value=parseInt(word);

        if (isNaN(value)) {
        return prev;
    } else {
        return prev + value;
    }
    }, 0);
    console.log(awards);

return `
     <article class="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.poster}" />
            </p>
        </figure>
        <div class="media-content">
                <div class="content"
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
        </article>

        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imbdVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <class="subtitle">IMDB Votes</p>
        </article>
    `;
};