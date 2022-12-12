import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { TripInfo } from 'src/app/models/backend-fetch/create-schedule';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-driver-band-view-popup',
    templateUrl: './driver-band-view-popup.component.html',
    styleUrls: ['./driver-band-view-popup.component.css']
})
export class DriverBandViewPopupComponent implements OnInit {
    driverName: string = "";
    tripInfo!: TripInfo;
    componentCode!: string;

    isSystemAdmin: boolean = false;

    constructor(private utilService: UtilService, private languageService: LanguageService, public dialogRef: MatDialogRef<DriverBandViewPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private createScheduleOperationService: CreateScheduleOperationService) { }

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.DRIVER_BAND_VIEW_POPUP, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.DRIVER_BAND_VIEW_POPUP;
        this.driverName = this.data.driverName;
        this.tripInfo = this.data.driverTrip;
        this.getDisposalInfoOfPick();
    }
    uiLabels: any = {
        driver: "Driver",
        tripTime: "Trip Time",
        pickList: "Pick List",
        projectTitle: "Project Title",
        pickQuantity: "Pick Quantity",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
    }
    getDisposalInfoOfPick() {
        this.tripInfo.pickList.forEach(pick => {
            this.createScheduleOperationService.getDisposalInfo(pick.disposalId).subscribe((data) => {
                if (data) {
                    pick.disposalInfo = data;
                }
            });

        });
    }

}
