import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, UserInfoFetch, DxrRole, RoleWiseMenuAcccessFetch, UserMenuAccessView, MenuAccessInfo, UserMenuDef, UserMenuDefUpdate, DxrRoleSelectionView, UserInfoFiles, AddressDropDownView, BranchInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { UserIdentificationFetch, UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { ControlValidation, ValidationMessage, ValidationReport } from "src/app/models/view/validation-models";
import { UriService } from '../visitor-services/uri.service';
import { LanguageService } from '../visitor-services/language.service';
import { RemoveTriggerData, DataForwardLinkReturn } from 'src/app/models/backend-fetch/dxr-system';
@Injectable({
    providedIn: 'root'
})

export class UserMangementOperatinService implements OnInit {

    constructor(private uriService: UriService, languageService: LanguageService) { }
    ngOnInit(): void {
        // this.getRoleWiseMenuAcccessList().subscribe((data) => {
        //     if (data) {
        //         this.roleWiseMenuAcccessList = data;
        //     }
        // });
    }
    prepareAddressDropDownViewList(branchList: BranchInfoFetch[], companyInfo: CompanyInfoFetch): AddressDropDownView[] {
        var dropDownViewList: AddressDropDownView[] = [];
        branchList.forEach(element => {
            var data: AddressDropDownView = {
                id: '',
                name: '',
                address: '',
                contactNo: '',
                zipcode: ''
            }
            data.name = element.branchName;
            data.address = element.branchAddress;
            data.zipcode = element.zipcode;
            data.id = element.branchId;
            data.contactNo = element.branchContactNo;
            dropDownViewList.push(data);
        });
        var data: AddressDropDownView = {
            id: '',
            name: '',
            address: '',
            contactNo: '',
            zipcode: ''
        }
        data.name = companyInfo.companyName;
        data.zipcode = companyInfo.zipcode;
        data.address = companyInfo.companyAddress;
        data.id = companyInfo.companyId;
        data.contactNo = companyInfo.telephoneNumber;
        dropDownViewList.unshift(data);
        return dropDownViewList;
    }

    removeUser(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-user/remove-user";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    getUserForwardLinks(scaleInfoId: string): Observable<DataForwardLinkReturn> {
        var url = "/company-user/user-forward-link";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, scaleInfoId);
    }

    public getUserFile(userInfoId: string): Observable<UserInfoFiles> {
        var url = '/company-user/user-file';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userInfoId);
    }

    public saveIdentification(userInfoUpdate: UserInfoUpdate): Observable<UserIdentificationFetch> {
        var url = '/company-user/user-identification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userInfoUpdate);
    }
    public saveUserInfo(data: UserInfoFetch): Observable<UserInfoFetch> {
        var url = '/company-user/user-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, data);
    }
    public saveUserRole(data: UserInfoFetch): Observable<string> {
        var url = '/company-user/user-role';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, data);
    }
    public saveUserMenuDef(userMenuDef: UserMenuDefUpdate): Observable<UserMenuDefUpdate> {
        var url = '/company-user/user-access';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userMenuDef);
    }
    public getCompanyInfo(companyId: string): Observable<CompanyInfoFetch> {

        var url = '/company-user/company-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }


    public getCompanyUser(companyId: string, pageNo: number, searchText: string): Observable<UserInfoFetch[]> {

        var url = '/company-user/user-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText);
        ;
    }

    userId = 5;



    // public updateUserInfo(userUpdateInfo: UserInfoFetch): Observable<CompanyInfoFetch> {
    //     this.companyInfo.users.forEach(element => {
    //         if (element.userInfoId == userUpdateInfo.userInfoId) {
    //             element = userUpdateInfo;
    //         }

    //     });
    //     return of(this.companyInfo);
    // }
    public getDxrRole(): Observable<DxrRole[]> {
        var url = '/company-user/dxr-role';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }
    public getRoleWiseMenuAcccessList(): Observable<RoleWiseMenuAcccessFetch[]> {
        var url = '/company-user/role-wise-menu-access';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    prepareChildUserMenuDef(userMenuAccess: UserMenuAccessView[], parent: string): UserMenuDef[] {
        var menuChild: UserMenuDef[] = [];
        return menuChild;
    }

    prepareSelectedUserRole(selectedUser: UserInfoFetch, dxrRolelist: DxrRole[]): DxrRoleSelectionView[] {

        var userRoleList: DxrRoleSelectionView[] = [];
        dxrRolelist.forEach(element => {

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

    prepareUserMenuDef(userMenuAccessViewList: UserMenuAccessView[]): UserMenuDef[] {
        var userMenuDefList: UserMenuDef[] = [];
        userMenuAccessViewList.forEach(element => {
            var userMenuDef: UserMenuDef = {
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

            };

            userMenuDef.menuId = element.menuId;
            userMenuDef.menuTitleEng = element.menuTitleEng;
            userMenuDef.menuTitleJpn = element.menuTitleJpn;
            userMenuDef.companyCategoryId = element.companyCategoryId;
            userMenuDef.menuParent = element.menuParent;
            userMenuDef.menuTypeId = element.menuTypeId;
            userMenuDef.menuUrl = element.menuUrl;
            userMenuDef.parentSegment = element.parentSegment;
            userMenuDef.accessInfo = element.activeAccess.accessInfo;
            userMenuDef.child = this.prepareChildUserMenuDef(userMenuAccessViewList, element.menuParent);



        });
        return userMenuDefList;
    }

    userMenuAccessViewToUserMenuDef(userMenuAccessView: UserMenuAccessView): UserMenuDef {
        var menuAccessInfo: UserMenuDef = {} as UserMenuDef;
        menuAccessInfo.menuId = userMenuAccessView.menuId;
        menuAccessInfo.menuTitleEng = userMenuAccessView.menuTitleEng;
        menuAccessInfo.menuTitleJpn = userMenuAccessView.menuTitleJpn;
        menuAccessInfo.menuUrl = userMenuAccessView.menuUrl;
        menuAccessInfo.parentSegment = userMenuAccessView.parentSegment;
        menuAccessInfo.menuParent = userMenuAccessView.menuParent;
        menuAccessInfo.menuTypeId = userMenuAccessView.menuTypeId;
        menuAccessInfo.companyCategoryId = userMenuAccessView.companyCategoryId;
        menuAccessInfo.accessInfo = userMenuAccessView.activeAccess.accessInfo;
        menuAccessInfo.child = [];

        return menuAccessInfo;
    }

    prepareUserMenuAccessView(menuRepository: UserMenuAccessView[]): UserMenuDef[] {

        var userMenuAccessViews: UserMenuDef[] = [];

        if (menuRepository) {
            menuRepository.forEach(eachMenuDef => {
                if (!eachMenuDef.menuParent && eachMenuDef.menuTypeId == AppConstant.MENU_TYPE_PRIMARY) {

                    var primaryMenuLevelOneMenuAccessInfo: UserMenuDef = this.userMenuAccessViewToUserMenuDef(eachMenuDef);
                    userMenuAccessViews.push(primaryMenuLevelOneMenuAccessInfo);

                    var primaryParentDefLevelTwo = eachMenuDef.menuId.concat("|");
                    var primaryMenuListLevelTwo: UserMenuAccessView[] = this.getMenuDefListByParent(menuRepository, primaryParentDefLevelTwo, AppConstant.MENU_TYPE_PRIMARY);

                    if (primaryMenuListLevelTwo) {

                        // for (var i = 0; i < primaryMenuListLevelTwo.length; i++)
                        primaryMenuListLevelTwo.forEach(primaryMenuLevelTwo => {
                            // var primaryMenuLevelTwo: UserMenuAccessView = primaryMenuListLevelTwo[i];
                            var primaryMenuLevelTwoMenuAccessInfo: UserMenuDef = this.userMenuAccessViewToUserMenuDef(primaryMenuLevelTwo);
                            primaryMenuLevelOneMenuAccessInfo.child.push(primaryMenuLevelTwoMenuAccessInfo);

                            var secondaryParentDefLevelOne = primaryMenuLevelTwo.menuParent.concat(primaryMenuLevelTwo.menuId.concat("|"));

                            var secondaryMenuListLevelOne: UserMenuAccessView[] = this.getMenuDefListByParent(menuRepository, secondaryParentDefLevelOne, AppConstant.MENU_TYPE_SECONDARY);

                            if (secondaryMenuListLevelOne) {
                                // for (var i = 0; i < secondaryMenuListLevelOne.length; i++)
                                secondaryMenuListLevelOne.forEach(secondaryMenuLevelOne => {
                                    // var secondaryMenuLevelOne: UserMenuAccessView = secondaryMenuListLevelOne[i];
                                    var userMenuAccessViewSecondaryLevelOne: UserMenuDef = this.userMenuAccessViewToUserMenuDef(secondaryMenuLevelOne);
                                    primaryMenuLevelTwoMenuAccessInfo.child.push(userMenuAccessViewSecondaryLevelOne);

                                    var secondaryParentDefLevelTwo = secondaryMenuLevelOne.menuParent.concat(secondaryMenuLevelOne.menuId.concat("|"));

                                    var secondaryMenuListLevelTwo: UserMenuAccessView[] = this.getMenuDefListByParent(menuRepository, secondaryParentDefLevelTwo, AppConstant.MENU_TYPE_SECONDARY);

                                    if (secondaryMenuListLevelTwo) {

                                        // for (var i = 0; i < secondaryMenuListLevelTwo.length; i++)
                                        secondaryMenuListLevelTwo.forEach(secondaryMenuLevelTwo => {
                                            // var secondaryMenuLevelTwo: UserMenuAccessView = secondaryMenuListLevelTwo[i];
                                            var userMenuAccessViewSecondaryLevelTwo: UserMenuDef = this.userMenuAccessViewToUserMenuDef(secondaryMenuLevelTwo);
                                            userMenuAccessViewSecondaryLevelOne.child.push(userMenuAccessViewSecondaryLevelTwo);

                                        });
                                    }
                                });
                            }
                        });

                    }
                    else {

                        var secondaryMenuListLevelOne: UserMenuAccessView[] = this.getMenuDefListByParent(menuRepository, primaryParentDefLevelTwo, AppConstant.MENU_TYPE_SECONDARY);

                        if (secondaryMenuListLevelOne) {
                            // for (var i = 0; i < secondaryMenuListLevelOne.length; i++)
                            secondaryMenuListLevelOne.forEach(secondaryMenuLevelOne => {
                                // var secondaryMenuLevelOne: UserMenuAccessView = secondaryMenuListLevelOne[i];
                                var userMenuAccessViewSecondaryLevelOne: UserMenuDef = this.userMenuAccessViewToUserMenuDef(secondaryMenuLevelOne);
                                primaryMenuLevelOneMenuAccessInfo.child.push(userMenuAccessViewSecondaryLevelOne);

                                var secondaryParentDefLevelTwo = secondaryMenuLevelOne.menuParent.concat(secondaryMenuLevelOne.menuId.concat("|"));

                                var secondaryMenuListLevelTwo: UserMenuAccessView[] = this.getMenuDefListByParent(menuRepository, secondaryParentDefLevelTwo, AppConstant.MENU_TYPE_SECONDARY);

                                if (secondaryMenuListLevelTwo) {

                                    // for (var i = 0; i < secondaryMenuListLevelTwo.length; i++)
                                    secondaryMenuListLevelTwo.forEach(secondaryMenuLevelTwo => {
                                        // var secondaryMenuLevelTwo: UserMenuAccessView = secondaryMenuListLevelTwo[i];
                                        var userMenuAccessViewSecondaryLevelTwo: UserMenuDef = this.userMenuAccessViewToUserMenuDef(secondaryMenuLevelTwo);
                                        userMenuAccessViewSecondaryLevelOne.child.push(userMenuAccessViewSecondaryLevelTwo);

                                    });
                                }
                            });
                        }

                    }

                }

            });
        }

        return userMenuAccessViews;
    }

    getMenuDefListByParent(menuRepository: UserMenuAccessView[], parentDef: string, menuType: string): UserMenuAccessView[] {

        var childMenuDefs: UserMenuAccessView[] = [];

        if (menuRepository) {
            menuRepository.forEach(eachMenuDef => {
                if (eachMenuDef.menuParent && eachMenuDef.menuParent == parentDef && eachMenuDef.menuTypeId == menuType) {
                    childMenuDefs.push(eachMenuDef);
                }
            });
        }

        return childMenuDefs;
    }

    prepareRoleWiseMenuAcccessListForSelectedUser(selectedUser: DxrRole[], roleWiseMenuAcccessList: RoleWiseMenuAcccessFetch[]): UserMenuAccessView[] {

        var userRoleWiseMenuAccessList: UserMenuAccessView[] = [];
        if (selectedUser) {
            selectedUser.forEach(element => {
                if (roleWiseMenuAcccessList) {
                    roleWiseMenuAcccessList.forEach(item => {
                        if (element.roleDefId == item.roleDefId) {
                            var checkValue = 0;
                            if (item.accessibleMenuListOfRole) {
                                item.accessibleMenuListOfRole.forEach(newMenu => {

                                    console.log(newMenu.menuTitleEng + " = " + newMenu.menuParent.split("|"))
                                    if ((newMenu.menuTypeId != AppConstant.MENU_TYPE_SECONDARY) || (newMenu.menuTypeId == AppConstant.MENU_TYPE_SECONDARY && newMenu.menuParent.split("|").length < 3)) {

                                        var copyOfUserRoleWiseMenuAccessList: UserMenuAccessView[] = Object.assign([], userRoleWiseMenuAccessList);
                                        var existFlag = false;
                                        if (userRoleWiseMenuAccessList && userRoleWiseMenuAccessList.length > 0) {
                                            copyOfUserRoleWiseMenuAccessList.forEach(oldMenu => {
                                                if (oldMenu.menuId == newMenu.menuId) {
                                                    checkValue++;
                                                    existFlag = true;
                                                    oldMenu.allActiveAccess.push(newMenu.activeAccess);
                                                    if (oldMenu.activeAccess.accessInfo && newMenu.activeAccess.accessInfo && oldMenu.activeAccess.accessInfo.accessTitle && newMenu.activeAccess.accessInfo.accessTitle && oldMenu.activeAccess.accessInfo.accessTitle.length < newMenu.activeAccess.accessInfo.accessTitle.length) {
                                                        oldMenu.activeAccess = newMenu.activeAccess;
                                                    }
                                                }
                                            });
                                            if (!existFlag) {

                                                userRoleWiseMenuAccessList.push(this.addNewMenuAccess(newMenu));

                                                checkValue++;
                                            }
                                        } else {
                                            userRoleWiseMenuAccessList.push(this.addNewMenuAccess(newMenu))


                                        }
                                    }
                                });
                            }


                        }

                    });

                }

            });
        }


        return userRoleWiseMenuAccessList;

    }

    addNewMenuAccess(addMenu: MenuAccessInfo): UserMenuAccessView {
        var userMenuAccessView: UserMenuAccessView = {
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

        }
        userMenuAccessView.menuId = addMenu.menuId;
        userMenuAccessView.menuTitle = addMenu.menuTitle;
        userMenuAccessView.menuTitleEng = addMenu.menuTitleEng;
        userMenuAccessView.menuTitleJpn = addMenu.menuTitleJpn;
        userMenuAccessView.menuUrl = addMenu.menuUrl;
        userMenuAccessView.parentSegment = addMenu.parentSegment;

        userMenuAccessView.menuGroupNameEng = addMenu.menuGroupNameEng;
        userMenuAccessView.menuGroupNameJpn = addMenu.menuGroupNameJpn;
        userMenuAccessView.primaryMenuNameEng = addMenu.primaryMenuNameEng;
        userMenuAccessView.primaryMenuNameJpn = addMenu.primaryMenuNameJpn;
        userMenuAccessView.secondaryMenuNameEng = addMenu.secondaryMenuNameEng;
        userMenuAccessView.secondaryMenuNameJpn = addMenu.secondaryMenuNameJpn;
        userMenuAccessView.menuParent = addMenu.menuParent;
        userMenuAccessView.menuTypeId = addMenu.menuTypeId;
        userMenuAccessView.menuTypeName = addMenu.menuTypeName;
        userMenuAccessView.activeAccess = addMenu.activeAccess;
        userMenuAccessView.companyCategoryId = addMenu.companyCategoryId;
        userMenuAccessView.companyCategoryName = addMenu.companyCategoryName;
        userMenuAccessView.allActiveAccess.unshift(addMenu.activeAccess);
        return userMenuAccessView;

    }

}
