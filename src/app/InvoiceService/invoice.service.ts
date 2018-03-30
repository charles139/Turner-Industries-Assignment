import { Injectable } from '@angular/core';

@Injectable()

export class InvoiceService {

  //declaring properties to be shared with invoice component
  public tableData:Array<{ id: any , Description: string , Quantity: number , Rate: number , LineTotal: number}> = [];
  public serviceSubTotal:number = 0;
  public serviceTaxPerc:number = 10;//intitial tax percentage set to Baton Rouge, LA combined city/state rate.
  public serviceTaxDoll: number = 0;

  //function that parses the tableData object and updates the DOM
  _serviceLoadData() {
    let tbody = document.getElementById('inv_table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = "";//clears tbody so that for loop can repopulate with updated data
    //loop thru table data
    for (let data of this.tableData) {
      let tr = tbody.insertRow(data.id-1);//insert row at bottom of tbody
      let IdText = document.createTextNode(data.id);//creates text from tableData Object that is appened as td
      let DescriptionText = document.createTextNode(data.Description);
      let QuantityText = document.createTextNode(data.Quantity + " ea");
      let RateText = document.createTextNode("$" + data.Rate);
      let TotalText = document.createTextNode("$" + data.LineTotal);
      //insert td's
      let IdCell = tr.insertCell(0).appendChild(IdText);//creates new td and appends content from tableData
      let DescriptionCell = tr.insertCell(1).appendChild(DescriptionText);
      let QuantityCell = tr.insertCell(2).appendChild(QuantityText);
      let RateCell = tr.insertCell(3).appendChild(RateText);
      let TotalCell = tr.insertCell(4).appendChild(TotalText);
    }
  }

  //method that parses tableData object and sets combined line item subTotal
  _setSubTotal(): void {
    let total:number = 0;
    for (let data of this.tableData) {
      total += data.LineTotal;
    }
    this.serviceSubTotal = total;
  }

  _setTaxDollarValue(): void {
    this.serviceTaxDoll = this.serviceSubTotal * (this.serviceTaxPerc/100);
  }

  //method that the component uses to added line items to DOM
  _serviceAddInvoice() {
    //cache form inputs
    let descr = (<HTMLInputElement>document.getElementById('inp_descr'));
    let quan = (<HTMLInputElement>document.getElementById('inp_quan'));
    let rate = (<HTMLInputElement>document.getElementById('inp_rate'));

    //new invoice object
    let currentInvoice: any = {
      id: this.tableData.length + 1,
      Description: descr.value,
      Quantity: quan.value,
      Rate: rate.value,
      LineTotal: Number(quan.value) * Number(rate.value)
    }

    this.tableData.push(currentInvoice);//push new invoice to tableData object
    this._serviceLoadData();//loop thru tabledATA object and display
    this._setSubTotal();//add line item totals
    this._setTaxDollarValue();//set tax dollar value

    //clear modal invoice form
    descr.value = "";
    quan.value = "";
    rate.value = "";
  }

}
