(function () {
    "use strict";
    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function ($scope, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            classifiedsFactory.getClassifieds().then(function (classifieds) {
                $scope.classifieds = classifieds.data;
                $scope.categories = getCategories($scope.classifieds);
            })

            // mock data of user contact 
            var contact = {
                name: 'John',
                phone: '(654) 665-7653',
                email: 'johnsnow@got.com'
            }

            // open sidebar 
            $scope.openSidebar = function () {
                $mdSidenav('left').open(); // took the 'left' parameter from md-component-id in view 
            }

            // close sidebar 
            $scope.closeSidebar = function () {
                $mdSidenav('left').close();
            }

            //save classified
            $scope.saveClassified = function (classified) {
                if (classified) {
                    classified.contact = contact;
                    $scope.classifieds.push(classified);
                    $scope.classified = {};
                    $scope.closeSidebar();
                    showToast('Classified Saved!');
                }
            }

            //edit classified
            $scope.editClassified = function (classified) {
                $scope.editing = true;
                $scope.openSidebar();
                $scope.classified = classified;
            }

            // save edit 
            $scope.saveEdit = function () {
                $scope.editing = false;
                $scope.classified = {};
                $scope.closeSidebar();
                showToast('Edit Saved!');
            }

            // delete classified
            $scope.deleteClassified = function (event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function () {
                    var index = $scope.classifieds.indexOf(classified);
                    $scope.classifieds.splice(index, 1);
                }, function () {});
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(message)
                    .position('top, right')
                    .hideDelay(3000)
                );
            }

            // getting categories
            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function (item) {
                    angular.forEach(item.categories, function (category) {
                        categories.push(category);
                    });
                });
                return _.uniq(categories); // lodash function 
            }
        });
})();