import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { findIndex, map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, CompanyWasteUpdate, CompWasteInfoFetch, DxrWasteInfoFetch, WasteItemDef, WasteItemSetMethode } from 'src/app/models/backend-fetch/company-settings-fetch';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
import { DxrWasteViewList } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AddWastePopupComponent } from '../add-waste-popup/add-waste-popup.component';
import { NewWasteRequestInfoComponent } from '../new-waste-request-info/new-waste-request-info.component';
import { PriceSelectionPopupComponent } from '../price-selection-popup/price-selection-popup.component';
import { RequestSubmitPopupComponent } from '../request-submit-popup/request-submit-popup.component';
import { SetMethodePopupComponent } from '../set-methode-popup/set-methode-popup.component';


@Component({
    selector: 'app-base-price-tab',
    templateUrl: './base-price-tab.component.html',
    styleUrls: ['./base-price-tab.component.css']
})
export class BasePriceTabComponent implements OnInit {
    @Input()
    isDumperCompany!: boolean;
    @Input()
    isProcessorCompany!: boolean;
    @Input()
    isTransporterCompany!: boolean;

    @Input()
    public isViewMode!: boolean;

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    @Input()
    public dxrWasteList: DxrWasteInfoFetch[] = [];
    @Input()
    companyWasteItemSetMethodeList: WasteItemSetMethode[] = [];
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }
    wasteItemSetMethodeInfo: WasteItemSetMethode = {
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
                emimissionTypeName: "",
            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false,
        },
        processingMethode: {
            methodeId: "",
            methodeTitle: "",
            description: "",
            emissionQuantityPerUnit: 0,
            emimissionType: {
                emimissionTypeId: "",
                emimissionTypeName: "",
            },
            co2EmissionVolume: 0,
            isDefault: false,
            isCheck: false,

        }
    }

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;
    companyId: string = ""

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BASE_PRICE_TAB;


    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };

    saveUpdatedComWasteList(updatedCompanyWasteList: CompanyWasteUpdate) {
        var companyId = this.utilService.getCompanyIdCookie();
        this.companySettingsOperationService.getCompanyWasteItemCo2EmissionMethode(companyId).subscribe(data => {
            if (data) {
                this.companyWasteItemSetMethodeList = data;
            }
        });

        if (updatedCompanyWasteList) {
            var preparedCompanyWasteList: CompWasteInfoFetch[] = this.companySettingsOperationService.prepareWasteListForCurrencySign(updatedCompanyWasteList.companyWasteList);
            this.companyInfo.wasteList = preparedCompanyWasteList;
        }

    }

    openWasteInfoListDiolog(dxrWasteInfoList: DxrWasteInfoFetch[]): void {

        const addCompanyWasteDialog = this.dialog.open(AddWastePopupComponent, {
            width: '75%',
            height: '90%',
            data: {
                dxrWaste: dxrWasteInfoList,
                companyInfo: this.companyInfo.wasteList,
                companyId: this.companyInfo.companyId
            },
            disableClose: true

        });
        addCompanyWasteDialog.afterClosed().subscribe(result => {
            if (result) {
                this.companySettingsOperationService.updateCompanyWasteInfo(result).subscribe((data) => {
                    if (data) {
                        this.saveUpdatedComWasteList(data);

                    }
                })
            }
        });
    }

    updatePriceViewList(waste: WasteItemDef) {
        if (waste) {
            this.companyInfo.wasteList.forEach((companyWaste) => {

                companyWaste.dxrWasteTypeDef.forEach((wasteType) => {
                    wasteType.dxrWasteItemDef.forEach((element) => {
                        if (element.wasteId == waste.wasteId) {
                            element.transportPrice = waste.transportPrice;
                            element.transportPriceFormated = this.utilService.prepareCurrencySign(waste.transportPrice);
                            element.processingPrice = waste.processingPrice;
                            element.processingPriceFormated = this.utilService.prepareCurrencySign(waste.processingPrice);
                            element.remarks = waste.remarks;
                            element.backendDate = waste.backendDate;
                            element.frontendDate = waste.frontendDate;
                        }
                    })

                })

            })
        }
    }

    openSetPriceDialog(companyWaste: WasteItemDef): void {
        const sampleDialog = this.dialog.open(PriceSelectionPopupComponent, {
            width: '75%',
            // height: '60%',
            data: {
                wasteInfo: companyWaste,
                processor: this.isProcessorCompany,
                transporter: this.isTransporterCompany
            },
            disableClose: true

        });
        sampleDialog.afterClosed().subscribe(result => {

            if (result) {
                this.companySettingsOperationService.updateBasePriceInfo(result).subscribe((data) => {
                    if (data) {
                        this.updatePriceViewList(data);
                    }
                })
            }
        });
    }

    openWasteRequestDialog(): void {
        const wasteRequestDialog = this.dialog.open(NewWasteRequestInfoComponent, {
            width: '700px',
            // height: '60%',
            disableClose: true

        });
        wasteRequestDialog.afterClosed().subscribe(result => {

            if (result) {
                this.companySettingsOperationService.addWasteRequestInfo(result).subscribe((data) => {
                    if (data) {
                        this.saveNotification(data.wasteRequestId)
                        this.openDiolog();
                    }
                })
            }
        });
    }
    saveNotification(wasteRequestId: string) {

        this.notificationSetInfo.baseTableId = wasteRequestId;
        this.notificationSetInfo.companyId = this.utilService.getCompanyIdCookie();
        this.notificationSetInfo.trigerUserInfoId = this.utilService.getUserIdCookie();
        this.notificationSetInfo.contextId = AppConstant.WASTE_REQUEST_NOTIFICAIONT_ID;
        this.companySettingsOperationService.sendNotification(this.notificationSetInfo).subscribe(data => {
        })
    }

    openDiolog(): void {
        const sampleDialog = this.dialog.open(RequestSubmitPopupComponent, {
            width: '500px',
            disableClose: true
        });

    }
    prepareWasteItemC02EmissionMethode(companyWaste: WasteItemDef): WasteItemSetMethode {

        var wasteItemSetMethode: WasteItemSetMethode = this.wasteItemSetMethodeInfo;
        this.companyWasteItemSetMethodeList.forEach(element => {
            if (element.wasteItemId == companyWaste.dxrWasteItemId) {
                wasteItemSetMethode = element;
            }
        });
        return wasteItemSetMethode;
    }
    openSetMethodePopup(companyWaste: WasteItemDef, flag: boolean) {


        var wasteItemSetMethode: WasteItemSetMethode = this.prepareWasteItemC02EmissionMethode(companyWaste);
        const sampleDialog = this.dialog.open(SetMethodePopupComponent, {
            width: '75%',
            // height: '60%',
            data: {
                companyWasteInfo: companyWaste,
                isDumper: flag,
                methode: JSON.parse(JSON.stringify(wasteItemSetMethode)),

            },
            disableClose: true

        });
        sampleDialog.afterClosed().subscribe(result => {

            if (result) {

                // var dxrWasteItemMethode: DxrWasteItemDef = result;
                // wasteItemSetMethode.wasteItemId = dxrWasteItemMethode.wasteId;
                // if (wasteItemSetMethode.companyId == "") {
                //     wasteItemSetMethode.companyId = this.utilService.getCompanyIdCookie();
                // }
                // if (wasteItemSetMethode.wasteItemSetMethodeId == "") {
                //     wasteItemSetMethode.wasteItemSetMethodeId = this.utilService.generateUniqueId();
                // }
                // if (flag) {
                //     dxrWasteItemMethode.dumperCo2EmissionMethodeList.forEach(element => {
                //         if (dxrWasteItemMethode.dumperCo2EmissionDefaultMethodeId == element.methodeId) {
                //             wasteItemSetMethode.dumpingMethode = element;
                //         }

                //     });
                // }
                // else if (flag) {
                //     dxrWasteItemMethode.processorCo2EmissionMethodeList.forEach(element => {
                //         if (dxrWasteItemMethode.processorCo2EmissionDefaultMethodeId == element.methodeId) {
                //             wasteItemSetMethode.processingMethode = element;
                //         }

                //     });
                // }
                result.wasteItemId = companyWaste.dxrWasteItemId;
                this.saveCo2EmissionMethode(result, flag);
            }
        });
    }
    saveCo2EmissionMethode(wasteItemSetMethode: WasteItemSetMethode, flag: boolean) {

        if (flag) {
            this.companySettingsOperationService.saveCompanyWasteItemCo2EmissionDumpingMethode(wasteItemSetMethode).subscribe(data => {
                if (data) {
                    this.updateCo2EmissionMethode(data, flag);
                }
            })
        }
        else {
            this.companySettingsOperationService.saveCompanyWasteItemCo2EmissionProcessingMethode(wasteItemSetMethode).subscribe(data => {
                if (data) {
                    this.updateCo2EmissionMethode(data, flag);
                }
            })

        }
    }
    updateCo2EmissionMethode(setMethode: WasteItemSetMethode, flag: boolean) {

        if (flag == true) {
            var index = -1;
            index = this.companyWasteItemSetMethodeList.findIndex(item => item.wasteItemId == setMethode.wasteItemId);
            if (index >= 0) {
                this.companyWasteItemSetMethodeList[index].dumpingMethode = setMethode.dumpingMethode;
            }
            else {
                this.companyWasteItemSetMethodeList.push(setMethode);
            }
        }
        else {
            var index = -1;
            index = this.companyWasteItemSetMethodeList.findIndex(item => item.wasteItemId == setMethode.wasteItemId);
            if (index >= 0) {
                this.companyWasteItemSetMethodeList[index].processingMethode = setMethode.processingMethode;
            }
            else {
                this.companyWasteItemSetMethodeList.push(setMethode);
            }

        }
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BASE_PRICE_TAB, AppConstant.UI_LABEL_TEXT);

    removeCompanyWaste(dxrWasteItemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: dxrWasteItemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.COMPANY_WASTE_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.companySettingsOperationService.removeCompanyWaste(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeCompanyWasteFromViewList(dxrWasteItemId);

                    }
                });
            }
        });
    }

    removeCompanyWasteFromViewList(dxrWasteItemId: string) {

        var wasteCategoryIndex = -1;
        var wasteTypeIndex = -1;
        var wasteItemIndex = -1;

        this.companyInfo.wasteList.forEach((category, i) => {
            if (category.dxrWasteTypeDef) {
                category.dxrWasteTypeDef.forEach((eachType, j) => {
                    if (eachType && eachType.dxrWasteItemDef) {
                        var index = eachType.dxrWasteItemDef.findIndex(wasteItem => wasteItem.dxrWasteItemId == dxrWasteItemId);
                        if (index >= 0) {
                            wasteCategoryIndex = i;
                            wasteTypeIndex = j;
                            wasteItemIndex = index;
                        }
                    }
                });
            }

        });

        if (wasteCategoryIndex >= 0 && wasteTypeIndex >= 0 && wasteItemIndex >= 0) {
            this.companyInfo.wasteList[wasteCategoryIndex].dxrWasteTypeDef[wasteTypeIndex].dxrWasteItemDef.splice(wasteItemIndex, 1);
        }
    }
}
