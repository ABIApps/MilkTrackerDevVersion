    var rootfburl = 'https://testfirebaselogin.firebaseio.com/';
    var rootfbRef = new Firebase(rootfburl);

    function thirdPartyLogin(provider) {
        var deferred = $.Deferred();

        rootfbRef.authWithOAuthPopup(provider, function (err, user) {
            if (err) {
                deferred.reject(err);
            }

            if (user) {
                deferred.resolve(user);
            }
        });

        return deferred.promise();
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {
            alert("Authenticated - " + authData.uid);
			window.location.href = "http://localhost:8000/app/#/vendor"
			
        }, function (err) {
            console.log(err);
            
			alert(err.code + "  " + err.message);

        });
    }
	      
      // Tests to see if /users/<userId> has any data. 
      function checkIfUserExists(userId) {
        rootfbRef.child('users').child(userId).once('value', function(snapshot) {
          var exists = (snapshot.val() !== null);

		if (exists) {
          alert('user ' + userId + ' exists!');
        } else {
          
		  alert('user ' + userId + ' does not exist!');
        }
		
        });
      }
	  
        function autheticateme(txtbox) {

            var $currentButton = $(txtbox);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
         

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        }