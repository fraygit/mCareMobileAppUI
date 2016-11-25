var mcareAppLogin = angular.module('mcareAppLogin', ['ui.router', 'ngAnimate']);

mcareAppLogin.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('home', {
            url: '',
            abstract: true
        })

        .state('home.index', {
            url: '/login',
            views: {
                'container@': {
                    templateUrl: 'js/app/templates/login.html',
                    controller: 'LoginController'
                }
            }
        })

        .state('home.register', {
            url: '/register',
            views: {
                'container@': {
                    templateUrl: 'js/app/templates/register.html',
                    controller: 'RegisterController'
                }
            }
        })

}); 
