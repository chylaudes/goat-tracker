angular
  .module('goat-tracker')
  .controller('GoatsShowController', GoatsShowController);

GoatsShowController.$inject = ['$http', '$routeParams', '$location'];
function GoatsShowController(   $http ,  $routeParams  , $location  ) {
  var vm = this;
  vm.goat = {}; // no goat yet :-(
  var baseUrl = 'http://goats-api.herokuapp.com';
  fetchGoat($routeParams.id); // pass the id

  function fetchGoat(id) {
    $http({
      method: 'GET',
      url: baseUrl + "/api/goats/" + id
    }).then(function successCallback(json){
      vm.goat = json.data;
      vm.goat["age"] = calculateAge(vm.goat.birthdate);
    },function errorCallback(response){
      console.log('There was an error getting the data', response);
    });
  }// end of fetchGoat

  function calculateAge(date){
    var birthDay = new Date(date)
    var ageDifs = Date.now() - birthDay.getTime();
    var ageDate = new Date(ageDifs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  vm.deleteGoat = function(goat) {
    $http({
      method: 'DELETE',
      url: baseUrl + "/api/goats/" + goat.id
    }).then(function successCallback(json){

      $location.path('/goats');
      //redirect_to index
    },function errorCallback(response){
      console.log('There was an error deleting the data', response);
    });

  }
  vm.editGoat = function(goat) {
    $http({
      method: 'PUT',
      url: baseUrl + "/api/goats/" + goat.id
    }).then(function successCallback(json){
      //redirect_to index
    },function errorCallback(response){
      console.log('There was an error in editing the data', response);
    });
  }

}
