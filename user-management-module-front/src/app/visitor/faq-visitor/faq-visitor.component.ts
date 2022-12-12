import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { FaqTypeView, FaqInfoView, FaqDetailView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq-visitor',
    templateUrl: './faq-visitor.component.html',
    styleUrls: ['./faq-visitor.component.css']
})
export class FaqVisitorComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private faqVisitorService: FaqVisitorService, private languageService: LanguageService, private utilService: UtilService) { }

    faqTypes: FaqTypeView[] = [];
    selectedFaqType!: FaqTypeView;
    faqInfoList: FaqInfoView[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.FAQ_VISITOR_VIEW, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FAQ_VISITOR_VIEW;

        this.faqVisitorService.backendFetchHandler.getFaqTypes().subscribe((data) => {
            if (data) {
                this.faqTypes = data;
                this.selectedFaqType = data[0];

                this.preparerFaqInfo();


            }


        });

    }


    preparerFaqInfo(): void {
        this.faqVisitorService.backendFetchHandler.getFaqInfoList().subscribe((data) => {
            if (data) {
                this.faqInfoList = data;
                this.preparedFaqDataList = this.prepareFaqViewData();
            }
        })
    }


    preparedFaqDataList: FaqDetailView[] = [];

    prepareFaqViewData(): FaqDetailView[] {
        var preparedData: FaqDetailView[] = [];
        if (this.faqTypes)
            this.faqTypes.forEach((eachFaqType) => {
                var faqTypeData: FaqDetailView = {
                    faq: eachFaqType,
                    faqInfoList: []
                }
                if (this.faqInfoList) (
                    this.faqInfoList.forEach((eachFaqInfo) => {
                        //    var faqInfoData:FaqInfoView[]=[]
                        if (eachFaqInfo.faqTypeId == eachFaqType.faqTypeId) {
                            faqTypeData.faqInfoList.push(eachFaqInfo);
                        }

                    })

                )

                preparedData.push(faqTypeData)
            })
        return preparedData;

    }



    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    };

    uiLabels: any;
    //   =  {
    //     faqHeader: 'FAQ Details',
    //     faqTypeHeader: 'FAQ Type',
    //     question: 'Q',
    //     answer: 'A'

    // }
}
