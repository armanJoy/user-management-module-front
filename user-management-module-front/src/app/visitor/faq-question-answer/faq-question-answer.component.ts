import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'app-faq-question-answer',
    templateUrl: './faq-question-answer.component.html',
    styleUrls: ['./faq-question-answer.component.css']
})
export class FaqQuestionAnswerComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver,
        private faqVisitorService: FaqVisitorService,
        private matDialog: MatDialog,
        private languageService: LanguageService, private utilService: UtilService, private dialog: MatDialog) { }

    @Input()
    selectedFaqType!: FaqTypeView;

    @Input()
    faqInfoList: FaqInfoView[] = [];

    @Input()
    isAdmin: boolean = false;

    @Input()
    public editFaqInfo!: (selectedFaqInfo: FaqInfoView) => void;

    componentCode!: string;
    isSystemAdmin: boolean = false;
    uiLabels: any = {};

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FAQ_QUESTION_ANSWER;

        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches),
            shareReplay()
        );

    removeFaqInfo(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.FAQ_INFO_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.faqVisitorService.removeFaqInfo(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeFaqInfoFromViewList(itemId);

                    }
                });
            }
        });
    }

    removeFaqInfoFromViewList(faqInfoId: string) {
        var index = this.faqInfoList.findIndex(item => item.faqInfoId == faqInfoId);

        if (index >= 0) {
            this.faqInfoList.splice(index, 1);
        }
    }
}
