angular.module('app', [
    'ngRoute',
    'app.service',
    'app.news'
])

.config(function($routeProvider){
    $routeProvider
    .when('/', {
        controller: 'ListCtrl',
        templateUrl: 'views/list.html'
    })
    .when('/detail/:id', {
        controller: 'DetailCtrl',
        templateUrl: 'views/detail.html'
    })
    .when('/edit/:id', {
        controller: 'EditCtrl',
        templateUrl: 'views/edit.html'
    })
    .when('/list', {
        controller: 'ListCtrl',
        templateUrl: 'views/list.html'
    })
    .when('/add', {
        controller: 'AddCtrl',
        templateUrl: 'views/add.html'
    })

    .otherwise({edirectTo: '/'});
});