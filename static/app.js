  var app = angular.module('Complaints', []);

  app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    // Refers to the html file that will be greeting the user
    $scope.currentView = "welcome";

    // Set up some scope variables for later use
    $scope.firstName = ""; $scope.lastName = "";
    $scope.dob = ""; $scope.complaint = "";

    // Used for a generic message
    $scope.companyName = "FuckYouInc"
    
    $scope.navigate = function(page) {
      $scope.currentView = page;
    }; // navigate

    $scope.postComplaint = function() {
      $http({
        method: "POST",
        url: "/api/postComplaint",
        data: {
          complaint: $scope.complaint
        }
      }).success(function (data) {
        $scope.navigate('finished');
      });
    }; // postComplaint

    $scope.postEvaluation = function() {
      $http({
        method: "POST",
        url: "/api/postEvaluation",
        data: {
          complaint: $scope.complaint, 
          firstname: $scope.firstName,
          surname: $scope.lastName
        }
      }).success(function (data) {
        $scope.navigate('finished');
      });
    }

    $scope.accountCreate = function(username,password,email) {
      $http({
        method: "POST",
        url: "/api/registerUser",
        data: {
          username: username,
          password: password,
          email: email
        }
      }).success(function (data) {
        console.log(data);
        $scope.navigate('welcome');
      });
    };

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