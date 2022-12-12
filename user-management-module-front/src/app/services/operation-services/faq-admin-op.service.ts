import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { FaqTypeUpdate, FaqInfoUpdate } from 'src/app/models/backend-update/faq-update';
import { FaqTypeFetch, FaqInfoFetch } from 'src/app/models/backend-fetch/faq-fetch';
import { FaqTypeView, FaqInfoView } from 'src/app/models/view/faq-view';
import { UriService } from '../visitor-services/uri.service';
import { AppConstant } from 'src/app/config/app-constant';


@Injectable({
    providedIn: 'root'
})
export class FaqAdminOpService {

    constructor(private http: HttpClient, private uriService: UriService) { }

    faqTypeUpdateList: FaqTypeUpdate[] = [

    ];

    faqInfoUpdateList: FaqInfoUpdate[] = [

    ];

    saveFaqType(faqTypeView: FaqTypeView): Observable<FaqTypeView> {
        const faqTypeUpdate: FaqTypeUpdate = this.convertFaqTypeViewToFaqUpdate(faqTypeView);

        return this.uriService.callBackend('/faq/types/add', AppConstant.HTTP_POST, faqTypeUpdate);
    }

    convertFaqTypeViewToFaqUpdate(faqTypeView: FaqTypeView): FaqTypeUpdate {
        const faqTypeUpdate: FaqTypeUpdate = {
            faqTypeId: faqTypeView.faqTypeId,
            faqType: faqTypeView.faqType,
            faqTypeDescription: faqTypeView.faqTypeDescription,
            backendDate: '',
            frontendDate: '',
            dxrInfoCache: ''
        }

        return faqTypeUpdate;
    }

    convertFaqTypeUpdateToFaqTypeView(faqTypeUpdate: FaqTypeUpdate): FaqTypeView {
        const faqTypeView: FaqTypeView = {
            faqTypeId: faqTypeUpdate.faqTypeId,
            faqType: faqTypeUpdate.faqType,
            faqTypeDescription: faqTypeUpdate.faqTypeDescription,
            backendDate: '',
            frontendDate: '',
            dxrInfoCache: ''
        }

        return faqTypeView;
    }

    saveFaqInfo(faqTypeView: FaqInfoView): Observable<FaqInfoView> {
        const faqInfoUpdate: FaqInfoUpdate = this.convertFaqInfoViewToFaqInfoUpdate(faqTypeView);

        return this.uriService.callBackend('/faq/questions/add', AppConstant.HTTP_POST, faqInfoUpdate);
    }

    convertFaqInfoViewToFaqInfoUpdate(faqInfoView: FaqInfoView): FaqInfoUpdate {
        const faqTypeUpdate: FaqInfoUpdate = {
            faqInfoId: faqInfoView.faqInfoId,
            faqInfoQuestion: faqInfoView.faqInfoQuestion,
            faqInfoAnswer: faqInfoView.faqInfoAnswer,
            faqTypeId: faqInfoView.faqTypeId,
            backendDate: '',
            frontendDate: '',
            dxrInfoCache: ''
        }

        return faqTypeUpdate;
    }

    convertFaqInfoUpdateToFaqInfoView(faqInfoUpdate: FaqInfoUpdate): FaqInfoView {
        const faqTypeView: FaqInfoView = {
            faqInfoId: faqInfoUpdate.faqInfoId,
            faqInfoQuestion: faqInfoUpdate.faqInfoQuestion,
            faqInfoAnswer: faqInfoUpdate.faqInfoAnswer,
            faqTypeId: faqInfoUpdate.faqTypeId,
            backendDate: '',
            frontendDate: '',
            dxrInfoCache: ''

        }

        return faqTypeView;
    }

}
