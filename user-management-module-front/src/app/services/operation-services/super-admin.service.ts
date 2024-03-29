import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UriService } from '../visitor-services/uri.service';
import { UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminService {

    constructor(private http: HttpClient, private uriService: UriService) { }

    createDxrAdminUser(userInfoUpdate: UserInfoUpdate): Observable<UserInfoUpdate> {
        var url = '/user-management/create-user';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, userInfoUpdate);

        return response;

    }

    getUserInfoByMail(userMail: String): Observable<UserInfoUpdate> {
        var url = '/user-management/get-user-info-by-mail';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, userMail);

        return response;
    }

    getUserInfoByContact(userContact: String): Observable<UserInfoUpdate> {
        var url = '/user-management/get-user-info-by-contact';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, userContact);

        return response;
    }

    resendUserAccess(userInfoId: String): Observable<String> {
        var url = '/user-management/resendUserAccess';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, userInfoId);

        return response;
    }

    setDxrAdminAccess(dxrAdminAccessVM: String): Observable<String> {
        var url = '/user-management/set-dxr-access';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, dxrAdminAccessVM);

        return response;
    }

    setCompanyAdminAccess(companyAdminAccessVM: String): Observable<String> {
        var url = '/user-management/set-company-access';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, companyAdminAccessVM);

        return response;
    }

    setAgreementProcessDef(agreementProcessDefVM: String): Observable<String> {
        var url = '/agreement/set-agreement-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, agreementProcessDefVM);

        return response;
    }

    getAgreementProcessDef(): Observable<String> {
        var url = '/agreement/get-agreement-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_GET);

        return response;
    }

    setProjectProcessDef(projectProcessDefVM: String): Observable<String> {
        var url = '/project-initiation/set-project-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, projectProcessDefVM);

        return response;
    }

    getProjectProcessDef(): Observable<String> {
        var url = '/project-initiation/get-project-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_GET);

        return response;
    }

    setInvoiceProcessDef(invoiceProcessDefVM: String): Observable<String> {
        var url = '/invoice/set-invoice-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, invoiceProcessDefVM);

        return response;
    }

    getInvoiceProcessDef(): Observable<String> {
        var url = '/invoice/get-invoice-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_GET);

        return response;
    }

    setSubscriptionProcessDef(subscriptionProcessDefVM: String): Observable<String> {
        var url = '/subscriptionInfo/set-subscription-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, subscriptionProcessDefVM);

        return response;
    }

    setNotificationProcessDef(notificationProcessDefVM: String): Observable<String> {
        var url = '/notification/set-notification-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_POST, notificationProcessDefVM);

        return response;
    }

    getNotificationProcessDef(): Observable<String> {
        var url = '/notification/get-notification-process-def';

        var response = this.uriService.callBackend(url, AppConstant.HTTP_GET);

        return response;
    }

}
