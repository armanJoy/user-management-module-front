import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfoFetch, CompWasteInfoFetch, DxrWasteInfoFetch, WasteItemSetMethode } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { MonthWiseTotalWasteItemQuantityFetch, InputForCompanyWasteFetch, CompanyTotalCo2QuantityView, PrepareCo2DataView, MonthWiseCompanyVehicleFuelConsumptionFetch, PrepareVehicleCo2DataView, WasteItemForChartView, ChartData } from 'src/app/models/backend-fetch/carbon-emmition';
import { ChartType } from 'angular-google-charts';
import { BulkSubscriptionComponent } from 'src/app/system-admin/bulk-subscription/bulk-subscription.component';
import { SubscriptionFormComponent } from 'src/app/visitor/subscription/subscription-form/subscription-form.component';

@Component({
    selector: 'app-company-settings-tabs',
    templateUrl: './company-settings-tabs.component.html',
    styleUrls: ['./company-settings-tabs.component.css']
})

export class CompanySettingsTabsComponent implements OnInit {

    viewComponent = false;

    constructor(public companySettingsOperationService: CompanySettingsOperationService, private dialog: MatDialog, private languageService: LanguageService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public viewCompanyId?: string) { }

    langIndex: string = "";
    isDumperCompany: boolean = false;
    isProcessorCompany: boolean = false;
    isTransporterCompany: boolean = false;
    yearDropDownData: string[] = [];
    monthDropDownData: string[] = []
    companyInfo!: CompanyInfoFetch;
    selectedMonth: string = "";
    selectedYear: string = "";
    toSelectedMonth: string = "";
    toSelectedYear: string = "";
    startDate: string = "";
    endDate: string = "";
    dumpingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;
    processingMonthWiseTotalWasteItemQuantity!: MonthWiseTotalWasteItemQuantityFetch;
    transporterMonthWiseCompanyVehicleFuelConsumption: MonthWiseCompanyVehicleFuelConsumptionFetch[] = [];
    dxrWasteInfoList: DxrWasteInfoFetch[] = [];
    dateForCo2Emission: string = "";
    selectedCompany!: CompanyInfoFetch;
    selectedCompanyId: string = '';

    dumpingData: WasteItemForChartView[] = []

    isViewMode: boolean = false;

    companyWasteInfoList: CompWasteInfoFetch[] = [];
    companyWasteItemSetMethodeList: WasteItemSetMethode[] = [];
    companyId: string = "";
    componentCode!: string;
    isSystemAdmin: boolean = false;
    inputForCompanyWasteFetch: InputForCompanyWasteFetch = {
        companyId: "",
        toDate: "",
        fromDate: "",
        monthRange: []
    }
    companyTotalCo2Quantity: CompanyTotalCo2QuantityView = {
        totalCo2Quantity: 0,
        dumperCo2Quantity: 0,
        processorCo2Quantity: 0,
        transPorterCo2Quantity: 0,
    }
    month: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    dumpingChartData: ChartData = {
        type: ChartType.Bar,
        data: [
            ["No Waste Data Available", 0]
        ],
        chartColumns: ["Waste", "gm"],
        width: 1000,
        height: 400
    };

    processingChartData: ChartData = {
        type: ChartType.Bar,
        data: [
            ["No Waste Data Available", 0]
        ],
        chartColumns: ["Waste", "gm"],
        width: 1000,
        height: 400
    };

