var app = angular.module('Angular_Calc', []);

app.controller('angularCalcController', ['$scope', '$http', function($scope, $http) {
    $scope.Output = '0';
    $scope.OutputCalc = '0';
    $scope.flagCalc = false;
    $scope.pushOutput = function(val) {
        if (!$scope.flagCalc) {
            if ($scope.OutputCalc === '0')
                $scope.OutputCalc = val;
            else {
                if (isNaN(val)) {
                    if (!isNaN($scope.OutputCalc.charAt($scope.OutputCalc.length - 1)))
                        $scope.OutputCalc += val;
                } else {
                    $scope.OutputCalc += val;
                }
            }

            $scope.Output = $scope.OutputCalc;
        } else {

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
        var temp = 0;
        try {
            temp = eval($scope.Output);
        } catch (e) {
            return;
        }
        $scope.Output = temp;
        if (!$scope.Output && $scope.Output != '0') {
            $scope.Output = "Infinity";
        }
        $scope.OutputCalc = '0';
        $scope.flagCalc = true;
    };

    $scope.clearOutput = function() {
        $scope.Output = '0';
        $scope.OutputCalc = '0';
    };
}]);





//directive taken from typed.js
app.directive('typewrite', ['$timeout', function($timeout) {
    function linkFunction(scope, iElement, iAttrs) {
        var timer = null,
            initialDelay = iAttrs.initialDelay ? getTypeDelay(iAttrs.initialDelay) : 200,
            typeDelay = iAttrs.typeDelay ? getTypeDelay(iAttrs.typeDelay) : 200,
            blinkDelay = iAttrs.blinkDelay ? getAnimationDelay(iAttrs.blinkDelay) : false,
            cursor = iAttrs.cursor ? iAttrs.cursor : '|',
            blinkCursor = iAttrs.blinkCursor ? iAttrs.blinkCursor === "true" : true,
            auxStyle;
        if (iAttrs.text) {
            timer = $timeout(function() {
                updateIt(iElement, 0, iAttrs.text);
            }, initialDelay);
        }

        function updateIt(element, i, text) {
            if (i <= text.length) {
                element.html(text.substring(0, i) + cursor);
                i++;
                timer = $timeout(function() {
                    updateIt(iElement, i, text);
                }, typeDelay);
                return;
            } else {
                if (blinkCursor) {
                    if (blinkDelay) {
                        auxStyle = '-webkit-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-moz-animation:blink-it steps(1) ' + blinkDelay + ' infinite ' +
                            '-ms-animation:blink-it steps(1) ' + blinkDelay + ' infinite;-o-animation:blink-it steps(1) ' + blinkDelay + ' infinite; ' +
                            'animation:blink-it steps(1) ' + blinkDelay + ' infinite;';
                        element.html(text.substring(0, i) + '<span class="blink" style="' + auxStyle + '">' + cursor + '</span>');
                    } else {
                        element.html(text.substring(0, i) + '<span class="blink">' + cursor + '</span>');
                    }
                } else {
                    element.html(text.substring(0, i));
                }
            }
        }

        function getTypeDelay(delay) {
            if (typeof delay === 'string') {
                return delay.charAt(delay.length - 1) === 's' ? parseInt(delay.substring(0, delay.length - 1), 10) * 1000 : +delay;
            }
        }

        function getAnimationDelay(delay) {
            if (typeof delay === 'string') {
                return delay.charAt(delay.length - 1) === 's' ? delay : parseInt(delay.substring(0, delay.length - 1), 10) / 1000;
            }
        }

        scope.$on('$destroy', function() {
            if (timer) {
                $timeout.cancel(timer);
            }
        });
    }

    return {
        restrict: 'A',
        link: linkFunction,
        scope: false
    };

}]);
