import { Component, OnInit } from '@angular/core';
import { InitiateProjectOperationService } from 'src/app/services/operation-services/initiate-project-operation.service';
import { CompanyProjectFetch, ProjectInfoFetch, AgreementInfoFetch, BranchInfoFetch, wasteProcessInfoFetch, DisposalInfoFetch, ProjectFilter } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { AddressDropDownView, CompanyInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanySettingsOperationService } from 'src/app/services/operation-services/company-settings/company-settings-operation.service';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { PartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-initiate-project-menu',
    templateUrl: './initiate-project-menu.component.html',
    styleUrls: ['./initiate-project-menu.component.css']
})

export class InitiateProjectMenuComponent implements OnInit {


    constructor(private initiateProjectOperationService: InitiateProjectOperationService, private utilService: UtilService, public companySettingsOperationService: CompanySettingsOperationService, private userMangementOperatinService: UserMangementOperatinService, private languageService: LanguageService, private appComponent: AppComponent) { }

    projectList: ProjectInfoFetch[] = [];
    agreementList: AgreementInfoFetch[] = [];
    branchList: BranchInfoFetch[] = [];
    project!: ProjectInfoFetch;
    isSelectAgreement: boolean = false;
    // isApprovalRequired: boolean = false;
    showProjectList: boolean = true;
    showCreateProject: boolean = false;



    companyId: string = '';
    viewContent = false;
    companyName!: string;
    addressDropDownViewList: AddressDropDownView[] = [];
    addressDropDownModel: AddressDropDownView = {
        id: '',
        name: '',
        address: '',
        contactNo: '',
        zipcode: '',
    }

    selectedOperationFilter: ProjectFilter = {} as ProjectFilter;
    filterItems: ProjectFilter[] = [];
    projectProcessDef: any[] = [];
    selectedProcess: any;
    isViewMode: boolean = false;

    selectedCompanyId: string = '';
    companyInfo!: PartnerInfo;
    componentCode!: string;

    isSystemAdmin: boolean = false;

    newStatusTitle: any = "";

    ngOnInit(): void {

        this.appComponent.getApplicationLabels().subscribe(data => {

            this.initViewComponent();

        })

    }

    initViewComponent() {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INITIATE_PROJECT_MENU_COMPONEN;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
        this.companyId = this.utilService.getCompanyIdCookie();

        // this.initiateProjectOperationService.getInitiatePorjectData(this.companyId).subscribe((data) => {
        //     if (data) {
        //         this.projectList = data.companyProjectList;
        //         this.agreementList = data.agreementList;
        //         this.branchList = data.branchInfoList;
        //         // this.initiateProjectData = data;
        //         this.viewContent = true;

        //     }

        // });

        this.projectInformation.projectInfoId = this.utilService.generateUniqueId();
        this.projectInformation.companyId = this.companyId;
        this.project = this.projectInformation;
        // this.project.processsList = this.initiateProjectOperationService.prepareProjectProcessButtons(this.project, this.projectProcessDef, this.companyId, this.isApprovalRequired);

        this.getProjectProcessDef(() => {
            this.viewContent = true;
        })

        // this.getProjectList(this.companyId, AppConstant.INITIAL_PAGE_NO, AppConstant.INITIAL_SEARCH_TEXT, AppConstant.INITIAL_PROJECT_STATUS, false, () => {
        //     this.viewContent = true;
        //     this.showProgressBar = false;
        // });


    }

    uiLabels: any = {
        projectListDashboardTab: "Project List Dashboard",
        createNewProjectTab: "Create New Project"
    }

    showProgressBar: boolean = false;

    public getProjectList = (companyId: string, pageNo: number, searchText: string, status: string, flag: boolean, callBack: any) => {
        this.showProgressBar = true;
        this.initiateProjectOperationService.getProjectList(companyId, pageNo, searchText, status).subscribe((data) => {
            debugger
            if (data) {
                this.projectList = data.companyProjectList;
                this.projectList = this.prepareDateView(this.projectList);
            }

            if (!flag) {
                this.getAgreementList(callBack);
            } else {
                // this.getProjectProcessDef(callBack);
                this.prepareProjectListView(this.projectList, callBack);
            }
        });
    }

