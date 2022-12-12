import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { FaqVisitorService } from 'src/app/services/visitor-services/faq-visitor.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-faq-admin',
    templateUrl: './faq-admin.component.html',
    styleUrls: ['./faq-admin.component.css']
})
export class FaqAdminComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver,
        private faqVisitorService: FaqVisitorService,
        private matDialog: MatDialog,
        private languageService: LanguageService, private utilService: UtilService) { }

    // uiLabels = {
    //     pageHeader: 'FAQ',
    //     faqTypeMenu: 'FAQ Type',
    //     adminButton: 'Admin',
    //     wasteTypeLabel: 'Type',
    //     faqCatTabHeader: 'FAQ Category',
    //     faqQnATabHeader: 'Question & Answer'

    // }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.FAQ_ADMIN, AppConstant.UI_LABEL_TEXT);

    faqTypes: FaqTypeView[] = [];
    selectedFaqType!: FaqTypeView;
    faqInfoList: FaqInfoView[] = [];
    selectedIndex = 0;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.FAQ_ADMIN;

        this.faqVisitorService.backendFetchHandler.getFaqTypes().subscribe((data) => {
            if (data) {
                this.faqTypes = data;
                this.selectedFaqType = data[0];
                this.preparerFaqInfo(this.selectedFaqType.faqTypeId);
            }

        })
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    showSpecificFaq(selectedFaqMenu: FaqTypeView): void {
        this.selectedFaqType = selectedFaqMenu;
        this.preparerFaqInfo(this.selectedFaqType.faqTypeId);
    }

    preparerFaqInfo(faqTypeId: String): void {
        this.faqVisitorService.backendFetchHandler.getFaqInfoListByFaqType(faqTypeId).subscribe((data) => {
            this.faqInfoList = data;
        })
    }

    openAdminFaqDialog(): void {
        // const dialogRef = this.matDialog.open(FaqAdminComponent, {
        //     width: '1300px',
        //     height: '750px',
        //     data: this.selectedFaqType
        // });

        // dialogRef.afterClosed().subscribe((data) => {

        // });
    }

    public selectTab = (index: number, faqType: FaqTypeView): void => {
        this.selectedIndex = index;
        this.selectedFaqType = faqType;
        this.preparerFaqInfo(this.selectedFaqType.faqTypeId);
    }

    informChange(index: any) {
        this.selectedIndex = index;
    }


}
