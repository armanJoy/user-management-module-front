import { Component, OnInit } from '@angular/core';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { CompanyInfoFetch, UserInfoFetch, DxrRole, DxrRoleSelectionView, RoleWiseMenuAcccessFetch, UserMenuAccessView, MenuAccessInfo, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { DefineRoleTabComponent } from '../define-role-tab/define-role-tab.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-user-management-menu',
    templateUrl: './user-management-menu.component.html',
    styleUrls: ['./user-management-menu.component.css']
})
export class UserManagementMenuComponent implements OnInit {

    constructor(private userManagementService: UserMangementOperatinService, private cookieService: CookieService, private languageService: LanguageService, private utilService: UtilService) { }

    selectedUserInfo!: UserInfoFetch;
    selectedUserRoleList: DxrRoleSelectionView[] = [];
    selectedUserRoleWiseMenuAccesList: UserMenuAccessView[] = [];
    selectedUser!: SelectedUserView;
    roleList: DxrRoleSelectionView[] = [];

    // uiLabels: any = {
    //     userListTabHead: 'User List',
    //     defineRoleTabHead: 'Define Role',
    // }
    uiLabels: any
    companyId: any = '';
    value = false;
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.USER_MANAGEMENT_MENU;
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.USER_MANAGEMENT_MENU, AppConstant.UI_LABEL_TEXT);
        this.getDxrRoles();
        this.companyId = (this.utilService.getCompanyIdCookie()) ? this.utilService.getCompanyIdCookie() : '';

        // if (this.companyId) {
        //     this.companyId = 'e8a200a3-5261-4a41-8552-6cacf95007e9';
        // }

    }

    getDxrRoles() {
        this.userManagementService.getDxrRole().subscribe((data) => {
            if (data) {
                this.dxrRolelist = data;
            }
            this.getRoleWiseMenu();
        });
    }

    getRoleWiseMenu() {
        this.userManagementService.getRoleWiseMenuAcccessList().subscribe((data) => {
            if (data) {
                this.roleWiseMenuAcccessList = data;
            }

            this.getCompanyInfo();
        });
    }
    getCompanyInfo() {
        this.userManagementService.getCompanyInfo(this.companyId).subscribe((data) => {
            if (data) {
                this.companyInfo = data;
                this.companyInfo.users.forEach(element => {
                    if (element.userCatagory == AppConstant.USER_CATEGORY_COMPANY_ADMIN && this.value == false) {
                        this.selectedUserInfo = element;
                        this.value = true;
                        this.selectedUserRoleList = this.prepareSelectedUserRole(this.selectedUserInfo);

                        this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(this.selectedUserInfo.userRoles, this.roleWiseMenuAcccessList);
                        this.selectedUser = this.prepareUserForView(element);
                        this.companyInfo.users = this.prepareUserList(this.companyInfo.users);
                        this.viewContent = true;

                    }

                });

                if (!this.value) {
                    this.companyInfo.users.forEach(element => {
                        if (element.userCatagory == AppConstant.USER_CATEGORY_COMPANY_USER && this.value == false) {
                            this.selectedUserInfo = element;
                            this.value = true;
                            this.selectedUserRoleList = this.prepareSelectedUserRole(this.selectedUserInfo);

                            this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(this.selectedUserInfo.userRoles, this.roleWiseMenuAcccessList);
                            this.selectedUser = this.prepareUserForView(element);
                            this.companyInfo.users = this.prepareUserList(this.companyInfo.users);
                            this.viewContent = true;

                        }

                    });
                }
            }


        });
    }
    getCompanyUserList = (companyId: string, pageNo: number, searchText: string) => {
        this.value = false;
        // this.viewContent = false;
        this.userManagementService.getCompanyUser(companyId, pageNo, searchText).subscribe(data => {

            if (data) {
                this.companyInfo.users = data;
                this.companyInfo.users.forEach(element => {
                    if (element.userCatagory == AppConstant.USER_CATEGORY_COMPANY_ADMIN && this.value == false) {
                        this.selectedUserInfo = element;
                        this.value = true;
                        this.selectedUserRoleList = this.prepareSelectedUserRole(this.selectedUserInfo);

                        this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(this.selectedUserInfo.userRoles, this.roleWiseMenuAcccessList);
                        this.selectedUser = this.prepareUserForView(element);
                        this.companyInfo.users = this.prepareUserList(this.companyInfo.users);
                        this.viewContent = true;

                    }

                });

                if (!this.value) {
                    this.companyInfo.users.forEach(element => {
                        if (element.userCatagory == AppConstant.USER_CATEGORY_COMPANY_USER && this.value == false) {
                            this.selectedUserInfo = element;
                            this.value = true;
                            this.selectedUserRoleList = this.prepareSelectedUserRole(this.selectedUserInfo);

                            this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(this.selectedUserInfo.userRoles, this.roleWiseMenuAcccessList);
                            this.selectedUser = this.prepareUserForView(element);
                            this.companyInfo.users = this.prepareUserList(this.companyInfo.users);
                            this.viewContent = true;

                        }

                    });
                }
            }

        });

    }

    prepareUserList(userList: UserInfoFetch[]) {
        var companyAdminList: UserInfoFetch[] = [];
        if (userList) {
            userList.forEach(element => {
                element.userContactNoFormated = this.utilService.prepareContactNoFormate(element.userContactNo);

                companyAdminList.push(element);


            });
        }

        return companyAdminList;
    }

    prepareSelectedUserRole(selectedUser: UserInfoFetch): DxrRoleSelectionView[] {

        var userRoleList: DxrRoleSelectionView[] = [];
        this.dxrRolelist.forEach(element => {

            var userRole: DxrRoleSelectionView = {
                roleDefId: '',
                roleName: '',
                roleCode: '',
                roleDescription: '',
                companyCategoryId: '',
                companyCategoryName: '',
                isCheck: false

            }

            userRole.roleDefId = element.roleDefId;
            userRole.roleCode = element.roleCode;
            userRole.roleName = element.roleName;
            userRole.companyCategoryId = element.companyCategoryId;
            userRole.companyCategoryName = element.companyCategoryName;
            userRole.roleDescription = element.roleDescription;
            selectedUser.userRoles.forEach(item => {

                if (item.roleDefId == userRole.roleDefId) {
                    userRole.isCheck = true;

                }
            });

            // userRole.isCheck = false;

            userRoleList.push(userRole);

        });


        return userRoleList;
    }


    selectedIndex = 0;


    public switchTab = (index: number, selectedUser: UserInfoFetch): void => {
        this.selectedIndex = index;
        this.selectedUserInfo = selectedUser;
        this.selectedUser = this.prepareUserForView(selectedUser);
        this.selectedUserRoleList = this.userManagementService.prepareSelectedUserRole(selectedUser, this.dxrRolelist);
        this.selectedUserRoleWiseMenuAccesList = this.userManagementService.prepareRoleWiseMenuAcccessListForSelectedUser(selectedUser.userRoles, this.roleWiseMenuAcccessList);
    }

    prepareUserForView(userInfo: UserInfoFetch): SelectedUserView {
        var user: SelectedUserView = {
            email: '',
            name: '',
            contactNo: ''
        }
        user.name = userInfo.userName;
        user.email = userInfo.userEmail;
        user.contactNo = this.utilService.prepareContactNoFormate(userInfo.userContactNo);
        return user;
    }

    informChange(index: any) {
        this.selectedIndex = index;
    }

    roleWiseMenuAcccessList: RoleWiseMenuAcccessFetch[] = [];
    dxrRolelist: DxrRole[] = [];




    companyInfo: CompanyInfoFetch = {
        companyId: '',
        companyName: '',
        companyAddress: '',
        subscriptionId: '',
        companyEmail: '',
        zipcode: '',
        representativeName: '',
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
        users: [],
        branches: []
    };
}
