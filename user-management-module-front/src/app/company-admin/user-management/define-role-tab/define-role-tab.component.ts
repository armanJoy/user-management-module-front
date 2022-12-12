import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CompanyInfoFetch, UserInfoFetch, DxrRoleSelectionView, sentSelectedUserDataForSetRole, RoleWiseMenuAcccessFetch, UserMenuAccessView, UserMenuDef, DxrRole, UserMenuDefUpdate, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { SetRolePopupComponent } from '../set-role-popup/set-role-popup.component';
import { MatChip } from '@angular/material/chips';
import { RoleTabComponent } from '../role-tab/role-tab.component';
import { AppConstant } from 'src/app/config/app-constant';
import { UserListTabComponent } from '../user-list-tab/user-list-tab.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UriService } from 'src/app/services/visitor-services/uri.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-define-role-tab',
    templateUrl: './define-role-tab.component.html',
    styleUrls: ['./define-role-tab.component.css'],

})
export class DefineRoleTabComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private userManagementService: UserMangementOperatinService, private languageService: LanguageService, private uriService: UriService, private utilService: UtilService) { }
    @ViewChild(RoleTabComponent) roleTabChild: any;
    @ViewChild(UserListTabComponent) userListTabChild: any;
    @Input()
    CompanyDetails!: CompanyInfoFetch;
    @Input()
    roleWiseMenuAccessList!: RoleWiseMenuAcccessFetch[];
    @Input()
    SelectctedUserInfo!: UserInfoFetch;
    @Input()
    selectedUserRoleList!: DxrRoleSelectionView[];
    @Input()
    selectedUserRoleWiseMenuAccesList!: UserMenuAccessView[];
    @Input()
    selectedUser!: SelectedUserView;
    @Input()
    dxrRolelist!: DxrRole[];


    componentCode!: string;
    isSystemAdmin: boolean = false;

    uiLabels: any
    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.DEFINE_ROLE_TAB;

        // this.userManagementService.getUserMenuAccessView().subscribe((data) => {
        //     if (data) {
        //         this.userMenuAccessViewList = data;

        //     }
        // });
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.DEFINE_ROLE_TAB, AppConstant.UI_LABEL_TEXT);
        // this.selectedUser = this.prepareUserForView(this.SelectctedUserInfo);

    }


    // uiLabels: any = {
    //     userName: 'User Name',
    //     email: 'Email',
    //     contactNo: 'Contact No',
    //     setRole: 'Set Role',
    //     menu: 'Menu',
    //     role: 'Role',
    //     access: 'Access',
    //     primaryMenu: 'Primary Menu',
    //     secondaryMenu: 'Secondary Menu'
    // }
    // userMenuAccessViewList: UserMenuAccessView[] = []
    userData: sentSelectedUserDataForSetRole = {
        selectedUserInfo: {
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
        },
        dxrRoleForselectedUser: [{
            roleDefId: '',
            roleName: '',
            roleCode: '',
            roleDescription: '',
            companyCategoryId: '',
            companyCategoryName: '',
            isCheck: false
        }],

        menuAccesList: [{
            menuId: '',
            menuTitle: '',
            menuTitleEng: '',
            menuTitleJpn: '',
            menuUrl: '',
            parentSegment: '',
            menuGroupNameEng: '',
            menuGroupNameJpn: '',
            primaryMenuNameEng: '',
            primaryMenuNameJpn: '',
            secondaryMenuNameEng: '',
            secondaryMenuNameJpn: '',
            menuParent: '',
            menuTypeId: '',
            menuTypeName: '',
            companyCategoryId: '',
            companyCategoryName: '',
            allActiveAccess: [],
            activeAccess:
            {
                roleInfo: {
                    roleDefId: '',
                    roleName: '',
                    roleCode: '',
                    roleDescription: '',
                    companyCategoryId: '',
                    companyCategoryName: '',
                },
                accessInfo: {
                    accessDefId: '',
                    accessTitle: '',
                }
            }

        }],
        roleWiseMenuAccessList: [],
        selectedUserView: {
            name: '',
            email: '',
            contactNo: ''
        }


    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    prepareDataForSent() {
        this.userData.selectedUserInfo = this.SelectctedUserInfo;
        this.selectedUserRoleList = this.userManagementService.prepareSelectedUserRole(this.SelectctedUserInfo, this.dxrRolelist);
        // this.userData.dxrRoleForselectedUser = this.selectedUserRoleList;
        this.userData.dxrRoleForselectedUser = Object.assign([], this.selectedUserRoleList);
        this.userData.menuAccesList = this.selectedUserRoleWiseMenuAccesList;
        this.userData.roleWiseMenuAccessList = this.roleWiseMenuAccessList;
        this.userData.selectedUserView = this.selectedUser;
    }
    setRolePopupOpen() {

        this.prepareDataForSent();
        const dialogRef = this.matDialog.open(SetRolePopupComponent, {
            width: "90%",
            // height: '70%',
            data: this.userData,
            // data: Object.assign({}, this.userData),
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.saveUserRoleData(result);
            }
            else {
                this.userData.dxrRoleForselectedUser = Object.assign([], this.selectedUserRoleList);
            }
        });
    }

    saveUserRoleData(result: DxrRole[]) {
        this.saveUserRole(result);

    }
    editUser(selectctedUserInfo: UserInfoFetch) {
        if (selectctedUserInfo.userCatagory == AppConstant.USER_CATEGORY_COMPANY_USER) {
            this.userListTabChild.editUserInCompannyUserList(selectctedUserInfo);
        }
        else if (selectctedUserInfo.userCatagory == AppConstant.USER_CATEGORY_COMPANY_ADMIN) {
            this.userListTabChild.editUserInCompannyAdminList(selectctedUserInfo);
        }
        else if (selectctedUserInfo.userCatagory == AppConstant.USER_CATEGORY_DXR_ADMIN) {
            this.userListTabChild.editUserInDxrAdminList(selectctedUserInfo);
        }
    }

    saveUserRole(result: DxrRole[]) {

        this.SelectctedUserInfo.userRoles = result;
        // this.userData.dxrRoleForselectedUser = result;

        this.userManagementService.saveUserRole(this.SelectctedUserInfo).subscribe((data) => {
            if (data && data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(result, this.roleWiseMenuAccessList);
                // this.saveUserMenuAccess(result);


            }
        });
    }
    prepareUserMenuDefForUpdate(userMenuDef: UserMenuDef[], userRole: DxrRole[]): UserMenuDefUpdate {
        var userMenuDefUpdate: UserMenuDefUpdate = {
            companyId: '',
            userIdentificationId: '',
            userAccessInfo: [{
                menuId: '',
                menuTitleEng: '',
                menuTitleJpn: '',
                menuUrl: '',
                parentSegment: '',
                menuParent: '',
                menuTypeId: '',
                companyCategoryId: '',
                accessInfo: {
                    accessDefId: '',
                    accessTitle: '',
                },
                child: []
            }],
            isDxrAdmin: false,
            isCompanyAdmin: false
        }
        userMenuDefUpdate.companyId = this.SelectctedUserInfo.companyId;
        userMenuDefUpdate.userIdentificationId = this.SelectctedUserInfo.userIdentificationId;
        userMenuDefUpdate.userAccessInfo = userMenuDef;
        if (this.SelectctedUserInfo.userCatagory == AppConstant.USER_CATEGORY_DXR_ADMIN) {
            userMenuDefUpdate.isDxrAdmin = true;
        }
        if (this.SelectctedUserInfo.userCatagory == AppConstant.USER_CATEGORY_COMPANY_ADMIN) {
            userMenuDefUpdate.isCompanyAdmin = true;
        }
        userRole.forEach(element => {
            if (element.roleName == AppConstant.ADMIN) {
                userMenuDefUpdate.isCompanyAdmin = true;
            }

        });
        return userMenuDefUpdate;
    }
    saveUserMenuAccess(result: DxrRole[]) {
        var userMenuDefUpdate: UserMenuDefUpdate = {
            companyId: '',
            userIdentificationId: '',
            userAccessInfo: [{
                menuId: '',
                menuTitleEng: '',
                menuTitleJpn: '',
                menuUrl: '',
                parentSegment: '',
                menuParent: '',
                menuTypeId: '',
                companyCategoryId: '',
                accessInfo: {
                    accessDefId: '',
                    accessTitle: '',
                },
                child: []
            }],
            isDxrAdmin: false,
            isCompanyAdmin: false
        }


        this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(result, this.roleWiseMenuAccessList);

        var userMenuAccess: UserMenuDef[] = this.userManagementService.prepareUserMenuAccessView(this.selectedUserRoleWiseMenuAccesList);
        userMenuDefUpdate = this.prepareUserMenuDefForUpdate(userMenuAccess, result);

        if (userMenuDefUpdate) {
            this.userManagementService.saveUserMenuDef(userMenuDefUpdate).subscribe((data) => {
                if (data) {

                }
            });
        }
    }

}
