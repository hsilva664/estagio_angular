'use strict';

angular.module('myApp.addPayment', ['ngRoute'])



    .controller('AddPaymentCtrl', ["$location","$http", "config", "$routeParams",function ($location,$http, config, $routeParams) {
        var vm = this;

        vm.cardId=$routeParams.cardId;

        vm.sendPost = function (cardId,amount) {
            $http({
                method: "POST",
                url: config.URL + "payments",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                data: {
                        "amount": amount,
                        "card_id": cardId
                }
            }).then(function (response) {
                vm.data = response.data;
                $location.path('/cards/'+vm.cardId);
            }, function (response) {
                vm.data = response.data || 'Request failed';
                $location.path('/error');
            });
        }

        vm.submitPayment=function() {
  
          try{
            vm.sendPost(vm.cardId,vm.amount);
            }
            catch(err){
                $location.path('/error');
            }

        }


    }]);
