import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInvitation, PartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UriService } from 'src/app/services/visitor-services/uri.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-company-invitation-popup',
    templateUrl: './company-invitation-popup.component.html',
    styleUrls: ['./company-invitation-popup.component.css']
})
export class CompanyInvitationPopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public companyInfo: PartnerInfo, private languageService: LanguageService, private utilService: UtilService, private uriService: UriService, public dialogRef: MatDialogRef<CompanyInvitationPopupComponent>) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.INVITATION_FORM, AppConstant.UI_LABEL_TEXT);
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.INVITATION_FORM;
        // this.utilService.printLangDef(this.uiLabels, this.componentCode);
        // this.uiLabels = this.languageService.getUiLabels(this.componentCode, AppConstant.UI_LABEL_TEXT);

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    uiLabels: any = {
        title: 'Invitation Form',
        companyName: 'Company Name',
        emailLabel: 'Email',
        sendBtn: 'Send Invitation',
        from: 'From',
        to: 'To',

    };

    invitationInfo: CompanyInvitation = {
        invitationId: '',
        senderComName: '',
        senderEmail: '',
        receiverComName: '',
        receiverEmail: ''
    }

    resetInvitaionInfo() {
        this.invitationInfo = {
            invitationId: '',
            senderComName: '',
            senderEmail: '',
            receiverComName: '',
            receiverEmail: ''
        }
    }
    sendInvitation() {
        if (this.invitationInfo) {
            this.invitationInfo.invitationId = this.utilService.generateUniqueId();

            this.invitationInfo.senderComName = this.companyInfo.companyName;
            this.invitationInfo.senderEmail = this.companyInfo.representativEmail;

            this.dialogRef.close(this.invitationInfo);
            this.resetInvitaionInfo();
        }

    }

}
