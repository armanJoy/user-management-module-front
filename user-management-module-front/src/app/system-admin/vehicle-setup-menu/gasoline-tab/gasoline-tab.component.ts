import { Component, OnInit, Input, Inject } from '@angular/core';
import { VehicleTypeSetupInfoFetch, GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VehicleSetupOperationService } from 'src/app/services/operation-services/vehicle-setup-operation.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
@Component({
    selector: 'app-gasoline-tab',
    templateUrl: './gasoline-tab.component.html',
    styleUrls: ['./gasoline-tab.component.css']
})
export class GasolineTabComponent implements OnInit {
    @Input()
    gasolineTypeList: GasolineCo2EmissionInfo[] = [];
    @Input()
    gasolineInfo: GasolineCo2EmissionInfo = {
        gasolineCo2EmissionInfoId: "",
        gasolineTypeId: "",
        unit: "",
        gasolineTypeName: "",
        co2EmissionUnit: 0,
        co2FuelUnit: 0,
        defaultId: "",
        isDefault: false,
        isCheck: false
    }
    resetGasolineInfo: GasolineCo2EmissionInfo = {
        gasolineCo2EmissionInfoId: "",
        gasolineTypeId: "",
        unit: "",
        gasolineTypeName: "",
        defaultId: "",
        co2EmissionUnit: 0,
        co2FuelUnit: 0,
        isDefault: false,
        isCheck: false
    }
    componentCode: string = AppConstant.COMP.GASOLINE_TAB;
    isSystemAdmin: boolean = false;
    constructor(private breakpointObserver: BreakpointObserver, private vehicleSetupOperationService: VehicleSetupOperationService, private utilService: UtilService, private matDialog: MatDialog, public dialogRef: MatDialogRef<GasolineTabComponent>, @Inject(MAT_DIALOG_DATA) public data: GasolineCo2EmissionInfo, private languageService: LanguageService) { }

    uiLabels: any = {
        gasolineTypeAdd: "Gasoline Type Add",
        gasolineTypeEdit: "Gasoline Type Edit",
        gasoloineName: "Gasoloine Name",
        measureUnit: "Measure Unit",
        co2EmissionUnit: "Co2 Emission Unit",
        co2FuelUnit: "Co2 Fuel Unit",
        addBtn: "Add",
        editBtn: "Edit",
        closeBtn: "Close",
        gasolineList: "Gasoline List"
    }

    ngOnInit(): void {
        if (this.data) {
            this.gasolineInfo = this.data;
        }
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.GASOLINE_TAB, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    updateGasolineList(gasolineInfo: GasolineCo2EmissionInfo) {
        var index = -1;
        index = this.gasolineTypeList.findIndex(item => item.gasolineTypeId == gasolineInfo.gasolineTypeId);
        if (index >= 0) {
            this.gasolineTypeList[index] = gasolineInfo;
        }
        else {
            this.gasolineTypeList.unshift(gasolineInfo)
        }
        this.gasolineInfo = this.resetGasolineInfo;
    }

    onClickAddBtn() {

        if (this.gasolineInfo.gasolineTypeName && this.gasolineInfo.co2EmissionUnit && this.gasolineInfo.co2FuelUnit && this.gasolineInfo.unit) {
            if (!this.gasolineInfo.gasolineTypeId) {
                this.gasolineInfo.gasolineTypeId = this.utilService.generateUniqueId();
            }
            this.vehicleSetupOperationService.saveGasolineType(this.gasolineInfo).subscribe((data) => {
                if (data) {
                    this.utilService.showSnackbar('Your Response Save', 2000);
                    this.updateGasolineList(data);
                }
            });
        }
        else {
            this.utilService.showSnackbar(this.uiLabels.emptyInputFieldToast, 3000);
        }
    }

    onClickEditBtn(gasolineInfo: GasolineCo2EmissionInfo) {
        const dialogRef = this.matDialog.open(GasolineTabComponent, {
            width: "75%",
            data: gasolineInfo,
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.vehicleSetupOperationService.saveGasolineType(result).subscribe((data) => {
                    if (data) {
                        this.utilService.showSnackbar('Your Response Save', 2000);
                        this.updateGasolineList(data);
                    }
                });
            }
        });
    }
    onClickPopupEditBtn(gasolineInfo: GasolineCo2EmissionInfo) {
        this.dialogRef.close(Object.assign({}, gasolineInfo));
    }

    removeGasolineType(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.GASOLINE_TYPE_REMOVE_OPERATION
        }

        this.vehicleSetupOperationService.getGasolineTypeForwardLinks(itemId).subscribe(vehicleForwardLink => {

            const removeDialog = this.matDialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: vehicleForwardLink,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.vehicleSetupOperationService.removeGasolineType(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeGasolineTypeFromViewList(itemId);

                        }
                    });
                }
            });

        })
    }

    removeGasolineTypeFromViewList(itemId: string) {
        var index = this.gasolineTypeList.findIndex(item => item.gasolineTypeId == itemId);

        if (index >= 0) {
            this.gasolineTypeList.splice(index, 1);
        }
    }
}
