sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"dorimon/util/service"
], function(Controller, MessageBox, MessageToast, Service){
	return Controller.extend("dorimon.controller.Main",{
		onInit: function(){
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				"vendor": {
							    "companyName": "SAP",
							    "contactPerson": "Sakshi",
							    "firstName": "Anjali",
							    "lastName": "Kumari",
							    "website": "www.sap.com",
							    "email": "anjali@sap.com",
							    "status": "A",
							    "regDate": new Date()
							},
				"vendorTab": []			
			});
			this.getView().setModel(oModel);
			this.fetchAndLoadData();
		},
		fetchAndLoadData: function(){
			//Step 1: get the local model access
			var oModel = this.getView().getModel();
			//Step 2: call microservice to load all vendors
			Service.callService("/vendor","GET").then(function(data){
				oModel.setProperty("/vendorTab", data);
				MessageToast.show(data.length.toString() + " Records were loaded");
			}).catch(function(oError){
				MessageBox.error("Data fetch failed");
			});
			
			
		},
		onDelete: function(){
			

//                       var oModel = this.getView().getModel();
//                       var that = this;
//						var data = oModel.getProperty("/vendorTab");
//						var oTable = this.byId("idcorrelationData");
//
//						var sItems = oTable.getSelectedItems();
//						
//						if (sItems.length == 0) {
//							alert("Please Select a row to Delete");
//							return;
//						} else {
//									
//            	      for ( var i = sItems.length - 1; i >= 0; i--) {
//									path = sItems[i].getBindingContext().getPath();
//									var idx = parseInt(path.substring(path.lastIndexOf('/') + 1));								
//									data.splice(idx, 1);
//														
//								}
//								
//						   oModel.setProperty("/VendorTab",data);
//						   //Step 2: Use the service class object to POST Data
//			Service.callService("/vendor", "DELETE", payload)
//			//Step 3: We will display message to user
//			.then(function(){
//				MessageBox.confirm("Your Vendor is now deleted");
//				that.fetchAndLoadData().bind(that);
//			})
//							}
//							oTable.removeSelections();
// 
            
			
		},
		onSave: function(){
			//Step 1: Access the data from the model - whatever changes user did
			//        will reflect inside model from UI
			var oModel = this.getView().getModel();
			
			var payload = oModel.getProperty("/vendor");
			var that = this;
			//Step 2: Use the service class object to POST Data
			Service.callService("/vendor", "POST", payload)
			//Step 3: We will display message to user
			.then(function(){
				MessageBox.confirm("Your Vendor is now saved");
				that.fetchAndLoadData().bind(that);
			})
			.catch(function(){
				MessageBox.error("The vendor creation failed");
			});
			
			
			
			//
		}
	});
});