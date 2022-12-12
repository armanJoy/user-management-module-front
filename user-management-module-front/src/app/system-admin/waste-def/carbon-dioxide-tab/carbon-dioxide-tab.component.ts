import { Component, OnInit, Input } from '@angular/core';
import { Co2EmissionMethodeInfoFetch, DxrCo2EmissionMethodeListFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { TypeWiseWaste, DxrWasteItemDef, WasteTypeDef, CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddMethodePopupComponent } from '../add-methode-popup/add-methode-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-carbon-dioxide-tab',
    templateUrl: './carbon-dioxide-tab.component.html',
    styleUrls: ['./carbon-dioxide-tab.component.css']
})
export class CarbonDioxideTabComponent implements OnInit {
    @Input()
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
    @Input()
    methodeList: DxrCo2EmissionMethodeListFetch = {
        dumperOperationMethodeList: [],
        processingOperationMethodeList: []
    }
    dumpingOperationMethodeInfo: Co2EmissionMethodeInfoFetch = {
        methodeId: "",
        methodeTitle: "",
        description: "",
        emissionQuantityPerUnit: 0,
        emimissionType: {
            emimissionTypeId: "emimissionTypeId001",
            emimissionTypeName: "Dumper Operation",

        },
        co2EmissionVolume: 0,
        isDefault: false,
        isCheck: false

    }

