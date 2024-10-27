import {LightningElement, wire, track} from 'lwc';
import { CurrentPageReference } from "lightning/navigation";
import getInvoiceData from '@salesforce/apex/CreateInvoiceController.getInvoiceData';
export default class InvoiceURLParams extends LightningElement {
  @wire(CurrentPageReference)
  currentPageRef;
 


  // Retrieve values from the URL state
  get originRecord() {
    return this.currentPageRef?.state?.c__origin_record || '';
  }

  get account() {
    return this.currentPageRef?.state?.c__account || '';
  }

  get invoiceDate() {
    return this.currentPageRef?.state?.c__invoice_date || '';
  }

  get invoiceDueDate() {
    return this.currentPageRef?.state?.c__invoice_due_date || '';
  }

  get childRelationshipName() {
    return this.currentPageRef?.state?.c__child_relationship_name || '';
  }

  get lineItemDescription() {
    return this.currentPageRef?.state?.c__line_item_description || '';
  }

  get lineItemQuantity() {
    return this.currentPageRef?.state?.c__line_item_quantity || '';
  }

  get lineItemUnitPrice() {
    return this.currentPageRef?.state?.c__line_item_unit_price || '';
  }
  
    @track invoices;
    @track error;

    @wire(getInvoiceData, { accountId: $account }) // Replace with dynamic ID as needed
    wiredInvoices({ error, data }) {
        if (data) {
          console.log(json.stringify(data));
            this.invoices = data;  // If data is returned, store it in 'invoices'
            this.error = undefined; // Clear any previous errors
        } else if (error) {
            this.error = error; // If there’s an error, store it in 'error'
            this.invoices = undefined; // Clear previous data
        }
    }
}

