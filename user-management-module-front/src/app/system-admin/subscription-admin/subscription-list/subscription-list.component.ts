import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { SubscriptionStatus, SubscriptionInfoFetch } from 'src/app/models/backend-fetch/subscription-fetch';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { SubscriptionViewInfo } from 'src/app/models/view/subscription-view';
import { SubscriptionListPopupComponent } from '../subscription-list-popup/subscription-list-popup.component';
import { SubscriptionOperationService } from 'src/app/services/operation-services/subscription-operation.service';
import { AppConstant } from 'src/app/config/app-constant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { ConfirmationSubscriptionStatusComponent } from '../confirmation-subscription-status/confirmation-subscription-status.component';
import { BulkSubscriptionComponent } from '../../bulk-subscription/bulk-subscription.component';
import { SubscriptionFormComponent } from 'src/app/visitor/subscription/subscription-form/subscription-form.component';


@Component({
    selector: 'app-subscription-list',
    templateUrl: './subscription-list.component.html',
    styleUrls: ['./subscription-list.component.css']
})
export class SubscriptionListComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private dialog: MatDialog, private languageService: LanguageService, public subscriptionOperationService: SubscriptionOperationService, private _snackBar: MatSnackBar, private utilService: UtilService) { }

    componentCode!: string;
    isSystemAdmin: boolean = false;

    subscriptionProcessDef: any[] = [];
    selectedProcess: any;
    selectedCompanyId: any = this.utilService.getCompanyIdCookie();
    confirmationFilter = AppConstant.SUBSCRIPTION_INITIAL_STATUS;
    acceptFilter = AppConstant.SUBSCRIPTION_NEW_COMPANY_STATUS;
    temporaryFilter = AppConstant.SUBSCRIPTION_TEMPORARY_COMPANY_STATUS;
    rejectFilter = AppConstant.SUBSCRIPTION_REJECTION_STATUS;
    suspendFilter = AppConstant.SUBSCRIPTION_SUSPENSION_STATUS;
    totalPage: number = 0;
    pageSize: number = AppConstant.DXR_LIST_VIEW_PAGE_SIZE;
    dataEndsLabel: string = AppConstant.Data_Ends_Label;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.SUBSCRIPTION_LIST;
        var companyId = this.utilService.getCompanyIdCookie();
        // this.searchByText();
        // this.getSubscription(0, '', this.subscriptionOperationService.);
        this.getSubscription(0, '', this.filterSelect);
    }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    searchParam: any = {
        pageNo: 0,
        searchText: ''
    };

    pageNo: number = 0;
    searchText: string = ''


    searchByText() {

        var pageNo: number = JSON.parse(JSON.stringify(this.utilService.getPageNo()));
        var searchText: string = JSON.parse(JSON.stringify(this.utilService.getSearchText()));

        if (!searchText) {
            searchText = '';
        }

        if (!pageNo) {
            pageNo = 0;
        }

        this.getSubscription(pageNo, searchText, this.filterSelect);
    }

    public getSubscription(pageNo: number, searchText: string, status: string) {


        this.subscriptionOperationService.getSubscription(pageNo, searchText, status).subscribe((data: any) => {

            if (data) {
                this.subscriptionList = data;
                // this.totalPage = data..get('X-Token')
            }
            this.getProcessDef()

        });
    }



    selectedItem: any;
    selectListItem(item: any) {
        this.selectedItem = item;
    }

    public getProcessDef() {
        this.subscriptionOperationService.getSubscriptionProcessDef().subscribe(data => {
            if (data) {
                this.subscriptionProcessDef = data;
                this.selectedProcess = this.subscriptionOperationService.prepareProcessDefForView(this.subscriptionProcessDef[0], this.selectedCompanyId);
            }
            // this.prepareFilterItems(Object.assign([], this.projectProcessDef));
            this.prepareSubscriptionListView(this.subscriptionList);
        })
    }

    prepareSubscriptionListView(subscriptionList: SubscriptionInfoFetch[]) {
        var count = 0;

        if (subscriptionList && subscriptionList.length > 0) {
            subscriptionList.forEach(subscription => {

                subscription = this.subscriptionOperationService.prepareSubscriptionForView(subscription, this.subscriptionProcessDef, this.selectedCompanyId);

            });
        }
    }


    updateStatus(subscription: SubscriptionUpdateInfo, eachProcess: any) {
        // this.actionConfirmAndSave(eachProcess, subscription.status.statusTitle, this.subscriptionProcessDef);

        if (eachProcess) {
            subscription.status.statusId = eachProcess.resultantStatusId;
        }
        this.subscriptionOperationService.updateSubscriptionStatus(subscription).subscribe(data => {
            if (data) {

                var updatedSubscription: SubscriptionInfoFetch = this.subscriptionOperationService.prepareSubscriptionForView(Object.assign({}, data), this.subscriptionProcessDef, this.selectedCompanyId);

                this.updateSubscriptionList(JSON.parse(JSON.stringify(updatedSubscription)));
                this.actionConfirmAndSave(eachProcess, updatedSubscription.status.statusTitle, this.subscriptionProcessDef);
            }

        });
    }

    updateSubscriptionList(subscription: SubscriptionInfoFetch) {

        var index = -1;
        index = this.subscriptionList.findIndex(item => item.id == subscription.id);
        if (index >= 0) {
            this.subscriptionList[index] = subscription;
        }

    }

    actionConfirmAndSave(eachProcess: any, currentStatus: string, subscriptionProcessDef: any[]) {
        const confirmDialog = this.dialog.open(ConfirmationSubscriptionStatusComponent, {
            data: {
                currentStatus: currentStatus,
                newStatus: this.subscriptionOperationService.getStatusTitle(eachProcess.resultantStatusId, subscriptionProcessDef),
                isApprovedByOtherParty: false
            },
        });

    }

    // uiLabels = {
    //     subuscriptionList: "Subcription List",
    //     filterBy: "Filter by",
    //     companyName: "Company Name",
    //     new: "New",
    //     accept: "Accept",
    //     reject: "Reject",
    //     detail: "Detail",
    //     type: "Company Type"

    // }


    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_LIST, AppConstant.UI_LABEL_TEXT);
    subscriptionList: SubscriptionInfoFetch[] = [];
    newFilterValue = AppConstant.SUBSCRIPTION_INITIAL_SUBMIT_STATUS;
    filterSelect: string = AppConstant.SUBSCRIPTION_INITIAL_STATUS;

    receivedPopupSubscription: SubscriptionInfoFetch = {
        id: '',
        companyName: '',
        zipCode: '',
        address: '',
        contactNo: '',
        subscriptionEmail: '',
        companyCategory: [],
        isHuman: false,
        isAgree: false,
        response: '',
        backendDate: '',
        frontendDate: '',
        subscriberName: '',
        subscriberMail: '',
        status: {} as SubscriptionStatus,
        processsList: [],
        requesterMail: "",
    };
    sendSubscriptionInfoForUpdate: SubscriptionUpdateInfo = {
        id: '',
        companyName: '',
        address: '',
        contactNo: '',
        subscriptionEmail: '',
        companyCategory: [],
        isHuman: false,
        isAgree: false,
        response: '',
        subscriberName: '',
        subscriberMail: '',
        zipCode: '',
        password: '',
        status: {} as SubscriptionStatus,
        requesterMail: "",
    }

    PrepareSubscriptionInfoForUpdate(updateSubscription: SubscriptionInfoFetch) {
        this.sendSubscriptionInfoForUpdate.id = updateSubscription.id;
        this.sendSubscriptionInfoForUpdate.companyName = updateSubscription.companyName;
        this.sendSubscriptionInfoForUpdate.zipCode = updateSubscription.zipCode;
        this.sendSubscriptionInfoForUpdate.address = updateSubscription.address;
        this.sendSubscriptionInfoForUpdate.subscriptionEmail = updateSubscription.subscriptionEmail;
        this.sendSubscriptionInfoForUpdate.isHuman = updateSubscription.isHuman;
        this.sendSubscriptionInfoForUpdate.isAgree = updateSubscription.isAgree;
        this.sendSubscriptionInfoForUpdate.response = updateSubscription.response;
        this.sendSubscriptionInfoForUpdate.subscriberMail = updateSubscription.subscriberMail;
        this.sendSubscriptionInfoForUpdate.subscriberName = updateSubscription.subscriberName;
        this.sendSubscriptionInfoForUpdate.contactNo = updateSubscription.contactNo;
        this.sendSubscriptionInfoForUpdate.companyCategory = updateSubscription.companyCategory;
        this.sendSubscriptionInfoForUpdate.status.statusId = updateSubscription.status.statusId;
        this.sendSubscriptionInfoForUpdate.status.statusTitle = updateSubscription.status.statusTitle;

        // updateSubscription.companyCategory.forEach(element => {
        //     this.sendSubscriptionInfoForUpdate.companyCategory.push(element);

        // });
    }


    saveUpdateSubscription(updateSubscription: SubscriptionInfoFetch) {
        this.PrepareSubscriptionInfoForUpdate(updateSubscription);

        this.subscriptionOperationService.updateSubscription(this.sendSubscriptionInfoForUpdate).subscribe((data) => {
            if (data) {
                // var subscriptionListCopy = this.subscriptionList;
                this.subscriptionList.forEach(element => {
                    if (element.id == data.id) {
                        element.response = data.response;
                    }
                    // this.subscriptionList = subscriptionListCopy;
                });

                this.openSnackBar();
            }
        });
    }

    openSnackBar() {
        this._snackBar.open('Response Saved', '', {
            duration: 3000,
            verticalPosition: 'top'
        })
    }
    openSelectedSubscriptionDialog(selectedSubscription: SubscriptionViewInfo): void {
        {
            const dialogRef = this.dialog.open(SubscriptionListPopupComponent, {
                width: '600px',

                data: selectedSubscription,
                disableClose: true
            });

            dialogRef.afterClosed().subscribe(result => {

                if (result) {
                    this.receivedPopupSubscription = result;
                    this.saveUpdateSubscription(this.receivedPopupSubscription);
                }
            });
        }
    }

    // get sortData() {
    //     return this.subscriptionList.sort((a, b) => {
    //         return <any>new Date(b.backendDate) - <any>new Date(a.backendDate);
    //     });
    // }

    get filterByResponse() {
        this.subscriptionList.sort((a, b) => (a.backendDate < b.backendDate) ? 1 : ((b.backendDate < a.backendDate) ? -1 : 0));
        return this.subscriptionList.filter(item => item.response == this.filterSelect);
    }

    addNewCompanyDiolog() {

        const sampleDialog = this.dialog.open(SubscriptionFormComponent, {
            // width: '60%',
            // height: '50%'
            data: {
                isPopup: true
            }
        });

        sampleDialog.afterClosed().subscribe(result => {
            if (result) {
            }
        });
    }

    addBulkSubscription() {
        const bulkSubscriptionDialog = this.dialog.open(BulkSubscriptionComponent, {
            width: '75%',
            height: '75%'
        });

        bulkSubscriptionDialog.afterClosed().subscribe(closeResponse => {
            this.filterSelect = this.temporaryFilter;
            this.searchByText();

        })
    }

}
