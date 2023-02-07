angular.module("umbraco")
    .controller("forumpostEditorController", function ($scope, $http, notificationsService) {
        $scope.search = function (term) {
            if (term && term.length > 4) {
                var url = "https://our.umbraco.com/umbraco/api/OurSearch/GetForumSearchResults?term=" + term;

                $http.get(url).then(function (response) {
                    $scope.model.results = response.data.items;
                });
            } else {
                $scope.model.results = [];
            }
        };

        if (angular.isArray($scope.model.value) === false) {
            $scope.model.value = [];
        }

        $scope.add = function (result) {
            if (parseInt($scope.model.config.maxPosts) > $scope.model.value.length) {
                $scope.model.value.push(result);
            }
            else {
                notificationsService.remove(0);
                notificationsService.warning(
                    "Too many posts!", "You have already curated " +
                    $scope.model.config.maxPosts + " posts.")
            }
        };

        $scope.remove = function (index) {
            $scope.model.value.splice(index, 1);
        };
    });