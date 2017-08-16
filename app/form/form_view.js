'use strict';

angular.module('myApp.form', ['ngRoute'])



    .controller('FormCtrl', ["$location", "config", 'cardsServicesRequests', function ($location, config, cardsServicesRequests) {
        var vm = this;

        vm.errors={};

        vm.card = {};

        vm.sendPost = function () {
            cardsServicesRequests.postCard(vm.card).then(function (response) {
                vm.data = response.data;
                $location.path('/success');
            }, function (response) {
                vm.errors = response.data.errors;
            });
        }

        vm.submitCard=function() {
  
          try{
            if(vm.card_date) {
                vm.card.exp_month=vm.card_date.getMonth()+1;
                vm.card.exp_year=vm.card_date.getFullYear();
            }
            else {
                vm.card.exp_month=null;
                vm.card.exp_year=null;
            }

            if(vm.card_limit) {
                vm.card.limit=vm.card_limit*100;
            }
            else {
                vm.card.limit=null;
            }

            vm.sendPost();
            }
            catch(err){
                $location.path('/error');
            }

        }


    }]);
