import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CommonUtilService {
    constructor() { }
    testService(name) {
        console.log('My Name is ' + name);
    }
    checkRegex(regex, data) {
        return regex.test(data);
    }
}
CommonUtilService.ɵfac = function CommonUtilService_Factory(t) { return new (t || CommonUtilService)(); };
CommonUtilService.ɵprov = i0.ɵɵdefineInjectable({ token: CommonUtilService, factory: CommonUtilService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonUtilService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXV0aWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvbW1vbi11dGlsL3NyYy9saWIvY29tbW9uLXV0aWwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUszQyxNQUFNLE9BQU8saUJBQWlCO0lBRTFCLGdCQUFnQixDQUFDO0lBRVYsV0FBVyxDQUFDLElBQVk7UUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUdNLFVBQVUsQ0FBQyxLQUFhLEVBQUUsSUFBUztRQUN0QyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7a0ZBWFEsaUJBQWlCO3lEQUFqQixpQkFBaUIsV0FBakIsaUJBQWlCLG1CQUZkLE1BQU07dUZBRVQsaUJBQWlCO2NBSDdCLFVBQVU7ZUFBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDb21tb25VdGlsU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIHRlc3RTZXJ2aWNlKG5hbWU6IFN0cmluZykge1xuICAgICAgICBjb25zb2xlLmxvZygnTXkgTmFtZSBpcyAnICsgbmFtZSk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgY2hlY2tSZWdleChyZWdleDogUmVnRXhwLCBkYXRhOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2V4LnRlc3QoZGF0YSk7XG4gICAgfVxufVxuIl19