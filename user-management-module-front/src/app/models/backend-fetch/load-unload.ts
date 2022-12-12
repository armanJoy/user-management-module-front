import { VehicleInfoFetch } from "./company-settings-fetch";
import { DisposalInfoFetch } from "./initiate-project-fetch";

export interface DriverTripPlan {
    tripInfoId: string;
    pickUpDate: string;
    pickUpDateView: string;
    startTime: string;
    endTime: string;
    driverId: string;
    driverName: string;
    driverLicenseNo: string;
    pickList: PickInfo[];
    vehicleInfo: VehicleInfoFetch;
    projectTitle?: string;
    agreementTitle?: string;
    isManualManifestoTrip?: boolean;
}

export interface PickInfo {
    pickId: string;
    disposalInfo: DisposalInfoFetch;
    quantity: number;
    tripId: string;
    projectTitle: string;
    projetId: string;
    loadStatus: string;
    declaredQunatity: number;
    agreementTitle?: string;
    loaderRole: string;
    loaderId: string;
    unloaderRole: string;
    unloaderId: string;
}

export interface PickGroup {
    pickLocation: PickInfo[];
}

export interface TripQrData {
    tripInfoId: string;
    pickLocation: string;
    driverCompanyId: string;
    driverId: string;
}

export interface CompanyInfo {
    companyId: string;
    companyName: string;
    companyZipCode: string;
    companyAddress: string;
    companyContact: string;
    companyEmail: string;
    personInChargeId: string;
    personInChargeName: string;
    personInChargeContact: string;
    personInChargeSeal: string;
    companySeal: string;
}

export interface CompanyTripFetch {
    date: string;
    companyId: string;
}

export interface RedirectUserInfo {
    redirectSessionId: string;
    userId: string;
    userAuth: string;
    companyId: string;
    tripQrData: string;
    redirectMenuUrlParentSegment: string;
    redirectMenuUrl: string;
    redirectMenuOutlet: string;
    userMenuAccess: string;
    selectedDate: string;
    langIndex: string;
}