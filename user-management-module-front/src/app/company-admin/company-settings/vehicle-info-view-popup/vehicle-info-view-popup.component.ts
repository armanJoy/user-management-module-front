import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { VehicleInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { FileView } from 'src/app/models/backend-fetch/user-management-fetch';
import { LicenseViewPopupComponent } from '../../user-management/license-view-popup/license-view-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-vehicle-info-view-popup',
    templateUrl: './vehicle-info-view-popup.component.html',
    styleUrls: ['./vehicle-info-view-popup.component.css']
})
export class VehicleInfoViewPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public vehicle: VehicleInfoFetch, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private dialog: MatDialog) { }

    formatedZipcode: string = '';


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VEHICLE_INFO_VIEW_POPUP;

        if (this.vehicle && this.vehicle.zipcode) {
            this.formatedZipcode = this.utilService.prepareZipCodeFormate(this.vehicle.zipcode);
        }
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_INFO_VIEW_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "vehicleDetails": "Vehicle Details",
    //     "manufacturerName": "Vehicle Name",
    //     "vehicleType": "Vehicle Type",
    //     "modelName": "Model Name",
    //     "vehicleNo": "Vehicle No",
    //     "capacity": "Capacity",
    //     "vehicleWeight": "Vehicle Weight",
    //     "gasolineType": "Gasoline Type",
    //     "inspectionDate": "Inspection Date",
    //     "vehicleOwnership": "Vehicle Ownership",
    //     "remarks": "Remarks",
    //     "officeAddress": "Affiliated Office Address",
    //     "fitnessLicense": "Fitness Paper",
    //     "close": "Close",
    //     "licenseButton": "View License",
    //     "uploadedLicensePreview": 'Uploaded License Preview',

    // }
    OpenLicenseViewPopup(index: number) {
        var fileView: FileView = {
            image: "",
            title: ""
        }
        if (index == 1) {
            fileView.image = this.vehicle.fitnessLicense;
            fileView.title = "Uploaded Fitness License"
        }
        else if (index == 2) {

        }
        const dialogRef = this.dialog.open(LicenseViewPopupComponent, {
            width: '40%',
            data: fileView,
            // disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }
}


