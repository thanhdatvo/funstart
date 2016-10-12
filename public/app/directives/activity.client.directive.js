angular.module('funstart').directive('activityCard', function () {
    return {
        'templateUrl': '/app/templates/activityCard.tmpl.html',
        'scope': {
            item: '='
        },
        'controller': function($scope,$rootScope){
            $scope.onViewProfile = function(item,ev){
                var position = $($(ev.currentTarget).parent()).offset();
                var top = position.top - $(window).scrollTop();
                var left = position.left;
                $rootScope.popupProfile = {
                    name: item.username,
                    top: top,
                    left: left
                };
            };
        }
    }
});