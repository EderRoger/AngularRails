'use strict';

var angular_mongo_app = angular
    .module('angularRailsApp', [
        'ngRoute'
    ]);

angular_mongo_app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/pessoas', {
                templateUrl: '../templates/index.html',
                controller: 'PessoaListCtrl'
            }).
            when('/pessoas/novo', {
                templateUrl: '../templates/form.html',
                controller: 'PessoaCtrl'
            }).
            when('/pessoas/:id', {
                templateUrl: '../templates/form.html',
                controller: 'PessoaCtrl'
            }).
            otherwise({
                redirectTo: '/pessoas'
            });
    }]);
angular_mongo_app.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);