    transporterChartData: ChartData = {
        type: ChartType.Bar,
        data: [
            ["No Vehicle Data Available", 0]
        ],
        chartColumns: ["Vehicle", "gm"],
        width: 1000,
        height: 400
    };
    uiLabels: any = {};

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.COMPANY_SETTINGS_TABS;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);


        if (this.viewCompanyId && this.viewCompanyId.length > 0) {
            this.isViewMode = true;
            this.selectedCompanyId = this.viewCompanyId;
        } else {
            this.selectedCompanyId = (this.utilService.getCompanyIdCookie()) ? this.utilService.getCompanyIdCookie() : '';
        }
        // this.companySettingsOperationService.getCompanyWasteInfo().subscribe((waste) => {
        //     if (waste) {
        //         this.companyWasteInfoList = waste
        //     }
        // })
        this.companyId = (this.selectedCompanyId) ? this.selectedCompanyId : this.utilService.getCompanyIdCookie();

        this.langIndex = this.utilService.getSelectedLanguageIndex();
        this.companySettingsOperationService.getCompanyInfo(this.selectedCompanyId).subscribe((company) => {

            if (company) {
                // this.companyInfo = company;
                this.companyInfo = this.prepareCompanyInfoView(company);
                this.prepareCompanyCategory()
                // this.companyInfo.wasteList = this.companyWasteInfoList
                // this.companySettingsOperationService.getScaleInfo().subscribe((scale) => {
                //     if (scale) {
                //         this.companyInfo.scaleSettingInfo = scale;
                //     }
                // });
            }
            this.getCompanyWasteItemMethode();

        });
        this.companySettingsOperationService.getDxrWasteInfo().subscribe((waste) => {
            if (waste) {
                this.dxrWasteInfoList = waste;
            }
        }
        )

    }
    prepareCompanyCategory() {

        var index = 0;
        this.companyInfo.companyBusinessCategory.forEach(companyCategory => {
            if (companyCategory == AppConstant.CATEGORY_NAME_DUMPER) {
                this.isDumperCompany = true;
                index++;
            }

        });
        if (index == 0) {
            this.isDumperCompany = false;
        }
        var index = 0;

        this.companyInfo.companyBusinessCategory.forEach(companyCategory => {

            if (companyCategory == AppConstant.CATEGORY_NAME_PROCESSOR) {
                this.isProcessorCompany = true;
                index++;
            }
        });
        if (index == 0) {
            this.isProcessorCompany = false;
        }

        var index = 0;
        this.companyInfo.companyBusinessCategory.forEach(companyCategory => {
            if (companyCategory == AppConstant.CATEGORY_NAME_TRANSPORTER) {
                this.isTransporterCompany = true;
                index++;
            }

        });
        if (index == 0) {
            this.isTransporterCompany = false;
        }
    }
    getCompanyWasteItemMethode() {
        this.companySettingsOperationService.getCompanyWasteItemCo2EmissionMethode(this.companyId).subscribe(data => {
            if (data) {
                this.companyWasteItemSetMethodeList = data;
            }
            this.getCurrentDate();
        })
    }
    prepareYearDataView(currentYear: string): string[] {
        var yearDropDownView: string[] = [];
        var i = 0;
        var number = Number(currentYear);
        while (i < 10) {
            var value: string = "" + number;
            number--;
            yearDropDownView.push(value)
            i++;
        }
        return yearDropDownView;
    }
    // prepareMonthDataView(currentMonth: string): string[] {
    //     var monthDropDownView: string[] = [];
    //     // var number = Number(currentMonth);
    //     // while (number > 0) {

    //     //     monthDropDownView.push(AppConstant.MONTH[number - 1]);
    //     //     number--;

    //     // }

    //     monthDropDownView = AppConstant.MONTH;

    //     return monthDropDownView;
    // }

    prepareMonthDataView(currentMonth: string): string[] {
        var monthDropDownView: string[] = [];

        if (this.langIndex == AppConstant.LANG_INDEX_JPN) {
            monthDropDownView = AppConstant.MONTH_JPN;
        } else if (this.langIndex == AppConstant.LANG_INDEX_ENG) {
            monthDropDownView = AppConstant.MONTH;
        }

        return monthDropDownView;
    }

    getCurrentDate() {

        this.companySettingsOperationService.getCurrentDate().subscribe(data => {

            if (data) {
                var year: any = data.toString().substring(0, 4);
                var month: any = data.toString().substring(4, 6);



                // for (var i = 0; i < data.length; i++) {
                //     if (i <= 3) {
                //         year += data[i];
                //     }
                //     else if (i == 4 || i == 5) {
                //         month += data[i];
                //     }

                // }
                this.yearDropDownData = this.prepareYearDataView(year);
                this.monthDropDownData = this.prepareMonthDataView(month);
                this.selectedYear = this.yearDropDownData[0];
                this.selectedMonth = this.monthDropDownData[0];
                this.toSelectedYear = this.yearDropDownData[0];
                this.toSelectedMonth = this.monthDropDownData[0];
                this.dateForCo2Emission = this.selectedYear;

                var startMonth: number = parseInt(month, 10);
                var endMonth: number = parseInt(month, 10);
                if (this.langIndex == AppConstant.LANG_INDEX_JPN) {
                    this.startDate = "01 " + AppConstant.MONTH_JPN[startMonth - 1] + ", " + this.selectedYear;
                    this.endDate = AppConstant.MONTH_DAY[endMonth - 1] + " " + AppConstant.MONTH_JPN[endMonth - 1] + ", " + this.toSelectedYear;
                } else if (this.langIndex == AppConstant.LANG_INDEX_ENG) {
                    this.startDate = "01 " + AppConstant.MONTH[startMonth - 1] + ", " + this.selectedYear;
                    this.endDate = AppConstant.MONTH_DAY[endMonth - 1] + " " + AppConstant.MONTH[endMonth - 1] + ", " + this.toSelectedYear;
                }

                this.viewComponent = true;
                // this.getMonthWiseDumperCompanyData();
                // console.log(this.monthDropDownData);
            }

        })
    }

    // getCurrentDate() {

    //     this.companySettingsOperationService.getCurrentDate().subscribe(data => {

    //         if (data) {
    //             var year: any = data.toString().substring(0, 4);
    //             var month: any = data.toString().substring(4, 6);

    //             // for (var i = 0; i < data.length; i++) {
    //             //     if (i <= 3) {
    //             //         year += data[i];
    //             //     }
    //             //     else if (i == 4 || i == 5) {
    //             //         month += data[i];
    //             //     }

    //             // }
    //             this.yearDropDownData = this.prepareYearDataView(year);
    //             this.monthDropDownData = this.prepareMonthDataView(month);
    //             this.selectedYear = this.yearDropDownData[0];
    //             this.selectedMonth = this.monthDropDownData[0];
    //             this.toSelectedYear = this.yearDropDownData[0];
    //             this.toSelectedMonth = this.monthDropDownData[0];
    //             this.dateForCo2Emission = this.selectedYear;

    //             var startMonth: number = parseInt(month, 10);
    //             var endMonth: number = parseInt(month, 10);

    //             this.startDate = "01 " + AppConstant.MONTH[startMonth - 1] + ", " + this.selectedYear;
    //             this.endDate = AppConstant.MONTH_DAY[endMonth - 1] + " " + AppConstant.MONTH[endMonth - 1] + ", " + this.toSelectedYear;

    //             this.viewComponent = true;
    //             // this.getMonthWiseDumperCompanyData();
    //             // console.log(this.monthDropDownData);
    //         }

    //     })
    // }

    getMonthWiseDumperCompanyData() {
        // this.viewComponent = true;
        this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.dateForCo2Emission, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);
        this.companyTotalCo2Quantity.dumperCo2Quantity = 0;
        this.companyTotalCo2Quantity.transPorterCo2Quantity = 0;
        this.companyTotalCo2Quantity.processorCo2Quantity = 0;
        this.companyTotalCo2Quantity.totalCo2Quantity = 0;
        if (this.isDumperCompany) {
            // this.viewComponent = false;
            this.companySettingsOperationService.getMonthWiseDumperCompayWasteQuantity(this.inputForCompanyWasteFetch).subscribe(data => {
                if (data) {
                    this.dumpingMonthWiseTotalWasteItemQuantity = data;
                    var prepareCo2DataView: PrepareCo2DataView = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.dumpingMonthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity);
                    // this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
                    this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                    this.dumpingMonthWiseTotalWasteItemQuantity = prepareCo2DataView.monthwiseData;

                    this.dumpingChartData.data = this.companySettingsOperationService.prepareDumpingWasteforChart(this.dumpingMonthWiseTotalWasteItemQuantity);
                }
                this.getMonthWiseProcessorCompanyData();
            });

        }
        else {
            this.getMonthWiseProcessorCompanyData();
        }
        // this.companySettingsOperationService.getMonthWiseCompayWasteQuantity(this.inputForCompanyWasteFetch).subscribe(data => {
        //     if (data) {
        //         this.monthWiseTotalWasteItemQuantity = data;
        //         // this.companyInfo.companyBusinessCategory.forEach(companyCategory => {
        //         if (this.isDumperCompany) {
        //             var prepareCo2DataView: PrepareCo2DataView = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity);
        //             // this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
        //             this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
        //             this.monthWiseTotalWasteItemQuantity = prepareCo2DataView.monthwiseData;
        //         }
        //         else if (this.isProcessorCompany) {
        //             this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareProcessingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
        //         }
        //         else if (this.isTransporterCompany) {
        //         }

        //         // });
        //     }
        //     this.viewComponent = true;
        // })
    }

    getMonthWiseProcessorCompanyData() {
        this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.dateForCo2Emission, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);
        if (this.isProcessorCompany) {
            this.companySettingsOperationService.getMonthWiseProcessorCompayWasteQuantity(this.inputForCompanyWasteFetch).subscribe(data => {
                if (data) {
                    this.processingMonthWiseTotalWasteItemQuantity = data.operationWiseCO2Emission;
                    var prepareCo2DataView: PrepareCo2DataView = this.companySettingsOperationService.prepareProcessingCo2Quantity(this.processingMonthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity);
                    // this.companyTotalCo2Quantity = this.companySettingsOperationService.prepareDumpingCo2Quantity(this.monthWiseTotalWasteItemQuantity, this.companyTotalCo2Quantity)
                    this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                    this.processingMonthWiseTotalWasteItemQuantity = prepareCo2DataView.monthwiseData;

                    this.processingChartData.data = this.companySettingsOperationService.prepareProcessingWasteforChart(this.processingMonthWiseTotalWasteItemQuantity);

                }

                this.getMonthWiseTransportCompanyData();
            });
        }
        else {
            this.getMonthWiseTransportCompanyData()
        }
    }
    getMonthWiseTransportCompanyData() {
        this.inputForCompanyWasteFetch.companyId = this.utilService.getCompanyIdCookie();
        this.inputForCompanyWasteFetch.fromDate = this.companySettingsOperationService.getCo2TabDate(this.dateForCo2Emission, this.selectedMonth);
        this.inputForCompanyWasteFetch.toDate = this.companySettingsOperationService.getCo2TabDate(this.toSelectedYear, this.toSelectedMonth);
        var toDate: string = this.inputForCompanyWasteFetch.toDate + "010000000";
        var fromDate: string = this.inputForCompanyWasteFetch.fromDate + "010000000";
        this.inputForCompanyWasteFetch.monthRange = this.utilService.getAllMonthsBetweenTwoDate(fromDate, toDate);
        if (this.isTransporterCompany) {
            this.companySettingsOperationService.getMonthWiseVehicleFuelConsumptionInfo(this.inputForCompanyWasteFetch).subscribe(data => {


                if (data) {
                    this.transporterMonthWiseCompanyVehicleFuelConsumption = data;
                    this.transporterMonthWiseCompanyVehicleFuelConsumption = this.companySettingsOperationService.prepareTransporterMonthViewData(this.transporterMonthWiseCompanyVehicleFuelConsumption);
                    var prepareCo2DataView: PrepareVehicleCo2DataView = this.companySettingsOperationService.prepareTransporterCo2Quantity(this.transporterMonthWiseCompanyVehicleFuelConsumption, this.companyTotalCo2Quantity);
                    this.companyTotalCo2Quantity = prepareCo2DataView.totalQuantity;
                    this.transporterMonthWiseCompanyVehicleFuelConsumption = prepareCo2DataView.monthwiseData;

                    this.transporterChartData.data = this.companySettingsOperationService.prepareTransporterWasteforChart(this.transporterMonthWiseCompanyVehicleFuelConsumption);
                }

                this.viewComponent = true;
            });
        }
        else {
            this.viewComponent = true;
        }
    }


    prepareCompanyInfoView(companyInfo: CompanyInfoFetch) {
        companyInfo.zipcodeFormated = this.utilService.prepareZipCodeFormate(companyInfo.zipcode);
        companyInfo.contactNoFormated = this.utilService.prepareContactNoFormate(companyInfo.contactNo);
        companyInfo.companyFaxNumberFormated = this.utilService.prepareFaxNoFormate(companyInfo.companyFaxNumber);
        companyInfo.accountantInfo.contactNoFormated = this.utilService.prepareContactNoFormate(companyInfo.accountantInfo.contactNo);

        if (companyInfo.branchList) {
            companyInfo.branchList.forEach(eachBranch => {
                eachBranch.zipcodeFormated = this.utilService.prepareZipCodeFormate(eachBranch.zipcode);
                eachBranch.branchContactNoFormated = this.utilService.prepareContactNoFormate(eachBranch.branchContactNo);
                eachBranch.branchFAXFormated = this.utilService.prepareContactNoFormate(eachBranch.branchFAX);
            });
        }

        if (companyInfo.vehicleList) {
            companyInfo.vehicleList.forEach(eachVehicle => {
                eachVehicle.zipcodeFormated = this.utilService.prepareZipCodeFormate(eachVehicle.zipcode);
            });
        }

        if (companyInfo.wasteList) {
            companyInfo.wasteList = this.companySettingsOperationService.prepareWasteListForCurrencySign(companyInfo.wasteList);
        }

        return companyInfo;
    }

    public selectTab = (index: number, companyInfo: CompanyInfoFetch): void => {
        this.selectedIndex = index;
        this.selectedCompany = companyInfo;
        this.companyInfo = companyInfo;
        this.prepareCompanyCategory();
        this.getMonthWiseDumperCompanyData();


    }

    selectedIndex = 0;
    indexChange(index: any) {
        this.selectedIndex = index

    }

    addNewCompanyDiolog() {

        const sampleDialog = this.dialog.open(SubscriptionFormComponent, {
            // width: '60%',
            // height: '50%'
            data: {
                isPopup: true
            }
        });

        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }

    addBulkSubscription() {
        const bulkSubscriptionDialog = this.dialog.open(BulkSubscriptionComponent, {
            width: '75%',
            height: '75%'
        });

        bulkSubscriptionDialog.afterClosed().subscribe(closeResponse => {

        })
    }
}

