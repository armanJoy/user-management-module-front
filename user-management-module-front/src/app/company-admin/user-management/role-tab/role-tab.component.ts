import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CompanyInfoFetch, UserInfoFetch, DxrRoleSelectionView, sentSelectedUserDataForSetRole, DxrRole, RoleWiseMenuAcccessFetch, UserMenuAccessView, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { MenuAccessTabComponent } from '../menu-access-tab/menu-access-tab.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-role-tab',
    templateUrl: './role-tab.component.html',
    styleUrls: ['./role-tab.component.css']
})
export class RoleTabComponent implements OnInit {
    // @ViewChild(MenuAccessTabComponent) childMenuAccessTab: any;
    @Input()
    isViewMode!: boolean;

    @Input()
    public selectTab!: (index: number, menuAccesList: UserMenuAccessView[]) => void;
    @Input()
    dxrRolelist!: DxrRole[];

    @Input()
    selectedUser!: SelectedUserView;
    @Input()
    DxrRoleListViewForSelectedUser!: DxrRoleSelectionView[];
    @Input()
    roleWiseMenuAccessList!: RoleWiseMenuAcccessFetch[];
    @Input()
    SendUserInfo!: UserInfoFetch;
    @Input()
    public sendRole!: (dxrRoleList: DxrRole[]) => void;


    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private userMangementOperatinService: UserMangementOperatinService, private languageService: LanguageService, private utilService: UtilService) { }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ROLE_TAB, AppConstant.UI_LABEL_TEXT);
    // uiLabels: any = {
    //     userName: 'User Name',
    //     email: 'Email',
    //     contactNo: 'Contact No',
    //     viewAccessBtn: 'View Access',
    //     dumper: 'Dumper',
    //     processor: 'Processor',
    //     transporter: 'Transporter'

    // }

    DxrRoleForSelectedUser: DxrRoleSelectionView[] = [];
    updateDxrRoleListForUser: DxrRole[] = [];
    updateRoleWiseMenuAccess: UserMenuAccessView[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;


    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ROLE_TAB;

        // this.isViewMode = true;
        this.DxrRoleForSelectedUser = Object.assign([], this.DxrRoleListViewForSelectedUser);
        this.updateDxrRoleListForUser = this.onCheckboxChangeupdateRoleForUser(this.DxrRoleForSelectedUser);

        if (this.roleWiseMenuAccessList && this.SendUserInfo)
            this.updateRoleWiseMenuAccess = this.userMangementOperatinService.prepareRoleWiseMenuAcccessListForSelectedUser(this.SendUserInfo.userRoles, this.roleWiseMenuAccessList);
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    onCheckboxChangeupdateRoleForUser(role: DxrRoleSelectionView[]): DxrRole[] {
        var onChangeDxrRoleForUserList: DxrRole[] = [];

        role.forEach(element => {
            var userRole: DxrRole = {
                roleDefId: '',
                roleName: '',
                roleCode: '',
                roleDescription: '',
                companyCategoryId: '',
                companyCategoryName: '',

            }
            if (element.isCheck) {
                userRole.companyCategoryId = element.companyCategoryId;
                userRole.companyCategoryName = element.companyCategoryName;
                userRole.roleCode = element.roleCode;
                userRole.roleDefId = element.roleDefId;
                userRole.roleDescription = element.roleDescription;
                userRole.roleName = element.roleName;
                onChangeDxrRoleForUserList.push(userRole);
            }
        });
        return onChangeDxrRoleForUserList;

    }
    changeTabForAddRoleOfSelectedUser(menuAcces: UserMenuAccessView[]) {
        this.selectTab(1, menuAcces);

    }


    onCheckboxChange(e: any) {

        // alert('hi');
        var role: DxrRoleSelectionView[] = Object.assign([], this.DxrRoleForSelectedUser);
        var dxrRoleForUser: DxrRole[] = [];

        if (e) {
            this.DxrRoleForSelectedUser.forEach(element => {
                if (e.target.value == element.roleDefId) {
                    element.isCheck = e.target.checked;

                }

            });
        }

        dxrRoleForUser = this.onCheckboxChangeupdateRoleForUser(this.DxrRoleForSelectedUser);
        if (this.sendRole)
            this.sendRole(dxrRoleForUser);
        this.updateDxrRoleListForUser = dxrRoleForUser;
        this.updateRoleWiseMenuAccess = this.userMangementOperatinService.prepareRoleWiseMenuAcccessListForSelectedUser(dxrRoleForUser, this.roleWiseMenuAccessList);
        if (this.isViewMode) { this.selectTab(0, this.updateRoleWiseMenuAccess); }
    }

}
