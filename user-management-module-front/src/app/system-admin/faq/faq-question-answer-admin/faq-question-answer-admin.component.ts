import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFaqCategoryComponent } from '../add-faq-category/add-faq-category.component';
import { FaqAdminOpService } from 'src/app/services/operation-services/faq-admin-op.service';
import { FaqTypeUpdate, FaqInfoUpdate } from 'src/app/models/backend-update/faq-update';
import { FaqTypeFetch, FaqInfoFetch } from 'src/app/models/backend-fetch/faq-fetch';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { AddFaqQuestionAnswerComponent } from '../add-faq-question-answer/add-faq-question-answer.component';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq-question-answer-admin',
    templateUrl: './faq-question-answer-admin.component.html',
    styleUrls: ['./faq-question-answer-admin.component.css']
})
export class FaqQuestionAnswerAdminComponent implements OnInit {

    @Input()
    selectedFaqType!: FaqTypeView;

    @Input()
    faqInfoList!: FaqInfoView[];

    constructor(private languageService: LanguageService, private dialog: MatDialog, private faqAdminOpService: FaqAdminOpService, private faqVisitorService: FaqVisitorService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_FAQ_QUESTION_ANSWER_ADMIN;

    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_QUESTION_ANSWER_ADMIN, AppConstant.UI_LABEL_TEXT);
    // uiLabels = {
    //     listHeader: '',
    //     addButton: 'Add FAQ',
    // }

    openFaqAddDialog = (selectedFaqInfo?: FaqInfoView): void => {
        const addFaqDialog = this.dialog.open(AddFaqQuestionAnswerComponent, {
            width: '700px',
            data: {
                selectedFaqType: this.selectedFaqType,
                selectedFaqInfo: (selectedFaqInfo) ? selectedFaqInfo : null,
            }
        });

        addFaqDialog.afterClosed().subscribe(newFaqInfo => {
            if (newFaqInfo) {
                this.saveFaqInfo(newFaqInfo);
                // this.faqInfoList.unshift(newFaqInfo);
            }
        })
    }

    saveFaqInfo(newFaqInfo: FaqInfoView) {
        if (newFaqInfo) {
            if (!newFaqInfo.faqInfoId || newFaqInfo.faqInfoId == '') {
                var id = this.utilService.generateUniqueId();
                newFaqInfo.faqInfoId = id;
                // this.faqAdminOpService.generateId([newFaqInfo.faqInfoQuestion, newFaqInfo.faqTypeId]);
                newFaqInfo.faqTypeId = this.selectedFaqType.faqTypeId;
            }
            this.faqAdminOpService.saveFaqInfo(newFaqInfo).subscribe(savedData => {
                if (savedData) {
                    this.updateFaqInfoList(savedData);
                }
            });
        }
    }

    updateFaqInfoList(newFaqInfo: FaqInfoView) {

        let itemIndex = this.faqInfoList.findIndex(item => item.faqInfoId == newFaqInfo.faqInfoId);
        if (itemIndex >= 0) {
            this.faqInfoList[itemIndex] = newFaqInfo;
        } else {
            this.faqInfoList.unshift(newFaqInfo);
        }



    }
}
