// export interface WasteCategory {
//     wastecategoryId: string;
//     wasteCategoryTitle: string;
//     wasteCategoryCode: string;
//     remarks: string;
// }

import { Co2EmissionMethodeInfoFetch } from "./carbon-emmition";

export interface DxrWasteItemDef {
    wasteId: string;
    wasteTitle: string;
    wasteCode: string | '';
    unitDef: string;
    wasteShape: string;
    wastePackage: string;
    remarks: string;
    wasteTypeId: string;
    dumperCo2EmissionMethodeList: Co2EmissionMethodeInfoFetch[];
    dumperCo2EmissionDefaultMethodeId: string;
    processorCo2EmissionMethodeList: Co2EmissionMethodeInfoFetch[];
    processorCo2EmissionDefaultMethodeId: string;
    isNew: string
}

export interface TypeWiseWaste {
    wasteCategory: WasteTypeDef;
    wasteItems: DxrWasteItemDef[];
}

export interface WasteRequest {
    requestWasteItemId: string;
    wasteId: string;
    wasteRequestId: string;
}

export interface CategoryDef {
    categoryId: string;
    categoryTitle: string;
    categoryCode: string;
    remarks: string;
}

export interface WasteTypeDef {
    categoryId: string;
    wasteTypeId: string;
    wasteTypeTitle: string;
    wasteTypeCode: string;
    co2CoefficientValue: number;
    remarks: string;
}

export interface CompanyWasteCoefficient {
    companyId: string;
    companyName: string;
    contactNo: string;
    contactNoView: string;
    zipCode: string;
    zipCodeView: string;
    address: string;
    wasteId: string;
    wasteTitle: string;
    wasteCoefficient: number;
    companWasteProcessingMethodId: string;
}