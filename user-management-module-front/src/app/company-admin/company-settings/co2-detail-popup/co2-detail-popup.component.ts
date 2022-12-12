import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyTotalCo2QuantityView, MonthWiseCompanyVehicleFuelConsumptionFetch, MonthWiseTotalWasteItemQuantityFetch, ProjectWiseWasteItemQuantityFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-co2-detail-popup',
    templateUrl: './co2-detail-popup.component.html',
    styleUrls: ['./co2-detail-popup.component.css']
})
export class Co2DetailPopupComponent implements OnInit {

    selectedMonth: string = "";

    selectedYear: string = "";

    startDate: string = "";

    endDate: string = "";

    monthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;

    isDumperCompany!: boolean;

    isProcessorCompany!: boolean;

    isTransporterCompany!: boolean;
    companyTotalCo2Quantity: CompanyTotalCo2QuantityView = {
        totalCo2Quantity: 0,
        dumperCo2Quantity: 0,
        processorCo2Quantity: 0,
        transPorterCo2Quantity: 0,
    }

    dumpingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;

    processingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;
    transporterMonthWiseCompanyVehicleFuelConsumption: MonthWiseCompanyVehicleFuelConsumptionFetch[] = [];
    isProjectWiseCO2Emission: boolean = false;
    projectWiseCO2Emission!: ProjectWiseWasteItemQuantityFetch;
    constructor(public dialogRef: MatDialogRef<Co2DetailPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private languageService: LanguageService, private utilService: UtilService) { }

    componentCode: string = AppConstant.COMP.CO2_DEATAIL_POPUP;
    isSystemAdmin: boolean = false;
    projectWiseView: boolean = false;

    ngOnInit(): void {
        this.data = JSON.parse(JSON.stringify(this.data));
        if (this.data) {
            this.isProjectWiseCO2Emission = this.data.isProjectWiseCO2Emission;
            this.isDumperCompany = this.data.dumper;
            this.isProcessorCompany = this.data.processor;
            this.isTransporterCompany = this.data.transporter;
            this.selectedMonth = this.data.month;
            this.selectedYear = this.data.year;
            this.dumpingMonthWiseTotalWasteItemQuantity = this.data.dumperCompanymonthWiseCompanyData;
            this.processingMonthWiseTotalWasteItemQuantity = this.data.processorCompanymonthWiseCompanyData;
            this.transporterMonthWiseCompanyVehicleFuelConsumption = this.data.transporterCompanymonthWiseCompanyData;
            this.companyTotalCo2Quantity = this.data.totalQuantity;
            this.startDate = this.data.start;
            this.endDate = this.data.end;
            if (this.isProjectWiseCO2Emission) {
                this.projectWiseCO2Emission = this.data.projectWiseEmission;
                this.projectWiseView = true;
            }

        }
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.CO2_DEATAIL_POPUP, AppConstant.UI_LABEL_TEXT);
    }
    uiLabels: any = {
        companyCO2Details: "Company CO2 Details",
        dumpingOperation: "Dumping Operation",
        processingOperation: "Processing Operation",
        transportingOperation: "Transporting Operation"
    }
    onClickCloseBtn() {
        this.dialogRef.close(this.transporterMonthWiseCompanyVehicleFuelConsumption);
    }

}
