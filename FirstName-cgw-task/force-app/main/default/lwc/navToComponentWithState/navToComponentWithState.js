import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';

// Import the necessary fields
import ACCOUNT_ID from '@salesforce/schema/Opportunity.AccountId';

export default class NavToComponentWithState extends NavigationMixin(LightningElement) {
  @api recordId;
  lineItemUnitPrice = 100;
  lineItemQuantity = 2;
  lineItemDescription = 'Test';
  childRelationshipName = 'Line_Items__r';
  invoiceDueDate = '2024-10-16';
  invoiceDate = '2024-10-25';
 // accountId; -- not needed

  // Add all the fields you need to retrieve
  fields = [ACCOUNT_ID];
  
  // Use wire to get the record
  @wire(getRecord, { recordId: '$recordId', fields: '$fields' })
  accountRecord;

  // Getter to retrieve the AccountId
  get accountId() {
    return this.accountRecord?.data?.fields?.AccountId?.value || '';
  }

  // Method to navigate with state
  navigateToComponent() {
    this[NavigationMixin.Navigate]({
      // Pass in pageReference
      type: "standard__component",
      attributes: {
        componentName: "c__invoiceURLParams",
      },
      state: {
        c__origin_record: this.recordId,
        c__account: this.accountId,
        c__invoice_date: this.invoiceDate,
        c__invoice_due_date: this.invoiceDueDate,
        c__child_relationship_name: this.childRelationshipName,
        c__line_item_description: this.lineItemDescription,
        c__line_item_quantity: this.lineItemQuantity,
        c__line_item_unit_price: this.lineItemUnitPrice
      },
    });
  }
}