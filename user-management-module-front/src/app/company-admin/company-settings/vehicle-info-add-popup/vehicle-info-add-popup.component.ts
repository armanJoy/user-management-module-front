import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { AppConstant } from 'src/app/config/app-constant';
import { VehicleTypeSetupInfoFetch, GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { BranchInfoFetch, CompanyInfoFetch, VehicleInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { BranchAddressInfo, GasolineType, VehicleInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { VehicleSetupOperationService } from 'src/app/services/operation-services/vehicle-setup-operation.service';
@Component({
    selector: 'app-vehicle-info-add-popup',
    templateUrl: './vehicle-info-add-popup.component.html',
    styleUrls: ['./vehicle-info-add-popup.component.css']
})
export class VehicleInfoAddPopupComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private companySettingsOperationService: CompanySettingsOperationService, public dialogRef: MatDialogRef<VehicleInfoAddPopupComponent>, public matDialog: MatDialog, private languageService: LanguageService, private vehicleSetupOperationService: VehicleSetupOperationService) { }

    vehicle?: VehicleInfoFetch;
    companyInfo!: CompanyInfoFetch;
    vehicleTypeList: VehicleTypeSetupInfoFetch[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;
    gasolineList: GasolineCo2EmissionInfo[] = [];
    viewContent: boolean = false

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.VEHICLE_INFO_ADD_POPUP;

        if (this.data.vehicle) {
            // this.vehicleInfo = Object.assign({}, this.data.vehicle);
            this.vehicleInfo = JSON.parse(JSON.stringify(this.data.vehicle));
        }
        if (this.data.companyInfo) {
            this.companyInfo = this.data.companyInfo;
            this.newAddressList = this.makeAddressList(this.data.companyInfo.branchList, this.data.companyInfo);
            this.prepareSelectedAddress(this.vehicleInfo.zipcode, this.vehicleInfo.officeAddress, this.newAddressList);
            this.gasolineTypeViewList = this.prepareGasolineTypeViewList(AppConstant.GASOLINE_TYPE, this.vehicleInfo.gasolineType);
        }

        this.getCompanyVehicleType();

    }
    getCompanyVehicleType() {
        this.vehicleSetupOperationService.getCompanyVehicleTypeList().subscribe(data => {

            if (data) {
                this.vehicleTypeList = data;

                if (this.vehicleInfo.vehicleId) {
                    this.vehicleTypeList.forEach(element => {
                        if (element.vehicleTypeId == this.vehicleInfo.vehicleTypeId) {
                            this.onloadselectionChangeForVehicleType(element);
                        }
                    });
                }
                else
                    this.onloadselectionChangeForVehicleType(this.vehicleTypeList[0]);

            }
            this.viewContent = true;
        });
    }
    onloadselectionChangeForVehicleType(item: VehicleTypeSetupInfoFetch) {

        this.vehicleInfo.vehicleTypeId = item.vehicleTypeId;
        this.vehicleInfo.vehicleType = item.vehicleTypeName;
        this.gasolineList = item.gasolinTypeList;
        if (this.vehicleInfo.vehicleGasolineTypeAndCo2Info.gasolineTypeId == "") {
            this.gasolineList.forEach(element => {
                if (element.gasolineTypeId == item.gasolineTypeDefaultId) {
                    this.vehicleInfo.vehicleGasolineTypeAndCo2Info = element;
                }

            });
        }
        else {
            this.gasolineList.forEach(element => {
                if (element.gasolineTypeId == this.vehicleInfo.vehicleGasolineTypeAndCo2Info.gasolineTypeId) {
                    this.vehicleInfo.vehicleGasolineTypeAndCo2Info = element;
                }

            });

        }



    }

    selectionChangeForVehicleType(item: any) {

        this.vehicleInfo.vehicleTypeId = item.value.vehicleTypeId;
        this.vehicleInfo.vehicleType = item.value.vehicleTypeName;
        this.gasolineList = item.value.gasolinTypeList;
        this.gasolineList.forEach(element => {
            if (element.gasolineTypeId == item.value.gasolineTypeDefaultId) {
                this.vehicleInfo.vehicleGasolineTypeAndCo2Info = element;
            }

        });

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    selectedAddress: BranchAddressInfo = {
        branchName: '',
        branchAddress: '',
        branchZipCode: ''
    }

    vehicleInfo: VehicleInfoFetch = {
        companyId: "",
        vehicleId: "",
        frontendDate: "",
        backendDate: "",
        manufacturerName: "",
        vehicleType: "",
        modelName: "",
        vehicleRegNo: "",
        vehicleCapacity: "",
        vehicleWeight: "",
        gasolineType: [],
        inspectionDate: "",
        vehicleOwnerShip: [],
        zipcode: "",
        zipcodeFormated: '',
        officeAddress: "",
        fitnessLicense: "",
        remarks: "",
        vehicleTypeId: "",
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
        }

    };



    resetVehicleInfo() {
        this.vehicleInfo = {
            companyId: "",
            vehicleId: "",
            frontendDate: "",
            backendDate: "",
            manufacturerName: "",
            vehicleType: "",
            modelName: "",
            vehicleRegNo: "",
            vehicleCapacity: "",
            vehicleWeight: "",
            gasolineType: [],
            inspectionDate: "",
            vehicleOwnerShip: [],
            zipcode: "",
            zipcodeFormated: '',
            officeAddress: "",
            fitnessLicense: "",
            remarks: "",
            vehicleTypeId: "",
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
            }
        }
        // this.resetGasolineType();
    }

    upLoadFile(event: any) {
        this.utilService.convertFileToBase64(event, ((convertedBase64String: string) => {
            if (convertedBase64String) {
                this.vehicleInfo.fitnessLicense = convertedBase64String;
            }
        }));
    }


    addVehicle() {
        var validationReport = this.companySettingsOperationService.vehicleInfoFormValidator(this.vehicleInfo);

        if (validationReport && validationReport.invalidCount > 0) {
            const invalidDialog = this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            if (this.vehicleInfo) {

                this.vehicleInfo.companyId = this.companyInfo?.companyId;
                this.vehicleInfo.vehicleId = (this.vehicleInfo.vehicleId) ? this.vehicleInfo.vehicleId : this.utilService.generateUniqueId();

                this.dialogRef.close(this.vehicleInfo);
                this.resetVehicleInfo();
            }

        }
    }

    SearchZipCodeData(zipCode: string) {
        if (zipCode) {

            this.companySettingsOperationService.getZipCodeInformation(zipCode).subscribe((data) => {
                if (data) {
                    this.vehicleInfo.officeAddress = data.address;
                }
            });
        }

    }

    onAddressSelectionChange() {
        if (this.selectedAddress.branchName) {
            this.vehicleInfo.zipcode = this.selectedAddress.branchZipCode;
            this.vehicleInfo.officeAddress = this.selectedAddress.branchAddress;
        }
    }

    prepareSelectedAddress(currentZipCode: string, currentAddress: string, branchList: BranchAddressInfo[]) {
        if (branchList) {
            branchList.forEach(eachBranchAddress => {
                if (eachBranchAddress.branchAddress == currentAddress && eachBranchAddress.branchZipCode == currentZipCode) {
                    this.selectedAddress = eachBranchAddress;
                }
            });
        }
    }

    makeAddressList(branchList: BranchInfoFetch[], company: CompanyInfoFetch): BranchAddressInfo[] {
        var addressList: BranchAddressInfo[] = [];
        if (company) {
            var selectionName = AppConstant.COMPANYADDRESS + company.companyName;
            var addressInfo: BranchAddressInfo = {
                branchName: selectionName,
                branchAddress: company.companyAddress,
                branchZipCode: company.zipcode
            }

            addressList.push(addressInfo);
        }
        if (branchList) {

            branchList.forEach(element => {
                var selectionName = AppConstant.BRANCHADDRESS + (branchList.indexOf(element) + 1) + ' : ' + element.branchName;
                var addressInfo: BranchAddressInfo = {
                    branchName: selectionName,
                    branchAddress: element.branchAddress,
                    branchZipCode: element.zipcode
                }
                addressList.push(addressInfo);
            });
        }
        return addressList;

    }
    newAddressList: BranchAddressInfo[] = [];

    prepareGasolineTypeViewList(gasolineTypeList: string[], gasolineType: string[]) {
        var gasolineTypeViewList: GasolineType[] = [];
        if (gasolineTypeList) {
            gasolineTypeList.forEach(element => {

                if (element == AppConstant.GASOLINE_TYPE_PETROL) {
                    const gasoline: GasolineType = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.petrol

                    }

                    gasolineTypeViewList.push(gasoline);

                } else if (element == AppConstant.GASOLINE_TYPE_DIESEL) {
                    const gasoline: GasolineType = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.diesel

                    }

                    gasolineTypeViewList.push(gasoline);

                } else if (element == AppConstant.GASOLINE_TYPE_OCTANE) {
                    const gasoline: GasolineType = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.octane

                    }

                    gasolineTypeViewList.push(gasoline);
                } else if (element == AppConstant.GASOLINE_TYPE_CNG) {
                    const gasoline: GasolineType = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.cng

                    }

                    gasolineTypeViewList.push(gasoline);

                } else if (element == AppConstant.GASOLINE_TYPE_ELECTRIC) {
                    const gasoline: GasolineType = {
                        name: element,
                        isCheck: false,
                        label: this.uiLabels.electric

                    }

                    gasolineTypeViewList.push(gasoline);
                }

            });
        }

        gasolineTypeViewList.forEach(element => {
            if (gasolineType) {
                gasolineType.forEach((gasoline) => {

                    if (gasoline == element.name) {

                        element.isCheck = true;
                    }

                })
            }

        });

        return gasolineTypeViewList;
    }

    gasolineTypeViewList: GasolineType[] = [];

    resetGasolineType() {
        this.gasolineTypeViewList.forEach(element => {
            element.isCheck = false;

        });
    }

    onCheckboxChange(e: any) {

        if (e) {
            if (e.target.checked) {
                this.vehicleInfo.gasolineType.push(e.target.value);

            } else {
                this.vehicleInfo.gasolineType.forEach((element, index) => {
                    if (element == e.target.value) this.vehicleInfo.gasolineType.splice(index, 1);

                });
            }
        }
    }
    radioBtnChange(data: any) {
        this.vehicleInfo.vehicleGasolineTypeAndCo2Info = data.value;
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_INFO_ADD_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "vehicleDetails": "Vehicle Info",
    //     "manufacturerName": "Vehicle Name",
    //     "vehicleType": "Vehicle Type",
    //     "modelName": "Model Name",
    //     "vehicleNo": "Vehicle No",
    //     "capacity": "Capacity",
    //     "vehicleWeight": "Vehicle Weight",
    //     "gasolineType": "Gasoline Type",
    //     "inspectionDate": "Inspection Date",
    //     "vehicleOwnership": "Vehicle Ownership",
    //     "zipCode": "Zip Code",
    //     "officeAddress": "Affiliated Office Address",
    //     "fitnessLicense": "Fitness Paper",
    //     "remarks": "Remarks",
    //     "temporary": "Temporary",
    //     "permanent": "Permanent",
    //     "close": "Close",
    //     "addBtn": "Register",
    //     "petrol": "Regular (petrol)",
    //     "diesel": "Diesel",
    //     "octane": "High Octane",
    //     "cng": "CNG",
    //     "electric": "Electric"
    // }
}
