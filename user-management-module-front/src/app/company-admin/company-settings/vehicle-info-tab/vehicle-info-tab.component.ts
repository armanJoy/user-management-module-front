import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, VehicleInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { VehicleInfoAddPopupComponent } from '../vehicle-info-add-popup/vehicle-info-add-popup.component';
import { VehicleInfoViewPopupComponent } from '../vehicle-info-view-popup/vehicle-info-view-popup.component';
@Component({
    selector: 'app-vehicle-info-tab',
    templateUrl: './vehicle-info-tab.component.html',
    styleUrls: ['./vehicle-info-tab.component.css']
})
export class VehicleInfoTabComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, companyInfo: CompanyInfoFetch) => void;

    @Input()
    public companyInfo!: CompanyInfoFetch;

    vehicleInfo: VehicleInfoFetch = {
        companyId: '',
        vehicleId: '',
        frontendDate: '',
        backendDate: '',
        manufacturerName: '',
        vehicleType: '',
        vehicleTypeId: '',
        modelName: '',
        vehicleRegNo: '',
        vehicleCapacity: '',
        vehicleWeight: '',
        gasolineType: [],
        vehicleGasolineTypeAndCo2Info: {
            gasolineCo2EmissionInfoId: "",
            gasolineTypeId: "",
            unit: "",
            gasolineTypeName: "",
            co2EmissionUnit: 0,
            co2FuelUnit: 0,
            isDefault: false,
            defaultId: "",
            isCheck: false,
        },
        inspectionDate: '',
        vehicleOwnerShip: [],
        zipcode: '',
        zipcodeFormated: '',
        officeAddress: '',
        fitnessLicense: null,
        remarks: ''
    }

    constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private companySettingsOperationService: CompanySettingsOperationService, private languageService: LanguageService, private utilService: UtilService) { }

    formatedZipcodes: string[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;

    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VEHICLE_INFO_TAB;

        this.prepareVehicleAddressZipcode();

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
        this.companySettingsOperationService.getVehicleInfoList(this.companyInfo.companyId, pageNo, searchText).subscribe((vehicleList) => {
            if (vehicleList)
                this.companyInfo.vehicleList = vehicleList
        })

    }

    prepareVehicleAddressZipcode() {
        this.companyInfo.vehicleList.forEach(element => {
            if (element && element.zipcode) {
                this.formatedZipcodes.push(this.utilService.prepareZipCodeFormate(element.zipcode));
            }
        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    updateVehicleInfoViewList(vehicleInfo: VehicleInfoFetch) {
        if (vehicleInfo) {
            var updateFlag = false;

            vehicleInfo.zipcodeFormated = this.utilService.prepareZipCodeFormate(vehicleInfo.zipcode);

            this.companyInfo.vehicleList.forEach((element) => {

                if (element.vehicleId == vehicleInfo.vehicleId) {
                    var index = this.companyInfo.vehicleList.indexOf(element);
                    this.companyInfo.vehicleList[index] = vehicleInfo;
                    updateFlag = true;
                }
            });
            if (updateFlag == false) {
                this.companyInfo.vehicleList.unshift(vehicleInfo);

            }
        }
    }

    openVehicleInfoDiolog(vehicle?: VehicleInfoFetch): void {
        const sampleDialog = this.dialog.open(VehicleInfoAddPopupComponent, {
            width: '65%',
            height: '75%',
            data: {
                vehicle: vehicle,
                companyInfo: this.companyInfo
            },
            disableClose: true

        });
        sampleDialog.afterClosed().subscribe(result => {


            if (result) {
                this.companySettingsOperationService.addVehicleInfo(result).subscribe((data) => {
                    if (data) {
                        this.updateVehicleInfoViewList(data)
                    }
                })
            }
        });
    }

    openVehicleInfoViewDiolog(vehicle: VehicleInfoFetch): void {
        const sampleDialog = this.dialog.open(VehicleInfoViewPopupComponent, {
            width: '65%',
            data: vehicle,
            disableClose: true
        });
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_INFO_TAB, AppConstant.UI_LABEL_TEXT);

    removeVehicle(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.VEHICLE_REMOVE_OPERATION
        }

        this.companySettingsOperationService.getVehicleForwardLinks(itemId).subscribe(vehicleForwardLink => {

            const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
                width: '40%',
                // height: '30%',
                data: vehicleForwardLink,
                disableClose: true
            });

            removeDialog.afterClosed().subscribe(response => {
                if (response) {
                    this.companySettingsOperationService.removeVehicle(removeTriggerData).subscribe(response => {
                        if (response) {
                            this.utilService.showRemovedToast();
                            this.removeVehicleFromViewList(itemId);

                        }
                    });
                }
            });

        })
    }

    removeVehicleFromViewList(itemId: string) {
        var index = this.companyInfo.vehicleList.findIndex(item => item.vehicleId == itemId);

        if (index >= 0) {
            this.companyInfo.vehicleList.splice(index, 1);
        }
    }

}
