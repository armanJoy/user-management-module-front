import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, CompanyWasteUpdate, CompWasteInfoFetch, comWasteTypeDef, DxrWasteInfoFetch, WasteItemDef } from 'src/app/models/backend-fetch/company-settings-fetch';
import { dxrWasteTypeDefView, DxrWasteViewDef, DxrWasteViewList } from 'src/app/models/backend-update/company-settings-update';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-add-waste-popup',
    templateUrl: './add-waste-popup.component.html',
    styleUrls: ['./add-waste-popup.component.css']
})
export class AddWastePopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<AddWastePopupComponent>, private languageService: LanguageService, private utilService: UtilService) { }


    companyId!: string;

    dxrWaste: DxrWasteInfoFetch[] = [];

    companyInfo: CompWasteInfoFetch[] = [];
    updatedWasteList: CompWasteInfoFetch[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_WASTE_POPUP;

        if (this.data) {
            this.companyId = this.data.companyId;
            this.dxrWaste = this.data.dxrWaste;
            this.companyInfo = this.data.companyInfo;
            if (this.dxrWaste && this.companyInfo) {
                this.dxrWasteViewList = this.prepareDxrWasteViewList(this.dxrWaste, this.companyInfo)
            }
        }

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };

    prepareUpdateComWasteList(wasteViewList: DxrWasteViewList[], companyId: string): CompanyWasteUpdate {
        var companyWasteUpdate: CompanyWasteUpdate = {
            companyId: companyId,
            companyWasteList: []
        }
        var updatedCompanyWasteInfoList: CompWasteInfoFetch[] = [];
        if (wasteViewList) {
            wasteViewList.forEach((wasteCategory) => {
                var companyWasteCategory: CompWasteInfoFetch = {
                    // companyId: companyId,
                    categoryId: wasteCategory.categoryId,
                    categoryTitle: wasteCategory.categoryTitle,
                    dxrWasteTypeDef: []
                }
                if (wasteCategory.dxrWasteTypeDef) {
                    wasteCategory.dxrWasteTypeDef.forEach((wasteType) => {
                        var companyWasteType: comWasteTypeDef = {
                            categoryId: wasteType.categoryId,
                            wasteTypeId: wasteType.wasteTypeId,
                            wasteTypeTitle: wasteType.wasteTypeTitle,
                            dxrWasteItemDef: []
                        }

                        if (wasteType.dxrWasteItemDef) {
                            wasteType.dxrWasteItemDef.forEach((wasteItemDef) => {

                                if (wasteItemDef.isSelect == true) {
                                    var wasteItem: WasteItemDef = {
                                        wasteTypeId: wasteItemDef.wasteTypeId,
                                        wasteId: this.utilService.generateUniqueId(),
                                        wasteItem: wasteItemDef.wasteItem,
                                        unitDef: wasteItemDef.unitDef,
                                        transportPrice: wasteItemDef.transportPrice,
                                        transportPriceFormated: '',
                                        processingPrice: wasteItemDef.processingPrice,
                                        processingPriceFormated: '',
                                        frontendDate: wasteItemDef.frontendDate,
                                        backendDate: wasteItemDef.backendDate,
                                        remarks: '',
                                        dxrWasteItemId: wasteItemDef.wasteId,
                                        wasteShape: wasteItemDef.wasteShape,
                                        wastePackage: wasteItemDef.wastePackage,
                                        // dumpingMethode: {
                                        //     methodeId: "",
                                        //     methodeTitle: "",
                                        //     description: "",
                                        //     emissionQuantityPerUnit: 0,
                                        //     emimissionType: {
                                        //         emimissionTypeId: "",
                                        //         emimissionTypeName: "",

                                        //     },
                                        //     co2EmissionVolume: 0,
                                        //     isDefault: false,
                                        //     isCheck: false
                                        // },
                                        // processingMethode: {
                                        //     methodeId: "",
                                        //     methodeTitle: "",
                                        //     description: "",
                                        //     emissionQuantityPerUnit: 0,
                                        //     emimissionType: {
                                        //         emimissionTypeId: "",
                                        //         emimissionTypeName: "",

                                        //     },
                                        //     co2EmissionVolume: 0,
                                        //     isDefault: false,
                                        //     isCheck: false
                                        // }
                                    }
                                    companyWasteType.dxrWasteItemDef.push(wasteItem);
                                }


                            });

                            if (companyWasteType.dxrWasteItemDef && companyWasteType.dxrWasteItemDef.length > 0) {
                                companyWasteCategory.dxrWasteTypeDef.push(companyWasteType)
                            }
                        }

                    })

                    if (companyWasteCategory.dxrWasteTypeDef && companyWasteCategory.dxrWasteTypeDef.length > 0) {
                        updatedCompanyWasteInfoList.push(companyWasteCategory)
                    }
                }
                // updatedCompanyWasteInfoList.push(companyWasteCategory);

            })

        }

        companyWasteUpdate.companyWasteList.push.apply(companyWasteUpdate.companyWasteList, updatedCompanyWasteInfoList);
        return companyWasteUpdate;
    }
    updatedCompanyWasteInfoList: CompWasteInfoFetch[] = [];


    updateComWasteList() {

        var companyWasteUpdate: CompanyWasteUpdate = this.prepareUpdateComWasteList(this.dxrWasteViewList, this.companyId);
        this.dialogRef.close(companyWasteUpdate);

    }

    prepareDxrWasteViewList(dxrWaste: DxrWasteInfoFetch[], comWaste: CompWasteInfoFetch[]): DxrWasteViewList[] {
        var dxrWasteViewList: DxrWasteViewList[] = [];
        if (dxrWaste) {
            dxrWaste.forEach((dxrWasteCategoryItem) => {
                var dxrWasteDef: DxrWasteViewList = {
                    categoryId: dxrWasteCategoryItem.categoryId,
                    categoryTitle: dxrWasteCategoryItem.categoryTitle,
                    dxrWasteTypeDef: []

                }
                if (dxrWasteCategoryItem.dxrWasteTypeDef) {
                    dxrWasteCategoryItem.dxrWasteTypeDef.forEach((dxrWasteType) => {
                        var dxrWasteTypeView: dxrWasteTypeDefView = {
                            wasteTypeId: dxrWasteType.wasteTypeId,
                            wasteTypeTitle: dxrWasteType.wasteTypeTitle,
                            categoryId: dxrWasteType.categoryId,
                            dxrWasteItemDef: [],
                        }

                        dxrWasteType.dxrWasteItemDef.forEach((dxrWasteItem) => {
                            var dxrWasteView: DxrWasteViewDef = {
                                wasteTypeId: dxrWasteItem.wasteTypeId,
                                wasteId: dxrWasteItem.wasteId,
                                wasteItem: dxrWasteItem.wasteItem,
                                unitDef: dxrWasteItem.unitDef,
                                transportPrice: 0,
                                processingPrice: 0,
                                frontendDate: '',
                                backendDate: '',
                                wasteShape: dxrWasteItem.wasteShape,
                                wastePackage: dxrWasteItem.wastePackage,
                                remarks: dxrWasteItem.remarks,
                                isSelect: false

                            }
                            if (comWaste) {
                                comWaste.forEach((companyWasteCategoryItem) => {
                                    if (dxrWasteCategoryItem.categoryId == companyWasteCategoryItem.categoryId) {
                                        companyWasteCategoryItem.dxrWasteTypeDef.forEach((comWasteType) => {
                                            if (comWasteType.wasteTypeId == dxrWasteType.wasteTypeId) {
                                                comWasteType.wasteTypeTitle = dxrWasteType.wasteTypeTitle,
                                                    comWasteType.dxrWasteItemDef.forEach((companyWasteItem) => {
                                                        if (companyWasteItem.wasteItem == dxrWasteItem.wasteItem) {
                                                            dxrWasteView.transportPrice = companyWasteItem.transportPrice,
                                                                dxrWasteView.processingPrice = companyWasteItem.processingPrice,
                                                                dxrWasteView.frontendDate = companyWasteItem.frontendDate,
                                                                dxrWasteView.backendDate = companyWasteItem.backendDate,
                                                                dxrWasteView.remarks = companyWasteItem.remarks,
                                                                dxrWasteView.isSelect = true;
                                                        }
                                                    });
                                            }
                                        })



                                    }

                                });


                            }

                            dxrWasteTypeView.dxrWasteItemDef.push(dxrWasteView)
                        });

                        dxrWasteDef.dxrWasteTypeDef.push(dxrWasteTypeView)
                    })


                }


                dxrWasteViewList.push(dxrWasteDef);

            });
        }
        return dxrWasteViewList;
    }

    dxrWasteViewList: DxrWasteViewList[] = [];

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_WASTE_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "selectFromList": "Select Waste From List",
    //     "wasteCategory": "Waste Category",
    //     "wasteType": "Waste Type",
    //     "wasteItem": "Waste Item",
    //     "unitDef": "Waste Unit",
    //     "select": "Select",
    //     "close": "Close",
    //     "addBtn": "Save",
    // }

}
