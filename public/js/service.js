angular.module('app.service', [])

.service('NewsService', function($http){
    function handleReq(method,url,data,success,error){
        var config = {
            method: method,
            url: url
        }

        if(method == 'POST'){
            config.data = data;
        }
        else if(method == 'GET'){
            config.params = data;
        }

        $http(config)
        .success(function(data){
            success(data);
        })
        .error(function(err) {
            error(err);
        });
    }


    return {
        list: function(params,success,error){
            return handleReq('GET','/news',params,success,error);
        },
        save: function(data,success,error){
            return handleReq('POST','/news',data,success,error);
        },
        detail: function(id,success,error){
            return handleReq('GET','news/'+ id,success,error);
        }
    }
})