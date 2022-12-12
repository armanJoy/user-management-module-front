import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { SubscriptionInfoFetch } from 'src/app/models/backend-fetch/subscription-fetch';
import { SubscriptionUpdateInfo } from 'src/app/models/backend-update/subscription-update';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from './uri.service';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
@Injectable({
    providedIn: 'root'
})
export class SubscriptionVisitorService {

    constructor(private http: HttpClient, private uriService: UriService) { }



    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {
        var url = '/subscriptionInfo/set-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, NotificationSetInfo);
    }


    public getSubscriptionId(email: string): Observable<string> {
        return of(email);
    }


    getZipCodeInformation(zipCode: string): Observable<any> {
        var url = '/util/zip';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, zipCode);
    }

    public saveSubscription(subscriptionSave: SubscriptionUpdateInfo): Observable<SubscriptionUpdateInfo> {
        var url = '/subscriptionInfo/add';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, subscriptionSave);
    }



}
