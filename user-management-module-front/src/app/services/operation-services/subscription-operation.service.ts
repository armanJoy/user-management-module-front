import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubscriptionInfoFetch } from 'src/app/models/backend-fetch/subscription-fetch';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../visitor-services/uri.service';
import { LanguageService } from '../visitor-services/language.service';

@Injectable({
    providedIn: 'root'
})
export class SubscriptionOperationService {

    constructor(private uriService: UriService, private languageService: LanguageService) { }

    public getSubscription(pageNo: number, searchText: string, status: string): Observable<SubscriptionInfoFetch[]> {
        var url = '/subscriptionInfo';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET, '', pageNo, searchText, status);
    }
    public updateSubscription(subscriptionUpdate: SubscriptionUpdateInfo): Observable<SubscriptionUpdateInfo> {

        var url = '/subscriptionInfo/update';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, subscriptionUpdate);
    }

    processTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.PROCESS_TITLE_KEY_ENG : AppConstant.PROCESS_TITLE_KEY_JPN;

    actionTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.ACTION_TITLE_KEY_ENG : AppConstant.ACTION_TITLE_KEY_JPN;

    statusTitle = (this.languageService.getSelectedLanguageIndex() == AppConstant.LANG_INDEX_ENG) ? AppConstant.STATUS_TITLE_KEY_ENG : AppConstant.STATUS_TITLE_KEY_JPN;


    prepareProcessDefForView(processDef: any, companyId: string) {
        processDef.processTitle = processDef[this.processTitle];
        processDef.companyId = companyId;
        processDef.viewMode = false;
        if (processDef.processAction) {
            processDef.processAction.forEach((eachAction: any) => {
                eachAction.actionTitle = eachAction[this.actionTitle];
            });
        }
        return processDef;
    }

    // convertUpdateToFetchModel(subscription: SubscriptionUpdateInfo): SubscriptionInfoFetch {
    //     var subscriptionFetch: SubscriptionInfoFetch = {
    //         id: subscription.id,
    //         companyName: subscription.companyName,
    //         zipCode: subscription.zipCode,
    //         address: subscription.address,
    //         contactNo: subscription.contactNo,
    //         subscriptionEmail: subscription.subscriptionEmail,
    //         companyCategory: subscription.companyCategory,
    //         isHuman: subscription.isHuman,
    //         isAgree: subscription.isAgree,
    //         response: subscription.response,
    //         backendDate: '',
    //         frontendDate: '',
    //         subscriberName: subscription.subscriberName,
    //         subscriberMail: subscription.subscriberMail,
    //         status: subscription.status,
    //         processsList: [],
    //         requesterMail: subscription.requesterMail,
    //     }

    //     return subscriptionFetch
    // }

    prepareSubscriptionForView(eachsubscription: SubscriptionInfoFetch, subscriptionProcessDef: any[], companyId: string) {

        eachsubscription.processsList = this.prepareSubscriptionProcessButtons(Object.assign({}, eachsubscription), subscriptionProcessDef, companyId);

        eachsubscription.status.statusTitle = this.getStatusTitle(eachsubscription.status.statusId, subscriptionProcessDef);

        return eachsubscription;
    }

    prepareSubscriptionProcessButtons(subscription: SubscriptionInfoFetch, subscriptionProcessDef: any[], companyId: string) {

        var processsList: any[] = [];
        if (subscriptionProcessDef) {

            subscriptionProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == subscription.status.statusId) {

                            if (eachProcess.processAction) {
                                eachProcess.processAction.forEach((eachAction: any) => {
                                    eachAction.actionTitle = eachAction[this.actionTitle];
                                });
                            }

                            if (eachProcess.partyAccess != AppConstant.SUBSCRIPTION_PROCESS_ACCESS_NONE) {
                                var creatorProcessDef: any = Object.assign({}, eachProcess);
                                creatorProcessDef.processTitle = creatorProcessDef[this.processTitle];

                                processsList.push(creatorProcessDef);
                            }


                        }
                    });
                }
            })
        }

        return processsList;
    }

    getStatusTitle(statusId: string, subscriptionProcessDef: any[]) {
        var statusTitleValue = '';
        if (subscriptionProcessDef) {
            subscriptionProcessDef.forEach(eachProcess => {
                if (eachProcess.initialStatus) {
                    eachProcess.initialStatus.forEach((element: any) => {
                        if (element.statusId == statusId) {

                            statusTitleValue = element[this.statusTitle];

                        }
                    });
                }
            })
        }

        return statusTitleValue;
    }
    updateSubscriptionStatus(subscription: SubscriptionUpdateInfo): Observable<SubscriptionInfoFetch> {
        var url = '/subscriptionInfo/update';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, subscription);
    }

    getSubscriptionProcessDef(): Observable<any[]> {

        // return of(this.subscriptionProcessDef)

        var url = '/subscriptionInfo/get-subscription-process-def';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    subscriptionProcessDef: any[] = [

        {
            "processId": "acceptProcess",
            "processTitleEng": "Accept",
            "processTitleJpn": "Accept",
            "initialStatus": [
                {
                    "statusId": "statusWaitingForConfirmation",
                    "statusTitleEng": "Waiting For Confirmation",
                    "statusTitleJpn": "Waiting For Confirmation",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                },
                {
                    "statusId": "statusTemporaryUse",
                    "statusTitleEng": "Temporary Use",
                    "statusTitleJpn": "Temporary Use",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "view",
            "partyAccess": "view",
            "resultantStatusId": "statusInUse",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "acceptActionId",
                    "actionTitleEng": "Accept",
                    "actionTitleJpn": "Accept",
                    "initialStatus": [
                        "statusWaitingForConfirmation",
                        "statusTemporaryUse"
                    ],
                    "viewAcess": [
                        "party"
                    ],
                    "editAccess": [],
                    "agreementStatusId": "statusInUse",
                    "isApproval": false
                }
            ]
        },
        {
            "processId": "suspendProcess",
            "processTitleEng": "Suspend",
            "processTitleJpn": "Suspend",
            "initialStatus": [
                {
                    "statusId": "statusInUse",
                    "statusTitleEng": "In Use",
                    "statusTitleJpn": "In Use",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "view",
            "partyAccess": "view",
            "resultantStatusId": "statusSuspended",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "suspendedActionId",
                    "actionTitleEng": "Suspend",
                    "actionTitleJpn": "Suspend",
                    "initialStatus": [
                        "statusInUse"
                    ],
                    "viewAcess": [
                        "party"
                    ],
                    "editAccess": [],
                    "agreementStatusId": "statusSuspended",
                    "isApproval": false
                }
            ]
        },
        {
            "processId": "suspendedProcessId",
            "processTitleEng": "",
            "processTitleJpn": "",
            "initialStatus": [
                {
                    "statusId": "statusSuspended",
                    "statusTitleEng": "Suspended",
                    "statusTitleJpn": "Suspended",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "none",
            "partyAccess": "none",
            "resultantStatusId": "",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "",
                    "actionTitleEng": "",
                    "actionTitleJpn": "",
                    "initialStatus": [
                        "statusSuspended"
                    ],
                    "viewAcess": [

                    ],
                    "editAccess": [],
                    "agreementStatusId": "",
                    "isApproval": false
                }
            ]
        },
        {
            "processId": "rejectProcess",
            "processTitleEng": "Reject",
            "processTitleJpn": "Reject",
            "initialStatus": [
                {
                    "statusId": "statusWaitingForConfirmation",
                    "statusTitleEng": "Waiting For Confirmation",
                    "statusTitleJpn": "Waiting For Confirmation",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                },
                {
                    "statusId": "statusTemporaryUse",
                    "statusTitleEng": "Temporary Use",
                    "statusTitleJpn": "Temporary Use",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "view",
            "partyAccess": "view",
            "resultantStatusId": "statusRejected",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "rejectActionId",
                    "actionTitleEng": "Reject",
                    "actionTitleJpn": "Reject",
                    "initialStatus": [
                        "statusWaitingForConfirmation",
                        "statusTemporaryUse"
                    ],
                    "viewAcess": [
                        "party"
                    ],
                    "editAccess": [],
                    "agreementStatusId": "statusRejected",
                    "isApproval": false
                }
            ]
        },
        {
            "processId": "reviveProcessId",
            "processTitleEng": "",
            "processTitleJpn": "",
            "initialStatus": [
                {
                    "statusId": "statusRejected",
                    "statusTitleEng": "Rejected",
                    "statusTitleJpn": "Rejected",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "none",
            "partyAccess": "none",
            "resultantStatusId": "",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "",
                    "actionTitleEng": "",
                    "actionTitleJpn": "",
                    "initialStatus": [
                    ],
                    "viewAcess": [

                    ],
                    "editAccess": [],
                    "agreementStatusId": "",
                    "isApproval": false
                }
            ]
        },
        {
            "processId": "temporaryUseProcess",
            "processTitleEng": "Temporary Use",
            "processTitleJpn": "Temporary Use",
            "initialStatus": [
                {
                    "statusId": "statusWaitingForConfirmation",
                    "statusTitleEng": "Waiting For Confirmation",
                    "statusTitleJpn": "Waiting For Confirmation",
                    "operationDef": {
                        "operationId": "opInUse",
                        "operationTitleEng": "In Use",
                        "operationTitleJpn": "In Use"
                    }
                }
            ],
            "triggeringProcessIds": [],
            "creatorAccess": "view",
            "partyAccess": "view",
            "resultantStatusId": "statusTemporaryUse",
            "isApprovalRequired": true,
            "processAction": [
                {
                    "actionId": "temporaryUseActionId",
                    "actionTitleEng": "Temporary Use",
                    "actionTitleJpn": "Temporary Use",
                    "initialStatus": [
                        "statusWaitingForConfirmation"
                    ],
                    "viewAcess": [
                        "party"
                    ],
                    "editAccess": [],
                    "agreementStatusId": "statusTemporaryUse",
                    "isApproval": false
                }
            ]
        }

    ]

}
