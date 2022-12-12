import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Co2EmissionMethodeInfoFetch, DxrCo2EmissionMethodeListFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { TypeWiseWaste, DxrWasteItemDef, WasteTypeDef, CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { map, shareReplay } from 'rxjs/operators';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-add-methode-popup',
    templateUrl: './add-methode-popup.component.html',
    styleUrls: ['./add-methode-popup.component.css']
})
export class AddMethodePopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<AddMethodePopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private utilService: UtilService, private languageService: LanguageService) { }
    methodeInfo!: Co2EmissionMethodeInfoFetch;
    wasteItemInfo: DxrWasteItemDef = {
        wasteId: "",
        wasteTitle: "",
        wasteCode: "",
        unitDef: "",
        wasteShape: "",
        wastePackage: "",
        remarks: "",
        wasteTypeId: "",
        dumperCo2EmissionMethodeList: [],
        dumperCo2EmissionDefaultMethodeId: "",
        processorCo2EmissionMethodeList: [],
        processorCo2EmissionDefaultMethodeId: "",
        isNew: ""

    };
    componentCode: string = AppConstant.COMP.ADD_METHODE_POPUP;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.methodeInfo = this.data.methode;
        this.wasteItemInfo = this.data.wasteInfo;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.ADD_METHODE_POPUP, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        co2Emission: "Co2 Emission(per",
        addMethodeType: "Add Methode Type",
        methodeTitle: "Methode Title",
        description: "Description",
        closeBtn: "Close",
        addBtn: "Add"
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    onClick(methodeInfo: Co2EmissionMethodeInfoFetch) {

        if (methodeInfo.methodeId == "") {
            methodeInfo.methodeId = this.utilService.generateUniqueId();
        }
        this.dialogRef.close(methodeInfo);

    }

}
