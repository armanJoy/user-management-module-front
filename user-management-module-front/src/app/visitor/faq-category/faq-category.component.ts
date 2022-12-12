import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from 'src/app/common-directives/delete-confirmation/delete-confirmation.component';
import { AppConstant } from 'src/app/config/app-constant';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq-category',
    templateUrl: './faq-category.component.html',
    styleUrls: ['./faq-category.component.css']
})
export class FaqCategoryComponent implements OnInit {
    @Input()
    public selectTab!: (index: number, faqTypes: FaqTypeView) => void;

    @Input()
    faqTypes!: FaqTypeView[]

    @Input()
    isAdmin: boolean = false;

    @Input()
    public editFaqType!: (selectedFaqType: FaqTypeView) => void;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    constructor(private faqVisitorService: FaqVisitorService, private languageService: LanguageService, private utilService: UtilService, private dialog: MatDialog) { }

    uiLabels: any = {};

    selectedFaqType?: FaqTypeView;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FAQ_CATEGORY;
        this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);
    }

    showFaqDetails(selectedFaqType: FaqTypeView) {
        this.selectedFaqType = selectedFaqType;
        this.selectTab(1, selectedFaqType);
    }

    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    removeFaqType(itemId: string) {
        var removeTriggerData: RemoveTriggerData = {
            itemeId: itemId,
            triggerUserId: this.utilService.getUserIdCookie(),
            triggerCompanyId: this.utilService.getCompanyIdCookie(),
            removeOperationType: AppConstant.FAQ_TYPE_REMOVE_OPERATION
        }

        const removeDialog = this.dialog.open(DeleteConfirmationComponent, {
            width: '40%',
            // height: '30%',
            // data: forwardLinks,
            disableClose: true
        });

        removeDialog.afterClosed().subscribe(response => {
            if (response) {
                this.faqVisitorService.removeFaqType(removeTriggerData).subscribe(response => {
                    if (response) {
                        this.utilService.showRemovedToast();
                        this.removeFaqTypeFromViewList(itemId);

                    }
                });
            }
        });
    }

    removeFaqTypeFromViewList(faqTypeId: string) {
        var index = this.faqTypes.findIndex(item => item.faqTypeId == faqTypeId);

        if (index >= 0) {
            this.faqTypes.splice(index, 1);
        }
    }
}