    prepareDateView(projectList: ProjectInfoFetch[]): ProjectInfoFetch[] {
        projectList.forEach(element => {
            element.projectStartDateView = element.projectStartDate.toString().substring(0, 10) + "   ";
            element.projectEndDateView = element.projectEndDate.toString().substring(0, 10);
            element.projectCreationDateView = element.projectCreationDate.toString().substring(0, 10);
        });

        return projectList;
    }

    getAgreementList(callBack: any) {
        this.initiateProjectOperationService.getAgreementList(this.companyId).subscribe((data) => {
            if (data) {
                this.agreementList = data.agreementList;

            }

            this.getBranchList(callBack);
        });
    }

    getProjectProcessDef(callBack: any) {

        this.initiateProjectOperationService.getProjectProcessDef().subscribe(data => {
            if (data) {
                this.projectProcessDef = data;
                this.selectedProcess = this.initiateProjectOperationService.prepareProcessDefForView(this.projectProcessDef[0], this.selectedCompanyId);
            }
            this.prepareFilterItems(Object.assign([], this.projectProcessDef));
            callBack();
            // this.prepareProjectListView(this.projectList, callBack);
        })
    }

    prepareProjectListView(projectList: ProjectInfoFetch[], callBack: any) {

        var count = 0;

        if (projectList && projectList.length > 0) {

            projectList.forEach(eachProject => {

                this.initiateProjectOperationService.prepareProjectViewModel(eachProject, this.projectProcessDef, this.companyId, true, (preparedProject: ProjectInfoFetch) => {

                    eachProject = preparedProject;
                    count++;
                    if (count == projectList.length) {
                        this.viewContent = true;
                        callBack();
                        debugger
                    }
                });
            });

        } else {
            this.viewContent = true;
            callBack();
        }
    }

    getBranchList(callBack: any) {
        this.initiateProjectOperationService.getBranchList(this.companyId).subscribe((data) => {
            if (data) {
                this.branchList = data.branchInfoList;

            }
            this.getCompany(this.companyId, callBack);
        });
    }

    creatorCompanyInfo: CompanyInfoFetch = {} as CompanyInfoFetch;
    getCompany(companyId: string, callBack: any) {
        this.userMangementOperatinService.getCompanyInfo(companyId).subscribe((company) => {
            if (company) {
                this.creatorCompanyInfo = company;
                this.companyName = company.companyName;
                // this.companyInfo
                // this.viewContent = true;
            }
            // this.getProjectProcessDef(callBack);
            this.addressDropDownViewList = this.userMangementOperatinService.prepareAddressDropDownViewList(this.branchList, company);
            callBack();
        });
    }

