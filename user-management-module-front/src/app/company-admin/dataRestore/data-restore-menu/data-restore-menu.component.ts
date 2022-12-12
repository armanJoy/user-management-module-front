
import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DataRestoreOperationService } from 'src/app/services/operation-services/data-restore-operation.service';
import { RemovedData, RestoreInfo } from 'src/app/models/backend-fetch/dxr-system';
import { INFERRED_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
    selector: 'app-data-restore-menu',
    templateUrl: './data-restore-menu.component.html',
    styleUrls: ['./data-restore-menu.component.css']
})
export class DataRestoreMenuComponent implements OnInit {

    constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, private dataRestoreService: DataRestoreOperationService) { }

    viewComponent = false;
    isSystemAdmin = this.utilService.languageEditMode();
    componentCode = AppConstant.COMP.DATA_RESTORE_MENU;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    uiLabels: any = {
        pageHeader: "Restore Operation",
        removeDate: "Remove Date",
        itemTitle: "Data Title",
        operationType: "Operation Type",
        userName: "Rmoved By",
        companyName: "Company",
        restroreButton: "Restore",
        "dxr-waste-category-remove-op": "Dxr Waste Category Remove Op",
        "dxr-waste-type-remove-op": "Dxr Waste Type Remove Op",
        "dxr-waste-item-remove-op": "Dxr Waste Item Remove Op",
        "company-branch-remove-op": "Company Branch Remove Op",
        "company-bank-account-remove-op": "Company Bank Account Remove Op",
        "company-vehicle-remove-op": "Company Vehicle Remove Op",
        "company-scale-remove-op": "Company Scale Remove Op",
        "company-waste-remove-op": "Company Waste Remove Op",
        "faq-type-remove-op": "Faq Type Remove Op",
        "faq-info-remove-op": "Faq Info Remove Op",
        "company-user-remove-op": "Company User Remove Op",
        successfulRestoreToast: "Data Restored Successfully",

    };
    companyId: string = this.utilService.getCompanyIdCookie();
    removedDataList: RemovedData[] = [];

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.getRemoveItems(this.companyId, 0, '', '');
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    getRemoveItems(companyId: String, pageNo: number, searchText: string, status: string) {
        this.dataRestoreService.getRemovedDataByCompany(companyId, pageNo, searchText, status).subscribe(response => {
            if (response) {
                this.removedDataList = response;
            }

            this.viewComponent = true;
        });
    }

    searchByText() {
        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.getRemoveItems(this.companyId, pageNo, searchText, '');

    }

    restore(removedData: RemovedData) {
        var restoreInfo: RestoreInfo = {
            removedInfoId: removedData.removedDataId,
            triggerUserId: this.utilService.getUserIdCookie()
        }

        this.dataRestoreService.restoreRemovedDataByCompany(restoreInfo).subscribe(response => {
            if (response) {
                this.utilService.showSnackbar(this.uiLabels.successfulRestoreToast, 3000);
                this.updateViewList(removedData.removedDataId);
            }
        })
    }

    updateViewList(itemId: string) {
        var itemIndex: number = this.removedDataList.findIndex(item => item.removedDataId == itemId);

        (itemIndex >= 0) ? (this.removedDataList.splice(itemIndex, 1)) : this.searchByText();
    }

}
