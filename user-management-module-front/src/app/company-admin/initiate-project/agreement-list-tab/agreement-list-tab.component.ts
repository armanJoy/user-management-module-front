import { Component, OnInit, Input } from '@angular/core';
import { ProjectInfoFetch, AgreementInfoFetch, AgreementPartnerCompanyFetch } from 'src/app/models/backend-fetch/initiate-project-fetch';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-agreement-list-tab',
    templateUrl: './agreement-list-tab.component.html',
    styleUrls: ['./agreement-list-tab.component.css']
})
export class AgreementListTabComponent implements OnInit {

    @Input()
    creatorRole: string = "";

    @Input()
    partnerRole: string = "";

    @Input()
    businessCategoryFilter: any[] = [];

    @Input()
    searchByText!: (partnerRole: string) => void;

    @Input()
    selectedAgreementIds: string[] = [];

    @Input()
    projectInfo!: ProjectInfoFetch;

    @Input()
    agreementList!: AgreementInfoFetch[];

    @Input()
    public selectTab!: (index: number, agreementInfo: AgreementInfoFetch[]) => void;

    @Input()
    fromManifesto!: boolean;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    ngOnInit(): void {
        if (this.projectInfo.agreementInfo) {
            this.selectListItem(this.selectedAgreementIds);
        } else {
            this.selectListItem(this.selectedAgreementIds);
        }

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.AGREEMENT_LIST_TAB_COMPONENT, AppConstant.UI_LABEL_TEXT);

        this.componentCode = AppConstant.COMP.AGREEMENT_LIST_TAB_COMPONENT;
        this.isSystemAdmin = this.utilService.languageEditMode();
    }

    dumperCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.DUMPER_CATEGORY_VALUE_ID);
    transporterCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.TRANSPOTER_CATEGORY_VALUE_ID);
    processorCompanyTitle = this.utilService.getCompanyCategoryName(AppConstant.PROCESSOR_CATEGORY_VALUE_ID);

    uiLabels: any = {
        "headerLabel": "Agreement List",
        "createButton": "Create Agreement",
        "agreementTitle": "Title",
        "createDate": "Create Date",
        "viewBtn": "View",
        "editButton": "Edit",
        "validDate": "Valid Date",
        "dumperCompany": "Dumper Company",
        "transporterCompany": "Transporter Company",
        "processorCompany": "Processor Company",
        "status": "Status",
        "nextBtn": "Next"
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    searchAndFilter() {
        this.searchByText(this.partnerRole);
    }

    // selectedItem: any;
    selectListItem(item: string[]) {
        if (item && this.agreementList) {
            this.agreementList.forEach(eachAgreement => {
                var index = item.findIndex(agreement => agreement == eachAgreement.agreementId);

                if (index >= 0) {
                    eachAgreement.isSelected = true;
                }
            });
        }
        // this.selectedItem = item;
    }

    selectedAgreements = new Set<AgreementInfoFetch>();
    // selectAgreement(item: AgreementInfoFetch, checkBox: any, event: any) {

    //     if (item.isSelected) {
    //         this.selectedAgreements.add(item);
    //     } else {
    //         this.selectedAgreements.delete(item);
    //     }
    // }

    onSelectionChange(agreement: AgreementInfoFetch, event: any) {

        this.utilService.stopEventPropagation(event);
        if (this.projectInfo.initialAgreementId && agreement.agreementId == this.projectInfo.initialAgreementId) {

            agreement.isSelected = true;
            return
        }

        agreement.isSelected = (agreement.isSelected) ? false : true;

        if (!agreement.isSelected) {

            var index = this.projectInfo.agreementInfo.findIndex(item => item.agreementId == agreement.agreementId);

            if (index >= 0) {
                this.projectInfo.agreementInfo.splice(index, 1);
            }
            this.selectedAgreements.delete(agreement);

        } else {
            var index = (this.projectInfo.agreementInfo) ? this.projectInfo.agreementInfo.findIndex(item => item.agreementId == agreement.agreementId) : -1;
            if (index < 0) {
                if (!this.projectInfo.agreementInfo) {
                    this.projectInfo.agreementInfo = [];
                }
                this.projectInfo.agreementInfo.push(agreement);
                this.selectedAgreements.add(agreement);
            }
        }
    }

    prepareSelectedAgreement() {
        this.agreementList.forEach(agreement => {
            if (!agreement.isSelected) {

                var index = this.projectInfo.agreementInfo.findIndex(item => item.agreementId == agreement.agreementId);

                if (index >= 0) {
                    this.projectInfo.agreementInfo.splice(index, 1);
                }

            } else {
                var index = (this.projectInfo.agreementInfo) ? this.projectInfo.agreementInfo.findIndex(item => item.agreementId == agreement.agreementId) : -1;
                if (index < 0) {
                    if (!this.projectInfo.agreementInfo) {
                        this.projectInfo.agreementInfo = [];
                    }
                    this.projectInfo.agreementInfo.push(agreement);
                }
            }
        })
    }

    TabChange() {
        this.prepareSelectedAgreement();
        var selectedAgreements: AgreementInfoFetch[] = this.projectInfo.agreementInfo;

        this.validateAgreementSelection(selectedAgreements) ? this.selectTab(1, selectedAgreements) : this.utilService.showSnackbar(this.uiLabels.incorrectAgreementSelectionToast, 3000);
    }

    validateAgreementSelection(agreementList: AgreementInfoFetch[]) {
        return (!agreementList || agreementList.length == 0 || agreementList.length > 2) ? false : ((agreementList && agreementList.length == 1) ? ((this.fromManifesto) ? this.checkIfTriPartyAgreement(agreementList) : true) : this.checkIfBothBiPartyAgreement(agreementList));
    }

    checkIfTriPartyAgreement(agreementList: AgreementInfoFetch[]) {
        return (agreementList[0].processorPartner && agreementList[0].processorPartner.companyInfoId) ? true : false;
    }

    checkIfBothBiPartyAgreement(agreementList: AgreementInfoFetch[]) {

        if (agreementList[0].processorPartner.companyInfoId || agreementList[1].processorPartner.companyInfoId) {
            return false;
        }

        var biPartyAgreementRoleCheckMap = new Map<string, boolean>();

        const keys = AppConstant.BI_PARTY_AGREEMENT_ROLE_CHECK_MAP.keys();
        [...keys].forEach(eachKey => {
            biPartyAgreementRoleCheckMap.set(eachKey, false);
        })



        agreementList.forEach(eachAgreement => {
            if (eachAgreement) {
                if (eachAgreement.dumperPartner && eachAgreement.dumperPartner.companyInfoId) {
                    biPartyAgreementRoleCheckMap.set(eachAgreement.dumperPartner.assignRoles, true);
                }

                if (eachAgreement.transporterPartner && eachAgreement.transporterPartner.companyInfoId) {
                    biPartyAgreementRoleCheckMap.set(eachAgreement.transporterPartner.assignRoles, true);
                }

                if (eachAgreement.processorPartner && eachAgreement.processorPartner.companyInfoId) {
                    biPartyAgreementRoleCheckMap.set(eachAgreement.processorPartner.assignRoles, true);
                }
            }
        });

        return ![...biPartyAgreementRoleCheckMap.values()].includes(false);
        // return (!agreementList[0].processorPartner.companyInfoId && !agreementList[1].processorPartner.companyInfoId) ? true : false;
    }


}
