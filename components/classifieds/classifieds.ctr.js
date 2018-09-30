(function () {
    "use strict";
    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function ($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            var vm = this; // controller as syntax 

            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.editClassified = editClassified;
            vm.saveEdit = saveEdit;
            vm.deleteClassified = deleteClassified;

            vm.classifieds;
            vm.categories;
            vm.editing;
            vm.classified;


            classifiedsFactory.getClassifieds().then(function (classifieds) {
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            })

            // mock data of user contact 
            var contact = {
                name: 'John',
                phone: '(654) 665-7653',
                email: 'johnsnow@got.com'
            }

            // open sidebar 
            function openSidebar() {
               // $mdSidenav('left').open(); // took the 'left' parameter from md-component-id in view 
               $state.go('classifieds.new');
            }

            // close sidebar 
            function closeSidebar() {
                $mdSidenav('left').close();
            }

            //save classified
            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {};
                    closeSidebar();
                    showToast('Classified Saved!');
                }
            }

            //edit classified
            function editClassified(classified) {
                vm.editing = true;
                openSidebar();
                vm.classified = classified;
            }

            // save edit 
            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast('Edit Saved!');
            }

            // delete classified
            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function () {
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
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