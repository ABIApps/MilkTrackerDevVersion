// Handle third party login providers
    // returns a promise
	// the main firebase reference
    var rootRef = new Firebase('https://testfirebaselogin.firebaseio.com/');
    // options for showing the alert box
    function showAlert(opts) {
        var title = opts.title;
        var detail = opts.detail;
        var className = 'alert ' + opts.className;

        alertBox.removeClass().addClass(className);
        alertBox.children('#alert-title').text(title);
        alertBox.children('#alert-detail').text(detail);
    }

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
    }

    // route to the specified route if sucessful
    // if there is an error, show the alert
    function handleAuthResponse(promise, route) {
        $.when(promise)
            .then(function (authData) {
            alert("Authenticated - " + authData.uid);
			
        }, function (err) {
            console.log(err);
            
			alert(err.code + "  " + err.message);

        });
    }
        function autheticateme(txtbox) {

            var $currentButton = $(txtbox);
            var provider = $currentButton.data('provider');
            var socialLoginPromise;
         

            socialLoginPromise = thirdPartyLogin(provider);
            handleAuthResponse(socialLoginPromise, 'profile');

        }