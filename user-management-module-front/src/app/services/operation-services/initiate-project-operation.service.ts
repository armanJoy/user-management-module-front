import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { AgreementInfoFetch, ProjectInfoFetch, CompanyBranchFetch, CompanyAgreementFetch, ProjectFilter, OwnApprovalStatus, ProjectStatusUpdate, AgreementPopupView } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';
import { UtilService } from '../visitor-services/util.service';
import { NotificationSetInfo, StatusInfo } from 'src/app/models/backend-fetch/notification';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { CompanyInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { AgreementInfoUpdate, CompanyCategorySelection } from 'src/app/models/backend-fetch/business-agreement';
import { UserMangementOperatinService } from './user-mangement-operatin.service';

@Injectable({
    providedIn: 'root'
})
export class InitiateProjectOperationService {

    constructor(private uriService: UriService, private languageService: LanguageService, private utilService: UtilService, private userMangementOperatinService: UserMangementOperatinService) { }

    getProjectPartnerCompanyIds(projectInfo: ProjectInfoFetch): string[] {

        var companyIds: string[] = []

        if (projectInfo.dumperPartner && projectInfo.dumperPartner.companyInfoId && projectInfo.dumperPartner.companyInfoId) {
            companyIds.push(projectInfo.dumperPartner.companyInfoId)
        }
        if (projectInfo.transporterPartner && projectInfo.transporterPartner.companyInfoId && projectInfo.transporterPartner.companyInfoId) {
            companyIds.push(projectInfo.transporterPartner.companyInfoId)
        }
        if (projectInfo.processorPartner && projectInfo.processorPartner.companyInfoId && projectInfo.processorPartner.companyInfoId) {
            companyIds.push(projectInfo.processorPartner.companyInfoId)
        }

        return companyIds;
    }

    getCompanyRole(currentCompanyId: string, project: ProjectInfoFetch): string {
        return (project.companyId == currentCompanyId && project.creatorRole) ? project.creatorRole : ((project.dumperPartner && project.dumperPartner.companyInfoId == currentCompanyId) ? project.dumperPartner.assignRoles : ((project.transporterPartner && project.transporterPartner.companyInfoId == currentCompanyId) ? project.transporterPartner.assignRoles : ((project.processorPartner && project.processorPartner.companyInfoId == currentCompanyId) ? project.processorPartner.assignRoles : "")));
    }

    getPartnerRole(creatorRole: string) {
        const bizCatList: any = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
        return bizCatList.find((item: any) => item.title != creatorRole)?.title;
    }

    prepareDataForSelectAgreementPopup(companyId: string, creatorRole: string, project: ProjectInfoFetch | null, selectedAgreementIds: string[], partnerRoles: string, searchText: string, pageNo: number, callBack: any) {
        var selectAgreementData: AgreementPopupView = {
            projectInfo: {
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
                    statusId: "",
                    statusCode: "",
                    statusName: "",
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
                    companyName: "",
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

            },
            agreementList: [],
            selectedAgreementIds: selectedAgreementIds,
            creatorRole: creatorRole,
            partnerRole: partnerRoles
        };

        this.getAgreementListForCurrentCompany(companyId, creatorRole, partnerRoles, searchText, pageNo, (agreementList: AgreementInfoFetch[]) => {

            if (project) {
                selectAgreementData.projectInfo = Object.assign({}, project);
            } else {
                selectAgreementData.projectInfo = project;
            }
            selectAgreementData.agreementList = agreementList;
            callBack(selectAgreementData);
        })
    }

    getAgreementListForCurrentCompany(companyId: string, creatorRole: string, partnerRoles: string, searchText: string, pageNo: number, callBack: any) {
        this.getAgreementListByCompanyRole(companyId, creatorRole, partnerRoles, searchText, pageNo).subscribe((data) => {

            callBack(data);
        });
    }

    prepareCompanyCategorySelection(companyBusinessCategories: string[], creatorRole?: string) {
        var companyCategorySelection: CompanyCategorySelection[] = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
        var companyCategorys: string = JSON.stringify(companyBusinessCategories);
        var defaultSelection = false;
        if (companyCategorySelection) {
            companyCategorySelection.forEach((eachCategory, index) => {
                if (creatorRole && eachCategory.title == creatorRole) {
                    if (companyCategorySelection) {
                        companyCategorySelection[index].isSelected = true;
                    }
                }

                if (!companyCategorys.includes(eachCategory.title) && companyCategorySelection) {
                    companyCategorySelection[index].isDisable = false;
                }

                if (companyCategorySelection[index].isDisable && !creatorRole && !defaultSelection) {
                    companyCategorySelection[index].isSelected = true;
                    creatorRole = eachCategory.title;
                    defaultSelection = true;
                }
            });
        }

        return companyCategorySelection;
    }

    validProjectTitle(projectId: string, projectTitle: string, companyId: string): Observable<any> {
        var url = "/project-initiation/check-duplicate-title";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { projectId, projectTitle, companyId });
    }

    removeProject(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/project-initiation/remove-project";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    public getProjectInfo(projectInfoId: string): Observable<ProjectInfoFetch> {
        var url = '/project-initiation/project-detail-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectInfoId);
    }

    public getProjectBasicInfo(projectInfoId: string): Observable<ProjectInfoFetch> {
        var url = '/project-initiation/project-basic-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectInfoId);
    }

    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {

        var url = '/project-initiation/set-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, NotificationSetInfo);
    }

    public saveProject(projectInfo: ProjectInfoFetch): Observable<ProjectInfoFetch> {
        var url = '/project-initiation/create-project';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectInfo);
    }

    public getProjectName(agreementId: string): Observable<string> {

        var url = '/project-initiation/project-name';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementId);
    }

    public getProjectList(companyId: string, pageNo: number, searchText: string, status: string): Observable<any> {
        var url = '/project-initiation/initial-project-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    }

    public getAgreementList(companyId: string): Observable<CompanyAgreementFetch> {
        var url = '/project-initiation/agreement-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);

    }

    public getAgreementListByCompanyRole(companyId: string, creatorRole: string, partnerRoles: string, searchText: string, pageNo: number): Observable<AgreementInfoFetch[]> {
        var url = '/project-initiation/agreement-list-by-creator-role';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { companyId, creatorRole, partnerRoles }, pageNo, searchText);

    }

    public getBranchList(companyId: string): Observable<CompanyBranchFetch> {
        var url = '/project-initiation/branch-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    processTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.PROCESS_TITLE_KEY_ENG : AppConstant.PROCESS_TITLE_KEY_JPN;

    actionTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.ACTION_TITLE_KEY_ENG : AppConstant.ACTION_TITLE_KEY_JPN;

    statusTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.STATUS_TITLE_KEY_ENG : AppConstant.STATUS_TITLE_KEY_JPN;

    operationTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.PROJECT_OPERATION_TITLE_ENG : AppConstant.PROJECT_OPERATION_TITLE_JPN;

    companyCategoryTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.COMPANY_CATEGORY_TITLE_ENG : AppConstant.COMPANY_CATEGORY_TITLE_JPN;


    autoSelectedOperationFilter: ProjectFilter = {} as ProjectFilter;

    getAutoSelectedOperationFilter(): ProjectFilter {
        return this.autoSelectedOperationFilter;
    }

    setAutoSelectedOperationFilter(filter: ProjectFilter) {
        this.autoSelectedOperationFilter = JSON.parse(JSON.stringify(filter));
    }

    clearAutoSelectedOperationFilter() {
        this.autoSelectedOperationFilter = {} as ProjectFilter
    }

    getNotificationStatusInfo(statusId: string, agreementProcessDef: any[]): StatusInfo {
        var statusInfo: StatusInfo = {
            id: "",
            titleEng: "",
            titleJpn: "",
        }
        // var statusTitleValue = '';
        if (agreementProcessDef) {

            agreementProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == statusId) {
                            statusInfo.id = element.statusId;
                            statusInfo.titleEng = element.statusTitleEng;
                            statusInfo.titleJpn = element.statusTitleJpn;



                        }
                    });
                }
            })
        }

        return statusInfo;
    }

    updateProjectFilter(statusId: string, filterItems: ProjectFilter[]) {

        var selectedOperationFilter: ProjectFilter = {} as ProjectFilter;

        if (statusId == AppConstant.PROJECR_TERMINATE_STATUS_ID) {
            filterItems.forEach(element => {
                if (element.operationId == AppConstant.PROJECR_TERMINATE_OPERATION_ID) {

                    element.statusList.forEach(eachStatus => {
                        if (eachStatus.statusId == AppConstant.PROJECR_TERMINATE_STATUS_ID) {
                            eachStatus.isSelected = true;
                        }
                    });

                    selectedOperationFilter = element;
                }
            });
        }

        if (statusId == AppConstant.PROJECR_COMPLETION_READY_FOR_APPROVE_STATUS_ID) {
            filterItems.forEach(element => {
                if (element.operationId == AppConstant.PROJECR_COMPLETION_OPERATION_ID) {

                    element.statusList.forEach(eachStatus => {
                        if (eachStatus.statusId == AppConstant.PROJECR_COMPLETION_READY_FOR_APPROVE_STATUS_ID) {
                            eachStatus.isSelected = true;
                        }
                    });

                    selectedOperationFilter = element;
                }
            });
        }

        this.setAutoSelectedOperationFilter(selectedOperationFilter);
        return selectedOperationFilter;
    }

    filterItems(projectProcessDef: any[]) {
        var projectFilterItems: ProjectFilter[] = [];

        if (projectProcessDef) {
            projectProcessDef.forEach(element => {
                if (element.initialStatus) {
                    element.initialStatus.forEach((status: any) => {

                        var operationIndex = projectFilterItems.findIndex(item => item.operationId == status.operationDef.operationId);
                        if (operationIndex < 0) {
                            var newOperation: ProjectFilter = {
                                operationId: status.operationDef.operationId,
                                operationTitle: status.operationDef[this.operationTitle],
                                statusList: []
                            };
                            projectFilterItems.push(newOperation);
                            operationIndex = projectFilterItems.length - 1;
                        }

                        if (projectFilterItems[operationIndex].statusList.findIndex(item => item.statusId == status.statusId) < 0) {
                            // if (status.statusId == AppConstant.PROJECT_STATUS_NEW) {
                            //     status.isSelected = true;
                            // }
                            // else if (status.statusId == AppConstant.PROJECT_STATUS_IN_USE) {
                            //     status.isSelected = true;
                            // }
                            // else {
                            status.isSelected = false;
                            // }
                            status.statusTitle = status[this.statusTitle]
                            projectFilterItems[operationIndex].statusList.push(status);
                        }
                    });
                }
            });
        }

        return projectFilterItems;
    }


    getProjectProcessDef(): Observable<any[]> {

        // return of(this.projectProcessDef)

        var url = '/project-initiation/get-project-process-def';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    getOwnApprovalStatus(ownApprovalStatus: OwnApprovalStatus, callBack: any) {
        this.getApprovalStatus(ownApprovalStatus).subscribe(data => {
            if (data) {

            }
            callBack(data);

        });
    }

    getApprovalStatus(projectStatusUpdate: OwnApprovalStatus): Observable<OwnApprovalStatus> {
        // return of(projectStatusUpdate)
        var url = '/project-initiation/own-approval-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectStatusUpdate);
    }

    updateProjectStatus(projectStatusUpdate: ProjectStatusUpdate): Observable<ProjectStatusUpdate> {
        var url = '/project-initiation/update-project-status';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, projectStatusUpdate);
    }

    prepareProcessDefForView(processDef: any, companyId: string) {
        processDef.processTitle = processDef[this.processTitle];
        processDef.companyId = companyId;
        processDef.viewMode = false;
        if (processDef.processAction) {
            processDef.processAction.forEach((eachAction: any) => {
                eachAction.actionTitle = eachAction[this.actionTitle];
            });
        }

        return processDef;
    }

    prepareProjectViewModel(eachProject: ProjectInfoFetch, projectProcessDef: any[], companyId: string, isBasicInfoList: boolean, callBack: any) {
        var ownApprovalStatus: OwnApprovalStatus = {
            projectId: eachProject.projectInfoId,
            companyId: companyId,
            isApproved: false
        }
        this.getOwnApprovalStatus(ownApprovalStatus, (data: OwnApprovalStatus) => {
            if (data) {
                eachProject = this.prepareProjectForView(eachProject, projectProcessDef, companyId, data.isApproved, isBasicInfoList);

                if (eachProject.dumperPartner && eachProject.transporterPartner && eachProject.processorPartner) {
                    var companyIds: string[] = this.getProjectPartnerCompanyIds(eachProject);
                    eachProject.projectViewerIds = this.utilService.getProjectViewerIds(companyIds, eachProject.companyId);
                }
            }

            callBack(JSON.parse(JSON.stringify(eachProject)));

        });
    }

    prepareProjectForView(eachProject: ProjectInfoFetch, projectProcessDef: any[], companyId: string, isApprovalRequired: boolean, isBasicInfoList: boolean) {

        eachProject.processsList = (isBasicInfoList) ? [] : Array.from(this.prepareProjectProcessButtons(Object.assign({}, eachProject), projectProcessDef, companyId, isApprovalRequired));

        eachProject.status.statusName = this.getStatusTitle(eachProject.status.statusId, projectProcessDef);

        eachProject.isApproveRequiredState = (AppConstant.APPROVAL_REQUIRED_STATUS_OF_PROJECT.findIndex(item => item == eachProject.status.statusId) >= 0) ? true : false;

        if (AppConstant.PROJECT_STATUS_FOR_CREATE_SCHEDULE_BUTTON.includes(eachProject.status.statusId) && ((eachProject.transporterPartner && eachProject.transporterPartner.companyInfoId && eachProject.transporterPartner.companyInfoId == companyId && eachProject.transporterPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) || (eachProject.dumperPartner && eachProject.dumperPartner.companyInfoId && eachProject.dumperPartner.companyInfoId == companyId && eachProject.dumperPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER) || (eachProject.processorPartner && eachProject.processorPartner.companyInfoId && eachProject.processorPartner.companyInfoId == companyId && eachProject.processorPartner.assignRoles == AppConstant.CATEGORY_NAME_TRANSPORTER))) {
            eachProject.isTransporter = true;
        } else {
            eachProject.isTransporter = false;
        }

        var companyIds: string[] = this.getProjectPartnerCompanyIds(eachProject);
        eachProject.projectViewerIds = this.utilService.getProjectViewerIds(companyIds, eachProject.companyId);

        return eachProject;
    }



    prepareProjectProcessButtons(project: ProjectInfoFetch, projectProcessDef: any[], companyId: string, isProcessApprovedByThisCompany: boolean) {
        var processsList = new Set();

        if (projectProcessDef) {
            projectProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == project.status.statusId && !isProcessApprovedByThisCompany) {
                            if (eachProcess.processAction) {
                                eachProcess.processAction.forEach((eachAction: any) => {
                                    eachAction.actionTitle = eachAction[this.actionTitle];
                                });
                            }

                            // var isCreatorAlsoAnPartner = this.isCreatorCompanyActAsParty(project.agreementInfo, companyId, project.companyId);
                            var creatorFound = false;

                            if (project.dumperPartner && project.dumperPartner.companyInfoId && project.dumperPartner.companyInfoId == companyId && project.dumperPartner.companyInfoId == project.companyId && eachProcess.creatorAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE) {
                                creatorFound = true;

                                var creatorProcessDef: any = Object.assign({}, eachProcess);

                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];
                                creatorProcessDef.companyId = companyId;

                                if (eachProcess.creatorAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    creatorProcessDef.viewMode = true;
                                } else {
                                    creatorProcessDef.viewMode = false;
                                }


                                processsList.add(creatorProcessDef);
                                // processsList.push(creatorProcessDef);

                            } else if (project.dumperPartner && project.dumperPartner.companyInfoId && project.dumperPartner.companyInfoId == companyId && project.dumperPartner.companyInfoId != project.companyId && eachProcess.partyAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE) {

                                var firstPartyProcessDef: any = Object.assign({}, eachProcess);

                                firstPartyProcessDef.processTitle = firstPartyProcessDef[this.processTitle];
                                firstPartyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    firstPartyProcessDef.viewMode = true;
                                } else {
                                    firstPartyProcessDef.viewMode = false;
                                }

                                processsList.add(firstPartyProcessDef);

                            }

                            if (project.transporterPartner && project.transporterPartner.companyInfoId && project.transporterPartner.companyInfoId == companyId && eachProcess.creatorAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE && !creatorFound && project.transporterPartner.companyInfoId == project.companyId) {
                                creatorFound = true;

                                var creatorProcessDef: any = Object.assign({}, eachProcess);

                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];
                                creatorProcessDef.companyId = companyId;

                                if (eachProcess.creatorAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    creatorProcessDef.viewMode = true;
                                } else {
                                    creatorProcessDef.viewMode = false;
                                }

                                processsList.add(creatorProcessDef);

                            } else if (project.transporterPartner && project.transporterPartner.companyInfoId && project.transporterPartner.companyInfoId == companyId && project.transporterPartner.companyInfoId != project.companyId && eachProcess.partyAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE) {

                                var firstPartyProcessDef: any = Object.assign({}, eachProcess);

                                firstPartyProcessDef.processTitle = firstPartyProcessDef[this.processTitle];
                                firstPartyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    firstPartyProcessDef.viewMode = true;
                                } else {
                                    firstPartyProcessDef.viewMode = false;
                                }

                                processsList.add(firstPartyProcessDef);

                            }


                            if (project.processorPartner && project.processorPartner.companyInfoId && project.processorPartner.companyInfoId == companyId && eachProcess.creatorAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE && !creatorFound && project.processorPartner.companyInfoId == project.companyId) {
                                creatorFound = true;

                                var creatorProcessDef: any = Object.assign({}, eachProcess);

                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];
                                creatorProcessDef.companyId = companyId;

                                if (eachProcess.creatorAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    creatorProcessDef.viewMode = true;
                                } else {
                                    creatorProcessDef.viewMode = false;
                                }

                                processsList.add(creatorProcessDef);

                            } else if (project.processorPartner && project.processorPartner.companyInfoId && project.processorPartner.companyInfoId == companyId && project.processorPartner.companyInfoId != project.companyId && eachProcess.partyAccess != AppConstant.PROJECT_PROCESS_ACCESS_NONE) {

                                var firstPartyProcessDef: any = Object.assign({}, eachProcess);

                                firstPartyProcessDef.processTitle = firstPartyProcessDef[this.processTitle];
                                firstPartyProcessDef.companyId = companyId;

                                if (eachProcess.partyAccess == AppConstant.PROJECT_PROCESS_ACCESS_VIEW) {
                                    firstPartyProcessDef.viewMode = true;
                                } else {
                                    firstPartyProcessDef.viewMode = false;
                                }

                                processsList.add(firstPartyProcessDef);

                            }
                        }
                    });
                }
            })
        }

        // var processsArray: any[] = Array.from(processsList).sort((a: any, b: any) => (a.processTitle > b.processTitle) ? 1 : -1)

        return processsList;
    }

    isCreatorCompanyActAsParty(agreementInfo: AgreementInfoFetch, actingCompanyId: string, creatorCompanyId: string) {
        var isPartner = false;

        if (((actingCompanyId == creatorCompanyId) && (agreementInfo.dumperPartner && agreementInfo.transporterPartner && agreementInfo.dumperPartner.companyInfoId && agreementInfo.transporterPartner.companyInfoId && agreementInfo.dumperPartner.companyInfoId == agreementInfo.transporterPartner.companyInfoId) || (agreementInfo.dumperPartner && agreementInfo.processorPartner && agreementInfo.dumperPartner.companyInfoId && agreementInfo.processorPartner.companyInfoId && agreementInfo.dumperPartner.companyInfoId == agreementInfo.processorPartner.companyInfoId) || (agreementInfo.transporterPartner && agreementInfo.processorPartner && agreementInfo.transporterPartner.companyInfoId && agreementInfo.processorPartner.companyInfoId && agreementInfo.transporterPartner.companyInfoId == agreementInfo.processorPartner.companyInfoId))) {
            isPartner = true;
        }

        return isPartner;
    }

    getStatusTitle(statusId: string, projectProcessDef: any[]) {
        var statusTitleValue = '';
        if (projectProcessDef) {
            projectProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == statusId) {

                            statusTitleValue = element[this.statusTitle];

                        }
                    });
                }
            })
        }

        return statusTitleValue;
    }

    getCreatorRole(projectInfo: ProjectInfoFetch) {
        return (projectInfo.dumperPartner && projectInfo.dumperPartner.companyInfoId && projectInfo.dumperPartner.companyInfoId == projectInfo.companyId) ? projectInfo.dumperPartner.assignRoles : ((projectInfo.transporterPartner && projectInfo.transporterPartner.companyInfoId && projectInfo.transporterPartner.companyInfoId == projectInfo.companyId) ? projectInfo.transporterPartner.assignRoles : (projectInfo.processorPartner && projectInfo.processorPartner.companyInfoId && projectInfo.processorPartner.companyInfoId == projectInfo.companyId) ? projectInfo.processorPartner.assignRoles : "");
    }


    prepareCreatorCompanyCategorySelection(projectInfo: ProjectInfoFetch, creatorCompanyInfo: any, callBack: any) {

        this.userMangementOperatinService.getCompanyInfo(projectInfo.companyId).subscribe((creatorCompany) => {
            if (creatorCompanyInfo) {
                creatorCompanyInfo = creatorCompany;
            }

            projectInfo.companyCategorySelection = JSON.parse(JSON.stringify(AppConstant.dxrCompanyBusinessCategory));
            var companyCategorys: string = JSON.stringify(creatorCompanyInfo.companyBusinessCategory);
            projectInfo.creatorRole = this.getCreatorRole(projectInfo);

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

            callBack();
        })

    }
}
