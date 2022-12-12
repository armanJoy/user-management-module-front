import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { AppConstant } from 'src/app/config/app-constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-set-dxr-admin-access',
    templateUrl: './set-dxr-admin-access.component.html',
    styleUrls: ['./set-dxr-admin-access.component.css']
})
export class SetDxrAdminAccessComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar, private utilService: UtilService) { }

    // uiLabels: any = {
    //     formTitle: 'Set DXR Admin Access',
    //     fullName: 'Access',
    //     createBtn: 'Set DXR Admin Access'
    // };
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SET_DXR_ADMIN, AppConstant.UI_LABEL_TEXT);

    dxrAdminAccess: string = '';

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SET_DXR_ADMIN;

        this.uiLabels.accessSaveMessage = 'DX-R Admin Access Saved';

        this.uiLabels.invalidJsonMessage = 'Incorrect JSON Format';

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    jsonCorrect = true;
    setDxrAdminAccess() {
        try {

            if (JSON.parse(this.dxrAdminAccess)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setDxrAdminAccess(this.dxrAdminAccess).subscribe(data => {
                if (data) {
                    this.dxrAdminAccess = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }
}
