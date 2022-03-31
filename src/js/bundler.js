"use strict";

var tabs_layout = require("./layout/tabs.js");
var plotly_object = require("./other/plotly_object.js");
var toast = require("./messages/toast.js");
var indicator = require("./messages/indicator.js");
var overlay = require("./messages/overlay.js");

exports.TabsLayout = tabs_layout.TabsLayout;
exports.PlotlyObject = plotly_object.PlotlyObject;
exports.Toast = toast.Toast;
exports.Indicator = indicator.Indicator;
exports.Overlay = overlay.Overlay;

// Helper functions
exports.show_overlay = function(content){ new overlay.Overlay().show(content); }
exports.hide_overlay = function(content){ new overlay.Overlay().hide(); }
exports.show_toast   = function(toast_class, text){ new toast.Toast().show(toast_class, text); }