    processingOperationMethodeInfo: Co2EmissionMethodeInfoFetch = {
        methodeId: "",
        methodeTitle: "",
        description: "",
        emissionQuantityPerUnit: 0,
        emimissionType: {
            emimissionTypeId: "emimissionTypeId002",
            emimissionTypeName: "Processing Operation",

        },
        co2EmissionVolume: 0,
        isDefault: false,
        isCheck: false

    }
    filter: string = "001";
    isSystemAdmin: boolean = false;
    componentCode: string = AppConstant.COMP.CarbonDioxide_TabComponent;
    constructor(private matDialog: MatDialog, private wasteDefService: WasteDefService, private utilService: UtilService, private languageService: LanguageService) { }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CarbonDioxide_TabComponent, AppConstant.UI_LABEL_TEXT);

    }

    uiLabels: any = {
        wasteItem: "Waste Item",
        measureUnit: "Measure Unit",
        dumpingMethodeList: "Dumping Methode List",
        addMethodeBtn: "Add New Methode",
        methodeName: "Methode Title",
        emissionQuantity: "Emission Quantity",
        editBtn: "Edit",
        addBtn: "Add",
        filterBy: "Filter By",
        projessingMethodeList: "Projessing Methode List",
        selectMethodeFromList: "Select Methode From List",
        dumpingMethode: "Dumping Method",
        processingMethode: "Processing Method",
    }

    updateMethodeList(methodeInfo: Co2EmissionMethodeInfoFetch) {


        if (methodeInfo.emimissionType.emimissionTypeId == AppConstant.DUMPER_EMISSION_TYPE_METHODE_ID) {
            var index = -1;
            index = this.methodeList.dumperOperationMethodeList.findIndex(item => item.methodeId == methodeInfo.methodeId);
            if (index >= 0) {
                this.methodeList.dumperOperationMethodeList[index] = methodeInfo;
            }
            else {
                this.methodeList.dumperOperationMethodeList.unshift(methodeInfo);
            }


        }
        else if (methodeInfo.emimissionType.emimissionTypeId == AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID) {
            var index = -1;
            index = this.methodeList.processingOperationMethodeList.findIndex(item => item.methodeId == methodeInfo.methodeId);
            if (index >= 0) {
                this.methodeList.processingOperationMethodeList[index] = methodeInfo;
            }
            else {
                this.methodeList.processingOperationMethodeList.unshift(methodeInfo);
            }

        }
    }
    onClickAddMethodeBtn(methodeInfo: Co2EmissionMethodeInfoFetch) {
        const dialogRef = this.matDialog.open(AddMethodePopupComponent, {
            width: "700px",
            data: {
                methode: Object.assign({}, methodeInfo),
                wasteInfo: this.wasteItemInfo
            }
            // Object.assign({}, methodeInfo),

            // disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.wasteDefService.saveMethode(result).subscribe(data => {
                    if (data) {
                        this.updateMethodeList(data);
                    }
                })
            }
        });

    }
    onClickAddDumpingMethodeBtn() {
        var wasteItemCopy: DxrWasteItemDef = JSON.parse(JSON.stringify(this.wasteItemInfo));
        wasteItemCopy.dumperCo2EmissionMethodeList = [];
        this.methodeList.dumperOperationMethodeList.forEach(dumpingMethode => {
            if (dumpingMethode.isCheck) {

                wasteItemCopy.dumperCo2EmissionMethodeList.push(dumpingMethode);
            }

        });
        if (wasteItemCopy.dumperCo2EmissionMethodeList.length >= 0) {
            wasteItemCopy.dumperCo2EmissionDefaultMethodeId = this.methodeList.dumperOperationMethodeList[0].methodeId;
        }

        this.wasteDefService.saveWasteItemDef(wasteItemCopy).subscribe(savedData => {
            if (savedData) {
                this.wasteItemInfo = savedData;
                this.wasteItemInfo.dumperCo2EmissionDefaultMethodeId = this.wasteItemInfo.dumperCo2EmissionMethodeList[0].methodeId;
                this.resetDumpingMethodeList();
                this.utilService.showSnackbar('Dumping Methode Added for Waste item', 2000);

            }
        });

    }
    resetDumpingMethodeList() {
        this.methodeList.dumperOperationMethodeList.forEach(dumpingMethode => {
            dumpingMethode.isCheck = false;
        });
    }
    resetProcessingMethodeList() {
        this.methodeList.processingOperationMethodeList.forEach(processingMethode => {
            processingMethode.isCheck = false;
        });
    }
    onClickAddProcessingMethodeBtn() {

        var wasteItemCopy: DxrWasteItemDef = JSON.parse(JSON.stringify(this.wasteItemInfo));
        wasteItemCopy.processorCo2EmissionMethodeList = [];
        this.methodeList.processingOperationMethodeList.forEach(processingMethode => {
            if (processingMethode.isCheck) {
                wasteItemCopy.processorCo2EmissionMethodeList.push(processingMethode);
            }

        });
        if (wasteItemCopy.processorCo2EmissionMethodeList.length >= 0) {
            wasteItemCopy.processorCo2EmissionDefaultMethodeId = this.methodeList.processingOperationMethodeList[0].methodeId;
        }

        this.wasteDefService.saveWasteItemDef(wasteItemCopy).subscribe(savedData => {
            if (savedData) {
                this.wasteItemInfo = savedData;
                this.wasteItemInfo.processorCo2EmissionDefaultMethodeId = this.wasteItemInfo.processorCo2EmissionMethodeList[0].methodeId;
                this.resetProcessingMethodeList()
                this.utilService.showSnackbar('Processing Methode Added for Waste item', 3000);
            }
        });

    }
    setDefaultMethode(item: Co2EmissionMethodeInfoFetch) {
        var wasteItemCopy: DxrWasteItemDef = JSON.parse(JSON.stringify(this.wasteItemInfo));
        if (item.emimissionType.emimissionTypeId == AppConstant.DUMPER_EMISSION_TYPE_METHODE_ID) {
            wasteItemCopy.dumperCo2EmissionDefaultMethodeId = item.methodeId;
        }
        else {
            wasteItemCopy.processorCo2EmissionDefaultMethodeId = item.methodeId;
        }
        this.wasteDefService.saveWasteItemDef(wasteItemCopy).subscribe(savedData => {
            if (savedData) {
                this.wasteItemInfo = savedData;
                this.utilService.showSnackbar('You set this gasoline as Default', 3000);
            }
        });
    }
    selectedItem: any;
    selectListItem(item: Co2EmissionMethodeInfoFetch) {
        this.selectedItem = item;
        this.setDefaultMethode(item);
    }

}
