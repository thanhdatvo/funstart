// angular.module('funstart').directive('href', function() {
//     return {
//         compile: function(element) {
//             if(element.)
//             element.attr('target', '_blank');
//         }
//     };
// });
angular.module('funstart').directive('loadingCircle', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/loadingCircle.tmpl.html',
        scope: {
            isLoading : '='
        }
    }
});
angular.module('funstart').directive('authTabs', function () {
    return {
        templateUrl: 'app/templates/authTabs.tmpl.html'
    }
});
angular.module('funstart').directive('navToolbar', function () {
    return {
        templateUrl: 'app/templates/navToolbar.tmpl.html'
    }
});
angular.module('funstart').directive('sliderRight', function () {
    return {
        templateUrl: 'app/templates/sliderRight.tmpl.html'
    }
});
angular.module('funstart').directive('sliderLeft', function () {
    return {
        templateUrl: 'app/templates/sliderLeft.tmpl.html',
        controller: function($scope){
            $scope.mode = 'friend';
        }
    }
});
// angular.module('funstart').
// directive('myRefresh',function($location,$route){
//     return function(scope, element, attrs) {
//         element.bind('click',function(){
//             if(element[0] && element[0].href && element[0].href === $location.absUrl()){
//                 $route.reload();
//             }
//         });
//     }
// });