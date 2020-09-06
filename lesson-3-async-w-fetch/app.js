(function () {
    const unsplashBtn = document.querySelector('.unsplash');
    const nytimesBtn = document.querySelector('.nytimes');

    const unsplashSearchContainer = document.querySelector('.unsplash-form');
    const nytimesSearchContainer = document.querySelector('.nytimes-form');

    const unsplashForm = unsplashSearchContainer.querySelector('#search-form');
    const nytimesForm = nytimesSearchContainer.querySelector('#search-form');

    const unsplashSearchField = unsplashForm.querySelector('#search-keyword');
    const nytimesFormSearchField = nytimesForm.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    document.querySelectorAll('button').forEach( function( item, index ) {
        item.addEventListener('click', function(e){
           if( e.currentTarget.classList.value === 'unsplash' ){
                unsplashSearchContainer.style.display = '';
                nytimesSearchContainer.style.display = 'none';
           } else if( e.currentTarget.classList.value === 'nytimes' ){
                nytimesSearchContainer.style.display = '';
                unsplashSearchContainer.style.display = 'none';
           }
        });
    });


    function addImage(response){
        var results = response.results;
        console.log( results );
        // return;
        var htmlMarkup = '';
        if(response && results && results[0] ){
            results.forEach( function(value, key) {
                htmlMarkup += `
                        <figure>
                            <img src="${value.urls.regular}" alt="${searchedForText}">
                            <figcaption>${searchedForText} by ${value.user.name}</figcaption>
                        </figure>
                `;
            });
        }else{
            htmlMarkup = `Nothing is found by this "${searchedForText}" keyword`;
        }
        responseContainer.innerHTML = htmlMarkup;
    }

    function requestError(e, part) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${part}.</p>`);
    }

    unsplashForm.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = unsplashSearchField.value;

        fetch(
            "https://api.unsplash.com/search/photos?page=1&per_page=20&query="+searchedForText,
            {
                headers: {
                    Authorization:'Client-ID RI1OYZZb-rlR9NJEzdNzpiNsarvK4VGhgqpfVQlvWMw'
                },
            }
        ).then(function(response) {

            // return response.arrayBuffer();
            // return     response.blob();
            // return     response.formData();
            return    response.json();
            // return     response.text();
        }).then(addImage)
          .catch(e => requestError(e, 'image'));
    });

    function addArticles(responseData){
        var response = responseData.response;
        // console.log( responseData );
        // return;
        var htmlMarkup = '';
        if(response && response.docs && response.docs.length > 0 ){

            htmlMarkup = response.docs.map(function(article,index){
                return `<div class="figure-${index}">
                    <h4><a href="${article.web_url}">${article.headline.main}</a></h4>
                    <p>${article.snippet}</p>
                </div>`;
            }).join('');

        }else{
            htmlMarkup = `Nothing is found by this "${searchedForText}" keyword`;
        }
        responseContainer.innerHTML = htmlMarkup;
    }

    nytimesForm.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = nytimesFormSearchField.value;

        fetch(
            "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+searchedForText+"&api-key=4o6Gt7rGQsMSeSi7dXw0TovWyyt4SkCn"
        ).then(function(response) {

            // return response.arrayBuffer();
            // return     response.blob();
            // return     response.formData();
            return    response.json();
            // return     response.text();
        }).then(addArticles)
        .catch(e => requestError(e, 'article'));
    });


})();
