import { Component, OnInit } from '@angular/core';
import { ValidationSampleValidator } from './validation-sample-validator';
import { MatDialog } from '@angular/material/dialog';
import { InvalidMessageComponent } from './invalid-message/invalid-message.component';

export interface SampleModel {
    userName: String,
    age: Number,
    zipCode: String,
    email: String,
    contactNo: String
}

@Component({
    selector: 'app-validation-sample',
    templateUrl: './validation-sample.component.html',
    styleUrls: ['./validation-sample.component.css']
})
export class ValidationSampleComponent implements OnInit {
    // private commonUtilService: CommonUtilService
    mailCheckRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    constructor(private validationSampleValidator: ValidationSampleValidator, private matDialog: MatDialog) { }

    uiLabels = {
        pageHeader: 'Add FAQ',
        userNameLabel: 'User Name',
        emailLabel: 'Email',
        zipCodeLabel: 'Zip Code',
        contactNoLabel: 'Contact No',
        ageLabel: 'Age',
        addBtn: 'Add',
        updateBtn: 'Update',
        cancelBtn: 'Cancel'

    }

    ngOnInit(): void {
        var checkResult = this.checkRegex(this.mailCheckRegex, 'joy2022@gmail.com');
    }

    formModel: SampleModel = {
        userName: 'user 1904',
        age: 37,
        zipCode: '121-64259',
        email: 'user@gmailcom',
        contactNo: '+012345678944'
    };

    submit() {
        var validatorReport = this.validationSampleValidator.sampleFormValidator(this.formModel);
        const dialogRef = this.matDialog.open(InvalidMessageComponent, {
            width: '1400px',
            // height: '1000px',
            data: validatorReport
        });
    }
    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }

}
