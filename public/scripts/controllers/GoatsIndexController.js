angular
  .module('goat-tracker')
  .controller('GoatsIndexController', GoatsIndexController);

GoatsIndexController.$inject = ['$http'];
function GoatsIndexController(   $http   ) {
  var vm = this;
  vm.goats = [];
  vm.newGoat = {}
  var baseUrl = 'http://goats-api.herokuapp.com';
  fetchAllGoats();  // fetch goats on start

  function fetchAllGoats() {
    $http({
      method:'GET',
      url: baseUrl + "/api/goats"
    }).then(function successCallback(response){
      vm.goats = response.data;
    }, function errorCallback(response){
      console.log('There was an error getting the data', response);
    });
    // use $http to get baseUrl + /goats
    // store them in vm.goats
  }


  vm.createGoat = function(){
    $http({
      method: 'POST',
      url: baseUrl + "/api/goats",
      data: vm.newGoat
    }).then(function successCallback(response) {
      vm.goats.push(response.data);
      // how do we add the response data to our albums array?
    }, function errorCallback(response) {
      console.log('There was an error posting the data', response);
    });
  }
}
