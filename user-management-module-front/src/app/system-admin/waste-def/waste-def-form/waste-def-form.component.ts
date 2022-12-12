import { Component, Inject, OnInit } from '@angular/core';
import { TypeWiseWaste, WasteTypeDef, DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
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
    selector: 'app-waste-def-form',
    templateUrl: './waste-def-form.component.html',
    styleUrls: ['./waste-def-form.component.css']
})
export class WasteDefFormComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<WasteDefFormComponent>, private matDialog: MatDialog, private languageService: LanguageService, private wasteDefService: WasteDefService, private utilService: UtilService) { }

    uiLabels: any = {
        "addPageHeader": 'Add Waste Item',
        "updatePageHeader": 'Update Waste Item',
        "wasteItemTitle": 'Waste Item',
        "wasteItemCode": 'Item Code',
        "wasteItemUnit": 'Waste Unit',
        "wasteItemShape": 'Waste Shape',
        "wasteItemPackage": 'Waste Package',
        'wasteItemRemark': 'Remark',
        "addBtn": 'Save',
        "updateBtn": 'Update',
        "cancelBtn": 'Cancel'
    }

    newWasteItem: DxrWasteItemDef = {
        wasteId: '',
        wasteTitle: '',
        wasteCode: '',
        unitDef: '',
        wasteShape: '',
        wastePackage: '',
        remarks: '',
        wasteTypeId: '',
        dumperCo2EmissionMethodeList: [],
        dumperCo2EmissionDefaultMethodeId: "",
        processorCo2EmissionMethodeList: [],
        processorCo2EmissionDefaultMethodeId: "",
        isNew: ""
    }
    selecteWasteType: WasteTypeDef = {} as WasteTypeDef;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_ITEM_FORM;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_ITEM_FORM, AppConstant.UI_LABEL_TEXT);

        if (this.data) {
            if (this.data.selecteWasteType) {
                this.selecteWasteType = Object.assign({}, this.data.selecteWasteType);
            }
            if (this.data.selectedWasteItem) {
                this.newWasteItem = Object.assign({}, this.data.selectedWasteItem);
            }

        }
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    saveWasteItem() {
        var validationReport = this.wasteDefService.wasteItemFormValidator(this.newWasteItem);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        } else {
            this.dialogRef.close(this.newWasteItem);
        }
    }

}
