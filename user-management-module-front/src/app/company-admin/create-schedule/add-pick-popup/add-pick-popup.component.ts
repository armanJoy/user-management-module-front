import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { VehicleInfoFetch, VehicleInfoViewMatrix, DateArrayView, DriverInfoFetch, AddTripPopupData, TripPlanFetch, TripInfo, PickInfo } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-add-pick-popup',
    templateUrl: './add-pick-popup.component.html',
    styleUrls: ['./add-pick-popup.component.css']
})
export class AddPickPopupComponent implements OnInit {

    constructor(private languageService: LanguageService, public dialogRef: MatDialogRef<AddPickPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private createScheduleOperationService: CreateScheduleOperationService, private utilService: UtilService) { }
    vehicleInfo!: VehicleInfoFetch;
    pickInfo!: PickInfo;
    tripInfo!: TripInfo;
    diposalInfo!: DisposalInfoFetch;
    vehicleLoadQuantity: number = 0;
    disposalPlanQuantity: number = 0;
    viewComponent = false;
    componentCode!: string;

    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.ADD_PICK_POPUP_COMPONENT, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_PICK_POPUP_COMPONENT;

        this.data = JSON.parse(JSON.stringify(this.data));
        this.vehicleInfo = this.data.vehicleInfo;
        this.tripInfo = this.data.tripInfo;
        this.pickInfo = this.data.pickInfo;
        this.diposalInfo = this.data.disposal;
        this.tripInfo.driverName = this.createScheduleOperationService.getDriverName(this.tripInfo.driverId, this.data.driverList);
        this.getDisposalInfoOfPick();
        this.vehicleInfo = this.vehicleLoadQuantityCalculation(this.tripInfo, this.vehicleInfo);
        this.vehicleLoadQuantity = JSON.parse(JSON.stringify(this.vehicleInfo.vehicleLoadQuantity));
        this.disposalPlanQuantity = JSON.parse(JSON.stringify(this.diposalInfo.planQuantity));
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
        measuringUnit: "Measuring Unit",
        wastePickInformation: "Waste Pick Information",
        vehicleInformation: "Vehicle Information",
        driverName: "Driver Name"

    }

    calculateQuantity(quantity: number) {
        this.vehicleInfo.vehicleLoadQuantity = this.vehicleLoadQuantity;
        this.vehicleInfo.vehicleLoadQuantity += quantity;
        this.vehicleInfo.vehicleFreeSpace = this.vehicleInfo.vehicleCapacity - this.vehicleInfo.vehicleLoadQuantity;
        this.diposalInfo.planQuantity = this.disposalPlanQuantity;
        this.diposalInfo.planQuantity += quantity;
        this.diposalInfo.remainingQuantity = this.diposalInfo.quantity - this.diposalInfo.planQuantity;

    }
    // calculateQuantity(quantity: number) {
    //     this.vehicleInfo.vehicleLoadQuantity = this.vehicleLoadQuantity;
    //     this.vehicleInfo.vehicleLoadQuantity += quantity;
    //     this.vehicleInfo.vehicleFreeSpace = this.vehicleInfo.vehicleCapacity - this.vehicleInfo.vehicleLoadQuantity;
    // }
    getDisposalInfoOfPick() {
        var count = 0;
        if (this.tripInfo.pickList && this.tripInfo.pickList.length > 0) {
            this.tripInfo.pickList.forEach(pick => {
                this.createScheduleOperationService.getDisposalInfo(pick.disposalId).subscribe((data) => {
                    if (data) {
                        pick.disposalInfo = data;

                    }
                    count++;
                    if (count == this.tripInfo.pickList.length) {
                        this.viewComponent = true;
                    }
                });

            });
        } else {
            this.viewComponent = true;
        }

    }
    vehicleLoadQuantityCalculation(tripInfo: TripInfo, vehicleInfo: VehicleInfoFetch): VehicleInfoFetch {
        var totalLoadQuantity: number = 0;
        tripInfo.pickList.forEach(pick => {
            totalLoadQuantity += pick.quantity;
        });
        vehicleInfo.vehicleLoadQuantity = totalLoadQuantity;
        vehicleInfo.vehicleFreeSpace = vehicleInfo.vehicleCapacity - totalLoadQuantity;
        return vehicleInfo;
    }
    validatePickQuantity() {
        var isValid = true;
        if (this.pickInfo.quantity == 0) {
            isValid = false;
        }
        return isValid;
    }
    onClickAddPickBtn() {
        var isValid = this.validatePickQuantity();
        if (isValid) {
            this.utilService.showSnackbar('Response Saving...', 5000);
            this.dialogRef.close(Object.assign({}, this.pickInfo));
        }
        else {
            this.utilService.showSnackbar('Please Input Pick Quantity', 3000);
        }
    }

}
