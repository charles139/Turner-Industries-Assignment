"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var InvoiceService = (function () {
    function InvoiceService() {
        //declaring properties to be shared with invoice component
        this.tableData = [];
        this.serviceSubTotal = 0;
        this.serviceTaxPerc = 10; //intitial tax percentage set to Baton Rouge, LA combined city/state rate.
        this.serviceTaxDoll = 0;
    }
    //function that parses the tableData object and updates the DOM
    InvoiceService.prototype._serviceLoadData = function () {
        var tbody = document.getElementById('inv_table').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ""; //clears tbody so that for loop can repopulate with updated data
        //loop thru table data
        for (var _i = 0, _a = this.tableData; _i < _a.length; _i++) {
            var data = _a[_i];
            var tr = tbody.insertRow(data.id - 1); //insert row at bottom of tbody
            var IdText = document.createTextNode(data.id); //creates text from tableData Object that is appened as td
            var DescriptionText = document.createTextNode(data.Description);
            var QuantityText = document.createTextNode(data.Quantity + " ea");
            var RateText = document.createTextNode("$" + data.Rate);
            var TotalText = document.createTextNode("$" + data.LineTotal);
            //insert td's
            var IdCell = tr.insertCell(0).appendChild(IdText); //creates new td and appends content from tableData
            var DescriptionCell = tr.insertCell(1).appendChild(DescriptionText);
            var QuantityCell = tr.insertCell(2).appendChild(QuantityText);
            var RateCell = tr.insertCell(3).appendChild(RateText);
            var TotalCell = tr.insertCell(4).appendChild(TotalText);
        }
    };
    //method that parses tableData object and sets combined line item subTotal
    InvoiceService.prototype._setSubTotal = function () {
        var total = 0;
        for (var _i = 0, _a = this.tableData; _i < _a.length; _i++) {
            var data = _a[_i];
            total += data.LineTotal;
        }
        this.serviceSubTotal = total;
    };
    InvoiceService.prototype._setTaxDollarValue = function () {
        this.serviceTaxDoll = this.serviceSubTotal * (this.serviceTaxPerc / 100);
    };
    //method that the component uses to added line items to DOM
    InvoiceService.prototype._serviceAddInvoice = function () {
        //cache form inputs
        var descr = document.getElementById('inp_descr');
        var quan = document.getElementById('inp_quan');
        var rate = document.getElementById('inp_rate');
        //new invoice object
        var currentInvoice = {
            id: this.tableData.length + 1,
            Description: descr.value,
            Quantity: quan.value,
            Rate: rate.value,
            LineTotal: Number(quan.value) * Number(rate.value)
        };
        this.tableData.push(currentInvoice); //push new invoice to tableData object
        this._serviceLoadData(); //loop thru tabledATA object and display
        this._setSubTotal(); //add line item totals
        this._setTaxDollarValue(); //set tax dollar value
        //clear modal invoice form
        descr.value = "";
        quan.value = "";
        rate.value = "";
    };
    return InvoiceService;
}());
InvoiceService = __decorate([
    core_1.Injectable()
], InvoiceService);
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map