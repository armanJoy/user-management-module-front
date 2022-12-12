import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { FaqTypeFetch, FaqInfoFetch } from 'src/app/models/backend-fetch/faq-fetch';
import { ThrowStmt } from '@angular/compiler';
import { UriService } from './uri.service';
import { AppConstant } from 'src/app/config/app-constant';
import { RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';

@Injectable({
    providedIn: 'root'
})
export class FaqVisitorService {

    constructor(private http: HttpClient, private uriService: UriService) { }

    removeFaqType(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/faq/remove-faq-type";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    removeFaqInfo(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/faq/remove-faq-info";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }

    backendFetchHandler = {

        getFaqTypes: (): Observable<FaqTypeFetch[]> => {
            var url = '/faq/types';
            return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        },

        getFaqInfoListByFaqType: (faqTypeId: String): Observable<FaqInfoFetch[]> => {

            var url = '/faq/questions/?faqType=' + faqTypeId;
            return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        },
        getFaqInfoList: (): Observable<FaqInfoFetch[]> => {

            var url = '/faq/questions/all'
            return this.uriService.callBackend(url, AppConstant.HTTP_GET);
        }
    }
}
