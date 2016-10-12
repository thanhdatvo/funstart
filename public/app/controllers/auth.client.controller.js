angular.module('auth').controller('ActionController',['$scope','$rootScope','$location','ActionReset','$routeParams',
    function($scope,$rootScope,$location,ActionReset,$routeParams){
        console.log($routeParams);
        $scope.new = {};
        $scope.submitting = false;
        $scope.onReset = function() {
            ActionReset.save({token: $routeParams.token,password: $scope.new.password},function(res){
                $scope.successAction = res.message;
                $rootScope.user = res.data;
                localStorage.setItem('token',res.data.token);
                sessionStorage.setItem('user',JSON.stringify($rootScope.user));
                $scope.submitting = false;
            },function(err){
                $scope.errorAction = err.message;
                $scope.submitting = false;
            });
        }

}]);
angular.module('auth').controller('AuthController',['$scope','AuthFacebook','AuthSignup','AuthSignin','ActionReset','$rootScope','$http',
    function($scope,AuthFacebook,AuthSignup,AuthSignin,ActionReset,$rootScope,$http){
        $scope.location = window.location.href;
        $scope.signupModel = {};
        $scope.submitting = false;
        $scope.onSignOut = function(){
            localStorage.removeItem('token');
            // sessionStorage.removeItem('user');
            user = null;
            window.location.href = "logout";
        };
        $scope.action = {};
        $scope.signinModel = {};
        if(message != "null"){
            $scope.errorSignin = message;
        }
        $scope.onLoginFacebook = function(){
            $scope.errorSignin = null;
            $scope.submitting = true;
            AuthFacebook.get(function(res){
                $rootScope.user = res.data;
                // $rootScope.missions = MissionsService;
                // $rootScope.missions.loadMissions($rootScope.user._id);
                localStorage.setItem('token',res.data.token);
                // sessionStorage.setItem('user',JSON.stringify(res.data));
                $scope.submitting = false;
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token;
                $scope.cancel();
            });
        };
        $scope.onSignup = function(){
            $scope.submitting = true;
            $scope.errorSignup = null;
            AuthSignup.save($scope.signupModel,function(res){
                $rootScope.user = res.user;
                // $rootScope.missions = MissionsService;
                // $rootScope.missions.loadMissions($rootScope.user._id);
                localStorage.setItem('token',res.user.token);
                // sessionStorage.setItem('user',JSON.stringify(res.user));
                $http.defaults.headers.common['Authorization'] = 'Bearer ' + res.user.token;
                $scope.submitting = false;
                $scope.cancel();
            },function(err){
                $scope.errorSignin = "Tài khoản không tồn tại, hoặc sai mật khẩu";
                $scope.submitting = false;
            });
        };
        $scope.onSignin = function(){
            $scope.submitting = true;
            $scope.errorSignin = null;
            console.log('here');
            AuthSignin.save($scope.signinModel,function(res){
                $rootScope.user = res.user;
                localStorage.setItem('token',res.user.token);
                // sessionStorage.setItem('user',JSON.stringify($rootScope.user));
                // $rootScope.missions = MissionsService;
                // $rootScope.missions.loadMissions($rootScope.user._id);
                $scope.submitting = false;
                $scope.cancel();
            },function(err){
                if(err.status == 401){
                    $scope.errorSignin = "Tài khoản không tồn tại, hoặc sai mật khẩu";
                } else if(err.status == 500){
                    $scope.errorSignin = "Có lỗi hệ thống, vui lòng thử lại sau!";
                }
                $scope.submitting = false;
            });
        };
        $scope.onReset = function(){
            ActionReset.save({email: $scope.action.email}, function (res) {
                $scope.successAction = res.message;
            },function (err) {
                $scope.errorAction = err.message;
            })
        }
}]);
