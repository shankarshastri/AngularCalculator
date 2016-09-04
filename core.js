var app = angular.module('Angular_Calc', []);

app.controller('angularCalcController', ['$scope', '$http', function($scope, $http) {
    console.log("Entered Controller");
    $scope.Output = '0';
    $scope.OutputCalc = '0';
    $scope.flagCalc = false;
    $scope.pushOutput = function(val) {
        if (!$scope.flagCalc) {
            if ($scope.OutputCalc === '0')
                $scope.OutputCalc = val;
            else
                $scope.OutputCalc += val;
            $scope.Output = $scope.OutputCalc;
            console.log($scope.Output);
        } else {
            console.log(val);
            console.log(isNaN(val));
            if (isNaN(val)) {
                $scope.Output = $scope.Output + val;

            } else {
                $scope.Output = val;
            }
            $scope.OutputCalc = $scope.Output;
            $scope.flagCalc = false;
        }
    };

    $scope.calcOutput = function() {
        $scope.Output = eval($scope.Output);
        if (!$scope.Output && $scope.Output != '0') {
            $scope.Output = "Infinity";
        }
        $scope.OutputCalc = '0';
        $scope.flagCalc = true;
        console.log($scope.Output);
    };
    
    $scope.clearOutput = function() {
        $scope.Output = '0';
        $scope.OutputCalc = '0';
    };
}]);
