import { Component, OnInit, Inject } from '@angular/core';
import { CompanySettingsOperationService, } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WasteItemDef, WasteItemSetMethode } from 'src/app/models/backend-fetch/company-settings-fetch';
import { DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
import { Co2EmissionMethodeInfoFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
@Component({
    selector: 'app-set-methode-popup',
    templateUrl: './set-methode-popup.component.html',
    styleUrls: ['./set-methode-popup.component.css']
})
export class SetMethodePopupComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<SetMethodePopupComponent>, public dialog: MatDialog, private companySettingsOperationService: CompanySettingsOperationService, @Inject(MAT_DIALOG_DATA) public data: any, private utilService: UtilService, private wasteDefService: WasteDefService, private languageService: LanguageService) { }
    dxrwasteItemMethode!: DxrWasteItemDef;
    isDumpingMethode!: boolean;
    wasteItemSetMethode: WasteItemSetMethode = {
        wasteItemSetMethodeId: "",
        wasteItemId: "",
        companyId: "",
        dumpingMethode: {
            methodeId: "",
            methodeTitle: "",
            description: "",
            emissionQuantityPerUnit: 0,
            emimissionType: {
                emimissionTypeId: "",
                emimissionTypeName: ""

            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false
        },
        processingMethode: {
            methodeId: "",
            methodeTitle: "",
            description: "",
            emissionQuantityPerUnit: 0,
            emimissionType: {
                emimissionTypeId: "",
                emimissionTypeName: ""

            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false
        }
    };
    viewContent: boolean = false;
    componentCode: string = AppConstant.COMP.Set_Methode_Popup_Component;
    isSystemAdmin: boolean = false;
    uiLabels: any = {
        methodeSelectionPopup: "Methode Selection Popup",
        selectDumpingMethode: "Select Dumping Methode",
        selectProcessingMethode: "Select Processing Methode",
        methodeName: "Methode Name",
        emissionQuantity: "Emission Quantity"
    }
    ngOnInit(): void {
        // this.prepareData();
        this.wasteDefService.getWasteItemWiseMethodeList(this.data.companyWasteInfo.dxrWasteItemId).subscribe(data => {

            if (data) {
                this.dxrwasteItemMethode = data;
                // this.wasteItemMethode = data;
                // this.wasteItemMethode.dumperCo2EmissionDefaultMethodeId = this.data.methode.dumpingMethode.methodeId;
                // this.wasteItemMethode.processorCo2EmissionDefaultMethodeId = this.data.methode.processingMethode.methodeId;

            }

            this.prepareData();

        });
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Set_Methode_Popup_Component, AppConstant.UI_LABEL_TEXT);

    }

    prepareData() {

        this.isDumpingMethode = this.data.isDumper;
        this.wasteItemSetMethode = this.data.methode;

        if (this.isDumpingMethode) {
            if (this.wasteItemSetMethode && this.wasteItemSetMethode.dumpingMethode && this.wasteItemSetMethode.dumpingMethode.methodeId) {
                this.dxrwasteItemMethode.dumperCo2EmissionDefaultMethodeId = this.wasteItemSetMethode.dumpingMethode.methodeId;
                this.selectedItem = this.wasteItemSetMethode.dumpingMethode;
            }

            if (this.dxrwasteItemMethode && this.dxrwasteItemMethode.dumperCo2EmissionMethodeList) {
                this.dxrwasteItemMethode.dumperCo2EmissionMethodeList.forEach(item => {
                    if (this.wasteItemSetMethode.dumpingMethode && this.wasteItemSetMethode.dumpingMethode.methodeId == item.methodeId) {
                        item.emissionQuantityPerUnit = this.wasteItemSetMethode.dumpingMethode.emissionQuantityPerUnit;
                    }
                });
            }

        } else {
            if (this.wasteItemSetMethode && this.wasteItemSetMethode.processingMethode && this.wasteItemSetMethode.processingMethode.methodeId) {
                this.dxrwasteItemMethode.processorCo2EmissionDefaultMethodeId = this.wasteItemSetMethode.processingMethode.methodeId;
                this.selectedItem = this.wasteItemSetMethode.processingMethode;
            }

            if (this.dxrwasteItemMethode && this.dxrwasteItemMethode.processorCo2EmissionMethodeList) {
                this.dxrwasteItemMethode.processorCo2EmissionMethodeList.forEach(item => {
                    if (this.wasteItemSetMethode.processingMethode && this.wasteItemSetMethode.processingMethode.methodeId == item.methodeId) {
                        item.emissionQuantityPerUnit = this.wasteItemSetMethode.processingMethode.emissionQuantityPerUnit;
                    }
                });
            }
        }




        this.viewContent = true;
    }
    onClickAddBtn() {

        this.selectListItem(this.selectedItem)
        this.dialogRef.close(this.wasteItemSetMethode);

    }
    selectedItem: any;
    selectListItem(item: Co2EmissionMethodeInfoFetch) {

        this.selectedItem = item;
        this.wasteItemSetMethode.companyId = this.utilService.getCompanyIdCookie();
        // this.wasteItemSetMethode.wasteItemId = this.dxrwasteItemMethode.wasteId;
        // if (this.wasteItemSetMethode && !this.wasteItemSetMethode.wasteItemSetMethodeId) {
        this.wasteItemSetMethode.wasteItemSetMethodeId = this.utilService.generateUniqueId();
        // }
        if (this.isDumpingMethode) {
            this.wasteItemSetMethode.dumpingMethode = item;
            this.dxrwasteItemMethode.dumperCo2EmissionDefaultMethodeId = item.methodeId;
        }
        else {
            this.wasteItemSetMethode.processingMethode = item;
            this.dxrwasteItemMethode.processorCo2EmissionDefaultMethodeId = item.methodeId;
        }

    }

}
