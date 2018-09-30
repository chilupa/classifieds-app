(function () {
    "use strict";
    angular.module('ngClassifieds')
        .controller('newClassifiedsCtrl', function ($scope, $mdSidenav, $timeout, $mdDialog, classifiedsFactory) {
            var vm = this;

            $timeout(function () {
                $mdSidenav('left').open();
            });
        })
})();