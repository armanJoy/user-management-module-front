import { Injectable } from '@angular/core';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { AccountantInfo, BankAccountInfo, BranchInfoFetch, CompanyWasteUpdate, CompWasteInfoFetch, ScaleSettingInfo, VehicleInfoFetch, WasteItemDef, WasteRequestInfo, CompanyFilesView, WasteItemSetMethode } from 'src/app/models/backend-fetch/company-settings-fetch';
import { CompanyInfoFetch, DxrWasteInfoFetch } from 'src/app/models/backend-fetch/company-settings-fetch';
import { UserInfoFetch, UserInfoQuery } from 'src/app/models/backend-fetch/user-management-fetch';
import { BranchInfoUpdate, CompanyInfoUpdate, CompanyWasteInfoUpdate, DxrWasteViewDef, DxrWasteViewList, PriceInfoUpdate, VehicleInfoUpdate } from 'src/app/models/backend-update/company-settings-update';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { LanguageService } from '../../visitor-services/language.service';
import { UriService } from '../../visitor-services/uri.service';
import { UtilService } from '../../visitor-services/util.service';
import { DxrWasteItemDef } from 'src/app/models/backend-fetch/waste-def';
import { MonthWiseTotalWasteItemQuantityFetch, InputForCompanyWasteFetch, CompanyTotalCo2QuantityView, PrepareCo2DataView, MonthWiseCompanyVehicleFuelConsumptionFetch, PrepareVehicleCo2DataView, WasteItemForChartView, ProjectWiseWasteItemQuantityFetch, ChartData, CO2Fetch } from 'src/app/models/backend-fetch/carbon-emmition';
import { ChartType } from 'angular-google-charts';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { DataForwardLinkReturn, RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';

@Injectable({
    providedIn: 'root'
})
export class CompanySettingsOperationService {

    constructor(private languageService: LanguageService, private utilService: UtilService, private uriService: UriService) { }

    removeBranch(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-settings/remove-branch";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    public getBankAccountForwardLinks(accountId: string): Observable<DataForwardLinkReturn> {

        var url = '/company-settings/bank-ac-forward-link';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, accountId);
    };

    removeBankAccount(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-settings/remove-bank-account";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    removeScale(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-settings/remove-scale";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    getScaleForwardLinks(scaleInfoId: string): Observable<DataForwardLinkReturn> {
        var url = "/company-settings/scale-forward-link";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, scaleInfoId);
    }

    removeVehicle(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-settings/remove-vehicle";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    getVehicleForwardLinks(scaleInfoId: string): Observable<DataForwardLinkReturn> {
        var url = "/company-settings/vehicle-forward-link";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, scaleInfoId);
    }

    removeCompanyWaste(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/company-settings/remove-company-waste";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    public sendNotification(notificationSetInfo: NotificationSetInfo): Observable<any> {
        var url = '/waste-request-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, notificationSetInfo);
    }


    getMonthWiseVehicleFuelConsumptionInfo(inputForCompanyWasteFetch: InputForCompanyWasteFetch): Observable<MonthWiseCompanyVehicleFuelConsumptionFetch[]> {
        var url = '/carbon/get-transporter-emission-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inputForCompanyWasteFetch);
        // return of(this.monthWiseCompanyVehicleFuelConsumption)
    }

    saveMonthWiseVehicleFuelConsumptionInfo(monthwiseData: MonthWiseCompanyVehicleFuelConsumptionFetch[]): Observable<MonthWiseCompanyVehicleFuelConsumptionFetch> {
        // this.monthWiseCompanyVehicleFuelConsumption = monthwiseData;
        var url = '/carbon/add-transporter-fuel-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, monthwiseData);
        // return of(this.monthWiseCompanyVehicleFuelConsumption);
    }


    getCurrentDate(): Observable<String> {
        var url = '/util/current-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }
    getMonthWiseDumperCompayWasteQuantity(inputForCompanyWasteFetch: InputForCompanyWasteFetch): Observable<MonthWiseTotalWasteItemQuantityFetch> {
        var url = '/carbon/get-dumping-quantity';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inputForCompanyWasteFetch);
        return of(this.monthWiseTotalDumperCompanyWasteItemQuantityFetch)
    }

    getMonthWiseProcessorCompayWasteQuantity(inputForCompanyWasteFetch: InputForCompanyWasteFetch): Observable<CO2Fetch> {
        var url = '/carbon/get-processing-quantity';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inputForCompanyWasteFetch);

    }
    // getWasteItemMethode(wasteId: string): Observable<DxrWasteItemDef> {
    //     return of(this.wasteItemMethode);
    // }
    getCompanyWasteItemCo2EmissionMethode(companyId: string): Observable<WasteItemSetMethode[]> {
        var url = '/company-settings/get-method-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
        return of(this.companyWasteItemSetMethodeList);
    }
    saveCompanyWasteItemCo2EmissionMethode(wasteItemSetMethode: WasteItemSetMethode): Observable<WasteItemSetMethode> {
        var url = '/company-settings/set-method';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteItemSetMethode);
        // return of(wasteItemSetMethode);
    }
    saveCompanyWasteItemCo2EmissionDumpingMethode(wasteItemSetMethode: WasteItemSetMethode): Observable<WasteItemSetMethode> {
        var url = '/company-settings/set-dumping-method';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteItemSetMethode);
        // return of(wasteItemSetMethode);
    }
    saveCompanyWasteItemCo2EmissionProcessingMethode(wasteItemSetMethode: WasteItemSetMethode): Observable<WasteItemSetMethode> {
        var url = '/company-settings/set-processing-method';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, wasteItemSetMethode);
        // return of(wasteItemSetMethode);
    }
    public getCompanyFile(companyId: string): Observable<CompanyFilesView> {
        var url = '/company-settings/company-files';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }
    prepareMonthRange(fromMonth: string, fromYear: string, toMonth: string, toYear: string): string[] {
        var monthRange: string[] = []
        if (fromYear && toYear && fromYear == toYear) {
            var toMonthNumber: number = parseInt(toMonth, 10);
            var fromMonthNumber: number = parseInt(fromMonth, 10);
            for (var i = fromMonthNumber; i <= toMonthNumber; i++) {

            }
        }
        return monthRange;
    }
    prepareWasteListForCurrencySign(updatedCompanyWasteList: CompWasteInfoFetch[]) {

        if (updatedCompanyWasteList) {
            updatedCompanyWasteList.forEach(wasteCategory => {
                if (wasteCategory.dxrWasteTypeDef) {
                    wasteCategory.dxrWasteTypeDef.forEach((element) => {
                        if (element.dxrWasteItemDef) {
                            element.dxrWasteItemDef.forEach(item => {
                                item.transportPriceFormated = this.utilService.prepareCurrencySign(item.transportPrice);
                                item.processingPriceFormated = this.utilService.prepareCurrencySign(item.processingPrice);
                            })
                        }
                    })
                }
            });
        }
        return updatedCompanyWasteList;
    }

    public getUserInfoByUserIdentificationAndCompanyId(data: UserInfoQuery): Observable<UserInfoFetch> {
        var url = '/company-user/user-profile';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, data);
    }


    public getCompanyInfo(companyId: String): Observable<CompanyInfoFetch> {

        var url = '/company-settings/company-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    };

    getCo2TabDate(dateForCo2Emission: string, selectedMonth: string): string {
        var langIndex = this.utilService.getSelectedLanguageIndex();
        var mothCheckArray: string[] = [];
        if (langIndex == AppConstant.LANG_INDEX_JPN) {
            mothCheckArray = AppConstant.MONTH_JPN;
        } else {
            mothCheckArray = AppConstant.MONTH;
        }

        var index = mothCheckArray.findIndex(item => item == selectedMonth);
        index++;
        if (index < 10) {

            dateForCo2Emission += "0";
            dateForCo2Emission += index;
        }
        else {
            dateForCo2Emission += index;
        }
        return dateForCo2Emission;
    }
    prepareTransporterMonthViewData(monthWiseTransportCompanyData: MonthWiseCompanyVehicleFuelConsumptionFetch[]): MonthWiseCompanyVehicleFuelConsumptionFetch[] {
        monthWiseTransportCompanyData.forEach(item => {
            item.year = "";
            var month: string = ""
            for (var i = 0; i < item.date.length; i++) {
                if (i < 4) {
                    item.year += item.date[i];
                }
                else {
                    month += item.date[i];

                }

            }
            var monthDigit: number = parseInt(month, 10);
            item.month = AppConstant.MONTH[monthDigit - 1];

        });
        return monthWiseTransportCompanyData;

    }
    prepareDumpingCo2Quantity(monthWiseTotalWasteItemQuantityFetch: MonthWiseTotalWasteItemQuantityFetch, companyTotalCo2Quantity: CompanyTotalCo2QuantityView): PrepareCo2DataView {
        var prepareCo2DataView: PrepareCo2DataView = {
            monthwiseData: monthWiseTotalWasteItemQuantityFetch,
            totalQuantity: companyTotalCo2Quantity
        }
        var quantity: number = 0;

        if (prepareCo2DataView.monthwiseData && prepareCo2DataView.monthwiseData.wasteItem) {
            prepareCo2DataView.monthwiseData.wasteItem.forEach(element => {
                element.dumperCo2CalculatedQuantity = element.totalQuantity * element.methodeInfo.emissionQuantityPerUnit;
                quantity += element.dumperCo2CalculatedQuantity;
            });
        }
        prepareCo2DataView.totalQuantity.dumperCo2Quantity = quantity;
        prepareCo2DataView.totalQuantity.totalCo2Quantity = companyTotalCo2Quantity.dumperCo2Quantity + companyTotalCo2Quantity.processorCo2Quantity + companyTotalCo2Quantity.transPorterCo2Quantity;
        return prepareCo2DataView;




        // monthWiseTotalWasteItemQuantityFetch.wasteItem.forEach(element => {
        //     element.processCo2CalculatedQuantity = element.totalQuantity * element.dumpingMthodeInfo.emissionQuantityPerUnit;
        //     quantity += element.processCo2CalculatedQuantity;
        // });
        // companyTotalCo2Quantity.dumperCo2Quantity = quantity;
        // companyTotalCo2Quantity.totalCo2Quantity = companyTotalCo2Quantity.dumperCo2Quantity + companyTotalCo2Quantity.processorCo2Quantity + companyTotalCo2Quantity.transPorterCo2Quantity;
        // return prepareCo2DataView;
    }
    prepareProcessingCo2Quantity(monthWiseTotalWasteItemQuantityFetch: MonthWiseTotalWasteItemQuantityFetch, companyTotalCo2Quantity: CompanyTotalCo2QuantityView): PrepareCo2DataView {
        var prepareCo2DataView: PrepareCo2DataView = {
            monthwiseData: monthWiseTotalWasteItemQuantityFetch,
            totalQuantity: companyTotalCo2Quantity
        }
        var quantity: number = 0;

        if (prepareCo2DataView.monthwiseData && prepareCo2DataView.monthwiseData.wasteItem) {
            prepareCo2DataView.monthwiseData.wasteItem.forEach(element => {
                if (element && element.methodeInfo && element.methodeInfo.emissionQuantityPerUnit) {
                    element.processCo2CalculatedQuantity = element.totalQuantity * element.methodeInfo.emissionQuantityPerUnit;
                    quantity += element.processCo2CalculatedQuantity;
                }
            });
        }
        prepareCo2DataView.totalQuantity.processorCo2Quantity = quantity;
        prepareCo2DataView.totalQuantity.totalCo2Quantity = companyTotalCo2Quantity.dumperCo2Quantity + companyTotalCo2Quantity.processorCo2Quantity + companyTotalCo2Quantity.transPorterCo2Quantity;
        return prepareCo2DataView;
    }
    prepareTransporterCo2Quantity(monthWiseTransportCompanyData: MonthWiseCompanyVehicleFuelConsumptionFetch[], companyTotalCo2Quantity: CompanyTotalCo2QuantityView): PrepareVehicleCo2DataView {
        var prepareVehicleCo2DataView: PrepareVehicleCo2DataView = {
            monthwiseData: monthWiseTransportCompanyData,
            totalQuantity: companyTotalCo2Quantity
        }

        prepareVehicleCo2DataView.monthwiseData.forEach(item => {
            var quantity: number = 0;
            item.monthWiseCo2Quantity = 0;
            item.vehicleFuelConsumptionInfo.forEach(companyVehicle => {
                companyVehicle.co2perUnit = companyVehicle.gasolineInfo.co2EmissionUnit / companyVehicle.gasolineInfo.co2FuelUnit;
                companyVehicle.calculatedCo2Emission = companyVehicle.co2perUnit * companyVehicle.fuelConsumption;
                quantity += companyVehicle.calculatedCo2Emission;
            });
            item.monthWiseCo2Quantity = quantity;

        });
        // prepareVehicleCo2DataView.monthwiseData.vehicleFuelConsumptionInfo.forEach(companyVehicle => {
        //     companyVehicle.co2perUnit = companyVehicle.gasolineInfo.co2EmissionUnit / companyVehicle.gasolineInfo.co2FuelUnit;
        //     companyVehicle.calculatedCo2Emission = companyVehicle.co2perUnit * companyVehicle.fuelConsumption;
        //     quantity += companyVehicle.calculatedCo2Emission
        // });

        prepareVehicleCo2DataView.totalQuantity.transPorterCo2Quantity = 0;
        prepareVehicleCo2DataView.monthwiseData.forEach(item => {
            prepareVehicleCo2DataView.totalQuantity.transPorterCo2Quantity += item.monthWiseCo2Quantity;
        });
        prepareVehicleCo2DataView.totalQuantity.totalCo2Quantity = companyTotalCo2Quantity.dumperCo2Quantity + companyTotalCo2Quantity.processorCo2Quantity + companyTotalCo2Quantity.transPorterCo2Quantity;
        return prepareVehicleCo2DataView;
    }
    prepareProjectWiseProcessQuantity(projectWiseCO2EmissionList: ProjectWiseWasteItemQuantityFetch[]): ProjectWiseWasteItemQuantityFetch[] {
        projectWiseCO2EmissionList.forEach(projectWiseEmission => {
            var processingChartData: ChartData = {
                type: ChartType.Bar,
                data: [
                    ["No Waste Data Available", 0]
                ],
                chartColumns: ["Waste", "gm"],
                width: 1000,
                height: 400
            }


            projectWiseEmission.projectChart = processingChartData;
            projectWiseEmission.projectTranportChart = this.prepareProjectWiseTransporterChart(projectWiseEmission);
            // 
            projectWiseEmission.processTotalQuantity = 0;
            projectWiseEmission.transportTotalQuantiy = 0;
            projectWiseEmission.projectInfo.projectStartDate = projectWiseEmission.projectInfo.projectStartDate.toString().substring(0, 10) + "   ";
            projectWiseEmission.projectInfo.projectEndDate = projectWiseEmission.projectInfo.projectEndDate.toString().substring(0, 10);
            projectWiseEmission.projectInfo.projectCreationDate = projectWiseEmission.projectInfo.projectCreationDate.toString().substring(0, 10);

            projectWiseEmission.wasteItemList.forEach(wasteItem => {
                wasteItem.processCo2CalculatedQuantity = wasteItem.totalQuantity * wasteItem.methodeInfo.emissionQuantityPerUnit;
                projectWiseEmission.processTotalQuantity += wasteItem.processCo2CalculatedQuantity;
            });
            projectWiseEmission.dumperCo2Emission = projectWiseEmission.transporterCo2Emission + projectWiseEmission.processTotalQuantity;
            projectWiseEmission.projectChart.data = this.prepareProjectWiseProcessingWasteforChart(projectWiseEmission);
        });
        return projectWiseCO2EmissionList;
    }
    prepareProjectWiseTransporterChart(projectWiseEmission: ProjectWiseWasteItemQuantityFetch): ChartData {

        var transportChartData: ChartData = {
            type: ChartType.Bar,
            data: [

            ],
            chartColumns: ["Project", "gm"],
            width: 1000,
            height: 400
        }

        if (!projectWiseEmission || projectWiseEmission.transporterCo2Emission <= 0) {

            transportChartData.data.push(["No Waste Data Available", 0]);

        } else {
            var wasteItemForChartView = [projectWiseEmission.projectInfo.projectTitle, projectWiseEmission.transporterCo2Emission];
            transportChartData.data.push(wasteItemForChartView);
        }


        while (transportChartData.data.length < 6) {
            var wasteItemForChartView = [" ", 0];
            transportChartData.data.push(wasteItemForChartView);
        }
        return transportChartData;
    }

    monthWiseTotalDumperCompanyWasteItemQuantityFetch: MonthWiseTotalWasteItemQuantityFetch = {
        companyId: "companyId001",
        startMonth: "02",
        startYear: "2022",
        endMonth: "",
        endYear: "",
        wasteItem: [
            {
                wasteId: "wasteId001",
                wasteItemName: "waste 01",
                unit: "Ton",
                totalQuantity: 20,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,
                methodeInfo: {
                    methodeId: "methodeId002",
                    methodeTitle: "Dumper Methode 01",
                    description: "",
                    emissionQuantityPerUnit: 0.09,
                    emimissionType: {
                        emimissionTypeId: AppConstant.DUMPER_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Dumper Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                },
                // processingMethodeInfo: {
                //     methodeId: "methodeId001",
                //     methodeTitle: "Process Methode 01",
                //     description: "",
                //     emissionQuantityPerUnit: 0.09,
                //     emimissionType: {
                //         emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                //         emimissionTypeName: "Processor Methode",

                //     },
                //     co2EmissionVolume: 0,
                //     isDefault: false,
                //     isCheck: false
                // }
            },
            {
                wasteId: "wasteId002",
                wasteItemName: "waste 02",
                unit: "Ton",
                totalQuantity: 30,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,
                methodeInfo: {
                    methodeId: "methodeId003",
                    methodeTitle: "Dumper Methode 03",
                    description: "",
                    emissionQuantityPerUnit: 0.20,
                    emimissionType: {
                        emimissionTypeId: AppConstant.DUMPER_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Dumper Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                },
                // processingMethodeInfo: {
                //     methodeId: "methodeId004",
                //     methodeTitle: "Process Methode 04",
                //     description: "",
                //     emissionQuantityPerUnit: 0.15,
                //     emimissionType: {
                //         emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                //         emimissionTypeName: "Process Methode",

                //     },
                //     co2EmissionVolume: 0,
                //     isDefault: false,
                //     isCheck: false
                // }
            },
            {
                wasteId: "wasteId003",
                wasteItemName: "waste 03",
                unit: "Ton",
                totalQuantity: 70,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,
                methodeInfo: {
                    methodeId: "methodeId003",
                    methodeTitle: "Dumper Methode 03",
                    description: "",
                    emissionQuantityPerUnit: 0.20,
                    emimissionType: {
                        emimissionTypeId: AppConstant.DUMPER_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Dumper Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                },
                // processingMethodeInfo: {
                //     methodeId: "methodeId004",
                //     methodeTitle: "Process Methode 04",
                //     description: "",
                //     emissionQuantityPerUnit: 0.15,
                //     emimissionType: {
                //         emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                //         emimissionTypeName: "Process Methode",

                //     },
                //     co2EmissionVolume: 0,
                //     isDefault: false,
                //     isCheck: false
                // }
            }
        ]
    }
    monthWiseTotalProcessorCompanyWasteItemQuantityFetch: MonthWiseTotalWasteItemQuantityFetch = {
        companyId: "companyId001",
        startMonth: "02",
        startYear: "2022",
        endMonth: "",
        endYear: "",
        wasteItem: [
            {
                wasteId: "wasteId001",
                wasteItemName: "waste 01",
                unit: "Ton",
                totalQuantity: 20,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,

                methodeInfo: {
                    methodeId: "methodeId001",
                    methodeTitle: "Process Methode 01",
                    description: "",
                    emissionQuantityPerUnit: 0.09,
                    emimissionType: {
                        emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Processor Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                }
            },
            {
                wasteId: "wasteId002",
                wasteItemName: "waste 02",
                unit: "Ton",
                totalQuantity: 30,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,

                methodeInfo: {
                    methodeId: "methodeId004",
                    methodeTitle: "Process Methode 04",
                    description: "",
                    emissionQuantityPerUnit: 0.15,
                    emimissionType: {
                        emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Process Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                }
            },
            {
                wasteId: "wasteId003",
                wasteItemName: "waste 03",
                unit: "Ton",
                totalQuantity: 70,
                processCo2CalculatedQuantity: 0,
                dumperCo2CalculatedQuantity: 0,

                methodeInfo: {
                    methodeId: "methodeId004",
                    methodeTitle: "Process Methode 04",
                    description: "",
                    emissionQuantityPerUnit: 0.15,
                    emimissionType: {
                        emimissionTypeId: AppConstant.PROCESSING_EMISSION_TYPE_METHODE_ID,
                        emimissionTypeName: "Process Methode",

                    },
                    co2EmissionVolume: 0,
                    isDefault: false,
                    isCheck: false
                }
            }
        ]
    }





    companyWasteItemSetMethodeList: WasteItemSetMethode[] = [];



    public getDxrWasteInfo(): Observable<DxrWasteInfoFetch[]> {
        // return of(this.dxrWasteInfoList)
        var url = '/company-settings/dxr-waste-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    };




    public saveUpdatedCompanyInfo(company: CompanyInfoUpdate): Observable<CompanyInfoUpdate> {

        var url = '/company-settings/update-company-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, company);
    };



    public addBranchInfo(branch: BranchInfoFetch): Observable<BranchInfoFetch> {

        var url = '/company-settings/add-branch-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, branch);
    };


    public updateAccountantInfo(accountant: AccountantInfo): Observable<AccountantInfo> {

        var url = '/company-settings/add-company-accountant';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, accountant);

    };


    public addBankAccountInfo(account: BankAccountInfo): Observable<BankAccountInfo> {

        var url = '/company-settings/add-bank-account';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, account);
    };


    public addVehicleInfo(vehicle: VehicleInfoFetch): Observable<VehicleInfoFetch> {
        var url = '/company-settings/add-vehicle-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, vehicle);

    };

    public getVehicleInfoList(companyId: String, pageNo: number, searchText: string): Observable<VehicleInfoFetch[]> {
        var url = '/company-settings/vehicle-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText);

    };

    public updateBasePriceInfo(price: WasteItemDef): Observable<WasteItemDef> {
        // return of(price)
        var url = '/company-settings/add-base-price';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, price);

    };



    public updateCompanyWasteInfo(waste: CompanyWasteUpdate): Observable<CompanyWasteUpdate> {

        var url = '/company-settings/add-company-waste-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, waste);
    };

    prepareDumpingWasteforChart(dumpingData: MonthWiseTotalWasteItemQuantityFetch): any[] {

        var wasteItemForChartViewlist: any[] = []
        if (dumpingData && dumpingData.wasteItem)
            dumpingData.wasteItem.forEach((item) => {
                if (item) {
                    var wasteItemForChartView = [item.wasteItemName, item.dumperCo2CalculatedQuantity]
                    wasteItemForChartViewlist.push(wasteItemForChartView);
                }

            })
        if (wasteItemForChartViewlist.length == 0) {
            var wasteItemForChartView = ["No Waste Data Available", 0]
            wasteItemForChartViewlist.push(wasteItemForChartView)
        }
        return wasteItemForChartViewlist;
    }
    prepareProjectWiseProcessingWasteforChart(processingData: ProjectWiseWasteItemQuantityFetch): any[] {

        var wasteItemForChartViewlist: any[] = []
        if (processingData && processingData.wasteItemList)
            processingData.wasteItemList.forEach((item) => {
                if (item) {
                    var wasteItemForChartView = [item.wasteItemName, item.processCo2CalculatedQuantity]
                    wasteItemForChartViewlist.push(wasteItemForChartView);
                }

            })
        if (wasteItemForChartViewlist.length == 0) {
            var wasteItemForChartView = ["No Waste Data Available", 0]
            wasteItemForChartViewlist.push(wasteItemForChartView)
        }
        while (wasteItemForChartViewlist.length < 6) {
            var wasteItemForChartView = [" ", 0];
            wasteItemForChartViewlist.push(wasteItemForChartView);
        }
        return wasteItemForChartViewlist;
    }

    prepareProcessingWasteforChart(processingData: MonthWiseTotalWasteItemQuantityFetch): any[] {

        var wasteItemForChartViewlist: any[] = []
        if (processingData && processingData.wasteItem)
            processingData.wasteItem.forEach((item) => {
                if (item) {
                    var wasteItemForChartView = [item.wasteItemName, item.processCo2CalculatedQuantity]
                    wasteItemForChartViewlist.push(wasteItemForChartView);
                }

            })
        if (wasteItemForChartViewlist.length == 0) {
            var wasteItemForChartView = ["No Waste Data Available", 0]
            wasteItemForChartViewlist.push(wasteItemForChartView)
        }
        while (wasteItemForChartViewlist.length < 6) {
            var wasteItemForChartView = [" ", 0];
            wasteItemForChartViewlist.push(wasteItemForChartView);
        }
        return wasteItemForChartViewlist;
    }

    prepareTransporterWasteforChart(paramTransporterData: MonthWiseCompanyVehicleFuelConsumptionFetch[]): any[] {

        var transporterData: MonthWiseCompanyVehicleFuelConsumptionFetch[] = JSON.parse(JSON.stringify(paramTransporterData))
        var wasteItemForChartViewlist: any[] = [];
        // for (var i = 0; i < transporterData[0].vehicleFuelConsumptionInfo.length; i++)
        // {
        for (var j = 1; j < transporterData.length; j++) {
            for (var k = 0; k < transporterData[j].vehicleFuelConsumptionInfo.length; k++) {
                transporterData[0].vehicleFuelConsumptionInfo[k].calculatedCo2Emission += transporterData[j].vehicleFuelConsumptionInfo[k].calculatedCo2Emission;
            }
        }
        // }

        if (transporterData) {
            transporterData[0].vehicleFuelConsumptionInfo.forEach((item) => {
                if (item) {
                    var wasteItemForChartView = [item.vehicleName, item.calculatedCo2Emission]
                    wasteItemForChartViewlist.push([item.vehicleName, item.calculatedCo2Emission]);
                }
            })
        }
        if (wasteItemForChartViewlist.length == 0) {
            var wasteItemForChartView = ["No Vehicle Data Available", 0]
            wasteItemForChartViewlist.push(wasteItemForChartView)
        }
        while (wasteItemForChartViewlist.length < 6) {
            var wasteItemForChartView = [" ", 0];
            wasteItemForChartViewlist.push(wasteItemForChartView);
        }
        return wasteItemForChartViewlist;
    }


    public updateScaleInfo(scale: ScaleSettingInfo): Observable<ScaleSettingInfo> {
        // this.saveScaleSettingInfo(scale);
        // return of(scale);
        var url = '/company-settings/update-scale-setting-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, scale);

    };



    public addWasteRequestInfo(newWaste: WasteRequestInfo): Observable<WasteRequestInfo> {
        // this.wasteRequestInfoList.unshift(newWaste);
        // return of(newWaste);
        var url = '/company-settings/add-new-waste-request';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newWaste);

    }

    // public getWasteRequestInfoList(): Observable<WasteRequestInfo[]> {
    //     return of(this.wasteRequestInfoList);
    // };

    getZipCodeInformation(zipCode: string): Observable<any> {
        var url = '/util/zip';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, zipCode);
    }

    public companyInfoFormValidator = (data: CompanyInfoUpdate) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_INFO_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.companyInfoValidatorRepository.companyNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.companyNameValidator.controlId,
                controlName: this.companyInfoValidatorRepository.companyNameValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.companyNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.companyName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.companyNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.companyAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.companyAddressValidator.controlId,
                controlName: this.companyInfoValidatorRepository.companyAddressValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.companyAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.companyAddress)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.companyAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.companyZipCodeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.companyZipCodeValidator.controlId,
                controlName: this.companyInfoValidatorRepository.companyZipCodeValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.companyZipCodeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.zipcode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.companyZipCodeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.representativeEmailAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.representativeEmailAddressValidator.controlId,
                controlName: this.companyInfoValidatorRepository.representativeEmailAddressValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.representativeEmailAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.representativEmail)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.representativeEmailAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.contactNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.contactNoValidator.controlId,
                controlName: this.companyInfoValidatorRepository.contactNoValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.contactNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.contactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.contactNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.faxNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.faxNoValidator.controlId,
                controlName: this.companyInfoValidatorRepository.faxNoValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.faxNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.companyFaxNumber)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.faxNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.lisenceNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.lisenceNoValidator.controlId,
                controlName: this.companyInfoValidatorRepository.lisenceNoValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.lisenceNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.wasteProcessingLicenseNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.lisenceNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.companyInfoValidatorRepository.businessTypeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.companyInfoValidatorRepository.businessTypeValidator.controlId,
                controlName: this.companyInfoValidatorRepository.businessTypeValidator[controlName],
                validations: []
            }
            this.companyInfoValidatorRepository.businessTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string[]) => any; }) => {
                if (!eachValidation.function(data.companyBusinessCategory)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.companyInfoValidatorRepository.businessTypeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);

        }


        return validationReport;
    }

    companyInfoValidatorRepository: any = {

        companyNameValidator: {
            controlId: 'companyNameValidator',
            controlNameEng: 'Company Name',
            controlNameJpn: '会社名',
            validators: [
                {
                    function: (companyName: String) => {
                        return (companyName && companyName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Company Name.',
                    invalidMsgJpn: '会社名を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        companyAddressValidator: {
            controlId: 'companyAddressValidator',
            controlNameEng: 'Company Address',
            controlNameJpn: '会社名が必要です。',
            validators: [
                {
                    function: (companyAddress: String) => {
                        return (companyAddress && companyAddress.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Address.',
                    invalidMsgJpn: '会社住所を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        companyZipCodeValidator: {
            controlId: 'companyZipCodeValidator',
            controlNameEng: 'Zip Code',
            controlNameJpn: '〒',
            validators: [
                {
                    function: (zipCode: String) => {
                        return (zipCode && zipCode.length > 0 && zipCode.length == 7) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the zip Code.',
                    invalidMsgJpn: '郵便番号を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        representativeEmailAddressValidator: {
            controlId: 'representativeEmailAddressValidator',
            controlNameEng: 'Representative Email',
            controlNameJpn: 'メールアドレス',
            validators: [
                {
                    function: (emailAddress: String) => {
                        var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
                        return this.utilService.checkRegex(mailFormatCheckRegex, emailAddress);
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter valid email address.',
                    invalidMsgJpn: '有効なメールアドレスを入力してください。',
                    sampleValueEng: 'example@mangrovesystemsbd.com',
                    sampleValueJpn: 'example@mangrovesystemsbd.com'
                }
            ]
        },


        contactNoValidator: {
            controlId: 'contactNoValidator',
            controlNameEng: 'Contact No',
            controlNameJpn: '電話番号(任意)',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Telephone number.',
                    invalidMsgJpn: '電話番号を空にすることはできません。',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },
        faxNoValidator: {
            controlId: 'faxNoValidator',
            controlNameEng: 'FAX',
            controlNameJpn: 'FAX番号',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Fax number',
                    invalidMsgJpn: 'You cannot empty the Fax number',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        lisenceNoValidator: {
            controlId: 'lisenceNoValidator',
            controlNameEng: 'Processing License No',
            controlNameJpn: '廃棄物許可証番号',
            validators: [
                {
                    function: (lisence: String) => {
                        return (lisence && lisence.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'you need to fill up the Waste processing License no',
                    invalidMsgJpn: 'you need to fill up the Waste processing License no',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        businessTypeValidator: {
            controlId: 'businessTypeValidator',
            controlNameEng: 'Business Type',
            controlNameJpn: '事業内容',
            validators: [
                {
                    function: (companyCatgory: String[]) => {
                        return (companyCatgory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to select business type at least one type',
                    invalidMsgJpn: '少なくとも1つのタイプの業種を選択する必要があります。',
                    sampleValueEng: 'Dumper',
                    sampleValueJpn: 'Dumper',

                }
            ]
        },


    };


    public accountantInfoFormValidator = (data: AccountantInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.ACCOUNT_INFO_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.accountantInfoValidatorRepository.accountantEmailAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.accountantInfoValidatorRepository.accountantEmailAddressValidator.controlId,
                controlName: this.accountantInfoValidatorRepository.accountantEmailAddressValidator[controlName],
                validations: []
            }
            this.accountantInfoValidatorRepository.accountantEmailAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.accountantEmail)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.accountantInfoValidatorRepository.accountantEmailAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.accountantInfoValidatorRepository.closingDateValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.accountantInfoValidatorRepository.closingDateValidator.controlId,
                controlName: this.accountantInfoValidatorRepository.closingDateValidator[controlName],
                validations: []
            }
            this.accountantInfoValidatorRepository.closingDateValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.invoiceClosingDate)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.accountantInfoValidatorRepository.closingDateValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.accountantInfoValidatorRepository.paymentDateValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.accountantInfoValidatorRepository.paymentDateValidator.controlId,
                controlName: this.accountantInfoValidatorRepository.paymentDateValidator[controlName],
                validations: []
            }
            this.accountantInfoValidatorRepository.paymentDateValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.invoicePaymentDate)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.accountantInfoValidatorRepository.paymentDateValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.accountantInfoValidatorRepository.paymentModeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.accountantInfoValidatorRepository.paymentModeValidator.controlId,
                controlName: this.accountantInfoValidatorRepository.paymentModeValidator[controlName],
                validations: []
            }
            this.accountantInfoValidatorRepository.paymentModeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string[]) => any; }) => {
                if (!eachValidation.function(data.paymentMode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.accountantInfoValidatorRepository.paymentModeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    accountantInfoValidatorRepository: any = {

        accountantEmailAddressValidator: {
            controlId: 'accountantEmailAddressValidator',
            controlNameEng: 'Accountant Email',
            controlNameJpn: 'メールアドレス',
            validators: [
                {
                    function: (emailAddress: String) => {
                        var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
                        return this.utilService.checkRegex(mailFormatCheckRegex, emailAddress);
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter valid email address.',
                    invalidMsgJpn: '有効なメールアドレスを入力してください。',
                    sampleValueEng: 'example@mangrovesystemsbd.com',
                    sampleValueJpn: 'example@mangrovesystemsbd.com'
                }
            ]
        },

        closingDateValidator: {
            controlId: 'closingDateValidator',
            controlNameEng: 'Invoice Closing Date',
            controlNameJpn: '請求書締切日',
            validators: [
                {
                    function: (closeingDate: String) => {
                        var langIndex = this.languageService.getSelectedLanguageIndex();
                        if (langIndex == AppConstant.LANG_INDEX_ENG) {
                            return (closeingDate && closeingDate.length >= 8) ? true : false;
                        }
                        else if (langIndex == AppConstant.LANG_INDEX_JPN) {
                            return (closeingDate && closeingDate.length >= 6) ? true : false;
                        }
                        return false
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Invoice Closing Date.',
                    invalidMsgJpn: 'You cannot empty Invoice Closing Date.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        paymentDateValidator: {
            controlId: 'paymentDateValidator',
            controlNameEng: 'Invoice Payment Date',
            controlNameJpn: 'お支払期限',
            validators: [
                {
                    function: (paymentDate: String) => {
                        var langIndex = this.languageService.getSelectedLanguageIndex();
                        if (langIndex == AppConstant.LANG_INDEX_ENG) {
                            return (paymentDate && paymentDate.length >= 8) ? true : false;
                        }
                        else if (langIndex == AppConstant.LANG_INDEX_JPN) {
                            return (paymentDate && paymentDate.length >= 6) ? true : false;
                        }
                        return false
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Invoice Payment Date.',
                    invalidMsgJpn: 'You cannot empty Invoice Payment Date.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        paymentModeValidator: {
            controlId: 'paymentModeValidator',
            controlNameEng: 'Payment Method',
            controlNameJpn: '支払方法',
            validators: [
                {
                    function: (paymentMode: String[]) => {
                        return (paymentMode.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to select at least one payment method.',
                    invalidMsgJpn: 'You need to select at least one payment method.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },


    };

    public bankInfoFormValidator = (data: BankAccountInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.BANK_AACOUNT_INFO_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.bankAccountInfoValidatorRepository.BankNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.bankAccountInfoValidatorRepository.BankNameValidator.controlId,
                controlName: this.bankAccountInfoValidatorRepository.BankNameValidator[controlName],
                validations: []
            }
            this.bankAccountInfoValidatorRepository.BankNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.bankName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.bankAccountInfoValidatorRepository.BankNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.bankAccountInfoValidatorRepository.branchNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.bankAccountInfoValidatorRepository.branchNameValidator.controlId,
                controlName: this.bankAccountInfoValidatorRepository.branchNameValidator[controlName],
                validations: []
            }
            this.bankAccountInfoValidatorRepository.branchNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.branchName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.bankAccountInfoValidatorRepository.branchNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.bankAccountInfoValidatorRepository.accountsNumberValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.bankAccountInfoValidatorRepository.accountsNumberValidator.controlId,
                controlName: this.bankAccountInfoValidatorRepository.accountsNumberValidator[controlName],
                validations: []
            }
            this.bankAccountInfoValidatorRepository.accountsNumberValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.accountNumber)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.bankAccountInfoValidatorRepository.accountsNumberValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.bankAccountInfoValidatorRepository.accountsNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.bankAccountInfoValidatorRepository.accountsNameValidator.controlId,
                controlName: this.bankAccountInfoValidatorRepository.accountsNameValidator[controlName],
                validations: []
            }
            this.bankAccountInfoValidatorRepository.accountsNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.accountName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.bankAccountInfoValidatorRepository.accountsNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        return validationReport;
    }

    bankAccountInfoValidatorRepository: any = {

        BankNameValidator: {
            controlId: 'BankNameValidator',
            controlNameEng: 'Bank Name',
            controlNameJpn: '銀行',
            validators: [
                {
                    function: (bankName: String) => {
                        return (bankName && bankName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Bank Name.',
                    invalidMsgJpn: 'You cannot empty the Bank Name.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        branchNameValidator: {
            controlId: 'branchNameValidator',
            controlNameEng: 'Branch Name',
            controlNameJpn: '支店',
            validators: [
                {
                    function: (branchName: String) => {
                        return (branchName && branchName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Branch Name.',
                    invalidMsgJpn: 'You cannot empty the Branch Name.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        accountsNumberValidator: {
            controlId: 'accountsNumberValidator',
            controlNameEng: 'Branch Name',
            controlNameJpn: '支店',
            validators: [
                {
                    function: (accountsNumber: String) => {
                        return (accountsNumber && accountsNumber.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Accounts Number.',
                    invalidMsgJpn: 'You cannot empty the Accounts Number.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        accountsNameValidator: {
            controlId: 'accountsNameValidator',
            controlNameEng: 'Bank Name',
            controlNameJpn: '銀行',
            validators: [
                {
                    function: (accountsName: String) => {
                        return (accountsName && accountsName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Accounts Name.',
                    invalidMsgJpn: 'You cannot empty the Accounts Name.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
    };


    public branchInfoFormValidator = (data: BranchInfoFetch) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.BRANCH_INFO_ADD_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.branchInfoValidatorRepository.branchNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.branchNameValidator.controlId,
                controlName: this.branchInfoValidatorRepository.branchNameValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.branchNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.branchName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.branchNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.branchInfoValidatorRepository.branchAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.branchAddressValidator.controlId,
                controlName: this.branchInfoValidatorRepository.branchAddressValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.branchAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.branchAddress)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.branchAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.branchInfoValidatorRepository.branchZipCodeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.branchZipCodeValidator.controlId,
                controlName: this.branchInfoValidatorRepository.branchZipCodeValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.branchZipCodeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.zipcode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.branchZipCodeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        if (this.branchInfoValidatorRepository.contactNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.contactNoValidator.controlId,
                controlName: this.branchInfoValidatorRepository.contactNoValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.contactNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.branchContactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.contactNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.branchInfoValidatorRepository.faxNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.faxNoValidator.controlId,
                controlName: this.branchInfoValidatorRepository.faxNoValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.faxNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.branchFAX)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.faxNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.branchInfoValidatorRepository.businessTypeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.branchInfoValidatorRepository.businessTypeValidator.controlId,
                controlName: this.branchInfoValidatorRepository.businessTypeValidator[controlName],
                validations: []
            }
            this.branchInfoValidatorRepository.businessTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string[]) => any; }) => {
                if (!eachValidation.function(data.branchBusinessCategory)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.branchInfoValidatorRepository.businessTypeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);

        }


        return validationReport;
    }

    branchInfoValidatorRepository: any = {

        branchNameValidator: {
            controlId: 'branchNameValidator',
            controlNameEng: 'Branch Name',
            controlNameJpn: '事業所名',
            validators: [
                {
                    function: (branchName: String) => {
                        return (branchName && branchName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the branch name.',
                    invalidMsgJpn: '事業所名を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        branchAddressValidator: {
            controlId: 'branchAddressValidator',
            controlNameEng: 'Branch Adddress',
            controlNameJpn: '会社住所',
            validators: [
                {
                    function: (branchAddress: String) => {
                        return (branchAddress && branchAddress.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Address.',
                    invalidMsgJpn: '会社住所を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        branchZipCodeValidator: {
            controlId: 'branchZipCodeValidator',
            controlNameEng: 'Zip Code',
            controlNameJpn: '〒',
            validators: [
                {
                    function: (zipCode: String) => {
                        return (zipCode && zipCode.length > 0 && zipCode.length == 7) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the zip Code.',
                    invalidMsgJpn: '郵便番号を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        contactNoValidator: {
            controlId: 'contactNoValidator',
            controlNameEng: 'Contact No',
            controlNameJpn: '電話番号',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Telephone number.',
                    invalidMsgJpn: '電話番号を空にすることはできません。',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        faxNoValidator: {
            controlId: 'faxNoValidator',
            controlNameEng: 'FAX',
            controlNameJpn: 'FAX番号',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Fax number',
                    invalidMsgJpn: 'You cannot empty the Fax number',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },


        businessTypeValidator: {
            controlId: 'businessTypeValidator',
            controlNameEng: 'Business Type',
            controlNameJpn: '事業内容',
            validators: [
                {
                    function: (companyCatgory: String[]) => {
                        return (companyCatgory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You can not Empty the branch business type.',
                    invalidMsgJpn: '事業所名の事業区分を空にすることはできません。',
                    sampleValueEng: 'Dumper',
                    sampleValueJpn: 'Dumper',

                }
            ]
        },


    };


    public vehicleInfoFormValidator = (data: VehicleInfoFetch) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.VEHICLE_INFO_ADD_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.vehicleInfoValidatorRepository.vehicleAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.vehicleInfoValidatorRepository.vehicleAddressValidator.controlId,
                controlName: this.vehicleInfoValidatorRepository.vehicleAddressValidator[controlName],
                validations: []
            }
            this.vehicleInfoValidatorRepository.vehicleAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.officeAddress)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.vehicleInfoValidatorRepository.vehicleAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.vehicleInfoValidatorRepository.vehicleZipCodeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.vehicleInfoValidatorRepository.vehicleZipCodeValidator.controlId,
                controlName: this.vehicleInfoValidatorRepository.vehicleZipCodeValidator[controlName],
                validations: []
            }
            this.vehicleInfoValidatorRepository.vehicleZipCodeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.zipcode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.vehicleInfoValidatorRepository.vehicleZipCodeValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        if (this.vehicleInfoValidatorRepository.vehicleNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.vehicleInfoValidatorRepository.vehicleNoValidator.controlId,
                controlName: this.vehicleInfoValidatorRepository.vehicleNoValidator[controlName],
                validations: []
            }
            this.vehicleInfoValidatorRepository.vehicleNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.vehicleRegNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.vehicleInfoValidatorRepository.vehicleNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        // if (this.vehicleInfoValidatorRepository.gasolineTypeValidator.validators) {

        //     var controlValidation: ControlValidation = {
        //         controlId: this.vehicleInfoValidatorRepository.gasolineTypeValidator.controlId,
        //         controlName: this.vehicleInfoValidatorRepository.gasolineTypeValidator[controlName],
        //         validations: []
        //     }
        //     this.vehicleInfoValidatorRepository.gasolineTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string[]) => any; }) => {
        //         if (!eachValidation.function(data.gasolineType)) {
        //             var formatValidationMessage: ValidationMessage = {
        //                 message: componentMessage[this.vehicleInfoValidatorRepository.gasolineTypeValidator.controlId],
        //                 sampleValue: eachValidation[sampleValue]
        //             }
        //             controlValidation.validations.push(formatValidationMessage);
        //             validationReport.invalidCount++;
        //         }
        //     });
        //     validationReport.controls.push(controlValidation);

        // }
        if (this.vehicleInfoValidatorRepository.inspectionDateValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.vehicleInfoValidatorRepository.inspectionDateValidator.controlId,
                controlName: this.vehicleInfoValidatorRepository.inspectionDateValidator[controlName],
                validations: []
            }
            this.vehicleInfoValidatorRepository.inspectionDateValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.inspectionDate)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.vehicleInfoValidatorRepository.inspectionDateValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        return validationReport;
    }

    vehicleInfoValidatorRepository: any = {

        vehicleAddressValidator: {
            controlId: 'vehicleAddressValidator',
            controlNameEng: 'Affiliated Address',
            controlNameJpn: '所属事業所',
            validators: [
                {
                    function: (vehicleAddress: String) => {
                        return (vehicleAddress && vehicleAddress.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please Fill up the Affiliation office address',
                    invalidMsgJpn: '所属事務所の住所を必要です。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        vehicleZipCodeValidator: {
            controlId: 'vehicleZipCodeValidator',
            controlNameEng: 'Zip Code',
            controlNameJpn: '〒',
            validators: [
                {
                    function: (zipCode: String) => {
                        return (zipCode && zipCode.length > 0 && zipCode.length == 7) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the zip Code.',
                    invalidMsgJpn: '郵便番号を空にすることはできません。',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        vehicleNoValidator: {
            controlId: 'vehicleNoValidator',
            controlNameEng: 'Vehicle No',
            controlNameJpn: '車両ナンバー',
            validators: [
                {
                    function: (vehicleNo: String) => {
                        return (vehicleNo && vehicleNo.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Vehicle number.',
                    invalidMsgJpn: 'You cannot empty the Vehicle number.',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        gasolineTypeValidator: {
            controlId: 'gasolineTypeValidator',
            controlNameEng: 'Gasoline Type',
            controlNameJpn: '燃料種類',
            validators: [
                {
                    function: (companyCatgory: String[]) => {
                        return (companyCatgory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You can not Empty the branch Gasoline type',
                    invalidMsgJpn: 'You can not Empty the branch Gasoline type',
                    sampleValueEng: 'Dumper',
                    sampleValueJpn: 'Dumper',

                }
            ]
        },
        inspectionDateValidator: {
            controlId: 'inspectionDateValidator',
            controlNameEng: 'Inspection Date',
            controlNameJpn: '車検時期',
            validators: [
                {
                    function: (inspectionDate: String) => {
                        var langIndex = this.languageService.getSelectedLanguageIndex();
                        if (langIndex == AppConstant.LANG_INDEX_ENG) {
                            return (inspectionDate && inspectionDate.length >= 8) ? true : false;
                        }
                        else if (langIndex == AppConstant.LANG_INDEX_JPN) {
                            return (inspectionDate && inspectionDate.length >= 6) ? true : false;
                        }
                        return false
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please Provide Valid Inspection Date.',
                    invalidMsgJpn: 'Please Provide Valid Inspection Date.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        }


    };

    public ScaleInfoFormValidator = (data: ScaleSettingInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.SCALE_SETTING_TAB, AppConstant.UI_MESSAGE_TEXT);

        if (this.scaleInfoValidatorRepository.nameOfScaleValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.scaleInfoValidatorRepository.nameOfScaleValidator.controlId,
                controlName: this.scaleInfoValidatorRepository.nameOfScaleValidator[controlName],
                validations: []
            }
            this.scaleInfoValidatorRepository.nameOfScaleValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.nameOfScale)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.scaleInfoValidatorRepository.nameOfScaleValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        // if (this.scaleInfoValidatorRepository.scaleCapacityValidator.validators) {

        //     var controlValidation: ControlValidation = {
        //         controlId: this.scaleInfoValidatorRepository.scaleCapacityValidator.controlId,
        //         controlName: this.scaleInfoValidatorRepository.scaleCapacityValidator[controlName],
        //         validations: []
        //     }
        //     this.scaleInfoValidatorRepository.scaleCapacityValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: number) => any; }) => {
        //         if (!eachValidation.function(data.capacity)) {
        //             var formatValidationMessage: ValidationMessage = {
        //                 message: componentMessage[this.scaleInfoValidatorRepository.scaleCapacityValidator.controlId],
        //                 sampleValue: eachValidation[sampleValue]
        //             }
        //             controlValidation.validations.push(formatValidationMessage);
        //             validationReport.invalidCount++;
        //         }
        //     });
        //     validationReport.controls.push(controlValidation);
        // }
        if (this.scaleInfoValidatorRepository.registrationNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.scaleInfoValidatorRepository.registrationNoValidator.controlId,
                controlName: this.scaleInfoValidatorRepository.registrationNoValidator[controlName],
                validations: []
            }
            this.scaleInfoValidatorRepository.registrationNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.registrationNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.scaleInfoValidatorRepository.registrationNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    scaleInfoValidatorRepository: any = {

        nameOfScaleValidator: {
            controlId: 'nameOfScaleValidator',
            controlNameEng: 'Scale Name',
            controlNameJpn: 'Scale Name',
            validators: [
                {
                    function: (scaleName: String) => {
                        return (scaleName && scaleName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Scale Name.',
                    invalidMsgJpn: 'You cannot empty the Scale Name.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        // scaleCapacityValidator: {
        //     controlId: 'scaleCapacityValidator',
        //     controlNameEng: 'Capacity',
        //     controlNameJpn: 'Capacity',
        //     validators: [
        //         {
        //             function: (capacity: number) => {
        //                 return (capacity != null) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'You cannot empty the Scale Capacity',
        //             invalidMsgJpn: 'You cannot empty the Scale Capacity.',
        //             sampleValueEng: '',
        //             sampleValueJpn: ''
        //         },
        //     ]
        // },

        registrationNoValidator: {
            controlId: 'registrationNoValidator',
            controlNameEng: 'Registratuion Number',
            controlNameJpn: 'Registratuion Number',
            validators: [
                {
                    function: (registNo: String) => {
                        return (registNo && registNo.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Registratuion Number.',
                    invalidMsgJpn: 'You cannot empty the Registratuion Number.',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
    }

    public wasteRequestFormValidator = (data: WasteRequestInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;

        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {

            controlName = AppConstant.CONTROL_NAME_ENGLISH;

            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;

            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.WASTE_REQUEST_FORM, AppConstant.UI_MESSAGE_TEXT);

        componentMessage = {
            personNameValidator: 'You cannot empty Person Name',
            contactNoValidator: 'You cannot empty the Contact number',
            wasteRequestTypeValidator: 'Please enter the Waste Type Title',
            wasteRequestItemValidator: 'Please enter the Waste Item Title',
            wasteItemUnitValidation: 'Please enter the Waste Item Unit',
            wasteItemShapeValidator: 'Please enter the Waste Item Shape',
            wasteItemPackageValidator: 'Please enter the Waste Item Package'
        }

        if (this.wasteRequestValidatorRepository.personNameValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.personNameValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.personNameValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.personNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.personName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.personNameValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.wasteRequestValidatorRepository.contactNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.contactNoValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.contactNoValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.contactNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.contactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.contactNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteRequestValidatorRepository.wasteRequestTypeValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.wasteRequestTypeValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.wasteRequestTypeValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.wasteRequestTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteType)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.wasteRequestTypeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteRequestValidatorRepository.wasteRequestItemValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.wasteRequestItemValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.wasteRequestItemValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.wasteRequestItemValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteItem)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.wasteRequestItemValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteRequestValidatorRepository.wasteItemUnitValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.wasteItemUnitValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.wasteItemUnitValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.wasteItemUnitValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.unitDef)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.wasteItemUnitValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.wasteRequestValidatorRepository.wasteItemShapeValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.wasteItemShapeValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.wasteItemShapeValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.wasteItemShapeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wasteShape)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.wasteItemShapeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }


        if (this.wasteRequestValidatorRepository.wasteItemPackageValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.wasteRequestValidatorRepository.wasteItemPackageValidator.controlId,
                controlName: this.wasteRequestValidatorRepository.wasteItemPackageValidator[controlName],
                validations: []
            }
            this.wasteRequestValidatorRepository.wasteItemPackageValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.wastePackage)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.wasteRequestValidatorRepository.wasteItemPackageValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    wasteRequestValidatorRepository: any = {

        personNameValidator: {
            controlId: 'personNameValidator',
            controlNameEng: 'Person Name',
            controlNameJpn: 'Person Name',
            validators: [
                {
                    function: (personName: String) => {
                        return (personName && personName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Person Name',
                    invalidMsgJpn: 'You cannot empty Person Name',
                    sampleValueEng: 'Waste',
                    sampleValueJpn: 'Waste',
                }
            ]
        },

        contactNoValidator: {
            controlId: 'contactNoValidator',
            controlNameEng: 'Contact No',
            controlNameJpn: '電話番号',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty the Contact number',
                    invalidMsgJpn: '電話番号を空にすることはできません。',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        wasteRequestTypeValidator: {
            controlId: 'wasteRequestTypeValidator',
            controlNameEng: 'Waste Type',
            controlNameJpn: 'Waste Type',
            validators: [
                {
                    function: (wasteCategory: String) => {
                        return (wasteCategory && wasteCategory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Type Title',
                    invalidMsgJpn: 'Please enter the Waste Type Title',
                    sampleValueEng: 'Waste',
                    sampleValueJpn: 'Waste',
                }
            ]
        },

        wasteRequestItemValidator: {
            controlId: 'wasteRequestItemValidator',
            controlNameEng: 'Waste Item',
            controlNameJpn: 'Waste Title',
            validators: [
                {
                    function: (wasteItem: String) => {
                        return (wasteItem && wasteItem.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Title',
                    invalidMsgJpn: 'Please enter the Waste Item Title'
                }
            ]
        },

        wasteItemUnitValidator: {
            controlId: 'wasteItemUnitValidation',
            controlNameEng: 'Waste Unit',
            controlNameJpn: 'Waste Unit',
            validators: [
                {
                    function: (wasteUnit: String) => {
                        return (wasteUnit && wasteUnit.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Unit',
                    invalidMsgJpn: 'Please enter the Waste Item Unit'
                }
            ]
        },

        wasteItemShapeValidator: {
            controlId: 'wasteItemShapeValidator',
            controlNameEng: 'Waste Shape',
            controlNameJpn: 'Waste Shape',
            validators: [
                {
                    function: (wasteShape: String) => {
                        return (wasteShape && wasteShape.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Shape',
                    invalidMsgJpn: 'Please enter the Waste Item Shape'
                }
            ]
        },
        wasteItemPackageValidator: {
            controlId: 'wasteItemPackageValidator',
            controlNameEng: 'Waste Package',
            controlNameJpn: 'Waste Package',
            validators: [
                {
                    function: (wastePackage: String) => {
                        return (wastePackage && wastePackage.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the Waste Item Package',
                    invalidMsgJpn: 'Please enter the Waste Item Package'
                }
            ]
        }

    };


    // updateCompanyInfo(companyInformation: CompanyInfoUpdate) {
    //     this.companyInfo.companyId = companyInformation.companyId,
    //         this.companyInfo.companyName = companyInformation.companyName,
    //         this.companyInfo.zipcode = companyInformation.zipcode,
    //         this.companyInfo.companyAddress = companyInformation.companyAddress,
    //         this.companyInfo.representativeName = companyInformation.representativeName,
    //         this.companyInfo.representativEmail = companyInformation.representativEmail,
    //         this.companyInfo.contactNo = companyInformation.contactNo,
    //         this.companyInfo.companyFaxNumber = companyInformation.companyFaxNumber,
    //         this.companyInfo.notification = companyInformation.notification,
    //         this.companyInfo.corporateRegNo = companyInformation.corporateRegNo,
    //         this.companyInfo.wasteProcessingLicenseNo = companyInformation.wasteProcessingLicenseNo,
    //         this.companyInfo.uploadLicense = companyInformation.uploadLicense,
    //         this.companyInfo.remarks = companyInformation.remarks,
    //         this.companyInfo.companyBusinessCategory = companyInformation.companyBusinessCategory
    // }

    // updateBranchInfo(selectedBranch: BranchInfoFetch) {
    //     if (selectedBranch) {
    //         var updateFlag = false;
    //         this.companyInfo.branchList.forEach((element) => {

    //             if (element.branchId == selectedBranch.branchId) {
    //                 var index = this.companyInfo.branchList.indexOf(element);
    //                 this.companyInfo.branchList[index] = selectedBranch;
    //                 updateFlag = true;
    //             }

    //         });
    //         if (updateFlag == false) {
    //             this.companyInfo.branchList.unshift(selectedBranch);

    //         }

    //     }
    // }

    // saveAccountantInfo(accountant: AccountantInfo) {
    //     if (accountant) {
    //         this.companyInfo.accountantInfo = accountant;
    //     }
    // }

    // updateBankAccoutInfo(bankAccout: BankAccountInfo) {
    //     if (bankAccout) {
    //         var updateFlag = false;
    //         this.companyInfo.bankAccountList.forEach((element) => {

    //             if (element.bankAccountId == bankAccout.bankAccountId) {
    //                 var index = this.companyInfo.bankAccountList.indexOf(element);
    //                 this.companyInfo.bankAccountList[index] = bankAccout;
    //                 updateFlag = true;
    //             }

    //         });
    //         if (updateFlag == false) {
    //             this.companyInfo.bankAccountList.unshift(bankAccout);

    //         }

    //     }
    // }

    // updatePrice(waste: WasteItemDef) {
    //     if (waste) {
    //         this.companyInfo.wasteList.forEach((companyWaste) => {
    //             if (companyWaste.wasteCategoryId == waste.wasteCategoryId) {
    //                 companyWaste.wasteItemDef.forEach((element) => {
    //                     if (element.wasteId == waste.wasteId) {
    //                         element.transportPrice = waste.transportPrice,
    //                             element.processingPrice = waste.processingPrice
    //                     }
    //                 })
    //             }
    //         })


    //     }
    // }

    // updateVehicleInfo(selectedVehicle: VehicleInfoFetch) {
    //     if (selectedVehicle) {
    //         var updateFlag = false;
    //         this.companyInfo.vehicleList.forEach((element) => {

    //             if (element.vehicleId == selectedVehicle.vehicleId) {
    //                 var index = this.companyInfo.vehicleList.indexOf(element);
    //                 this.companyInfo.vehicleList[index] = selectedVehicle;
    //                 updateFlag = true;
    //             }

    //         });
    //         if (updateFlag == false) {
    //             this.companyInfo.vehicleList.unshift(selectedVehicle);

    //         }

    //     }
    // }

    // saveUpdatedComWasteList(updatedCompanyWasteList: CompWasteInfoFetch[]) {

    //     if (updatedCompanyWasteList) {
    //         this.companyInfo.wasteList = updatedCompanyWasteList;
    //     }
    // }


    // companyInfo: CompanyInfoFetch =
    //     {
    //         companyId: 'mangrove@gmail.com',
    //         companyName: 'Mangrove Systems',
    //         zipcode: '120-0000',
    //         companyAddress: 'Dhaka',
    //         representativeName: 'Joy',
    //         representativEmail: 'mangrove@gmail.com',
    //         contactNo: '01734791013',
    //         companyBusinessCategory: [
    //             'Dumper',
    //             'Processor'
    //         ],
    //         companyFaxNumber: '',
    //         notification: '',
    //         accountantName: '',
    //         accountantEmail: '',
    //         corporateRegNo: '',
    //         wasteProcessingLicenseNo: '',
    //         uploadLicense: "",
    //         frontendDate: '',
    //         backendDate: '',
    //         remarks: '',
    //         accountantInfo: {
    //             companyId: '',
    //             accountantId: '',
    //             accountantName: 'Rakib Hasan',
    //             accountantEmail: 'rakib@gmail.com',
    //             invoiceClosingDate: '',
    //             invoicePaymentDate: '',
    //             paymentMode: ['Cash', 'Bank Transfer']
    //         },
    //         bankAccountList: [
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 bankAccountId: 'b01',
    //                 bankName: 'DBBL',
    //                 branchName: 'Dhaka',
    //                 accountNumber: '1273827392792',
    //                 accountName: 'Rakib Hasan'
    //             },
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 bankAccountId: 'b02',
    //                 bankName: 'SBL',
    //                 branchName: 'Meherpur',
    //                 accountNumber: '472963492722',
    //                 accountName: 'Mustafiz'
    //             },
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 bankAccountId: 'b03',
    //                 bankName: 'IBBL',
    //                 branchName: 'Kushtia',
    //                 accountNumber: '901837392733',
    //                 accountName: 'Arman Reza'
    //             }
    //         ],
    //         branchList: [
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 branchId: '00001',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 branchName: 'Mangrove-Rangpur',
    //                 zipcode: '',
    //                 branchAddress: 'Rangpur',
    //                 branchContactNo: '01722678969',
    //                 branchFAX: '213234',
    //                 branchInchargeName: 'Mokid',
    //                 branchBusinessCategory: [
    //                     'Dumper',
    //                     'Transporter'
    //                 ],
    //                 remark: ''
    //             },
    //             {
    //                 companyId: 'rakib@gmail.com',
    //                 branchId: '00002',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 branchName: 'Mangrove-Rajsahi',
    //                 zipcode: '',
    //                 branchAddress: 'Rajsahi',
    //                 branchContactNo: '0172829718',
    //                 branchFAX: '645646',
    //                 branchInchargeName: 'Rakib',
    //                 branchBusinessCategory: [
    //                     'Dumper',
    //                     'Processor'
    //                 ],
    //                 remark: ''
    //             },
    //             {
    //                 companyId: 'hasan@gmail.com',
    //                 branchId: '00003',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 branchName: 'Mangrove-Dhaka',
    //                 zipcode: '',
    //                 branchAddress: 'Dhaka',
    //                 branchContactNo: '017354275275',
    //                 branchFAX: '2155634',
    //                 branchInchargeName: 'Raju',
    //                 branchBusinessCategory: [
    //                     'Processor',
    //                     'Transporter'
    //                 ],
    //                 remark: ''
    //             }
    //         ],
    //         vehicleList: [
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 vehicleId: '00001',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 manufacturerName: 'Ashock',
    //                 vehicleType: 'Large',
    //                 modelName: 'Ecomet 1015 MK',
    //                 vehicleRegNo: 'H-123T',
    //                 vehicleCapacity: '1000 kg',
    //                 vehicleWeight: '500kg',
    //                 gasolineType: [
    //                     'Regular (petrol)',
    //                     'CNG'
    //                 ],
    //                 inspectionDate: '12-2-2020',
    //                 vehicleOwnerShip: ['Permanent'],
    //                 zipcode: '',
    //                 officeAddress: '',
    //                 fitnessLicense: "",
    //                 remarks: 'Nothing'
    //             },
    //             {
    //                 companyId: 'rakib@gmail.com',
    //                 vehicleId: '00002',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 manufacturerName: 'Ashock',
    //                 vehicleType: 'Large',
    //                 modelName: 'Ecomet 1015 MK',
    //                 vehicleRegNo: 'H-123T',
    //                 vehicleCapacity: '1000 kg',
    //                 vehicleWeight: '500kg',
    //                 gasolineType: [
    //                     'Diesel',
    //                     'Electric'

    //                 ],
    //                 inspectionDate: '12-2-2020',
    //                 vehicleOwnerShip: ['Temporary'],
    //                 zipcode: '',
    //                 officeAddress: '',
    //                 fitnessLicense: "",
    //                 remarks: 'Nothing'
    //             },
    //             {
    //                 companyId: 'hasan@gmail.com',
    //                 vehicleId: '00003',
    //                 frontendDate: '',
    //                 backendDate: '',
    //                 manufacturerName: 'TATA',
    //                 vehicleType: 'Large',
    //                 modelName: 'TATA 1015 MK',
    //                 vehicleRegNo: 'H-123T',
    //                 vehicleCapacity: '2000 kg',
    //                 vehicleWeight: '500kg',
    //                 gasolineType: [
    //                     'High Octane',
    //                     'CNG'
    //                 ],
    //                 inspectionDate: '12-2-2020',
    //                 vehicleOwnerShip: ['Permanent'],
    //                 zipcode: '',
    //                 officeAddress: '',
    //                 fitnessLicense: "",
    //                 remarks: 'Nothing'
    //             }
    //         ],

    //         wasteList: [
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 wasteCategoryId: 'dxw01',
    //                 wasteCatagory: 'Wood',
    //                 wasteItemDef: [
    //                     {
    //                         wasteCategoryId: 'dxw01',
    //                         wasteId: 'w01',
    //                         wasteItem: 'WoodChips',
    //                         unitDef: 'Pound',
    //                         transportPrice: 20000,
    //                         processingPrice: 55000,
    //                         frontendDate: '20-5-20',
    //                         backendDate: '',
    //                         remarks: 'Nothing'
    //                     },
    //                 ]

    //             },
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 wasteCategoryId: 'dxw02',
    //                 wasteCatagory: 'Metal',
    //                 wasteItemDef: [
    //                     {
    //                         wasteCategoryId: 'dxw02',
    //                         wasteId: 'w03',
    //                         wasteItem: 'Iron Scrapt',
    //                         unitDef: 'Pound',
    //                         transportPrice: 20000,
    //                         processingPrice: 55000,
    //                         frontendDate: '20-5-20',
    //                         backendDate: '',
    //                         remarks: 'Nothing'
    //                     },

    //                 ]

    //             },
    //             {
    //                 companyId: 'mangrove@gmail.com',
    //                 wasteCategoryId: 'dxw03',
    //                 wasteCatagory: 'Plastic',
    //                 wasteItemDef: [
    //                     {
    //                         wasteCategoryId: 'dxw03',
    //                         wasteId: 'w02',
    //                         wasteItem: 'Plastic Board',
    //                         unitDef: 'Pound',
    //                         transportPrice: 20000,
    //                         processingPrice: 55000,
    //                         frontendDate: '20-5-21',
    //                         backendDate: '',
    //                         remarks: 'Nothing'
    //                     },


    //                 ]

    //             },

    //         ]
    //     };



    // dxrWasteViewList: DxrWasteInfoFetch[] = [
    //     {
    //         wasteCategoryId: 'dxw01',
    //         wasteCatagory: 'Wood',
    //         dxrWasteItemDef: [
    //             {
    //                 wasteCategoryId: 'dxw01',
    //                 wasteId: 'w01',
    //                 wasteItem: 'WoodChips',
    //                 unitDef: 'Pound',
    //             },
    //             {
    //                 wasteCategoryId: 'dxw01',
    //                 wasteId: 'w02',
    //                 wasteItem: 'Sowdust',
    //                 unitDef: 'Kg',
    //             }
    //         ]
    //     },
    //     {
    //         wasteCategoryId: 'dxw02',
    //         wasteCatagory: 'Metal',
    //         dxrWasteItemDef: [
    //             {
    //                 wasteCategoryId: 'dxw02',
    //                 wasteId: 'w03',
    //                 wasteItem: 'Iron Scrapt',
    //                 unitDef: 'Pound',
    //             },
    //             {
    //                 wasteCategoryId: 'dxw02',
    //                 wasteId: 'w04',
    //                 wasteItem: 'Aluminium',
    //                 unitDef: 'Kg',
    //             }
    //         ]
    //     },
    //     {
    //         wasteCategoryId: 'dxw03',
    //         wasteCatagory: 'Plastic',
    //         dxrWasteItemDef: [
    //             {
    //                 wasteCategoryId: 'dxw03',
    //                 wasteId: 'w05',
    //                 wasteItem: 'Plastic Board',
    //                 unitDef: 'Pound',
    //             },
    //             {
    //                 wasteCategoryId: 'dxw03',
    //                 wasteId: 'w06',
    //                 wasteItem: 'Board',
    //                 unitDef: 'Pound',
    //             }
    //         ]
    //     },

    // ];
}

