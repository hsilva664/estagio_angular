'use strict';

var app=angular.module('myApp.paymentService', []);

app.service('paymentServicesRequests', ["$http","config",function($http,config) {    
    var payment = {};
    var header = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 48c8e8b1e97049bdca9eae769d5b8b4c'
    };
    payment.getPayments = function (cardID){
        return $http({
            headers: header,
            method: "GET",
            url: config.URL + "cards/"+cardID+'/payments'
        });
    };

    payment.getPayment = function (paymentID){
        return $http({
            headers: header,
            method: "GET",
            url: config.URL + "payments/"+paymentID
        });
    };

    payment.deletePayment = function (payment_id){
        return $http({
                method: "DELETE",
                headers: header,
                url: config.URL + "payments/"+payment_id,        
        });
    };

    payment.postPayment = function (data){
        return $http({
                method: "POST",
                headers: header,
                url: config.URL + "payments",
                data: data
        });
    };

    payment.patchPayment = function (paymentID,data){
        return $http({
            headers: header,
            method: "PATCH",
            data: data,
            url: config.URL + "payments/"+paymentID
        });
    };    

    return payment;
}]);