    initiateProjectData: CompanyProjectFetch = {
        companyProjectList: [

        ],
        // branchInfoList: [

        // ],
        // agreementList: [

        // ]
    }
    prepareTotalPrice(processList: wasteProcessInfoFetch[]): wasteProcessInfoFetch[] {
        if (processList.length > 0 && processList) {
            processList.forEach(process => {
                process.totalPrice = process.quantity * process.price;
            });
        }
        return processList;

    }
    selectedIndex = 0;
    informChange(index: any) {

        var autoSelectFilter: ProjectFilter = this.initiateProjectOperationService.getAutoSelectedOperationFilter();
        if (autoSelectFilter && autoSelectFilter.operationId) {
            this.selectedOperationFilter = JSON.parse(JSON.stringify(autoSelectFilter));
            this.initiateProjectOperationService.clearAutoSelectedOperationFilter();
        }

        this.selectedIndex = index;
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

    public switchTab = (index: number, projectInfo: ProjectInfoFetch, flag: boolean, selectedProcess?: any): void => {
        debugger
        if (!this.branchList || this.branchList.length <= 0 || !this.creatorCompanyInfo || !this.creatorCompanyInfo.companyId) {
            this.getBranchList(() => {
                this.prepareViewForCreateProjectTab(index, projectInfo, flag, selectedProcess);
            })
        } else {
            this.prepareViewForCreateProjectTab(index, projectInfo, flag, selectedProcess);
        }

    }

    prepareViewForCreateProjectTab(index: number, projectInfo: ProjectInfoFetch, flag: boolean, selectedProcess?: any) {
        this.project = Object.assign({}, projectInfo);
        this.project.wasteProcessInfo = this.prepareTotalPrice(this.project.wasteProcessInfo);
        this.project.wasteDisposalInfo = this.prepareDisposalViewId(this.project.wasteDisposalInfo);
        this.isSelectAgreement = flag;

        this.prepareAddressModel(projectInfo.operatingZipCode, projectInfo.operatingAddress);

        projectInfo.companyId = (projectInfo.companyId) ? projectInfo.companyId : this.companyId;

        if (selectedProcess) {
            this.selectedProcess = selectedProcess;
            this.isViewMode = selectedProcess.viewMode;
        } else {
            // this.selectedProcess = this.agreementProcessDef[0];
            this.selectedProcess = this.initiateProjectOperationService.prepareProcessDefForView(this.projectProcessDef[0], this.companyId);
            this.isViewMode = false;
        }

        this.selectedIndex = index;
        this.showCreateProjectTab();
    }

    prepareAddressModel(zipCode: string, address: string) {
        this.addressDropDownViewList.forEach(element => {
            if (zipCode && address && element.zipcode == zipCode && element.address == address) {
                this.addressDropDownModel = element;
            }
        })
    }

    public switchTabToProjectList = (index: number) => {
        this.selectedIndex = index;

        this.showProjectListTab();
    }

    prepareFilterItems(projectProcessDef: any[]) {
        debugger
        this.filterItems = this.initiateProjectOperationService.filterItems(projectProcessDef);
        this.selectedOperationFilter = this.filterItems[0];

        if (!this.utilService.showLoadButton() && !this.utilService.showUnloadButton()) {
            var filterItem = JSON.parse(JSON.stringify(AppConstant.TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF));
            filterItem.statusTitle = this.uiLabels[AppConstant.TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF.statusTitle];
            this.selectedOperationFilter.statusList.unshift(filterItem);
        }

        if (this.utilService.showLoadButton() || this.utilService.showUnloadButton()) {
            var filterItem2 = JSON.parse(JSON.stringify(AppConstant.LOAD_UNLOAD_FILTER_DEF));
            filterItem2.statusTitle = this.uiLabels[AppConstant.LOAD_UNLOAD_FILTER_DEF.statusTitle];
            this.selectedOperationFilter.statusList.unshift(filterItem2);
        }
        this.newStatusTitle = (this.selectedOperationFilter.statusList.find(item => item.statusId == "statusNewProject")?.statusTitle)
        this.projectInformation.status.statusName = this.newStatusTitle
    }

    showProjectListTab() {
        this.showProjectList = true;
        this.showCreateProject = false;
        // this.viewContent = false;
        this.initViewComponent();
    }

    showCreateProjectTab() {
        this.showProjectList = false;
        this.showCreateProject = true;
    }

    projectInformation: ProjectInfoFetch = {
        projectScheduleStatus: "",
        initiatorCompanyName: "",
        operatingOfficeName: "",
        operatingOfficeId: "",
        operatingAddress: "",
        operatingZipCode: "",
        companyId: "",
        projectInfoId: "",
        projectTitle: "",
        projectCreationDate: "",
        projectStartDate: "",
        projectEndDate: "",
        projectCreationDateView: "",
        projectStartDateView: "",
        projectEndDateView: "",
        operatingBranch: {
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
            statusId: "Status0001",
            statusCode: "",
            statusName: this.newStatusTitle,
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
        processsList: [],
        isApproveRequiredState: false,
        isTransporter: false,
        isBasicInfoFetched: false,
        isOpen: false,
        manifestoList: [],
        remarks: '',
        companyCategorySelection: []
    }


}
