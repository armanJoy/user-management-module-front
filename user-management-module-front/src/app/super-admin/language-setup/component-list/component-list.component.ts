import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrLanguageDef, DxrLanguageDefBack, LanguageDefinition, AddLangDefComponentView } from 'src/app/models/language-def';
import { LanguageSetupService } from 'src/app/services/operation-services/language-setup.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { LanguageSetupPopupComponent } from '../language-setup-popup/language-setup-popup.component';

@Component({
    selector: 'app-component-list',
    templateUrl: './component-list.component.html',
    styleUrls: ['./component-list.component.css']
})
export class ComponentListComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, public languageSetupService: LanguageSetupService, public dialog: MatDialog, private languageService: LanguageService) { }

    languageInfo!: DxrLanguageDef;
    componentList: LanguageDefinition[] = [];

    ngOnInit(): void {

        this.languageSetupService.getLanguageDef((component: DxrLanguageDefBack) => {

            if (component) {
                this.languageInfo = this.convertLanguageDefBackToFront(component);
                this.componentList = this.languageInfo.languageJson;
            }
        })

    }

    convertLanguageDefBackToFront(languageDefBack: DxrLanguageDefBack): DxrLanguageDef {
        var dxrLanguageDef: DxrLanguageDef = {
            languageCompetencyId: languageDefBack.languageCompetencyId,
            languageJson: JSON.parse(languageDefBack.languageJson),
            backendDate: languageDefBack.backendDate,
            frontendDate: languageDefBack.frontendDate,
            dxrInfoCache: languageDefBack.dxrInfoCache

        }

        return dxrLanguageDef;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any
    selectListItem(item: any): void {
        this.selectedItem = item;
    }

    openLanguageDiolog(languageInformation: LanguageDefinition, flag: boolean) {

        var popUpdata: AddLangDefComponentView = {
            languageInformation: {
                componentCode: "",
                componentName: "",
                labels: [],
                messages: [],
                notifications: []
            },
            isAdd: false
        }
        //  popUpdata.languageInformation.componentCode =JSON.stringify (languageInformation.componentCode);
        // popUpdata.languageInformation.componentName =JSON.stringify (languageInformation.componentName);
        // popUpdata.languageInformation.labels = JSON.stringify(languageInformation.labels);
        // popUpdata.languageInformation.messages = languageInformation.messages;
        // popUpdata.languageInformation.notifications = languageInformation.notifications;
        popUpdata.isAdd = flag;
        popUpdata.languageInformation = languageInformation;

        const sampleDialog = this.dialog.open(LanguageSetupPopupComponent, {
            width: '90%',
            height: '75%',
            data: popUpdata
        }
        );
        sampleDialog.afterClosed().subscribe(result => {

            if (result) {
                this.componentList.unshift(result);

            }

        });
    }

    updateLanguageJson: LanguageDefinition = {
        componentCode: "",
        componentName: "",
        labels: [],
        messages: [],
        notifications: []
    }
    addLanguageJson: LanguageDefinition = {
        componentCode: "",
        componentName: "",
        labels: [],
        messages: [],
        notifications: []
    }

    // updateLanguage(languageJson: LanguageDefinition) {
    //     this.updateLanguageJson.componentCode = languageJson.componentCode,
    //         this.updateLanguageJson.componentName = languageJson.componentName,
    //         this.updateLanguageJson.labels = languageJson.labels,
    //         this.updateLanguageJson.messages = languageJson.notifications

    // }
    saveIntoDatabase() {

        var parsedLanguageDef = JSON.stringify(this.languageInfo.languageJson);
        this.languageSetupService.updateLanguageDef(parsedLanguageDef).subscribe((data) => {
            if (data) {
                if (confirm('Page will reload')) {
                    window.location.assign('/');
                } else {

                }
            }

        })
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.COMPONENT_LIST, AppConstant.UI_LABEL_TEXT);
}
