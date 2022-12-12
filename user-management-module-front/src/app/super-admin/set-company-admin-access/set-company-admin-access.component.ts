import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-set-company-admin-access',
    templateUrl: './set-company-admin-access.component.html',
    styleUrls: ['./set-company-admin-access.component.css']
})
export class SetCompanyAdminAccessComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar) { }

    uiLabels: any = {
        formTitle: 'Set Company Admin Access',
        accessLabel: 'Access',
        setBtn: 'Set Company Admin Access',
        invalidJsonMessage: 'Incorrect JSON Format',
        accessSaveMessage: 'Company Admin Access Saved',

    };

    companyAdminAccess: string = '';

    ngOnInit(): void {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    jsonCorrect = true;
    setCompanyAdminAccess() {
        try {

            if (JSON.parse(this.companyAdminAccess)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setCompanyAdminAccess(this.companyAdminAccess).subscribe(data => {
                if (data) {
                    this.companyAdminAccess = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }


}
