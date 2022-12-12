import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrCo2EmissionMethodeListFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { TypeWiseWaste, DxrWasteItemDef, WasteTypeDef, CategoryDef, CompanyWasteCoefficient } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-waste-def',
    templateUrl: './waste-def.component.html',
    styleUrls: ['./waste-def.component.css']
})
export class WasteDefComponent implements OnInit {

    constructor(private wasteDefService: WasteDefService, private languageService: LanguageService, private utilService: UtilService) { }

    uiLabels: any = {
        categoryTabHeader: 'Waste Category',
        wasteCategoryTabHeader: 'Waste Type',
        wasteItemTabHeader: 'Waste Item',
        emissionMethodTabHeader: 'CO2 Emission Methode'
    }
    viewContent = false;

    wasteItemList: DxrWasteItemDef[] = [];
    wasteTypeList: WasteTypeDef[] = [];
    wasteCategoryList: CategoryDef[] = [];
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
    componentCode!: string;
    isSystemAdmin: boolean = false;
    methodeList: DxrCo2EmissionMethodeListFetch = {
        dumperOperationMethodeList: [],
        processingOperationMethodeList: []
    }

    companyWasteCoefficient: CompanyWasteCoefficient[] = [];

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.WASTE_DEF_MENU;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.WASTE_DEF_MENU, AppConstant.UI_LABEL_TEXT);
        this.getWasteCategory();
    }

    getWasteCategory() {

        this.wasteDefService.getWasteCategoryList().subscribe(categoryList => {
            if (categoryList) {
                this.wasteCategoryList = categoryList;

            }

            this.getWasteType();
        });
    }

    getWasteType() {

        this.wasteDefService.getWasteTypeList().subscribe(typeList => {
            if (typeList) {
                this.wasteTypeList = typeList;

            }

            this.getWasteItems();
        });
    }

    getWasteItems() {
        this.wasteDefService.getWasteItems().subscribe(wasteItemList => {
            if (wasteItemList) {
                this.wasteItemList = wasteItemList;

            }
            this.getMethodeList();
            this.prepareViewData();


        });
    };


    updateTypeMainList(newWasteType: WasteTypeDef) {

        let itemIndex = this.wasteTypeList.findIndex(item => item.wasteTypeId == newWasteType.wasteTypeId);
        if (itemIndex >= 0) {
            this.wasteTypeList[itemIndex] = newWasteType;
        } else {
            this.wasteTypeList.unshift(newWasteType);
        }

    }


    updateWasteItemMainList(newWasteItem: DxrWasteItemDef) {

        let itemIndex = this.wasteItemList.findIndex(item => item.wasteId == newWasteItem.wasteId);
        if (itemIndex >= 0) {
            this.wasteItemList[itemIndex] = newWasteItem;
        } else {
            this.wasteItemList.unshift(newWasteItem);
        }
    }

    // getMethodeList(wasteItem: DxrWasteItemDef) {
    //     this.wasteDefService.getMethodeList().subscribe(methodes => {
    //         if (methodes) {
    //             this.methodeList = methodes;
    //             // this.prepareViewForWasteItemMethode(wasteItem);
    //         }
    //     });
    // }
    getMethodeList() {
        this.wasteDefService.getMethodeList().subscribe(methodes => {
            if (methodes) {
                this.methodeList = methodes;
                // this.prepareViewForWasteItemMethode(wasteItem);
            }

        });
    }
    prepareViewData() {
        this.selectedWasteType = (this.wasteTypeList) ? this.wasteTypeList[0] : {} as WasteTypeDef;
        this.selectedWasteCategoryWasteItemList = this.prepareSelectedWasteTypeWasteItemList(this.selectedWasteType.wasteTypeId);
        this.viewContent = true;
        if (this.wasteCategoryList.length > 0) {
            this.showWasteType(0, this.wasteCategoryList[0])
        }
        if (this.wasteTypeList.length > 0) {
            this.showWasteItem(0, this.wasteTypeList[0]);
        }
        if (this.wasteItemList.length > 0) {
            this.switchToWasteCoefficientUpdateTab(0, this.wasteItemList[0]);
        }
    }

    selectedWasteCategoryWasteItemList: DxrWasteItemDef[] = [];

    prepareSelectedWasteTypeWasteItemList(wasteCategoryId: string): DxrWasteItemDef[] {
        var selectedWasteCategoryWasteItemList: DxrWasteItemDef[] = [];
        if (this.wasteItemList) {
            this.wasteItemList.forEach(wasteItem => {
                if (wasteItem.wasteTypeId == wasteCategoryId) {
                    selectedWasteCategoryWasteItemList.push(wasteItem);
                }
            });
        }

        return selectedWasteCategoryWasteItemList;
    }

    selectedWasteType!: WasteTypeDef;
    public showWasteItem = (index: number, selectedWasteType: WasteTypeDef): void => {
        this.selectedIndex = index;
        this.selectedWasteType = selectedWasteType;
        this.selectedWasteCategoryWasteItemList = this.prepareSelectedWasteTypeWasteItemList(selectedWasteType.wasteTypeId);
    }

    selectedCategoryWasteTypeList: WasteTypeDef[] = [];

    prepareSelectedWasteCategoryWasteTypeList(categoryId: string): WasteTypeDef[] {
        var selectedCategoryWasteTypeList: WasteTypeDef[] = [];
        if (this.wasteTypeList) {
            this.wasteTypeList.forEach(wastetype => {
                if (wastetype.categoryId == categoryId) {
                    selectedCategoryWasteTypeList.push(wastetype);
                }
            });
        }

        return selectedCategoryWasteTypeList;
    }

    selectedCategory!: CategoryDef;
    public showWasteType = (index: number, selectedCategory: CategoryDef): void => {
        this.selectedIndex = index;
        this.selectedCategory = selectedCategory;
        this.selectedCategoryWasteTypeList = this.prepareSelectedWasteCategoryWasteTypeList(selectedCategory.categoryId);
    }
    removeAfterCalibration() {
        this.wasteItemInfo.dumperCo2EmissionDefaultMethodeId = "";
        this.wasteItemInfo.processorCo2EmissionDefaultMethodeId = "";
        this.wasteItemInfo.dumperCo2EmissionMethodeList = [];
        this.wasteItemInfo.processorCo2EmissionMethodeList = []
    }
    public switchToCo2Tab = (index: number, wasteItem: DxrWasteItemDef): void => {

        this.selectedIndex = index;
        this.wasteItemInfo = wasteItem;
        // this.removeAfterCalibration();
        // this.getMethodeList(wasteItem);
        // this.getMethodeList()
    }
    prepareViewForWasteItemMethode(wasteItem: DxrWasteItemDef) {
        wasteItem.dumperCo2EmissionMethodeList.forEach(wasteItemDumperMethode => {
            var index = -1;
            index = this.methodeList.dumperOperationMethodeList.findIndex(iteem => iteem.methodeId == wasteItemDumperMethode.methodeId)
            if (index >= 0) {
                this.methodeList.dumperOperationMethodeList[index].isCheck = true;
            }
        });
        wasteItem.processorCo2EmissionMethodeList.forEach(wasteItemProcessorMethode => {
            var index = -1;
            index = this.methodeList.processingOperationMethodeList.findIndex(iteem => iteem.methodeId == wasteItemProcessorMethode.methodeId)
            if (index >= 0) {
                this.methodeList.processingOperationMethodeList[index].isCheck = true;
            }
        });
    }
    selectedIndex = 0;
    informChange(index: any) {
        this.selectedIndex = index;
    }

    public switchToWasteCoefficientUpdateTab = (index: number, wasteItem: DxrWasteItemDef): void => {

        this.selectedIndex = index;
        this.wasteItemInfo = wasteItem;

        this.getCompanyWasteCoefficientForSelectedWaste(wasteItem);
    }

    getCompanyWasteCoefficientForSelectedWaste(wasteItem: DxrWasteItemDef) {
        this.wasteItemInfo = wasteItem;
        this.wasteDefService.getCompanyWasteCoefficient(wasteItem.wasteId).subscribe(response => {
            if (response) {
                this.companyWasteCoefficient = this.prepareCompanyWasteCoefficientForView(JSON.parse(JSON.stringify(response)));
            }
        })
    }

    prepareCompanyWasteCoefficientForView(companyWasteCoefficientList: CompanyWasteCoefficient[]) {

        if (companyWasteCoefficientList) {
            companyWasteCoefficientList.forEach(eachWaste => {
                if (eachWaste) {
                    eachWaste.zipCodeView = this.utilService.prepareZipCodeFormate(eachWaste.zipCode);
                    eachWaste.contactNoView = this.utilService.prepareContactNoFormate(eachWaste.contactNo);
                    // console.log(JSON.stringify(eachWaste));
                }

            })
        }

        return companyWasteCoefficientList;
    }

}
