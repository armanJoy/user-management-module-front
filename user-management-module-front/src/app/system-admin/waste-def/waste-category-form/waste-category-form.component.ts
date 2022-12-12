import { Component, Inject, OnInit } from '@angular/core';
import { WasteTypeDef, DxrWasteItemDef, CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-waste-category-form',
    templateUrl: './waste-category-form.component.html',
    styleUrls: ['./waste-category-form.component.css']
})
export class WasteCategoryFormComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<WasteCategoryFormComponent>, private matDialog: MatDialog, private languageService: LanguageService, private wasteDefService: WasteDefService, private utilService: UtilService) { }

    uiLabels: any = {
        "addPageHeader": 'Add Waste Type',
        "updatePageHeader": 'Update Waste Type',
        "wasteCategoryTitle": 'Waste Type',
        "wasteCategoryCode": 'Type Code',
        'wasteCategoryRemark': 'Remark',
        "addBtn": 'Save',
        "updateBtn": 'Update',
        "cancelBtn": 'Cancel'
    }

    newWasteCategory: WasteTypeDef = {
        categoryId: '',
        wasteTypeId: '',
        wasteTypeTitle: '',
        wasteTypeCode: '',
        co2CoefficientValue: 0,
        remarks: ''
    }

    selectedCategory: CategoryDef = {} as CategoryDef;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_CATEGORY_FORM;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_CATEGORY_FORM, AppConstant.UI_LABEL_TEXT);

        if (this.data) {
            if (this.data.selectedCategory) {
                this.selectedCategory = Object.assign({}, this.data.selectedCategory);
            }
            if (this.data.selectedWasteType) {
                this.newWasteCategory = Object.assign({}, this.data.selectedWasteType);
            }

        }

        // if (this.data && this.data.wasteTypeId) {
        //     this.newWasteCategory = Object.assign({}, this.data);
        // }
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    saveWasteType() {
        var validationReport = this.wasteDefService.wasteTypeFormValidator(this.newWasteCategory);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.dialogRef.close(this.newWasteCategory);
        }
    }
}
