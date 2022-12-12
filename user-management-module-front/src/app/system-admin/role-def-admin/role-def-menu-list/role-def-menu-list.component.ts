import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { MatDialog } from '@angular/material/dialog';
import { RoleAssignPopupComponent } from '../role-assign-popup/role-assign-popup.component';
import { RoleDefAdminService } from 'src/app/services/operation-services/role-def-admin.service';
import { AppConstant } from 'src/app/config/app-constant';
import { DxrRole, MenuAccessInfo, MenuDef, MenuItem, MenuRoleAccessUpdate, RoleAccessDefUpdate, RoleMenusUpdate, RoleWiseMenuAcccessFetch, RoleWiseMenuAcccessInfoUpdate, UserMenuAccessView } from 'src/app/models/backend-fetch/role-def-fetch';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-role-def-menu-list',
    templateUrl: './role-def-menu-list.component.html',
    styleUrls: ['./role-def-menu-list.component.css']
})
export class RoleDefMenuListComponent implements OnInit {

    @Input()
    selectedCompanyCategoryId!: String;

    @Input()
    selectedCategoryRoles!: DxrRole[];

    @Input()
    dxrRoles!: DxrRole[];

    @Input()
    menuList!: UserMenuAccessView[];

    @Input()
    fullMenuList!: UserMenuAccessView[];

    @Input()
    menuRepository!: MenuDef[]

    constructor(private roleDefAdminService: RoleDefAdminService, private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private languageService: LanguageService, private utilService: UtilService) { }
    // uiLabels: any = {
    //     menuLabel: 'Menu',
    //     menuGroupLabel: 'Menu Group',
    //     roleLabel: 'Role',
    //     updateBtn: 'Update',
    // }
    // uiLabels = this.languageService.getUiLabels(AppConstant.COMP.ROLE_DEF_LIST, AppConstant.UI_LABEL_TEXT);

    componentCode!: string;
    isSystemAdmin: boolean = false;

