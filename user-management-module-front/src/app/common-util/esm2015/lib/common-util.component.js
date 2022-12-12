import { Component } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./common-util.service";
export class CommonUtilComponent {
    constructor(commonUtilService) {
        this.commonUtilService = commonUtilService;
    }
    ngOnInit() {
        // this.commonUtilService.checkRegex(new RegExp('/^([a-z0-9]{5,})$/'), 'abc1');
    }
}
CommonUtilComponent.ɵfac = function CommonUtilComponent_Factory(t) { return new (t || CommonUtilComponent)(i0.ɵɵdirectiveInject(i1.CommonUtilService)); };
CommonUtilComponent.ɵcmp = i0.ɵɵdefineComponent({ type: CommonUtilComponent, selectors: [["lib-commonUtil"]], decls: 2, vars: 0, template: function CommonUtilComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, " common-util works! ");
        i0.ɵɵelementEnd();
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CommonUtilComponent, [{
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
    }], function () { return [{ type: i1.CommonUtilService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXV0aWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29tbW9uLXV0aWwvc3JjL2xpYi9jb21tb24tdXRpbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQzs7O0FBYWxELE1BQU0sT0FBTyxtQkFBbUI7SUFFNUIsWUFBb0IsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBSSxDQUFDO0lBRTdELFFBQVE7UUFDSiwrRUFBK0U7SUFFbkYsQ0FBQzs7c0ZBUFEsbUJBQW1CO3dEQUFuQixtQkFBbUI7UUFQNUIseUJBQUc7UUFDRCxvQ0FDRjtRQUFBLGlCQUFJOzt1RkFLSyxtQkFBbUI7Y0FWL0IsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLFFBQVEsRUFBRTs7OztHQUlYO2dCQUNDLE1BQU0sRUFBRSxFQUNQO2FBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uVXRpbFNlcnZpY2UgfSBmcm9tICcuL2NvbW1vbi11dGlsLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2xpYi1jb21tb25VdGlsJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxwPlxuICAgICAgY29tbW9uLXV0aWwgd29ya3MhXG4gICAgPC9wPlxuICBgLFxuICAgIHN0eWxlczogW1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uVXRpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbW1vblV0aWxTZXJ2aWNlOiBDb21tb25VdGlsU2VydmljZSkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gdGhpcy5jb21tb25VdGlsU2VydmljZS5jaGVja1JlZ2V4KG5ldyBSZWdFeHAoJy9eKFthLXowLTldezUsfSkkLycpLCAnYWJjMScpO1xuXG4gICAgfVxuXG5cblxufVxuIl19