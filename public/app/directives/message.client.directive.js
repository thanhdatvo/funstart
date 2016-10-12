angular.module('funstart').directive('messagePanel', function () {
    return {
        'templateUrl': '/app/templates/messagePanel.tmpl.html',
        'scope': {
            item: '='
        },
        'controller': function($scope){
        }
    }
});