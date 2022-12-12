import { Component, OnInit, Inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CompanyInfoFetch, UserInfoFetch, FileView } from 'src/app/models/backend-fetch/user-management-fetch';
import { LicenseViewPopupComponent } from '../license-view-popup/license-view-popup.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
@Component({
    selector: 'app-view-user-info-popup',
    templateUrl: './view-user-info-popup.component.html',
    styleUrls: ['./view-user-info-popup.component.css']
})
export class ViewUserInfoPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, public dialogRef: MatDialogRef<ViewUserInfoPopupComponent>, @Inject(MAT_DIALOG_DATA) public userInfo: UserInfoFetch, private languageService: LanguageService, private utilService: UtilService, private userMangementOperatinService: UserMangementOperatinService) { }
    officeMobieView: string = '';
    userMobieView: string = '';

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VIEW_USER_INFO_POPUP;

        this.officeMobieView = this.utilService.prepareContactNoFormate(this.userInfo.officeContactNo);
        this.userMobieView = this.utilService.prepareContactNoFormate(this.userInfo.userContactNo);
        this.userMangementOperatinService.getUserFile(this.userInfo.userInfoId).subscribe((data) => {
            if (data) {
                this.userInfo.drivingLicenseUpload = data.drivingLicenseFile;
                this.userInfo.userSealUploadedFile = data.userSealFile;
            }
        })
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VIEW_USER_INFO_POPUP, AppConstant.UI_LABEL_TEXT);
    // uiLabels: any = {
    //     title: 'User Form',
    //     name: 'Name',
    //     userId: 'User ID',
    //     email: 'Email',
    //     department: 'Department',
    //     jobTitle: 'Job Title',
    //     officeName: 'Office Name',
    //     officeAddress: 'Office Address',
    //     officeContactNo: 'Office Contact No',
    //     mobileNo: 'Mobile No',
    //     licenseNo: 'License No',
    //     licenseUpload: 'License Upload',
    //     password: 'Password',
    //     saveBtn: 'Save',
    //     closeBtn: 'Close',
    //     remarks: 'Remarks',
    //     role: 'Role',
    //     viewFileBtn: 'View File',
    //     userSealUpload: 'Upload User Seal',
    //     uploadedLicensePreview: 'Uploaded License Preview',
    //     uploadedUserSealPreview: 'Uploaded User Seal Preview'
    // }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    OpenLicenseViewPopup(index: number) {
        var fileView: FileView = {
            image: "",
            title: ""
        }
        if (index == 1) {
            fileView.image = this.userInfo.drivingLicenseUpload;
            fileView.title = "Uploaded Driving License"
        }
        else if (index == 2) {
            fileView.image = this.userInfo.userSealUploadedFile;
            fileView.title = "Uploaded User Seal"
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
