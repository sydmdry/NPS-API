'use strict';

const apiKey = 'flGJ8mjnPXGS6jXANOBoIKJXZph98FeqIaKhGpOx'
const searchURL = 'https://api.nps.gov/api/v1/parks'

//display our responseJson
//empty any previous search results
//loop through the items array
//append a list item that contains the full name, link, and description
//display the results by removing hidden
function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i=0; i<responseJson.data.length; i++){
        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <a href = ${responseJson.data[i].url}>${responseJson.data[i].url}</a>
            <p>${responseJson.data[i].description}</p>
            `
        )};
        $('#results').removeClass('hidden');
}


//pass through our params
//create an array of keys from the params object
//use map to create an array whose items are strings representing each key-value pair
//for each key use encodeURIComponent to convert the strings to URL format
//return a single string that joins each array item with &
function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
};


//create our params with the appropriate keys
//create a string for our params that's value is equal to formatQueryParams(params)
//let the url equal the original search url plus ? plus our queryString
//fetch our new url
//if response is ok then return response.json(), if not throw an error
//then pass responseJson through displayResults
//create an error message with catch
function getParks(input, limit=10) {
    const params = {
        stateCode: input,
        limit,
        api_key: apiKey
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(url)

    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};


//watch the submission of the form
//prevent the default form submission
//set variables state and maxResults to pass through getParks
//use .join(',') to format multiple state selection
function watchForm(){
    console.log('App Loaded!');
    $('form').submit(event =>{
        event.preventDefault();
            const state = $('.js-state').val().join(',');
            console.log(state);
            const maxResults =$('.js-max-results').val();
            console.log(maxResults);
            getParks(state,maxResults);
    });
};



//call watchForm when page loads
$(watchForm);