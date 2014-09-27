angular.module("TodaySuccess", ['ngCookies'])
  .controller("AppCtrl", ["$cookieStore", "$scope", function($cookieStore, $scope) {
    $scope.template = "templates/index.html";
    $scope.doneToday = $cookieStore.get("doneToday")
    if(typeof($scope.doneToday) == 'undefined' || $scope.doneToday == null) {
      $scope.doneToday = [];
    }
    $scope.today = $cookieStore.get("today")
    $scope.submitForm = function() {
      $scope.today = this.today;
      $cookieStore.put('today', this.today)
    }
    $scope.markSuccess = function() {
      $scope.doneToday.push(this.today);
      $cookieStore.put("doneToday", $scope.doneToday)
      this.today = null;
    }
  }
]).filter("orEllipsis", function() {
  return function(input) {
    if(input){
      return " " + input + ".";
    }else{
      return "…";
    }
  };
})
