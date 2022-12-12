import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFaqCategoryComponent } from '../add-faq-category/add-faq-category.component';
import { FaqAdminOpService } from 'src/app/services/operation-services/faq-admin-op.service';
import { FaqTypeUpdate, FaqInfoUpdate } from 'src/app/models/backend-update/faq-update';
import { FaqTypeFetch, FaqInfoFetch } from 'src/app/models/backend-fetch/faq-fetch';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { AppConstant } from 'src/app/config/app-constant';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq-category-admin',
    templateUrl: './faq-category-admin.component.html',
    styleUrls: ['./faq-category-admin.component.css']
})
export class FaqCategoryAdminComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, faqTypes: FaqTypeView) => void;

    constructor(private dialog: MatDialog, private faqAdminOpService: FaqAdminOpService, private faqVisitorService: FaqVisitorService, private languageService: LanguageService, private utilService: UtilService) { }

    faqTypes: FaqTypeView[] = [];

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_FAQ_CATEGORY_ADMIN;

        this.faqVisitorService.backendFetchHandler.getFaqTypes().subscribe((data) => {
            this.faqTypes = data;
        })
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_CATEGORY_ADMIN, AppConstant.UI_LABEL_TEXT);

    public openCategoryAddDialog = (selectedFaqType?: FaqTypeView): void => {

        const addFaqCatDialog = this.dialog.open(AddFaqCategoryComponent, {
            width: '700px',
            data: (selectedFaqType) ? selectedFaqType : '',
        })

        addFaqCatDialog.afterClosed().subscribe((data: FaqTypeView) => {
            if (data) {
                this.saveFaqType(data);
            }
        })
    }

    saveFaqType(newFaqType: FaqTypeView) {
        if (newFaqType) {
            if (!newFaqType.faqTypeId || newFaqType.faqTypeId == '') {
                var id = this.utilService.generateUniqueId();
                newFaqType.faqTypeId = id;
                // this.faqAdminOpService.generateId([newFaqType.faqType, 'FaqType']);
            }
            this.faqAdminOpService.saveFaqType(newFaqType).subscribe(savedData => {
                if (savedData) {

                    this.updateFaqList(savedData);

                }
            });
        }

    }

    updateFaqList(newFaqType: FaqTypeView) {

        let itemIndex = this.faqTypes.findIndex(item => item.faqTypeId == newFaqType.faqTypeId);
        if (itemIndex >= 0) {
            this.faqTypes[itemIndex] = newFaqType;
        } else {
            this.faqTypes.unshift(newFaqType);
        }

    }

    showFaqDetails(selectedFaqType: FaqTypeView) {
        // this.selectedFaqType = selectedFaqType;
        this.selectTab(1, selectedFaqType);
    }

}
