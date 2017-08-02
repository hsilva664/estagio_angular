'use strict';

angular.module('myApp.cardDetailed', ['ngRoute'])

    .controller('CardDetailedCtrl', ["$http", "config","$routeParams", function ($http, config, $routeParams) {
        var vm = this;

        vm.cardId=$routeParams.cardId;

        // vm.sendPost = function () {
        //     $http({
        //         method: "POST",
        //         url: config.URL + "cards",
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
        //         },
        //         data: {
        //                 "number": "1111 1111 1111 1111",
        //                 "brand": "visa",
        //                 "exp_year": 2021,
        //                 "exp_month":6,
        //                 "limit": "8000",
        //                 "name": "Murilo Z Marra"
        //         }
        //     }).then(function (response) {
        //         vm.data = response.data;
        //         vm.dataView = JSON.stringify(vm.data, null, "\t");
        //     }, function (response) {
        //         vm.data = response.data || 'Request failed';

        //     });
        // }
    }]);
