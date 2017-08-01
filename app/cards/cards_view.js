'use strict';

angular.module('myApp.cards', ['ngRoute'])



    .controller('CardsCtrl', ["$location","$http", "config", function ($location, $http, config) {
        var vm = this;

        vm.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                url: config.URL + "cards",
            }).then(function (response) {
                vm.data = response.data;
                vm.dataView = JSON.stringify(vm.data, null, "\t");
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }

        vm.showCard= function(cardID) {
            $location.path('/cards/' + cardID);
        }

        vm.sendGet();

    }]);
