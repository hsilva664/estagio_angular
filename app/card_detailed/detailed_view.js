'use strict';

angular.module('myApp.cardDetailed', ['ngRoute'])

    .controller('CardDetailedCtrl', ['paymentServicesRequests','cardsServicesRequests',"$location","$scope","$compile", "config","$routeParams", function (paymentServicesRequests,cardsServicesRequests,$location, $scope,$compile, config, $routeParams) {
        var vm = this;

        vm.cardId=$routeParams.cardId;

        vm.sendGetCard = function (cardID) {
            cardsServicesRequests.getCard(cardID).then(function (response) {
                vm.initialData=response.data;
                vm.name=vm.initialData.name;
                vm.number=vm.initialData.number;
                vm.brand=vm.initialData.brand;

                vm.exp_month=vm.initialData.exp_month;
                vm.exp_year=vm.initialData.exp_year;

                vm.limit=vm.initialData.limit;
                vm.available_limit=vm.initialData.available_limit;

            }, function (response) {
                vm.data = response.data || 'Request failed';
            });
        }

        vm.sendGetCard(vm.cardId);

        vm.sendGetPayments = function (cardID) {
            paymentServicesRequests.getPayments(cardID).then(function (response) {
                vm.payments=response.data;
            }, function (response) {
                vm.payments = response.data || 'Request failed';
            });
        }

        vm.sendDeletePayment = function (payment_id) {
            paymentServicesRequests.deletePayment(payment_id).then(function (response) {
                vm.sendGetCard(vm.cardId);
                vm.sendGetPayments(vm.cardId);               
            }, function (response) {
                vm.sendGetCard(vm.cardId);
                vm.sendGetPayments(vm.cardId);
            });
        }

        vm.sendGetPayments(vm.cardId);

        vm.cardImage= function(brand) {
            if(brand == 'visa') {
                return config.visa_image;
            }
            else {
                return config.mastercard_image;
            }
        }

        vm.processPayment=function(paymentId) {
            if(vm.process=='edit') {
                $location.path('/payments/edit/'+vm.cardId+'/'+ paymentId);
                
            }
            else if(vm.process=='delete'){
                vm.sendDeletePayment(paymentId);
                removeActionButtons();
                restoreActionButtons(['Add payment','Edit payment','Delete payment'],['vm.addPayment()','vm.editPayment()','vm.deletePayment()']);
                vm.process='nothing';                
            }
            //else vm.process = 'nothing'
        }


        var removeActionButtons=function() {
            var container=document.getElementById('cardDetailsButtonDiv');            
            var button_list=document.getElementsByClassName('paymentButton');  
            for(var i=0;i<button_list.length;i=0) {
                container.removeChild(button_list[i]);
            }
        }

        var restoreActionButtons=function(text_list,callback_string_list) {
            var container=document.getElementById('cardDetailsButtonDiv');

            for(var i=(text_list.length-1); i>=0; i--) {
                var button=document.createElement("button");
                var text_node = document.createTextNode(text_list[i]);
                button.appendChild(text_node);
                button.setAttribute('class', 'paymentButton');
                button.setAttribute('ng-click', callback_string_list[i]);
                var ng_button = $compile(button)($scope);

                angular.element(container).prepend(ng_button);
            }

        }

        vm.addPayment = function() {            
            $location.path('/payments/add/'+vm.cardId);
        }

        vm.deletePayment = function() {            
            removeActionButtons();
            restoreActionButtons(['Cancel deleting payment'],['vm.cancelAction()']);
            vm.process='delete';            
        }

        vm.editPayment = function() {
            removeActionButtons();
            restoreActionButtons(['Cancel editing payment'],['vm.cancelAction()']);
            vm.process='edit';
        }

        vm.cancelAction = function() {
            removeActionButtons();
            restoreActionButtons(['Add payment','Edit payment','Delete payment'],['vm.addPayment()','vm.editPayment()','vm.deletePayment()']);
            vm.process='nothing';
        }

    }]);
