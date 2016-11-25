angular.module('mcareApp').controller('HomeController', ['$scope', '$http', 'SessionService', function ($scope, $http, SessionService) {

    SessionService.CheckSession();
    var token = sessionStorage.getItem(appGlobalSettings.sessionTokenName);

    $('#menu-left').sideNav('hide');

    $scope.Register = {};
    $scope.RegisterForm = {ShowError: false};

    if (sessionStorage.getItem("UserType") == 'patient') {
        document.location.href = "#/patientprofile";
    }

    $('#appointment').fullCalendar({
        contentHeight: 500,
        defaultView: 'agendaDay',
        events: [
                {
                    title: 'Anna - Post Partum Visit',
                    start: '2016-11-25T13:00:00',
                    end: '2016-11-25T14:00:00'
                },
                {
                    title: 'Summer - Post Partum Visit',
                    start: '2016-11-25T14:05:00',
                    end: '2016-11-25T15:00:00'
                },
                {
                    title: 'Roselle - Prenatal Visit',
                    start: '2016-11-25T08:00:00',
                    end: '2016-11-25T08:30:00'
                },
                {
                    title: 'Jocelyn - Prenatal Visit',
                    start: '2016-11-25T09:00:00',
                    end: '2016-11-25T09:30:00'
                },
                {
                    title: 'Courtney - Prenatal Visit',
                    start: '2016-11-18T10:00:00',
                    end: '2016-11-18T10:30:00'
                },
                {
                    title: 'Fay - Prenatal Visit',
                    start: '2016-11-25T11:00:00',
                    end: '2016-11-25T11:30:00'
                },
                {
                    title: 'event3',
                    start: '2010-01-09T12:30:00',
                    allDay: false // will make the time show
                }
        ]
    })

    $scope.AddAppointment = function () {
        $("#pnlAddAppointment").show();
        $("#pnlAddAppointment").removeClass("fadeOutUp");
        $("#pnlAddAppointment").addClass("fadeInUp");
        $("#pnlAddAppointmentButton").addClass("fadeOutUp");
        $("#pnlAddAppointmentButton").removeClass("fadeInUp");
        $("#pnlAddAppointmentButton").hide();
    };

    $scope.Cancel = function () {
        $("#pnlAddAppointmentButton").show();
        $("#pnlAddAppointmentButton").removeClass("fadeOutUp");
        $("#pnlAddAppointmentButton").addClass("fadeInUp");
        $("#pnlAddAppointment").hide();
        $("#pnlAddAppointment").addClass("fadeOutUp");
        $("#pnlAddAppointment").removeClass("fadeInUp");

    };

    //var data = {
    //    labels: ["January", "February", "March", "April", "May", "June", "July"],
    //    datasets: [
    //        {
    //            label: "Claims submitted to Moh",
    //            backgroundColor: 'rgba(54, 162, 235, 0.2)',
    //            borderColor: 'rgba(54, 162, 235, 1)',
    //            borderWidth: 1,
    //            data: [65, 59, 80, 81, 56, 55, 40],
    //        }
    //    ]
    //};

    //var claimsChartEL = document.getElementById("claimsChart");
    //var claimsChart = new Chart(claimsChartEL, {
    //    type: "bar",
    //    data: data,
    //    options: {
    //        scales: {
    //            xAxes: [{
    //                stacked: true
    //            }],
    //            yAxes: [{
    //                stacked: true
    //            }]
    //        }
    //    }
    //});


    //var expenseData = {
    //    labels: ["January", "February", "March", "April", "May", "June", "July"],
    //    datasets: [
    //        {
    //            label: "Claims submitted to Moh",
    //            backgroundColor: 'rgba(255, 99, 132, 0.2)',
    //            borderColor: 'rgba(255,99,132,1)',
    //            borderWidth: 1,
    //            data: [65, 59, 80, 81, 56, 55, 40],
    //        }
    //    ]
    //};

    //var expenseChartEl = document.getElementById("expenseChart");
    //var expenseChart = new Chart(expenseChartEl, {
    //    type: "bar",
    //    data: expenseData,
    //    options: {
    //        scales: {
    //            xAxes: [{
    //                stacked: true
    //            }],
    //            yAxes: [{
    //                stacked: true
    //            }]
    //        }
    //    }
    //});

    $scope.AddPatient = function () {
        $("#registerPatientModal").modal('show');
    };

    $scope.SaveNewPatient = function () {
        $("#registerPatientModal").modal('hide');
        if (!isBlank($scope.Register.Email)) {

            $http.put(appGlobalSettings.apiBaseUrl + '/PatientList?token=' + encodeURIComponent(token),
                    JSON.stringify($scope.Register))
                    .then(function (data) {
                        $("#registerPatientModal").modal('hide');
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