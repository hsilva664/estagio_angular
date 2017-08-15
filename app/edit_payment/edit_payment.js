'use strict';

angular.module('myApp.editPayment', ['ngRoute'])


    .controller('EditPaymentCtrl', ['paymentServicesRequests',"$location", "config","$routeParams", function (paymentServicesRequests,$location, config,$routeParams) {
        var vm = this;

        vm.sendGet = function (paymentID) {
            paymentServicesRequests.getPayment(paymentID).then(function (response) {                                
                vm.amount= response.data.amount/100;
                vm.status= response.data.status;

            }, function (response) {
                vm.data = response.data || 'Request failed';
            });
        }

        vm.cardId=$routeParams.cardId;
        vm.paymentId=$routeParams.paymentId;
        vm.sendGet(vm.paymentId);        


        vm.sendPatch = function (id,amount,status) {
                var data = {
                        "amount": amount,
                        "status": status
                };
            paymentServicesRequests.patchPayment(id,data).then(function (response) {
                vm.data = response.data;
                $location.path('/cards/'+vm.cardId);
            }, function (response) {
                vm.data = response.data || 'Request failed';
                $location.path('/error');
            });
        }

        vm.submitPayment=function() {
  
          try{
 
            vm.sendPatch(vm.paymentId,(vm.amount*100),vm.status);
            }
            catch(err){
                $location.path('/error');
            }

        }

        vm.cancelEdit=function() {
            $location.path('/cards/'+vm.cardId);
        }


    }]);
