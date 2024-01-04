import { LightningElement, api, wire } from 'lwc';
import getAccount from '@salesforce/apex/EDRDAccountLookupController.getAccount';
export default class CustomObjectForm extends LightningElement {
    @api accountPHN = '';
    @api patientPHN;
    @api accountName;
    @api messageResult=false;
    @api showsearchedvalues=false;
    @api showRemoveButton=false;
    @api accountList = [];
    @api Birthdate;
    @api Name;
    @api AccountId;
    @api street;
    @api city;
    @api Country;
    @api state;
    @api Zipcode;
    @api PostalCode;
    handlekeychange(event) {
            this.accountPHN = event.currentTarget.value; 
           }
    handleSearch() {
            if(!this.accountPHN) {
                this.messageResult = true;
                this.accountList = undefined;
                return;
            }
            getAccount({actPHN : this.accountPHN})
            .then(result => {
                this.accountList = result;
                this.Birthdate = result[0].PersonContact.Birthdate;
                this.Name = result[0].Name;
                this.AccountId = result[0].Id;
                this.showRemoveButton=true;
                this.messageResult = false;
            })
            .catch(error => {
                this.accountList = undefined;
                this.messageResult = true;
                if(error) {
                    if (Array.isArray(error.body)) {
                        this.errorMsg = error.body.map(e => e.message).join(', ');
                    } else if (typeof error.body.message === 'string') {
                        this.errorMsg = error.body.message;
                    }
                }
            }) 
        }
        handleRemoveResults(){
        this.accountList = [];
        this.Birthdate = '';
        this.Name = '';
        this.AccountId = '';
        this.accountPHN = '';
        this.patientPHN = '';
        this.showRemoveButton=false;
        this.messageResult = false;
        }
    }