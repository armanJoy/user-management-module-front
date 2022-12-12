import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { AgreementInfoFetch, BranchInfoFetch, ProjectInfoFetch, AgreementPopupView, DisposalInfoFetch, wasteProcessInfoFetch, ProjectStatusUpdate, OwnApprovalStatus, ProjectFilter, AgreementPartnerCompanyFetch, AgreementPopupSaveDetails } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectAgreementPopupComponent } from '../select-agreement-popup/select-agreement-popup.component';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { InitiateProjectMenuComponent } from '../initiate-project-menu/initiate-project-menu.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AddressDropDownView, CompanyInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { ProjectActionConfirmPopupComponent } from '../project-action-confirm-popup/project-action-confirm-popup.component';
import { CreateScheduleOperationService } from 'src/app/services/operation-services/create-schedule-operation.service';
import { DisposeWisePickInfo, DriverInfoFetch, VehicleInfoFetch } from 'src/app/models/backend-fetch/create-schedule';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
import { MenifestoService } from 'src/app/services/operation-services/menifesto.service';
import { AgreementInfo } from 'src/app/models/backend-fetch/business-agreement';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { debug } from 'console';
@Component({
    selector: 'app-create-new-project-tab',
    templateUrl: './create-new-project-tab.component.html',
    styleUrls: ['./create-new-project-tab.component.css']
})
export class CreateNewProjectTabComponent implements OnInit {

    @Input()
    creatorCompanyInfo!: CompanyInfoFetch;

    @Input()
    selectedOperationFilter!: ProjectFilter;

    @Input()
    filterItems!: ProjectFilter[];

    @Input()
    projectProcessDef: any[] = [];

    @Input()
    selectedProcess!: any;

    @Input()
    isViewMode!: boolean;

    @ViewChild(InitiateProjectMenuComponent)
    child: any;

    @Input()
    projectList!: ProjectInfoFetch[];

    @Input()
    agreementList!: AgreementInfoFetch[];

    @Input()
    branchList!: BranchInfoFetch[];

    @Input()
    project!: ProjectInfoFetch;

    @Input()
    public selectTab!: (index: number) => void;

    @Input()
    isSelectAgreement!: boolean;

    @Input()
    companyName!: string;

    @Input()
    addressDropDownViewList!: AddressDropDownView[];

    @Input()
    addressDropDownModel: AddressDropDownView = {
        id: '',
        name: '',
        address: '',
        contactNo: '',
        zipcode: '',
    }
    notificationSetInfo: NotificationSetInfo = {
        contextId: "",
        companyId: "",
        baseTableId: "",
        trigerUserInfoId: "",
        status: {
            id: "",
            titleEng: "",
            titleJpn: ""
        }
    }

    componentCode!: string;
    companyId: string = '';
    isSystemAdmin: boolean = false;

