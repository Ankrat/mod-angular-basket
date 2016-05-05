var BWApp = angular.module('BWApp', []);


BWApp.factory('BasketManager', function () {

    var bm = require("./modules/basketManager.js");
    return bm;
});


BWApp.controller('BookListCtrl', function ($scope, $http, BasketManager) {


    $http.get('scripts/books.json').success(function(data) {
        $scope.books = data.books;
    });

    $scope.addToBasket = function(i){
        var bookToAdd = {
            item : $scope.books[i].title,
            id : $scope.books[i].details.ISBN,
            price : $scope.books[i].details.price,
            qty : 1
        };
        BasketManager.addItem(bookToAdd);
    };

});

BWApp.controller('BasketCtrl', function ($scope, BasketManager) {

    $scope.bm = BasketManager;
    BasketManager.importBasket();
    $scope.basket = BasketManager.getBasket();
    $scope.total = BasketManager.getTotal();

    console.log("basket =", $scope.basket);
    // updateDOM
    $scope.removeFromBasket = function(i){
        var basket = $scope.bm.getBasket();
        $scope.bm.removeItem( basket[i] );
    };

});


BWApp.controller('CheckoutCtrl', function($scope, BasketManager){

    $scope.bm = BasketManager;
    BasketManager.importBasket();
    $scope.basket = BasketManager.getBasket();
    $scope.total = BasketManager.getTotal();

});