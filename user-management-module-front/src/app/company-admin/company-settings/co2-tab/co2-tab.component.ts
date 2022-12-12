import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { MonthWiseTotalWasteItemQuantityFetch, InputForCompanyWasteFetch, CompanyTotalCo2QuantityView, PrepareCo2DataView, MonthWiseCompanyVehicleFuelConsumptionFetch, PrepareVehicleCo2DataView, WasteItemForChartView, ChartData, ProjectWiseWasteItemQuantityFetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Co2DetailPopupComponent } from '../co2-detail-popup/co2-detail-popup.component';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ChartType } from 'angular-google-charts';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
    selector: 'app-co2-tab',
    templateUrl: './co2-tab.component.html',
    styleUrls: ['./co2-tab.component.css']
})
export class Co2TabComponent implements OnInit {
    @Input()
    isDumperCompany!: boolean;

    @Input()
    isProcessorCompany!: boolean;

    @Input()
    isTransporterCompany!: boolean;

    @Input()
    yearDropDownData: string[] = [];

    @Input()
    monthDropDownData: string[] = [];

    @Input()
    selectedMonth: string = "";

    @Input()
    selectedYear: string = "";

    @Input()
    toSelectedMonth: string = "";

    @Input()
    toSelectedYear: string = "";

    @Input()
    startDate: string = "";

    @Input()
    endDate: string = "";

    @Input()
    dumpingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;

    @Input()
    processingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;

    @Input()
    companyTotalCo2Quantity: CompanyTotalCo2QuantityView = {
        totalCo2Quantity: 0,
        dumperCo2Quantity: 0,
        processorCo2Quantity: 0,
        transPorterCo2Quantity: 0,
    }

    @Input()
    transporterMonthWiseCompanyVehicleFuelConsumption: MonthWiseCompanyVehicleFuelConsumptionFetch[] = [];

    @Input()
    dumpingChartData!: ChartData;

    @Input()
    transporterChartData!: ChartData;

    @Input()
    processingChartData!: ChartData;

    operationWiseCo2Filter = AppConstant.OPERATION_WISE_CO2_FILTER;
    projectWiseCo2Filter = AppConstant.PROJECT_WISE_CO2_FILTER;

    projectWiseCO2EmissionList: ProjectWiseWasteItemQuantityFetch[] = []
    fromDate: string = "";
    toDate: string = "";
    filter: string = this.projectWiseCo2Filter;



    isDateRangeCorrect: boolean = true;

    dateForCo2Emission: string = "";
    inputForCompanyWasteFetch: InputForCompanyWasteFetch = {
        companyId: "",
        toDate: "",
        fromDate: "",
        monthRange: []
    }
    viewComponent: boolean = false;
    componentCode: string = AppConstant.COMP.Co2_Tab_Component;
    isSystemAdmin: boolean = false;


