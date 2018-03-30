import { Component } from '@angular/core';
import { InvoiceService } from '../InvoiceService/invoice.service';

@Component({
  selector: 'inv-main',
  templateUrl: 'app/Invoice/invoice.component.html',
  styleUrls: ['app/Invoice/invoice.component.css']
})

export class InvoiceMain {
  //declaring class properties
  subTotal:number;
  taxPerc:number;
  taxDoll: number;
  taxDisabled: boolean;
  totalDue: number;

  //initializing property values
  constructor(private _invoiceService:InvoiceService) {
    this.subTotal = 0;
    this.taxPerc = this._invoiceService.serviceTaxPerc;//setting percent tax via the service
    this.taxDoll = 0;
    this.taxDisabled = true;
    this.totalDue = 0;
  }

  //add td to invoice table
  addInvoice(): void {
    this._invoiceService._serviceAddInvoice();//adding line item via a method from the service
    this.subTotal = this._invoiceService.serviceSubTotal;//setting sub total value from service
    this.taxDoll = Number((this.subTotal * (this.taxPerc/100)).toFixed(2));//setting-updating tax dollar amount and limiting to two decimal places
    this.totalDue = this.subTotal + this.taxDoll;//setting total amount
    this.taxDisabled = false;//boolean to restrict tax percent before the first line item
  }

  //updating tax percentage on key up
  updateTaxPerc(taxValue:number) {
    this.taxPerc = taxValue;//updating tax percent from user input
    this.taxDoll = Number((this.subTotal * (this.taxPerc/100)).toFixed(2));
    this.totalDue = this.subTotal + this.taxDoll;
  }

  //when modal opens, set focus on the description input for the users convenience
  focusOnDescr():void {
    let input = document.getElementById('inp_descr');
    setTimeout(function(){input.focus()},500);
  }
}