    thirdLabelView: boolean = AppConstant.RHIRD_LABEL_VIEW;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ROLE_DEF_LIST;

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ROLE_DEF_LIST, AppConstant.UI_LABEL_TEXT);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    selectedMenuIndex: number = -1;
    selectedParentList: UserMenuAccessView[] = [];

    updateRoleAccess(parentList: UserMenuAccessView[], index: number, parentMenuItemId: string) {

        this.selectedMenuIndex = index;
        this.selectedParentList = parentList;

        const roleUpdatePopup = this.dialog.open(RoleAssignPopupComponent, {

            width: '80%',
            data: {
                allActiveAccess: this.selectedParentList[this.selectedMenuIndex].allActiveAccess,
                allAccess: this.selectedCategoryRoles
            },
        });

        roleUpdatePopup.afterClosed().subscribe(returnData => {

            if (returnData) {
                var menuDef = Object.assign({}, this.selectedParentList[this.selectedMenuIndex]);
                menuDef.allActiveAccess = returnData;

                var menuRoleAccess: MenuRoleAccessUpdate = this.prepareMenuActiveAccess(menuDef);

                this.roleDefAdminService.saveMenuRoleAccess(menuRoleAccess).subscribe(savedData => {
                    if (savedData) {
                        this.selectedParentList[this.selectedMenuIndex].allActiveAccess = returnData;
                        // this.updateMainList(this.selectedParentList, parentMenuItemId);
                        this.updateMenuRepository(menuDef);
                    }

                    var rolesWiseMenuIdList: RoleMenusUpdate[] = this.prepareRoleMenuIdList();
                    var roleWiseMenuAccessInfoList: RoleWiseMenuAcccessInfoUpdate[] = this.prepareRoleWiseMenuAccessInfoList();

                    this.roleDefAdminService.saveRolesWiseMenuIdList(rolesWiseMenuIdList).subscribe(data => {
                        if (data) {

                        }

                    });

                    this.roleDefAdminService.saveRoleWiseMenuAccessInfoList(roleWiseMenuAccessInfoList).subscribe(data => {
                        if (data) {

                        }
                    });
                });

            }
        });
    }

    updateMainList(selectedParentList: UserMenuAccessView[], parentMenuItemId: string) {
        this.fullMenuList.forEach((element: UserMenuAccessView) => {
            if (!parentMenuItemId || parentMenuItemId == '') {
                this.fullMenuList = selectedParentList;
            } else if (parentMenuItemId && element.menuId == parentMenuItemId) {

                element.children = selectedParentList;
            }
        });

    }

    updateMenuRepository(menuDef: UserMenuAccessView) {
        this.menuRepository.forEach((element: MenuDef) => {
            if (element.menuId == menuDef.menuId) {
                element.allActiveAccess = menuDef.allActiveAccess;
            }
        });

    }

    prepareRoleMenuIdList() {
        var rolesWiseMenuIdList: RoleMenusUpdate[] = [];
        this.selectedCategoryRoles.forEach(eachRole => {
            var roleMenus: RoleMenusUpdate = {
                roleDefId: eachRole.roleDefId,
                menuIdList: []
            };
            if (this.menuRepository) {
                this.menuRepository.forEach(eachMenu => {
                    if (eachMenu) {
                        if (eachMenu.allActiveAccess) {
                            eachMenu.allActiveAccess.forEach(eachAssignedRole => {
                                if (eachAssignedRole.roleInfo.roleDefId == eachRole.roleDefId) {
                                    roleMenus.menuIdList.push(eachMenu.menuId);
                                }
                            });
                        }
                    }
                });
            }
            rolesWiseMenuIdList.push(roleMenus);

        });

        return rolesWiseMenuIdList;
    }

    prepareRoleWiseMenuAccessInfoList() {
        var roleWiseMenuAccessInfoList: RoleWiseMenuAcccessInfoUpdate[] = [];
        this.selectedCategoryRoles.forEach(eachRole => {
            var roleMenus: RoleWiseMenuAcccessInfoUpdate = {
                roleDefId: eachRole.roleDefId,
                accessibleMenuListOfRole: []
            };

            if (this.menuRepository) {
                this.menuRepository.forEach(eachMenu => {
                    if (eachMenu) {
                        if (eachMenu.allActiveAccess) {
                            eachMenu.allActiveAccess.forEach(eachAssignedRole => {
                                if (eachAssignedRole.roleInfo.roleDefId == eachRole.roleDefId) {

                                    var menuAccessInfo: MenuAccessInfo = {
                                        menuId: eachMenu.menuId,
                                        menuTitle: eachMenu.menuTitleEng,
                                        menuTitleEng: eachMenu.menuTitleEng,
                                        menuTitleJpn: eachMenu.menuTitleJpn,
                                        menuUrl: eachMenu.menuUrl,
                                        parentSegment: eachMenu.parentSegment,
                                        menuGroupNameEng: eachMenu.menuGroupNameEng,
                                        menuGroupNameJpn: eachMenu.menuGroupNameJpn,
                                        primaryMenuNameEng: eachMenu.primaryMenuNameEng,
                                        primaryMenuNameJpn: eachMenu.primaryMenuNameJpn,
                                        secondaryMenuNameEng: eachMenu.secondaryMenuNameEng,
                                        secondaryMenuNameJpn: eachMenu.secondaryMenuNameJpn,
                                        menuParent: eachMenu.menuParent,
                                        menuTypeId: eachMenu.menuTypeId,
                                        menuTypeName: eachMenu.menuTypeName,
                                        companyCategoryId: eachMenu.companyCategoryId,
                                        companyCategoryName: eachMenu.companyCategoryName,
                                        activeAccess: eachAssignedRole
                                    }
                                    var menuItem: MenuItem = {
                                        menuId: eachMenu.menuId,
                                        menuUrl: eachMenu.menuUrl,
                                        parentSegment: eachMenu.parentSegment,
                                        menuTitleEng: eachMenu.menuTitleEng,
                                        menuTitleJpn: eachMenu.menuTitleJpn,
                                        menuParent: eachMenu.menuParent,
                                        menuTypeId: eachMenu.menuTypeId,
                                        companyCategoryId: eachMenu.companyCategoryId,
                                        accessId: eachAssignedRole.accessInfo.accessDefId,
                                    }
                                    roleMenus.accessibleMenuListOfRole.push(menuAccessInfo);
                                }
                            });
                        }
                    }
                });
            }
            roleWiseMenuAccessInfoList.push(roleMenus);

        });
        return roleWiseMenuAccessInfoList;

    }

    prepareMenuActiveAccess(updatedMenu: UserMenuAccessView) {
        var menuRoleAccess!: MenuRoleAccessUpdate;

        if (updatedMenu) {
            menuRoleAccess = {
                menuDefId: updatedMenu.menuId,
                roleAccessList: []
            }
            menuRoleAccess.menuDefId = updatedMenu.menuId;
            updatedMenu.allActiveAccess.forEach(element => {
                var eachActiveAccess: RoleAccessDefUpdate = {
                    roleDefId: element.roleInfo.roleDefId,
                    accessDefId: element.accessInfo.accessDefId
                }
                menuRoleAccess.roleAccessList.push(eachActiveAccess);
            });
        }
        return menuRoleAccess;
    }
}
