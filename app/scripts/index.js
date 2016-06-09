var $ = require('jquery');
var handlebars = require('handlebars');
var _ = require('underscore');


var baseUrl = 'http://swapi.co/api/'; //base url to call api from
var planetListItemTemplate = $('#planet-list-item-template').html();
var template = handlebars.compile(planetListItemTemplate);

//register event handler for click of the button with class js-planets-button
$('.js-planets-button').click(function(event){
  event.preventDefault();

  getPlanets();

});

function getPlanets(){
  var planetsUrl = baseUrl + 'planets/'

  $.ajax(planetsUrl).done(function(planetList){ //ajax returns a promise to retrieve some data, done says to call the function when the network request is complete.
    planetList.results.forEach(function(planet, index, array){
     displayPLanet(planet);
    });
  });
}

function displayPLanet(planet){
  var html = template(planet);
  $('.js-planet-list').append(html);

  $.ajax(planet.url).done(function(planetDetails){
    $('#' + planetDetails.name).append('<span>:: ' + planetDetails.climate + '</span>')
  })
}
