import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from 'src/app/app.component';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { ChangeUserIdentification, UserIdentification } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-first-time-login',
    templateUrl: './first-time-login.component.html',
    styleUrls: ['./first-time-login.component.css']
})
export class FirstTimeLoginComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private appComponent: AppComponent, private cookieService: CookieService, private router: Router, private superAdminService: SuperAdminService, private utilService: UtilService, private activatedroute: ActivatedRoute) { }

    uiLabels: any;
    userId: any = '';



    newPassword: string = '';
    confirmPassword: string = '';
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CHANGE_PASSWORD;

        this.activatedroute.paramMap.subscribe(params => {

            this.userId = (params.get('userId')) ? (params.get('userId')) : '';

        });

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CHANGE_PASSWORD, AppConstant.UI_LABEL_TEXT);
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    passwordMatchFlag = '';

    checkPasswordSimilarity() {
        if (this.newPassword == this.confirmPassword) {
            this.passwordMatchFlag = AppConstant.PASSWORD_MATCHED_FLAG;

        } else {
            this.passwordMatchFlag = AppConstant.PASSWORD_NOT_MATCHED_FLAG;

        }
    }

    changePassword() {

        if (this.userId && this.newPassword == this.confirmPassword) {
            var encryptedPass = this.utilService.encrypt(this.confirmPassword);

            if (encryptedPass && encryptedPass.length > 0) {
                var newIdentification: UserIdentification = {
                    userId: this.userId,
                    userAuth: encryptedPass,
                    oneTimeAccessFlag: AppConstant.ONE_TIME_ACCESS_FLAG_TRUE,
                }

                this.userLoginService.chnageFirstLoginPassword(newIdentification).subscribe((response: string) => {
                    if (response && response == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                        alert('Password change successful. Please login using new password.');
                        window.location.assign('/visitor/login');
                    } else {
                        alert('Cannot set new password. Please try again.');
                    }
                });
            }
        }

    }
}