    constructor(private companySettingsOperationService: CompanySettingsOperationService, private utilService: UtilService, private matDialog: MatDialog, private languageService: LanguageService, private breakpointObserver: BreakpointObserver) { }

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    ngOnInit(): void {

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.Co2_Tab_Component, AppConstant.UI_LABEL_TEXT);
        // this.getMonthWiseDumperCompanyData()
    }

    uiLabels: any = {
        month: "Month",
        year: "Year",
        dupmingCo2Quantity: "Dupming CO2 Quantity",
        processCo2Quantity: "Process CO2 Quantity",
        transporterCo2Quantity: "Transportation CO2 Quantity",
        totalCO2Quantity: "Total CO2 Quantity",
        detailBtn: "Detail",
        dumpingEmissionGraph: "Emission Graph for Dumping Operation",
        processingEmissionGraph: "Emission Graph for Processing Operation",
        transporterEmissionGraph: "Emission Graph for Transport Operation"
    }


    // changeYear(item: any) {
    //     // this.viewComponent = false;
    //     this.selectedYear = item.value;
    //     this.monthDropDownData = AppConstant.MONTH;
    //     // this.selectedMonth = this.monthDropDownData[0];
    //     this.dateForCo2Emission = this.selectedYear;
    //     this.startDate = this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
    //     this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
    //     this.checkDateRange();
    //     // this.getMonthWiseDumperCompanyData();

    // }

    changeYear(item: any) {
        var langIndex: string = this.utilService.getSelectedLanguageIndex();
        this.selectedYear = item.value;
        if (langIndex == AppConstant.LANG_INDEX_JPN) {
            this.monthDropDownData = AppConstant.MONTH_JPN;
        } else if (langIndex == AppConstant.LANG_INDEX_ENG) {
            this.monthDropDownData = AppConstant.MONTH;
        }
        this.dateForCo2Emission = this.selectedYear;
        this.startDate = this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
        this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
        this.checkDateRange();


    }

    changeMonth(item: any) {
        // this.viewComponent = false;
        this.selectedMonth = item.value;
        this.dateForCo2Emission = this.selectedYear;
        this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
        this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
        this.checkDateRange();
        // this.getMonthWiseDumperCompanyData();

    }
    // toChangeYear(item: any) {
    //     // this.viewComponent = false;
    //     this.toSelectedYear = item.value;
    //     this.monthDropDownData = AppConstant.MONTH;
    //     // this.toSelectedMonth = this.monthDropDownData[0];

    //     this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
    //     this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
    //     this.checkDateRange();
    //     // this.dateForCo2Emission = this.selectedYear;

    //     // this.getMonthWiseDumperCompanyData();

    // }

    toChangeYear(item: any) {
        var langIndex: string = this.utilService.getSelectedLanguageIndex();
        this.toSelectedYear = item.value;
        if (langIndex == AppConstant.LANG_INDEX_JPN) {
            this.monthDropDownData = AppConstant.MONTH_JPN;
        } else if (langIndex == AppConstant.LANG_INDEX_ENG) {
            this.monthDropDownData = AppConstant.MONTH;
        }
        this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
        this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
        this.checkDateRange();

    }
    toChangeMonth(item: any) {
        // this.viewComponent = false;
        this.toSelectedMonth = item.value;



        this.startDate = "01 " + this.selectedMonth + ", " + this.selectedYear;
        this.endDate = this.monthWiseDay(this.toSelectedMonth) + " " + this.toSelectedMonth + ", " + this.toSelectedYear;
        this.checkDateRange();
        // this.dateForCo2Emission = this.selectedYear;

        // this.getMonthWiseDumperCompanyData();

    }

    monthWiseDay(month: string): string {
        var langIndex: string = this.utilService.getSelectedLanguageIndex();
        var monthDay: string = "";
        for (var i = 0; i < 12; i++) {
            if (langIndex == AppConstant.LANG_INDEX_JPN) {
                if (AppConstant.MONTH_JPN[i] == month) {
                    monthDay = AppConstant.MONTH_DAY[i];
                }
            } else if (langIndex == AppConstant.LANG_INDEX_ENG) {
                if (AppConstant.MONTH[i] == month) {
                    monthDay = AppConstant.MONTH_DAY[i];
                }
            }
        }

        return monthDay;
    }

    // monthWiseDay(month: string): string {
    //     var monthDay: string = "";
    //     for (var i = 0; i < 12; i++) {
    //         if (AppConstant.MONTH[i] == month) {
    //             monthDay = AppConstant.MONTH_DAY[i];
    //         }
    //     }

    //     return monthDay;
    // }
    checkDateRange() {
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.selectedYear, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);

        if (this.inputForCompanyWasteFetch.toDate < this.inputForCompanyWasteFetch.fromDate) {
            this.isDateRangeCorrect = false;
        }
        else {
            this.isDateRangeCorrect = true;
        }
    }
    onClickShowBtn() {

        if (this.isDateRangeCorrect) {
            this.viewComponent = false;
            this.fromDate = this.selectedMonth + ", " + this.selectedYear + "";
            this.toDate = this.toSelectedMonth + ", " + this.toSelectedYear + "";
            this.getMonthWiseProcessorCompanyData();
        }

    }

    // getMonthWiseDumperCompanyData() {
    //     this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
    //     this.companyTotalCo2Quantity.dumperCo2Quantity = 0;
    //     this.companyTotalCo2Quantity.transPorterCo2Quantity = 0;
    //     this.companyTotalCo2Quantity.processorCo2Quantity = 0;
    //     this.companyTotalCo2Quantity.totalCo2Quantity = 0;
    //     this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.selectedYear, this.selectedMonth);
    //     this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);

    //     if (this.inputForCompanyWasteFetch.toDate < this.inputForCompanyWasteFetch.fromDate) {
    //         this.isDateRangeCorrect = false;
    //     }
    //     else {
    //         this.isDateRangeCorrect = true;
    //         if (this.isDumperCompany) {
    //             // this.viewComponent = false;
    //             this.companySettingsOperationService.getMonthWiseDumperCompayWasteQuantity(this.inputForCompanyWasteFetch).subscribe(data => {

    //                 if (data) {
    //                     this.dumpingMonthWiseTotalWasteItemQuantity = data;
    //                     var prepareCo2DataView: PrepareCo2DataView = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.dumpingMonthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity);
    //                     // this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
    //                     this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
    //                     this.dumpingMonthWiseTotalWasteItemQuantity = prepareCo2DataView.monthwiseData;

    //                     this.dumpingChartData.data = this.companySettingsOperationService.prepareDumpingWasteforChart(this.dumpingMonthWiseTotalWasteItemQuantity);

    //                     this.prepareTotalCO2Quantity();

    //                 }

    //                 this.getMonthWiseProcessorCompanyData();
    //             });

    //         }
    //         else {
    //             this.getMonthWiseProcessorCompanyData();
    //         }

    //     }
    //     // console.log(this.inputForCompanyWasteFetch);


    // }

    getTotalCo2Emission(): number {
        return this.projectWiseCO2EmissionList.reduce((ac, obj) => {
            return ac + obj.dumperCo2Emission;
        }, 0);
    }

    getTotalTransportEmission(): number {
        return this.projectWiseCO2EmissionList.reduce((ac, obj) => {
            return ac + obj.transporterCo2Emission;
        }, 0);
    }

    getTotalProcessingEmission(): number {
        return this.projectWiseCO2EmissionList.reduce((ac, obj) => {
            return ac + obj.processTotalQuantity;
        }, 0);
    }

    getMonthWiseProcessorCompanyData() {
        this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.selectedYear, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);
        // if (this.isProcessorCompany) {
        this.companySettingsOperationService.getMonthWiseProcessorCompayWasteQuantity(this.inputForCompanyWasteFetch).subscribe(data => {
            if (data) {
                this.processingMonthWiseTotalWasteItemQuantity = data.operationWiseCO2Emission;
                this.projectWiseCO2EmissionList = data.projectWiseCO2EmissionList;
                var prepareCo2DataView: PrepareCo2DataView = this.companySettingsOperationService.prepareProcessingCo2Quantity(this.processingMonthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity);
                // this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
                this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                this.processingMonthWiseTotalWasteItemQuantity = prepareCo2DataView.monthwiseData;
                this.processingChartData.data = this.companySettingsOperationService.prepareProcessingWasteforChart(this.processingMonthWiseTotalWasteItemQuantity);
                this.projectWiseCO2EmissionList = this.companySettingsOperationService.prepareProjectWiseProcessQuantity(this.projectWiseCO2EmissionList);
                this.prepareTotalCO2Quantity();
            }
            this.getMonthWiseTransportCompanyData();
        });
        this.getMonthWiseTransportCompanyData();
        // }
        // else 
        // {
        //     this.getMonthWiseTransportCompanyData()
        // }
    }
    getMonthWiseTransportCompanyData() {
        this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.selectedYear, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);
        var toDate: string = this.inputForCompanyWasteFetch.toDate + "010000000";
        var fromDate: string = this.inputForCompanyWasteFetch.fromDate + "010000000";

        this.inputForCompanyWasteFetch.monthRange = this.utilService.getAllMonthsBetweenTwoDate(fromDate, toDate);
        // if (this.isTransporterCompany) {
        this.companySettingsOperationService.getMonthWiseVehicleFuelConsumptionInfo(this.inputForCompanyWasteFetch).subscribe(data => {
            if (data) {
                this.transporterMonthWiseCompanyVehicleFuelConsumption = data;
                this.transporterMonthWiseCompanyVehicleFuelConsumption = this.companySettingsOperationService.prepareTransporterMonthViewData(this.transporterMonthWiseCompanyVehicleFuelConsumption);
                var prepareCo2DataView: PrepareVehicleCo2DataView = this.companySettingsOperationService.prepareTransporterCo2Quantity(this.transporterMonthWiseCompanyVehicleFuelConsumption, this.companyTotalCo2Quantity);
                this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                this.transporterMonthWiseCompanyVehicleFuelConsumption = prepareCo2DataView.monthwiseData;
                this.transporterChartData.data = this.companySettingsOperationService.prepareTransporterWasteforChart(this.transporterMonthWiseCompanyVehicleFuelConsumption);
                this.prepareTotalCO2Quantity();
            }
            this.viewComponent = true;
        });
        //     }
        // else
        // {
        //     this.viewComponent = true;
        // }

    }

    prepareTotalCO2Quantity() {

        this.companyTotalCo2Quantity.dumperCo2Quantity = this.companyTotalCo2Quantity.dumperCo2Quantity;
        this.companyTotalCo2Quantity.totalCo2Quantity = this.companyTotalCo2Quantity.dumperCo2Quantity + this.companyTotalCo2Quantity.processorCo2Quantity + this.companyTotalCo2Quantity.transPorterCo2Quantity;
    }

    onClickDetailBtn() {
        const dialogRef = this.matDialog.open(Co2DetailPopupComponent, {
            width: "75%",
            data: {
                dumperCompanymonthWiseCompanyData: this.dumpingMonthWiseTotalWasteItemQuantity,
                processorCompanymonthWiseCompanyData: this.processingMonthWiseTotalWasteItemQuantity,
                transporterCompanymonthWiseCompanyData: this.transporterMonthWiseCompanyVehicleFuelConsumption,
                month: this.selectedMonth,
                year: this.selectedYear,
                dumper: this.isDumperCompany,
                transporter: this.isTransporterCompany,
                processor: this.isProcessorCompany,
                totalQuantity: this.companyTotalCo2Quantity,
                start: this.startDate,
                end: this.endDate,
                isProjectWiseCO2Emission: false
            },

            // disableClose: true
        });

        dialogRef.afterClosed().subscribe(result => {

            if (result) {
                if (this.isTransporterCompany) {
                    var prepareCo2DataView: PrepareVehicleCo2DataView = this.companySettingsOperationService.prepareTransporterCo2Quantity(result, this.companyTotalCo2Quantity);
                    this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                    this.transporterMonthWiseCompanyVehicleFuelConsumption = prepareCo2DataView.monthwiseData;

                    this.transporterChartData.data = this.companySettingsOperationService.prepareTransporterWasteforChart(this.transporterMonthWiseCompanyVehicleFuelConsumption);
                }
            }

        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    )

    onClickProjectDetailBtn(projectWiseCO2Emission: ProjectWiseWasteItemQuantityFetch) {
        const dialogRef = this.matDialog.open(Co2DetailPopupComponent, {
            width: "75%",
            data: {
                projectWiseEmission: projectWiseCO2Emission,
                dumperCompanymonthWiseCompanyData: this.dumpingMonthWiseTotalWasteItemQuantity,
                processorCompanymonthWiseCompanyData: this.processingMonthWiseTotalWasteItemQuantity,
                transporterCompanymonthWiseCompanyData: this.transporterMonthWiseCompanyVehicleFuelConsumption,
                month: this.selectedMonth,
                year: this.selectedYear,
                dumper: this.isDumperCompany,
                transporter: this.isTransporterCompany,
                processor: this.isProcessorCompany,
                totalQuantity: this.companyTotalCo2Quantity,
                start: this.startDate,
                end: this.endDate,
                isProjectWiseCO2Emission: true
            },

            // disableClose: true
        });
    }

    public barChartType: ChartType = ChartType.Bar;
    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    // chartData = {
    //     type: ChartType.Bar,
    //     data: [
    //         ["PHP Books", 500],
    //         [".Net Books", 800],
    //         ["Java Books", 400],
    //     ],
    //     chartColumns: ['Books', 'Sell'],
    //     width: 1000,
    //     height: 400
    // };

}
