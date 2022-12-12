import { Component, Inject, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InquiryInfoFetch } from 'src/app/models/backend-fetch/inquiryFetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';
@Component({
    selector: 'app-inquiry-reply',
    templateUrl: './inquiry-reply.component.html',
    styleUrls: ['./inquiry-reply.component.css']
})
export class InquiryReplyComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public selectedInquiry: InquiryInfoFetch, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService) { }

    // selectedInquiry?: InquiryInfoFetch
    userFlag?: string;
    viewComponent = false;

    responsedInquiry!: InquiryInfoFetch

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.REPLY_POPUP;

        this.responsedInquiry = Object.assign({}, this.selectedInquiry);

        this.viewComponent = true;

    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.REPLY_POPUP, AppConstant.UI_LABEL_TEXT);

}
