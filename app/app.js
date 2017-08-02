'use strict';


// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.cards',
    'myApp.cardDetailed',
    'myApp.form',
    'myApp.edit',
    'ui.bootstrap'
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
