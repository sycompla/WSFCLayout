sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox, fioriLibrary) {
	"use strict";

	return Controller.extend("sources.controllers.Master", {
		onInit: async function () {

			this.model = new sap.ui.model.json.JSONModel()
			await this.model.loadData("sources/data/static.json");

			this.productsDataSource = JSON.parse(this.model.getJSON());

			this.loadFromDataSource(this.productsDataSource)
		},
		loadFromDataSource: function(dataSource) {
			this.model.setData(dataSource);
			this.getView().setModel(this.model);
			console.log(this.getView().getModel())

		},

		onListItemPress: function (event) {
			var oFCL = this.oView.getParent().getParent();

			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
			var bindingContext = event.getSource().getBindingContext();
			var recordId = bindingContext.getProperty("threadId");
			console.log(bindingContext);

			var oView = sap.ui.getCore().byId("idDetail");
			console.log(oView)

			/* itt fogom átadni a kiválasztott sor objektumát
				a következő nézetnek, ami igy majd azt az 1
				objektumot fogja megjeleniteni részleteiben.
			 */
		}
	});
});
