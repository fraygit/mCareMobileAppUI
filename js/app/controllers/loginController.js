﻿angular.module('mcareAppLogin').controller('LoginController', ['$scope', '$http', function ($scope, $http) {

    $scope.LoginError = { ShowError: false};
    $scope.LoginForm = {};

    $scope.ValidateUser = function () {
        if (!commonHelper.IsStringNullOrEmpty($scope.LoginForm.Email) && !commonHelper.IsStringNullOrEmpty($scope.LoginForm.Password)) {

            $http.post(appGlobalSettings.apiBaseUrl + '/User',
                JSON.stringify($scope.LoginForm))
                .then(function (data) {
                    localStorage.setItem("firstname", data.data.UserDetails.FirstName);
                    localStorage.setItem(appGlobalSettings.sessionTokenName, data.data.UserToken.Token);
                    localStorage.setItem(appGlobalSettings.sessionUserType, data.data.UserType);
                    document.location.href = "index.html";
                }, function (error) {
                    $scope.LoginError.Message = "Invalid username or password.";
                    $scope.LoginError.ShowError = true;
                });
            return;
        }
        else {
            $scope.LoginError.ShowError = true;
            $scope.LoginError.Message = "Please fill in all required fields.";
        }

    };

}]);