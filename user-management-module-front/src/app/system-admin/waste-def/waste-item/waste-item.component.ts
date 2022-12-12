import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeWiseWaste, DxrWasteItemDef, WasteTypeDef, CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { WasteDefFormComponent } from '../waste-def-form/waste-def-form.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { Co2EmissionMethodeInfoFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-waste-item',
    templateUrl: './waste-item.component.html',
    styleUrls: ['./waste-item.component.css']
})
export class WasteItemComponent implements OnInit {

    @Input()
    public switchToWasteCoefficientUpdateTab!: (index: number, wasteItem: DxrWasteItemDef) => void;

    @Input()
    wasteItemList!: DxrWasteItemDef[];

    @Input()
    selectedWasteType!: WasteTypeDef;

    @Input()
    public switchToCo2Tab!: (index: number, wasteItem: DxrWasteItemDef) => void;

    @Input()
    public updateWasteItemMainList!: (newWasteItem: DxrWasteItemDef) => void;

    @Input()
    wasteCategoryMainList!: CategoryDef[];

    @Input()
    wasteTypeMainList!: WasteTypeDef[];

    @Input()
    wasteItemMainList!: DxrWasteItemDef[];

    constructor(private breakpointObserver: BreakpointObserver, private wasteDefService: WasteDefService, private languageService: LanguageService, private dialog: MatDialog, private utilService: UtilService) { }


    uiLabels: any = {
        "wasteType": "Type",
        "wasteItemTitle": 'Item',
        "listHeader": 'Items',
        "wasteUnit": 'Unit',
        "editBtn": 'Edit',
        "addButton": 'Add Item',
        updateCoefficientButton: "Update Coefficient",
    }


    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_ITEM_TAB, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_ITEM_TAB;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_ITEM_TAB, AppConstant.UI_LABEL_TEXT);
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    openAddWasteDialog = (selectedWasteItem?: DxrWasteItemDef): void => {
        const addFaqDialog = this.dialog.open(WasteDefFormComponent, {
            width: '700px',
            data: {
                selecteWasteType: this.selectedWasteType,
                selectedWasteItem: (selectedWasteItem) ? selectedWasteItem : null,
            }
        });

        addFaqDialog.afterClosed().subscribe(newWasteItem => {
            if (newWasteItem) {
                this.saveWasteItem(newWasteItem);
                // this.faqInfoList.unshift(newFaqInfo);
            }
        })
    }

    saveWasteItem(newWasteItem: DxrWasteItemDef) {
        if (newWasteItem) {
            if (!newWasteItem.wasteId || newWasteItem.wasteId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteItem.wasteId = id;
                newWasteItem.wasteTypeId = this.selectedWasteType.wasteTypeId;
                var processMethode: Co2EmissionMethodeInfoFetch = this.prepareCO2ProcessMethode();
                var dumpingMethode: Co2EmissionMethodeInfoFetch = this.prepareCO2DumpingMethode();
                newWasteItem.dumperCo2EmissionDefaultMethodeId = dumpingMethode.methodeId;
                newWasteItem.dumperCo2EmissionMethodeList.push(dumpingMethode);
                newWasteItem.processorCo2EmissionDefaultMethodeId = processMethode.methodeId;
                newWasteItem.processorCo2EmissionMethodeList.push(processMethode);
                newWasteItem.isNew = AppConstant.NEW_WASTE;
            }
            else {
                newWasteItem.isNew = AppConstant.EXISTING_WASTE;
            }

            this.wasteDefService.saveWasteItemDef(newWasteItem).subscribe(savedData => {
                if (savedData) {
                    this.updateWasteItemList(savedData);
                    // this.updateWasteItemMainList(savedData);
                }
            });
        }
    }
    prepareCO2ProcessMethode(): Co2EmissionMethodeInfoFetch {
        var processMethode: Co2EmissionMethodeInfoFetch = {
            methodeId: '',
            methodeTitle: '',
            description: '',
            emissionQuantityPerUnit: 0,
            emimissionType: {
                emimissionTypeId: "",
                emimissionTypeName: ""
            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false
        }
        processMethode.methodeId = this.utilService.generateUniqueId();
        processMethode.methodeTitle = "Default Processing Methode";
        processMethode.emissionQuantityPerUnit = this.selectedWasteType.co2CoefficientValue;
        processMethode.emimissionType.emimissionTypeId = AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID;
        return processMethode;
    }
    prepareCO2DumpingMethode() {
        var dumpingMethode: Co2EmissionMethodeInfoFetch = {
            methodeId: '',
            methodeTitle: '',
            description: '',
            emissionQuantityPerUnit: 0,
            emimissionType: {
                emimissionTypeId: "",
                emimissionTypeName: ""
            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false
        }
        dumpingMethode.methodeId = this.utilService.generateUniqueId();
        dumpingMethode.methodeTitle = "Default Dumping Methode";
        dumpingMethode.emissionQuantityPerUnit = 0;
        dumpingMethode.emimissionType.emimissionTypeId = AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID;
        return dumpingMethode;

    }
    updateWasteItemList(newWasteItem: DxrWasteItemDef) {

        let itemIndex = this.wasteItemList.findIndex(item => item.wasteId == newWasteItem.wasteId);
        if (itemIndex >= 0) {
            this.wasteItemList[itemIndex] = newWasteItem;
        } else {
            this.wasteItemList.unshift(newWasteItem);
        }

        let itemIndex1 = this.wasteItemMainList.findIndex(item => item.wasteId == newWasteItem.wasteId);
        if (itemIndex1 >= 0) {
            this.wasteItemMainList[itemIndex1] = newWasteItem;
        } else {
            this.wasteItemMainList.unshift(newWasteItem);
        }
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    onClickCo2Button(wasteItem: DxrWasteItemDef) {
        this.switchToCo2Tab(3, wasteItem);
    }

    removeItem(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.WASTE_DEF_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: vehicleForwardLink,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.wasteDefService.removeWasteItem(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeWasteItemFromViewList(itemId);
                    }
                });
            }
        });
    }

    removeWasteItemFromViewList(itemId: string) {
        var index = this.wasteItemList.findIndex(item => item.wasteId == itemId);

        if (index >= 0) {
            this.wasteItemList.splice(index, 1);
        }
    }
}
