'use strict';
var rootfirebaseRef = new Firebase('https://testfirebaselogin.firebaseio.com/');

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute'
  ,'myApp.landing',
  ,'myApp.vendor'
]).
config(['$routeProvider', 
			function($routeProvider) {
				$routeProvider.
					when('/vendor', {	
						templateUrl: 'vendor/vendor.html',
						controller: 'vendorCtrl'
					}).
					when('/phones/:phoneId', {
						templateUrl: 'partials/phone-detail.html',
						controller: 'PhoneDetailCtrl'
					}).
					otherwise({
						redirectTo: '/vendor'
					});
			}
]);
