(function (window, tableMainApp, undefined) {

    tableMainApp.factory('tableMainService',['$rootScope','$http','$q', function ($rootScope, $http, $q) {
            
        return{
            globalData: globalData
        };
          
        function globalData(){
            /* You can write your global variable inside global() function */
            var global = {
                apiurl : 'http://www.tableoperation.com/table' //Just sample of rest url(You can include your own url)
                //secret_key : 'dfd454dcfd545dfgvd545'
            }
            
            return global;
        }          
    }])

})(window, tableMainApp = window.tableMainApp || {});


