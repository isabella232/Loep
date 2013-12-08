window.App = window.App || {};

// No codeproject without a code name!
App.codeName = "Loep";

// Put to true will automatically highlight the first sence element that has a description
App.autoHighlight = false;
// Put to true to automatically step through the scene elements with descriptions and the scenes itself
App.autoNext = false;
// Amount of milliseconds to wait when automatically stepping through
App.autoTransitionDelay = 8000;

App.controller = {
    presentationCanvas: null,
    timelineCanvas: null,
    scenePickerCanvas: null,
    sceneTotal: null,
    sceneCurrent: null,
    sceneElementTotal: null,
    sceneElementCurrent: null
};

App.init = function () {
    // Cache the different canvasses and make them easy accesible
    App.controller.presentationCanvas = $('presentation');
    App.controller.timelineCanvas = $('timeline');
    App.controller.scenePickerCanvas = $('scenepicker');

    // setup the mouse and key bindings for main interactions
    App.setupAppBindings();
    
    // Set up total slides
    App.controller.sceneTotal = App.scenes.length;

    // Show initial slide
    App.controller.sceneCurrent = 0;
    App.refreshCurrentScene();
};

App.setupAppBindings = function () {

    if (App.hotKeys) {
        App.hotKeys.bindKeys();
    }

    // clicking anywhere in the window will go to the next step
    $('body').on('mousedown touchstart', function () {
        App.goNext();
    });

    if (App.autoNext) {
        setInterval(function () {
            App.goNext();
        }, App.autoTransitionDelay);
    }
};

// MAIN STEPTRHOUGH FUNCTIONS
App.goNext = function () {
    var descriptions = $('.description');
    var descriptionCount = descriptions.length;

    if (descriptionCount === 0) {
        App.goNextScene();
        return;
    }

    if (App.controller.shownDescriptions < descriptionCount) {
        App.highlightElementInScene(App.controller.shownDescriptions);
        return;
    }

    App.goNextScene();
};

App.goPrev = function () {
    // for now prev just goes to the prev scene and not going to the last element
    App.goPrevScene();
};


// SCENE ELEMENT INTERACTION
App.highlightElementInScene = function (count) {
    var me = 'App.highlightElementInScene';
    console.info(me);
    var descriptions = $('.description');
    var sceneElementContainers = $('.scene-element-container');
    var currentDescriptionContainer = $(descriptions[count]).parents('.scene-element-container');

    if (currentDescriptionContainer.length > 0) {
        sceneElementContainers.removeClass('highlight').addClass('non-highlight');
        currentDescriptionContainer.addClass('highlight').removeClass('non-highlight');
        App.controller.shownDescriptions++;
    }
};

// SCENE NAVIGATION
App.goNextScene = function () {
    var me = 'App.goNextScene';
    if (App.controller.sceneCurrent < App.controller.sceneTotal - 1) {
        console.info(me + ':: increase current scene and rerender');
        App.controller.sceneCurrent++;
        App.refreshCurrentScene();
    } else {
        console.info(me + ':: called while end scene already shown');
    }
};

App.goPrevScene = function () {
    var me = 'App.goPrevScene';
    if (App.controller.sceneCurrent > 0) {
        console.info(me + ':: increase current scene and rerender');
        App.controller.sceneCurrent--;
        App.refreshCurrentScene();
    } else {
        console.info(me + ':: called while first scene already shown');
    }
};

App.goToScene = function (sceneIndex) {
    sceneIndex = parseInt(sceneIndex,10);
    if (App.controller.sceneCurrent !== sceneIndex) {
        App.controller.sceneCurrent = sceneIndex;
        App.refreshCurrentScene();
    }
};

App.goHome = function () {
    var me = 'App.goHome';
    App.goToScene(0);
};

App.refreshCurrentScene = function () {
    var me = 'App.refreshCurrentScene';
    App.controller.shownDescriptions = 0;
    App.renderProgress();

    App.preRenderScene( function () {
        App.renderScene( function () {
            // auto-highlight first
            if (App.autoHighlight) {
                App.highlightElementInScene(App.controller.shownDescriptions);
            }
            App.postRenderScene();
        });
    });
};

App.preRenderScene = function (callback) {
    var elementCount = 0;
    $('.fade').removeClass('in');
    $('.animates-in-canvas').each(function(i) {
        var el = $(this);
        setTimeout(function(){
            el.addClass('offcanvasleft');
        },200*i);
        elementCount++;
    });
    setTimeout(function(){
        callback();
    },250*(elementCount+1));
};

App.renderScene = function (callback) {
    var me = 'App.renderScene';
    var scene = App.scenes[App.controller.sceneCurrent];
    var template = "templates/default-scene.html";
    if (scene.template) {
        template = "templates/" + scene.template;
    }

    dust.render(template, scene, function(err, out) {
        if (err) {
            console.warn(me + ':: dust rendering failed: ' + err.message);
            return;
        }
        App.controller.presentationCanvas.html(out);
        callback();
     });
};

App._postRenderTimeout = null;
App.postRenderScene = function () {
    if (App._postRenderTimeout) {
        clearTimeout(App._postRenderTimeout);
    }
    App._postRenderTimeout = setTimeout( function () {
        $('.fade').addClass('in');
        $('.animates-in-canvas').each(function(i) {
            var el = $(this);
            setTimeout(function(){
                el.removeClass('offcanvasright');
            },200*i);

        });
    }, 400); // timeout to give the images some time to load
};

App.renderProgress = function () {
    var me = 'App.renderProgress';
    var percentage = App.controller.sceneCurrent / (App.controller.sceneTotal-1) * 100;
    dust.render("templates/timeline.html", {'percentage':percentage}, function(err, out) {
        if (err) {
            console.warn(me + ':: dust rendering failed: ' + err.message);
            return;
        }
        App.controller.timelineCanvas.html(out);
     });
};



// SCENEPICKER
App.showScenePicker = function () {
    var me = 'App.showScenePicker';
    var template = 'templates/scene-picker.html';
    dust.render(template, {"scenes": App.scenes}, function(err, out) {
        if (err) {
            console.warn(me + ':: dust rendering failed: ' + err.message);
            return;
        }
        App.controller.scenePickerCanvas.html(out);
        $('a[href="#go-to-scene"]').on('click', function (e) {
            e.preventDefault();
            var sceneIndex = $(this).data('scene-index');
            App.controller.scenePickerCanvas.html('');
            App.goToScene(sceneIndex);
        });
     });
};


// This is just for fun: appends all the different elements with images found in the complete slideshow
App.appendAllSceneItems = function () {
    for (var i = App.scenes.length - 1; i >= 0; i--) {
        App.appendSceneItems(App.scenes[i], function () {
            App.postRenderScene();
        });
    }
};
App.appendSceneItems = function (scene, callback) {
    var me = 'App.renderScene';
    var template = "templates/scene-items-only.html";

    dust.render(template, scene, function(err, out) {
        if (err) {
            console.warn(me + ':: dust rendering failed: ' + err.message);
            return;
        }
        App.controller.presentationCanvas.append(out);
        callback();
     });
};