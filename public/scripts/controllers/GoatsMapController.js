angular
  .module('goat-tracker')
  .controller('GoatsMapController', GoatsMapController);

GoatsMapController.$inject = ['$http'];
function GoatsMapController(   $http  ) {
  var vm = this;

  vm.mapCenter = { latitude: 30.6928686, longitude: -9.8474607 };
  vm.mapZoom = 10;
  vm.options = {scrollwheel: false, panControl: false, draggable: false};
  vm.goats = []

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

  // vm.infoOptions = {content:"<p>goat.name</p>"}

}
