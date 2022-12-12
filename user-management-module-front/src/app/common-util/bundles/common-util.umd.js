(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('common-util', ['exports', '@angular/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['common-util'] = {}, global.ng.core));
}(this, (function (exports, i0) { 'use strict';

    var CommonUtilService = /** @class */ (function () {
        function CommonUtilService() {
        }
        CommonUtilService.prototype.testService = function (name) {
            console.log('My Name is ' + name);
        };
        CommonUtilService.prototype.checkRegex = function (regex, data) {
            return regex.test(data);
        };
        return CommonUtilService;
    }());
    CommonUtilService.ɵfac = function CommonUtilService_Factory(t) { return new (t || CommonUtilService)(); };
    CommonUtilService.ɵprov = i0.ɵɵdefineInjectable({ token: CommonUtilService, factory: CommonUtilService.ɵfac, providedIn: 'root' });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonUtilService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () { return []; }, null);
    })();

    var CommonUtilComponent = /** @class */ (function () {
        function CommonUtilComponent(commonUtilService) {
            this.commonUtilService = commonUtilService;
        }
        CommonUtilComponent.prototype.ngOnInit = function () {
            // this.commonUtilService.checkRegex(new RegExp('/^([a-z0-9]{5,})$/'), 'abc1');
        };
        return CommonUtilComponent;
    }());
    CommonUtilComponent.ɵfac = function CommonUtilComponent_Factory(t) { return new (t || CommonUtilComponent)(i0.ɵɵdirectiveInject(CommonUtilService)); };
    CommonUtilComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CommonUtilComponent, selectors: [["lib-commonUtil"]], decls: 2, vars: 0, template: function CommonUtilComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵelementStart(0, "p");
                i0.ɵɵtext(1, " common-util works! ");
                i0.ɵɵelementEnd();
            }
        }, encapsulation: 2 });
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonUtilComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'lib-commonUtil',
                        template: "\n    <p>\n      common-util works!\n    </p>\n  ",
                        styles: []
                    }]
            }], function () { return [{ type: CommonUtilService }]; }, null);
    })();

    var CommonUtilModule = /** @class */ (function () {
        function CommonUtilModule() {
        }
        return CommonUtilModule;
    }());
    CommonUtilModule.ɵfac = function CommonUtilModule_Factory(t) { return new (t || CommonUtilModule)(); };
    CommonUtilModule.ɵmod = i0.ɵɵdefineNgModule({ type: CommonUtilModule });
    CommonUtilModule.ɵinj = i0.ɵɵdefineInjector({ imports: [[]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CommonUtilModule, { declarations: [CommonUtilComponent], exports: [CommonUtilComponent] }); })();
    (function () {
        (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonUtilModule, [{
                type: i0.NgModule,
                args: [{
                        declarations: [
                            CommonUtilComponent
                        ],
                        imports: [],
                        exports: [
                            CommonUtilComponent
                        ]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of common-util
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CommonUtilComponent = CommonUtilComponent;
    exports.CommonUtilModule = CommonUtilModule;
    exports.CommonUtilService = CommonUtilService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=common-util.umd.js.map
