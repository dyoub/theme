// Copyright (c) Dyoub Applications. All rights reserved.
// Licensed under MIT (https://github.com/dyoub/app/blob/master/LICENSE).

(function () {

    function SuggestionController() {
        this.fruitsFromDatabase = [
            { name: "Apple" },
            { name: "Cranberry" },
            { name: "Guava" },
            { name: "Tangerine" },
            { name: "Strawberry" }
        ];
    }

    SuggestionController.prototype.hideSuggestion = function () {
        this.suggestionOpened = false;
    };

    SuggestionController.prototype.newFruitSearch = function () {
        this.suggestionOpened = true;
        this.searching = true;
        this.fruits = [];
    };

    SuggestionController.prototype.noRecords = function () {
        return this.fruits && this.fruits.isEmpty() && !this.searching;
    };

    SuggestionController.prototype.searchFruits = function () {
        var controller = this;

        controller.searching = false;
        controller.fruits = controller.fruitsFromDatabase.where(function (fruit) {
            return fruit.name.contains(controller.selectedFruit.name);
        });
    };

    angular.module('sample').controller('SuggestionController', [
        SuggestionController
    ]);

})();
