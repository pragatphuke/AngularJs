(function (window, tableMainApp, undefined) {

    tableMainApp.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {

            redirectTo: '/home'
        })
        
        .when('/home', { 
            
            templateUrl: 'siteComponents/Home/home.html',
            controller: 'HomeController',
            reloadOnSearch: false
        })
        
        .when('/table/operation', {

            templateUrl: 'siteComponents/Table/table.html',
            reloadOnSearch: false
        })
        
        .otherwise({

            redirectTo: '/home'
        });
    }])

})(window, tableMainApp = window.tableMainApp || {});