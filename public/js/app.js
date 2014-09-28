var getDate = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  }

  if(mm<10) {
    mm='0'+mm
  }

  return mm+'/'+dd+'/'+yyyy;
}

angular.module("TodaySuccess", ['ngCookies'])
  .controller("AppCtrl", ["$cookieStore", "$scope", function($cookieStore, $scope) {
    $scope.today = getDate();
    $scope.template = "templates/index.html";
    $scope.doneToday = $cookieStore.get("doneToday");
    if($scope.today != $cookieStore.get("today")) {
      $scope.doneToday = [];
      $cookieStore.remove("doneToday");
      delete $scope.todaysGoal;
      $cookieStore.remove("todaysGoal");
      $cookieStore.put("today", getDate());
    }
    if(typeof($scope.doneToday) == 'undefined' || $scope.doneToday == null) {
      $scope.doneToday = [];
    }
    $scope.todaysGoal = $cookieStore.get("todaysGoal");
    $scope.submitForm = function() {
      $scope.todaysGoal = this.todaysGoal;
      $cookieStore.put('todaysGoal', this.todaysGoal)
    }
    $scope.markSuccess = function() {
      $scope.doneToday.push(this.todaysGoal);
      $cookieStore.put("doneToday", $scope.doneToday);
      delete $scope.todaysGoal;
      $cookieStore.remove("todaysGoal");
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
