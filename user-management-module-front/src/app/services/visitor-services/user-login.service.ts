import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { ChangeUserIdentification, DefaultCompany, LogoutEventInfo, UserIdentification, UserSession } from 'src/app/models/backend-update/user-login';
import { UriService } from './uri.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class UserLoginService {

    constructor(private http: HttpClient, private uriService: UriService, private utilService: UtilService, private cookieService: CookieService) { }

    // public saveUserSession(userEmail: string): Observable<UserSession> {

    //     var id: string = this.utilService.generateUniqueId();
    //     var userSession: UserSession = {
    //         userSessionId: id,
    //         userSessionEmail: userEmail,
    //         userSessionStartDate: "12"
    //     }

    //     var url = '/cookie/save-user-session';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, userSession);
    // }

    // public getUserSession(userEmail: string): Observable<UserSession> {
    //     var url = '/cookie/get';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, userEmail);
    // }

    // public clearUserSession(userEmail: string | null): Observable<string> {
    //     var url = '/cookie/clear';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, userEmail);
    // }

    // public publishLogoutEvent(logoutEventInfo: LogoutEventInfo): Observable<string> {
    //     var url = '/cookie/publish-logout-event';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, logoutEventInfo);
    // }

    // public saveDefaultCompanyPreference(defaultCompany: DefaultCompany): Observable<any> {
    //     var url = '/user-management/save-default-company';
    //     return this.uriService.callBackend(url, AppConstant.HTTP_POST, defaultCompany);
    // }

    // getUserLoginCookieList() {
    //     return this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
    // }

    setUserLoginCookie(userId: string, userAuth: string, callBack: any) {
        setTimeout(() => {
            this.utilService.setUserIdCookie(userId);
            this.utilService.setUserAuthPassCookie(userAuth);
            callBack();

        }, 200);
    }

    getInitialLoginUserCookie() {
        debugger
        var initialLoginUser: any;

        var userId: string = this.utilService.getUserIdCookie();
        var userAuth: string = this.utilService.getUserAuthPassCookie();

        if (userId && userAuth) {
            initialLoginUser = {
                userId: userId,
                userAuth: userAuth,
            }
        }

        return initialLoginUser;
    }

    // setUserIdCookie(userId: string) {
    //     var date = this.getCookieExpireDate();
    //     return this.cookieService.set(AppConstant.AUTH_ID_KEY, userId, date);
    // }

    getCookieExpireDate() {
        var date = new Date();
        return date.setMonth(date.getMonth() + AppConstant.COOKIE_EXPIRE_MONTH);
    }

    clearUserCookie(callBack: any) {
        var cookieDeleteDate = Date.parse(AppConstant.COOKIE_EXPIRE_DATE);
        this.cookieService.set(AppConstant.AUTH_ID_KEY, "", cookieDeleteDate);
        this.cookieService.set(AppConstant.AUTH_PASS_KEY, "", cookieDeleteDate);
        callBack();
    }


    public login(userIdentification: UserIdentification): Observable<any> {
        var url = '/user-management/login';
        var loginResponse: any;
        loginResponse = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return loginResponse;
    }

    // public getAccessInfo(userIdentification: UserIdentification): Observable<any> {
    //     var url = '/user-management/get-access-info';
    //     var menuAccessInfo: any;
    //     menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
    //     return menuAccessInfo;
    // }

    // public chnagePassword(userIdentification: ChangeUserIdentification): Observable<string> {
    //     var url = '/user-management/change-password';
    //     var menuAccessInfo: any;
    //     menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
    //     return menuAccessInfo;
    // }

    // public chnageFirstLoginPassword(userIdentification: UserIdentification): Observable<string> {
    //     var url = '/user-management/change-first-login-password';
    //     var menuAccessInfo: any;
    //     menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
    //     return menuAccessInfo;
    // }
}
