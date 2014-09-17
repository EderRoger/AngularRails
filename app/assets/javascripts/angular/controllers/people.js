'use strict';

angular.module('angularRailsApp')
    .controller('PeopleCtrl', function ($scope, $http, $routeParams, $location) {
        $scope.title = "New People";
        $scope.people = {};

        var _id = $routeParams.id;
        $scope.btnLabel = "Save";

        if (_id) {
            $http({ method: 'GET', url: '/people/' + $routeParams.id+'.json' })
                .success(function (response) {
                    $scope.people = response;
                    $scope.btnLabel = "Edit";
                    $scope.title = "Edit: " + $scope.people.name;
                });
        }
        $scope.save = function () {
            var json = angular.toJson($scope.people);
            if($scope.people.id){

                $http.put('./people/'+$scope.people.id+'.json', json).success(function (response) {
                    $scope.people = response;
                    $location.path('/people/');
                });

            }else{
                $http.post('./people.json', json).success(function (response) {
                    $scope.people = response;
                    $location.path('./people/' + $scope.people.id);
                });
            }

        }

        $scope.remove = function () {

            var confirm = window.confirm("Confirm?");
            if(confirm){
                $http({ method: 'delete', url: './people/' + $scope.people.id+'.json' })
                    .success(function (response) {
                        $scope.people = response;
                        $location.path('/people');
                    });
            }
        }

    }).controller('PeopleListCtrl', function ($scope, $http) {
        $scope.title = "People";

        $http({ method: 'GET', url: './people.json' })
            .success(function (response) {
                $scope.people = response;
            });

    });