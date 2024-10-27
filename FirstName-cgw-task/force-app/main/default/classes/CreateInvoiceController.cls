public with sharing class CreateInvoiceController {
    @AuraEnabled
    public static list<Invoice__c> getInvoiceData(String accountId){
        try {
            list<invoice__C> invoiceRecord = [select Due_Date__c, Invoice_Date__c, 
              (select Invoice__c, Desccription__c, Quantity__c, Unit_Price__c from Line_Items__r)
               from invoice__c where Account__c=:accountId ];
            if (invoiceRecord.size()>0){
                return invoiceRecord;
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}