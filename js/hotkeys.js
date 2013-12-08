window.App = window.App || {};

App.hotKeys = {};

App.hotKeys.bindKeys = function () {
        // Short-cuts
        $(document).bind('keydown.left', function (e) { App.goPrev(); });
        $(document).bind('keydown.right', function (e) { App.goNext(); });
        $(document).bind('keydown.alt_right', function (e) { App.goNextScene(); });
        $(document).bind('keydown.alt_left', function (e) { App.goPrev(); });
        $(document).bind('keydown.alt_r', function (e) { App.refreshCurrentScene(); });
        $(document).bind('keyup.alt_1', function (e) { App.goHome(); });
        $(document).bind('keyup.alt_0', function (e) { App.goHome(); });
        $(document).bind('keyup.alt_/', function (e) { App.appendAllSceneItems(); });
        $(document).bind('keyup.alt_i', function (e) { App.showScenePicker(); });
};