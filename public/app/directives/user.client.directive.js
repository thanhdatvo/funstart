/**
 * Created by andh on 8/9/16.
 */

angular.module('funstart').directive('userCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/userCard.tmpl.html',
        scope: {
            'data' : '=',
            'checkUser' : '&',
            'addFriend' : '&',
            'follow' : '&',
            'unfollow' : '&',
            'updateFriendList' : '&'
        },
        controller: function ($scope,$routeParams) {
            if($routeParams.gameId){
                $scope.faded = true;
            } else {
                $scope.faded = false;
            }
            $scope.$on("$routeChangeStart", function(event, next, current) {
                if('gameId' in next.params){
                   $scope.faded = true;
                } else {
                   $scope.faded = false;
                }
            });
            $scope.imagePath = 'img/bgstat.jpg';
            
        }
    }
});

angular.module('funstart').directive('missionCard', function () {
    return {
        templateUrl: 'app/templates/missionCard.tmpl.html',
        scope: {
            item: "="
        }
    }
});
angular.module('funstart').directive('profilePanel', function () {
    return {
        templateUrl: 'app/templates/profilePanel.tmpl.html',
        scope: {
            info: "="
        }
    }
});
angular.module('funstart').directive('friendCard', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/friendCard.tmpl.html',
        scope: {
            'mode' : '=',
            'item' : '=',
            'gameType' : '=',
            'follow' : '&',
            'invite': '&',
            'unfollow' : '&',
            'kick': '&',
            'isHost': '=',
            'statusClass' : '&',
            'updateList' : '&'
        },
        controller: function ($scope,$rootScope,$timeout) {
            $scope.onViewProfile = function(ev){
                var position = $($(ev.currentTarget).parent().parent()).offset();
                var top = position.top - $(window).scrollTop();
                var left = position.left;
                $rootScope.popupProfile = {
                    name: $scope.item.username,
                    top: top,
                    left: left
                };
            };
            $scope.updateFollow = function(){
                $scope.updateList({bool: true,input: $scope.item});
                $scope.isLoading = false;
            };
            $scope.updateUnfollow = function(){
                $scope.updateList({bool: false,input: $scope.item});
                $scope.isLoading = false;
            }
        }
    }
});

