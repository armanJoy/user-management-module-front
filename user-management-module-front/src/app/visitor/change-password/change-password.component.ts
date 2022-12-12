import { Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeUserIdentification, UserIdentification } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) private data: any, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private utilService: UtilService) { }

    uiLabels: any;
    userId: string = '';
    fromUserProfile: boolean = false;
    componentCode!: string;
    isSystemAdmin: boolean = false;
    oneTimeAccessFlagTrue: string = AppConstant.ONE_TIME_ACCESS_FLAG_TRUE;

    newIdentification: ChangeUserIdentification = {
        userId: '',
        accessCode: '',
        oneTimeAccessFlag: '',
        newAuth: ''
    }

    newPassword: string = '';
    confirmPassword: string = '';

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CHANGE_PASSWORD, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CHANGE_PASSWORD;
        if (this.data) {

            this.newIdentification.userId = this.data.userId;
            this.fromUserProfile = this.data.fromProfile;
        }
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    sendAccessCode() {
        // this.newIdentification.oneTimeAccessFlag = AppConstant.ONE_TIME_ACCESS_FLAG_TRUE;
        if (this.newIdentification.userId) {
            this.superAdminService.resendUserAccess(this.newIdentification.userId).subscribe((response: String) => {
                if (response && response == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                    alert('Please check mail for your user access information.');
                    this.newIdentification.oneTimeAccessFlag = AppConstant.ONE_TIME_ACCESS_FLAG_TRUE;
                } else {
                    alert('Couldn\'t send Access Code. Please try again.');
                }
            });

        }

    }

    changePassword() {

        if (this.newIdentification && this.newIdentification.accessCode && this.newPassword == this.confirmPassword) {
            var encryptedPass = this.utilService.encrypt(this.confirmPassword);
            if (encryptedPass && encryptedPass.length > 0) {
                this.newIdentification.newAuth = encryptedPass;
                this.userLoginService.chnagePassword(this.newIdentification).subscribe((response: string) => {
                    if (response && response == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                        alert('Password change successfull. Please login using new password.');
                        window.location.assign('/visitor/login');
                    } else {
                        alert('Access Code dosn\'t match. Please check your Access Code.');
                    }
                });
            }
        }

    }

    passwordMatchFlag = '';

    checkPasswordSimilarity() {
        if (this.newPassword == this.confirmPassword) {
            this.passwordMatchFlag = AppConstant.PASSWORD_MATCHED_FLAG;

        } else {
            this.passwordMatchFlag = AppConstant.PASSWORD_NOT_MATCHED_FLAG;

        }
    }
}
