import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SystemOverviewService } from 'src/app/services/visitor-services/system-overview.service';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { HowToUseItComponent } from 'src/app/visitor/system-overview/how-to-use-it/how-to-use-it.component';
import { IntroductionFlowComponent } from 'src/app/visitor/system-overview/introduction-flow/introduction-flow.component';
import { CompanyUsingItComponent } from 'src/app/visitor/system-overview/company-using-it/company-using-it.component';
import { CostingComponent } from 'src/app/visitor/system-overview/costing/costing.component';
import { PrivacyPolicyComponent } from 'src/app/visitor/system-overview/privacy-policy/privacy-policy.component';
import { TermsOfUseComponent } from 'src/app/visitor/system-overview/terms-of-use/terms-of-use.component';
import { CaseStudyComponent } from 'src/app/visitor/system-overview/case-study/case-study.component';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppComponent } from 'src/app/app.component';
// import { HowToUseItComponent } from './how-to-use-it/how-to-use-it.component';
// import { IntroductionFlowComponent } from './introduction-flow/introduction-flow.component';
// import { CompanyUsingItComponent } from './company-using-it/company-using-it.component';
// import { CostingComponent } from './costing/costing.component';
@Component({
    selector: 'app-system-overview-admin',
    templateUrl: './system-overview-admin.component.html',
    styleUrls: ['./system-overview-admin.component.css']
})
export class SystemOverviewAdminComponent implements OnInit {
    @ViewChild(CaseStudyComponent) childCaseStudy: any;
    @ViewChild(HowToUseItComponent) childHowToUseIt: any;
    @ViewChild(IntroductionFlowComponent) childIntroductionFlow: any;
    @ViewChild(CompanyUsingItComponent) childCompanyUsingIt: any;
    @ViewChild(CostingComponent) childCosting: any;
    @ViewChild(TermsOfUseComponent) childTermsOfUse: any;
    @ViewChild(PrivacyPolicyComponent) childPrivacyPolicy: any;

    constructor(private breakpointObserver: BreakpointObserver, private activatedroute: ActivatedRoute, private languageService: LanguageService, private systemOverviewService: SystemOverviewService, private utilService: UtilService, private appComponent: AppComponent) { }


    staticPages: StaticPageFetch[] = [];
    staticPage: StaticPageFetch = {
        staticPageId: '',
        staticContent: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }
    caseStudyStaticPage: StaticPageFetch = {
        staticPageId: '',
        staticContent: '',
        backendDate: '',
        frontendDate: '',
        dxrInfoCache: ''
    }



    menuId: any;
    loadHtml = false;
    uiLabels: any = {};
    selectedIndex: any = 0;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.appComponent.getApplicationLabels().subscribe(data => {

            this.initViewComponent();

        })

    }

    initViewComponent() {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SYSTEM_OVERVIEW;

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SYSTEM_OVERVIEW, AppConstant.UI_LABEL_TEXT);

        this.systemOverviewService.getStaticPages().subscribe(data => {
            if (data && data.length > 0) {
                data.forEach(element => {
                    this.staticPages.push((element) ? element : this.staticPage);

                });

            }

            this.loadHtml = true;
        })

        this.activatedroute.paramMap.subscribe(params => {
            this.selectedIndex = params.get('menuId') ? params.get('menuId') : 0;
        });
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    public static Tabs = [
        {
            tabName: 'Case study',
            staticPageId: 'staticcontent0001'
        },
        {
            tabName: 'How to use it',
            staticPageId: 'staticcontent0002'
        },
        {
            tabName: 'Introduction Flow',
            staticPageId: 'staticcontent0003'
        },
        {
            tabName: 'Company Using it',
            staticPageId: 'staticcontent0004'
        },
        {
            tabName: 'Costing',
            staticPageId: 'staticcontent0005'
        },
        {
            tabName: 'Terms of use',
            staticPageId: 'staticcontent0006'
        },
        {
            tabName: 'Privacy Policy',
            staticPageId: 'staticcontent0007'
        },
    ];

    tabOrderMapToAppConstant = [
        AppConstant.Tabs[0].tabIndex, AppConstant.Tabs[1].tabIndex, AppConstant.Tabs[2].tabIndex, AppConstant.Tabs[3].tabIndex, AppConstant.Tabs[4].tabIndex, AppConstant.Tabs[5].tabIndex, AppConstant.Tabs[6].tabIndex
    ]

    getStaticContent($event: any) {

        var index = this.tabOrderMapToAppConstant[$event.index];
        var eventIndex = $event.index;

        this.systemOverviewService.getStaticPage(AppConstant.Tabs[index].staticPageId, ((data: StaticPageFetch) => {
            this.loadHtml = true;

            setTimeout(() => {
                if (data) {

                    if (eventIndex == 0) {
                        this.caseStudyStaticPage = data;
                        this.childCaseStudy.loadStaticContent(data);
                        var caseStudyLabels: any = this.languageService.getUiLabels(AppConstant.COMP.CASE_STUDY_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childCaseStudy.setUiLabels(caseStudyLabels);

                    } else if (eventIndex == 1) {

                        this.childHowToUseIt.loadStaticContent(data);
                        var howToUseItLabels: any = this.languageService.getUiLabels(AppConstant.COMP.HOW_TO_USE_IT, AppConstant.UI_LABEL_TEXT);
                        this.childHowToUseIt.setUiLabels(howToUseItLabels);

                    } else if (eventIndex == 2) {

                        this.childIntroductionFlow.loadStaticContent(data);
                        var appIntroductionLabels: any = this.languageService.getUiLabels(AppConstant.COMP.INTORODUCTION_FLOW_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childIntroductionFlow.setUiLabels(appIntroductionLabels);
                    }
                    else if (eventIndex == 3) {

                        this.childCompanyUsingIt.loadStaticContent(data);
                        var companyUsingIt: any = this.languageService.getUiLabels(AppConstant.COMP.COMPANY_USING_IT_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childCompanyUsingIt.setUiLabels(companyUsingIt);
                    }
                    else if (eventIndex == 4) {

                        this.childCosting.loadStaticContent(data);
                        var appCostingLabels: any = this.languageService.getUiLabels(AppConstant.COMP.COSTING_TAB, AppConstant.UI_LABEL_TEXT);
                        this.childCosting.setUiLabels(appCostingLabels);
                    }
                    else if (eventIndex == 5) {
                        this.childTermsOfUse.loadStaticContent(data);
                        var termsOfUseLabels: any = this.languageService.getUiLabels(AppConstant.COMP.TERMS_OF_USED, AppConstant.UI_LABEL_TEXT);
                        this.childTermsOfUse.setUiLabels(termsOfUseLabels);

                    }
                    else if (eventIndex == 6) {
                        this.childPrivacyPolicy.loadStaticContent(data);
                        var privacyPolicyLabels: any = this.languageService.getUiLabels(AppConstant.COMP.PRIVACY_POLICY, AppConstant.UI_LABEL_TEXT);
                        this.childPrivacyPolicy.setUiLabels(privacyPolicyLabels);

                    }
                }
            }, 200)
        }));
    }

}
