import { Component, OnInit } from '@angular/core';
import { VehicleSetupOperationService } from 'src/app/services/operation-services/vehicle-setup-operation.service';
import { VehicleTypeSetupInfoFetch, GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-vehicle-setup-menu',
    templateUrl: './vehicle-setup-menu.component.html',
    styleUrls: ['./vehicle-setup-menu.component.css']
})
export class VehicleSetupMenuComponent implements OnInit {
    vehicleTypeList: VehicleTypeSetupInfoFetch[] = [];
    vehicleTypeInfo: VehicleTypeSetupInfoFetch = {
        vehicleTypeId: "",
        vehicleTypeName: "",
        code: "",
        description: "",
        gasolineTypeDefaultId: "",
        gasolinTypeList: []
    };
    gasolineTypeList: GasolineCo2EmissionInfo[] = [];
    gasolineInfo: GasolineCo2EmissionInfo = {
        gasolineCo2EmissionInfoId: "",
        gasolineTypeId: "",
        unit: "",
        gasolineTypeName: "",
        co2EmissionUnit: 0,
        co2FuelUnit: 0,
        isDefault: false,
        defaultId: "",
        isCheck: false
    }
    viewContent = false

    componentCode: string = AppConstant.COMP.VEHICLE_SETUP_MENU;
    isSystemAdmin: boolean = false;
    constructor(private vehicleSetupOperationService: VehicleSetupOperationService, private languageService: LanguageService, private utilService: UtilService) { }

    ngOnInit(): void {
        this.getVehicleTypeList();
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_SETUP_MENU, AppConstant.UI_LABEL_TEXT);
    }


    uiLabels: any = {
        gasolineTypeTab: "Gasoline Type",
        vehicleTypeTab: "Vehicle Type"
    }


    getVehicleTypeList() {
        this.vehicleSetupOperationService.getCompanyVehicleTypeList().subscribe((data) => {

            if (data) {
                this.vehicleTypeList = data;
            }
            this.getGasolineList()
        })
    }
    getGasolineList() {
        this.vehicleSetupOperationService.getCompanyGasolineList().subscribe((data) => {
            if (data) {
                this.gasolineTypeList = data;
            }
            this.viewContent = true;
        })
    }
}
