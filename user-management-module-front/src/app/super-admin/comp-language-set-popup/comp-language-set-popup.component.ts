import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { DxrLanguageDef, DxrLanguageDefBack, LanguageDefinition } from 'src/app/models/language-def';
import { LanguageSetupService } from 'src/app/services/operation-services/language-setup.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LangDefButtonComponent } from 'src/app/common-directives/lang-def-button/lang-def-button.component';
import { LanguageDefAddPopupComponent } from '../language-def-add-popup/language-def-add-popup.component';
@Component({
    selector: 'app-comp-language-set-popup',
    templateUrl: './comp-language-set-popup.component.html',
    styleUrls: ['./comp-language-set-popup.component.css']
})
export class CompLanguageSetPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, public dialogRef: MatDialogRef<CompLanguageSetPopupComponent>, @Inject(MAT_DIALOG_DATA) public componentCode: string, private languageService: LanguageService, public languageSetupService: LanguageSetupService) { }
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
    saveIntoDatabase() {

        var parsedLanguageDef = JSON.stringify(this.componentList);
        this.languageSetupService.updateLanguageDef(parsedLanguageDef).subscribe((data) => {
            if (data) {
                if (confirm('Page will reload')) {
                    window.location.assign('/');
                } else {

                }
            }

        })
    }
    popupOpenForAddLabel(langArray: any[]) {

        var message: string = "Add Label"
        const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
            width: '70%',
            data: message
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                langArray.unshift(data);
            }
        });
    }
    popupOpenForAddMessage(langArray: any[]) {

        var message: string = "Add Message"
        const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
            width: '70%',
            data: message
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                langArray.unshift(data);
            }
        });
    }
    popupOpenForAddNotification(langArray: any[]) {

        var message: string = "Add Notification"
        const dialogRef = this.dialog.open(LanguageDefAddPopupComponent, {
            width: '70%',
            data: message
        });
        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                langArray.unshift(data);
            }
        });
    }
    // closePopup(): void {
    //     AppComponent.PopupControler.close();
    // }
    // mousedown(e: MouseEvent) {
    //     AppComponent.PopupControler.StartDragAt(e.x, e.y);
    // }
    // dragging(e: DragEvent): void {
    //     e.preventDefault;
    //     if (e.x > 0 && e.y > 0)
    //         AppComponent.PopupControler.moveTo(e.clientX, e.clientY);

    // }

}
