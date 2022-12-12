import { Component, OnInit, Input } from '@angular/core';
import { CompanyTotalCo2QuantityView, MonthWiseCompanyVehicleFuelConsumptionFetch, ProjectWiseWasteItemQuantityFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-transporting-operation-tab',
    templateUrl: './transporting-operation-tab.component.html',
    styleUrls: ['./transporting-operation-tab.component.css']
})
export class TransportingOperationTabComponent implements OnInit {
    @Input()
    projectWiseCO2Emission!: ProjectWiseWasteItemQuantityFetch;
    @Input()
    selectedMonth: string = "";
    @Input()
    selectedYear: string = "";
    @Input()
    startDate: string = "";
    @Input()
    endDate: string = "";
    @Input()
    transporterMonthWiseCompanyVehicleFuelConsumption: MonthWiseCompanyVehicleFuelConsumptionFetch[] = [];
    @Input()
    companyTotalCo2Quantity: CompanyTotalCo2QuantityView = {
        totalCo2Quantity: 0,
        dumperCo2Quantity: 0,
        processorCo2Quantity: 0,
        transPorterCo2Quantity: 0,
    }
    componentCode: string = AppConstant.COMP.Transporting_Operation_Tab_Component;
    isSystemAdmin: boolean = false;
    constructor(private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, public dialogRef: MatDialogRef<TransportingOperationTabComponent>, private languageService: LanguageService, private utilservice: UtilService) { }

    ngOnInit(): void {
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Transporting_Operation_Tab_Component, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        month: "Month",
        year: "Year",
        totalCO2Value: "Total CO2 Value",
        value: "Value",
        wasteItem: "Waste Item",
        quantity: "Quantity",
        co2EmissionValue: "CO2 Emission Value",
        quantityPerunit: "Quantity/Unit",
        unit: "Unit",
        saveBtn: "Save",
        vehicleName: "Vehicle Name",
        licenseNo: "License No",
        fuelType: "Fuel Type",
        CO2Emission: "CO2 Emission",
        fuelConsumption: "Fuel Consumption",
        calculatedC02: "Calculated C02"

    }
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }
    prepareCo2CalculatedData(fuelConsumption: number, index: number, itemNo: number) {
        this.transporterMonthWiseCompanyVehicleFuelConsumption[itemNo].vehicleFuelConsumptionInfo[index].calculatedCo2Emission = this.transporterMonthWiseCompanyVehicleFuelConsumption[itemNo].vehicleFuelConsumptionInfo[index].co2perUnit * fuelConsumption;
        var co2Sum = 0;
        this.transporterMonthWiseCompanyVehicleFuelConsumption.forEach(item => {
            item.vehicleFuelConsumptionInfo.forEach(element => {
                co2Sum += element.calculatedCo2Emission;
            });
        });
        // this.transporterMonthWiseCompanyVehicleFuelConsumption[itemNo].vehicleFuelConsumptionInfo.forEach(element => {
        //     co2Sum += element.calculatedCo2Emission;
        // });
        this.companyTotalCo2Quantity.transPorterCo2Quantity = co2Sum;
    }
    onClickSaveBtn() {
        this.companySettingsOperationService.saveMonthWiseVehicleFuelConsumptionInfo(this.transporterMonthWiseCompanyVehicleFuelConsumption).subscribe(data => {
            if (data) {
                this.utilService.showSnackbar('Your Response Save', 2000);
                this.dialogRef.close(data);
            }
        });
    }

}
