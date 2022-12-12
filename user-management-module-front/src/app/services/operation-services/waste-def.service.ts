import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrWasteItemDef, WasteTypeDef, WasteRequest, CategoryDef, CompanyWasteCoefficient } from 'src/app/models/backend-fetch/waste-def';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';
import { Co2EmissionMethodeInfoFetch, DxrCo2EmissionMethodeListFetch, WasteItemWiseMethodeListFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';

@Injectable({
    providedIn: 'root'
})
export class WasteDefService {
    constructor(private uriService: UriService, private languageService: LanguageService) { }

    saveCompanyWasteCoefficient(companyWasteCoefficient: CompanyWasteCoefficient): Observable<CompanyWasteCoefficient> {
        var url = '/waste-def/update-company-waste-coefficient';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyWasteCoefficient);
    }

    getCompanyWasteCoefficient(wasteId: string): Observable<CompanyWasteCoefficient[]> {
        var url = '/waste-def/company-waste-coefficient';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteId);
}

    removeWasteItem(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/waste-def/remove-waste-item";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    removeWasteType(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/waste-def/remove-waste-type";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    removeWasteCategory(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/waste-def/remove-waste-category";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    categoryList: CategoryDef[] = [
        {
            categoryId: "cat001",
            categoryTitle: "Category-01",
            categoryCode: "0001",
            remarks: "No Remarks"
        },
        {
            categoryId: "cat002",
            categoryTitle: "Category-02",
            categoryCode: "0002",
            remarks: "Remarks"
        },
        {
            categoryId: "cat003",
            categoryTitle: "Category-03",
            categoryCode: "0003",
            remarks: "Nothing"
        }
    ]
    dxrWasteItemMethodeList: Co2EmissionMethodeInfoFetch[] = [

    ]
    // methodeList: DxrCo2EmissionMethodeListFetch = {
    //     dumperOperationMethodeList: [
    //         {
    //             methodeId: "methodeId001",
    //             methodeTitle: "methode N0-1",
    //             description: "",
    //             emissionQuantityPerUnit: 10,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId001",
    //                 emimissionTypeName: "Dumper Operation",

    //             },
    //             co2EmissionVolume: 10,
    //             isDefault: false,
    //             isCheck: false
    //         },
    //         {
    //             methodeId: "methodeId002",
    //             methodeTitle: "methode N0-3",
    //             description: "",
    //             EmissionQuantityPerUnit: 12,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId001",
    //                 emimissionTypeName: "Dumper Operation",

    //             },
    //             co2EmissionVolume: 15,
    //             isDefault: false,
    //             isCheck: false
    //         },
    //         {
    //             methodeId: "methodeId003",
    //             methodeTitle: "methode N0-5",
    //             description: "",
    //             EmissionQuantityPerUnit: 100,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId001",
    //                 emimissionTypeName: "Dumper Operation",

    //             },
    //             co2EmissionVolume: 10,
    //             isDefault: false,
    //             isCheck: false
    //         }
    //     ],
    //     processingOperationMethodeList: [
    //         {
    //             methodeId: "methodeId004",
    //             methodeTitle: "methode N0-2",
    //             description: "",
    //             EmissionQuantityPerUnit: 10,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId002",
    //                 emimissionTypeName: "Processing Operation",

    //             },
    //             co2EmissionVolume: 10,
    //             isDefault: false,
    //             isCheck: false
    //         },
    //         {
    //             methodeId: "methodeId005",
    //             methodeTitle: "methode N0-4",
    //             description: "",
    //             EmissionQuantityPerUnit: 12,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId002",
    //                 emimissionTypeName: "Processing Operation",

    //             },
    //             co2EmissionVolume: 15,
    //             isDefault: false,
    //             isCheck: false
    //         },
    //         {
    //             methodeId: "methodeId006",
    //             methodeTitle: "methode N0-6",
    //             description: "",
    //             EmissionQuantityPerUnit: 100,
    //             emimissionType: {
    //                 emimissionTypeId: "emimissionTypeId002",
    //                 emimissionTypeName: "Processing Operation",

    //             },
    //             co2EmissionVolume: 10,
    //             isDefault: false,
    //             isCheck: false
    //         }
    //     ]
    // }
    wasteItemWiseMethodeList: WasteItemWiseMethodeListFetch = {
        wasteItemId: "",
        dumperOperationDefaultMethodeId: "",
        processingOperationDefaultMethodeId: "",
        dumperOperationMethodeList: [],
        processingOperationMethodeList: []
    }

    getWasteItemWiseMethodeList(wasteItemId: string): Observable<DxrWasteItemDef> {
        var url = '/company-settings/waste-item-wise-method';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteItemId);
    }


    saveMethode(methodeInfo: Co2EmissionMethodeInfoFetch): Observable<Co2EmissionMethodeInfoFetch> {
        var url = '/carbon/add-method';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, methodeInfo);
        // return of(methodeInfo);
    }

    getMethodeList(): Observable<DxrCo2EmissionMethodeListFetch> {
        var url = '/carbon/method-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        // return of(this.methodeList);
    }
    getWasteCategoryList(): Observable<CategoryDef[]> {
        var url = '/waste-def/waste-category';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        // return of(this.categoryList);
    }

    saveWasteCategory(newWasteCategory: CategoryDef): Observable<CategoryDef> {
        var url = '/waste-def/waste-category';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newWasteCategory);
        // return of(newWasteCategory);
    }

    // wasteTypeList: WasteTypeDef[] = [
    //     {
    //         categoryId: "cat001",
    //         wasteTypeId: 'wasteCategory001',
    //         wasteTypeTitle: 'Wood',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     },
    //     {
    //         categoryId: "cat001",
    //         wasteTypeId: 'wasteCategory002',
    //         wasteTypeTitle: 'Plastic',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     },
    //     {
    //         categoryId: "cat002",
    //         wasteTypeId: 'wasteCategory003',
    //         wasteTypeTitle: 'Metal',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     },
    //     {
    //         categoryId: "cat002",
    //         wasteTypeId: 'wasteCategory004',
    //         wasteTypeTitle: 'WoodChips',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     },
    //     {
    //         categoryId: "cat003",
    //         wasteTypeId: 'wasteCategory005',
    //         wasteTypeTitle: 'Plastic Body',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     },
    //     {
    //         categoryId: "cat003",
    //         wasteTypeId: 'wasteCategory006',
    //         wasteTypeTitle: 'Metal Scrapts',
    //         wasteTypeCode: '',
    //         remarks: '',
    //     }
    // ];

    getWasteTypeList(): Observable<WasteTypeDef[]> {
        var url = '/waste-def/waste-type';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        // return of(this.wasteTypeList);
    }

    saveWasteType(newWasteCategory: WasteTypeDef): Observable<WasteTypeDef> {
        var url = '/waste-def/waste-type';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newWasteCategory);
        // return of(newWasteCategory);
    }

    getWasteItems(): Observable<DxrWasteItemDef[]> {
        var url = '/waste-def/waste-item';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        // return of(this.wasteItemList);
    }

    saveWasteItemDef(newWasteItem: DxrWasteItemDef): Observable<DxrWasteItemDef> {
        var url = '/waste-def/waste-item';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newWasteItem);
        // return of(newWasteItem);
    }

    // wasteRequest: WasteRequest = {
    //     requestWasteItemId: '',
    //     wasteId: '',
    //     wasteRequestId: ''
    // }

    saveWasteRequest(newRequest: WasteRequest): Observable<WasteRequest> {
        var url = '/waste-def/save-waste-request';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newRequest);
        // return of(newRequest);
    }

    public wasteCategoryFormValidator = (data: CategoryDef) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;

        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {

            controlName = AppConstant.CONTROL_NAME_ENGLISH;

            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;

            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.CATEGORY_FORM, AppConstant.UI_MESSAGE_TEXT);

        componentMessage = {
            wasteCategoryTitleValidation: 'Please enter the Category Title',
            wasteCategoryCodeValidation: 'Please enter the Category Code'
        }

        if (this.categoryFormValidatorRepository.wasteCategoryValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.categoryFormValidatorRepository.wasteCategoryValidator.controlId,
                controlName: this.categoryFormValidatorRepository.wasteCategoryValidator[controlName],
                validations: []
            }
            this.categoryFormValidatorRepository.wasteCategoryValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.categoryTitle)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.categoryFormValidatorRepository.wasteCategoryValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.categoryFormValidatorRepository.wasteCodeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.categoryFormValidatorRepository.wasteCodeValidator.controlId,
                controlName: this.categoryFormValidatorRepository.wasteCodeValidator[controlName],
                validations: []
            }
            this.categoryFormValidatorRepository.wasteCodeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.categoryCode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.categoryFormValidatorRepository.wasteCodeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    categoryFormValidatorRepository: any = {

        wasteCategoryValidator: {
            controlId: 'wasteCategoryTitleValidation',
            controlNameEng: 'Category Title',
            controlNameJpn: 'Category Title',
            validators: [
                {
                    function: (wasteCategory: String) => {
                        return (wasteCategory && wasteCategory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Category Title',
                    invalidMsgJpn: 'Please enter the Category Title',
                    sampleValueEng: 'Waste',
                    sampleValueJpn: 'Waste',
                }
            ]
        },
        wasteCodeValidator: {
            controlId: 'wasteCategoryCodeValidation',
            controlNameEng: 'Category Code',
            controlNameJpn: 'Category Code',
            validators: [
                {
                    function: (wasteCode: String) => {
                        return (wasteCode && wasteCode.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Category Code',
                    invalidMsgJpn: 'Please enter the Category Code'
                }
            ]
        },
    };

    public wasteTypeFormValidator = (data: WasteTypeDef) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;

        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {

            controlName = AppConstant.CONTROL_NAME_ENGLISH;

            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;

            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_CATEGORY_FORM, AppConstant.UI_MESSAGE_TEXT);

        componentMessage = {
            wasteTypeTitleValidation: 'Please enter the Waste Type Title',
            wasteTypeCodeValidation: 'Please enter the Waste Type Code'
        }

        if (this.wasteTypeValidatorRepository.wasteTypeValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.wasteTypeValidatorRepository.wasteTypeValidator.controlId,
                controlName: this.wasteTypeValidatorRepository.wasteTypeValidator[controlName],
                validations: []
            }
            this.wasteTypeValidatorRepository.wasteTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteTypeTitle)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteTypeValidatorRepository.wasteTypeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteTypeValidatorRepository.wasteTypeCodeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteTypeValidatorRepository.wasteTypeCodeValidator.controlId,
                controlName: this.wasteTypeValidatorRepository.wasteTypeCodeValidator[controlName],
                validations: []
            }
            this.wasteTypeValidatorRepository.wasteTypeCodeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteTypeCode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteTypeValidatorRepository.wasteTypeCodeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    wasteTypeValidatorRepository: any = {

        wasteTypeValidator: {
            controlId: 'wasteTypeTitleValidation',
            controlNameEng: 'Waste Type Title',
            controlNameJpn: 'Waste Type Title',
            validators: [
                {
                    function: (wasteCategory: String) => {
                        return (wasteCategory && wasteCategory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Type Title',
                    invalidMsgJpn: 'Please enter the Waste Type Title',
                    sampleValueEng: 'Waste',
                    sampleValueJpn: 'Waste',
                }
            ]
        },
        wasteTypeCodeValidator: {
            controlId: 'wasteTypeCodeValidation',
            controlNameEng: 'Waste Type Code',
            controlNameJpn: 'Waste Type Code',
            validators: [
                {
                    function: (wasteCode: String) => {
                        return (wasteCode && wasteCode.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Type Code',
                    invalidMsgJpn: 'Please enter the Waste Type Code'
                }
            ]
        },
    };

    public wasteItemFormValidator = (data: DxrWasteItemDef) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;

        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {

            controlName = AppConstant.CONTROL_NAME_ENGLISH;

            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;

            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_ITEM_FORM, AppConstant.UI_MESSAGE_TEXT);

        componentMessage = {
            wasteItemTitleValidation: 'Please enter the Waste Item Title',
            wasteItemCodeValidation: 'Please enter the Waste Item Code',
            wasteItemUnitValidation: 'Please enter the Waste Item Unit',
            wasteItemShapeValidator: 'Please enter the Waste Item Shape',
            wasteItemPackageValidator: 'Please enter the Waste Item Package'
        }

        if (this.wasteItemValidatorRepository.wasteItemTitleValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.wasteItemValidatorRepository.wasteItemTitleValidator.controlId,
                controlName: this.wasteItemValidatorRepository.wasteItemTitleValidator[controlName],
                validations: []
            }
            this.wasteItemValidatorRepository.wasteItemTitleValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteTitle)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteItemValidatorRepository.wasteItemTitleValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteItemValidatorRepository.wasteItemUnitValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteItemValidatorRepository.wasteItemUnitValidator.controlId,
                controlName: this.wasteItemValidatorRepository.wasteItemUnitValidator[controlName],
                validations: []
            }
            this.wasteItemValidatorRepository.wasteItemUnitValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.unitDef)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteItemValidatorRepository.wasteItemUnitValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteItemValidatorRepository.wasteItemShapeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteItemValidatorRepository.wasteItemShapeValidator.controlId,
                controlName: this.wasteItemValidatorRepository.wasteItemShapeValidator[controlName],
                validations: []
            }
            this.wasteItemValidatorRepository.wasteItemShapeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteShape)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteItemValidatorRepository.wasteItemShapeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        if (this.wasteItemValidatorRepository.wasteItemPackageValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteItemValidatorRepository.wasteItemPackageValidator.controlId,
                controlName: this.wasteItemValidatorRepository.wasteItemPackageValidator[controlName],
                validations: []
            }
            this.wasteItemValidatorRepository.wasteItemPackageValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wastePackage)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteItemValidatorRepository.wasteItemPackageValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    wasteItemValidatorRepository: any = {

        wasteItemTitleValidator: {
            controlId: 'wasteItemTitleValidation',
            controlNameEng: 'Waste Title',
            controlNameJpn: 'Waste Title',
            validators: [
                {
                    function: (wasteCategory: String) => {
                        return (wasteCategory && wasteCategory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Title',
                    invalidMsgJpn: 'Please enter the Waste Item Title'
                }
            ]
        },

        wasteItemUnitValidator: {
            controlId: 'wasteItemUnitValidation',
            controlNameEng: 'Waste Unit',
            controlNameJpn: 'Waste Unit',
            validators: [
                {
                    function: (wasteUnit: String) => {
                        return (wasteUnit && wasteUnit.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Unit',
                    invalidMsgJpn: 'Please enter the Waste Item Unit'
                }
            ]
        },

        wasteItemShapeValidator: {
            controlId: 'wasteItemShapeValidator',
            controlNameEng: 'Waste Shape',
            controlNameJpn: 'Waste Shape',
            validators: [
                {
                    function: (wasteShape: String) => {
                        return (wasteShape && wasteShape.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Shape',
                    invalidMsgJpn: 'Please enter the Waste Item Shape'
                }
            ]
        },
        wasteItemPackageValidator: {
            controlId: 'wasteItemPackageValidator',
            controlNameEng: 'Waste Package',
            controlNameJpn: 'Waste Package',
            validators: [
                {
                    function: (wastePackage: String) => {
                        return (wastePackage && wastePackage.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Package',
                    invalidMsgJpn: 'Please enter the Waste Item Package'
                }
            ]
        }

    };

    // wasteItemList: WasteItemDef[] = [
    //     {
    //         wasteId: 'w01',
    //         wasteTitle: 'WoodChips',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory001',
    //     },
    //     {
    //         wasteId: 'w02',
    //         wasteTitle: 'Sowdust',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory001',
    //     },
    //     {
    //         wasteId: 'w03',
    //         wasteTitle: 'Particel Board',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory001',
    //     },
    //     {
    //         wasteId: 'w04',
    //         wasteTitle: 'WoodChips',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory002',
    //     },
    //     {
    //         wasteId: 'w05',
    //         wasteTitle: 'Sowdust',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory002',
    //     },
    //     {
    //         wasteId: 'w06',
    //         wasteTitle: 'Particel Board',
    //         wasteCode: '',
    //         unitDef: 'Pound',
    //         remarks: 'Nothing',
    //         wastecategoryId: 'wasteCategory002',
    //     }
    // ];
}
