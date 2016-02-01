var app = angular.module('app', ['ui-rangeSlider']);

app.filter('sec2str', function() {
   return function(input) {
       var seconds = input % 60;
       input -= seconds;
       var min = input  / 60;
       var minutes = min % 60;
       min -= minutes;
       var hours = min / 60;

       str = "";
       if (hours > 0) {
           str += hours + " h ";
       }
       if (minutes > 0) {
           str += minutes + " min ";
       }
       if (seconds > 0) {
           str += seconds + " sec";
       }
       return str;
   }
});
app.controller('timerCtrl', function($scope, $interval) {
    timer = this;


    timer.passed = 0;
    timer.MAX = 120;
    timer.MIN = 60;
    timer.MID = (timer.MAX+timer.MIN)/2;

    timer.start = function () {
        if (timer.interval !== undefined) {
            $interval.cancel(timer.interval);
        }
        timer.passed = 0;
        timer.MID = (timer.MAX+timer.MIN)/2;
        timer.interval = $interval(function(counter) {
            timer.passed = counter;
        }, 1000)
    };
    timer.stop = function() {
        $interval.cancel(timer.interval);
        timer.interval = undefined;
    };

});

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
//timer.stringToSeconds = function(str) {
//    var arr = str.split(" ");
//    var flag = "none";
//    if (arr.length == 1) {
//        if (isNumber(arr[0])) {
//            return arr[0];
//        } else {
//            return -1;
//        }
//    } else if (arr.length == 0) {
//        return -1;
//    }
//    var seconds = 0;
//    for (var i = arr.length-1; i >= 0; i--) {
//
//        if (flag == "none") {
//            if (isNumber(arr[i])) {
//                return  Number(arr[i]);
//            } else {
//                flag = arr[i];
//            }
//        } else if (flag == "sec") {
//            if (isNumber(arr[i])) {
//                seconds += Number(arr[i]);
//            } else {
//                flag = arr[i];
//            }
//        } else if (flag == "min") {
//            if (isNumber(arr[i])) {
//                seconds += Number(arr[i]) * 60;
//            } else {
//                flag = arr[i];
//            }
//        } else if (flag == "h") {
//            if (isNumber(arr[i])) {
//                seconds += Number(arr[i]) * 60 * 60;
//            } else {
//                flag = arr[i];
//            }
//        } else {
//            return -1;
//        }
//    }
//    return seconds;
//};