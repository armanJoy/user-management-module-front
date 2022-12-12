import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { BranchInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-branch-info-view-popup',
    templateUrl: './branch-info-view-popup.component.html',
    styleUrls: ['./branch-info-view-popup.component.css']
})
export class BranchInfoViewPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public branch: BranchInfoFetch, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    formatedZipcde: string = '';

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BRANCH_INFO_VIEW_POPUP;

        if (this.branch && this.branch.zipcode) {
            this.branch.zipcodeFormated = this.utilService.prepareZipCodeFormate(this.branch.zipcode);
            this.branch.branchFAXFormated = this.utilService.prepareFaxNoFormate(this.branch.branchFAX);
            this.branch.branchContactNoFormated = this.utilService.prepareContactNoFormate(this.branch.branchContactNo);
        }
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BRANCH_INFO_VIEW_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "branchDetails": "Branch Details",
    //     "branchName": "Branch Name",
    //     "branchAddress": "Branch Address",
    //     "contactNo": "Contact No",
    //     "fax": "FAX",
    //     "personInCharge": "Branch Manager",
    //     "businessType": "Business Type",
    //     "remarks": "Remarks",
    //     "close": "Close"
    // }
}
