'use strict';

angular.module('myApp.editPayment', ['ngRoute'])


    .controller('EditPaymentCtrl', ["$location","$http", "config","$routeParams", function ($location,$http, config,$routeParams) {
        var vm = this;

        vm.sendGet = function (paymentID) {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                url: config.URL + "payments/"+paymentID,
            }).then(function (response) {                                
                vm.amount= response.data.amount;
                vm.status= response.data.status;

            }, function (response) {
                vm.data = response.data || 'Request failed';
            });
        }

        vm.cardId=$routeParams.cardId;
        vm.paymentId=$routeParams.paymentId;
        vm.sendGet(vm.paymentId);        


        vm.sendPatch = function (id,amount,status) {
            $http({
                method: "PATCH",
                url: config.URL + "payments/"+id,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                data: {
                        "amount": amount,
                        "status": status
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
 
            vm.sendPatch(vm.paymentId,vm.amount,vm.status);
            }
            catch(err){
                $location.path('/error');
            }

        }

        vm.cancelEdit=function() {
            $location.path('/cards/'+vm.cardId);
        }


    }]);
