import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { AccessDef, AccessDefSelectionView, ActiveAccess, DxrRole, DxrRoleSelectionView } from 'src/app/models/backend-fetch/role-def-fetch';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-role-assign-popup',
    templateUrl: './role-assign-popup.component.html',
    styleUrls: ['./role-assign-popup.component.css']
})

export class RoleAssignPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private languageService: LanguageService, public dialogRef: MatDialogRef<RoleAssignPopupComponent>, private utilService: UtilService) { }

    categoryRoles: DxrRole[] = [];
    roleAccessDefViewList: DxrRoleSelectionView[] = [];
    allActiveAccess: ActiveAccess[] = [];

    accessList: AccessDefSelectionView[] = [
        {
            accessInfo: {
                accessDefId: 'access0001',
                accessTitle: 'View'
            },
            isSelected: false
        },
        {
            accessInfo: {
                accessDefId: 'access0002',
                accessTitle: 'View and Browse'
            },
            isSelected: false
        },
        {
            accessInfo: {
                accessDefId: 'access0003',
                accessTitle: 'View, Browse and Edit'
            },
            isSelected: false
        }
    ]

    // uiLabels: any = {
    //     pageHeader: 'Role Access',
    //     updateBtn: 'Update',
    //     cancelBtn: 'Cancel'

    // }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ROLE_ASSIGN, AppConstant.UI_LABEL_TEXT);

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ROLE_ASSIGN;

        if (this.data) {
            this.categoryRoles = this.data.allAccess;
            this.allActiveAccess = this.data.allActiveAccess;
            this.roleAccessDefViewList = this.prepareRoleAccessDef(this.allActiveAccess);
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

    // roleSelectionChange($event:any) {
    //     if()
    // }

    prepareRoleAccessDef(roleAccessDefList: ActiveAccess[]): DxrRoleSelectionView[] {
        var roleAccessDefViewList: DxrRoleSelectionView[] = [];

        this.categoryRoles.forEach(eachRole => {
            var roleItem: DxrRoleSelectionView = {
                roleDefInfo: eachRole,
                accessList: Object.assign([], this.accessList),
                selectedAccess: '',
                isSelected: false
            }
            if (roleItem.accessList) {
                roleItem.accessList.forEach(eachAccess => {
                    if (this.allActiveAccess) {
                        this.allActiveAccess.forEach(eachActiveAccess => {
                            if (eachActiveAccess && eachActiveAccess.roleInfo.roleDefId == eachRole.roleDefId && eachAccess.accessInfo.accessDefId == eachActiveAccess.accessInfo.accessDefId) {
                                roleItem.selectedAccess = eachAccess.accessInfo.accessDefId;
                                roleItem.isSelected = true;
                            }
                        });
                    }
                });
            }

            roleAccessDefViewList.push(roleItem);

        });
        return roleAccessDefViewList;
    }

    updateMenuRoleAccess() {

        var updatedMenuRoleAccess: ActiveAccess[] = this.prepareUpdatedMenuRoleAccess();

        this.dialogRef.close(updatedMenuRoleAccess);

    }

    prepareUpdatedMenuRoleAccess() {
        var updatedMenuRoleAccess: ActiveAccess[] = []
        this.roleAccessDefViewList.forEach(eachRole => {
            if (eachRole.isSelected) {
                eachRole.accessList.forEach(eachAccess => {
                    if (eachAccess.accessInfo.accessDefId == eachRole.selectedAccess) {
                        var activeRole: ActiveAccess = {
                            roleInfo: eachRole.roleDefInfo,
                            accessInfo: {
                                accessDefId: eachAccess.accessInfo.accessDefId,
                                accessTitle: eachAccess.accessInfo.accessTitle
                            }
                        };
                        updatedMenuRoleAccess.push(activeRole);
                    }
                });
            }
        });

        return updatedMenuRoleAccess;
    }

}
