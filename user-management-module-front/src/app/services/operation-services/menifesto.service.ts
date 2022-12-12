import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfoUpdate, AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { TripInfo } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { HandoverWastePickAndPackage, ManifestoDisposeWasteInfo, ManifestoProcessWasteInfo, ManifestoTripInfo, MenifestoInfo, MenifestoTripDef, MenifestoWaste, MenifestReportCallData, MenifestReportData, PickInfo, SearchDate } from 'src/app/models/backend-fetch/menifesto';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';
import { UtilService } from '../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})

export class MenifestoService {

    BASE_URL: string = environment.serverUrl;

    constructor(private httpClient: HttpClient, private languageService: LanguageService, private uriService: UriService, private utilService: UtilService) { }

    isManifestoTrip(manifesto: MenifestoInfo) {
        return (manifesto.manifestoType == AppConstant.MANIFESTO_TYPE_MANUAL) ? true : false;
    }

    saveManifestoTrip(manifestoTrip: ManifestoTripInfo): Observable<ManifestoTripInfo> {
        var url = '/menifesto/save-manifesto-trip';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifestoTrip);
    }

    getManualManifestoDispose(manifestoId: string): Observable<DisposalInfoFetch> {
        var url = '/menifesto/get-manifesto-dispose';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifestoId);
    }

    getManualManifestoTrip(manifestoId: string): Observable<TripInfo> {
        var url = '/menifesto/get-manifesto-trip';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifestoId);
    }

    generateWasteHandoverQrCodeFromPickList(pickList: any[], tripInfoId: string, companyId: string): HandoverWastePickAndPackage {
        var handoverWastePickAndPackage: HandoverWastePickAndPackage = {
            companyId: companyId,
            tripInfoId: tripInfoId,
            pickIdList: [],

        }

        pickList.forEach(element => {
            handoverWastePickAndPackage.pickIdList.push(element.pickId);
        });

        return handoverWastePickAndPackage;
    }

    getDateAsFrontendFormat(date: string): Observable<any> {
        var url = '/util/get-date-view';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, date);
    }

    checkDateValidity(date: string) {
        var url = '/util/check-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, date);
    }

    public getMenifestoInitialInfo(searchDate: SearchDate, pageNo: number, searchText: string, status: string,): Observable<MenifestoInfo[]> {
        var url = '/menifesto/initial-menifesto-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, searchDate, pageNo, searchText, status);
    }

    public getMenifestoBasicInfo(manifestoId: string): Observable<MenifestoInfo> {
        var url = '/menifesto/menifesto-basic-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifestoId);
    }

    public getMenifestoDetailInfo(manifestoId: string): Observable<MenifestoInfo> {
        var url = '/menifesto/menifesto-details';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifestoId);
    }

    public getMenifestoInfoByProject(projectId: string): Observable<MenifestoInfo[]> {
        var url = '/menifesto/project-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectId);
    }

    public saveMenifestoInfo(manifesto: MenifestoInfo): Observable<MenifestoInfo> {
        var url = '/menifesto/save-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifesto);
    }

    public savePorcessComaplateDate(manifesto: MenifestoInfo[]): Observable<string> {
        var url = '/menifesto/save-process-complete-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, manifesto);
    }

    public getMenifestoInfo(searchDate: SearchDate, pageNo: number, searchText: string, status: string,): Observable<MenifestoInfo[]> {
        var url = '/menifesto/get-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, searchDate, pageNo, searchText, status);
    }

    public getGeneratedMenifestoInfo(companyId: string, pageNo: number, searchText: string, status: string): Observable<MenifestoInfo[]> {
        var url = '/menifesto/get-generated-menifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    }

    getManifestoData(pickId: string, isManifestoTrip: boolean): Observable<MenifestoInfo> {
        var url = '/mob/menifesto/get-menifesto-by-pick';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, pickId, 0, "", "", isManifestoTrip);
    }

    getManifestoAndReportByPickId(pickId: string, isManifestoTrip: boolean) {
        this.getManifestoData(pickId, isManifestoTrip).subscribe(response => {
            if (response && response.menifestoInfoId) {
                this.downloadManifestoReport(response.menifestoInfoId);
            } else {
                this.utilService.showSnackbar('Manifesto is not generated yet', 3000);
            }
        })
    }



    printReport(menifestoInfoId: string) {

        this.downloadManifestoReport(menifestoInfoId);

        // var manifestoReportLabelComponentCode = AppConstant.COMP.MENIFESTO_LIST;
        // var manifestoReportLabel = this.languageService.getUiLabels(manifestoReportLabelComponentCode, AppConstant.UI_LABEL_TEXT);

        // this.getMenifestoDetailInfo(menifestoInfoId).subscribe(response => {
        //     if (response) {
        //         var menifestReportCallData: MenifestReportCallData = this.prepareReportGenData(response, manifestoReportLabel);

        //         this.generateReport(menifestReportCallData);
        //     }
        // })
    }

    public getAgreementPartnerInfoByAgreementAndCompanyId(agreementId: string, companyId: string): Observable<AgreementPartnerInfo> {
        var url = '/agreement/agreement-partner-detail';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { agreementId: agreementId, companyId: companyId });
    }

    findAgreementPartnerInfoFromProject(companyId: string, project: ProjectInfoFetch, callBack: any) {
        if (project && project.agreementInfo) {

            project.agreementInfo.forEach(eachAgreement => {
                if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.companyInfoId == companyId) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.companyInfoId == companyId) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.companyInfoId == companyId)) {
                    this.getAgreementPartnerInfoByAgreementAndCompanyId(eachAgreement.agreementId, companyId).subscribe(response => {
                        callBack(response);
                    })
                }
            })
        }
    }

    prepareReportGenData(menifesto: MenifestoInfo, manifestoReportLabel: any): MenifestReportCallData {

        var menifestReportCallData: MenifestReportCallData = {} as MenifestReportCallData;

        menifestReportCallData.designFile = AppConstant.MANIFESTO_REPORT_FILE_NAME;
        menifestReportCallData.outputName = AppConstant.MANIFESTO_REPORT_TYPE;
        menifestReportCallData.format = AppConstant.REPORT_FILE_FORMAT_PDF;
        menifestReportCallData.parameters = {} as MenifestReportData;

        var date: string = menifesto.dateView.substring(0, menifesto.dateView.indexOf(" "));

        menifestReportCallData.parameters = {
            title: manifestoReportLabel.title,
            refLabel: manifestoReportLabel.refLabel,
            refNo: '1234',
            dateLabel: manifestoReportLabel.dateLabel,
            date: date,
            manifestoLabel: manifestoReportLabel.manifestoLabel,
            manifestoNo: menifesto.menifestoUniqueId,
            issuersName: menifesto.aggrementInfo.dumperPartnerInfo.companyName,
            issuersNameLabel: manifestoReportLabel.issuersNameLabel,
            numberLabel: manifestoReportLabel.numberLabel,
            numberValue: '001',
            dateValue: date,
            dumperCompanyInfoLabel: manifestoReportLabel.dumperCompanyInfoLabel,
            dumperCompanyNameLabel: manifestoReportLabel.dumperCompanyNameLabel,
            companyName: '',
            address: '',
            addressLabel: manifestoReportLabel.addressLabel,
            personLabel: manifestoReportLabel.personLabel,
            personInCharge: '',
            contactNoLabel: manifestoReportLabel.contactNoLabel,
            dumperCompanyContactNo: '',
            pickLocationContactNo: '',
            wastepickLocation: '',
            pickLocationInCharge: '',
            sightInfoLabel: manifestoReportLabel.sightInfoLabel,
            confirmationDateLabel: manifestoReportLabel.confirmationDateLabel,
            sealAndSignLabel: manifestoReportLabel.sealAndSignLabel,
            dumperHandOverDate: menifesto.manualManifesto.dateView.substring(0, menifesto.manualManifesto.dateView.indexOf(" ")),
            loadDateB1: menifesto.manualManifesto.transportInfo.transportComplateDateView.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateView.indexOf(" ")),
            transportComplateDate: menifesto.manualManifesto.transportInfo.transportComplateDateB2View.substring(0, menifesto.manualManifesto.transportInfo.transportComplateDateB2View.indexOf(" ")),
            receiveComplateDate: menifesto.manualManifesto.processorInfo.processingComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateView.indexOf(" ")),
            processComplatedateC2: menifesto.manualManifesto.processorInfo.processingComplateDateC2View.substring(0, menifesto.manualManifesto.processorInfo.processingComplateDateC2View.indexOf(" ")),
            processComplateDate: menifesto.manualManifesto.processorInfo.disposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.disposeComplateDateView.indexOf(" ")),
            finalDisposalDate: menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.substring(0, menifesto.manualManifesto.processorInfo.finalDisposeComplateDateView.indexOf(" ")),
            tableHeaderLabel: manifestoReportLabel.tableHeaderLabel,
            unitlabel: manifestoReportLabel.unitlabel,
            manifestoData: '',
            userNameLabel: manifestoReportLabel.userNameLabel,
            intermediateProcessingWaste: manifestoReportLabel.intermediateProcessingWaste,
            finalDisposalLocation: '',
            finalDisposalLocationlabel: manifestoReportLabel.finalDisposalLocationlabel,
            locationName: '',
            locationNameLabel: manifestoReportLabel.locationNameLabel,
            transporter1Label: manifestoReportLabel.transporter1Label,
            transporter2Label: manifestoReportLabel.transporter2Label,
            transporterCompanyNameLabel: manifestoReportLabel.transporterCompanyNameLabel,
            disposalContactorLabel: manifestoReportLabel.disposalContactorLabel,
            transhipmentLabel: manifestoReportLabel.transhipmentLabel,
            consignment1Label: manifestoReportLabel.consignment1Label,
            consignment2Label: manifestoReportLabel.consignment2Label,
            consignmentDisposalLabel: manifestoReportLabel.consignmentDisposalLabel,
            finalDisposalDateLabel: manifestoReportLabel.finalDisposalDateLabel,
            additionalInfoLabel: manifestoReportLabel.additionalInfoLabel,
            additionalInfo: menifesto.manualManifesto.additionalInfo,
            userName: '',
            processingWaste: 'None',
            transporterAddress: '',
            transporterCompanyName: '',
            transportCompanyContactNo: '',
            transportInCharge: '',
            processorCompanyAddress: '',
            processorCompanyContactNo: '',
            menifestoStatus: menifesto.menifestoStatus,
            serialNumberLabel: manifestoReportLabel.serialNumberLabel,
            wasteItemLabel: manifestoReportLabel.wasteItemLabel,
            tableUnitLabel: manifestoReportLabel.tableUnitLabel,
            shapeLabel: manifestoReportLabel.shapeLabel,
            packingLabel: manifestoReportLabel.packingLabel,
            quanitityLabel: manifestoReportLabel.quanitityLabel,
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

        // if (!menifesto.manualManifesto.dateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.dumperHandOverDate = date
        // } else
        if (!menifesto.manualManifesto.dateView) {
            menifestReportCallData.parameters.dumperHandOverDate = 'Not Given'
        }

        // if (!menifesto.manualManifesto.transportInfo.transportComplateDateView && menifesto.manifestoType == AppConstant.MANIFESTO_TYPE_GENERATED) {
        //     menifestReportCallData.parameters.loadDateB1 = date

        // } else
        if (!menifesto.manualManifesto.transportInfo.transportComplateDateView) {
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

        return menifestReportCallData;
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

    downloadManifestoReport(manifestoId: string) {
        var url = this.BASE_URL + '/menifesto/get-manifesto-report';
        var header: any = this.uriService.getHttpOptions();
        header.responseType = 'blob';
        this.httpClient.post(url, manifestoId, header).subscribe((res) => {
            if (res) {
                let blob = new Blob([res], { type: 'application/pdf' });
                let pdfUrl = window.URL.createObjectURL(blob);

                var PDF_link = document.createElement('a');
                PDF_link.href = pdfUrl;

                //   TO OPEN PDF ON BROWSER IN NEW TAB
                window.open(pdfUrl, '_blank');
                //   TO DOWNLOAD PDF TO YOUR COMPUTER
                // PDF_link.download = "TestFile.pdf";
                // PDF_link.click();
            }
        })
    }

    public ManifestoFormValidator = (data: MenifestoInfo) => {
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

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.MANUAL_MANIFESTO_TAB, AppConstant.UI_MESSAGE_TEXT);

        if (this.manifestoValidatorRepository.agreementValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.manifestoValidatorRepository.agreementValidator.controlId,
                controlName: this.manifestoValidatorRepository.agreementValidator[controlName],
                validations: []
            }
            this.manifestoValidatorRepository.agreementValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: AgreementInfoUpdate) => any; }) => {
                if (!eachValidation.function(data.aggrementInfo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.manifestoValidatorRepository.agreementValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.manifestoValidatorRepository.wasteListValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.manifestoValidatorRepository.wasteListValidator.controlId,
                controlName: this.manifestoValidatorRepository.wasteListValidator[controlName],
                validations: []
            }
            this.manifestoValidatorRepository.wasteListValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: ManifestoDisposeWasteInfo[]) => any; }) => {
                if (!eachValidation.function(data.manualManifesto.manifestoDisposeWasteInfo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.manifestoValidatorRepository.wasteListValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.manifestoValidatorRepository.manifestoNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.manifestoValidatorRepository.manifestoNoValidator.controlId,
                controlName: this.manifestoValidatorRepository.manifestoNoValidator[controlName],
                validations: []
            }
            this.manifestoValidatorRepository.manifestoNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.manualManifesto.manifestoNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.manifestoValidatorRepository.manifestoNoValidator.controlId],
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

    manifestoValidatorRepository: any = {

        agreementValidator: {
            controlId: 'agreementValidator',
            controlNameEng: 'Select Agreement',
            controlNameJpn: 'Select Agreement',
            validators: [
                {
                    function: (agreement: AgreementInfoUpdate) => {
                        return (agreement && agreement.agreementId) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please Select Agreement from Agreement List',
                    invalidMsgJpn: 'Please Select Agreement from Agreement List',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },

        wasteListValidator: {
            controlId: 'wasteListValidator',
            controlNameEng: 'Waste Item',
            controlNameJpn: 'Waste Item',
            validators: [
                {
                    function: (manifestoDisposeWasteInfo: ManifestoDisposeWasteInfo[]) => {
                        return (manifestoDisposeWasteInfo && manifestoDisposeWasteInfo.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Waste Item',
                    invalidMsgJpn: 'You cannot empty Waste Item',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },
        manifestoNoValidator: {
            controlId: 'manifestoNoValidator',
            controlNameEng: 'Manifesto No',
            controlNameJpn: 'Manifesto No',
            validators: [
                {
                    function: (manifestoDisposeWasteInfo: ManifestoDisposeWasteInfo[]) => {
                        return (manifestoDisposeWasteInfo && manifestoDisposeWasteInfo.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot empty Manifesto No',
                    invalidMsgJpn: 'You cannot empty Manifesto No',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        }
    }

}
