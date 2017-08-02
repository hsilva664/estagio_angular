'use strict';

angular.module('myApp.cards', ['ngRoute'])



    .controller('CardsCtrl', ["$scope","$compile","$location","$http", "config", function ($scope, $compile, $location, $http, config) {
        var vm = this;

        vm.process='redirect'

        vm.sendGet = function () {
            $http({
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                url: config.URL + "cards",
            }).then(function (response) {
                vm.data = response.data;
                vm.dataView = JSON.stringify(vm.data, null, "\t");
            }, function (response) {
                vm.data = response.data || 'Request failed';

            });
        }

        vm.sendDelete = function (card_id) {
            $http({
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
                },
                url: config.URL + "cards/"+card_id,
            }).then(function (response) {
                vm.sendGet();               
            }, function (response) {
                vm.sendGet();
            });
        }


        vm.processCard= function(cardID) {
            if(vm.process=='redirect') {
                $location.path('/cards/' + cardID);
            }
            else if(vm.process=='delete'){
                vm.sendDelete(cardID);
                removeCancelButton();
                restoreDeleteEditButtons();
                vm.process='redirect';                
            }
            else { //vm.process = 'edit'
                $location.path('/edit/' + cardID);                
            }
        }

        vm.cardImage= function(brand) {
            if(brand == 'visa') {
                return config.visa_image;
            }
            else {
                return config.mastercard_image;
            }
        }


        var removeCancelButton= function() {
            var container=document.getElementById('cardsViewContainer');
            var cancel_button_list=document.getElementsByClassName('cancelCardButton');         
            for(var i=0;i<cancel_button_list.length;i++) {
                container.removeChild(cancel_button_list[i]);
            }
        }

        var restoreDeleteEditButtons= function() {
            var container=document.getElementById('cardsViewContainer');
            var delete_button=document.createElement("button");
            var delete_text_node = document.createTextNode('Delete Card');
            delete_button.appendChild(delete_text_node);
            delete_button.setAttribute('class', 'deleteCardButton');
            delete_button.setAttribute('ng-click', 'vm.deleteCard()');
            var ng_delete_button = $compile(delete_button)($scope);

            var container=document.getElementById('cardsViewContainer');
            var edit_button=document.createElement("button");
            var edit_text_node = document.createTextNode('Edit Card');
            edit_button.appendChild(edit_text_node);
            edit_button.setAttribute('class', 'editCardButton');
            edit_button.setAttribute('ng-click', 'vm.editCard()');
            var ng_edit_button = $compile(edit_button)($scope);

            angular.element(container).prepend(ng_edit_button);
            angular.element(container).prepend(ng_delete_button);
        }

        var removeDeleteEditButtons= function() {
            var container=document.getElementById('cardsViewContainer');
            var delete_button_list=document.getElementsByClassName('deleteCardButton');
            var edit_button_list=document.getElementsByClassName('editCardButton');            
            for(var i=0;i<delete_button_list.length;i++) {
                container.removeChild(delete_button_list[i]);
            }
            for(var i=0;i<edit_button_list.length;i++) {
                container.removeChild(edit_button_list[i]);
            }
        }

        var addCancelButton= function(text) {
            var container=document.getElementById('cardsViewContainer');
            var cancel_button=document.createElement("button");
            var text_node = document.createTextNode(text);
            cancel_button.appendChild(text_node);
            cancel_button.setAttribute('class', 'cancelCardButton');
            cancel_button.setAttribute('ng-click', 'vm.cancelAction()');
            var ng_cancel_button = $compile(cancel_button)($scope);

            angular.element(container).prepend(ng_cancel_button);
        }

        vm.deleteCard = function() {            
            removeDeleteEditButtons();
            addCancelButton('Cancel deleting card');
            vm.process='delete';            
        }

        vm.editCard = function() {
            removeDeleteEditButtons();
            addCancelButton('Cancel editing card');
            vm.process='edit';
        }

        vm.cancelAction = function() {
            removeCancelButton();
            restoreDeleteEditButtons();
            vm.process='redirect';
        }

        vm.sendGet();

    }]);
