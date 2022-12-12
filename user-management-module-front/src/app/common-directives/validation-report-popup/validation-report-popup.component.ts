import { Component, Inject, Input, OnInit } from '@angular/core';
import { ValidationReport } from 'src/app/models/view/validation-models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Component({
    selector: 'app-validation-report-popup',
    templateUrl: './validation-report-popup.component.html',
    styleUrls: ['./validation-report-popup.component.css']
})
export class ValidationReportPopupComponent implements OnInit {

    validationReport!: ValidationReport;

    constructor(@Inject(MAT_DIALOG_DATA) public data: ValidationReport, private breakpointObserver: BreakpointObserver, public languageService: LanguageService) { }

    ngOnInit(): void {

        this.validationReport = this.data;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VALIDATION_POPUP, AppConstant.UI_LABEL_TEXT);
    // uiLabels = {
    //     validationReportTitle: "Please Provide Correct Information",
    //     validationMessage: "Message",
    //     validationSimpaleValue: "Sample Value"
    // }

}
