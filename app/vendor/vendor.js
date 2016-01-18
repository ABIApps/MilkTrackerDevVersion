'use strict';

var app = angular.module('myApp.vendor', ['ngRoute','firebase']);

app.controller('VendorCtrl', function($scope) {
  
  $scope.showDetails=function(){
    $scope.agencyName = 'ABI AGency';
	$scope.companyAddress = 'Padur Address';
    $scope.ownerName = 'Finny owner';
	$scope.phoneNum = '9999993242';
    $scope.email = 'myemail@sfv.com';
    $scope.aboutMe=$scope.ownerName +' '+ $scope.agencyName+' ' +$scope.email;
  }
});
