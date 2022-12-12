import { Injectable } from '@angular/core';
import { InquiryInfoFetch } from 'src/app/models/backend-fetch/inquiryFetch';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InquiryView } from 'src/app/models/view/inquiryView';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../../visitor-services/uri.service';
import { UtilService } from '../../visitor-services/util.service';
@Injectable({
    providedIn: 'root'
})
export class InquiryAdminService {

    constructor(private http: HttpClient, private uriService: UriService, private utilService: UtilService) { }
    inquiryInfo: InquiryInfoFetch[] = [
        // { id: '00001', companyName: 'MSBD', personName: 'Rakib', contactNo: '01752709413', emailAddress: 'rakibsobuz@gmail.com', inquiryTitle: 'Subscription Fees', inquiryDetail: 'Please tell me about the amount of Subscription Fees', frontendDate: '', backendDate: '', response: '1000Tk per year', isHuman: true, isAgreed: true },
        // { id: '00002', companyName: 'RFL', personName: 'Hasan', contactNo: '01521493608', emailAddress: 'Hasan@gmail.com', inquiryTitle: 'System Benefits', inquiryDetail: 'Please tell me about the benefits of subscription', frontendDate: '', backendDate: '', response: '', isHuman: true, isAgreed: true },
        // { id: '00003', companyName: 'RTV', personName: 'Sobuz', contactNo: '01943239180', emailAddress: 'sobuz@gmail.com', inquiryTitle: 'Salary of Driver', inquiryDetail: 'Please tell me about the salary of driver', frontendDate: '', backendDate: '', response: '10000Tk per month', isHuman: true, isAgreed: true },
        // { id: '00004', companyName: 'City Group', personName: 'Raju', contactNo: '01734682085', emailAddress: 'raju@gmail.com', inquiryTitle: 'Transport Company', inquiryDetail: 'Please tell me about the Transport Company Name', frontendDate: '', backendDate: '', response: '', isHuman: true, isAgreed: true }
    ];

    prepareViewList(inquiryList: InquiryInfoFetch[]): InquiryView[] {
        const inquiryViewList: InquiryView[] = [];
        inquiryList.forEach(element => {
            const inquiry: InquiryView = {
                id: element.id,
                companyName: element.companyName,
                personName: element.personName,
                contactNo: element.contactNo,
                emailAddress: element.emailAddress,
                inquiryTitle: element.inquiryTitle,
                inquiryDetail: element.inquiryDetail,
                response: element.response,
                backendDate: element.backendDate,
                frontendDate: element.frontendDate,
                isHuman: element.isHuman,
                isAgreed: element.isAgreed,
                contactNoFormated: this.utilService.prepareContactNoFormate(element.contactNo)
            };
            inquiryViewList.push(inquiry);

        });
        return inquiryViewList;
    }
    getInquiryInfoList(pageNo: number, searchText: string, status: string): Observable<InquiryView[]> {
        var url = '/inquiry';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET, '', pageNo, searchText, status);
    }



}
