import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { BranchInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { DataForwardLink, RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { BranchInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { BranchInfoAddPopupComponent } from '../branch-info-add-popup/branch-info-add-popup.component';
import { BranchInfoViewPopupComponent } from '../branch-info-view-popup/branch-info-view-popup.component';

@Component({
    selector: 'app-branch-info-tab',
    templateUrl: './branch-info-tab.component.html',
    styleUrls: ['./branch-info-tab.component.css']
})
export class BranchInfoTabComponent implements OnInit {

    @Input()
    public isViewMode!: boolean;

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private utilService: UtilService, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.BRANCH_INFO_TAB;

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    updateBranchInfoViewList(branchInfo: BranchInfoFetch) {
        if (branchInfo) {
            branchInfo.branchContactNoFormated = this.utilService.prepareContactNoFormate(branchInfo.branchContactNo);
            branchInfo.zipcodeFormated = this.utilService.prepareZipCodeFormate(branchInfo.zipcode);
            branchInfo.branchFAXFormated = this.utilService.prepareFaxNoFormate(branchInfo.branchFAX);

            var updateFlag = false;
            this.companyInfo.branchList.forEach((element) => {

                if (element.branchId == branchInfo.branchId) {
                    var index = this.companyInfo.branchList.indexOf(element);
                    this.companyInfo.branchList[index] = branchInfo;
                    // element = branchInfo;
                    updateFlag = true;
                }

            });
            if (updateFlag == false) {
                this.companyInfo.branchList.unshift(branchInfo);

            }

        }
    }


    openBranchInfoDiolog(branch?: BranchInfoFetch): void {
        const sampleDialog = this.dialog.open(BranchInfoAddPopupComponent, {
            width: '75%',
            height: '70%',
            data: {
                branch: branch,
                companyId: this.companyInfo.companyId
            },
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.companySettingsOperationService.addBranchInfo(result).subscribe((data) => {
                    if (data) {
                        this.updateBranchInfoViewList(data);
                    }
                })

            }

        });
    }

    openBranchInfoViewDiolog(branch: BranchInfoFetch): void {
        const sampleDialog = this.dialog.open(BranchInfoViewPopupComponent, {
            width: '75%',
            height: '55%',
            data: branch,
            disableClose: true
        });
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.BRANCH_INFO_TAB, AppConstant.UI_LABEL_TEXT);

    removeBranch(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.BRANCH_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.companySettingsOperationService.removeBranch(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeBranchFromViewList(itemId);

                    }
                });
            }
        });
    }

    removeBranchFromViewList(branchId: string) {
        var index = this.companyInfo.branchList.findIndex(item => item.branchId == branchId);

        if (index >= 0) {
            this.companyInfo.branchList.splice(index, 1);
        }
    }
}
