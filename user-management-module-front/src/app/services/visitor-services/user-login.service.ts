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

    public saveUserSession(userEmail: string): Observable<UserSession> {

        var id: string = this.utilService.generateUniqueId();
        var userSession: UserSession = {
            userSessionId: id,
            userSessionEmail: userEmail,
            userSessionStartDate: "12"
        }

        var url = '/cookie/save-user-session';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userSession);
    }

    public getUserSession(userEmail: string): Observable<UserSession> {
        var url = '/cookie/get';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userEmail);
    }

    public clearUserSession(userEmail: string | null): Observable<string> {
        var url = '/cookie/clear';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userEmail);
    }

    public publishLogoutEvent(logoutEventInfo: LogoutEventInfo): Observable<string> {
        var url = '/cookie/publish-logout-event';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, logoutEventInfo);
    }

    public saveDefaultCompanyPreference(defaultCompany: DefaultCompany): Observable<any> {
        var url = '/user-management/save-default-company';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, defaultCompany);
    }

    getUserLoginCookieList() {
        return this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
    }

    updateLanguageCookie(userId: string, langIndex: string, callBack: any) {
        sessionStorage.setItem(AppConstant.LANG_INDEX_KEY, langIndex);
        callBack();
    }

    setSessionCookie(userId: string, userAuth: string, companyId: string, langIndex: string, callBack: any) {
        debugger
        setTimeout(() => {
            sessionStorage.clear();
            setTimeout(() => {
                sessionStorage.setItem(AppConstant.AUTH_ID_KEY, userId);
                sessionStorage.setItem(AppConstant.AUTH_PASS_KEY, userAuth);
                sessionStorage.setItem(AppConstant.SELECTED_COMPANY_ID_KEY, companyId);
                sessionStorage.setItem(AppConstant.LANG_INDEX_KEY, langIndex);
                console.log(sessionStorage.getItem(AppConstant.AUTH_ID_KEY), sessionStorage.getItem(AppConstant.AUTH_PASS_KEY))
                // this.setLastCompanyIdCookie(userId, companyId);
                callBack();

            }, 200)

        }, 200);
    }

    setUserLoginCookie(userId: string, userAuth: string, defaultCompanyId: string, sessionCompanyId: string, langIndex: string, callBack: any) {
        setTimeout(() => {
            this.utilService.setUserIdCookie(userId);
            this.utilService.setUserAuthPassCookie(userAuth);
            this.utilService.setCompanyIdCookie(sessionCompanyId);
            this.setSessionCookie(userId, userAuth, sessionCompanyId, langIndex, () => {
                callBack();
            });
        }, 200);
    }

    getInitialLoginUserCookie() {
        debugger
        var initialLoginUser: any;

        var userId: string = this.utilService.getUserIdCookie();
        var userAuth: string = this.utilService.getUserAuthPassCookie();
        var companyId: string = this.utilService.getCompanyIdCookie();

        if (userId && userAuth) {
            initialLoginUser = {
                userId: userId,
                userAuth: userAuth,
                companyId: companyId
            }
        } else {
            var existingCookie: string = this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
            initialLoginUser = (existingCookie) ? JSON.parse(existingCookie)[0] : null
        }

        return initialLoginUser;
    }

    setUserIdCookie(userId: string) {
        var date = this.getCookieExpireDate();
        return this.cookieService.set(AppConstant.AUTH_ID_KEY, userId, date);
    }

    getCookieExpireDate() {
        var date = new Date();
        return date.setMonth(date.getMonth() + AppConstant.COOKIE_EXPIRE_MONTH);
    }

    clearUserCookie(userId: string, callBack: any) {

        var existingCookie = this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
        setTimeout(() => {
            var existingUserCookieList: any[] = [];

            if (existingCookie) {
                existingUserCookieList = JSON.parse(existingCookie);
            }

            if (existingUserCookieList && existingUserCookieList.length > 0 && userId) {
                var index = existingUserCookieList.findIndex(item => item.userId == userId);

                if (index >= 0) {
                    existingUserCookieList.splice(index, 1);
                    var date = this.getCookieExpireDate();
                    this.cookieService.set(AppConstant.LOGGED_USER_COOKIE_KEY, JSON.stringify(existingUserCookieList), date);

                    this.addRemovedUserToCookie(userId);
                }
            }

            callBack();

        }, 200);

        var cookieDeleteDate = Date.parse(AppConstant.COOKIE_EXPIRE_DATE);
        this.cookieService.set(AppConstant.AUTH_ID_KEY, "", cookieDeleteDate);
        this.cookieService.set(AppConstant.AUTH_PASS_KEY, "", cookieDeleteDate);
        this.cookieService.set(AppConstant.SELECTED_COMPANY_ID_KEY, "", cookieDeleteDate);
    }

    clearLastCompanyIdCookie() {

        var userId: string = this.utilService.getUserIdCookie();
        var userCookie: any = this.getInitialLoginUserCookie();
        var authId: any = (userCookie) ? userCookie.userId : null;

        if (userId && authId && userId == authId) {
            var cookieDeleteDate = Date.parse(AppConstant.COOKIE_EXPIRE_DATE);
            setTimeout(() => {
                this.cookieService.set(AppConstant.SELECTED_COMPANY_ID_KEY, "", cookieDeleteDate);
            }, 200);
        }
    }

    setLastCompanyIdCookie(userId: string, currentContextCompanyId: string) {
        var userCookie: any = this.getInitialLoginUserCookie();
        var authId: any = (userCookie) ? userCookie.userId : null;

        if (userId && authId && userId == authId) {
            this.cookieService.set(AppConstant.SELECTED_COMPANY_ID_KEY, currentContextCompanyId);
        }
    }

    getLastCompanyIdCookie(userId: string) {
        var userCookie: any = this.getInitialLoginUserCookie();
        var authId: any = (userCookie) ? userCookie.userId : null;

        if (userId && authId && userId == authId) {
            return this.cookieService.get(AppConstant.SELECTED_COMPANY_ID_KEY);
        }

        return null;
    }

    clearSessionStorageCookie(removedCompanyId: string, callBack: any) {
        // this.clearLastCompanyIdCookie();
        sessionStorage.clear();

        setTimeout(() => {
            if (!sessionStorage.length || sessionStorage.length <= 0) {
                this.addRemovedCompanyToCookie(removedCompanyId);
                callBack();
            }

        }, 200);
    }

    addRemovedCompanyToCookie(companyId: string) {

        var removedCompanyCookie: string[] = (this.cookieService.get(AppConstant.REMOVED_COMPANY_COOKIE_KEY)) ? JSON.parse(this.cookieService.get(AppConstant.REMOVED_COMPANY_COOKIE_KEY)) : [];

        if (removedCompanyCookie.findIndex(item => item == companyId) < 0) {
            removedCompanyCookie.push(companyId);
            setTimeout(() => {
                var expireDate = this.getCookieExpireDate();
                this.cookieService.set(AppConstant.REMOVED_COMPANY_COOKIE_KEY, JSON.stringify(removedCompanyCookie), expireDate);
            }, 200);
        }

    }

    clearRemovedCompanyCookie() {
        var cookieDeleteDate = Date.parse(AppConstant.COOKIE_EXPIRE_DATE);
        this.cookieService.set(AppConstant.REMOVED_COMPANY_COOKIE_KEY, "", cookieDeleteDate);
    }

    addRemovedUserToCookie(userId: string) {

        var removedUserCookie: string[] = (this.cookieService.get(AppConstant.REMOVED_USER_COOKIE_KEY)) ? JSON.parse(this.cookieService.get(AppConstant.REMOVED_USER_COOKIE_KEY)) : [];

        if (removedUserCookie.findIndex(item => item == userId) < 0) {
            removedUserCookie.push(userId);
            setTimeout(() => {
                var expireDate = this.getCookieExpireDate();
                this.cookieService.set(AppConstant.REMOVED_USER_COOKIE_KEY, JSON.stringify(removedUserCookie), expireDate);
            }, 200);
        }
    }

    clearRemovedUserCookie() {
        var cookieDeleteDate = Date.parse(AppConstant.COOKIE_EXPIRE_DATE);
        this.cookieService.set(AppConstant.REMOVED_USER_COOKIE_KEY, "", cookieDeleteDate);
    }

    public login(userIdentification: UserIdentification): Observable<any> {
        var url = '/user-management/login';
        var loginResponse: any;
        loginResponse = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return loginResponse;
    }

    public getAccessInfo(userIdentification: UserIdentification): Observable<any> {
        var url = '/user-management/get-access-info';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }

    public chnagePassword(userIdentification: ChangeUserIdentification): Observable<string> {
        var url = '/user-management/change-password';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }

    public chnageFirstLoginPassword(userIdentification: UserIdentification): Observable<string> {
        var url = '/user-management/change-first-login-password';
        var menuAccessInfo: any;
        menuAccessInfo = this.uriService.callBackend(url, AppConstant.HTTP_POST, userIdentification);
        return menuAccessInfo;
    }
}
