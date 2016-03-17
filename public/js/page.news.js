var app = angular.module('app.news', [])

.factory('News', function($rootScope,$http){

    return {
        all: function(page){
            var url = Const.SERVER_HOST + 'news';
            $http({
                method: 'GET',
                url: url,
                params: {
                    page: page
                }
            })
            .success(function(data){
                $rootScope.newsList = [];
                angular.forEach(data, function(el, key){
                    var newDate = new Date(el.createTime);
                    el.time = Time.getTimes(newDate);
                    el.day = Time.getDays(newDate);
                    $rootScope.newsList.push(el);
                });
            })
        }
    };
})

.controller('ListCtrl',function($scope,News){
    News.all();
})

.controller('DetailCtrl',function($scope,$http,$rootScope,$routeParams,$location,News){
    $http({
        method: 'GET',
        url: Const.SERVER_HOST + 'news/' + $routeParams.id
    })
    .success(function(data){
        $scope.news = data;
    })
})

// .controller('DetailCtrl',function($scope,$rootScope,$routeParams,News){
//     News.all();
//     $scope.news = $rootScope.newsList[$routeParams.id-1];
// })

.controller('AddCtrl',function($scope,$http,$location,News){
    $scope.title = '';
    $scope.content = '';
    $scope.add = function(){
        $http({
            method: 'POST',
            url: Const.SERVER_HOST + 'news',
            data: {
                title: $scope.title,
                content: $scope.content,
                createTime: new Date()
            }
        })
        .success(function(data){
            alert('发布成功');
        })

        $location.path('list');
    }
})

.controller('EditCtrl',function($scope,$http,$routeParams,$location){
    $scope.news = {
        _id: $routeParams.id
    }

    $scope.update = function(){
        $http({
            method: 'POST',
            url: Const.SERVER_HOST + 'edit/' + $routeParams.id,
            data: $scope.news
        })
        .success(function(data){
            alert('编辑成功');
            $location.path('list');
        })

    }
})