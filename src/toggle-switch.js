var toggleSwitch = function() {
	return {
		restrict: 'E',
		require: 'ngModel',
		scope: {
			ngModel: '=',
			// ngChange: '?',
			label: '@',
			value: '=?',
			onPreToggle: "&",
			onPostToggle: "&"
		},
		template: '<div ng-click="toggle()" class="toggle-switch" ng-class="{on: isOn()}"><div class="toggle-container"><div class="toggle"></div></div><span>{{ label }}</span></div>',
		compile: function (element, attr) {
			var linkFunction = function ($scope, $element, $attr, ngModel) {
				$scope.toggle = function () {
					if (typeof ($scope.onPreToggle) === "function")
						$scope.onPreToggle();
					var currentValue;
					if ($scope.value !== undefined && $scope.value !== null && typeof ($scope.value) !== "boolean") {
						currentValue = $scope.ngModel || [];
						var index = currentValue.map(function (v) { return v.toString(); }).indexOf($scope.value);
						if (index > -1)
							currentValue.splice(index, 1); // remove
						else
							currentValue.push($scope.value);
					}
					else
						currentValue = !$scope.ngModel;
					ngModel.$setViewValue(currentValue);
					if (typeof ($scope.onPostToggle) === "function")
						$scope.onPostToggle();
				};
			};

			return linkFunction;
		},
		controller: ["$scope", function ($scope) {
			$scope.isOn = function () {
				if ($scope.value !== undefined && $scope.value !== null && typeof ($scope.value) !== "boolean") {
					var currentValue = $scope.ngModel || [];
					var index = currentValue.map(function (v) { return v.toString(); }).indexOf($scope.value);
					return index > -1;
				}
				return $scope.ngModel;
			};
		}]
		/*
		 * This has been superceeded by the linkFunction above as when nested in an ng-if the compile function is called but not the link function as declared below.
		, link: ["$scope", "$element", "$attr", "ngModel", "$filter", function ($scope, $element, $attr, ngModel, $filter) {
			$scope.toggle = function () {
				if (typeof ($scope.onPreToggle) === "function")
					$scope.onPreToggle();
				var currentValue;
				if ($scope.value !== undefined && $scope.value !== null && typeof ($scope.value) !== "boolean") {
					currentValue = $scope.ngModel || [];
					var index = currentValue.map(function (v) { return v.toString(); }).indexOf($scope.value);
					if (index > -1)
						currentValue.splice(index, 1); // remove
					else
						currentValue.push($scope.value);
				}
				else
					currentValue = !$scope.ngModel;
				ngModel.$setViewValue(currentValue);
				if (typeof ($scope.onPostToggle) === "function")
					$scope.onPostToggle();
			};
		}]
		*/
	};
};

/*
If the directive doesn't propergate properly, I've noticed that if you place the toggle inside (as a child or grandchild etc.) something with an ng-if, the scope seems to break.
remove the ng-if and try ng-show
*/

angular.module("ngToggle", []);

angular
	.module('ngToggle')
	.directive('toggleSwitch', toggleSwitch);
