(function (window, tableMainApp, undefined) {

    tableMainApp.filter('filterUserMgmt', function () {

        return function (dataArray, searchTerm) {
            if (!dataArray) return;

            if (!searchTerm) {
                return dataArray
            } else {

                return dataArray.filter(function (user) {

                    if(user.companyProfile != undefined){

                        return (angular.lowercase(user.name).indexOf(searchTerm || '') !== -1 || angular.lowercase(user.companyProfile.coName).indexOf(searchTerm || '') !== -1);
                    }else {
                        return (angular.lowercase(user.name).indexOf(searchTerm || '') !== -1);
                    }
                });
            }
        }
    });

})(window, tableMainApp = window.tableMainApp || {});


