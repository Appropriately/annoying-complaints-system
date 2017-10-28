  var app = angular.module('Complaints', [])

  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.currentView = "welcome";
    $scope.firstName = ""; $scope.lastName = "";
    $scope.email = ""; $scope.dob = "";
    $scope.complaint = "";

    $scope.navigate = function(page) {
      $scope.currentView = page;
    }; // navigate

    $scope.authenticateUser = function(username, password) {
      var authenticate = $http ({
        method : "post",
        url: "/api/authenticateUser",
        data: {
          username: username,
          password: password
        }
      });
    };
  }])