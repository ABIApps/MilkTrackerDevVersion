var rootRef = new Firebase('https://testfirebaselogin.firebaseio.com/');
'use strict';

angular.module('myApp.login', ['firebase.utils', 'firebase.auth', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])


.controller('LoginCtrl', ['$scope', 'Auth', '$location', 'fbutil', function($scope, Auth, $location, fbutil) {

 // Handle third party login providers
    // returns a promise
function thirdPartyLogin(provider) {
    var deferred = $.Deferred();

    rootRef.authWithOAuthPopup(provider, function (err, user) {
        if (err) {
           deferred.reject(err);
        }

        if (user) {
            deferred.resolve(user);
        }
    });
       return deferred.promise();
};

$scope.login = function(provider) {
    $scope.err = null;
    var socialLoginPromise;
    socialLoginPromise = thirdPartyLogin(provider);
	
	$.when(socialLoginPromise)
           .then(function (authData) {
			   //Check whether this user exists in DB
			    var ref = fbutil.ref('users', authData.uid);
				if (ref != null)
					{
						$location.path('/dashboard');
						return fbutil.handler(function(cb) {
								ref.set({email: email, name: name||firstPartOfEmail(email)}, cb);
								});	
					}
				else {
					//Create User
					createAccount(authData);
					}
				}
       , function (err) {
          $scope.err = errMessage(err);
        });
    };	
	
	
$scope.createAccount = function(authData) {
      $scope.err = null;
    
var usersRef = rootRef.child("users");
usersRef.set({
  "gh": {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  }
});

$location.path('/vendor');
}
/*
    // create user credentials in Firebase auth system
        Auth.$createUser(authData.uid)
          .then(function(user) {
            // create a user profile in our data store
            var ref = fbutil.ref('users', user.uid);
            return fbutil.handler(function(cb) {
              ref.set({email: email, name: name||firstPartOfEmail(email)}, cb);
            });
          })
          .then(function(// user ) {
            // redirect to the account page
            $location.path('/vendor');
          }, function(err) {
            $scope.err = errMessage(err);
          });
      } 
    };*/

}]);


/*


(function (jQuery, Firebase, Path) {
    "use strict";

    // the main firebase reference
    var rootRef = new Firebase('https://testfirebaselogin.firebaseio.com/');

    // pair our routes to our form elements and controller
    var routeMap = {
        '#/': {
            form: 'frmLogin',
            controller: 'login'
        },
        '#/logout': {
            form: 'frmLogout',
            controller: 'logout'
		},
	};
		
    // create the object to store our controllers
    var controllers = {};

    // store the active form shown on the page
    var activeForm = null;

    var alertBox = $('#alert');

    function routeTo(route) {
        window.location.href = '#/' + route;
    }

    // Handle third party login providers
    // returns a promise
    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        rootRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    };

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {
            showAlert({
                title: authData.getUid(),
                detail: "Succcess",
                className: 'alert-success'
            });

        }, function (err) {
            console.log(err);
            // pop up error
            showAlert({
                title: err.code,
                detail: err.message,
                className: 'alert-danger'
            });

        });
    }


    /// Controllers
    ////////////////////////////////////////

    controllers.login = function (form) {

        // Social buttons
        form.children('.bt-social').on('click', function (e) {

            var $currentButton = $(this);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
            e.preventDefault();

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        });

    };

    // logout immediately when the controller is invoked
    controllers.logout = function (form) {
        rootRef.unauth();
    };

    /// Routing
    ////////////////////////////////////////

    // Handle transitions between routes
    function transitionRoute(path) {
        // grab the config object to get the form element and controller
        var formRoute = routeMap[path];
        var currentUser = rootRef.getAuth();

        // if authentication is required and there is no
        // current user then go to the register page and
        // stop executing
        if (formRoute.authRequired && !currentUser) {
            routeTo('register');
            return;
        }

        // wrap the upcoming form in jQuery
        var upcomingForm = $('#' + formRoute.form);

        // if there is no active form then make the current one active
        if (!activeForm) {
            activeForm = upcomingForm;
        }

        // hide old form and show new form
        activeForm.hide();
        upcomingForm.show().hide().fadeIn(750);

        // remove any listeners on the soon to be switched form
        activeForm.off();

        // set the new form as the active form
        activeForm = upcomingForm;

        // invoke the controller
        controllers[formRoute.controller](activeForm);
    }


}(window.jQuery, window.Firebase, window.Path))

*/