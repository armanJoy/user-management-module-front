import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo, WasteRequestResponse } from 'src/app/models/backend-fetch/company-settings-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-request-reply-popup',
    templateUrl: './request-reply-popup.component.html',
    styleUrls: ['./request-reply-popup.component.css']
})
export class RequestReplyPopupComponent implements OnInit {

    viewComponent = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private breakpointObserver: BreakpointObserver, private languageService: LanguageService, public dialogRef: MatDialogRef<RequestReplyPopupComponent>, private utilService: UtilService) { }

    selectedWaste: any;

    componentCode!: string;
    isSystemAdmin: boolean = false;

    // wasteReply?: WasteRequestResponse;
    ngOnInit(): void {

        if (this.data.selectedWaste) {
            // this.branchInfo = Object.assign({}, this.data.branch);
            this.selectedWaste = JSON.parse(JSON.stringify(this.data.selectedWaste));
            this.requestReply.reply = this.selectedWaste.reply;
        }
        // if (this.data.wasteReply) {
        //     // this.branchInfo = Object.assign({}, this.data.branch);
        //     this.requestReply = JSON.parse(JSON.stringify(this.data.wasteReply));

        //     this.requestReply.reply = (this.selectedWaste.reply) ? this.selectedWaste.reply : this.requestReply.reply;
        // }

        this.viewComponent = true;

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.REQUEST_REPLY_POPUP;
    }


    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );


    requestReply: WasteRequestResponse = {
        wasteRequestResponseId: "",
        wasteRequestId: "",
        reply: ""
    }

    resetRequestReply() {
        this.requestReply = {
            wasteRequestResponseId: "",
            wasteRequestId: "",
            reply: ""
        }
    }

    addReply() {
        if (this.requestReply && this.requestReply.reply && this.requestReply.reply.length > 0) {
            this.requestReply.wasteRequestId = this.selectedWaste.wasteRequestId;

            this.requestReply.wasteRequestResponseId = (this.requestReply.wasteRequestResponseId) ? this.requestReply.wasteRequestResponseId : this.utilService.generateUniqueId();

            this.dialogRef.close(this.requestReply);
            this.resetRequestReply();
        }
        else {
            this.utilService.showSnackbar("Reply can not empty", 3000);
        }
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.REQUEST_REPLY_POPUP, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "reply": "Waste Request Reply",
    //     "close": "Close",
    //     "send": "Send",
    // }

}
