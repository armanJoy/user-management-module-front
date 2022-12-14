import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UserIdentification } from 'src/app/models/backend-update/user-login';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { AppComponent } from 'src/app/app.component';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private appComponent: AppComponent, private cookieService: CookieService, private router: Router, private matDialog: MatDialog, private utilService: UtilService, private activatedroute: ActivatedRoute) { }

    uiLabels: any;
    userIdentification: UserIdentification = {
        userId: '',
        userAuth: '',
    }
    userIdOrPasswordMatchFlag: string = '';
    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    firstStepAuthDone: boolean = false;
    otp: string = "";
    resendTimeOut: boolean = false;
    encryptedPass: any = "";
    login() {
        if (this.userIdentification && this.userIdentification.userId && this.userIdentification.userAuth) {

            var userIdLowerCase = this.userIdentification.userId.toLowerCase();
            var userId = userIdLowerCase.trim();
            this.userIdentification.userId = userId
            this.encryptedPass = this.utilService.encrypt(this.userIdentification.userAuth);
            if (this.encryptedPass && this.encryptedPass.length > 0) {

                var userIdentification: UserIdentification = Object.assign({}, this.userIdentification);
                userIdentification.userAuth = this.encryptedPass;

                this.userLoginService.initialLogin(userIdentification).subscribe(data => {

                    if (data) {

                        this.firstStepAuthDone = true;
                        this.initiateOtpOp();

                        // if (data == AppConstant.ONE_TIME_ACCESS_FLAG_TRUE) {
                        //     this.redirectToFirstLogin();

                        // } else {
                        //     this.userLoginService.saveUserSession(userIdentification.userId).subscribe(response => {
                        //         if (response) {

                        //             var userAccess: any[] = data;
                        //             var defaultCompany: any = (userAccess.find(item => item.preference == true));
                        //             if (!defaultCompany) {
                        //                 defaultCompany = userAccess[0];
                        //             }

                        //             this.userLoginService.setUserLoginCookie(userIdentification.userId, userIdentification.userAuth, defaultCompany.companyId, defaultCompany.companyId, this.utilService.getSelectedLanguageIndex(), () => {
                        //                 // this.appComponent.prepareUserAccessAndMenu(data);

                        //                 //this.resetForm();
                        //             });
                        //         }
                        //     });

                        // }

                    } else if (!data || data == '') {
                        this.userIdOrPasswordMatchFlag = AppConstant.USER_ID_OR_PASSWORD_NOT_MATCH_FLAG;
                    }
                });
            }

        }
    }

    confirmOtp() {
        this.userLoginService.confirmOtp(this.userIdentification.userId, this.otp).subscribe(response => {
            if (response) {
                this.userLoginService.setUserLoginCookie(this.userIdentification.userId, this.encryptedPass, () => {
                    this.firstStepAuthDone = false;
                    this.resendTimeOut = false;
                    this.resetForm();

                    this.appComponent.prepareUserAccessAndMenu(true);
                    this.redirectToHome();
                });
            } else {
                this.utilService.showSnackbar("Invalid or expired OTP", 3000)
            }
        })

    }

    initiateOtpOp() {
        this.resendTimeOut = false;
        setTimeout(() => { this.resendTimeOut = true }, 60000);
    }

    resendOtp() {
        this.userLoginService.resendOtp(this.userIdentification.userId).subscribe(response => {
            if (response && response == AppConstant.TRUE_STATEMENT) {
                this.initiateOtpOp();
            }
        })

    }

    resetForm() {
        this.userIdentification = {
            userId: '',
            userAuth: '',
        }
    }

    redirectToHome() {
        this.router.navigate(['/']);
    }





}
