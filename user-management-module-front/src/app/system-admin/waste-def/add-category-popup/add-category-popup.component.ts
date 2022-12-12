import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-add-category-popup',
    templateUrl: './add-category-popup.component.html',
    styleUrls: ['./add-category-popup.component.css']
})
export class AddCategoryPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) private data: CategoryDef, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<AddCategoryPopupComponent>, private matDialog: MatDialog, private languageService: LanguageService, private wasteDefService: WasteDefService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CATEGORY_FORM;
        if (this.data && this.data.categoryId) {
            this.newCategory = Object.assign({}, this.data);
        }

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    newCategory: CategoryDef = {
        categoryId: '',
        categoryTitle: '',
        categoryCode: '',
        remarks: ''
    }

    saveWasteCategory() {
        var validationReport = this.wasteDefService.wasteCategoryFormValidator(this.newCategory);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.dialogRef.close(this.newCategory);
        }
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.CATEGORY_FORM, AppConstant.UI_LABEL_TEXT);

    // uiLabels: any = {
    //     "addPageHeader": 'Add Waste Category',
    //     "updatePageHeader": 'Update Waste Category',
    //     "wasteCategoryTitle": 'Waste Category',
    //     "wasteCategoryCode": 'Category Code',
    //     'wasteCategoryRemark': 'Remark',
    //     "addBtn": 'Save',
    //     "updateBtn": 'Update',
    //     "cancelBtn": 'Cancel'
    // }
}
