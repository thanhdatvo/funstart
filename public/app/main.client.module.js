angular.module('funstart', ['ngResource', 'ngRoute', 'ngMaterial', 'ngMessages', 'auth', 'infinite-scroll', 'ngImgCrop']);
angular.element(document).ready(function () {
    angular.bootstrap(document, ['funstart']);
});