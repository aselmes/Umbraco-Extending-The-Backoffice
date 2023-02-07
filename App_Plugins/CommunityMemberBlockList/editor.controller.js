angular.module("umbraco")
    .controller("communityMemberController", function ($scope, mediaResource) {
        //fallbacks for empty settings
        $scope.imageUrl = "";
        $scope.bgColor = "#ffffff";
        $scope.textColor = "#000000";
        $scope.$watch('block.data', function () {
            //your property is called image so the following will contain the udi
            if ($scope.block.data.image == null) {
                return;
            }
            var imageUdi = $scope.block.data.image;
            if (imageUdi !== null && typeof imageUdi[0] !== "undefined") {
                //the mediaResource has a getById method
                mediaResource.getById(imageUdi[0].mediaKey)
                    .then(function (media) {
                        $scope.imageUrl = media.mediaLink;
                    });
            }
        }, true);
        $scope.$watch('block.settingsData', function () {
            if ($scope.block.settingsData.backgroundColor != null) {
                $scope.bgColor = $scope.block.settingsData.backgroundColor.value;
            }
            if ($scope.block.settingsData.textColor != null) {
                $scope.textColor = $scope.block.settingsData.textColor.value;
            }
        }, true);
    });