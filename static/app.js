  var app = angular.module('Complaints', []);

  app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    $scope.currentView = "welcome";
    $scope.firstName = ""; $scope.lastName = "";
    $scope.email = ""; $scope.dob = "";
    $scope.complaint = "";
    
    $scope.formData = {};

    $scope.navigate = function(page) {
      $scope.currentView = page;
    }; // navigate

    $scope.authenticateUser = function(username, password) {
      $http({
        method: "POST",
        url: "/api/authenticateUser",
        data: {
          username: username,
          password: password
        }
      }).success(function(data) {
        if (data === "authenticated") $scope.navigate('introduction');
      });
    };
  }])