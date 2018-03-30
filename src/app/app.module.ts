import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { InvoiceMain } from './Invoice/invoice.component';

import { InvoiceService } from './InvoiceService/invoice.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent , InvoiceMain ],
  providers: [ InvoiceService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
