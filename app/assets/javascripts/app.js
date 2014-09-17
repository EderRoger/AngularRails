'use strict';

var angular_mongo_app = angular
    .module('angularRailsApp', [
        'ngRoute'
    ]);

angular_mongo_app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/people', {
                templateUrl: '../templates/people/index.html',
                controller: 'PeopleListCtrl'
            }).
            when('/people/new', {
                templateUrl: '../templates/people/form.html',
                controller: 'PeopleCtrl'
            }).
            when('/people/:id', {
                templateUrl: '../templates/people/form.html',
                controller: 'PeopleCtrl'
            }).
            otherwise({
                redirectTo: '/people'
            });
    }]);
angular_mongo_app.config([
    "$httpProvider", function($httpProvider) {
        $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
]);