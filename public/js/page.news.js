var app = angular.module('app.news', [])

.controller('ListCtrl',function($scope,$location){
    $scope.test = function(){
        $location.path('detail')
    }
})

.controller('DetailCtrl',function($scope,$http,$rootScope,$routeParams,$location){

})

.controller('AddCtrl',function($scope,$http,$location){

})

.controller('EditCtrl',function($scope,$http,$routeParams,$location){

})