import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';

@Component({
    selector: 'app-set-subscripton-process-def',
    templateUrl: './set-subscripton-process-def.component.html',
    styleUrls: ['./set-subscripton-process-def.component.css']
})
export class SetSubscriptonProcessDefComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar) { }

    uiLabels: any = {
        formTitle: 'Set Subscription Process Def',
        accessLabel: 'Access',
        setBtn: 'Set Subscription Process Def',
        invalidJsonMessage: 'Incorrect JSON Format',
        accessSaveMessage: 'Subscription Process Def Saved',

    };

    subscriptionProcessDef: string = '';

    ngOnInit(): void {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    jsonCorrect = true;
    setSubscriptionProcessDef() {
        try {

            if (JSON.parse(this.subscriptionProcessDef)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setSubscriptionProcessDef(this.subscriptionProcessDef).subscribe(data => {
                if (data) {
                    this.subscriptionProcessDef = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }


}
