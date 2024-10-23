import { LightningElement } from 'lwc';

export default class InvoiceURLParams extends LightningElement {
    urlParams = [];

    connectedCallback() {
        this.extractURLParams();
    }

    extractURLParams() {
        const queryParams = new URLSearchParams(window.location.search);

        queryParams.forEach((value, key) => {
            this.urlParams = [...this.urlParams, { key, value }];
        });
    }
}
