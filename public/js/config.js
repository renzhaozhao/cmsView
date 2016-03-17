var Const = {
    SERVER_HOST: 'http://23.83.233.202:7101/'
}

TimeClass = function(){
    this.toDou = function(n){
        return n<10 ? '0'+n : ''+n;
    }
    this.getTimes = function(newDate){
        var cut = ':';
        var second = this.toDou(newDate.getSeconds());
        var minute = this.toDou(newDate.getMinutes());
        var hour = this.toDou(newDate.getHours());

        return hour+cut+minute+cut+second;
    }
    this.getDays = function(newDate){
        var cut = '-';
        var date = this.toDou(newDate.getDate());
        var month = this.toDou(newDate.getMonth());
        var year = newDate.getFullYear();

        return year+cut+month+cut+date;
    }
}

var Time = new TimeClass();