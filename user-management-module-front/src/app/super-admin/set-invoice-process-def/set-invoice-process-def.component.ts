import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';

@Component({
    selector: 'app-set-invoice-process-def',
    templateUrl: './set-invoice-process-def.component.html',
    styleUrls: ['./set-invoice-process-def.component.css']
})
export class SetInvoiceProcessDefComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private _snackBar: MatSnackBar) { }

    uiLabels: any = {
        formTitle: 'Set Invoice Process Def',
        accessLabel: 'Access',
        setBtn: 'Set Invoice Process Def',
        invalidJsonMessage: 'Incorrect JSON Format',
        accessSaveMessage: 'Invoice Process Def Saved',

    };

    invoiceProcessDef: string = '';

    ngOnInit(): void {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    jsonCorrect = true;
    setInvoiceProcessDef() {
        try {

            if (JSON.parse(this.invoiceProcessDef)) {
                this.jsonCorrect = true;
            }

        } catch (error) {
            this.jsonCorrect = false;

        }

        if (this.jsonCorrect == true) {
            this.superAdminService.setInvoiceProcessDef(this.invoiceProcessDef).subscribe(data => {
                if (data) {
                    this.invoiceProcessDef = '';
                    this._snackBar.open(this.uiLabels.accessSaveMessage, '', {
                        duration: 3000,
                        verticalPosition: 'top'
                    })
                }
            })
        }
    }

}
