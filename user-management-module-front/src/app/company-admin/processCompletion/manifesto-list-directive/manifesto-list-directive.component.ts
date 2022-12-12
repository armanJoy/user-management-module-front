import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfoUpdate } from 'src/app/models/backend-fetch/business-agreement';
import { AddTripPopupData, BackEndToFrontendConvertFetch, DriverBandView, DriverInfoFetch, PickInfo, TripInfo, TripPlanFetch, VehicleInfoFetch, VehicleInfoViewMatrix } from 'src/app/models/backend-fetch/create-schedule';
import { DisposalInfoFetch, ProjectInfoFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { HandoverWastePickAndPackage, ManifestoTripInfo, MenifestoInfo } from 'src/app/models/backend-fetch/menifesto';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { LoadUnloadService } from 'src/app/services/operation-services/load-unload.service';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AddTripPopupComponent } from '../../create-schedule/add-trip-popup/add-trip-popup.component';
import { CompleteManifestoProcessComponent } from '../../menifesto/complete-manifesto-process/complete-manifesto-process.component';
import { ManualmenifestoTabComponent } from '../../menifesto/manualmenifesto-tab/manualmenifesto-tab.component';
import { QrCodePopupComponent } from '../../menifesto/qr-code-popup/qr-code-popup.component';

@Component({
    selector: 'app-manifesto-list-directive',
    templateUrl: './manifesto-list-directive.component.html',
    styleUrls: ['./manifesto-list-directive.component.css']
})
export class ManifestoListDirectiveComponent implements OnInit {

    @Input()
    fromAddDate!: boolean;

    @Input()
    fromCashManifestoTab!: boolean;

    @Input()
    onSelectionChanage!: (item: MenifestoInfo, event: any, isChecked: boolean) => void;

    @Input()
    fromProcessCompletion: boolean = false;

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
    generateReport!: (item: MenifestoInfo) => void;

    @Input()
    createManifesto!: (item: MenifestoInfo, isNew: boolean) => void;

    @Input()
    projectName!: string;

    @Input()
    manifestoInfoList: MenifestoInfo[] = [];

    @Input()
    addDatetab: boolean = false;

    @Input()
    selectedManifesto: MenifestoInfo[] = [];

    constructor(private initiateProjectOperationService: InitiateProjectOperationService, private menifestoService: MenifestoService, private breakpointObserver: BreakpointObserver, private utilService: UtilService, private languageService: LanguageService, public dialog: MatDialog, private loadUnloadService: LoadUnloadService, private createScheduleOperationService: CreateScheduleOperationService) { }

    componentCode: string = '';
    isSystemAdmin: boolean = false;
    generatedManifesto: string = AppConstant.MANIFESTO_TYPE_GENERATED;
    manualManifestoType: string = AppConstant.MANIFESTO_TYPE_MANUAL;
    loadedStatus = AppConstant.MENIFESTO_STATUS_LOADED
    unloadedStatus = AppConstant.MENIFESTO_STATUS_UNLOADED
    completedStatus = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS

