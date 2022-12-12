import { Injectable } from '@angular/core';
import { DriverInfoFetch, VehicleInfoFetch, TripPlanFetch, TripInfo, ParameterForTripPlanFetch, PickInfo, BackEndToFrontendConvertFetch, DisposeWisePickInfo, ProjectStatusUpdate, OverlapedTrip } from 'src/app/models/backend-fetch/create-schedule';
import { Observable } from 'rxjs';
import { CompanyProjectFetch, DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../visitor-services/uri.service';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { UtilService } from '../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})

export class CreateScheduleOperationService {

    constructor(private uriService: UriService, private utilService: UtilService) { }

    removeTrip(tripId: string): Observable<TripInfo> {
        var url = "/project-schedule/remove-trip";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripId);
    }

    findOverLappedTrip(overlapedTrip: OverlapedTrip): Observable<TripInfo> {
        var url = "/project-schedule/overlapped-trip";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, overlapedTrip);
    }

    removePick(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/project-schedule/remove-pick";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    removePickAndTrip(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/project-schedule/remove-pick-trip";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {

        var url = '/project-schedule/set-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, NotificationSetInfo);
    }

    isAllDisposeConfirmed(disposalList: DisposalInfoFetch[]) {
        var confirm = true;
        disposalList.forEach(each => {
            if (each.scheduleConfirmStatus == AppConstant.DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE) {
                confirm = false;
            }
        });

        return confirm;
    }

    getTrasnporterCompanyId(project: ProjectInfoFetch): string {
        var transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
        return (project.transporterPartner && project.transporterPartner.companyInfoId && project.transporterPartner.assignRoles == transporterCompanyTitle) ? project.transporterPartner.companyInfoId : ((project.processorPartner && project.processorPartner.companyInfoId && project.processorPartner.assignRoles == transporterCompanyTitle) ? project.processorPartner.companyInfoId : (project.dumperPartner && project.dumperPartner.companyInfoId && project.dumperPartner.assignRoles == transporterCompanyTitle) ? project.dumperPartner.companyInfoId : "");
    }

    getDisposalWisePickInfoList(project: ProjectInfoFetch, callBack: any) {
        var count = 0;
        if (project.wasteDisposalInfo && project.wasteDisposalInfo.length > 0) {
            project.wasteDisposalInfo.forEach(disposalInfo => {
                this.getDisposalWisePickList(disposalInfo.disposalInfoId).subscribe((data) => {
                    if (data) {
                        disposalInfo.disposeWisePickList = data;

                    }
                    count++;
                    if (count == project.wasteDisposalInfo.length) {
                        callBack();
                    }
                })
            });
        } else {
            callBack();
        }
    }

    prepareDisposalWisePickView(project: ProjectInfoFetch, driverList: DriverInfoFetch[], vehicleList: VehicleInfoFetch[]): ProjectInfoFetch {
        project.wasteDisposalInfo.forEach(disposal => {
            disposal.disposeWisePickList.forEach(disposeWisePick => {
                disposeWisePick.tripInfo.driverName = this.getDriverNameService(disposeWisePick.tripInfo.driverId, driverList);
                disposeWisePick.tripInfo.vehicleName = this.getVehicleNameService(disposeWisePick.tripInfo.vehicleId, vehicleList);
                disposeWisePick.tripInfo.vehicleLicenseNo = this.getVehicleLicenceService(disposeWisePick.tripInfo.vehicleId, vehicleList);
                disposeWisePick.tripInfo.pickUpDate = this.prepareDateView(disposeWisePick.tripInfo.pickUpDate)

            });
        });
        return project;
    }

    getDriverNameService(driverId: string, driverList: DriverInfoFetch[]): string {
        var index;
        index = driverList.findIndex(item => item.userInfoId == driverId);
        if (index >= 0) {
            return driverList[index].userName;
        }
        else
            return "";
    }

    getVehicleNameService(vehicleId: string, vehicleList: VehicleInfoFetch[]): string {
        var index = -1;
        index = vehicleList.findIndex(item => item.vehicleId == vehicleId);
        if (index >= 0) {
            return vehicleList[index].modelName;
        }
        else
            return "";
    }

    getVehicleLicenceService(vehicleId: string, vehicleList: VehicleInfoFetch[]): string {

        var index = -1;
        index = vehicleList.findIndex(item => item.vehicleId == vehicleId);
        if (index >= 0) {
            return vehicleList[index].vehicleRegNo;
        }
        else
            return "";

    }

    groupDisposepickByDate(disposalList: DisposalInfoFetch[]) {

        var dateWiseDisposePickList: any[] = [];
        disposalList.forEach(element => {
            var dateWiseDisposePickItem: any = {
                disposeInfo: element,
                groupedPickList: []
            };

            var preparedPick = this.groupBy(element.disposeWisePickList, 'pickUpDate');



            for (const [key, value] of Object.entries(preparedPick)) {
                var dateWisePick: any = {
                    date: key,
                    picks: value
                }
                dateWiseDisposePickItem.groupedPickList.push(dateWisePick);


            }

            dateWiseDisposePickList.push(dateWiseDisposePickItem);
        });

        return dateWiseDisposePickList;
    }

    groupBy(xs: any[], key: string): any {

        return xs.reduce(function (rv, x) {
            (rv[x.tripInfo[key]] = rv[x.tripInfo[key]] || []).push(x);
            return rv;
        }, {});
    }

    prepareDisposalViewId(disposalList: DisposalInfoFetch[]): DisposalInfoFetch[] {
        disposalList.forEach(disposal => {
            var id: number = 0;
            if (disposal.isParent) {
                id++;
                disposal.disposalViewId = "" + id;
                disposalList.forEach(child => {
                    if (disposal.collectionId == child.collectionId && !child.isParent) {
                        id++;
                        child.disposalViewId = "" + id;
                    }

                });
            }

        });
        disposalList = this.prepareDateViewOfProjectDisposalList(disposalList);
        return disposalList;
    }

    prepareDateViewOfProjectDisposalList(disposalList: DisposalInfoFetch[]): DisposalInfoFetch[] {
        disposalList.forEach(disposal => {
            disposal.fromDateView = this.prepareDisposalStartOrEndDateView(disposal.fromDate);
            disposal.toDateView = this.prepareDisposalStartOrEndDateView(disposal.toDate);
        });
        return disposalList;
    }

    prepareDisposalStartOrEndDateView(date: string): string {
        var viewDate: string = "";
        var flag = false;
        for (var i = 0; i < date.length; i++) {
            if (date[i] == " ") {
                break;
            }
            viewDate += date[i];
        }
        return viewDate;
    }

    selectedProjectIdFromInitiateProjectMenu: ProjectInfoFetch = {} as ProjectInfoFetch;
    isRedirectedFromInitiateProjectMenu: boolean = false;

    setSelectedProjectIdFromInitiateProjectMenu(projectId: ProjectInfoFetch) {
        this.selectedProjectIdFromInitiateProjectMenu = projectId;
    }

    getSelectedProjectIdFromInitiateProjectMenu(): ProjectInfoFetch {
        return this.selectedProjectIdFromInitiateProjectMenu;
    }

    getIsRedirectedFromInitiateProjectMenu() {
        return this.isRedirectedFromInitiateProjectMenu;
    }

    setIsRedirectedFromInitiateProjectMenu(state: boolean) {
        this.isRedirectedFromInitiateProjectMenu = state;
    }

    updateProjectStatus(projectStatusUpdate: ProjectStatusUpdate): Observable<string> {
        var url = '/project-schedule/save-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectStatusUpdate);
    }

    confirmDisposeSchedule(disposalInfoId: string): Observable<string> {
        var url = '/project-schedule/confirm-disposal-schedule';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, disposalInfoId);
    }

    saveTrip(tripInfo: TripInfo): Observable<TripInfo> {
        var url = '/project-schedule/save-trip-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, tripInfo);
    }

    savePick(pickInfo: PickInfo): Observable<PickInfo> {
        var url = '/project-schedule/save-pick-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickInfo);
    }

    getTimeValidatation(time: string): Observable<string> {
        var url = '/project-schedule/time-validatation';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, time);
    }

    // public getProjectList(companyId: string): Observable<CompanyProjectFetch> {
    //     // return of(this.initiateProjectFetchData.companyProjectList);
    //     var url = '/project-schedule/schedule-project-list';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    // }

    public getProjectList(companyId: string, pageNo: number, searchText: string): Observable<CompanyProjectFetch> {
        var url = '/project-schedule/schedule-project-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText);
    }

    getDriverList(companyId: string): Observable<DriverInfoFetch[]> {
        var url = '/project-schedule/driver-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    getVehicleList(companyId: string): Observable<VehicleInfoFetch[]> {
        var url = '/project-schedule/vehicle-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    getDisposalInfo(disosalId: string): Observable<DisposalInfoFetch> {
        var url = '/project-schedule/disposal-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, disosalId);
    }

    getDatewiseTripList(parameterForTripPlanFetch: ParameterForTripPlanFetch): Observable<TripPlanFetch[]> {
        var tripList: TripPlanFetch[] = [];
        parameterForTripPlanFetch.dateList.forEach(date => {
            this.tripPlanList.forEach(trip => {
                if (trip.date == date) {
                    tripList.push(trip);
                }
            });

        });
        var url = '/project-schedule/trip-plan-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, parameterForTripPlanFetch);
    }

    getDisposalWisePickList(disposalId: string): Observable<DisposeWisePickInfo[]> {
        var url = '/project-schedule/disposal-wise-pick-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, disposalId);
    }

    getDriverName(driverId: string, driverList: DriverInfoFetch[]): string {
        var index;
        index = driverList.findIndex(item => item.userInfoId == driverId);
        if (index >= 0) {
            return driverList[index].userName;
        }
        else
            return "";
    }

    getVehicleName(vehicleId: string): string {
        var index = -1;
        index = this.vehicleList.findIndex(item => item.vehicleId == vehicleId);
        if (index >= 0) {
            return this.vehicleList[index].modelName;
        }
        else
            return "";
    }

    getVehicleLicenseNo(vehicleId: string): string {
        var index = -1;
        index = this.vehicleList.findIndex(item => item.vehicleId == vehicleId);
        if (index >= 0) {
            return this.vehicleList[index].vehicleRegNo;
        }
        else
            return "";
    }

    getDateForFrontend(dateArrayList: BackEndToFrontendConvertFetch[]): Observable<BackEndToFrontendConvertFetch[]> {
        var url = '/project-schedule/date-converter';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, dateArrayList);
    }

    prepareTimeFormate(backendTime: string): string {
        var frontendTime: string = "";
        for (var i = 0; i < backendTime.length; i++) {
            frontendTime += backendTime[i];
            if (i == 1)
                frontendTime += ":";
        }
        return frontendTime;
    }

    prepareDateView(date: string): string {
        var viewDate: string = "";
        var flag = false;
        for (var i = 0; i < date.length; i++) {
            if (date[i] == " ") {
                break;
            }
            viewDate += date[i];
        }
        return viewDate;
    }

    prepareDateViewFromBackendDate(date: string): string {
        var viewDate: string = "";
        var flag = false;
        for (var i = 0; i < date.length; i++) {
            if (i == 8) {
                break;
            }
            viewDate += date[i];
            if (i == 3 || i == 5)
                viewDate += "/";
        }
        return viewDate
    }

    disposeWisePickList: DisposeWisePickInfo[] = [];
    driverList: DriverInfoFetch[] = [];
    tripPlanList: TripPlanFetch[] = []
    vehicleList: VehicleInfoFetch[] = []

}
