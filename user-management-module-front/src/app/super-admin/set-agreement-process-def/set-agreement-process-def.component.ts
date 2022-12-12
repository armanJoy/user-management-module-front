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
    selector: 'app-set-agreement-process-def',
    templateUrl: './set-agreement-process-def.component.html',
    styleUrls: ['./set-agreement-process-def.component.css']
})
export class SetAgreementProcessDefComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar) { }

    uiLabels: any = {
        formTitle: 'Set Agreement Process Def',
        accessLabel: 'Access',
        setBtn: 'Set Agreement Process Def',
        invalidJsonMessage: 'Incorrect JSON Format',
        accessSaveMessage: 'Agreement Process Def Saved',

    };

    agreementProcessDef: string = '';

    ngOnInit(): void {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    jsonCorrect = true;
    setAgreementProcessDef() {
        try {

            if (JSON.parse(this.agreementProcessDef)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setAgreementProcessDef(this.agreementProcessDef).subscribe(data => {
                if (data) {
                    this.agreementProcessDef = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }

}
