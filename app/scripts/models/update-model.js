'use strict';

var Backbone = require('backbone');

var UpdateModel = Backbone.Model.extend({
    defaults: {
        lastSuccessCheckDate: null,
        lastCheckDate: null,
        lastVersion: null,
        lastVersionReleaseDate: null,
        lastCheckError: null,
        status: null,
        updateStatus: null,
        updateError: null
    },

    initialize: function() {
    },

    load: function() {
        if (localStorage.updateInfo) {
            try {
                var data = JSON.parse(localStorage.updateInfo);
                _.each(data, function(val, key) {
                    if (/Date$/.test(key)) {
                        data[key] = val ? new Date(val) : null;
                    }
                });
                this.set(data, { silent: true });
            } catch (e) { /* failed to load model */ }
        }
    },

    save: function() {
        var attr = _.clone(this.attributes);
        delete attr.updateStatus;
        delete attr.updateError;
        localStorage.updateInfo = JSON.stringify(attr);
    }
});

UpdateModel.instance = new UpdateModel();
UpdateModel.instance.load();

module.exports = UpdateModel;
