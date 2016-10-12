/**
 * Created by andh on 8/10/16.
 */
/**
 * Created by andh on 7/28/16.
 */
angular.module('funstart').controller('PlayController', ['$scope','$rootScope','GamesService','ActivitiesService','SuggestService','ShareService','BattleService','$location','$routeParams','$http','$timeout','$mdToast','$mdDialog','$interval',
    function($scope,$rootScope,GamesService,ActivitiesService,SuggestService,ShareService,BattleService,$location,$routeParams,$http,$timeout,$mdToast,$mdDialog,$interval){
        $scope.loadGame = function(){
            $scope.isInit = true;
            $scope.games = GamesService;
            //load info this game
            $scope.games.loadGame($routeParams.gameId,function(){
                document.title = $scope.games.currentGame.title;
                $scope.isInit = false;
                if($location.search().roomId){
                    if($rootScope.user){
                        $scope.isBattle = true;
                        $('body').css('overflow','hidden');
                        $scope.isPlay = true;
                        $scope.isEnd = false;
                        $scope.battle = BattleService;
                        $scope.battle.isLoading = true;
                        $scope.battle.init($scope.games.currentGame,$rootScope.user,$location.search().roomId,function(){
                            console.log('room err');
                            $scope.isBattle = false;
                            $location.search({});
                        });
                    } else {
                        $scope.openSigninDialog();
                    }
                }
            });
            //set order for recommend games and reset data list;
            $scope.games.order = 'random';
            $scope.games.hasMore = true;
            $scope.games.data = [];
            //set phase game play
            $scope.isLoad = true;
            $scope.isPlay = false;
            $scope.isEnd = false;
            $scope.isBattle = false;
            $scope.time = Date.now();
            $scope.share = ShareService;
            // eventAdsense.load();
        };
        $scope.loadTest = function(){
            $scope.isInit = true;
            $scope.games = GamesService;
            //load info this game
            $timeout(function() {
                $scope.isInit = false;
                $scope.link = '/sources/game/' + $routeParams.gameId + '/';
                //set order for recommend games and reset data list;
                $scope.games.order = 'random';
                $scope.games.hasMore = true;
                $scope.games.data = [];
                //set phase game play
                $scope.isLoad = true;
                $scope.isPlay = false;
                $scope.isEnd = false;
                $scope.share = ShareService;
            }, 200);
        };
        $scope.finishLoading = function(){
            if($rootScope.user){
                $scope.user = {
                    _id: $rootScope.user._id,
                    username: $rootScope.user.username,
                    avatar: $rootScope.user.avatar,
                    displayName: $rootScope.user.displayName
                };
            } else {
                $scope.user = {
                    avatar: 'http://www.funstart.net/sources/avatar.jpg',
                    displayName: 'Người chơi'
                }
            }
            $scope.suggestFriends = SuggestService;
            $scope.isLoad = false;
            console.log('done load!');
            //init info share
            $scope.share.setInfo({
                game: ($scope.games.currentGame)?$scope.games.currentGame.title:'Test Title',
                url: location.href.split('?')[0],
                pic: ($scope.games.currentGame)?$scope.games.currentGame.thumbAds:'http://www.funstart.net/sources/ads.jpg',
                des: ($scope.games.currentGame)?$scope.games.currentGame.des:'Test Description'
            });
            //load recommend games
            $scope.games.paging = 6;
            $scope.games.loadGames();

        };
        $scope.start = function(){
            
        };

        //filter display for mobile
        $scope.filterMobile = function(index){
            if($(window).width()<600) {
                if(index<3) return true;
                return false;
            } else {
                if(index<6) return true;
                return false;
            }

        }
        var timeCountdown = null;
        $scope.setTimeProgress = function () {
            if($scope.battle && $scope.battle.game && $scope.battle.game.time){
                if(timeCountdown) $interval.cancel(timeCountdown);
                $scope.battle.timedown = 100;
                timeCountdown = $interval(function() {
                    $scope.battle.timedown -= 10/$scope.battle.game.time;
                    if($scope.battle.timedown <= 0) $interval.cancel(timeCountdown);
                }, 100, 0, true);
            }
        }
        $scope.onPlay = function(){
            if($scope.battle && $scope.battle.room && $scope.battle.room.time){
                socket.on('turn',function(data){
                    console.log('turn',data);
                    console.log('play',$scope.isPlay);
                    if(!$scope.isPlay){
                        console.log('vo day de doi host');
                        if(data[$rootScope.user._id] == 0){
                            $scope.battle.isHost = true;
                            console.log('tao la host');
                        } else {
                            $scope.battle.isHost = false;
                        }
                    };
                    if($scope.battle.players){
                        Object.keys(data).forEach(function(e){
                            $scope.battle.players.forEach(function (player) {
                                if(player._id == e){
                                    player.turn = data[e];
                                    return true;
                                }
                            });
                        });
                        console.log($scope.battle.players);
                    }
                    $scope.$apply();
                    $scope.setTimeProgress();
                });
                $scope.setTimeProgress();
            }
            $scope.isEnd = false;
            $scope.isPlay = true;
            $scope.start();
        }
        // $scope.onReplay = function(){
        //     $scope.isEnd = false;
        //     $scope.start();
        // };
        $scope.shareFacebook = function(){

        }
        $scope.onShareFacebook = function(){
            // $scope.share();
            $scope.sharing = true;
            $scope.shareFacebook();
        };
        $scope.skipAds = function() {
            eventAdsense.skipAds();
        }
        $scope.user = {};
        $scope.endGame = function(obj){
            // if()
            console.log('end!');
            $timeout(function() {
                $scope.isEnd = true;
            });
            // if(Date.now() - $scope.time >= 2*60*1000){
                // eventAdsense.load();
            // }
            if(obj) $scope.setActivity(obj);
        };
        $scope.uploadResult = function(obj,callback){
            var fd = new FormData();
            var url = '/api/uploadresult/' + $routeParams.gameId;
            console.log(url);
            fd.append('file',obj.file);
            $http.post(url, fd, {
                    withCredentials : false,
                    headers : {
                        'Content-Type' : undefined
                    },
                    transformRequest : angular.identity
                })
                .success(function(res)
                {
                    console.log('obj ne',obj);
                    obj.pic = res.data;
                    $scope.share.setInfo(obj);
                    $scope.sharing = false;
                    if(callback) callback();
                })
                .error(function(res)
                {
                    console.log(res);
                    if(callback) callback();
                });

        };
        $scope.onReady = function(){
            $scope.battle.onReady();
        };
        $scope.setActivity = function(obj){
            $scope.isPlay = false;
            if($rootScope.user && $routeParams.gameId){
                $scope.activity = ActivitiesService;
                obj.game = $routeParams.gameId;
                if($scope.battle && $scope.battle.players){
                    obj.opponents = [];
                    $scope.battle.players.forEach(function(player){
                        if(player._id != $rootScope.user._id){
                            obj.opponents.push(player._id);
                        }
                    });
                }
                $scope.activity.createActivity(obj,function (res) {
                    if(res.data.level > $rootScope.user.level){
                        var toast3 = $mdToast.simple()
                            .textContent('Chúc mừng! Bạn đã được thăng cấp')
                            .theme('md-accent')
                            .position('bottom left');
                        $mdToast.show(toast3).then(function(response) {
                            //callback
                        });
                    }
                    $rootScope.user = res.data;
                });
            }
        };
        $scope.openSigninDialog = function(ev){
            $mdDialog.show({
                    controller: function($scope, $mdDialog) {
                        $scope.hide = function() {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function() {
                            $mdDialog.cancel();
                        };
                        $scope.answer = function(answer) {
                            $mdDialog.hide(answer);
                        };
                    },
                    templateUrl: 'app/templates/authDialog.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                })
                .then(function(answer) {

                }, function() {

                });
        }
        $scope.onCreateRoom = function(ev){
            if($rootScope.user){
                $scope.isEnd = false;
                $scope.isPlay = false;
                if(!$scope.isBattle){
                    $scope.isBattle = true;
                    $('body').css('overflow','hidden');
                    $scope.battle = BattleService;
                    $scope.battle.init($scope.games.currentGame,$rootScope.user,null);
                };
                $scope.battle.onCreateRoom(function(){
                });
            } else {
                $scope.openSigninDialog(ev);
            }

        };
        $scope.statusClass = function(status){
            return 'status-' + status;
        }
        $scope.onBattleCall = function (ev) {
            if($rootScope.user){
                $scope.isBattle = true;
                $('body').css('overflow','hidden');
                $scope.battle = BattleService;
                $scope.battle.init($scope.games.currentGame,$rootScope.user,null);
                $scope.battle.onFindBattle(null,function(){
                    $scope.onError();
                });
            } else {
                $scope.openSigninDialog(ev);
            }

        }
        $scope.onError = function(){
            $scope.isBattle = false;
            $('body').css('overflow','auto');
        };
        $scope.onCloseBattle = function(){
            console.log('Vo day');
            var confirm = $mdDialog.confirm()
                .title('Thoát chế độ thách đấu')
                .textContent('Bạn chắc chắn muốn thoát chứ?')
                .parent(angular.element(document.body))
                .ok('Có')
                .cancel('Không');
            // if($scope.battle.status.isEndGame){
            //     confirm.parent(angular.element(document.querySelector('.recommend-games')))
            // } else if($scope.battle.status.isFullscreen){
            //     confirm.parent(angular.element(document.querySelector('.game-area')))
            // } else if($scope.battle.status.isWaitRoom){
            //     confirm.parent(angular.element(document.querySelector('.battle-room')));
            // } else {
            //     confirm.parent(angular.element(document.querySelector('.spinner-bg')));
            // }
            $mdDialog.show(confirm).then(function() {
                $scope.isBattle = false;
                $('body').css('overflow','auto');
                $location.search().roomId = null;
                //chuyen phase game ve chon choi
                $scope.isPlay = false;
                $scope.isEnd = false;
                $scope.battle.onCloseBattle();
            }, function() {

            });

        }
        $scope.isMobile = function(){
            if($(window).width() >= 960){
                return false;
            } else {
                return true;
            }
        }

    }]);
angular.module('funstart').directive('fsImg', function($routeParams) {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr)
        {
            var s = document.createElement("img");
            var src = elem.attr('src');
            if(src!==undefined)
            {
                s.src = '/sources/game/' + $routeParams.gameId + src;
                if(s.class) s.class = elem.attr('class');
                if(s.style) s.style = elem.attr('style');
                if(s.id) s.id = elem.attr('id');
            }
            else
            {
                var code = elem.text();
                s.text = code;
            }
            elem.parent().append(s);
            elem.remove();
        }
    };
});

angular.module('funstart').directive('fsScript', function($routeParams) {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr)
        {

            var s = document.createElement("script");
            s.type = "text/javascript";
            var src = elem.attr('src');
            if(src!==undefined)
            {
                s.src = '/sources/game/' + $routeParams.gameId + src;
            }
            else
            {
                var code = elem.text();
                s.text = code;
            }
            document.head.appendChild(s);
            elem.remove();

        }
    };
});
// angular.module('funstart').directive('ng-game', function() {
//     return {
//         restrict: 'E',
//         scope: false,
//         link: function(scope, elem, attr)
//         {
//             elem.html();
//         }
//     };
// });

angular.module('funstart').directive('fsLink', function($routeParams) {
    return {
        restrict: 'E',
        scope: false,
        link: function(scope, elem, attr)
        {
            var s = document.createElement("link");
            s.type = "text/css";
            s.rel = "stylesheet";
            var href = elem.attr('href');
            if(href!==undefined)
            {
                s.href = '/sources/game/' + $routeParams.gameId + href;
            }
            else
            {
                var code = elem.text();
                s.text = code;
            }
            document.head.appendChild(s);
            elem.remove();
        }
    };
});
