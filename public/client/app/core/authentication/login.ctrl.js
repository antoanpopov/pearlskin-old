(function() {

    'use strict';

    angular
    .module('app')
    .controller('AuthController',  function($auth, $state,$http,$rootScope) {

        var vm = this;

        vm.loginError = false;
        vm.loginErrorText = '';

        vm.email='admin@gmail.com';
        vm.password='admin';
        vm.newUser={};
        vm.loginError=false;
        vm.loginErrorText='';

        vm.login = function() {
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function() {

                return $http.get('api/authenticate/user');

            }, function(error) {
                vm.loginError = true;
                vm.loginErrorText = error.data.error;

            }).then(function(response) {
                var user = JSON.stringify(response.data.user);

                // Set the stringified user data into local storage
                localStorage.setItem('user', user);

                // The user's authenticated state gets flipped to
                // true so we can now show parts of the UI that rely
                // on the user being logged in
                $rootScope.authenticated = true;

                // Putting the user's data on $rootScope allows
                // us to access it anywhere across the app
                $rootScope.currentUser = response.data.user;

                // Everything worked out so we can now redirect to
                // the users state to view the data
                $state.go('admin.dashboard');
            });
        }

        vm.register = function () {

            $http.post('/api/register',vm.newUser)
                .success(function(data){
                    vm.email=vm.newUser.email;
                    vm.password=vm.newUser.password;
                    vm.login();
                })

        };


    });

})();/**
 * Created by Antoan on 27.10.2015 г..
 */
