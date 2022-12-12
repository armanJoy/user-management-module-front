import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageDefinition, AddLangDefComponentView } from 'src/app/models/language-def';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageAlertPopupComponent } from '../language-alert-popup/language-alert-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-language-setup-popup',
    templateUrl: './language-setup-popup.component.html',
    styleUrls: ['./language-setup-popup.component.css']
})
export class LanguageSetupPopupComponent implements OnInit {
    // languageInformation!: LanguageDefinition;
    constructor(@Inject(MAT_DIALOG_DATA) public data: AddLangDefComponentView, private breakpointObserver: BreakpointObserver, public sampleDialog: MatDialogRef<LanguageSetupPopupComponent>, public dialog: MatDialog, private languageService: LanguageService) { }


    languageInformation: LanguageDefinition = {
        componentCode: "",
        componentName: "",
        labels: [],
        messages: [],
        notifications: []
    }

    labels: any = '';
    messages: any = '';
    notifications: any = '';

    ngOnInit(): void {
        this.languageInformation = this.data.languageInformation;
        this.labels = JSON.stringify(this.languageInformation.labels);
        this.messages = JSON.stringify(this.languageInformation.messages);
        this.notifications = JSON.stringify(this.languageInformation.notifications);

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    messageDiolog(): void {
        const sampleDialog = this.dialog.open(LanguageAlertPopupComponent, {
            width: '500px',

        });
    }
    jsonCorrect = true;
    updateData() {

        try {

            if (JSON.parse(this.labels)) {
                this.languageInformation.labels = JSON.parse(this.labels);
                if (JSON.parse(this.messages)) {
                    this.languageInformation.messages = JSON.parse(this.messages);
                    if (JSON.parse(this.notifications)) {
                        this.languageInformation.notifications = JSON.parse(this.notifications);
                        this.jsonCorrect = true;
                        // this.sampleDialog.close();
                    }
                }
            }

        } catch (error) {
            // this.messageDiolog();
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            if (!this.data.isAdd) {
                this.sampleDialog.close();
            }
            else {
                this.languageInformation.labels = JSON.parse(this.labels);
                this.languageInformation.messages = JSON.parse(this.messages);
                this.languageInformation.notifications = JSON.parse(this.notifications);
                this.sampleDialog.close(this.languageInformation);

            }
        }

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.LANGUAGESETUP, AppConstant.UI_LABEL_TEXT);

}
