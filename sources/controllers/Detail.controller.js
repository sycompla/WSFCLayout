sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/f/library'
], function (Controller, fioriLibrary) {
    "use strict";

    return Controller.extend("sources.controllers.Master", {
        onInit: function (evt) {

        },

        onListItemPress: function () {
            var oFCL = this.oView.getParent().getParent();

            oFCL.setLayout(fioriLibrary.LayoutType.ThreeColumnsMidExpanded);
        }
    });
});
