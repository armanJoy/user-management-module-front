import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { JSEncrypt } from 'jsencrypt';
import { AppConstant } from 'src/app/config/app-constant';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LanguageService } from './language.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private cookieService: CookieService, private _snackBar: MatSnackBar, private languageService: LanguageService, private breakpointObserver: BreakpointObserver) { }



    getCookieExpireDate() {
        var date = new Date();
        return date.setMonth(date.getMonth() + AppConstant.COOKIE_EXPIRE_MONTH);
    }

    setBrowserSessionIdCookie(browserSessionId?: string) {
        if (!browserSessionId) {
            browserSessionId = this.generateUniqueId();
        }

        this.cookieService.set(AppConstant.BROWSER_SESSION_KEY, browserSessionId);

        return browserSessionId;
    }

    getBrowserSessionIdCookie() {
        return this.cookieService.get(AppConstant.BROWSER_SESSION_KEY);
    }

    setUserIdCookie(userId: string) {
        sessionStorage.setItem(AppConstant.AUTH_ID_KEY, userId);
        // var date = this.getCookieExpireDate();
        // return this.cookieService.set(AppConstant.AUTH_ID_KEY, userId, date);
    }

    setUserAuthPassCookie(userAuth: string) {
        sessionStorage.setItem(AppConstant.AUTH_PASS_KEY, userAuth);
        // var date = this.getCookieExpireDate();
        // return this.cookieService.set(AppConstant.AUTH_PASS_KEY, userAuth, date);
    }

    getUserListCookie() {
        return this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
    }

    setUserListCookie(userListCookie: any[]) {
        var date = this.getCookieExpireDate();
        this.cookieService.set(AppConstant.LOGGED_USER_COOKIE_KEY, JSON.stringify(userListCookie), date);
    }





    showSnackbar(message: string, duration: number) {

        this._snackBar.open(message, '', {
            duration: duration,
            verticalPosition: 'top',
        })
    }



    prepareContactNoFormate(contactNo: string): string {
        var formateContactNo: string = '';
        if (contactNo) {
            for (let index = 0; index < contactNo.length; index++) {
                formateContactNo = formateContactNo + contactNo[index];
                if (index == 1 || index == 5) {
                    formateContactNo += '-';
                }
            }
        }
        return formateContactNo;
    }

    prepareZipCodeFormate(zipcode: string) {

        var formatedZipcode = '〒';
        if (zipcode) {
            for (let index = 0; index < zipcode.length; index++) {

                formatedZipcode = formatedZipcode + zipcode[index];
                if (index == 2)
                    formatedZipcode += '-';

            }
        }

        return formatedZipcode;

    }

    getUserIdCookie() {
        var userId: any = (sessionStorage.getItem(AppConstant.AUTH_ID_KEY)) ? (sessionStorage.getItem(AppConstant.AUTH_ID_KEY)) : "";
        return userId;
    }

    getUserAuthPassCookie() {
        var userAuth: any = (sessionStorage.getItem(AppConstant.AUTH_PASS_KEY)) ? (sessionStorage.getItem(AppConstant.AUTH_PASS_KEY)) : "";
        return userAuth;
    }

    getCompanyIdCookie() {
        var companyId: any = (sessionStorage.getItem(AppConstant.SELECTED_COMPANY_ID_KEY)) ? (sessionStorage.getItem(AppConstant.SELECTED_COMPANY_ID_KEY)) : "";
        return companyId;
    }

    setCompanyIdCookie(companyId: string) {
        sessionStorage.setItem(AppConstant.SELECTED_COMPANY_ID_KEY, companyId);
    }



    generateAlphaNumericPassword() {

        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        var pass = '';

        for (var i = 0; i < 8; i++) {

            pass += randomChars.charAt(Math.floor(Math.random() * randomChars.length));

        }

        return pass;

    }

    generateUniqueId(): string {
        return uuidv4();
    }

    encrypt(password: string) {

        let publicKey2048 = AppConstant.DXR_AUTH_ID;

        let RSAEncrypt = new JSEncrypt();
        RSAEncrypt.setPublicKey(publicKey2048);

        return RSAEncrypt.encrypt(password);
    }

    checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }

}
