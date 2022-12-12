import { ChartType } from "angular-google-charts";
import { BranchInfoFetch } from "./company-settings-fetch";
import { AgreementPartnerCompanyFetch, ProjectInfoFetch } from "./initiate-project-fetch";

export interface DxrGasolineTypeFetch {
    gasolineTypeId: string;
    gasolineTypeName: string;
}
export interface DxrCo2EmissionMethodeListFetch {
    dumperOperationMethodeList: Co2EmissionMethodeInfoFetch[],
    processingOperationMethodeList: Co2EmissionMethodeInfoFetch[]
}
export interface DxrWasteItemWiseCo2EmissionMethodeInfoFetch {
    wasteId: string;
    wasteItemName: string;
    wasteItemMethode: Co2EmissionMethodeInfoFetch[];
}
export interface WasteItemWiseMethodeListFetch {
    wasteItemId: string;
    dumperOperationDefaultMethodeId: string;
    processingOperationDefaultMethodeId: string;
    dumperOperationMethodeList: Co2EmissionMethodeInfoFetch[];
    processingOperationMethodeList: Co2EmissionMethodeInfoFetch[]
}
export interface Co2EmissionMethodeInfoFetch {

    methodeId: string;
    methodeTitle: string;
    description: string;
    emissionQuantityPerUnit: number;
    emimissionType: emimissionTypeInfo;
    co2EmissionVolume: number;
    isDefault: boolean;
    isCheck: boolean;
}
export interface emimissionTypeInfo {
    emimissionTypeId: string;
    emimissionTypeName: string;

}
export interface MonthWiseTotalWasteItemQuantityFetch {
    companyId: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    wasteItem: WasteItemTotalQuantity[]
}
export interface VehicleTypeSetupInfoFetch {
    vehicleTypeId: string;
    vehicleTypeName: string;
    code: string;
    description: string;
    gasolineTypeDefaultId: string;
    gasolinTypeList: GasolineCo2EmissionInfo[]

}
export interface GasolineCo2EmissionInfo {
    gasolineCo2EmissionInfoId: string;
    gasolineTypeId: string;
    unit: string;
    gasolineTypeName: string;
    co2EmissionUnit: number;
    co2FuelUnit: number;
    isDefault: boolean;
    defaultId: string;
    isCheck: boolean;
}
export interface MonthWiseCompanyVehicleFuelConsumptionFetch {
    companyId: string;
    date: string;
    month: string;
    year: string;
    monthWiseCo2Quantity: number;
    vehicleFuelConsumptionInfo: VehicleFuelConsumptionInfo[]
}
export interface VehicleFuelConsumptionInfo {
    vehicleId: string;
    vehicleName: string;
    vehicleLicenseNo: string;
    vehicleTypeId: string;
    vehicleTypeName: string;
    co2perUnit: number;
    gasolineInfo: GasolineCo2EmissionInfo;
    fuelConsumption: number;
    calculatedCo2Emission: number;
}
export interface WasteItemTotalQuantity {
    wasteId: string;
    wasteItemName: string;
    unit: string;
    totalQuantity: number;
    processCo2CalculatedQuantity: number;
    dumperCo2CalculatedQuantity: number;
    methodeInfo: Co2EmissionMethodeInfoFetch;

}


export interface MethodeWiseWasteItemCo2EmissionView {
    wasteId: string;
    wasteItemName: string;
    unit: string;
    wasteItemMethode: Co2EmissionMethodeInfoFetch[];

}
export interface WasteItemWiseDxrCo2EmissionMethodeListFetch {
    wasteId: string;
    dumperOperationMethodeList: Co2EmissionMethodeInfoFetch[],
    processingOperationMethodeList: Co2EmissionMethodeInfoFetch[]
}

export interface InputForCompanyWasteFetch {
    companyId: string;
    toDate: string;
    fromDate: string;
    monthRange: string[]
}
export interface CompanyTotalCo2QuantityView {
    totalCo2Quantity: number;
    dumperCo2Quantity: number;
    processorCo2Quantity: number;
    transPorterCo2Quantity: number;
}
export interface PrepareCo2DataView {
    monthwiseData: MonthWiseTotalWasteItemQuantityFetch,
    totalQuantity: CompanyTotalCo2QuantityView
}
export interface PrepareVehicleCo2DataView {
    monthwiseData: MonthWiseCompanyVehicleFuelConsumptionFetch[],
    totalQuantity: CompanyTotalCo2QuantityView
}

export interface WasteItemForChartView {
    wasteItemName: string;
    co2quantity: number

}


export interface ChartData {
    type: ChartType,
    data: any[],
    chartColumns: string[],
    width: number,
    height: number
}

export interface ProjectWiseWasteItemQuantityFetch {
    companyId: string;
    startMonth: string;
    startYear: string;
    endMonth: string;
    endYear: string;
    projectId: string;
    projectInfo: ProjectInfo;
    projectChart: ChartData;
    projectTranportChart: ChartData;
    processTotalQuantity: number;
    transportTotalQuantiy: number;
    transporterCo2Emission: number;
    dumperCo2Emission: number;
    totalQuantity: number;
    wasteItemList: WasteItemTotalQuantity[]
}
export interface ProjectInfo {
    initiatorCompanyId: string;
    projectInfoId: string;
    projectTitle: string;
    projectCreationDate: string;
    projectStartDate: string;
    projectEndDate: string;
    // projectCreationDateView: string;
    // projectStartDateView: string;
    // projectEndDateView: string;
    dumperPartner: AgreementPartnerCompanyFetch;
    processorPartner: AgreementPartnerCompanyFetch;
    transporterPartner: AgreementPartnerCompanyFetch;
}

export interface CO2Fetch {
    operationWiseCO2Emission: MonthWiseTotalWasteItemQuantityFetch,
    projectWiseCO2EmissionList: ProjectWiseWasteItemQuantityFetch[]
}

