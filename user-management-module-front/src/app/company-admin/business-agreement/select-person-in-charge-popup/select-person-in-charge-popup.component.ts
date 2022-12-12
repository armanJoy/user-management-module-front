import { Component, Inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfoFetch } from 'src/app/models/backend-fetch/user-management-fetch';
import { BusinessAgreementService } from 'src/app/services/operation-services/dumper-admin/business-agreement.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { AgreementPartnerInfo } from 'src/app/models/backend-fetch/business-agreement';
import { AppConstant } from 'src/app/config/app-constant';

@Component({
    selector: 'app-select-person-in-charge-popup',
    templateUrl: './select-person-in-charge-popup.component.html',
    styleUrls: ['./select-person-in-charge-popup.component.css']
})
export class SelectPersonInChargePopupComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private utilService: UtilService, @Inject(MAT_DIALOG_DATA) public agreementPartnerInfo: AgreementPartnerInfo, private businessAgreementService: BusinessAgreementService) { }

    userList: UserInfoFetch[] = [];
    uiLabels: any = {
        headerLabel: "Select Person in Charge",
        userListHeader: "Select Person from Company User",
        departmentAndJob: "Department / Job Title",
        contactNo: "Contact No",
        email: "Email",
        userName: "Name",
        addButton: "Add Person in Charge",
        closeButton: 'Close'
    }
    viewContent = false;

    componentCode!: string;
    isSystemAdmin: boolean = false;
    ngOnInit(): void {

        this.uiLabels = this.languageService.getUiLabels(AppConstant.COMP.SELECT_PERSON_IN_CHARGE_POPUP, AppConstant.UI_LABEL_TEXT);

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SELECT_PERSON_IN_CHARGE_POPUP;

        if (this.agreementPartnerInfo) {
            this.businessAgreementService.getPersonInChargeList(this.agreementPartnerInfo.companyId).subscribe(data => {
                if (data) {
                    this.userList = data;

                    this.prepareSelectedUserListForView();
                    this.prepareSelectedUser(this.agreementPartnerInfo.personInChargeId);

                }
            })
        }

    }

    prepareSelectedUserListForView() {
        if (this.userList) {

            if (this.userList.length > 0) {
                this.selectedItem = this.userList[0];
                this.userList.forEach(element => {
                    element.userContactNoFormated = this.utilService.prepareContactNoFormate(element.userContactNo);
                });
            }
        }

        this.viewContent = true;
    }

    prepareSelectedUser(userInfoId: string) {
        if (userInfoId && this.userList) {

            if (this.userList.length > 0) {
                // this.selectedItem = this.userList[0];
                this.userList.forEach(element => {
                    if (userInfoId == element.userInfoId) {
                        this.selectedItem = element;
                    }
                });
            }
        }
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    selectedItem: UserInfoFetch = {} as UserInfoFetch;
    selectListItem(item: any) {
        this.selectedItem = item;
    }



}
