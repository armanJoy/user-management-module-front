import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-action-confirmation-popup',
    templateUrl: './action-confirmation-popup.component.html',
    styleUrls: ['./action-confirmation-popup.component.css']
})
export class ActionConfirmationPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {

    }

}
