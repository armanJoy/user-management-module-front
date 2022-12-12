import { Component, OnInit, Input } from '@angular/core';
import { CompanyInfoFetch, UserInfoFetch, AddUserView, RoleWiseMenuAcccessFetch, DxrRole, UserMenuAccessView, DxrRoleSelectionView, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AddUserPopupComponent } from '../add-user-popup/add-user-popup.component';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { AppConstant } from 'src/app/config/app-constant';
import { ViewUserInfoPopupComponent } from '../view-user-info-popup/view-user-info-popup.component';
import { RoleAssignPopupComponent } from 'src/app/system-admin/role-def-admin/role-assign-popup/role-assign-popup.component';
import { AddUserValidator } from '../add-user-popup/add-user-validator';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { UserIdentificationFetch, UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-user-list-tab',
    templateUrl: './user-list-tab.component.html',
    styleUrls: ['./user-list-tab.component.css'],
})
export class UserListTabComponent implements OnInit {
    @Input()
    dxrRolelist!: DxrRole[];
    @Input()
    DxrRoleListViewForSelectedUser!: DxrRoleSelectionView[];
    @Input()
    CompanyDetails!: CompanyInfoFetch;
    @Input()
    roleWiseMenuAccessList!: RoleWiseMenuAcccessFetch[];
    @Input()
    public selectTab!: (index: number, selectedUser: UserInfoFetch) => void;
    @Input()
    public search!: (companyId: string, pageNo: number, searchText: string) => void;
    selectedUserRoleWiseMenuAccesList: UserMenuAccessView[] = [];
    @Input()
    roleList: DxrRoleSelectionView[] = [];
    selectedUserInfo!: UserInfoFetch;
    selectedUser!: SelectedUserView;
    totalPage: number = 0;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;
    // dxrRolelist: DxrRole[] = [];
    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private userMangementOperatinService: UserMangementOperatinService, private utilService: UtilService, private languageService: LanguageService, private userManagementService: UserMangementOperatinService) { }
    viewContent = false;
    companyUserCatagory = AppConstant.USER_CATEGORY_COMPANY_USER;
    companyAdminCatagory = AppConstant.USER_CATEGORY_COMPANY_ADMIN;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.USER_LIST_TAB;

        // if (this.dxrRolelist)
        //     this.DxrRoleListViewForSelectedUser = this.prepareSelectedUserRole(this.selectedUserInfo, this.dxrRolelist)

        if (this.CompanyDetails && this.roleWiseMenuAccessList) {
            this.viewContent = true;
            // this.prepareUserList(this.CompanyDetails.users);
        }
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.USER_LIST_TAB, AppConstant.UI_LABEL_TEXT);

    searchByText() {

        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));
        var companyId: any = this.utilService.getCompanyIdCookie();

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.search(companyId, pageNo, searchText);
    }

    // prepareSelectedUserRole(selectedUser: UserInfoFetch, dxrRolelist: DxrRole[]): DxrRoleSelectionView[] {

    //     var userRoleList: DxrRoleSelectionView[] = [];
    //     if (dxrRolelist)
    //         this.dxrRolelist.forEach(element => {

    //             var userRole: DxrRoleSelectionView = {
    //                 roleDefId: '',
    //                 roleName: '',
    //                 roleCode: '',
    //                 roleDescription: '',
    //                 companyCategoryId: '',
    //                 companyCategoryName: '',
    //                 isCheck: false

    //             }

    //             userRole.roleDefId = element.roleDefId;
    //             userRole.roleCode = element.roleCode;
    //             userRole.roleName = element.roleName;
    //             userRole.companyCategoryId = element.companyCategoryId;
    //             userRole.companyCategoryName = element.companyCategoryName;
    //             userRole.roleDescription = element.roleDescription;
    //             selectedUser.userRoles.forEach(item => {

    //                 if (item.roleDefId == userRole.roleDefId) {
    //                     userRole.isCheck = true;
    //                 }
    //                 userRoleList.push(userRole);
    //             });

    //             // userRole.isCheck = false;

    //         });

    //     return userRoleList;

    // }
    blankUserInfo: UserInfoFetch = {
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
        tempPassword: '',
        department: '',
        jobTitle: '',
        role: '',
        licenseNo: '',
        remarks: '',
        drivingLicenseUpload: '',
        userSealUploadedFile: '',
        userRoles: [],
        userContactNoFormated: ''
    }
    userInfo: UserInfoFetch = {
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
        tempPassword: '',
        department: '',
        jobTitle: '',
        role: '',
        licenseNo: '',
        remarks: '',
        drivingLicenseUpload: '',
        userSealUploadedFile: '',
        userRoles: [],
        userContactNoFormated: ''
    }
    addUserPopData: AddUserView = {
        users: {
            companyId: '',
            userInfoId: '',
            userIdentificationId: '',
            officeName: '',
            officeAddress: '',
            officeContactNo: '',
            userCatagory: 'usercategory0003',
            userName: '',
            userAddress: '',
            userEmail: '',
            userContactNo: '',
            userId: '',
            tempPassword: '',
            department: '',
            jobTitle: '',
            role: '',
            licenseNo: '',
            remarks: '',
            drivingLicenseUpload: '',
            userSealUploadedFile: '',
            userRoles: [],
            userContactNoFormated: ''

        },
        companyInfo: {
            companyId: '',
            companyName: '',
            companyAddress: '',
            subscriptionId: '',
            companyEmail: '',
            representativeName: '',
            zipcode: '',
            telephoneNumber: '',
            companyBusinessCategory: [],
            companyFaxNumber: '',
            representativEmail: '',
            notification: '',
            accountantName: '',
            accountantEmail: '',
            corporateRegNo: '',
            wasteProcessingLicenseNo: '',
            uploadLicense: '',
            users: [
                {
                    companyId: '11111',
                    userIdentificationId: '',
                    userInfoId: '',
                    officeName: 'Mangrove Systems',
                    officeAddress: 'Dhaka',
                    officeContactNo: '01734791013',
                    userCatagory: 'usercategory0003',
                    userName: '',
                    userAddress: '',
                    userEmail: '',
                    userContactNo: '',
                    userId: '',
                    tempPassword: '',
                    department: '',
                    jobTitle: '',
                    role: '',
                    licenseNo: '',
                    remarks: '',
                    drivingLicenseUpload: '',
                    userSealUploadedFile: '',
                    userRoles: [],
                    userContactNoFormated: ''
                }
            ],
            branches: [
                {
                    companyId: '',
                    branchId: '',
                    zipcode: '',
                    branchName: '',
                    branchAddress: '',
                    branchContactNo: '',
                    branchInchargeName: '',
                    branchBusinessCategory: [],
                    remark: ''
                }
            ]
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
    dxrAdminList: UserInfoFetch[] = [];
    companyAdminList: UserInfoFetch[] = [];
    compannyUserList: UserInfoFetch[] = [];
    addUserIncompannyUserList(newUserInfo: UserInfoFetch) {

    }


    userId = 5;
    prepareDataForAddUserPopup(userInfo: UserInfoFetch): AddUserView {
        var addUserPopData: AddUserView = JSON.parse(JSON.stringify(this.addUserPopData));
        addUserPopData.users = userInfo;
        if (userInfo.userInfoId == '') {

            addUserPopData.users.userCatagory = AppConstant.USER_CATEGORY_COMPANY_USER;
        }
        addUserPopData.users.companyId = this.CompanyDetails.companyId;
        addUserPopData.users.officeName = this.CompanyDetails.companyName;
        addUserPopData.companyInfo = this.CompanyDetails;
        addUserPopData.users.userRoles = userInfo.userRoles;

        return addUserPopData;

    }

    preparUserRole() {
        this.DxrRoleListViewForSelectedUser = this.userMangementOperatinService.prepareSelectedUserRole(this.selectedUserInfo, this.dxrRolelist)
    }
    addUserPopupOpen(userInfo?: UserInfoFetch) {

        var addUserPopData: AddUserView = {} as AddUserView;
        if (userInfo) {
            addUserPopData = this.prepareDataForAddUserPopup(Object.assign({}, userInfo));
        }
        else {
            addUserPopData = this.prepareDataForAddUserPopup(Object.assign({}, this.blankUserInfo));
        }
        // var width: string = (!this.isHandset$) ? '75%' : '50%'
        // this.preparUserRole();
        const dialogRef = this.matDialog.open(AddUserPopupComponent, {
            width: '65%',
            data: {
                userData: Object.assign({}, addUserPopData),
                userRole: this.dxrRolelist
            },
            disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                var userInfoUpdate: UserInfoUpdate = this.prepareUserInfoUpdateForIdentification(result);
                this.userMangementOperatinService.saveIdentification(userInfoUpdate).subscribe((identification) => {
                    if (identification) {
                        this.sendUserInfoForSave(result, identification);

                    }

                });
            }
            ;
        });

    }


    sendUserInfoForSave(userInfo: UserInfoFetch, identification: UserIdentificationFetch) {
        userInfo = this.prepareUserInfo(userInfo, identification.userIdentification);

        this.userMangementOperatinService.saveUserInfo(userInfo).subscribe((data) => {
            if (data) {
                this.userInfo = data;
                this.editUserInCompannyUserList(data);
                this.saveUserRole(data.userRoles);

            }
        });

    }
    public editUserInCompannyUserList(editUserInfo: UserInfoFetch) {

        var updateFlag = true;
        editUserInfo.userContactNoFormated = this.utilService.prepareContactNoFormate(editUserInfo.userContactNo);
        let itemIndex = this.CompanyDetails.users.findIndex(item => item.userInfoId == editUserInfo.userInfoId);
        if (itemIndex >= 0) {
            this.CompanyDetails.users[itemIndex] = editUserInfo;
        } else {
            this.CompanyDetails.users.unshift(editUserInfo);
        }



    }
    saveUserRole(result: DxrRole[]) {

        this.userInfo.userRoles = result;
        // this.saveRole(result);

        this.userManagementService.saveUserRole(this.userInfo).subscribe((data) => {
            if (data && data == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {

                this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(result, this.roleWiseMenuAccessList);
                // this.saveUserMenuAccess(result);


            }
        });
    }

    prepareUserInfo(userInfo: UserInfoFetch, identification: string): UserInfoFetch {
        var preparedUserInfo: UserInfoFetch = userInfo;
        preparedUserInfo.userIdentificationId = identification;
        if (!preparedUserInfo.userInfoId) {
            preparedUserInfo.userInfoId = this.utilService.generateUniqueId();
        }
        return preparedUserInfo;
    }
    addNewUser(user: UserInfoFetch) {
        this.userMangementOperatinService.saveUserInfo(user).subscribe((data) => {
            if (data) {


                this.addUserIncompannyUserList(data);
            }
        });
    }
    prepareUserInfoUpdateForIdentification(userInfo: UserInfoFetch): UserInfoUpdate {
        var userInfoUpdate: UserInfoUpdate = {
            userInfoId: '',
            userName: '',
            userAddress: '',
            departmentTitle: '',
            userEmail: '',
            userContact: '',
            userCompanyId: '',
            userCategoryId: ''
        }
        userInfoUpdate.userInfoId = userInfo.userInfoId;
        userInfoUpdate.userName = userInfo.userName;
        userInfoUpdate.userAddress = userInfo.userAddress;
        userInfoUpdate.departmentTitle = userInfo.department;
        userInfoUpdate.userEmail = userInfo.userEmail;
        userInfoUpdate.userContact = userInfo.userContactNo;
        userInfoUpdate.userCompanyId = userInfo.companyId;
        return userInfoUpdate;
    }
    SelectedUserInfoPopupOpenForView(userInfo: UserInfoFetch) {
        const dialogRef = this.matDialog.open(ViewUserInfoPopupComponent, {
            width: '65%',
            data: userInfo,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {

        });

    }
    changeTabForAddRoleOfSelectedUser(selectedUserInfo: UserInfoFetch) {
        this.selectTab(1, selectedUserInfo);

    }

    removeUser(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.COMPANY_USER_REMOVE_OPERATION
        }

        this.userMangementOperatinService.getUserForwardLinks(itemId).subscribe(vehicleForwardLink => {

            const removeDialog = this.matDialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: vehicleForwardLink,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.userMangementOperatinService.removeUser(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeUserFromViewList(itemId);

                        }
                    });
                }
            });

        });
    }

    removeUserFromViewList(itemId: string) {
        var index = this.CompanyDetails.users.findIndex(item => item.userInfoId == itemId);

        if (index >= 0) {
            this.CompanyDetails.users.splice(index, 1);
        }
    }
}
