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

    function addImage(){
        var response = JSON.parse(this.responseText);
        var results = response.results;
        console.log( response );
        var htmlMarkup = '';
        if(response && results && results[0] ){

            /* results.forEach( function(value, key) {
                if ( 3 === key ) {
                    break;
                }
                console.log( key );
                htmlMarkup += `
                        <figure>
                            <img src="${value.urls.regular}" alt="${searchedForText}">
                            <figcaption>${searchedForText} by ${value.user.name}</figcaption>
                        </figure>
                `;
            });*/

            for (let i = 0; i < results.length; i++) {
                // console.log(results);
                // console.log(results[i]);
                  htmlMarkup += `
                        <figure class="figure-${i}">
                            <img src="${results[i].urls.regular}" alt="${searchedForText}">
                            <figcaption>${searchedForText} by ${results[i].user.name}</figcaption>
                        </figure>
                `;
                // if ( 3 === i ) {
                //     break;
                // }
            }
        }else{
            htmlMarkup = `Nothing is found by this "${searchedForText}" keyword`;
        }
        responseContainer.innerHTML = htmlMarkup;
    }
    function imageError(err){
        console.log(err);
        //requestError('err', 'image')
    };
    
    

    unsplashForm.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = unsplashSearchField.value;
        var unsplashRequest = new XMLHttpRequest(); //https://api.unsplash.com/search/photos?page=1&query=
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID RI1OYZZb-rlR9NJEzdNzpiNsarvK4VGhgqpfVQlvWMw');
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = imageError;
        unsplashRequest.send();
    });
    
    function addArticles(){
        // console.log( this.responseText );
        var data = JSON.parse(this.responseText);
        var response = data.response;
        console.log( this );
        // console.log( this.response );
        // var blob = new Blob([this.response], {type: 'image/png'});
        // console.log( blob );
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
    function articleError(err){
        console.log(err);
        //requestError('err', 'article')
    };

    nytimesForm.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = nytimesFormSearchField.value;
        var articleRequest = new XMLHttpRequest();
        articleRequest.open('GET', `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=4o6Gt7rGQsMSeSi7dXw0TovWyyt4SkCn`);
        // articleRequest.open('GET', `https://images.unsplash.com/photo-1594926415002-ce37628243fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60`);
        // articleRequest.responseType = 'blob';
        articleRequest.onload = addArticles;
        articleRequest.onerror = articleError;
        articleRequest.send();
    });

    //https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=4o6Gt7rGQsMSeSi7dXw0TovWyyt4SkCn


    

})();
