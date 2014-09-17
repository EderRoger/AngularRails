'use strict';

/**
 * @ngdoc function
 * @description
 * # PessoaCtrl
 * # PessoaListCtrl
 * Controller of the angularMongoApp
 */
angular.module('angularRailsApp')
    .controller('PessoaCtrl', function ($scope, $http, $routeParams, $location) {
        $scope.title = "Cadastrando nova Pessoa";
        $scope.pessoa = {};

        var _id = $routeParams.id;
        $scope.btnLabel = "Cadastrar";

        if (_id) {
            $http({ method: 'GET', url: '/pessoas/' + $routeParams.id+'.json' })
                .success(function (response) {
                    $scope.pessoa = response;
                    $scope.btnLabel = "Editar";
                    $scope.title = "Editando: " + $scope.pessoa.nome;
                });
        }
        $scope.save = function () {
            var json = angular.toJson($scope.pessoa);
            if($scope.pessoa.id){

                $http.put('./pessoas/'+$scope.pessoa.id+'.json', json).success(function (response) {
                    $scope.pessoa = response;
                    $location.path('/pessoas/');
                });

                /*$http({ method: 'PUT', url: '/pessoas/'+ $scope.pessoa.id, data: json })
                    .success(function (response) {
                        $scope.pessoa = response;
                        $location.path('/pessoas/');
                    });*/
            }else{
                $http.post('./pessoas.json', json).success(function (response) {
                    $scope.pessoa = response;
                    $location.path('./pessoas/' + $scope.pessoa.id);
                });
               /* $http({ method: 'POST', url: './pessoas.json', data: json })
                    .success(function (response) {
                        $scope.pessoa = response;
                        $location.path('/pessoas/' + $scope.pessoa.id+'.json');
                    });*/
            }

        }

        $scope.remove = function () {

            var confirm = window.confirm("Confirma deletar?");
            if(confirm){
                $http({ method: 'delete', url: './pessoas/' + $scope.pessoa.id+'.json' })
                    .success(function (response, status, headers) {
                        $scope.pessoa = response;
                        $location.path('/pessoas');
                    });
            }
        }

    }).controller('PessoaListCtrl', function ($scope, $http) {
        $scope.title = "Pessoas";

        $http({ method: 'GET', url: './pessoas.json' })
            .success(function (response, status, headers) {
                $scope.pessoas = response;
            });

    });