"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var invoice_service_1 = require("../InvoiceService/invoice.service");
var InvoiceMain = (function () {
    //initializing property values
    function InvoiceMain(_invoiceService) {
        this._invoiceService = _invoiceService;
        this.subTotal = 0;
        this.taxPerc = this._invoiceService.serviceTaxPerc; //setting percent tax via the service
        this.taxDoll = 0;
        this.taxDisabled = true;
        this.totalDue = 0;
    }
    //add td to invoice table
    InvoiceMain.prototype.addInvoice = function () {
        this._invoiceService._serviceAddInvoice(); //adding line item via a method from the service
        this.subTotal = this._invoiceService.serviceSubTotal; //setting sub total value from service
        this.taxDoll = Number((this.subTotal * (this.taxPerc / 100)).toFixed(2)); //setting-updating tax dollar amount and limiting to two decimal places
        this.totalDue = this.subTotal + this.taxDoll; //setting total amount
        this.taxDisabled = false; //boolean to restrict tax percent before the first line item
    };
    //updating tax percentage on key up
    InvoiceMain.prototype.updateTaxPerc = function (taxValue) {
        this.taxPerc = taxValue; //updating tax percent from user input
        this.taxDoll = Number((this.subTotal * (this.taxPerc / 100)).toFixed(2));
        this.totalDue = this.subTotal + this.taxDoll;
    };
    //when modal opens, set focus on the description input for the users convenience
    InvoiceMain.prototype.focusOnDescr = function () {
        var input = document.getElementById('inp_descr');
        setTimeout(function () { input.focus(); }, 500);
    };
    return InvoiceMain;
}());
InvoiceMain = __decorate([
    core_1.Component({
        selector: 'inv-main',
        templateUrl: 'app/Invoice/invoice.component.html',
        styleUrls: ['app/Invoice/invoice.component.css']
    }),
    __metadata("design:paramtypes", [invoice_service_1.InvoiceService])
], InvoiceMain);
exports.InvoiceMain = InvoiceMain;
//# sourceMappingURL=invoice.component.js.map