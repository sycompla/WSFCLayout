sap.ui.define(['sap/ui/core/mvc/Controller'],
    function(Controller) {
        "use strict";
        var PageController = Controller.extend("sources.controllers.view1", {
            onInit: async function (oEvent) {
/*
                let componentCardUrl = "sources/data/manifest.json",
                    homeIconUrl = sap.ui.require.toUrl("sap/ui/integration/sample/CardsLayout/images/CompanyLogo.png"),
                    date = sap.ui.core.format.DateFormat.getDateInstance({style: "long"}).format(new Date());*/

                this.model = new sap.ui.model.json.JSONModel()
                await this.model.loadData("sources/data/static.json");

                this.productsDataSource = JSON.parse(this.model.getJSON());

                this.loadFromDataSource(this.productsDataSource)
/*
                let cardManifests = new sap.ui.model.json.JSONModel();
                await cardManifests.loadData("sources/data/cardManifest.json");
                let debug = cardManifests.getData();
                console.log(debug);

                cardManifests.setData(debug);
                this.getView().setModel(cardManifests, "manifests");
                console.log(this.getView().getModel("manifests"));

                this.getView().setModel(new sap.ui.model.json.JSONModel({
                    componentCardUrl: componentCardUrl,
                    homeIconUrl: homeIconUrl,
                    date: date
                }));

*/
                this._oPnl = this.getView().byId("grid1");
            },
            loadFromDataSource: function(dataSource) {
                this.model.setData(dataSource);
                this.getView().setModel(this.model);
                console.log(this.getView().getModel());

            },
            addList: function(oModel){
                let list = new sap.m.List();

                list.setModel(oModel).bindItems("/data",
                    new sap.m.StandardListItem({
                        title: "{service}",
                        type: "Active"
                    }));
                this.getView().byId("grid1").addItem(list);
            },
            onDetailPress : function(event) {
                var bindingContext = event.getSource().getBindingContext();
                var recordId = bindingContext.getProperty("threadId");
                console.log(recordId);
            },
            addInput: function () {
                console.log("clicked")
                this.addTile("bármi")
            },
            addTile: function (title) {
                let oModel = this.model;
                let container = this.getView().byId("grid1");
                let genericTile = new sap.m.GenericTile({
                    header: title,
                    subheader: '',
                    headerImage: 'sap-icon://goal',
                    press: function() {

                        let table = new sap.m.Table({
                            id: "tableId",
                            columns:[
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "service"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "threadId"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "result"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "resultMessage"
                                        })
                                    ]
                                }),
                                new sap.m.Column({
                                    header: [
                                        new sap.m.Label({
                                            text: "resultDescription"
                                        })
                                    ]
                                })
                            ]
                        });

                        table.bindAggregation("items", {
                            path: "mainModel>/data",
                            template:  new sap.m.ColumnListItem({
                                cells:[
                                    new sap.m.Text({text:"{mainModel>service}"}),
                                    new sap.m.Text({text:"{mainModel>threadId}"}),
                                    new sap.m.Text({text:"{mainModel>result}"}),
                                    new sap.m.Text({text:"{mainModel>resultMessage}"}),
                                    new sap.m.Text({text:"{mainModel>resultDescription}"})
                                ]
                            })
                        });
                        table.setFixedLayout(false);
                        table.setModel(oModel, "mainModel");
                        /*
                        list.setModel(oModel).bindItems("/data",
                            new sap.m.StandardListItem({
                                title: "{service}",
                                type: "Active"
                            }));*/
                        container.addItem(table);
                    },
                    layoutData: new sap.f.GridContainerItemLayoutData({
                        minRows: 2,
                        columns: 2
                    })
                });
                this.getView().byId("grid1").addItem(genericTile);
            },
        })
        return PageController;
});