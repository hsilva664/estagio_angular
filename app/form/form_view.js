'use strict';

angular.module('myApp.form', ['ngRoute'])



    .controller('FormCtrl', ["$location","$http", "config", function ($location,$http, config) {
        var vm = this;

        vm.sendPost = function (number,brand,exp_year,exp_month,limit,name) {
            $http({
                method: "POST",
                url: config.URL + "cards",
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

            vm.sendPost(number,brand,exp_year,exp_month,limit,name);
            }
            catch(err){
                $location.path('/error');
            }

        }


    }]);