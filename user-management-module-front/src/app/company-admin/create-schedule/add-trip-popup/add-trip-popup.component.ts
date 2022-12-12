import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { AddTripPopupData, DriverInfoFetch, VehicleInfoFetch, TripInfo, PickInfo, DriverBandView, BackEndToFrontendConvertFetch, OverlapedTrip, VehicleInfoViewMatrix, TripPlanFetch } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { TripDetailsPopupComponent } from '../trip-details-popup/trip-details-popup.component';

@Component({
    selector: 'app-add-trip-popup',
    templateUrl: './add-trip-popup.component.html',
    styleUrls: ['./add-trip-popup.component.css']
})

export class AddTripPopupComponent implements OnInit {
    constructor(private createScheduleOperationService: CreateScheduleOperationService, private utilService: UtilService, private languageService: LanguageService, public dialogRef: MatDialogRef<AddTripPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

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
                fromDateView: "",
                toDateView: "",
                endBackendDate: "",
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
        },
        existingTripData: null
    };

    driverList!: DriverInfoFetch[];
    diposalInfo!: DisposalInfoFetch;
    selectedDay!: BackEndToFrontendConvertFetch;
    vehicleInfo!: VehicleInfoFetch;
    tripInfo!: TripInfo;
    pickInfo!: PickInfo;
    driverBandViewList: DriverBandView[] = [];
    isViewPopup: boolean = true;
    vehicleLoadQuantity: number = 0;
    disposalPlanQuantity: number = 0;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    isValidTime: boolean = true;
    isValidEndTime: boolean = true;
    removedPickIds: string[] = [];

    initialPickQuantity: number = 0;

    // Manual Manifesto Trip Code
    companyVehicleList: VehicleInfoFetch[] = [];
    isManifestoTrip: boolean = false;

    ngOnInit(): void {
        debugger
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_TRIP_POPUP;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.data = JSON.parse(JSON.stringify(this.data));
        this.driverList = this.data.addTrip.driverList;
        this.selectedDay = this.data.addTrip.selectedDay;
        this.vehicleInfo = this.data.addTrip.vehicleInfo;
        this.diposalInfo = this.data.addTrip.diposalInfo;
        this.tripInfo = this.data.addTrip.tripInfo;
        this.pickInfo = this.data.addTrip.pickInfo;

        this.vehicleTrips = this.data.vehicleTrips;
        this.date = this.data.date;

        this.vehicleLoadQuantity = this.calculateLoadedQuantity();

        if (this.diposalInfo.planQuantity > 0) {
            this.disposalPlanQuantity = this.diposalInfo.planQuantity;
        }

        this.driverBandViewList = this.data.driverView;
        this.calculateQuantity(this.vehicleLoadQuantity);
        this.setPreviousDriver();

        this.initialPickQuantity = this.pickInfo.quantity;
        // this.vehicleInfo = this.vehicleLoadQuantityCalculation(this.tripInfo, this.vehicleInfo);

        // Manual Manifesto Trip Code
        this.companyVehicleList = (this.data.companyVehicleList) ? this.data.companyVehicleList : this.companyVehicleList.push(this.data.addTrip.vehicleInfo);
        this.isManifestoTrip = (this.data.companyVehicleList) ? true : false;

        if (this.isManifestoTrip) {
            this.calculateQuantity(this.pickInfo.quantity)
        }
    }

    onVehicleSelection(item: any) {
        this.vehicleInfo = item;
        this.tripInfo.vehicleId = item.value.vehicleId;
        this.tripInfo.vehicleName = item.value.manufacturerName + item.value.vehicleType;
    }

    calculateLoadedQuantity() {
        var qunatitySum = 0;
        if (this.vehicleTrips && this.vehicleTrips.tripPlan) {
            var pickList = this.vehicleTrips.tripPlan.find(item => item.date == this.date.backendDate)?.tripList.find(eachTrip => eachTrip.tripInfoId == this.tripInfo.tripInfoId)?.pickList;

            qunatitySum = (pickList) ? pickList?.map(item => item.quantity).reduce((a, b) => a + b) : 0;
        }
        return qunatitySum;
    }


    setPreviousDriver() {
        this.tripInfo.driverId = this.vehicleInfo.previousDriverId;
    }

    validateTimes(callBack: any) {
        this.validateStartTime(this.tripInfo.startTime, () => {
            this.validateEndTime(this.tripInfo.endTime, () => {
                callBack();
            })
        })
    }
    validateStartTime(time: string, callBack?: any) {
        this.createScheduleOperationService.getTimeValidatation(time).subscribe((data) => {
            if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                this.isValidTime = true;
            }
            else {
                this.isValidTime = false
            }

            (callBack) ? callBack() : '';

        })
    }
    validateEndTime(time: string, callBack?: any) {
        this.createScheduleOperationService.getTimeValidatation(time).subscribe((data) => {
            if (data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                this.isValidEndTime = true;
            }
            else {
                this.isValidEndTime = false;
            }

            (callBack) ? callBack() : '';
        })
    }
    uiLabels: any = {
        tripTime: "Trip Time",
        pickQuantity: "Pick Quantity",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
        totalQuantity: "Total Quantity",
        planedQuantity: "Planed Quantity",
        remainingQuantity: "Remaining Quantity",
        vehicleName: "Vehicle Name",
        vehiclLicenseNo: "Vehicl License No",
        capacity: "Capacity",
        loadedQuantity: "Loaded Quantity",
        freeSpacee: "Free Spacee",
        pickList: "Pick List",
        projectTitle: "Project Title",
        closeBtn: "Close",
        addPickBtn: "Add Pick",
        date: "Date",
        dropDownLabel: "Select Driver From List",
        timeFrom: "Time From",
        timeTo: "Time To",
        driverSchedule: "Driver Schedule",
        addBtn: "Add",
        measuringUnit: "Measuring Unit",
        wastePickInformation: "Waste Pick Information",
        vehicleInformation: "Vehicle Information",
        addTripForm: "Add Trip & Driver"


    }
    onDriverSelection(item: any) {
        // this.driverBandViewList.forEach(element => {
        //     // if(element.driverId==item)

        // });
        this.tripInfo.driverId = item.value.userInfoId;

    }

    calculateQuantity(quantity: number) {
        this.vehicleInfo.vehicleLoadQuantity = this.vehicleLoadQuantity;
        this.vehicleInfo.vehicleLoadQuantity += quantity;
        this.vehicleInfo.vehicleFreeSpace = this.vehicleInfo.vehicleCapacity - this.vehicleInfo.vehicleLoadQuantity;
        this.diposalInfo.planQuantity = this.disposalPlanQuantity;
        this.diposalInfo.planQuantity += quantity;
        this.diposalInfo.remainingQuantity = this.diposalInfo.quantity - this.diposalInfo.planQuantity;
    }

    preapareDataForSave() {
        this.addTripPopupData.driverList = this.driverList;
        this.addTripPopupData.diposalInfo = this.diposalInfo;
        this.addTripPopupData.selectedDay = this.selectedDay;
        this.addTripPopupData.vehicleInfo = this.vehicleInfo;
        this.addTripPopupData.tripInfo = this.tripInfo;
        this.addTripPopupData.pickInfo = this.pickInfo;

        if (this.tripInfo.pickList) {
            this.addTripPopupData.pickList = this.tripInfo.pickList.filter(item => item.isNew == true);
        } else {
            this.addTripPopupData.pickList = [];
            this.tripInfo.pickList = [];
        }

        if (this.initialPickQuantity != this.pickInfo.quantity) {
            this.pickInfo.isNew = true;
            this.addTripPopupData.pickList.unshift(this.pickInfo);
            this.addTripPopupData.tripInfo.pickList.unshift(this.pickInfo);
        }
    }

    reset() {
        // this.tripInfo.companyId = "";
        // this.tripInfo.driverId = "";
        // this.tripInfo.driverName = "";
        // this.tripInfo.endTime = "";
        // this.tripInfo.endTimeView = "";
        // this.tripInfo.pickList = [];
        // this.tripInfo.pickUpDate = "";
        // this.tripInfo.startTime = "";
        // this.tripInfo.startTimeView = "";
        // this.tripInfo.tripInfoId = "";
        // this.tripInfo.vehicleId = "";
        // this.tripInfo.vehicleName = "";
        // this.pickInfo.disposalId = "";
        this.pickInfo.pickId = this.utilService.generateUniqueId();
        this.pickInfo.quantity = 0;
        // this.pickInfo.tripId = "";
    }

    validateTripTimeAndPickQuantity(): string {

        var isValid: string = AppConstant.VALID_PICK_INFO;
        if (this.tripInfo.startTime >= this.tripInfo.endTime || !this.isValidEndTime || !this.isValidTime) {
            isValid = AppConstant.INVALID_TRIP_TIME;
        }
        else if (!this.tripInfo.driverId) {
            isValid = AppConstant.INVALID_DRIVER;
        }
        else if (this.pickInfo.quantity == 0 && !this.data.editPopup) {
            isValid = AppConstant.INVALID_PICK_QUANTITY;
        }
        return isValid;
    }

    createOrUseExitingTrip(fromTime: string, tripEndTime: string, vehicleId: string, tripDate: string) {
        debugger
        var overlapedTrip: OverlapedTrip = {
            tripDate: tripDate,
            tripStartTime: fromTime,
            tripEndTime: tripEndTime,
            vehicleId: vehicleId
        }

        this.createScheduleOperationService.findOverLappedTrip(overlapedTrip).subscribe(response => {

            if (response && response.tripInfoId) {

                if (response.tripInfoId == this.tripInfo.tripInfoId) {

                    this.addTripPopupData.existingTripData = JSON.parse(JSON.stringify(this.tripInfo));

                    this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo, removedPickIds: this.removedPickIds, toSave: true }));

                } else {
                    this.utilService.showSnackbar(this.uiLabels.multipleOverlappedTripToast, 3000);
                }


                // ------------ Overlapped Trip Merging Code Start --------------
                //
                // 
                // if (response.tripInfoId == AppConstant.MULTIPLE_OVERLAPPED_TRIP_FLAG) {
                //     this.utilService.showSnackbar(this.uiLabels.multipleOverlappedTripToast, 3000);

                // } else {
                //     response.startTime = (response.startTime < this.tripInfo.startTime) ? response.startTime : this.tripInfo.startTime;
                //     response.endTime = (response.endTime > this.tripInfo.endTime) ? response.endTime : this.tripInfo.endTime;
                //     response.driverId = this.tripInfo.driverId;
                //     response.driverName = this.tripInfo.driverName;

                //     this.addTripPopupData.existingTripData = response;

                //     this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo, removedPickIds: this.removedPickIds, toSave: true }));
                // }
                // 
                // 
                // ------------ Overlapped Trip Merging Code End --------------

            } else {
                // this.removeExistingPicks(this.tripInfo);

                this.addTripPopupData.existingTripData = null;

                this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo, removedPickIds: this.removedPickIds, toSave: true }));
            }

        })
    }

    saveTripAndPick() {

        this.validateTimes(() => {
            var isValid = this.validateTripTimeAndPickQuantity();
            if (isValid == AppConstant.VALID_PICK_INFO) {

                this.preapareDataForSave();
                this.utilService.showSnackbar('Response Saving...', 5000);

                this.createOrUseExitingTrip(this.tripInfo.startTime, this.tripInfo.endTime, this.tripInfo.vehicleId, this.tripInfo.pickUpDate);

            } else if (isValid == AppConstant.INVALID_TRIP_TIME) {
                this.utilService.showSnackbar('Please Insert Valid Start & End Time', 3000);

            } else if (isValid == AppConstant.INVALID_DRIVER) {
                this.utilService.showSnackbar('Please Select Driver', 3000);

            } else if (isValid == AppConstant.INVALID_PICK_QUANTITY) {
                this.utilService.showSnackbar('Please Input Pick Quantity', 3000);
            }
        });

    }

    removeExistingPicks(tripInfo: TripInfo) {
        debugger
        if (tripInfo && tripInfo.pickList && tripInfo.pickList.length == 1 && this.initialPickQuantity == this.pickInfo.quantity) {
            return;
        }

        if (tripInfo && tripInfo.pickList && tripInfo.pickList.length > 0) {
            this.removePick(tripInfo.pickList[tripInfo.pickList.length - 1], tripInfo.tripInfoId, tripInfo, (pTripInfo: TripInfo) => {
                pTripInfo.pickList.splice(pTripInfo.pickList.length - 1, 1);

                this.removeExistingPicks(pTripInfo);
            });

        }
    }

    closeDialog() {
        // if (this.data.editPopup) {
        //     this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo, removedPickIds: this.removedPickIds, toSave: false }));
        // } else {
        this.dialogRef.close("");
        // }
    }

    adjustQuantityOnAddPick(quantity: number) {
        this.vehicleInfo.vehicleFreeSpace = this.vehicleInfo.vehicleCapacity - this.vehicleInfo.vehicleLoadQuantity;
        this.diposalInfo.remainingQuantity = this.diposalInfo.quantity - this.diposalInfo.planQuantity;
    }

    adjustQuantityOnRemovePick(quantity: number) {
        this.vehicleInfo.vehicleLoadQuantity += quantity;
        this.vehicleInfo.vehicleFreeSpace = this.vehicleInfo.vehicleCapacity - this.vehicleInfo.vehicleLoadQuantity;

        this.diposalInfo.planQuantity += quantity;
        this.diposalInfo.remainingQuantity = this.diposalInfo.quantity - this.diposalInfo.planQuantity;
    }

    addPick(newPickInfo: PickInfo) {
        newPickInfo.isNew = true;
        this.tripInfo.pickList.unshift(JSON.parse(JSON.stringify(newPickInfo)));
        this.adjustQuantityOnAddPick(newPickInfo.quantity);
        this.reset();
    }

    removePick(pickInfo: PickInfo, tripId: string, tripInfo?: TripInfo, callBack?: any) {
        // var itemId = pickInfo.pickId;
        // if (pickInfo.isNew) {
        // this.utilService.showRemovedToast();

        var index = this.tripInfo.pickList.findIndex(item => item.pickId == pickInfo.pickId);

        if (index >= 0) {
            this.tripInfo.pickList.splice(index, 1);
        }

        var removeQuantity = pickInfo.quantity * (-1);
        this.adjustQuantityOnRemovePick(removeQuantity);

        this.removedPickIds.push(pickInfo.pickId);

        if (callBack) {
            callBack(tripInfo);
        }

        // } else {
        // var removeTriggerData: RemoveTriggerData = {
        //     itemeId: itemId.concat(",").concat(tripId),
        //     triggerUserId: this.utilService.getUserIdCookie(),
        //     triggerCompanyId: this.utilService.getCompanyIdCookie(),
        //     removeOperationType: AppConstant.PICK_REMOVE_OPERATION
        // }

        // const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
        //     width: '40%',
        //     // height: '30%',
        //     // data: forwardLinks,
        //     disableClose: true
        // });

        // removeDialog.afterClosed().subscribe(response => {
        //     if (response) {
        //         this.createScheduleOperationService.removePickAndTrip(removeTriggerData).subscribe(response => {

        //             if (response) {
        //                 this.removePickFromViewList(itemId);

        //                 if (this.tripInfo.pickList.length == 0 && response == "2") {
        //                     this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: null, removedPickIds: this.removedPickIds, toSave: false }));

        //                 } else if (this.tripInfo.pickList.length == 0 && response != "2") {
        //                     this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo, removedPickIds: this.removedPickIds, toSave: false }));
        //                 }

        //                 this.utilService.showRemovedToast();

        //             }
        //         });
        //     }
        // });

        // }
    }

    removePickFromViewList(pickId: string) {
        var index = this.tripInfo.pickList.findIndex(item => item.pickId == pickId);

        if (index >= 0) {
            this.tripInfo.pickList.splice(index, 1);
        }
    }

    removeTripFromViewList() {
        if (this.tripInfo.pickList.length == 0) {
            this.dialogRef.close(Object.assign({}, { popupData: this.addTripPopupData, tripInfo: this.tripInfo }));
        }
    }

    vehicleTrips!: VehicleInfoViewMatrix;
    date!: BackEndToFrontendConvertFetch

    onClickDetailsBtn(vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) {
        var vehicleName: string = vehicleTrips.vehicleInfo.manufacturerName;
        var tripPlanForDate: TripPlanFetch = this.prepareDetailPopupData(vehicleTrips, date);
        const dialogRef = this.dialog.open(TripDetailsPopupComponent, {
            width: '65%',
            data: {
                trip: tripPlanForDate,
                vehicle: vehicleName,
                driverList: this.driverList,
                tripId: (this.data.editPopup) ? this.tripInfo.tripInfoId : ""
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
            }
        });

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

}
