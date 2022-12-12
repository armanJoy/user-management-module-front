import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { WasteTypeDef, DxrWasteItemDef, WasteRequest, CategoryDef } from 'src/app/models/backend-fetch/waste-def';
import { WasteDefService } from 'src/app/services/operation-services/waste-def.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-create-waste-tab',
    templateUrl: './create-waste-tab.component.html',
    styleUrls: ['./create-waste-tab.component.css']
})
export class CreateWasteTabComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, wasteRequest: WasteRequestInfo) => void;

    @Input()
    public selectedWaste!: WasteRequestInfo;

    wasteItemList: DxrWasteItemDef[] = []
    wasteTypeList: WasteTypeDef[] = []
    wasteCategoryList: CategoryDef[] = [];
    constructor(private wasteDefService: WasteDefService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private matDialog: MatDialog, private languageService: LanguageService) { }

    categoryFilter: string = "New Category";
    typeFilter: string = "New Type";
    itemFilter: string = "New Item";


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.getWasteCategory();
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CREATE_WASTE_TAB;
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

        this.wasteDefService.getWasteTypeList().subscribe(wasteTypeList => {
            if (wasteTypeList) {
                this.wasteTypeList = wasteTypeList;
            }

            this.getWasteItems();
        });
    }

    getWasteItems() {
        this.wasteDefService.getWasteItems().subscribe(wasteItemList => {
            if (wasteItemList) {
                this.wasteItemList = wasteItemList;
            }
        });
    };

    onSelectCategory() {
        this.selectedWasteCategoryWasteTypeList = this.prepareSelectedWasteCategoryWasteTypeList(this.newCategory.categoryId)
    }

    selectedWasteCategoryWasteTypeList: WasteTypeDef[] = [];



    prepareSelectedWasteCategoryWasteTypeList(categoryId: string): WasteTypeDef[] {
        var selectedWasteCategoryWasteTypeList: WasteTypeDef[] = [];
        if (this.wasteTypeList) {
            this.wasteTypeList.forEach(wasteType => {
                if (wasteType.categoryId == categoryId) {
                    selectedWasteCategoryWasteTypeList.push(wasteType);
                }
            });
        }

        return selectedWasteCategoryWasteTypeList;
    }


    onSelectType() {
        this.selectedWasteTypeWasteItemList = this.prepareSelectedWasteTypeWasteItemList(this.newWasteType.wasteTypeId)
    }

    selectedWasteTypeWasteItemList: DxrWasteItemDef[] = [];

    prepareSelectedWasteTypeWasteItemList(wasteTypeId: string): DxrWasteItemDef[] {
        var selectedWasteTypeWasteItemList: DxrWasteItemDef[] = [];
        if (this.wasteItemList) {
            this.wasteItemList.forEach(wasteItem => {
                if (wasteItem.wasteTypeId == wasteTypeId) {
                    selectedWasteTypeWasteItemList.push(wasteItem);
                }
            });
        }

        return selectedWasteTypeWasteItemList;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    saveNewWaste() {
        var validationReport = this.wasteDefService.wasteCategoryFormValidator(this.newCategory);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            this.saveWasteCategoryInService(this.newCategory)
        }
    }

    saveWasteCategoryInService(newWasteCategory: CategoryDef) {
        if (newWasteCategory) {
            if (!newWasteCategory.categoryId || newWasteCategory.categoryId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteCategory.categoryId = id;

            }
            this.wasteDefService.saveWasteCategory(newWasteCategory).subscribe(savedData => {
                if (savedData) {
                    this.saveWasteType();

                }
            });
        }

    }

    saveWasteType() {
        var validationReport = this.wasteDefService.wasteTypeFormValidator(this.newWasteType);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            this.saveWasteTypeInService(this.newWasteType)
        }
    }
    saveWasteTypeInService(newWasteType: WasteTypeDef) {
        if (newWasteType) {
            if (!newWasteType.wasteTypeId || newWasteType.wasteTypeId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteType.categoryId = this.newCategory.categoryId;
                newWasteType.wasteTypeId = id;

            }
            this.wasteDefService.saveWasteType(newWasteType).subscribe(savedData => {
                if (savedData) {
                    this.saveWasteItem();

                }
            });
        }

    }

    saveWasteItem() {
        var validationReport = this.wasteDefService.wasteItemFormValidator(this.newWasteItem);
        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            this.saveWasteItemInService(this.newWasteItem)
        }
    }

    saveWasteItemInService(newWasteItem: DxrWasteItemDef) {
        if (newWasteItem) {
            if (!newWasteItem.wasteId || newWasteItem.wasteId == '') {
                var id = this.utilService.generateUniqueId();
                newWasteItem.wasteId = id;
                newWasteItem.wasteTypeId = this.newWasteType.wasteTypeId;
            }

            this.wasteDefService.saveWasteItemDef(newWasteItem).subscribe(savedData => {
                if (savedData) {
                    this.saveWasteRequest();
                }
            });
        }
    }

    saveWasteRequest() {
        if (this.wasteRequest) {
            this.wasteRequest.wasteRequestId = this.selectedWaste.wasteRequestId;
            this.wasteRequest.wasteId = this.newWasteItem.wasteId;
            this.wasteRequest.requestWasteItemId = (this.wasteRequest.requestWasteItemId) ? this.wasteRequest.requestWasteItemId : this.utilService.generateUniqueId();
        }
        this.wasteDefService.saveWasteRequest(this.wasteRequest).subscribe(data => {
            if (data) {
                this.resetWasteCategory();
                this.resetWasteType();
                this.resetWasteItem();
            }
        });

    }

    wasteRequest: WasteRequest = {
        requestWasteItemId: '',
        wasteId: '',
        wasteRequestId: ''
    }

    newCategory: CategoryDef = {
        categoryId: '',
        categoryTitle: '',
        categoryCode: '',
        remarks: ''
    }

    resetWasteCategory() {
        this.newCategory = {
            categoryId: '',
            categoryTitle: '',
            categoryCode: '',
            remarks: ''
        }
    }
    newWasteType: WasteTypeDef = {
        categoryId: '',
        wasteTypeId: '',
        wasteTypeTitle: '',
        wasteTypeCode: '',
        co2CoefficientValue: 0,
        remarks: ''

    }
    resetWasteType() {
        this.newWasteType = {
            categoryId: '',
            wasteTypeId: '',
            wasteTypeTitle: '',
            wasteTypeCode: '',
            co2CoefficientValue: 0,
            remarks: ''
        }
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
    resetWasteItem() {
        this.newWasteItem = {
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
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.CREATE_WASTE_TAB, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "existing": 'Existing',
    //     "new": 'New',
    //     "itemHeader": 'Waste Item',
    //     "wasteItemTitle": 'Waste Item',
    //     "wasteItemUnit": 'Waste Unit',
    //     'wasteItemRemark': 'Remark',
    //     "wastePackage": 'Waste Package',
    //     "wasteShape": 'Waste Shape',
    //     "addBtn": 'Save',
    //     "categoryHeader": 'Waste Category',
    //     "wasteCategoryTitle": 'Waste Category',
    //     "wasteCategoryCode": 'Category Code',
    //     "typeHeader": 'Waste Type',
    //     "wasteTypeTitle": 'Waste Type',
    //     "wasteTypeCode": 'Type Code',
    //     'wasteCategoryRemark': 'Remark'

    // }

}
