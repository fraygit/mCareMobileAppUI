angular.module('mcareApp').controller('PatientListController', ['$scope', '$http', 'SessionService', function ($scope, $http, SessionService) {

    SessionService.CheckSession();
    var token = localStorage.getItem(appGlobalSettings.sessionTokenName);

    $('#menu-left').sideNav('hide');

    $scope.GoToPatientProfile = function (email) {
        sessionStorage.setItem("currentPatientEmail", email);
        document.location.href = "#/patientprofile";
    };

    $scope.PatientList = [];

    var LoadList = function () {
        $http.get(appGlobalSettings.apiBaseUrl + '/PatientList?token=' + encodeURIComponent(token))
                .then(function (data) {
                    $scope.PatientList = data.data;
                },
                function (error) {
                    $scope.ErrorMessage = "Error encountered. " + error.statusText;
                    $("#ErrorMessage").slideDown('slow');
                });
    };

    LoadList();

    $scope.AddClient = function () {
        $("#pnlAddClient").show();
        $("#pnlAddClient").removeClass("fadeOutUp");
        $("#pnlAddClient").addClass("fadeInUp");
        $("#pnlAddClientButton").addClass("fadeOutUp");
        $("#pnlAddClientButton").removeClass("fadeInUp");
        $("#pnlAddClientButton").hide();
    };

    $scope.Cancel = function () {
        $("#pnlAddClientButton").show();
        $("#pnlAddClientButton").removeClass("fadeOutUp");
        $("#pnlAddClientButton").addClass("fadeInUp");
        $("#pnlAddClient").hide();
        $("#pnlAddClient").addClass("fadeOutUp");
        $("#pnlAddClient").removeClass("fadeInUp");
    };

    $scope.RegisterForm = { ShowError: false };

    $scope.SaveNewPatient = function () {
        $scope.RegisterForm.ShowError = false;
        if (!isBlank($scope.Register.Email)) {

            $http.put(appGlobalSettings.apiBaseUrl + '/PatientList?token=' + encodeURIComponent(token),
                    JSON.stringify($scope.Register))
                    .then(function (data) {
                        $scope.Cancel();
                        LoadList();
                    },
                    function (error) {
                        $scope.RegisterForm.ErrorMessage = "Error encountered. " + error.statusText;
                        $scope.RegisterForm.ShowError = true;
                    });
        }
        else {
            $scope.RegisterForm.ErrorMessage = "Please input email address.";
            $scope.RegisterForm.ShowError = true;
        }
    }

}]);