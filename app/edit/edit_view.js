'use strict';

angular.module('myApp.edit', ['ngRoute'])



    .controller('EditCtrl', ['cardsServicesRequests',"$location", "config","$routeParams", function (cardsServicesRequests,$location, config,$routeParams) {
        var vm = this;

        vm.card={}
        vm.errors={}

        vm.sendGet = function (cardID) {
            cardsServicesRequests.getCard(cardID).then(function (response) {
                vm.card = response.data;
                vm.card_date=new Date();
                var t=parseInt(vm.card.exp_month)-1;                
                vm.card_date.setMonth(t.toString());
                vm.card_date.setFullYear(vm.card.exp_year);

                vm.card_limit=(vm.card.limit)/100;

            }, function (response) {
                vm.data = response.data || 'Request failed';
            });
        }

        vm.cardId = $routeParams.cardId;
        vm.sendGet(vm.cardId);        


        vm.sendPatch = function () {
            cardsServicesRequests.patchCard(vm.cardId,vm.card).then(function (response) {
                vm.data = response.data;
                $location.path('/success');
            }, function (response) {
                vm.errors=response.data.errors;
            });
        }

        vm.submitCard=function() {
  
          try{
            vm.card.exp_month=vm.card_date.getMonth()+1;
            vm.card.exp_year=vm.card_date.getFullYear();
            vm.card.limit=vm.card_limit*100;

            vm.sendPatch();
            }
            catch(err){
                $location.path('/error');
            }

        }

        vm.cancelEdit=function() {
            $location.path('/cards');
        }


    }]);