    project!: ProjectInfoFetch;
    companyId: string = this.utilService.getCompanyIdCookie();

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.MENIFESTO_LIST;

        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        debugger
        this.getVehicleList();

    }

    vehicleList: VehicleInfoFetch[] = [];
    driverList: DriverInfoFetch[] = [];

    getVehicleList() {
        this.createScheduleOperationService.getVehicleList(this.companyId).subscribe((data) => {
            if (data) {
                this.vehicleList = data;
            }
            this.getDriverList();
        });
    }

    getDriverList() {
        this.createScheduleOperationService.getDriverList(this.companyId).subscribe((data) => {
            if (data) {
                this.driverList = data;
            }
        });
    }

    getManualManifestoDisposalInfo(manifestoId: string, callBack: any) {
        this.menifestoService.getManualManifestoDispose(manifestoId).subscribe(response => {
            callBack(response);
        })
    }

    getManualManifestoTrip(manifestoId: string, callBack: any) {
        this.menifestoService.getManualManifestoTrip(manifestoId).subscribe(response => {
            callBack(response)
        })
    }

    isTransporterCompany(selectedAgreement: AgreementInfoUpdate) {

        return (selectedAgreement.dumperPartnerInfo && selectedAgreement.dumperPartnerInfo.assignedRoles == this.transporterCompanyTitle && selectedAgreement.dumperPartnerInfo.companyId == this.companyId) ?
            true :
            (((selectedAgreement.transporterPartnerInfo && selectedAgreement.transporterPartnerInfo.assignedRoles == this.transporterCompanyTitle && selectedAgreement.transporterPartnerInfo.companyId == this.companyId)) ?
                true :
                (((selectedAgreement.processorPartnerInfo && selectedAgreement.processorPartnerInfo.assignedRoles == this.transporterCompanyTitle && selectedAgreement.processorPartnerInfo.companyId == this.companyId)) ?
                    true :
                    false));

    }

    prepareCurrentDateForNewTrip(): BackEndToFrontendConvertFetch {
        var date: string = this.utilService.getCurrentDate();

        var currentDateForTrip: BackEndToFrontendConvertFetch = {
            backendDate: date,
            frontendDate: date,
            frontendDateView: ""
        }

        return currentDateForTrip;
    }

    manualManifestoTrip(manifestoId: string) {
        debugger
        this.getManualManifestoDisposalInfo(manifestoId, (disposalInfo: DisposalInfoFetch) => {
            if (disposalInfo) {
                this.getManualManifestoTrip(manifestoId, (manifestoTrip: TripInfo) => {

                    var date = (manifestoTrip && manifestoTrip.tripInfoId) ? {
                        frontendDate: manifestoTrip.pickUpDate,
                        frontendDateView: manifestoTrip.pickUpDate,
                        backendDate: manifestoTrip.pickUpDate
                    } : this.prepareCurrentDateForNewTrip();

                    this.prepareAddTripPopupData(this.vehicleList[0], date, this.driverList, disposalInfo);

                    // var tripPlanForDate: TripPlanFetch = this.prepareDetailPopupData(vehicleTrips, date);

                    var tripInfo = manifestoTrip;
                    this.addTripPopupData.tripInfo = (manifestoTrip && manifestoTrip.tripInfoId) ? JSON.parse(JSON.stringify(manifestoTrip)) : this.addTripPopupData.tripInfo;
                    this.addTripPopupData.pickInfo.quantity = (this.addTripPopupData.tripInfo.pickList && this.addTripPopupData.tripInfo.pickList.length > 0) ? this.addTripPopupData.tripInfo.pickList[this.addTripPopupData.tripInfo.pickList.length - 1].quantity : this.addTripPopupData.pickInfo.quantity;

                    // this.driverBandViewList = this.prepareDriverScheduleData(date);
                    var driverBandViewList = null;
                    var vehicleTrips = null;

                    const dialogRef = this.dialog.open(AddTripPopupComponent, {
                        width: "100%",
                        data: {
                            addTrip: this.addTripPopupData,
                            driverView: driverBandViewList,
                            editPopup: true,
                            vehicleTrips: vehicleTrips,
                            date: date,
                            companyVehicleList: this.vehicleList
                        },

                        disableClose: true
                    });

                    dialogRef.afterClosed().subscribe(response => {

                        var pickInfoOfThisTrip: PickInfo = {} as PickInfo;
                        if (tripInfo.pickList && tripInfo.pickList.length > 0) {
                            pickInfoOfThisTrip = JSON.parse(JSON.stringify(tripInfo.pickList[0]));
                        }

                        if (response) {

                            if (response.toSave) {

                                const manifestoTripInfo: ManifestoTripInfo = this.prepareTripInfoForSave(response.popupData.tripInfo, manifestoId, disposalInfo.disposalInfoId);

                                this.menifestoService.saveManifestoTrip(manifestoTripInfo).subscribe((savedTrip) => {

                                })
                            }

                        }
                    })

                })
            }
        })
    }

    prepareTripInfoForSave(projectTripInfo: TripInfo, manifestoId: string, manifestoPickId: string): ManifestoTripInfo {
        var manifestoTripInfo: ManifestoTripInfo = {
            tripInfoId: projectTripInfo.tripInfoId,
            pickUpDate: projectTripInfo.pickUpDate,
            pickUpTime: projectTripInfo.startTime,
            dropTime: projectTripInfo.endTime,
            vehicleId: projectTripInfo.vehicleId,
            driverId: projectTripInfo.driverId,
            companyId: projectTripInfo.companyId,
            manifestoPickId: manifestoPickId,
            manifestoId: manifestoId
        }

        return manifestoTripInfo;
    }

    prepareDetailPopupData(vehicleTrips: VehicleInfoViewMatrix, selectDate: BackEndToFrontendConvertFetch): TripPlanFetch {
        var tripPlan: TripPlanFetch = {} as TripPlanFetch;
        vehicleTrips.tripPlan.forEach(item => {
            if (item.date == selectDate.backendDate) {
                tripPlan = item;
            }
        });
        return tripPlan;
    }

    prepareAddTripPopupData(vehicleInfo: VehicleInfoFetch, selectDate: BackEndToFrontendConvertFetch, driverList: DriverInfoFetch[], disposalInfo: DisposalInfoFetch) {

        this.addTripPopupData.driverList = driverList;

        this.addTripPopupData.diposalInfo = disposalInfo;

        this.addTripPopupData.selectedDay = selectDate;

        this.addTripPopupData.vehicleInfo = vehicleInfo;

        this.addTripPopupData.tripInfo = this.prepareTripInfo(vehicleInfo, selectDate);

        this.addTripPopupData.pickInfo = this.preparePick(disposalInfo, this.addTripPopupData.tripInfo.tripInfoId);

    }

    prepareTripInfo(vehicleInfo: VehicleInfoFetch, selectDate: BackEndToFrontendConvertFetch) {
        var tripInfo: TripInfo = {
            tripInfoId: this.utilService.generateUniqueId(),
            pickUpDate: selectDate.backendDate,
            companyId: vehicleInfo.companyId,
            vehicleId: vehicleInfo.vehicleId,
            driverId: "",
            driverName: "",
            endTime: "",
            endTimeView: "",
            // pickList:[],
            pickList: [],
            startTime: "",
            startTimeView: "",
            vehicleName: "",
        }

        return tripInfo;

    }

    preparePick(disposalInfo: DisposalInfoFetch, tripId: string) {
        var pickInfo: PickInfo = {
            pickId: this.utilService.generateUniqueId(),
            disposalId: disposalInfo.disposalInfoId,
            tripId: tripId,
            quantity: disposalInfo.quantity,
            disposalInfo: disposalInfo,
            loadStatus: ''
        }
        return pickInfo;

    }

    // editTrip = (tripId: string, tripList: TripInfo[], vehicleTrips: VehicleInfoViewMatrix, date: BackEndToFrontendConvertFetch) => {


    // }

    addTripPopupData: AddTripPopupData = {
        driverList: [],
        diposalInfo: {} as DisposalInfoFetch,
        selectedDay: {} as BackEndToFrontendConvertFetch,
        vehicleInfo: {} as VehicleInfoFetch,
        tripInfo: {
            companyId: "",
            tripInfoId: "",
            pickUpDate: "",
            startTime: "",
            endTime: "",
            startTimeView: "",
            endTimeView: "",
            driverId: "",
            driverName: "",
            vehicleId: "",
            vehicleName: "",
            pickList: []
        },
        pickInfo: {
            pickId: "",
            disposalId: "",
            quantity: 0,
            tripId: "",
            disposalInfo: {
                transportDistance: 0,
                projectId: "",
                projectTitle: "",
                disposalInfoId: "",
                disposalViewId: "",
                collectionId: "",
                fromDate: "",
                startBackendDate: "",
                toDate: "",
                endBackendDate: "",
                fromDateView: "",
                toDateView: "",
                quantity: 0,
                planQuantity: 0,
                remainingQuantity: 0,
                wasteTypeId: "",
                wasteTypeName: "",
                wasteItemId: "",
                wasteItemName: "",
                pickLocation: "",
                pickZipCode: "",
                dropLocation: "",
                dropZipCode: "",
                isParent: false,
                unit: "",
                price: 0,
                disposeWisePickList: [],
                scheduleConfirmStatus: "0",
                wasteShape: '',
                wastePackage: ''

            },
            loadStatus: "0"
        }
    }

    detailsVeiw(manifesto: MenifestoInfo, event: any) {

        this.utilService.stopEventPropagation(event);

        this.menifestoService.getMenifestoDetailInfo(manifesto.menifestoInfoId).subscribe(menifestoResponse => {
            if (menifestoResponse) {

                if (menifestoResponse.projectId) {

                    this.initiateProjectOperationService.getProjectBasicInfo(menifestoResponse.projectId).subscribe(project => {
                        if (project) {
                            menifestoResponse.project = project;
                            var companyIds: string[] = this.initiateProjectOperationService.getProjectPartnerCompanyIds(menifestoResponse.project);
                            menifestoResponse.project.projectViewerIds = this.utilService.getProjectViewerIds(companyIds, menifestoResponse.project.companyId);

                            const sampleDialog = this.dialog.open(ManualmenifestoTabComponent, {
                                width: '75%',
                                height: '85%',
                                data: {
                                    manifestoData: menifestoResponse,
                                    flag: true
                                },
                                // disableClose: true
                            });
                        }
                    })

                } else {
                    const sampleDialog = this.dialog.open(ManualmenifestoTabComponent, {
                        width: '75%',
                        height: '85%',
                        data: {
                            manifestoData: menifestoResponse,
                            flag: true
                        },
                        // disableClose: true
                    });
                }


            }
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

    uiLabels: any = {
        listHeader: "Manifesto List",
        addDate: "Add Date",
        receiveDate: "Receive Date",
        projectName: "Projec Name",
        wasteItems: "Waste Items",
        dumperCompanyName: "Dumper Company Name",
        processorCompanyName: "Processor Company Name",
        transportCompanyName: "Transport Company Name",
        inOperation: "In Operation",
        completed: "Completed",
        filter: "Filter",
        details: "Details"

    }

    getManifestoBasicInfo(manifesto: MenifestoInfo, event: any) {
        debugger
        // let isHandled = false;
        // if (event.stopPropagation) {
        //     event.stopPropagation();
        //     isHandled = true;
        // }
        // if (event.preventDefault) {
        //     event.preventDefault();
        //     isHandled = true;
        // }
        this.utilService.stopEventPropagation(event);

        if (!manifesto.isBasicInfoFetched) {

            this.menifestoService.getMenifestoBasicInfo(manifesto.menifestoInfoId).subscribe(response => {
                if (response) {

                    if (manifesto.projectId && manifesto.manifestoType == this.generatedManifesto) {
                        this.initiateProjectOperationService.getProjectBasicInfo(manifesto.projectId).subscribe(project => {
                            if (project) {

                                // this.initiateProjectOperationService.prepareProjectViewModel(project, this.projectProcessDef, this.companyId, false, (preparedProject: ProjectInfoFetch) => {
                                //     this.project = JSON.parse(JSON.stringify(preparedProject));
                                response.isOpen = manifesto.isOpen;
                                response.project = project;
                                response.isCheck = manifesto.isCheck;
                                this.prepareManifestoBasicInfoForView(response, JSON.parse(JSON.stringify(project)));
                                // });
                            }
                        });
                    } else {
                        response.isOpen = manifesto.isOpen;
                        response.isCheck = manifesto.isCheck;
                        this.prepareManifestoBasicInfoForView(response);
                    }
                }
            })
        } else {
            manifesto.isOpen = (manifesto.isOpen) ? false : true;
        }
    }

    prepareManifestoBasicInfoForView(manifesto: MenifestoInfo, project?: ProjectInfoFetch) {

        var companyIds: string[] = [manifesto.aggrementInfo.dumperPartnerInfo.companyId, manifesto.aggrementInfo.transporterPartnerInfo.companyId, manifesto.aggrementInfo.processorPartnerInfo.companyId]
        var creatorId: string = (manifesto.project) ? manifesto.project.companyId : "";
        manifesto.viewerCompanyIds = this.utilService.getProjectViewerIds(companyIds, creatorId);


        var index = this.manifestoInfoList.findIndex(item => item.menifestoInfoId == manifesto.menifestoInfoId);
        if (index >= 0) {
            this.manifestoInfoList[index] = manifesto;
        }
        manifesto.isBasicInfoFetched = true;
        manifesto.isOpen = (manifesto.isOpen) ? false : true;
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

    completeProcess(event: any, manifesto: MenifestoInfo) {

        this.menifestoService.getMenifestoDetailInfo(manifesto.menifestoInfoId).subscribe(response => {
            if (response) {
                const sampleDialog = this.dialog.open(CompleteManifestoProcessComponent, {
                    width: '75%',
                    height: '85%',
                    data: {
                        manifestoData: response,
                        flag: true
                    },
                    // disableClose: true
                });

                sampleDialog.afterClosed().subscribe(response => {
                    if (response) {

                        var index = this.manifestoInfoList.findIndex(item => item.menifestoInfoId == manifesto.menifestoInfoId);
                        if (index >= 0) {
                            response.isOpen = true;
                            response.isBasicInfoFetched = true;
                            response.project = manifesto.project;
                            this.manifestoInfoList[index] = response;
                        }
                    }
                })
            }
        })

        let isHandled = false;
        if (event.stopPropagation) {
            event.stopPropagation();
            isHandled = true;
        }
        if (event.preventDefault) {
            event.preventDefault();
            isHandled = true;
        }

    }

    loadOp = AppConstant.LOAD_OP;
    unloadOp = AppConstant.UNLOAD_OP;
    redirectToMobileApp(manifestoBasicInfo: MenifestoInfo, opType: string) {

        this.menifestoService.getMenifestoDetailInfo(manifestoBasicInfo.menifestoInfoId).subscribe(manifesto => {
            if (manifesto) {
                if (opType == AppConstant.LOAD_OP) {
                    var tripId: string = manifesto.tripIds[0];
                    var pickId: string = manifesto.pickIdDef[0].pickId;
                    const isManualManifestoTrip: boolean = this.menifestoService.isManifestoTrip(manifesto);

                    this.redirectToLoadOp(tripId, pickId, isManualManifestoTrip);

                } else if (opType == AppConstant.UNLOAD_OP) {

                    this.loadUnloadService.redirectToUnloadOp();
                }
            }
        })
    }

    redirectToLoadOp(tripId: string, pickId: string, isManualManifestoTrip: boolean) {

        this.loadUnloadService.getTripPlan(tripId, isManualManifestoTrip).subscribe(tripPlan => {
            if (tripPlan) {
                var pickIndex = tripPlan.pickList.findIndex(item => item.pickId == pickId);

                this.loadUnloadService.loadPick(tripPlan, pickIndex, tripPlan.pickUpDateView);
            }
        })
    }

    updateSelectedItemList(item: any, event: any) {
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

        var itemIndex: number = this.selectedManifesto.findIndex(each => each.menifestoInfoId == item.menifestoInfoId);

        if (item.isCheck && itemIndex < 0) {
            this.selectedManifesto.push(JSON.parse(JSON.stringify(item)));

        } else if (!item.isCheck && itemIndex >= 0) {
            this.selectedManifesto.splice(itemIndex, 1);
        }

        if (this.addDatetab) {
            this.onRemove(item);
        }

        if (this.fromCashManifestoTab) {
            this.onSelectionChanage(item, event, item.isCheck);
        }
    }

    onRemove(item: any) {
        var itemIndex: number = this.manifestoInfoList.findIndex(each => each.menifestoInfoId == item.menifestoInfoId);

        if (!item.isCheck && itemIndex >= 0) {
            this.manifestoInfoList.splice(itemIndex, 1);
        }
    }

    showQrCode(manifestoBasicInfo: MenifestoInfo, event: any) {

        this.utilService.stopEventPropagation(event);

        this.menifestoService.getMenifestoDetailInfo(manifestoBasicInfo.menifestoInfoId).subscribe(manifesto => {
            if (manifesto) {

                var tripId: string = manifesto.tripIds[0];
                var pickId: string = manifesto.pickIdDef[0].pickId;
                const isManualManifestoTrip: boolean = this.menifestoService.isManifestoTrip(manifesto);

                this.loadUnloadService.getTripPlan(tripId, isManualManifestoTrip).subscribe(tripPlan => {
                    if (tripPlan) {
                        var pickList: any[] = [];
                        var pickInfo: any = tripPlan.pickList.find(item => item.pickId == pickId);
                        if (pickInfo) {
                            pickList.push(pickInfo);
                        }

                        var qrCodeData: HandoverWastePickAndPackage = this.menifestoService.generateWasteHandoverQrCodeFromPickList(pickList, tripId, manifesto.aggrementInfo.dumperPartnerInfo.companyId);

                        const qrCodeDialog = this.dialog.open(QrCodePopupComponent, {
                            width: '40%',
                            height: '55%',
                            data: qrCodeData
                        });

                    }
                })
            }
        })
    }

    printReport(menifestoInfoId: string, event: any) {
        this.utilService.stopEventPropagation(event);
        this.menifestoService.printReport(menifestoInfoId);
    }

    editManifesto(item: MenifestoInfo, isNew: boolean, event: any) {

        this.utilService.stopEventPropagation(event);
        this.createManifesto(item, isNew);
    }

    openProjectViewPopup(project: ProjectInfoFetch, event: any) {
        debugger
        this.utilService.stopEventPropagation(event);

        this.projectViewPopupOpen(project);
    }

    showDumperSection(item: MenifestoInfo) {
        return (item.viewerCompanyIds?.includes(item.aggrementInfo.dumperPartnerInfo.companyId) && item.aggrementInfo.dumperPartnerInfo.assignedRoles == this.dumperCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.transporterPartnerInfo.companyId) && item.aggrementInfo.transporterPartnerInfo.assignedRoles == this.dumperCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.processorPartnerInfo.companyId) && item.aggrementInfo.processorPartnerInfo.assignedRoles == this.dumperCompanyTitle) ? true : false;
    }

    showTransporterSection(item: MenifestoInfo) {
        return (item.viewerCompanyIds?.includes(item.aggrementInfo.dumperPartnerInfo.companyId) && item.aggrementInfo.dumperPartnerInfo.assignedRoles == this.transporterCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.transporterPartnerInfo.companyId) && item.aggrementInfo.transporterPartnerInfo.assignedRoles == this.transporterCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.processorPartnerInfo.companyId) && item.aggrementInfo.processorPartnerInfo.assignedRoles == this.transporterCompanyTitle) ? true : false
    }

    showProcessorSection(item: MenifestoInfo) {
        return (item.viewerCompanyIds?.includes(item.aggrementInfo.dumperPartnerInfo.companyId) && item.aggrementInfo.dumperPartnerInfo.assignedRoles == this.processorCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.transporterPartnerInfo.companyId) && item.aggrementInfo.transporterPartnerInfo.assignedRoles == this.processorCompanyTitle) || (item.viewerCompanyIds?.includes(item.aggrementInfo.processorPartnerInfo.companyId) && item.aggrementInfo.processorPartnerInfo.assignedRoles == this.processorCompanyTitle) ? true : false;
    }

}
