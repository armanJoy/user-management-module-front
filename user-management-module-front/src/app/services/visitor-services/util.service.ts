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

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    showLoadButton() {
        const menuList: string = JSON.stringify(this.languageService.getUserMenuList());
        return menuList.includes(AppConstant.MATCH_LOAD_MENU_WEB);
    }

    showUnloadButton() {
        const menuList: string = JSON.stringify(this.languageService.getUserMenuList());
        return menuList.includes(AppConstant.MATCH_UNLOAD_MENU_WEB);
    }
    getProjectViewerIds(partnerIds: string[], creatorId: string) {

        var projectViewerIds: string = "";
        var currentCompanyId: string = this.getCompanyIdCookie();
        const parentIdsString: string = partnerIds.join("|");
        if (creatorId == currentCompanyId || !creatorId) {
            projectViewerIds = parentIdsString;
        } else {
            partnerIds = partnerIds.filter(item => item == creatorId || item == currentCompanyId);
            projectViewerIds = partnerIds.join("|");
        }

        return projectViewerIds;
    }

    keepExpansionPanelState(event: any, panel: any) {
        this.stopEventPropagation(event);

        if (panel && panel.expanded) {

            panel.close();
        } else {
            panel.open();
        }
    }

    stopEventPropagation(event: any) {
        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }
    }

    showRemovedToast(message?: string, duration?: number) {

        const toastMessage: string = (message) ? message : AppConstant.REMOVED_TOAST[this.getSelectedLanguageIndex()];
        const toastDuration: number = (duration) ? duration : 3000;
        this._snackBar.open(toastMessage, '', {
            duration: toastDuration,
            verticalPosition: 'top',
        })
    }

    getAllMonthsBetweenTwoDate(startDateStr: string, endDateStr: string) {
        let startDate = this.getDateFromBackendDate(startDateStr);
        let endDate = this.getDateFromBackendDate(endDateStr);

        const dates = [];
        const currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toISOString().slice(-24).replace(/\D/g, '').slice(0, 6));
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return dates;
    }
    getCurrentDate() {
        return new Date().toISOString().slice(-24).replace(/\D/g, '').slice(0, 8);
    }

    getFilterItemIdsForSearch(filterItems: any[], checkAttribute: string, checkValue: any, idAttribute: string) {
        var statusText: string[] = [];

        if (filterItems) {
            filterItems.forEach(each => {
                if (each[checkAttribute] == checkValue) {
                    statusText.push(each[idAttribute]);
                }
            })
        }

        return statusText.join("|");
    }

    searchText: string = '';
    pageNo: number = 0;

    setSearchText(searchText: string) {
        this.searchText = searchText;
    }

    getSearchText() {
        return this.searchText;
    }

    setPageNo(pageNo: number) {
        this.pageNo = pageNo;
    }

    getPageNo() {
        return this.pageNo;
    }


    langIndex = this.getSelectedLanguageIndex();

    getCookieExpireDate() {
        var date = new Date();
        return date.setMonth(date.getMonth() + AppConstant.COOKIE_EXPIRE_MONTH);
    }

    printLangDef(uiLabels: any, componentCode: string) {
        var langDef: string = '';
        var langDefHeader: string = '{\n \"componentCode\": \"' + componentCode + '\",\n\"componentName\": \"' + componentCode + '\",\n\"labels\": [\n';
        langDef = langDef.concat(langDefHeader);
        Object.keys(uiLabels).forEach((key, index) => {
            if (index > 0) {
                langDef = langDef.concat(',\n')
            }

            var langValueObject: string = '{\n\"key\" : \"' + key + '\",\n\"eng\" : \"' + uiLabels[key] + '\",\n\"jpn\" : \"' + uiLabels[key] + '\"\n}';
            langDef = langDef.concat(langValueObject);
        });
        langDef = langDef.concat('],\n\"messages\":[],\n\"notifications\":[]\n}\n');
        console.log(langDef);
    }

    getDateFromBackendDate(backendDate: string) {
        return new Date(backendDate.substring(0, 4) + '-' + backendDate.substring(4, 6) + '-' + backendDate.substring(6, 8));
    }

    getDatesBetween(startDate: Date, endDate: Date) {
        const dates = [];
        const currentDate = startDate;
        while (currentDate <= endDate) {
            dates.push(new Date(currentDate).toISOString().slice(-24).replace(/\D/g, '').slice(0, 14));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }

    setSelectedLanguageIndex(langIndex: string, callBack: any) {
        var date = this.getCookieExpireDate();
        this.cookieService.set(AppConstant.LANG_INDEX_KEY, langIndex, date);

        callBack();
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

    setDefaultCompanyIdCookie(defaultCompanyId: string) {

        var currentUserId: string = this.getUserIdCookie();
        var existingCookie = this.cookieService.get(AppConstant.LOGGED_USER_COOKIE_KEY);
        if (existingCookie) {
            var existingUserCookieList: any[] = JSON.parse(existingCookie);
            var index = existingUserCookieList.findIndex(eachUserCookie => (eachUserCookie && eachUserCookie.userId == currentUserId));

            if (index >= 0) {
                existingUserCookieList[index].defaultCompanyId = defaultCompanyId;
                this.setUserListCookie(existingUserCookieList);
            }
        }
    }

    getDefaultCompany() {

        var defaultCompanyId: string = "";
        var currentUserId: string = this.getUserIdCookie();
        var existingCookie = this.getUserListCookie();
        console.log(existingCookie);
        if (existingCookie) {
            var existingUserCookieList: any[] = JSON.parse(existingCookie);

            defaultCompanyId = existingUserCookieList.find(eachUserCookie => (eachUserCookie && eachUserCookie.userId == currentUserId)).defaultCompanyId;
        }
        return defaultCompanyId;
    }

    getCompanyCategoryName(categoryNameOrId: string) {
        var langIndex = this.getSelectedLanguageIndex();
        var companyCategoryName: any = (langIndex == AppConstant.LANG_INDEX_ENG) ? AppConstant.COMPANY_CATEGORY_NAME[categoryNameOrId] : AppConstant.COMPANY_CATEGORY_NAME[categoryNameOrId];
        return (langIndex == AppConstant.LANG_INDEX_ENG) ? companyCategoryName[AppConstant.COMPANY_CATEGORY_TITLE_ENG] : companyCategoryName[AppConstant.COMPANY_CATEGORY_TITLE_JPN];
    }

    public getSelectedLanguageIndex(): string {
        return this.cookieService.get(AppConstant.LANG_INDEX_KEY);
    }

    languageEditMode(): boolean {
        var userId: any = this.getUserIdCookie();
        var isSystemAdmin: boolean = false;
        if (userId) {
            AppConstant.USER_EMAIL_FOR_LANGUAGE_UPDATE.forEach(sysAdminUserId => {

                if (sysAdminUserId == userId) {
                    isSystemAdmin = true;
                }
            });
        }
        return isSystemAdmin;
    }

    showSnackbar(message: string, duration: number) {

        this._snackBar.open(message, '', {
            duration: duration,
            verticalPosition: 'top',
        })
    }


    prepareCurrencySign(priceValue: number) {
        return AppConstant.JAPANESE_CURRENCY_SIGN + ' ' + priceValue;
    }

    prepareFaxNoFormate(faxNo: string): string {
        var formatedFaxNo: string = '';
        if (faxNo) {
            for (let index = 0; index < faxNo.length; index++) {
                formatedFaxNo = formatedFaxNo + faxNo[index];
                if (index == 1 || index == 5) {
                    formatedFaxNo += '-';
                }
            }
        }
        return formatedFaxNo;
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

    convertFileToBase64(event: any, callBack: any) {
        var file = event.target.files[0];
        var convertFile: any;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.result) {
                convertFile = (reader.result.toString());

                callBack(convertFile);
            }
        };
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

    convertMonth(date: string): string {
        var langIndex = this.getSelectedLanguageIndex();
        var monthValue: string = ''
        if (date) {
            var mothCheckArray: string[] = [];
            if (langIndex == AppConstant.LANG_INDEX_JPN) {
                mothCheckArray = AppConstant.MONTH_JPN;
            } else {
                mothCheckArray = AppConstant.MONTH_DATE_ARRAY;
            }

            for (let i = 0; i < mothCheckArray.length; i++) {
                var position = date.search(mothCheckArray[i])
                if (position != -1) {
                    monthValue = AppConstant.MONTH_NUMBER_ARRAY[i];
                    break;
                }
            }

        }
        return monthValue;
    }

    getStartDate(): string {

        var date = new Date();
        var finalStartDate: string = "";
        var finalYear: string = "";
        var finalMonth: string = "";
        var startYear = date.getFullYear();
        var startMonth = (date.getMonth() + 1);
        finalYear = JSON.stringify(startYear);
        finalMonth = JSON.stringify(startMonth);
        if (finalMonth.length == 1) {
            finalMonth = "0" + finalMonth;
        }
        finalStartDate = finalYear + finalMonth + "01";
        return finalStartDate;
    }

    getEndDate(): string {

        var date = new Date();
        var finalStartDate: string = "";
        var finalYear: string = "";
        var finalMonth: string = "";
        var finalDay: string = "";
        var endYear = date.getFullYear();
        var endMonth = (date.getMonth() + 1);
        var endDate = date.getDate();
        finalYear = JSON.stringify(endYear);
        finalMonth = JSON.stringify(endMonth);
        finalDay = JSON.stringify(endDate);
        if (finalMonth.length == 1) {
            finalMonth = "0" + finalMonth;
        }
        if (finalDay.length == 1) {
            finalDay = "0" + finalDay;
        }

        finalStartDate = finalYear + finalMonth + finalDay;
        return finalStartDate;

    }
}
