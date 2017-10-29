  var app = angular.module('Complaints', []);

  app.controller('MainCtrl', ['$scope', '$http', '$interval', function ($scope, $http, $interval) {
    // Refers to the html file that will be greeting the user
    $scope.currentView = "welcome";

    // Set up some scope variables for later use
    $scope.firstName = ""; $scope.lastName = "";
    $scope.dob = ""; $scope.complaint = "";
    $scope.username = ""; $scope.original = "";
    $scope.userProfile = "";

    $scope.usernameTaken = false;

    // Used for a generic message
    $scope.companyName = "FuckYouInc"
    
    $scope.navigate = function(page) {
      $scope.currentView = page;
    }; // navigate

    $scope.adjustComplaint = function() {
      $http({
        method: "POST",
        url: "/api/getPositiveComplaint",
        data: {
          complaint: $scope.complaint,
        }
      }).success(function (data) {
        $scope.original = $scope.complaint;
        $scope.complaint = data;
        $scope.navigate('check');
      });
    } // adjustComplaint

    $scope.getProfile = function() {
      $http({
        method: "POST",
        url: "/api/postEvaluation",
        data: {
          complaint: $scope.original,
          firstname: $scope.firstName,
          surname: $scope.lastName
        }
      }).success(function (data) {
        $scope.userProfile = data;
      });
    }
  
    $scope.postComplaint = function() {
      $http({
        method: "POST",
        url: "/api/postComplaint",
        data: {
          complaint: $scope.complaint,
          username: $scope.username
        }
      }).success(function (data) {
        console.log(data);
        $scope.getProfile();
        $scope.navigate('longboi');
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
      $scope.checkUsername(username);
      if (!$scope.usernameTaken) {
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
      }
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

    $scope.checkUsername = function (username) {
      $http({
        method: "POST",
        url: "/api/checkUsernameAvailable",
        data: { username: username }
      }).success(function (data) {
        console.log(data);
        if (data === "available") $scope.usernameTaken = false;
        else $scope.usernameTaken = true;
        return !$scope.usernameTaken;
      });
    };
  }])
