import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';

@Component({
    selector: 'app-set-notification-process-def',
    templateUrl: './set-notification-process-def.component.html',
    styleUrls: ['./set-notification-process-def.component.css']
})
export class SetNotificationProcessDefComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar) { }

    ngOnInit(): void {

    }

    uiLabels: any = {
        formTitle: 'Set Notification Process Def',
        accessLabel: 'Access',
        setBtn: 'Set Notification Process Def',
        invalidJsonMessage: 'Incorrect JSON Format',
        accessSaveMessage: 'Notification Process Def Saved',

    };

    notificationProcessDef: string = '';

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    jsonCorrect = true;
    setNotificationProcessDef() {
        try {

            if (JSON.parse(this.notificationProcessDef)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setNotificationProcessDef(this.notificationProcessDef).subscribe(data => {
                if (data) {
                    this.notificationProcessDef = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }

}
