// Cache of compiled dust templates
var dust_templates = {};

/**
 * Function used internally by dustjs to load and compile the templates dynamically
 * @param  {String}   name     template path
 * @param  {Function} callback 
 */
dust.onLoad = function (name, callback) {
    if (dust_templates[name]) {
        callback(false, dust_templates[name]);
        return;
    }

    $.ajax({
        url: name + '?_=' + new Date().getTime(),
        success: function (data) {
            dust_templates[name] = data;
            callback(false, data);
        },
        error: function () {
            callback(true);
        }
    });
};