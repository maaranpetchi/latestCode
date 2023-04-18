import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent {
  showDetail = false;
  showGeneratedinvoice = false;
  showConfirminvoice = false;

  toggle(component: string) {
    // Set the visibility of the selected component to true
    // and the visibility of the other components to false
    switch (component) {
      case 'detail':
        this.showDetail = true;
        this.showGeneratedinvoice = false;
        this.showConfirminvoice = false;
        break;
      case 'generatedinvoice':
        this.showDetail = false;
        this.showGeneratedinvoice = true;
        this.showConfirminvoice = false;
        break;
      case 'confirminvoice':
        this.showDetail = false;
        this.showGeneratedinvoice = false;
        this.showConfirminvoice = true;
        break;
    }
  }
}
