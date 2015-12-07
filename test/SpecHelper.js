/**
 * specHelper.js
 *
 * Set up template handling for Jasmine
 */
define([
    'marionette', 'handlebars'
], function(Marionette, Handlebars) {

    // Override TemplateCache.loadTemplate to retrieve not from DOM but from remote source
    Marionette.TemplateCache.prototype.loadTemplate = function (templateId) {
        var template;
        $.ajax({
            url: './app/templates/' + templateId + '.handlebars',
            async: false,
            dataType: "text"
        }).done(function (data, textStatus, jqXHR) {
            template = data;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            throw errorThrown;
        });
        return template;
    };

    // Override TemplateCache.compileTemplate to use Handlebars instead of Underscore
    Marionette.TemplateCache.prototype.compileTemplate = function (template) {
        return Handlebars.compile(template);
    };
});
