  var app = angular.module('Complaints', []);

  app.controller('MainCtrl', ['$scope', '$log', function ($scope, $log) {
        $scope.currentView = 0;
  }]);