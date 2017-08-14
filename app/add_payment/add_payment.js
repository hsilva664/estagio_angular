'use strict';

angular.module('myApp.addPayment', ['ngRoute'])



    .controller('AddPaymentCtrl', ['paymentServicesRequests',"$location","$http", "config", "$routeParams",function (paymentServicesRequests,$location,$http, config, $routeParams) {
        var vm = this;

        vm.cardId=$routeParams.cardId;

        vm.sendPost = function (cardId,amount) {
                var data = {
                        "amount": amount,
                        "card_id": cardId
                };
            paymentServicesRequests.postPayment(data).then(function (response) {
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
