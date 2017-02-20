var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.onload = callback;
  request.send();
}

var requestComplete = function(){
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var moviesDetails = JSON.parse(jsonString);
  var results = moviesDetails.Title;
  var urlSpot = moviesDetails.imdbID;
  var rated = moviesDetails.Rated;
  var runningTime = moviesDetails.Runtime;
  var rating = moviesDetails.imdbRating;
  var votes = moviesDetails.imdbVotes;
  var awards = moviesDetails.Awards;
  var plot = moviesDetails.Plot;
  populateMovies(results, urlSpot, rated, runningTime, rating, votes, awards, plot);
}


var populateMovies = function(results, urlSpot, rated, runningTime, rating, votes, awards, plot){
  var p = document.getElementById('movies');
  document.getElementById('movies').innerHTML = ""
  for (movie of results){
    var paragraph = document.createElement('p');
    p.innerHTML = 'Your movie: <br></br><a href = http://www.imdb.com/title/' + urlSpot + '>' + results + '</a><br></br>Rated: ' + rated + '<br></br>Run time: ' + runningTime + '<br></br>IMDB rating: ' + rating + ' From ' + votes + ' votes.<br></br>' + awards + '<br></br>Plot: <br></br>' + plot + '<br></br>'

    p.append(paragraph); 
  }
}

var searchMovie = function(){

  var searched = document.getElementById('search-query');
  var url = "https://www.omdbapi.com/?t=" + searched.value;
  makeRequest(url, requestComplete);
}

var app = function(){
  var button = document.getElementById('button');
  button.onclick = searchMovie;
}
window.onload = app;