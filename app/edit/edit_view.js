'use strict';

angular.module('myApp.edit', ['ngRoute'])



    .controller('EditCtrl', ["$location","$http", "config","$routeParams", function ($location,$http, config,$routeParams) {
        var vm = this;

        vm.sendGet = function (cardID) {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                url: config.URL + "cards/"+cardID,
            }).then(function (response) {
                vm.initialData=response.data;
                vm.cardholder_name=vm.initialData.name;
                vm.card_number=parseInt(vm.initialData.number);
                vm.brand=vm.initialData.brand

                vm.card_date=new Date();
                var temp=parseInt(vm.initialData.exp_month);
                temp=temp-1;
                vm.card_date.setMonth(temp.toString());
                vm.card_date.setFullYear(vm.initialData.exp_year);

                vm.card_limit=vm.initialData.limit;

            }, function (response) {
                vm.data = response.data || 'Request failed';
            });
        }

        vm.cardId=$routeParams.cardId;
        vm.sendGet(vm.cardId);        


        vm.sendPatch = function (id,number,brand,exp_year,exp_month,limit,name) {
            $http({
                method: "PATCH",
                url: config.URL + "cards/"+id,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                data: {
                        "number": number,
                        "brand": brand,
                        "exp_year": exp_year,
                        "exp_month":exp_month,
                        "limit": limit,
                        "name": name
                }
            }).then(function (response) {
                vm.data = response.data;
                $location.path('/success');
            }, function (response) {
                vm.data = response.data || 'Request failed';
                $location.path('/error');
            });
        }

        vm.submitCard=function() {
  
          try{
            var name=vm.cardholder_name;
            var number=vm.card_number;
            var brand=vm.brand;
            var exp_month=vm.card_date.getMonth();
            var exp_year=vm.card_date.getFullYear();
            var limit=vm.card_limit;

            vm.sendPatch(vm.cardId,number,brand,exp_year,exp_month,limit,name);
            }
            catch(err){
                $location.path('/error');
            }

        }

        vm.cancelEdit=function() {
            $location.path('/cards');
        }


    }]);
