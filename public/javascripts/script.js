angular.module("beecafeteriaApp", ['ngRoute', 'ngResource']) 
  .controller('home', ['$scope','$location','$http', function ($scope,$location,$http) {
        
    $scope.statusCode = {};

    $scope.clear = function() {       
      $scope.user = {};
      $scope.statusCode = {};
    }

    $scope.login = function(){      
      postdata = {
          uname : $scope.user.username,
          pass : $scope.user.password          
        };

        $http.post('/login',postdata).
          success(function (data){                                                
                  $scope.statusCode=data;               
          }).
          error(function(data,status){            
            console.log('Opps error',data);            
          });
    }
    
}])
  .config(['$routeProvider',function($routeProvider){
  	$routeProvider
  	.when('/', {      
      templateUrl: '/home',
      controller: 'home'
    });
  }]);