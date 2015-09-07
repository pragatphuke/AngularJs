(function (window, tableMainApp, undefined) {
    tableMainApp.factory('tableService', ['$http','tableMainService','$q', function($http,tableMainService,$q) {

        return{
            saveRecords : saveRecords
        };

        function saveRecords(saveObj){

            var deffered = $q.defer();

            var req = {
                method: 'POST',
                url: 'http://www.example.com/api/save/records',
                data: JSON.stringify (saveObj)
            }

            $http(req).success(function(data, status){

                deffered.resolve(data, status);
            }).error(function(data,status){

                deffered.resolve(data, status);
            });

            return deffered.promise;
        }
    }]);
})(window, tableMainApp = window.tableMainApp || {});