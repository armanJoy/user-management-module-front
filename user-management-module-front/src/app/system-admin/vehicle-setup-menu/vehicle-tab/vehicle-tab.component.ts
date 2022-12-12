import { Component, OnInit, Input, Inject } from '@angular/core';
import { VehicleTypeSetupInfoFetch, GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VehicleSetupOperationService } from 'src/app/services/operation-services/vehicle-setup-operation.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
@Component({
    selector: 'app-vehicle-tab',
    templateUrl: './vehicle-tab.component.html',
    styleUrls: ['./vehicle-tab.component.css']
})
export class VehicleTabComponent implements OnInit {
    @Input()
    vehicleTypeList: VehicleTypeSetupInfoFetch[] = [];
    @Input()
    vehicleTypeInfo: VehicleTypeSetupInfoFetch = {
        vehicleTypeId: "",
        vehicleTypeName: "",
        code: "",
        description: "",
        gasolineTypeDefaultId: "",
        gasolinTypeList: []
    };
    @Input()
    gasolineTypeList: GasolineCo2EmissionInfo[] = [];
    restVehicleTypeInfo: VehicleTypeSetupInfoFetch = {
        vehicleTypeId: "",
        vehicleTypeName: "",
        code: "",
        description: "",
        gasolineTypeDefaultId: "",
        gasolinTypeList: []
    };
    defaultId: string = "";
    componentCode: string = AppConstant.COMP.VEHICLE_TAB;
    isSystemAdmin: boolean = false;
    isPopup: boolean = false;
    constructor(private breakpointObserver: BreakpointObserver, private vehicleSetupOperationService: VehicleSetupOperationService, private utilService: UtilService, private languageService: LanguageService, public dialogRef: MatDialogRef<VehicleTabComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog) { }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        if (this.data && this.data.isPopup) {
            this.vehicleTypeInfo = this.data.vehicle;
            this.isPopup = this.data.isPopup;
            this.gasolineTypeList = this.data.gasolineList;
            this.gasolineTypeList = this.prepareGasolineListView(this.vehicleTypeInfo, this.gasolineTypeList)
        }
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_TAB, AppConstant.UI_LABEL_TEXT);
    }
    prepareGasolineListView(vehicleTypeInfo: VehicleTypeSetupInfoFetch, gasolineList: GasolineCo2EmissionInfo[]) {
        this.vehicleTypeInfo.gasolinTypeList.forEach(vehicleTypeGasolineList => {
            gasolineList.forEach(gasoline => {
                if (gasoline.gasolineTypeId == vehicleTypeGasolineList.gasolineTypeId) {
                    gasoline.isCheck = true;
                }

            });

        });
        return gasolineList;
    }
    uiLabels: any = {
        vehicleTypeAdd: "Vehicle Type Add",
        vehicleTypEdit: "Vehicle Type Edit",
        vehicleType: "Vehicle Type",
        code: "Code",
        description: "Description",
        gasolineType: "Gasoline Type",
        addBtn: "Add",
        emissionUnit: "Co2 Emission Unit",
        fuelUnit: "Co2 Fuel Unit",
        closeBtn: "Close",
        editBtn: "Edit",
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );
    selectedItem: any;
    selectListItem(item: GasolineCo2EmissionInfo, vehicleTypeInfo: VehicleTypeSetupInfoFetch) {
        this.selectedItem = item;
        this.saveDefaultChange(item, vehicleTypeInfo);
    }
    prepareDataForSave() {
        this.vehicleTypeInfo.gasolinTypeList = [];
        this.gasolineTypeList.forEach(element => {
            if (element.isCheck) {
                this.vehicleTypeInfo.gasolinTypeList.unshift(element);
                element.isCheck = false;
            }
        });
        if (this.vehicleTypeInfo.gasolinTypeList.length > 0) {
            this.vehicleTypeInfo.gasolineTypeDefaultId = this.vehicleTypeInfo.gasolinTypeList[0].gasolineTypeId;
        }

    }
    updateVehicleTypeList(vehicleTypeInfo: VehicleTypeSetupInfoFetch) {
        var index = -1;
        index = this.vehicleTypeList.findIndex(item => item.vehicleTypeId == vehicleTypeInfo.vehicleTypeId);
        if (index >= 0) {
            this.vehicleTypeList[index] = vehicleTypeInfo;
        }
        else {
            this.vehicleTypeList.push(vehicleTypeInfo)
        }
        this.vehicleTypeInfo = this.restVehicleTypeInfo;

    }
    onClickAddBtn() {
        this.prepareDataForSave();
        this.vehicleTypeInfo.vehicleTypeId = this.utilService.generateUniqueId();
        this.vehicleSetupOperationService.saveVehicleType(this.vehicleTypeInfo).subscribe((data) => {
            if (data) {
                this.utilService.showSnackbar('Your Response Save', 2000);
                this.updateVehicleTypeList(data);
            }
        })

    }
    saveDefaultChange(item: GasolineCo2EmissionInfo, vehicleTypeInfo: VehicleTypeSetupInfoFetch) {

        vehicleTypeInfo.gasolineTypeDefaultId = item.gasolineTypeId;
        this.vehicleSetupOperationService.saveVehicleType(vehicleTypeInfo).subscribe((data) => {
            if (data) {
                this.utilService.showSnackbar('You set this gasoline as Default', 2000);
            }
        });
    }
    onClickEditBtn(vehicleInfo: VehicleTypeSetupInfoFetch) {
        const dialogRef = this.matDialog.open(VehicleTabComponent, {
            width: "65%",
            data: {
                vehicle: vehicleInfo,
                gasolineList: this.gasolineTypeList,
                isPopup: true

            },
            // disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                this.vehicleTypeInfo = result;
                this.prepareDataForSave()
                this.vehicleSetupOperationService.saveVehicleType(this.vehicleTypeInfo).subscribe((data) => {
                    if (data) {
                        this.utilService.showSnackbar('Your Response Save', 2000);
                        this.updateVehicleTypeList(data);

                    }
                })

            }
        });
    }
    resetGasolineTypeList() {
        this.gasolineTypeList.forEach(element => {
            element.isCheck = false;
        });
    }
    onClickPopupEditBtn() {
        this.dialogRef.close(Object.assign({}, this.vehicleTypeInfo));
    }

    removeVehicleType(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.VEHICLE_TYPE_REMOVE_OPERATION
        }

        this.vehicleSetupOperationService.getVehicleTypeForwardLinks(itemId).subscribe(vehicleForwardLink => {

            const removeDialog = this.matDialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: vehicleForwardLink,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.vehicleSetupOperationService.removeVehicleType(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeVehicleTypeFromViewList(itemId);

                        }
                    });
                }
            });

        })
    }

    removeVehicleTypeFromViewList(itemId: string) {
        var index = this.vehicleTypeList.findIndex(item => item.vehicleTypeId == itemId);

        if (index >= 0) {
            this.vehicleTypeList.splice(index, 1);
        }
    }
}
