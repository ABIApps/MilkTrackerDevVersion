'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.config'
  ,'ngRoute'
  ,'firebase'
  ,'myApp.login'
  ,'myApp.vendor'
]).
config(['$routeProvider', 
			function($routeProvider) {
				$routeProvider.
					when('/vendor', {	
						templateUrl: 'vendor/vendor.html',
						controller: 'VendorCtrl'
					}).
					when('/phones/:phoneId', {
						templateUrl: 'partials/phone-detail.html',
						controller: 'PhoneDetailCtrl'
					}).
					otherwise({
						redirectTo: '/login'
					});
			}
]);
