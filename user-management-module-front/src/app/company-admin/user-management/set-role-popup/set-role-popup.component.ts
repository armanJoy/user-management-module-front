import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CompanyInfoFetch, UserInfoFetch, sentSelectedUserDataForSetRole, DxrRoleSelectionView, DxrRole, RoleWiseMenuAcccessFetch, UserMenuAccessView, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { RoleTabComponent } from '../role-tab/role-tab.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-set-role-popup',
    templateUrl: './set-role-popup.component.html',
    styleUrls: ['./set-role-popup.component.css']
})
export class SetRolePopupComponent implements OnInit {

    @ViewChild(RoleTabComponent) roleTabChild: any;
    SendUserInfo!: UserInfoFetch;
    DxrRoleListViewForSelectedUser?: DxrRoleSelectionView[];
    menuAccessList!: UserMenuAccessView[];
    roleWiseMenuAccessList!: RoleWiseMenuAcccessFetch[];
    selectedUser!: SelectedUserView;

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, public dialogRef: MatDialogRef<SetRolePopupComponent>, @Inject(MAT_DIALOG_DATA) public userData: sentSelectedUserDataForSetRole, private languageService: LanguageService, private utilService: UtilService) { }

    isViewMode = true;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SET_ROLE_POPUP;

        var userData2: sentSelectedUserDataForSetRole = JSON.parse(JSON.stringify(this.userData));
        // this.SelectctedUserInfo = Object.assign({}, this.userData.selectedUserInfo);
        // this.roleList = Object.assign([], this.userData.dxrRoleForselectedUser);
        // this.menuAccessList = this.userData.menuAccesList;
        // this.roleWiseMenuAccessList = this.userData.roleWiseMenuAccessList;

        this.SelectctedUserInfo = userData2.selectedUserInfo;
        this.roleList = userData2.dxrRoleForselectedUser;
        this.menuAccessList = userData2.menuAccesList;
        this.roleWiseMenuAccessList = userData2.roleWiseMenuAccessList;
        this.selectedUser = userData2.selectedUserView;
        this.SendUserInfo = this.prepareUserInfoForSend();
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SET_ROLE_POPUP, AppConstant.UI_LABEL_TEXT);
    // uiLabels: any = {
    //     userName: 'User Name',
    //     email: 'Email',
    //     contactNo: 'Contact No',
    //     setRole: 'Set Role',
    //     closeBtn: 'Close',
    //     saveBtn: 'Save',
    //     roleTab: 'Role',
    //     menuAccessTab: 'Menu Access'
    // }
    SelectctedUserInfo: UserInfoFetch = {
        companyId: '',
        userInfoId: '',
        userIdentificationId: '',
        officeName: '',
        officeAddress: '',
        officeContactNo: '',
        userCatagory: '',
        userName: '',
        userAddress: '',
        userEmail: '',
        userContactNo: '',
        userId: '',
        role: '',
        tempPassword: '',
        department: '',
        jobTitle: '',
        licenseNo: '',
        remarks: '',
        drivingLicenseUpload: '',
        userSealUploadedFile: '',
        userRoles: [],
        userContactNoFormated: ''

    }
    roleList: DxrRoleSelectionView[] = [];
    updateUserDxrRoleList: DxrRole[] = [];


    prepareUserInfoForSend(): UserInfoFetch {
        this.SendUserInfo = this.SelectctedUserInfo;
        return this.SendUserInfo;
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedIndex = 0;
    public switchTab = (index: number, menuAccess: UserMenuAccessView[]): void => {
        this.selectedIndex = index;
        this.menuAccessList = menuAccess;
    }

    informChange(index: any) {
        this.selectedIndex = index;
    }
    onClose() {
        this.dialogRef.close();
    }
    onClick() {
        this.updateUserDxrRoleList = Object.assign([], this.roleTabChild.updateDxrRoleListForUser);
        this.dialogRef.close(this.updateUserDxrRoleList);

    }
}
