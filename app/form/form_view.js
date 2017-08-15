'use strict';

angular.module('myApp.form', ['ngRoute'])



    .controller('FormCtrl', ["$location", "config", 'cardsServicesRequests', function ($location, config, cardsServicesRequests) {
        var vm = this;

        vm.sendPost = function (number,brand,exp_year,exp_month,limit,name) {
                var data= {
                        "number": number,
                        "brand": brand,
                        "exp_year": exp_year,
                        "exp_month":exp_month,
                        "limit": limit,
                        "name": name
                }
            cardsServicesRequests.postCard(data).then(function (response) {
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
            var exp_month=vm.card_date.getMonth()+1;
            var exp_year=vm.card_date.getFullYear();
            var limit=vm.card_limit*100;

            vm.sendPost(number,brand,exp_year,exp_month,limit,name);
            }
            catch(err){                
                $location.path('/error');
            }

        }


    }]);
