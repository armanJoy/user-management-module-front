import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵdirectiveInject, ɵɵdefineComponent, ɵɵelementStart, ɵɵtext, ɵɵelementEnd, Component, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';

class CommonUtilService {
    constructor() { }
    testService(name) {
        console.log('My Name is ' + name);
    }
    checkRegex(regex, data) {
        return regex.test(data);
    }
}
CommonUtilService.ɵfac = function CommonUtilService_Factory(t) { return new (t || CommonUtilService)(); };
CommonUtilService.ɵprov = ɵɵdefineInjectable({ token: CommonUtilService, factory: CommonUtilService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(CommonUtilService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class CommonUtilComponent {
    constructor(commonUtilService) {
        this.commonUtilService = commonUtilService;
    }
    ngOnInit() {
        // this.commonUtilService.checkRegex(new RegExp('/^([a-z0-9]{5,})$/'), 'abc1');
    }
}
CommonUtilComponent.ɵfac = function CommonUtilComponent_Factory(t) { return new (t || CommonUtilComponent)(ɵɵdirectiveInject(CommonUtilService)); };
CommonUtilComponent.ɵcmp = ɵɵdefineComponent({ type: CommonUtilComponent, selectors: [["lib-commonUtil"]], decls: 2, vars: 0, template: function CommonUtilComponent_Template(rf, ctx) { if (rf & 1) {
        ɵɵelementStart(0, "p");
        ɵɵtext(1, " common-util works! ");
        ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(CommonUtilComponent, [{
        type: Component,
        args: [{
                selector: 'lib-commonUtil',
                template: `
    <p>
      common-util works!
    </p>
  `,
                styles: []
            }]
    }], function () { return [{ type: CommonUtilService }]; }, null); })();

class CommonUtilModule {
}
CommonUtilModule.ɵfac = function CommonUtilModule_Factory(t) { return new (t || CommonUtilModule)(); };
CommonUtilModule.ɵmod = ɵɵdefineNgModule({ type: CommonUtilModule });
CommonUtilModule.ɵinj = ɵɵdefineInjector({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CommonUtilModule, { declarations: [CommonUtilComponent], exports: [CommonUtilComponent] }); })();
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && ɵsetClassMetadata(CommonUtilModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    CommonUtilComponent
                ],
                imports: [],
                exports: [
                    CommonUtilComponent
                ]
            }]
    }], null, null); })();

/*
 * Public API Surface of common-util
 */

/**
 * Generated bundle index. Do not edit.
 */

export { CommonUtilComponent, CommonUtilModule, CommonUtilService };
//# sourceMappingURL=common-util.js.map
