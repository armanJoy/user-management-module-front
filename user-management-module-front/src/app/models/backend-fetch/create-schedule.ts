
import { DisposalInfoFetch } from "./initiate-project-fetch";

export interface OverlapedTrip {
    tripDate: string;
    tripStartTime: string;
    tripEndTime: string;
    vehicleId: string;
}

export interface VehicleInfoViewMatrix {
    vehicleInfo: VehicleInfoFetch,
    tripPlan: TripPlanFetch[],
}
export interface TripPlanFetch {
    date: string;
    companyId: string;
    tripList: TripInfo[];
    totalOpenMinute: number;
    openHour: number;
    openMinute: number;

}
export interface TripInfo {
    companyId: string;
    tripInfoId: string;
    pickUpDate: string;
    startTime: string;
    endTime: string;
    startTimeView: string
    endTimeView: string;
    driverId: string;
    driverName: string;
    vehicleId: string;
    vehicleName: string;
    pickList: PickInfo[];
    // previousDriverId: string;
    // previousDriverName: string;
}
export interface VehicleInfoFetch {
    companyId: string;
    vehicleId: string,
    frontendDate: string,
    backendDate: string,
    manufacturerName: string,
    vehicleType: string,
    modelName: string,
    vehicleRegNo: string,
    vehicleCapacity: number,
    vehicleLoadQuantity: number;
    vehicleFreeSpace: number;
    vehicleWeight: string,
    gasolineType: Array<string>,
    inspectionDate: string,
    vehicleOwnerShip: Array<string>,
    openHour: string;
    remarks: string;
    previousDriverId: string;
    previousDriverName: string;
    active: boolean

}
export interface DriverInfoFetch {
    companyId: string;
    userIdentificationId: string;
    userInfoId: string;
    officeContactNo: string;
    userName: string;
    userAddress: string;
    userEmail: string;
    userContactNo: string;
    licenseNo: string;
}
export interface PickInfo {
    pickId: string;
    disposalId: string;
    quantity: number;
    tripId: string;
    disposalInfo: DisposalInfoFetch;
    loadStatus: string;
    isNew?: boolean | false;
}
export interface DisposeWisePickInfo {
    pickId: string;
    disposalId: string;
    quantity: number;
    tripInfo: TripInfoOfPick;
}

export interface TripInfoOfPick {
    tripInfoId: string;
    pickUpDate: string;
    startTime: string;
    endTime: string;
    driverId: string;
    driverName: string;
    vehicleId: string;
    vehicleName: string;
    vehicleLicenseNo: string;

}
// export interface ParameterForDisposeWisePickInfoFetch {
//     companyId: string;
//     dateList: string[]
// }
export interface ParameterForTripPlanFetch {
    companyId: string;
    dateList: string[]
}
export interface DateArrayView {
    date: string;
}
export interface BackEndToFrontendConvertFetch {
    frontendDate: string;
    frontendDateView: string;
    backendDate: string;
}
export interface AddTripPopupData {
    driverList: DriverInfoFetch[],
    diposalInfo: DisposalInfoFetch,
    selectedDay: BackEndToFrontendConvertFetch,
    vehicleInfo: VehicleInfoFetch,
    tripInfo: TripInfo;
    pickInfo: PickInfo;
    existingTripData?: TripInfo | null;
    pickList?: PickInfo[]
}
export interface DriverBandView {
    driverId: string;
    driverName: string;
    tripList: TripInfo[]
}
export interface ProjectStatusUpdate {
    projectInfoId: string;
    status: string;
}
export interface DateInput {
    date: string;
}