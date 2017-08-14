'use strict';

var app=angular.module('myApp.cardService', []);

app.service('cardsServicesRequests', ["$http","config",function($http,config) {    
    var card = {};
    var header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
    };
    card.getCards = function (){
        return $http({
            headers: header,
            method: "GET",
            url: config.URL + "cards",
        });
    };

    card.getCard = function (id){
        return $http({
            headers: header,
            method: "GET",
            url: config.URL + "cards/"+id,
        });
    };

    card.deleteCard = function (card_id){
        return $http({
            headers: header,
            method: "DELETE",
            url: config.URL + "cards/"+card_id,
        });
    };

    card.postCard = function (data){
        return $http({
            headers: header,
            method: "POST",
            url: config.URL + "cards",
            data: data,
        });
    };

    card.patchCard = function (id,data){
        return $http({
            headers: header,
            method: "PATCH",
            url: config.URL + "cards/"+id,
            data: data,
        });
    };    

    return card;
}]);