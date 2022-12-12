import { Component, Input, OnInit } from '@angular/core';
import { CompanyInfoFetch, UserInfoFetch, DxrRoleSelectionView, sentSelectedUserDataForSetRole, DxrRole, UserMenuAccessView, RoleWiseMenuAcccessFetch, SelectedUserView } from 'src/app/models/backend-fetch/user-management-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-menu-access-tab',
    templateUrl: './menu-access-tab.component.html',
    styleUrls: ['./menu-access-tab.component.css']
})
export class MenuAccessTabComponent implements OnInit {
    @Input()
    selectedUser!: SelectedUserView;
    @Input()
    SendUserInfo!: UserInfoFetch;
    @Input()
    menuAccessList: UserMenuAccessView[] = [];
    @Input()
    roleWiseMenuAccessList!: RoleWiseMenuAcccessFetch[];
    constructor(private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private userMangementOperatinService: UserMangementOperatinService, private languageService: LanguageService, private utilService: UtilService) { }


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.MENU_ACCESS_TAB;
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.MENU_ACCESS_TAB, AppConstant.UI_LABEL_TEXT);

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }


}
