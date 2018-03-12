var mainApplicationModuleName = 'medicalhistory';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource','ngRoute','users', 'example','appointments']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

 angular.element(document).ready(function() {
   angular.bootstrap(document, [mainApplicationModuleName]);
 });
