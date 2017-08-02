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
                //Access DOM elements
                var edited_container=document.getElementById('table_entry_'+cardID);
                var edited_name=document.getElementById('table_entry_'+cardID+'_name');
                var edited_brand=document.getElementById('table_entry_'+cardID+'_brand');
                var edited_number=document.getElementById('table_entry_'+cardID+'_number');
                var edited_expiration=document.getElementById('table_entry_'+cardID+'_expiration');
                var edited_limit=document.getElementById('table_entry_'+cardID+'_limit');

                //Store old data
                vm.old_name=edited_name.innerHTML;
                vm.old_brand=edited_brand.innerHTML;
                vm.old_number=edited_number.innerHTML;
                var old_expiration=edited_expiration.innerHTML;
                var split=old_expiration.split("/");
                vm.old_month=split[0];
                vm.old_year=split[1];
                vm.old_limit=edited_limit.innerHTML;

                //Store data for CANCEL
                vm.editing_id=cardID;
                vm.process='edit_ongoing';

                //Dummy
                edited_name.innerHTML=''
                edited_brand.innerHTML=''
                edited_number.innerHTML=''
                edited_expiration.innerHTML=''
                edited_limit.innerHTML=''
                
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
            if(vm.process=='edit_ongoing') {
                var cardID= vm.editing_id;
                //Access DOM elements
                var edited_container=document.getElementById('table_entry_'+cardID);
                var edited_name=document.getElementById('table_entry_'+cardID+'_name');
                var edited_brand=document.getElementById('table_entry_'+cardID+'_brand');
                var edited_number=document.getElementById('table_entry_'+cardID+'_number');
                var edited_expiration=document.getElementById('table_entry_'+cardID+'_expiration');
                var edited_limit=document.getElementById('table_entry_'+cardID+'_limit');

                //Restore old data
                edited_name.innerHTML=vm.old_name;
                edited_brand.innerHTML=vm.old_brand;
                edited_number.innerHTML=vm.old_number;
                edited_expiration.innerHTML=vm.old_month+"/"+vm.old_year;
                edited_limit.innerHTML=vm.old_limit;
            }

            removeCancelButton();
            restoreDeleteEditButtons();
            vm.process='redirect';
        }

        vm.sendGet();

    }]);
