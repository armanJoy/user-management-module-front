import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { TripPlanFetch } from 'src/app/models/backend-fetch/create-schedule';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-trip-details-popup',
    templateUrl: './trip-details-popup.component.html',
    styleUrls: ['./trip-details-popup.component.css']
})
export class TripDetailsPopupComponent implements OnInit {
    tripPlan!: TripPlanFetch;
    viewComponent = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;

    constructor(private utilService: UtilService, private languageService: LanguageService, public dialogRef: MatDialogRef<TripDetailsPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private createScheduleOperationService: CreateScheduleOperationService, private dialog: MatDialog) { }

    currentTripId: string = "";

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.TRIP_DETAILS_POPUP, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.TRIP_DETAILS_POPUP;
        this.data = JSON.parse(JSON.stringify(this.data));
        this.currentTripId = this.data.tripId;

        this.tripPlan = this.prePareDetailsPopView(this.data.trip, this.currentTripId);
        this.getDisposalInfoOfPick();
    }
    uiLabels: any = {
        vehicleName: "Vehicle Name",
        tripTime: "Trip Time",
        driverName: "Driver Name",
        date: "Date",
        pickPlan: "Pick Plan",
        pickLocation: "Pick Location",
        pickNo: "Pick No",
        pickQuantity: "Pick Quantity",
        vehicleTripDetails: "Vehicle Trip Details"

    }

    prePareDetailsPopView(tripPlan: TripPlanFetch, currentTripId: string): TripPlanFetch {
        if (currentTripId) {
            tripPlan.tripList = tripPlan.tripList.filter(item => currentTripId == item.tripInfoId);
        }

        tripPlan.tripList.forEach(element => {
            element.driverName = this.createScheduleOperationService.getDriverName(element.driverId, this.data.driverList);
        });
        tripPlan.date = this.createScheduleOperationService.prepareDateViewFromBackendDate(tripPlan.date);
        return tripPlan;
    }

    getDisposalInfoOfPick() {
        var tripListCount = 0;
        this.tripPlan.tripList.forEach(tripInfo => {
            var count = 0;

            if (tripInfo.pickList && tripInfo.pickList.length > 0) {
                tripInfo.pickList.forEach(pick => {
                    this.createScheduleOperationService.getDisposalInfo(pick.disposalId).subscribe((data) => {
                        if (data) {
                            pick.disposalInfo = data;
                        }
                        count++;
                        if (count == tripInfo.pickList.length) {
                            tripListCount++;
                        }
                        if (tripListCount == this.tripPlan.tripList.length) {
                            this.viewComponent = true;
                        }
                    });
                });
            }
            else if (!tripInfo.pickList || tripInfo.pickList.length == 0) {
                tripListCount++;
            }
        });
    }

    removePick(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.PICK_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.createScheduleOperationService.removePick(removeTriggerData).subscribe(response => {

                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removePickFromViewList(itemId);

                    }
                });
            }
        });
    }

    removePickFromViewList(bankAcccountId: string) {
        // var index = this.companyInfo.bankAccountList.findIndex(item => item.bankAccountId == bankAcccountId);

        // if (index >= 0) {
        //     this.companyInfo.bankAccountList.splice(index, 1);
        // }
    }

}
