'use strict';

angular.module('myApp.addPayment', ['ngRoute'])



    .controller('AddPaymentCtrl', ['paymentServicesRequests',"$location","$http", "config", "$routeParams",function (paymentServicesRequests,$location,$http, config, $routeParams) {
        var vm = this;
        vm.payment={};

        vm.payment.card_id=$routeParams.cardId;

        vm.sendPost = function () {
            paymentServicesRequests.postPayment(vm.payment).then(function (response) {
                vm.data = response.data;
                $location.path('/cards/'+vm.payment.card_id);
            }, function (response) {  
                //vm.errors = response.data.errors;
                $location.path('/error');
            });
        }

        vm.submitPayment=function() {
  
          try{

            if(vm.payment_amount!='undefined') {
                vm.payment.amount=100*vm.payment_amount;
            }
            else {
                vm.payment.amount=null;
            }
            vm.sendPost();
            }
            catch(err){
                $location.path('/error');
            }

        }


    }]);
