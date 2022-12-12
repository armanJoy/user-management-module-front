import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, ScaleSettingInfo } from 'src/app/models/backend-fetch/company-settings-fetch';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ScaleSettingPopupComponent } from '../scale-setting-popup/scale-setting-popup.component';

@Component({
    selector: 'app-scale-setting-tab',
    templateUrl: './scale-setting-tab.component.html',
    styleUrls: ['./scale-setting-tab.component.css']
})
export class ScaleSettingTabComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    constructor(public dialog: MatDialog, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SCALE_SETTING_TAB;

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };
    saveScaleInfoView(scale: ScaleSettingInfo) {
        if (scale) {
            var updateFlag = false;
            this.companyInfo.scaleSettingInfo.forEach((element) => {

                if (element.scaleId == scale.scaleId) {
                    var index = this.companyInfo.scaleSettingInfo.indexOf(element);
                    this.companyInfo.scaleSettingInfo[index] = scale;
                    // element = branchInfo;
                    updateFlag = true;
                }

            });
            if (updateFlag == false) {
                this.companyInfo.scaleSettingInfo.unshift(scale);

            }

        }
    }

    openScaleSettingInfoDiolog(scale?: ScaleSettingInfo): void {
        const sampleDialog = this.dialog.open(ScaleSettingPopupComponent, {
            width: '75%',
            // height: '60%',
            data: {
                scale: scale,
                companyId: this.companyInfo.companyId
            },
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.companySettingsOperationService.updateScaleInfo(result).subscribe((data) => {
                    if (data) {
                        this.saveScaleInfoView(data);
                    }
                })

            }

        });
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SCALE_SETTING_TAB, AppConstant.UI_LABEL_TEXT);

    removeScale(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.SCALE_REMOVE_OPERATION
        }

        this.companySettingsOperationService.getScaleForwardLinks(itemId).subscribe(scaleForwardLink => {

            const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: scaleForwardLink,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.companySettingsOperationService.removeScale(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeScaleInfoViewList(itemId);

                        }
                    });
                }
            });
        });



    }

    removeScaleInfoViewList(scaleInfoId: string) {
        var index = this.companyInfo.scaleSettingInfo.findIndex(item => item.scaleId == scaleInfoId);

        if (index >= 0) {
            this.companyInfo.scaleSettingInfo.splice(index, 1);
        }
    }

}
