  var app = angular.module('Complaints', [])
  .controller('MainCtrl', ['$scope', function ($scope) {
        $scope.currentView = "introduction";
        $scope.firstName = ""; $scope.lastName = "";
        $scope.email = ""; $scope.dob = "";
        $scope.complaint = "";

        $scope.navigate = function(page) {
          $scope.currentView = page;
        }; // navigate
  }]);