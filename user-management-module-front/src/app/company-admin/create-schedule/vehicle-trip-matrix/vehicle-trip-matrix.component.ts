import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

import { VehicleInfoFetch, VehicleInfoViewMatrix, DriverInfoFetch, AddTripPopupData, TripPlanFetch, TripInfo, PickInfo, DriverBandView, BackEndToFrontendConvertFetch } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { MatDialog } from '@angular/material/dialog';
import { AddTripPopupComponent } from '../add-trip-popup/add-trip-popup.component';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { TripDetailsPopupComponent } from '../trip-details-popup/trip-details-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';

@Component({
    selector: 'app-vehicle-trip-matrix',
    templateUrl: './vehicle-trip-matrix.component.html',
    styleUrls: ['./vehicle-trip-matrix.component.css']
})

export class VehicleTripMatrixComponent implements OnInit {

    @Input()
    public confirmDisposeSchedule!: (disposalInfoId: string) => void;

    @Input()
    public planQuantityUpdate!: (planQuantity: number) => void;

    @Input()
    column: VehicleInfoViewMatrix[] = [];

    @Input()
    row: BackEndToFrontendConvertFetch[] = [];

    @Input()
    disposalInfo!: DisposalInfoFetch;

    @Input()
    driverList: DriverInfoFetch[] = [];

    @Input()
    public updateDisposeWisePickList!: (tripInfo: TripInfo, pickInfo: PickInfo[], disposeId: string, isRemoved: boolean, removedPicks?: string[]) => void;

    driverBandViewList: DriverBandView[] = [];
    componentCode!: string;