    disposeWisePickView = false;
    isValidProjectTitle = false;
    modelObject: any;
    modelDateAttributeName: any;
    viewContent = false;
    isViewPopup = false;

    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);
    transporterRole = AppConstant.CATEGORY_NAME_TRANSPORTER;
    processorRole = AppConstant.CATEGORY_NAME_PROCESSOR;

    constructor(private businessAgreementService: BusinessAgreementService, private createScheduleOperationService: CreateScheduleOperationService, public dialogRef: MatDialogRef<CreateNewProjectTabComponent>, @Inject(MAT_DIALOG_DATA) public data: ProjectInfoFetch, private breakpointObserver: BreakpointObserver, private matDialog: MatDialog, private initiateProjectOperationService: InitiateProjectOperationService, private utilService: UtilService, private languageService: LanguageService, private menifestoService: MenifestoService) { }

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CREATE_NEW_PROJECT_TAB_COMPONENT;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

        this.companyId = this.utilService.getCompanyIdCookie();
        if (this.data.projectInfoId) {
            this.project = Object.assign({}, this.data);
            this.isViewPopup = true;
            this.project.wasteProcessInfo = this.prepareTotalPrice(this.project.wasteProcessInfo);
            this.project.wasteDisposalInfo = this.prepareDisposalViewId(this.project.wasteDisposalInfo);
        }

        this.project.companyId = (this.project.companyId) ? this.project.companyId : this.companyId;
        if (this.project && this.isViewPopup && this.project.projectScheduleStatus == AppConstant.PROJECT_SCHEDULE_CONFIRM_DONE) {

            this.getVehicleList();

        } else if (this.project) {
            if (!this.isViewPopup) {
                this.initiateProjectOperationService.prepareCreatorCompanyCategorySelection(this.project, this.creatorCompanyInfo, () => {
                    this.viewContent = true;
                })
            } else {
                this.viewContent = true;
            }

        }

        // this.prepareProjectCreatorRoleSelection(this.project);

        this.validProjectTitle(this.project.projectTitle);

    }

    prepareProjectCreatorRoleSelection(projectInfo: ProjectInfoFetch) {
        if (this.project && this.project.agreementInfo.length > 0) {
            this.project.agreementInfo.forEach(eachAgreement => {
                if (eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.companyInfoId == this.companyId && !this.project.creatorRole) {
                    this.project.creatorRole = eachAgreement.dumperPartner.assignRoles;
                }

                if (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.companyInfoId == this.companyId && !this.project.creatorRole) {
                    this.project.creatorRole = eachAgreement.transporterPartner.assignRoles;
                }

                if (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.companyInfoId == this.companyId && !this.project.creatorRole) {
                    this.project.creatorRole = eachAgreement.processorPartner.assignRoles;
                }
            })
        }

        projectInfo.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
        var companyCategorys: string = JSON.stringify(this.creatorCompanyInfo.companyBusinessCategory);
        if (projectInfo.companyCategorySelection) {
            projectInfo.companyCategorySelection.forEach((eachCategory, index) => {
                if (projectInfo.creatorRole && eachCategory.title == projectInfo.creatorRole) {
                    if (projectInfo.companyCategorySelection) {
                        projectInfo.companyCategorySelection[index].isSelected = true;
                        projectInfo.roleIndex = -1;
                    }
                }

                if (!companyCategorys.includes(eachCategory.title) && projectInfo.companyCategorySelection) {
                    projectInfo.companyCategorySelection[index].isDisable = false;
                }
            });
        }
    }



    uiLabels: any = {
        projectForm: "Project Form",
        sendProjectRequestBtn: "Send Project Request",
        backBtn: "Back",
        nextBtn: "Next",
        wasteItem: "Waste Item",
        disposalId: "Disposal Id",
        addPickBtn: "Add Pick",
        pickLocation: "Pick Location",
        dropLocation: "Drop Location",
        pickQuantity: "Pick Quantity",
        date: "Date",
        to: "To",
        from: "From",
        saveBtn: "Save",
        quantity: "Quantity",
        price: "Price",
        totalPrice: "Total Price",
        projectDetailsInformation: "Project Details Information",
        projectInformation: "Project Information",
        projectTitle: "Project Title",
        projectCreationDate: "Project Creation Date",
        viewBtn: "View",
        projectStartDate: "Project Start Date",
        projectEndDate: "Project End Date",
        copyBtn: "Copy",
        oparatingBranch: "Oparating Branch",
        status: "Status",
        editBtn: "Edit",
        businessPartner: "Business Partner",
        transporter: "Transporter",
        dumper: "Dumper",
        processor: "Processor",
        selectFromList: "Select From List",
        agreementInformation: "Agreement Information",
        agreementTitle: "Agreement Title",
        validDate: "Valid Date",
        dumperCompany: "Dumper Company",
        personIncharge: "Person Incharge",
        processorCompany: "Processor Company",
        transporterCompany: "Transporter Company",
        wastePickInformation: "Waste Pick Information",
        wasteProcessInformation: "Waste Process Information",
        selectAgreementBtn: "Select Agreement",
        closeBtn: "Close"
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    prepareDisposalViewId(disposalList: DisposalInfoFetch[]): DisposalInfoFetch[] {
        disposalList.forEach(disposal => {
            var id: number = 0;
            if (disposal.isParent) {
                id++;
                disposal.disposalViewId = "" + id;
                disposalList.forEach(child => {
                    if (disposal.collectionId == child.collectionId && !child.isParent) {
                        id++;
                        child.disposalViewId = "" + id;
                    }

                });
            }

        });
        return disposalList;
    }

    prepareTotalPrice(processList: wasteProcessInfoFetch[]): wasteProcessInfoFetch[] {
        if (processList.length > 0 && processList) {
            processList.forEach(process => {
                process.totalPrice = process.quantity * process.price;
            });
        }
        return processList;

    }

    selectedBranch: BranchInfoFetch = {} as BranchInfoFetch;
    doSomething(item: any) {
        this.addressDropDownModel = item.value;
        this.project.operatingOfficeId = item.value.id;
        this.project.operatingOfficeName = item.value.name;

    }

    newAgreementForSave: AgreementInfo = {} as AgreementInfo;

    selectAgreementPopupOpen(project: ProjectInfoFetch, agreementInfoPanel: any) {

        if (this.project.creatorRole) {
            var selectedAgreementIds = (this.project.agreementInfo && this.project.agreementInfo.length > 0) ? this.project.agreementInfo.map(item => item.agreementId) : [];
            debugger
            var getCurrentCompanyRole: string = this.initiateProjectOperationService.getCompanyRole(this.companyId, this.project);
            const partnerRole: any = this.initiateProjectOperationService.getPartnerRole(getCurrentCompanyRole);

            this.initiateProjectOperationService.prepareDataForSelectAgreementPopup(this.companyId, getCurrentCompanyRole, project, selectedAgreementIds, partnerRole, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.INITIAL_PAGE_NO, (agreementData: AgreementPopupView) => {
                const dialogRef = this.matDialog.open(SelectAgreementPopupComponent, {
                    width: '85%',
                    data: JSON.parse(JSON.stringify(agreementData)),
                    disableClose: true
                });

                dialogRef.afterClosed().subscribe((result: AgreementPopupSaveDetails) => {
                    if (result) {

                        project.agreementInfo = result.selectAgreement;
                        this.newAgreementForSave = (result.newAgreementForSave && result.newAgreementForSave.agreementId) ? result.newAgreementForSave : {} as AgreementInfo;

                        this.preapreDisposalDateView(result.selectDiposalList, ((disposalList: DisposalInfoFetch[]) => {
                            project.wasteDisposalInfo = disposalList;
                            this.isSelectAgreement = true;
                        }));

                        project.wasteProcessInfo = result.selectProceessList;

                        if (project.agreementInfo) {

                            var creatorPartner: AgreementPartnerCompanyFetch = {} as AgreementPartnerCompanyFetch;
                            var firstPartner: AgreementPartnerCompanyFetch = {} as AgreementPartnerCompanyFetch;
                            var secondPartner: AgreementPartnerCompanyFetch = {} as AgreementPartnerCompanyFetch;

                            for (let index = 0; index < project.agreementInfo.length; index++) {
                                const eachAgreement: AgreementInfoFetch = project.agreementInfo[index];

                                if (!creatorPartner.companyInfoId) {
                                    if (eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles == project.creatorRole) {
                                        creatorPartner = eachAgreement.dumperPartner;

                                    } else if (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles == project.creatorRole) {
                                        creatorPartner = eachAgreement.transporterPartner;

                                    } else if (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles == project.creatorRole) {
                                        creatorPartner = eachAgreement.processorPartner;

                                    }
                                }

                                if (!firstPartner.companyInfoId && creatorPartner.companyInfoId) {
                                    if (eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles != project.creatorRole) {
                                        firstPartner = eachAgreement.dumperPartner;

                                    } else if (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles != project.creatorRole) {
                                        firstPartner = eachAgreement.transporterPartner;

                                    } else if (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles != project.creatorRole) {
                                        firstPartner = eachAgreement.processorPartner;

                                    }
                                }

                                if (!secondPartner.companyInfoId && firstPartner.companyInfoId && creatorPartner.companyInfoId) {
                                    if (eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles != creatorPartner.assignRoles && eachAgreement.dumperPartner.assignRoles != firstPartner.assignRoles) {
                                        secondPartner = eachAgreement.dumperPartner;

                                    } else if (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles != creatorPartner.assignRoles && eachAgreement.transporterPartner.assignRoles != firstPartner.assignRoles) {
                                        secondPartner = eachAgreement.transporterPartner;

                                    } else if (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles != creatorPartner.assignRoles && eachAgreement.processorPartner.assignRoles != firstPartner.assignRoles) {
                                        secondPartner = eachAgreement.processorPartner;

                                    }
                                }

                            }

                            project.dumperPartner = (creatorPartner.assignRoles == AppConstant.CATEGORY_NAME_DUMPER) ? creatorPartner : ((firstPartner.assignRoles == AppConstant.CATEGORY_NAME_DUMPER) ? firstPartner : (secondPartner.assignRoles == AppConstant.CATEGORY_NAME_DUMPER) ? secondPartner : {} as AgreementPartnerCompanyFetch);

                            project.transporterPartner = (creatorPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? creatorPartner : ((firstPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? firstPartner : (secondPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) ? secondPartner : {} as AgreementPartnerCompanyFetch);

                            project.processorPartner = (creatorPartner.assignRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? creatorPartner : ((firstPartner.assignRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? firstPartner : (secondPartner.assignRoles == AppConstant.CATEGORY_NAME_PROCESSOR) ? secondPartner : {} as AgreementPartnerCompanyFetch);

                            var allRoles: string = creatorPartner.assignRoles.concat(firstPartner.assignRoles).concat(secondPartner.assignRoles);

                            project.missingRole = (!allRoles.includes(AppConstant.CATEGORY_NAME_DUMPER)) ? AppConstant.CATEGORY_NAME_DUMPER : ((!allRoles.includes(AppConstant.CATEGORY_NAME_TRANSPORTER)) ? AppConstant.CATEGORY_NAME_TRANSPORTER : (!allRoles.includes(AppConstant.CATEGORY_NAME_PROCESSOR)) ? AppConstant.CATEGORY_NAME_PROCESSOR : "")

                        }

                        project.wasteItemList = result.selectedWasteItemList;
                        project = this.preparewasteProcessInfo(project);

                    }

                    agreementInfoPanel.open();
                });
            });
        } else {
            this.utilService.showSnackbar("Please select creator role", 3000);
        }

    }

    prepareProjectOperatingBranchAddress(project: ProjectInfoFetch) {
        project.operatingZipCode = this.addressDropDownModel.zipcode;
        project.operatingAddress = this.addressDropDownModel.address;

        return project;
    }

    updateCreatorRoleSelection(eachCategory: any, categoryIndex: number) {

        if (this.isViewMode || !eachCategory.isDisable || eachCategory.title == this.project.creatorRole) {
            return;
        }

        eachCategory.isSelected = (eachCategory.isSelected) ? false : true;
        if (eachCategory.isSelected) {
            this.project.creatorRole = eachCategory.title;
        }

        if (this.project.companyCategorySelection) {
            this.project.companyCategorySelection.forEach((each, index) => {
                if (categoryIndex != index) {
                    each.isSelected = false;
                }
            })
        }

    }

    preapreDisposalDateView(disposalInfoList: DisposalInfoFetch[], callBack: any) {
        if (disposalInfoList && disposalInfoList.length > 0) {
            var asyncCounter = 0;
            disposalInfoList.forEach(eachDispose => {
                this.menifestoService.getDateAsFrontendFormat(eachDispose.fromDate).subscribe(response => {
                    if (response) {
                        eachDispose.fromDate = response.date;
                    }

                    asyncCounter++;
                    if (asyncCounter == disposalInfoList.length * 2) {
                        callBack(disposalInfoList);
                    }
                })

                this.menifestoService.getDateAsFrontendFormat(eachDispose.toDate).subscribe(response => {
                    if (response) {
                        eachDispose.toDate = response.date;
                    }

                    asyncCounter++;
                    if (asyncCounter == disposalInfoList.length * 2) {
                        callBack(disposalInfoList);
                    }
                })


            })
        } else {
            callBack(disposalInfoList);
        }
    }

    preparewasteProcessInfo(project: ProjectInfoFetch): ProjectInfoFetch {
        project.wasteProcessInfo.forEach(process => {

            process.processStartDate = project.projectStartDate;
            process.processEndDate = project.projectEndDate;
        });
        return project;
    }

    prepareProcessingStartEndDate(project: ProjectInfoFetch) {
        if (project) {
            project.wasteProcessInfo.forEach(eachWaste => {
                eachWaste.processStartDate = project.projectStartDate;
                eachWaste.processEndDate = project.projectEndDate;
            });
        }

        return project;
    }

    updateProjectList(project: ProjectInfoFetch) {
        project.projectStartDateView = project.projectStartDate.toString().substring(0, 10) + "  ";
        project.projectEndDateView = project.projectEndDate.toString().substring(0, 10);
        project.projectCreationDate = project.projectCreationDate.toString().substring(0, 10);
        // var cheeck = false;
        var index = -1;
        index = this.projectList.findIndex(item => item.projectInfoId == project.projectInfoId);
        if (index >= 0) {
            this.projectList[index] = project;
        } else {
            this.projectList.unshift(project);
        }
        this.selectedOperationFilter = this.initiateProjectOperationService.updateProjectFilter(project.status.statusId, this.filterItems);

    }

    reset() {
        this.project = Object.assign({}, this.blankProject);
        this.project.projectInfoId = this.utilService.generateUniqueId();
    }

    updateAgreementStatus(agreementInfoForSave: ProjectInfoFetch, processAction: any, callBack?: any) {
        var agreementStatusUpdate: ProjectStatusUpdate = {
            projectId: agreementInfoForSave.projectInfoId,
            statusId: processAction.agreementStatusId,
            isApprovalRequired: processAction.isApproval,
            requestedCompanyId: this.companyId,
            requestedCompanyType: '',
            isApproved: false,
        }

        this.initiateProjectOperationService.updateProjectStatus(agreementStatusUpdate).subscribe(data => {
            if (data) {

            }

            if (callBack) {
                callBack(data);
            } else {
                this.utilService.showSnackbar('Response Saved', 3500);

                this.project.status.statusId = data.statusId;

                this.notificationSetInfo.status = this.initiateProjectOperationService.getNotificationStatusInfo(this.project.status.statusId, this.projectProcessDef)
                this.saveNotification(this.project.projectInfoId);



                var ownApprovalStatus: OwnApprovalStatus = {
                    projectId: data.projectId,
                    companyId: this.companyId,
                    isApproved: false
                }
                this.initiateProjectOperationService.getOwnApprovalStatus(ownApprovalStatus, (approvalStatus: OwnApprovalStatus) => {
                    if (approvalStatus) {

                        this.project = this.initiateProjectOperationService.prepareProjectForView(Object.assign({}, this.project), this.projectProcessDef, this.companyId, approvalStatus.isApproved, false);

                        this.updateProjectList(JSON.parse(JSON.stringify(this.project)));
                    }

                });
            }
        });
    }

    saveNotification(agreementId: string) {
        this.notificationSetInfo.baseTableId = agreementId;
        this.notificationSetInfo.contextId = AppConstant.PROJECT_NOTIFICAIONT_ID;
        this.notificationSetInfo.companyId = this.utilService.getCompanyIdCookie();
        this.notificationSetInfo.trigerUserInfoId = this.utilService.getUserIdCookie();
        this.initiateProjectOperationService.sendNotification(this.notificationSetInfo).subscribe(data => {

        })
    }

    saveNewAgreemntData(callBack: any) {
        if (this.newAgreementForSave && this.newAgreementForSave.agreementId) {
            this.businessAgreementService.saveAgreementInfo(this.newAgreementForSave).subscribe(response => {
                callBack();
            })
        } else {
            callBack();
        }
    }

    onClickSaveBtn(processAction: any) {
        if (this.isValidProjectTitle) {
            this.project = this.prepareProjectOperatingBranchAddress(this.project);

            this.project = this.prepareProcessingStartEndDate(this.project);

            this.utilService.showSnackbar('Response Saving...', 5000);

            if (this.project && this.selectedProcess) {
                if (!this.selectedProcess.viewMode) {

                    this.project.companyId = (this.project.companyId) ? this.project.companyId : this.companyId;

                    this.saveNewAgreemntData(() => {

                        this.updateAgreementStatus(this.project, processAction, (agreementStatusUpdate: ProjectStatusUpdate) => {

                            this.project.status = {
                                statusId: agreementStatusUpdate.statusId,
                                statusName: "",
                                statusCode: "",
                                statusDescription: ""
                            };

                            this.initiateProjectOperationService.saveProject(this.project).subscribe((data) => {
                                if (data && data.projectInfoId) {
                                    this.utilService.showSnackbar('Response Saved', 3500);

                                    var ownApprovalStatus: OwnApprovalStatus = {
                                        projectId: data.projectInfoId,
                                        companyId: this.companyId,
                                        isApproved: false
                                    }

                                    this.initiateProjectOperationService.getOwnApprovalStatus(ownApprovalStatus, (approvalStatus: OwnApprovalStatus) => {
                                        if (approvalStatus) {
                                            var savedAgreementInfoForView: ProjectInfoFetch = this.initiateProjectOperationService.prepareProjectForView(data, this.projectProcessDef, this.companyId, approvalStatus.isApproved, false);

                                            this.updateProjectList(data);

                                            this.reset();
                                        }

                                    });

                                    this.utilService.showSnackbar(this.uiLabels.responseSavedToast, 3000);

                                } else {
                                    this.utilService.showSnackbar(this.uiLabels.invalidMessage, 5000);
                                }

                            });

                        });
                    })



                } else {
                    this.updateAgreementStatus(this.project, processAction);
                    this.utilService.showSnackbar(this.uiLabels.responseSavedToast, 3000);

                }
            }
        } else {
            this.utilService.showSnackbar("Project Title Already Exists,Plesae Change Project Title", 3000);
        }


    }

    validProjectTitle(projectTitle: string) {
        // --------------------------Omitting Project Title Validation (Starts)---------------------------

        // var companyId: string = this.utilService.getCompanyIdCookie();
        // if (projectTitle) {
        //     this.initiateProjectOperationService.validProjectTitle(this.project.projectInfoId, projectTitle, companyId).subscribe(backendResponse => {
        //         if (backendResponse) {
        //             this.isValidProjectTitle = false;
        //         }
        //         else {
        //             this.isValidProjectTitle = true;
        //         }
        //     });
        // }
        // --------------------------Omitting Project Title Validation (Ends)---------------------------
        this.isValidProjectTitle = true;
    }

    flag: boolean = false
    blankProject: ProjectInfoFetch = {
        companyCategorySelection: [],
        projectScheduleStatus: "",
        initiatorCompanyName: "",
        operatingOfficeName: "",
        operatingOfficeId: "",
        operatingAddress: "",
        operatingZipCode: "",
        processsList: [],
        isApproveRequiredState: false,
        companyId: "",
        projectInfoId: "",
        projectTitle: "",
        projectCreationDate: "",
        projectStartDate: "",
        projectEndDate: "",
        projectCreationDateView: "",
        projectStartDateView: "",
        projectEndDateView: "",
        operatingBranch:
        {
            companyId: "",
            branchId: "",
            branchName: "",
            zipcode: "",
            branchAddress: "",
            branchContactNo: "",
            branchInchargeName: "",
            branchBusinessCategory: [],
            remark: "",
        },
        status: {
            statusId: "Status001",
            statusCode: "",
            statusName: "New",
            statusDescription: "",
        },
        dumperPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""

        },
        processorPartner: {
            companyInfoId: "",
            companyName: "",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        transporterPartner: {
            companyInfoId: "",
            companyName: " ",
            personIncharge: "",
            personInchargeEmail: "",
            assignRoles: ""
        },
        wasteItemList: [],
        agreementInfo: [],
        wastePickInfo: [],
        wasteProcessInfo: [],
        wasteDisposalInfo: [],
        isTransporter: false,
        isBasicInfoFetched: false,
        isOpen: false,
        manifestoList: [],
        remarks: ''
    };

    driverList: DriverInfoFetch[] = [];
    vehicleList: VehicleInfoFetch[] = [];
    dateWiseDisposePickList: DisposeWisePickInfo[] = [];

    public prepareDisposeWisePickView = (projectInfo: ProjectInfoFetch, callBack?: any) => {
        this.project = projectInfo;
        // this.dateWiseDisposePickList = [];
        this.createScheduleOperationService.getDisposalWisePickInfoList(this.project, () => {
            this.project = this.createScheduleOperationService.prepareDisposalWisePickView(this.project, this.driverList, this.vehicleList);
            this.dateWiseDisposePickList = this.createScheduleOperationService.groupDisposepickByDate(this.project.wasteDisposalInfo);
            this.project.wasteDisposalInfo = this.createScheduleOperationService.prepareDisposalViewId(this.project.wasteDisposalInfo);
            if (callBack) {
                callBack();
            }
        })

        if (projectInfo.wasteDisposalInfo.length == 0) {
            this.dateWiseDisposePickList = [];
        }

    }

    getVehicleList() {
        this.createScheduleOperationService.getVehicleList(this.companyId).subscribe((data) => {

            if (data) {
                this.vehicleList = data;

            }
            this.getDriverList()
        });
    }
    getDriverList() {
        this.createScheduleOperationService.getDriverList(this.companyId).subscribe((data) => {

            if (data) {
                this.driverList = data;
            }
            this.prepareDisposeWisePickView(this.project, () => {
                this.viewContent = true;
                this.disposeWisePickView = true;

            });


        });
    }

    showTransportPrice() {
        var show = false;

        if (this.project.agreementInfo) {
            this.project.agreementInfo.forEach(eachAgreement => {
                // if (this.companyId == eachAgreement.companyId) {
                //     show = true;
                // } else
                if (this.companyId != eachAgreement.invoiceReceiverComId) {

                    if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && this.companyId == eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles == this.transporterCompanyTitle) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && this.companyId == eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles == this.transporterCompanyTitle) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && this.companyId == eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles == this.transporterCompanyTitle)) {
                        show = true;
                    }
                } else if (this.companyId == eachAgreement.invoiceReceiverComId) {

                    if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles == this.transporterCompanyTitle) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles == this.transporterCompanyTitle) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles == this.transporterCompanyTitle)) {
                        show = true;
                    }
                }
            });
        }

        return show;
    }

    showProcessorPrice() {
        var show = false;

        if (this.project.agreementInfo) {
            this.project.agreementInfo.forEach(eachAgreement => {

                // if (this.companyId == eachAgreement.companyId) {
                //     show = true;

                // } else
                if (this.companyId != eachAgreement.invoiceReceiverComId) {

                    if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && this.companyId == eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles == this.processorCompanyTitle) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && this.companyId == eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles == this.processorCompanyTitle) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && this.companyId == eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles == this.processorCompanyTitle)) {
                        show = true;
                    }
                } else if (this.companyId == eachAgreement.invoiceReceiverComId) {

                    if ((eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId && eachAgreement.dumperPartner.assignRoles == this.processorCompanyTitle) || (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId && eachAgreement.transporterPartner.assignRoles == this.processorCompanyTitle) || (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId && eachAgreement.processorPartner.assignRoles == this.processorCompanyTitle)) {
                        show = true;
                    }
                }
            });
        }

        return show;
    }

    actionConfirmAndSave(processAction: any, callBack: any) {
        const confirmDialog = this.matDialog.open(ProjectActionConfirmPopupComponent, {
            data: {
                currentStatus: this.project.status.statusName,
                newStatus: this.initiateProjectOperationService.getStatusTitle(processAction.agreementStatusId, this.projectProcessDef),
                isApprovedByOtherParty: false
            },
            // disableClose: true
        });
    }


}
