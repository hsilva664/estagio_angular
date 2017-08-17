'use strict';

window.localStorage.setItem('key', '48c8e8b1e97049bdca9eae769d5b8b4c');


// Declare app level module which depends on views, and components
var module = angular.module('myApp', [
    'ngRoute',
    'myApp.cards',
    'myApp.cardDetailed',
    'myApp.form',
    'myApp.edit',
    'myApp.addPayment',
   'myApp.editPayment',
   'myApp.cardService',
   'myApp.paymentService',
    'ui.bootstrap',
    'ui.mask',
    'ui.utils.masks'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        $routeProvider
            .when('/cards', {
                templateUrl: 'cards/cards_view.html',
                controller: 'CardsCtrl',
                controllerAs: 'vm'
            })
            .when('/form', {
                templateUrl: 'form/form_view.html',
                controller: 'FormCtrl',
                controllerAs: 'vm'
            })            
            .when('/cards/:cardId', {
                templateUrl: 'card_detailed/detailed_view.html',
                controller: 'CardDetailedCtrl',
                controllerAs: 'vm'
            })
            .when('/payments/add/:cardId', {
                templateUrl: 'add_payment/add_payment.html',
                controller: 'AddPaymentCtrl',
                controllerAs: 'vm'
            })
            .when('/payments/edit/:cardId/:paymentId', {
                templateUrl: 'edit_payment/edit_payment.html',
                controller: 'EditPaymentCtrl',
                controllerAs: 'vm'
            })                     
            .when('/edit/:cardId', {
                templateUrl: 'edit/edit_view.html',
                controller: 'EditCtrl',
                controllerAs: 'vm'                
            })            
            .when('/success', {
                templateUrl: 'success/success.html',
            })           
            .when('/error', {
                templateUrl: 'error/error.html',
            });

        $routeProvider.otherwise({redirectTo: '/cards'});

    }])

    .constant('config', {
        "URL": "http://estagio.zagu.com.br/",
        "mastercard_image": "/images/mastercard.png",
        "visa_image": "/images/visa.png" 
    });

  module.filter('cardNumber', function() {
    return function(input) {
        if(typeof(input)=='number') {
            input=input.toString();
        }
        if(typeof(input)=='undefined') {
            return "";
        }
        var output="";
        for(var i=0;i<input.length;i++) {
            if(i%4==0 && i>0) {
                output+=" ";
            }
            output+=input[i];
        }
      return output;
    };
  });

  module.filter('errorName', function() {
    return function(input) {
        var output;
        if(input=='name') {
            output='Name field error';
         }
        else if(input=='number') {
            output='Card number error';
         }
        else if(input=='exp_month') {
            output='Expiratory month error';
        }
        else if(input=='exp_year') {
            output='Expiratory year error';
        }
        else if(input=='limit') {
            output='Card limit error';
        }        
        else {
             output=input;   
        }        
      return output;
    };
  });

  module.filter('errorDescription', function() {
    return function(input) {
        var output;
        if(input=='missing_field') {
            output='Missing field';
         }
        else if(input=='invalid_expiry_year') {
            output='Invalid expiratory year';
         }
        else if(input=='invalid_expiry_month') {
            output='Invalid expiratory month';
        }
        else {
             output=input;   
        }        
      return output;
    };
  });  

  module.directive('zaguEstagioErrorDirective', zaguEstagioErrorDirective);

zaguEstagioErrorDirective.$inject = [];
function zaguEstagioErrorDirective() {
        var directive = {

            restrict: 'E',
            scope: {
                errorInfo: '=info'
            },
            templateUrl: 'error/error-msg.html'
        };
        return directive;
    }