    isSystemAdmin: boolean = false;


    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private languageService: LanguageService, private utilService: UtilService, private createScheduleOperationService: CreateScheduleOperationService) { }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_TRIP_MATRIX, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VEHICLE_TRIP_MATRIX;

        // this.removeUnnecesseryTrips();

    }
    uiLabels: any = {
        date: "Date",
        Vehicle: "Vehicle",
        openHour: "Open Hour",
        addTripBtn: "Add Trip",
        Details: "Details",
        trips: "Trip List",
        addPickBtn: "Add Pick"
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    TECHDISER_COMPONENT_NAME = "commonMatrixCardDirectiveCtrl";
    TECHDISER_SERVICE_INFO = {};
    loadViewContent = true;

    VehicleMatrix: any = {
        vehicleInfo: {
            companyId: '',
            vehicleId: '',
            frontendDate: '',
            backendDate: '',
            manufacturerName: '',
            vehicleType: '',
            modelName: '',
            vehicleRegNo: '',
            vehicleCapacity: '',
            vehicleWeight: '',
            gasolineType: '',
            inspectionDate: '',
            vehicleOwnerShip: [],
            openHour: '',
            remarks: '',
        },
        tripPlan: [
            {
                date: "",
                tripList: [
                    {
                        tripInfoId: '',
                        pickUpDate: '',
                        startTime: '',
                        endTime: '',
                        driverId: '',
                        pickList: [
                            {
                                pickId: '',
                                disposalId: '',
                                quantity: 0,
                                tripId: '',
                            },
                            {
                                pickId: '',
                                disposalId: '',
                                quantity: 0,
                                tripId: '',
                            }
                        ],
                        vehicleId: '',

                    }
                ]
            }
        ]
    }

    addTripPopupData: AddTripPopupData = {
        driverList: [],
        diposalInfo: {} as DisposalInfoFetch,
        selectedDay: {} as BackEndToFrontendConvertFetch,
        vehicleInfo: {} as VehicleInfoFetch,
        tripInfo: {
            companyId: "",
            tripInfoId: "",
            pickUpDate: "",
            startTime: "",
            endTime: "",
            startTimeView: "",
            endTimeView: "",
            driverId: "",
            driverName: "",
            vehicleId: "",
            vehicleName: "",
            pickList: []
        },
        pickInfo: {
            pickId: "",
            disposalId: "",
            quantity: 0,
            tripId: "",
            disposalInfo: {
                transportDistance: 0,
                projectId: "",
                projectTitle: "",
                disposalInfoId: "",
                disposalViewId: "",
                collectionId: "",
                fromDate: "",
                startBackendDate: "",
                toDate: "",
                endBackendDate: "",
                fromDateView: "",
                toDateView: "",
                quantity: 0,
                planQuantity: 0,
                remainingQuantity: 0,
                wasteTypeId: "",
                wasteTypeName: "",
                wasteItemId: "",
                wasteItemName: "",
                pickLocation: "",
                pickZipCode: "",
                dropLocation: "",
                dropZipCode: "",
                isParent: false,
                unit: "",
                price: 0,
                disposeWisePickList: [],
                scheduleConfirmStatus: "0",
                wasteShape: '',
                wastePackage: ''

            },
            loadStatus: "0"
        }
    }

    prepareAddTripPopupData(vehicleInfo: VehicleInfoFetch, selectDate: BackEndToFrontendConvertFetch, driverList: DriverInfoFetch[], disposalInfo: DisposalInfoFetch) {

        this.addTripPopupData.driverList = driverList;

        this.addTripPopupData.diposalInfo = disposalInfo;

        this.addTripPopupData.selectedDay = selectDate;

        this.addTripPopupData.vehicleInfo = vehicleInfo;

        this.addTripPopupData.tripInfo = this.prepareTripInfo(vehicleInfo, selectDate);

        this.addTripPopupData.pickInfo = this.preparePick(disposalInfo, this.addTripPopupData.tripInfo.tripInfoId);

    }

    prepareTripInfo(vehicleInfo: VehicleInfoFetch, selectDate: BackEndToFrontendConvertFetch) {
        var tripInfo: TripInfo = {
            tripInfoId: this.utilService.generateUniqueId(),
            pickUpDate: selectDate.backendDate,
            companyId: vehicleInfo.companyId,
            vehicleId: vehicleInfo.vehicleId,
            driverId: "",
            driverName: "",
            endTime: "",
            endTimeView: "",
            // pickList:[],
            pickList: [],
            startTime: "",
            startTimeView: "",
            vehicleName: "",
        }

        return tripInfo;

    }

    preparePick(disposalInfo: DisposalInfoFetch, tripId: string) {
        var pickInfo: PickInfo = {
            pickId: this.utilService.generateUniqueId(),
            disposalId: disposalInfo.disposalInfoId,
            tripId: tripId,
            quantity: 0,
            disposalInfo: disposalInfo,
            loadStatus: ''
        }
        return pickInfo;

    }

    updateTripAndPick(vehicleTrips: VehicleInfoViewMatrix, savedTrip: TripInfo, newPickList: PickInfo[], removedPickIds: string[], allPicks: PickInfo[]): VehicleInfoViewMatrix {

        var index = -1;
        var index1 = -1;

        index = vehicleTrips.tripPlan.findIndex(item => item.date == savedTrip.pickUpDate);
        debugger
        if (vehicleTrips.tripPlan[index].tripList && vehicleTrips.tripPlan[index].tripList.length > 0) {
            index1 = vehicleTrips.tripPlan[index].tripList.findIndex(item => item.tripInfoId == savedTrip.tripInfoId);
        }
        if (index >= 0 && index1 >= 0) {
            // var existingPickList: PickInfo[] = JSON.parse(JSON.stringify(vehicleTrips.tripPlan[index].tripList[index1].pickList));
            // var updatedPickList: PickInfo[] = existingPickList.concat(newPickList);

            // if (removedPickIds && removedPickIds.length > 0) {
            //     removedPickIds.forEach(eachRemovedPickId => {
            //         var pickIndex = allPicks.findIndex(item => item.pickId == eachRemovedPickId);

            //         if (pickIndex >= 0) {
            //             allPicks.splice(pickIndex, 1);
            //         }

            //     });
            // }

            savedTrip.pickList = JSON.parse(JSON.stringify(allPicks));
            vehicleTrips.tripPlan[index].tripList[index1] = savedTrip;

        } else if (index >= 0) {
            savedTrip.pickList = JSON.parse(JSON.stringify(allPicks));
            vehicleTrips.tripPlan[index].tripList.push(savedTrip);
        }

        return vehicleTrips;
    }

    updateColumnData(vehicleTrips: VehicleInfoViewMatrix) {
        var vehicleNo = -1;
        vehicleNo = this.column.findIndex(item => item.vehicleInfo.vehicleId == vehicleTrips.vehicleInfo.vehicleId);
        this.column[vehicleNo] = vehicleTrips;
        this.column[vehicleNo].tripPlan.forEach(tripInfo => {

            tripInfo.tripList.sort((a, b) => <any>new Date(a.startTime) - <any>new Date(b.startTime));

        });
    }

    prepareDateWiseOpenHourOfVehicle(column: VehicleInfoViewMatrix, row: BackEndToFrontendConvertFetch): VehicleInfoViewMatrix {

        column.tripPlan.forEach(element => {
            if (element.date == row.backendDate) {
                element.totalOpenMinute = 900;
                var totalTripTime: number = 0;
                element.tripList.forEach(trip => {
                    var startTime: number = 0;
                    var endTime: number = 0;
                    var digit: number = 0;
                    for (var i = 0; i < trip.startTime.length; i++) {
                        if (i == 0) {
                            digit += Number(trip.startTime[i]);
                        }
                        else if (i == 1) {
                            digit = 10 * digit + Number(trip.startTime[i]);
                            startTime = digit * 60;
                            digit = 0;
                        }
                        else if (i == 2) {
                            digit += Number(trip.startTime[i]);
                        }
                        else if (i == 3) {
                            digit = 10 * digit + Number(trip.startTime[i]);
                            startTime += digit;
                        }

                    }
                    var digit: number = 0;
                    for (var i = 0; i < trip.endTime.length; i++) {
                        if (i == 0) {
                            digit += Number(trip.endTime[i]);
                        }
                        else if (i == 1) {
                            digit = 10 * digit + Number(trip.endTime[i]);
                            endTime = digit * 60;
                            digit = 0;
                        }
                        else if (i == 2) {
                            digit += Number(trip.endTime[i]);
                        }
                        else if (i == 3) {
                            digit = 10 * digit + Number(trip.endTime[i]);
                            endTime += digit;
                        }

                    }
                    totalTripTime += (endTime - startTime);

                });
                element.totalOpenMinute = element.totalOpenMinute - totalTripTime;
                element.openMinute = element.totalOpenMinute % 60;
                if (element.openMinute > 0) {
                    element.totalOpenMinute = element.totalOpenMinute - element.openMinute;
                }
                element.openHour = element.totalOpenMinute / 60;

            }

        });
        return column;
    }

    prepareDriverScheduleData(data: BackEndToFrontendConvertFetch): DriverBandView[] {
        var driverBandViewList: DriverBandView[] = [];
        this.driverList.forEach(driver => {
            var driverBandView: DriverBandView = {
                driverId: "",
                driverName: "",
                tripList: []
            }
            driverBandView.driverId = driver.userInfoId;
            driverBandView.driverName = driver.userName;
            this.column.forEach(column => {
                column.tripPlan.forEach(trip => {
                    if (trip.date == data.backendDate) {
                        trip.tripList.forEach(tripInfo => {
                            if (tripInfo.driverId == driverBandView.driverId) {
                                driverBandView.tripList.push(tripInfo);
                            }
                        });
                    }
                });
            });
            driverBandViewList.push(driverBandView);
        });
        return driverBandViewList;
    }

    prepareDisposalPick(tripInfo: TripInfo, disposalId: string): PickInfo[] {
        var pickList: PickInfo[] = tripInfo.pickList.filter(pick => {
            pick.disposalId == disposalId;
        });

        return pickList;
    }

    getTripFromTripPlan(tripList: TripInfo[], tripId: string) {
        var tripInfo: any = tripList.find((item) => item.tripInfoId == tripId)
        // var tripInfo: any = (index >= 0) ? tripList[index] : undefined;

        if (tripInfo && tripInfo.pickList) {
            tripInfo.pickList.forEach((eachPick: PickInfo) => {
                eachPick.isNew = false;
            });
        }

        return tripInfo;
    }

    editTrip = (tripId: string, tripList: TripInfo[], vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) => {

        this.prepareAddTripPopupData(vehicleTrips.vehicleInfo, date, this.driverList, this.disposalInfo);
        var tripPlanForDate: TripPlanFetch = this.prepareDetailPopupData(vehicleTrips, date);
        var tripInfo = this.getTripFromTripPlan(tripPlanForDate.tripList, tripId)
        this.addTripPopupData.tripInfo = tripInfo ? JSON.parse(JSON.stringify(tripInfo)) : this.addTripPopupData.tripInfo;
        this.addTripPopupData.pickInfo.quantity = (this.addTripPopupData.tripInfo.pickList.length > 0) ? this.addTripPopupData.tripInfo.pickList[this.addTripPopupData.tripInfo.pickList.length - 1].quantity : this.addTripPopupData.pickInfo.quantity;

        this.driverBandViewList = this.prepareDriverScheduleData(date);
        const dialogRef = this.matDialog.open(AddTripPopupComponent, {
            width: "100%",
            data: {
                addTrip: this.addTripPopupData,
                driverView: this.driverBandViewList,
                editPopup: true,
                vehicleTrips: vehicleTrips,
                date: date,
                // companyVehicleList: this.column.map(item => item.vehicleInfo)
            },

            disableClose: true
        });

        dialogRef.afterClosed().subscribe((response: any) => {

            var pickInfoOfThisTrip: PickInfo = {} as PickInfo;
            if (tripInfo.pickList.length > 0) {
                pickInfoOfThisTrip = JSON.parse(JSON.stringify(tripInfo.pickList[0]));
            }

            if (response) {

                if (response.toSave) {

                    var finalAddQuantityAfterRemove = this.calculateUpdateQuntity(response.removedPickIds, response.popupData.tripInfo);

                    this.saveTripAndPick(response.popupData, vehicleTrips, date, response.removedPickIds, (savedTrip: TripInfo) => {
                        this.updateOtherTabsViewData(vehicleTrips, response.removedPickIds, savedTrip, finalAddQuantityAfterRemove);
                    });

                }

            }
        })
    }


    updateOtherTabsViewData = (vehicleTrips: VehicleInfoViewMatrix, removedPickIds: string[], savedTrip: TripInfo, finalAddQuantityAfterRemove: number) => {

        this.updateColumnData(vehicleTrips);
        this.updateDisposalQuantityForRemovePick(finalAddQuantityAfterRemove);

        var index = -1;
        var index1 = -1
        index = vehicleTrips.tripPlan.findIndex(item => item.date == savedTrip.pickUpDate);

        if (index >= 0 && vehicleTrips.tripPlan[index].tripList.length > 0) {
            index1 = vehicleTrips.tripPlan[index].tripList.findIndex(item => item.tripInfoId == savedTrip.tripInfoId);
        }


        if (index >= 0 && index1 >= 0) {
            var tripInfo = vehicleTrips.tripPlan[index].tripList[index1];

            this.updateDisposeWisePickList(tripInfo, tripInfo.pickList, this.disposalInfo.disposalInfoId, true, removedPickIds);
        }
    }

    onClickAddTrip(vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) {
        this.prepareAddTripPopupData(vehicleTrips.vehicleInfo, date, this.driverList, this.disposalInfo);

        this.driverBandViewList = this.prepareDriverScheduleData(date);
        const dialogRef = this.matDialog.open(AddTripPopupComponent, {
            width: "100%",
            data: {
                addTrip: this.addTripPopupData,
                driverView: this.driverBandViewList,
                editPopup: false,
                vehicleTrips: vehicleTrips,
                date: date,
                // companyVehicleList: this.column.map(item => item.vehicleInfo)
            },

            disableClose: true
        });

        dialogRef.afterClosed().subscribe(response => {
            if (response) {

                var finalAddQuantityAfterRemove = this.calculateUpdateQuntity(response.removedPickIds, response.popupData.tripInfo);

                this.saveTripAndPick(response.popupData, vehicleTrips, date, response.removedPickIds, (savedTrip: TripInfo) => {
                    this.updateOtherTabsViewData(vehicleTrips, response.removedPickIds, savedTrip, finalAddQuantityAfterRemove);
                });
            }
        });
    }

    calculateUpdateQuntity(removedPickIds: string[], tripInfo: TripInfo) {
        var removedPicksQuantity = this.calculateRemovedPickQuantity(removedPickIds, tripInfo);
        var newPicks: PickInfo[] = tripInfo.pickList.filter((item: PickInfo) => item.isNew == true);
        var newPicksQuantity = 0;
        newPicks.forEach(each => {
            newPicksQuantity += each.quantity;
        })
        var finalAddQuantityAfterRemove = newPicksQuantity - removedPicksQuantity;

        return finalAddQuantityAfterRemove;
    }

    removeTrip = (tripList: TripInfo[], tripId: string) => {

        if (tripList && tripId) {
            var tripIndex = tripList.findIndex(trip => trip.tripInfoId == tripId);

            if (tripIndex >= 0) {
                tripList.splice(tripIndex, 1);
            }
        }
    }

    removePick = (removedPickIds: string[], tripInfo: TripInfo) => {
        if (removedPickIds && removedPickIds.length > 0 && tripInfo.pickList && tripInfo.pickList.length > 0) {
            removedPickIds.forEach((eachRemovedPickId: string) => {
                var pickIndex = tripInfo.pickList.findIndex((eachPick: PickInfo) => eachPick.pickId == eachRemovedPickId);

                if (pickIndex >= 0) {
                    tripInfo.pickList.splice(pickIndex, 1);

                }
            })
        }
    }

    calculateRemovedPickQuantity = (removedPickIds: string[], tripInfo: TripInfo) => {
        var removedPicksQuantity = 0;

        if (removedPickIds && removedPickIds.length > 0 && tripInfo.pickList && tripInfo.pickList.length > 0) {
            removedPickIds.forEach((eachRemovedPickId: string) => {
                var pickIndex = tripInfo.pickList.findIndex((eachPick: PickInfo) => eachPick.pickId == eachRemovedPickId);

                if (pickIndex >= 0) {
                    removedPicksQuantity += tripInfo.pickList[pickIndex].quantity;

                }
            })
        }

        return removedPicksQuantity;
    }

    saveTripAndPick = (result: any, vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch, removedPickIds: string[], callBack: any) => {
        var tripInfoForSave: TripInfo = (result.existingTripData) ? result.existingTripData : result.tripInfo;

        this.createScheduleOperationService.saveTrip(tripInfoForSave).subscribe((savedTrip) => {

            if (savedTrip) {

                result.pickInfo.tripId = savedTrip.tripInfoId;
                var newPicks: PickInfo[] = result.tripInfo.pickList.filter((item: PickInfo) => item.isNew == true);
                this.savePicks(result.tripInfo.pickList, savedTrip.tripInfoId, (newPicksQuantity: number) => {
                    this.removePickFromBackend(removedPickIds, savedTrip, () => {

                        savedTrip.startTimeView = this.createScheduleOperationService.prepareTimeFormate(savedTrip.startTime);
                        savedTrip.endTimeView = this.createScheduleOperationService.prepareTimeFormate(savedTrip.endTime);
                        savedTrip.driverName = this.createScheduleOperationService.getDriverNameService(savedTrip.driverId, this.driverList);
                        vehicleTrips.vehicleInfo.previousDriverId = savedTrip.driverId;
                        vehicleTrips.vehicleInfo.previousDriverName = savedTrip.driverName;

                        vehicleTrips = this.updateTripAndPick(vehicleTrips, savedTrip, newPicks, removedPickIds, result.tripInfo.pickList);

                        vehicleTrips = this.prepareDateWiseOpenHourOfVehicle(vehicleTrips, date);

                        callBack(savedTrip);
                    })
                })

            }
        });
    }

    savePicks(pickList: PickInfo[], tripId: string, callBack: any) {
        var newPickQuantity = 0;
        if (pickList && pickList.length > 0) {
            var callBackCount = 0;

            pickList.forEach(eachPick => {

                eachPick.tripId = tripId;
                this.createScheduleOperationService.savePick(eachPick).subscribe((savedPick) => {
                    if (savedPick) {

                    }

                    callBackCount++;
                    newPickQuantity += savedPick.quantity;
                    if (callBackCount == pickList.length) {
                        callBack(newPickQuantity);
                    }

                });

            })
        } else {
            callBack(newPickQuantity);
        }
    }

    removePickFromBackend(removedPickIds: string[], tripInfo: TripInfo, callBack: any) {
        if (removedPickIds && removedPickIds.length > 0) {
            var callBackCount = 0;
            removedPickIds.forEach(eachPickId => {
                var removeTriggerData: RemoveTriggerData = {
                    itemeId: eachPickId.concat(",").concat(tripInfo.tripInfoId),
                    triggerUserId: this.utilService.getUserIdCookie(),
                    triggerCompanyId: this.utilService.getCompanyIdCookie(),
                    removeOperationType: AppConstant.PICK_REMOVE_OPERATION
                }

                this.createScheduleOperationService.removePickAndTrip(removeTriggerData).subscribe(response => {

                    if (response) {

                    }
                    callBackCount++;
                    if (callBackCount == removedPickIds.length) {
                        callBack();
                    }
                });
            })
        } else {
            callBack();
        }

    }

    updateDisposalQuantity = (pick: PickInfo) => {

        this.disposalInfo.planQuantity += pick.quantity;
        this.planQuantityUpdate(this.disposalInfo.planQuantity);
        this.disposalInfo.remainingQuantity = this.disposalInfo.quantity - this.disposalInfo.planQuantity;

        this.confirmDisposal();
    }

    updateDisposalQuantityForRemovePick = (finalAddQuantityAfterRemove: number) => {

        this.disposalInfo.planQuantity += finalAddQuantityAfterRemove;
        this.planQuantityUpdate(this.disposalInfo.planQuantity);
        this.disposalInfo.remainingQuantity = this.disposalInfo.quantity - this.disposalInfo.planQuantity;

        this.confirmDisposal();
    }

    confirmDisposal() {

        if (this.disposalInfo.planQuantity >= this.disposalInfo.quantity) {
            this.confirmDisposeSchedule(this.disposalInfo.disposalInfoId);
        }
    }

    prepareDetailPopupData(vehicleTrips: VehicleInfoViewMatrix, selectDate: BackEndToFrontendConvertFetch): TripPlanFetch {
        var tripPlan: TripPlanFetch = {} as TripPlanFetch;
        vehicleTrips.tripPlan.forEach(item => {
            if (item.date == selectDate.backendDate) {
                tripPlan = item;
            }
        });
        return tripPlan;
    }

    onClickDetailsBtn(vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) {
        var vehicleName: string = vehicleTrips.vehicleInfo.manufacturerName;
        var tripPlanForDate: TripPlanFetch = this.prepareDetailPopupData(vehicleTrips, date);
        const dialogRef = this.matDialog.open(TripDetailsPopupComponent, {
            width: '65%',
            data: {
                trip: tripPlanForDate,
                vehicle: vehicleName,
                driverList: this.driverList
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });

    }

    preparePickDataForPopup(tripInfo: TripInfo): PickInfo {
        var pickInfo: PickInfo = {} as PickInfo;
        pickInfo.disposalId = this.disposalInfo.disposalInfoId;
        pickInfo.tripId = tripInfo.tripInfoId;
        pickInfo.pickId = this.utilService.generateUniqueId();
        pickInfo.quantity = 0;
        return pickInfo;
    }


    // onClickAddPickBtn(selectedTripForAddPick: TripInfo, vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) {
    //     // var vehicle: VehicleInfoFetch = vehicleTrips.vehicleInfo;
    //     // var pick: PickInfo = this.preparePickDataForPopup(selectedTripForAddPick)
    //     // const dialogRef = this.matDialog.open(AddPickPopupComponent, {
    //     //     width: '65%',
    //     //     data: {
    //     //         tripInfo: selectedTripForAddPick,
    //     //         vehicleInfo: vehicle,
    //     //         pickInfo: pick,
    //     //         disposal: this.disposalInfo,
    //     //         driverList: this.driverList
    //     //     }
    //     //     // disableClose: true
    //     // });

    //     // dialogRef.afterClosed().subscribe(result => {
    //     //     if (result) {

    //     //         this.createScheduleOperationService.savePick(result).subscribe((savePick) => {
    //     //             if (savePick) {

    //     //                 vehicleTrips = this.updateTripAndPick(vehicleTrips, selectedTripForAddPick, savePick);
    //     //                 this.updateColumnData(vehicleTrips);
    //     //                 this.driverBandViewList = this.prepareDriverScheduleData(date);
    //     //                 this.updateDisposalQuantity(savePick);
    //     //                 this.confirmDisposal();
    //     //                 this.selectTab(selectedTripForAddPick, savePick, false);
    //     //                 this.utilService.showSnackbar('One Pick Save', 2000);

    //     //             }
    //     //         });
    //     //     }
    //     // });

    // }




}

