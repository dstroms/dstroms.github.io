var app = angular.module('booksForBuffs', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
	.when('/', {
		controller: 'HomeCtrl',
		templateUrl: 'views/home.html'
	})
	.when('/how-it-works', {
		controller: 'HowItWorksCtrl',
		templateUrl: 'views/how-it-works.html'
	})
	.when('/:isbn', {
		controller: 'ISBNCtrl',
		templateUrl: 'views/home.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});