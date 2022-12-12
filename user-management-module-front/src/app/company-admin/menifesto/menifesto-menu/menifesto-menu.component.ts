import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, subscribeOn } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { ManifestFilter, ManifestoProcessWasteInfo, MenifestoInfo, MenifestoTripDef, MenifestoWaste, MenifestReportCallData, MenifestReportData, PickInfo, SearchDate } from 'src/app/models/backend-fetch/menifesto';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ThrowStmt } from '@angular/compiler';
import { AgreementPartnerCompanyFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { start } from 'repl';
import { stringify } from 'querystring';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';

@Component({
    selector: 'app-menifesto-menu',
    templateUrl: './menifesto-menu.component.html',
    styleUrls: ['./menifesto-menu.component.css']
})
export class MenifestoMenuComponent implements OnInit {

    @Input()
    fromProject: boolean = false;

    @Input()
    projectProcessDef: any;

    @Input()
    projectViewPopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    tabChangeForCopyProject!: (project: ProjectInfoFetch) => void;

    @Input()
    tabChangeForEditProject!: (project: ProjectInfoFetch, selectedProcess?: any) => void;

    @Input()
    viewSchedulePopupOpen!: (project: ProjectInfoFetch) => void;

    @Input()
    redirectToCreateSchedule!: (project: ProjectInfoFetch) => void;

    @Input()
    redirectToProcessCompletion!: () => void;

    @Input()
    checkedManifesto: MenifestoInfo[] = [];

    constructor(private loadUnloadService: LoadUnloadService, private menifestoService: MenifestoService, private httpClient: HttpClient, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService) { }



    uiLabels: any = {
        "listHeader": "Manifesto List",
        "date": "Date",
        "projectName": "Project Name",
        "dumperCompanyName": "Dumper Company Name",
        "processorCompanyName": "Processor Company Name",
        "transportCompanyName": "Transport Company Name",
        "generateMenifest": "Print Menifesto",
        "inOperation": "In Operation",
        "completed": "Completed",
        "filter": "Filter"
    }

    @Input()
    manifestoInfoList: MenifestoInfo[] = [];

    @Input()
    selectedManifesto!: MenifestoInfo;

    @Input()
    searchDate!: SearchDate;

    @Input()
    public selectTab!: (index: number, menifesto: MenifestoInfo) => void;

    @Input()
    public changeTab!: (index: number, manifestoInfoList: MenifestoInfo[]) => void;

    @Input()
    manifestFilter!: ManifestFilter;

    viewComponent = false;
    componentCode: string = '';
    isSystemAdmin: boolean = false;
    companyId: string = this.utilService.getCompanyIdCookie();
    generatedManifesto: string = AppConstant.MANIFESTO_TYPE_GENERATED;
    manualManifestoType: string = AppConstant.MANIFESTO_TYPE_MANUAL;
    complatedFilter: string = AppConstant.COMPLATED_FILTER;
    OperationFilter: string = AppConstant.MENIFESTO_PROGRESS_FILTER;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;
    validation: boolean = false;


    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.MENIFESTO_LIST;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);

        if (this.fromProject) {
            this.searchByText();
        } else {
            this.showList();
        }
    }

    onAccordionClick(event: any, item: MenifestoInfo) {

        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }
        if (item.isCheck) {
            item.isCheck = false;
        } else {
            item.isCheck = true;
        }
        return 0;
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

        var filterString: string = '';
        if (this.fromProject) {
            filterString = AppConstant.MENIFESTO_FILTER_FOR_PROJECT_DASHBOARD;
        } else {
            filterString = (this.manifestFilter.selectedIndex == AppConstant.MENIFESTO_PROGRESS_FILTER) ? this.OperationFilter : this.complatedFilter;
        }

        if (this.fromProject) {
            this.searchDate.startDate = "";
            this.searchDate.endDate = "";
        }

        this.getManifesto(this.searchDate, pageNo, searchText, filterString);
    }

    showList() {

        if (this.searchDate) {

            var filterString: string = '';
            if (this.fromProject) {
                filterString = AppConstant.MENIFESTO_FILTER_FOR_PROJECT_DASHBOARD;
            } else {
                filterString = (this.manifestFilter.selectedIndex == AppConstant.MENIFESTO_PROGRESS_FILTER) ? this.OperationFilter : this.complatedFilter;
            }

            this.menifestoService.getMenifestoInitialInfo(this.searchDate, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, filterString).subscribe((manifestoList) => {
                if (manifestoList) {
                    this.manifestoInfoList = manifestoList;
                }

                this.viewComponent = true;
            })
        }

    }

    searchValidDate() {
        this.menifestoService.getDateAsFrontendFormat(this.searchDate.startDate).subscribe(startDateObj => {
            if (startDateObj) {
                this.menifestoService.getDateAsFrontendFormat(this.searchDate.endDate).subscribe(endDateObj => {
                    if (endDateObj) {

                        if (startDateObj.date <= endDateObj.date) {
                            this.showList();
                            this.validation = false;
                        } else {
                            this.validation = true;
                        }
                    }
                });
            }
        });
    }

    getManifesto(searchDate: SearchDate, pageNo: number, searchText: string, status: string) {

        this.menifestoService.getMenifestoInitialInfo(searchDate, pageNo, searchText, status).subscribe((manifestoList) => {
            if (manifestoList) {
                this.manifestoInfoList = manifestoList;
            }
            this.viewComponent = true;
        })
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    createManifesto = (item: MenifestoInfo, isNew: boolean) => {

        if (!isNew) {
            this.menifestoService.getMenifestoDetailInfo(item.menifestoInfoId).subscribe(response => {
                if (response) {
                    this.selectedManifesto = response;
                    this.selectTab(1, response);
                }
            })
        } else {
            this.selectedManifesto = item;
            this.selectTab(1, JSON.parse(JSON.stringify(item)));
        }

    }

    updateLedger = (item: MenifestoInfo[]) => {
        if (item) {
            var totalCallback = item.length;
            var callBackCount = 0;
            var manifestoListForLedgerUpdate: MenifestoInfo[] = [];
            item.forEach(eachManifesto => {

                this.menifestoService.getMenifestoDetailInfo(eachManifesto.menifestoInfoId).subscribe(response => {

                    if (response) {
                        var manifesto: any = item.find(item => item.menifestoInfoId == response.menifestoInfoId);
                        response.isCheck = (manifesto && manifesto.isCheck) ? true : false;
                        manifestoListForLedgerUpdate.push(response);
                        callBackCount++;
                        if (callBackCount == totalCallback) {
                            // this.manifestoInfoList = item;
                            this.changeTab(2, manifestoListForLedgerUpdate);
                        }
                    }
                })
            })
        }
    }

    generateReport = (menifesto: MenifestoInfo) => {

        this.menifestoService.downloadManifestoReport(menifesto.menifestoInfoId);

        // this.menifestoService.getMenifestoDetailInfo(menifesto.menifestoInfoId).subscribe(response => {
        //     if (response) {
        //         var menifestReportCallData: MenifestReportCallData = this.prepareReportGenData(response);

        //         // var generatedDataKeys: string[] = Object.keys(menifestReportCallData);
        //         // var mockDataKeys: string[] = Object.keys(this.reportData);

        //         // generatedDataKeys.forEach((eachGenKey, index) => {

        //         //     if (eachGenKey != mockDataKeys[index]) {
        //         //         console.log('mockKey: ' + mockDataKeys[index] + ', genKey: ' + eachGenKey);
        //         //     }

        //         // });

        //         // console.log(JSON.stringify(menifestReportCallData));

        //         this.menifestoService.generateReport(menifestReportCallData);
        //     }
        // })


    }


    prepareMenifestoWasteData(tripDefs: MenifestoTripDef[], pickList: PickInfo[]): MenifestoWaste[] {
        var menifestoWasteList: MenifestoWaste[] = [];
        var totalQuantity = 0;
        pickList.forEach(each => {
            totalQuantity += each.quantity;
        });
        tripDefs.forEach(tripDef => {
            tripDef.projectList.forEach(eachProject => {
                eachProject.wasteIdList.forEach(eachWaste => {
                    var menifestoWaste: MenifestoWaste = {
                        wasteItem: eachWaste.wasteTitle,
                        unit: eachWaste.unitDef,
                        shape: eachWaste.wasteShape,
                        packing: eachWaste.wastePackage,
                        quantity: totalQuantity
                    }

                    menifestoWasteList.push(menifestoWaste);
                });
            });
        });
        return menifestoWasteList;
    }

    prepareMenifestoWasteDataFromManualManifestoData(manifestoProcessWasteInfo: ManifestoProcessWasteInfo[]): MenifestoWaste[] {
        var menifestoWasteList: MenifestoWaste[] = [];

        manifestoProcessWasteInfo.forEach(eachWaste => {
            var menifestoWaste: MenifestoWaste = {
                wasteItem: eachWaste.wasteName,
                unit: eachWaste.unit,
                shape: eachWaste.shape,
                packing: eachWaste.wastePackage,
                quantity: eachWaste.quantity
            }

            menifestoWasteList.push(menifestoWaste);
        });

        return menifestoWasteList;
    }

    prepareMenifestoWasteDisposalLocation(pickDef: PickInfo[]): string {
        var finalDisposalLocation: string = pickDef[0].disposalInfo.dropZipCode + ',' + pickDef[0].disposalInfo.dropLocation;
        return finalDisposalLocation;
    }

    prepareReportGenData(menifesto: MenifestoInfo): MenifestReportCallData {

        var menifestReportCallData: MenifestReportCallData = {} as MenifestReportCallData;

        menifestReportCallData.designFile = AppConstant.MANIFESTO_REPORT_FILE_NAME;
        menifestReportCallData.outputName = AppConstant.MANIFESTO_REPORT_TYPE;
        menifestReportCallData.format = AppConstant.REPORT_FILE_FORMAT_PDF;
        menifestReportCallData.parameters = {} as MenifestReportData;

        var date: string = menifesto.dateView.substring(0, menifesto.dateView.indexOf(" "));

        menifestReportCallData.parameters = {
            serialNumberLabel: this.uiLabels.serialNumberLabel,
            wasteItemLabel: this.uiLabels.wasteItemLabel,
            tableUnitLabel: this.uiLabels.tableUnitLabel,
            shapeLabel: this.uiLabels.shapeLabel,
            packingLabel: this.uiLabels.packingLabel,
            quanitityLabel: this.uiLabels.quanitityLabel,
            title: this.uiLabels.title,
            refLabel: this.uiLabels.refLabel,
            refNo: '1234',
            dateLabel: this.uiLabels.dateLabel,
            date: date,
            manifestoLabel: this.uiLabels.manifestoLabel,
            manifestoNo: menifesto.menifestoUniqueId,
            issuersName: menifesto.aggrementInfo.dumperPartnerInfo.companyName,
            issuersNameLabel: this.uiLabels.issuersNameLabel,
            numberLabel: this.uiLabels.numberLabel,
            numberValue: '001',
            dateValue: date,
            dumperCompanyInfoLabel: this.uiLabels.dumperCompanyInfoLabel,
            dumperCompanyNameLabel: this.uiLabels.dumperCompanyNameLabel,
            companyName: '',
            address: '',
            addressLabel: this.uiLabels.addressLabel,
            personLabel: this.uiLabels.personLabel,
            personInCharge: '',
            contactNoLabel: this.uiLabels.contactNoLabel,
            dumperCompanyContactNo: '',
            pickLocationContactNo: '',
            wastepickLocation: '',
            pickLocationInCharge: '',
            sightInfoLabel: this.uiLabels.sightInfoLabel,
            confirmationDateLabel: this.uiLabels.confirmationDateLabel,
            sealAndSignLabel: this.uiLabels.sealAndSignLabel,
            dumperHandOverDate: menifesto.manualManifesto.dateView.substring(0, menifesto.manualManifesto.dateView.indexOf(" ")),
            loadDateB1: menifesto.manualManifesto.transportInfo.transportComplateDateView.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateView.indexOf(" ")),
            transportComplateDate: menifesto.manualManifesto.transportInfo.transportComplateDateB2View.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateB2View.indexOf(" ")),
            receiveComplateDate: menifesto.manualManifesto.processorInfo.processingComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateView.indexOf(" ")),
            processComplatedateC2: menifesto.manualManifesto.processorInfo.processingComplateDateC2View.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateC2View.indexOf(" ")),
            processComplateDate: menifesto.manualManifesto.processorInfo.disposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.disposeComplateDateView.indexOf(" ")),
            finalDisposalDate: menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.indexOf(" ")),
            tableHeaderLabel: this.uiLabels.tableHeaderLabel,
            unitlabel: this.uiLabels.unitlabel,
            manifestoData: '',
            userNameLabel: this.uiLabels.userNameLabel,
            intermediateProcessingWaste: this.uiLabels.intermediateProcessingWaste,
            finalDisposalLocation: '',
            finalDisposalLocationlabel: this.uiLabels.finalDisposalLocationlabel,
            locationName: '',
            locationNameLabel: this.uiLabels.locationNameLabel,
            transporter1Label: this.uiLabels.transporter1Label,
            transporter2Label: this.uiLabels.transporter2Label,
            transporterCompanyNameLabel: this.uiLabels.transporterCompanyNameLabel,
            disposalContactorLabel: this.uiLabels.disposalContactorLabel,
            transhipmentLabel: this.uiLabels.transhipmentLabel,
            consignment1Label: this.uiLabels.consignment1Label,
            consignment2Label: this.uiLabels.consignment2Label,
            consignmentDisposalLabel: this.uiLabels.consignmentDisposalLabel,
            finalDisposalDateLabel: this.uiLabels.finalDisposalDateLabel,
            additionalInfoLabel: this.uiLabels.additionalInfoLabel,
            additionalInfo: menifesto.manualManifesto.additionalInfo,
            userName: '',
            processingWaste: 'None',
            transporterAddress: '',
            transporterCompanyName: '',
            transportCompanyContactNo: '',
            transportInCharge: '',
            processorCompanyAddress: '',
            processorCompanyContactNo: '',
            menifestoStatus: menifesto.menifestoStatus
        }

        var dumper: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_DUMPER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var transporter: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        var processor: AgreementPartnerInfo = (menifesto.aggrementInfo.dumperPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.dumperPartnerInfo : ((menifesto.aggrementInfo.transporterPartnerInfo.assignedRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? menifesto.aggrementInfo.transporterPartnerInfo : menifesto.aggrementInfo.processorPartnerInfo);

        menifestReportCallData.parameters.issuersName = dumper.personInChargeName;
        menifestReportCallData.parameters.companyName = dumper.companyName;
        menifestReportCallData.parameters.address = dumper.companyZipCode + ',' + dumper.companyAddress;
        menifestReportCallData.parameters.personInCharge = dumper.personInChargeName;
        menifestReportCallData.parameters.dumperCompanyContactNo = dumper.contactNo;
        menifestReportCallData.parameters.pickLocationContactNo = dumper.contactNo;
        menifestReportCallData.parameters.wastepickLocation = dumper.companyZipCode + ',' + dumper.companyAddress;
        menifestReportCallData.parameters.pickLocationInCharge = dumper.personInChargeName;
        menifestReportCallData.parameters.userName = dumper.personInChargeName;
        // menifestReportCallData.parameters.sightAddress = dumper.companyZipCode + ',' + dumper.companyAddress;

        if (!menifesto.manualManifesto.dateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.dumperHandOverDate = date
        } else if (!menifesto.manualManifesto.dateView) {
            menifestReportCallData.parameters.dumperHandOverDate = 'Not Given'
        }

        if (!menifesto.manualManifesto.transportInfo.transportComplateDateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.loadDateB1 = date

        } else if (!menifesto.manualManifesto.transportInfo.transportComplateDateView) {
            menifestReportCallData.parameters.loadDateB1 = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.transportInfo.transportComplateDateB2View && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.transportComplateDate = date

        // } else
        if (!menifesto.manualManifesto.transportInfo.transportComplateDateB2View) {
            menifestReportCallData.parameters.transportComplateDate = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.processorInfo.processingComplateDateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.receiveComplateDate = date

        // } else
        if (!menifesto.manualManifesto.processorInfo.processingComplateDateView) {
            menifestReportCallData.parameters.receiveComplateDate = 'Not Complated'
        }

        // if (!menifesto.manualManifesto.processorInfo.processingComplateDateC2View && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.processComplatedateC2 = date

        // } else
        if (!menifesto.manualManifesto.processorInfo.processingComplateDateC2View) {
            menifestReportCallData.parameters.processComplatedateC2 = 'Not Complated'
        }

        if (!menifesto.manualManifesto.processorInfo.disposeComplateDateView) {
            menifestReportCallData.parameters.processComplateDate = 'Not Complated'
        }

        if (!menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView) {
            menifestReportCallData.parameters.finalDisposalDate = 'Not Complated'
        }

        if (!menifesto.manualManifesto.additionalInfo) {
            menifestReportCallData.parameters.additionalInfo = 'None'
        }

        if (menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
            menifestReportCallData.parameters.manifestoData = JSON.stringify(this.prepareMenifestoWasteData(menifesto.tripIdDef, menifesto.pickIdDef));
            menifestReportCallData.parameters.finalDisposalLocation = this.prepareMenifestoWasteDisposalLocation(menifesto.pickIdDef);
            menifestReportCallData.parameters.locationName = this.prepareMenifestoWasteDisposalLocation(menifesto.pickIdDef);
        } else {
            menifestReportCallData.parameters.manifestoData = JSON.stringify(this.prepareMenifestoWasteDataFromManualManifestoData(menifesto.manualManifesto.manifestoProcessWasteInfo));
            menifestReportCallData.parameters.finalDisposalLocation = menifesto.manualManifesto.dumperInfo.workZip + ', ' + menifesto.manualManifesto.dumperInfo.workAddress;
            menifestReportCallData.parameters.locationName = (menifesto.manualManifesto.dumperInfo.workPlace) ? menifesto.manualManifesto.dumperInfo.workPlace : "Not found";
        }



        menifestReportCallData.parameters.transportInCharge = transporter.personInChargeName;
        menifestReportCallData.parameters.transporterCompanyName = transporter.companyName;
        menifestReportCallData.parameters.transporterAddress = transporter.companyZipCode + ',' + transporter.companyAddress;
        menifestReportCallData.parameters.transportCompanyContactNo = transporter.contactNo;


        menifestReportCallData.parameters.processorCompanyAddress = processor.companyZipCode + ',' + transporter.companyAddress;
        menifestReportCallData.parameters.processorCompanyContactNo = processor.contactNo;

        menifestReportCallData.wrapError = true;

        // console.log(JSON.stringify(menifestReportCallData));
        return menifestReportCallData;
    }

    reportData = {
        "designFile": "final_manifesto_report.rptdesign",
        "outputName": "final_manifesto_report",
        "format": "pdf",
        "parameters": {
            "title": "Industrial waste Management Slip",
            "refLabel": "Ref.No : ",
            "refNo": " W-123424",
            "dateLabel": "Date",
            "date": " 25-4-22",
            "manifestoLabel": "Delivery No",
            "manifestoNo": " D-00001",
            "issuersName": "Rakib",
            "issuersNameLabel": "Issuer's Name",
            "numberLabel": "Number",
            "numberValue": "220",
            "dateValue": "22-2-22",
            "dumperCompanyInfoLabel": "Dumper Info",
            "dumperCompanyNameLabel": "Company Nmae : ",
            "companyName": " RFL",
            "address": " Dhaka",
            "addressLabel": "Address : ",
            "personLabel": "In Charge : ",
            "personInCharge": " Rakib",
            "contactNoLabel": "Contact No : ",
            "dumperCompanyContactNo": " 0132543566",
            "pickLocationContactNo": " 03453564664",
            "wastepickLocation": " Mirpur-12",
            "pickLocationInCharge": "Mustafiz",
            "sightInfoLabel": "Sight Info",
            "confirmationDateLabel": "Confirmation Date",
            "sealAndSignLabel": "Seal & Sign",
            "dumperHandOverDate": "26-5-22",
            "transportComplateDate": "27-4-22",
            "processComplateDate": " 30-4-22",
            "finalDisposalDate": " 2-5-22",
            "tableHeaderLabel": "Type Of Industrial Waste",
            "unitlabel": "t,kg,m3,l",
            "manifestoData": "[{\"wasteItem\":\"Metal\",\"unit\":\"kg\",\"packing\":\"Nothing\",\"shape\":\"Circle\"},{\"wasteItem\":\"Wood\",\"unit\":\"m3\",\"packing\":\"None\",\"shape\":\"Tringle\"},{\"wasteItem\":\"Plastic\",\"unit\":\"l\",\"packing\":\"Nothing\",\"shape\":\"Rectangular\"},{\"wasteItem\":\"Metal\",\"unit\":\"t\",\"packing\":\"Nothing\",\"shape\":\"Circle\"}]",
            "userNameLabel": "User Name",
            "intermediateProcessingWaste": "Intermediate Processing Waste",
            "finalDisposalLocation": "Mirpur-10",
            "finalDisposalLocationlabel": "Final Disposal Location",
            "locationName": "Dhaka",
            "locationNameLabel": "Location Name",
            "transporter1Label": "Transporter 1",
            "transporter2Label": "Transporter 2",
            "transporterCompanyNameLabel": "Company Name : ",
            "disposalContactorLabel": "Disposal Contactor",
            "transhipmentLabel": "Tanshipment/Storage",
            "consignment1Label": "Consignment 1",
            "consignment2Label": "Consignment 2",
            "consignmentDisposalLabel": "Consignment Disposal",
            "finalDisposalDateLabel": "Final Disposal Date",
            "additionalInfoLabel": "Additional Information",
            "additionalInfo": "Please Giv here Additional Information",
            "userName": "Mustafiz",
            "processingWaste": "Metal",
            "transporterAddress": "Mirpur-10",
            "transporterCompanyName": " Bangladesh Transport Limited",
            "transportCompanyContactNo": "0534646456747",
            "transportInCharge": "Rakib",
            "processorCompanyAddress": "Dhaka-1200",
            "processorCompanyContactNo": "04454646474"
        },
        "wrapError": true
    };

    manualManifesto: MenifestoInfo = {
        menifestoInfoId: '',
        menifestoUniqueId: '',
        date: '',
        dateView: '',
        projectId: '',
        tripIds: [],
        tripIdDef: [],
        pickIdDef: [],
        wasteId: '',
        projectName: '',
        creator: '',
        firstParty: '',
        secondparty: '',
        aggrementInfo: {
            agreementId: '',
            title: '',
            createDate: '',
            createDateView: '',
            validDate: '',
            validDateView: '',
            agreementType: '',
            agreementStatus: {
                statusId: '',
                statusTitle: '',
            },

            dumperPartnerInfo: {
                agreementPartnerInfoId: '',
                companyId: '',
                companyName: '',
                companyZipCode: '',
                companyZipCodeFormated: '',
                companyAddress: '',
                contactNo: '',
                contactNoFormated: '',
                personInChargeId: '',
                personInChargeName: '',
                personInchargeEmail: '',
                accountantInfo: {
                    companyId: '',
                    accountantId: '',
                    accountantName: '',
                    accountantEmail: '',
                    contactNo: "",
                    contactNoFormated: "",
                    invoiceClosingDate: '',
                    invoicePaymentDate: '',
                    paymentMode: []
                },
                accountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                otherBankAccountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                accountType: '',
                assignedRoles: '',
                companyBusinessCategory: [],
                companyRoleSelection: [false, false, false],
                isApprovalDone: false,
                companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
                roleIndex: -1,
                paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
                bankPayment: true
            },
            transporterPartnerInfo: {
                agreementPartnerInfoId: '',
                companyId: '',
                companyName: '',
                companyZipCode: '',
                companyZipCodeFormated: '',
                companyAddress: '',
                contactNo: '',
                contactNoFormated: '',
                personInChargeId: '',
                personInChargeName: '',
                personInchargeEmail: '',
                accountantInfo: {
                    companyId: '',
                    accountantId: '',
                    accountantName: '',
                    accountantEmail: '',
                    contactNo: "",
                    contactNoFormated: "",
                    invoiceClosingDate: '',
                    invoicePaymentDate: '',
                    paymentMode: []
                },
                accountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                otherBankAccountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                accountType: '',
                assignedRoles: '',
                companyBusinessCategory: [],
                companyRoleSelection: [false, false, false],
                isApprovalDone: false,
                companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
                roleIndex: -1,
                paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
                bankPayment: true
            },
            processorPartnerInfo: {
                agreementPartnerInfoId: '',
                companyId: '',
                companyName: '',
                companyZipCode: '',
                companyZipCodeFormated: '',
                companyAddress: '',
                contactNo: '',
                contactNoFormated: '',
                personInChargeId: '',
                personInChargeName: '',
                personInchargeEmail: '',
                accountantInfo: {
                    companyId: '',
                    accountantId: '',
                    accountantName: '',
                    accountantEmail: '',
                    contactNo: "",
                    contactNoFormated: "",
                    invoiceClosingDate: '',
                    invoicePaymentDate: '',
                    paymentMode: []
                },
                accountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                otherBankAccountInfo: {
                    companyId: '',
                    bankAccountId: '',
                    bankName: '',
                    branchName: '',
                    accountNumber: '',
                    accountName: '',
                },
                accountType: '',
                assignedRoles: '',
                companyBusinessCategory: [],
                companyRoleSelection: [false, false, false],
                isApprovalDone: false,
                companyCategorySelection: JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory)),
                roleIndex: -1,
                paymentMethodSelection: AppConstant.AGREEMENT_PARTNER_PAYMENT_METHOD,
                bankPayment: true
            },
            agreementWasteTransportInfo: [],
            agreementWasteProcessInfo: [],

            agreementRemark: ''
        },
        menifestoStatus: '',
        manualManifesto: {
            date: '',
            dateView: '',
            deliveryNo: '',
            manifestoNo: '',
            refNo: '',
            dumperInfo: {
                companyId: '',
                personInChargerId: '',
                personInchargeEmail: '',
                personName: '',
                businessName: '',
                zipCode: '',
                address: '',
                contactNo: '',
                workPlace: '',
                workZip: '',
                workAddress: '',
                workContactNo: '',
            },
            manifestoDisposeWasteInfo: [
                {
                    collectionId: '',
                    wasteId: '',
                    wasteName: '',
                    unit: '',
                    shape: '',
                    wastePackage: '',
                    quantity: 0,
                    transportPrice: 0
                }
            ],
            manifestoProcessWasteInfo: [
                {
                    collectionId: '',
                    wasteId: '',
                    wasteName: '',
                    unit: '',
                    shape: '',
                    wastePackage: '',
                    quantity: 0,
                    establishedQuantity: 0,
                    processPrice: 0,
                }
            ],
            transhipmentInfo: {
                storageName: '',
                inCharge: '',
                zipCode: '',
                address: '',
            },
            transportInfo: {
                companyId: '',
                personInChargerId: '',
                personInchargeEmail: '',
                personName: '',
                businessName: '',
                zipCode: '',
                address: '',
                contactNo: '',
                vehicleNo: '',
                vehicleType: '',
                transportMethod: '',
                transportComplateDate: '',
                transportComplateDateB2: '',
                transportComplateDateView: '',
                transportComplateDateB2View: '',
                driverName: '',
            },
            totalQuantity: 0,
            processorInfo: {
                companyId: '',
                personInChargerId: '',
                personInchargeEmail: '',
                personName: '',
                businessName: '',
                zipCode: '',
                address: '',
                contactNo: '',
                processingComplateDate: '',
                processingComplateDateView: '',
                processingComplateDateC2: '',
                processingComplateDateC2View: '',
                disposeComplateDate: '',
                disposeComplateDateView: '',
                finalDisposeComplateDate: '',
                finalDisposeComplateDateView: ''
            },
            additionalInfo: '',
        },
        manifestoType: '',
        manualEdit: true,
        isCheck: false,
        invoiceGenerated: false,
        project: {} as ProjectInfoFetch
    }
}
