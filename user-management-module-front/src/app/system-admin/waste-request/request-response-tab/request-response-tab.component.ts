import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WasteRequestInfo, WasteRequestResponse } from 'src/app/models/backend-fetch/company-settings-fetch';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { RequestReplyPopupComponent } from '../request-reply-popup/request-reply-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { WasteRequestService } from 'src/app/services/operation-services/waste-request/waste-request.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-request-response-tab',
    templateUrl: './request-response-tab.component.html',
    styleUrls: ['./request-response-tab.component.css']
})
export class RequestResponseTabComponent implements OnInit {

    @Input()
    public selectTab!: (index: number, wasteRequest: WasteRequestInfo) => void;

    @Input()
    public selectedWaste!: WasteRequestInfo;

    @Input()
    wasteRequestList: WasteRequestInfo[] = [];

    viewComponent = false;

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, public dialog: MatDialog, public wasteRequestService: WasteRequestService, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        if (!this.selectedWaste) {
            this.selectedWaste = {
                companyId: '',
                companyName: '',
                userEmail: '',
                userName: '',
                wasteRequestId: '',
                personName: '',
                contactNo: '',
                ContactNoFormated: '',
                wasteType: '',
                wasteItem: '',
                unitDef: '',
                wasteShape: '',
                wastePackage: '',
                frontendDate: '',
                backendDate: '',
                reply: '',

            }
        }

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.REQUEST_RESPONSE;

        // if (this.selectedWaste && this.selectedWaste.contactNo) {
        //     this.selectedWaste.contactNo = this.utilService.prepareContactNoFormate(this.selectedWaste.contactNo);
        //     // this.selectedWaste.ContactNoFormated = this.utilService.prepareContactNoFormate(this.selectedWaste.contactNo);
        // }
        this.viewComponent = true;

    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    updateRequestReply(reply: WasteRequestResponse) {
        if (reply) {
            this.selectedWaste.reply = reply.reply;
        }
    }

    openReplyDialog(selectedWaste: WasteRequestInfo): void {
        const sampleDialog = this.dialog.open(RequestReplyPopupComponent, {
            width: '500px',
            data: {
                // wasteReply: wasteReply,
                selectedWaste: selectedWaste
            },
            disableClose: true
        });
        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
                this.wasteRequestService.updateWasteRequestInfo(result).subscribe((data) => {
                    if (data) {
                        this.updateRequestReply(data);
                    }
                })

            }

        });
    }

    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.REQUEST_RESPONSE, AppConstant.UI_LABEL_TEXT);

    // uiLabels = {
    //     "pageHeader": "Waste Request Info",
    //     "companyName": "Company Name",
    //     "personName": "Person Name",
    //     "contactNo": "Contact No",
    //     "wasteType": "Waste Type",
    //     "wasteItem": "Waste Item",
    //     "unitDef": "Waste Unit",
    //     "wasteShape": "Waste Shape",
    //     "wastePackage": "Waste Package",
    //     "reply": "Reply",
    // }

}
