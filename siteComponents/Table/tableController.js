(function (window, tableMainApp, undefined) {

    tableMainApp.controller('tableController', ['$scope','$rootScope','$location','tableMainService','$modal','$timeout','tableService','$filter', function($scope,$rootScope,$location,tableMainService,$modal,$timeout,tableService,$filter) {

        console.log('Call to table Controller');

        $scope.sortType     = 'name';
        $scope.sortReverse  = false;
        $scope.userAddSuccess = false;
        $scope.deleteUserSuccess = false;
        $scope.userSaveWarning = false;
        $scope.userDeleteWarning = false;

        $scope.userRecords = [{id: 'I123', name: 'Pagy', email: 'pagy@gmail.com', companyProfile:{coId: 1, coName: 'abc'}},{id: 'I234', name: 'John', email: 'john@gmail.com', companyProfile:{coId: 2, coName: 'xyz'}},{id: 'I436', name: 'Pam', email: 'pam@gmail.com', companyProfile:{coId: 3, coName: 'pqr'}},{id: 'I879', name: 'Kevin', email: 'kevin@gmail.com', companyProfile:{coId: 4, coName: 'abc'}},{id: 'I652', name: 'Steve', email: 'steve@gmail.com', companyProfile:{coId: 5, coName: 'xyz'}}];

        angular.forEach($scope.userRecords, function (list, ui) {

            list.editFlag = false;
            list.deleteFlag = false;
            list.status = 'UPDATE';
            list.uniqueIndex = ui;
        });

        $scope.setFieldFocus = function(field, index){

            $scope[field+index]= true;
        }

        $scope.onFieldBlur = function(field, index){

            $scope[field+index]= false;
        }

        $scope.setEditFlag = function(user){

            if(!user.editFlag){

                user.editFlag = true;
            }
        }

        $scope.addDeleteFlag = function(flag){

            angular.forEach($scope.userRecords, function (record, d) {

                record.deleteFlag = flag;
            });
        }

        $scope.checkAllList = function(){

            if($scope.checkAll){

                $scope.addDeleteFlag(true);
            }else{

                $scope.addDeleteFlag(false);
            }
        }

        $scope.addRecord = function(){

            var emptyRecord = {
                id: '',
                name: '',
                email: '',
                editFlag: true,
                deleteFlag: false,
                status: 'CREATE',
                uniqueIndex: $scope.userRecords.length,
                companyProfile:{coId: $scope.userRecords.length + 1, coName: ''}
            }

            $scope.userRecords.push(emptyRecord);

            $timeout(function () {

               $('#tableUserId'+emptyRecord.uniqueIndex).focus();
               emptyRecord = {};
            }, 500);
        }

        $scope.saveRecords = function(){

            if($scope.userRecords.length != 0){

                var newListToSave = [];
                for(var ur=0;ur<$scope.userRecords.length;ur++){

                    var userRecord = $scope.userRecords[ur];
                    if(userRecord.editFlag){

                        newListToSave.push(userRecord);
                    }
                }

                if(newListToSave.length != 0){

                    //Make call to backend API to save the records(Sample of API call)                    
                    $scope.saveRecordsRes = tableService.saveRecords(newListToSave);

                    $scope.saveRecordsRes.then(

                        function success(data, status){
                            if(data.status == 'success'){

                                console.log('Show success message about records saved');
                            }else{
                                console.log('List empty');
                            }
                        }
                    )

                    //after succesfull response
                    $scope.userAddSuccess = true;
                    $timeout(function () {

                        $scope.userAddSuccess = false;
                    }, 2000);
                }else{
                    
                    $scope.userSaveWarning = true;
                    $timeout(function () {

                        $scope.userSaveWarning = false;
                    }, 2000);
                }
            }else{
                
                alert('No records to save');
            }
        }

        $scope.deleteRecordList = function(){

            //then make API call to delete records
            var newListAfterDelete = $filter('filter')($scope.userRecords, {deleteFlag: false});

            $scope.userRecords = newListAfterDelete;
            $scope.deleteUserSuccess = true;
            $timeout(function () {

                $scope.deleteUserSuccess = false;
            }, 2000);
        }
        
        $scope.deleteRecords = function(){

            if($scope.checkAll){

                console.log('Confirmation message to delete records');
                $scope.deleteRecordList();
            }else{

                var newListToDelete = [];
                for(var ur=0;ur<$scope.userRecords.length;ur++){

                    var userRecord = $scope.userRecords[ur];
                    if(userRecord.deleteFlag){

                        newListToDelete.push(userRecord);
                    }
                }

                if(newListToDelete.length != 0){

                    $scope.deleteRecordList();
                }else{

                    $scope.userDeleteWarning = true;
                    $timeout(function () {

                        $scope.userDeleteWarning = false;
                    }, 2000);
                }
            }
        }
        
    }]);
})(window, tableMainApp = window.tableMainApp || {});