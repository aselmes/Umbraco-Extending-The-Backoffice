angular.module("umbraco")
    .controller("wordCounterApp", function (editorState, userService, contentResource) {
        var vm = this;
        vm.CurrentNodeId = editorState.current.id;
        vm.CurrentNodeAlias = editorState.current.contentTypeAlias;

        var counter = contentResource.getById(vm.CurrentNodeId).then(function (node) {
            var properties = node.variants[0].tabs[0].properties;

            vm.propertyWordCount = {};

            var index;
            for (index = 0; index < properties.length; ++index) {
                var words = properties[index].value;
                var wordCount = 0;
                if (words.trim && typeof words.trim === 'function') {
                    wordCount = words.trim().split(/\s+/).length;
                }
                vm.propertyWordCount[properties[index].label] = wordCount;
            }
            vm.TotalProperties = properties.length;
        });

        var user = userService.getCurrentUser().then(function (user) {
            vm.UserName = user.name;
        });
    });