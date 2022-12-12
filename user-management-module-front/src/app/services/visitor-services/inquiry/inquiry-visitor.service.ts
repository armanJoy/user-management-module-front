import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { InquiryInfoUpdate } from 'src/app/models/backend-update/inquiryUpdate';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../uri.service';
import { NotificationSetInfo } from 'src/app/models/backend-fetch/notification';
@Injectable({
    providedIn: 'root'
})
export class InquiryVisitorService {

    constructor(private http: HttpClient, private uriService: UriService) { }
    inquiryInformation: InquiryInfoUpdate[] = [
        // { id: '00001', companyName: 'MSBD', personName: 'Rakib', contactNo: '01752709413', emailAddress: 'rakibsobuz@gmail.com', inquiryTitle: 'Subscription Fees', inquiryDetail: 'Please tell me about the amount of Subscription Fees', response: '1000Tk per year', isHuman: true, isAgreed: true },
        // { id: '00002', companyName: 'RFL', personName: 'Hasan', contactNo: '01521493608', emailAddress: 'Hasan@gmail.com', inquiryTitle: 'System Benefits', inquiryDetail: 'Please tell me about the benefits of subscription', response: '', isHuman: true, isAgreed: true },
        // { id: '00003', companyName: 'RTV', personName: 'Sobuz', contactNo: '01943239180', emailAddress: 'sobuz@gmail.com', inquiryTitle: 'Salary of Driver', inquiryDetail: 'Please tell me about the salary of driver', response: '10000Tk per month', isHuman: true, isAgreed: true },
        // { id: '00004', companyName: 'City Group', personName: 'Raju', contactNo: '01734682085', emailAddress: 'raju@gmail.com', inquiryTitle: 'Transport Company', inquiryDetail: 'Please tell me about the Transport Company Name', response: '', isHuman: true, isAgreed: true }
    ]
    public sendNotification(NotificationSetInfo: NotificationSetInfo): Observable<any> {
        var url = '/inquiry/inquiry-notification';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, NotificationSetInfo);
    }

    public addInquiryInfo(inquiry: InquiryInfoUpdate): Observable<InquiryInfoUpdate> {
        this.inquiryInformation.unshift(inquiry);
        var url = '/inquiry/add';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inquiry);


    }
    updateInquiry(selectedInquiry: InquiryInfoUpdate) {
        if (selectedInquiry) {
            this.inquiryInformation.forEach(element => {
                if (element.id == selectedInquiry.id) {
                    element.companyName = selectedInquiry.companyName;
                    element.personName = selectedInquiry.personName;
                    element.contactNo = selectedInquiry.contactNo;
                    element.emailAddress = selectedInquiry.emailAddress;
                    element.inquiryTitle = selectedInquiry.inquiryTitle;
                    element.inquiryDetail = selectedInquiry.inquiryDetail;
                    element.response = selectedInquiry.response;

                }

            });

        }


    }
    saveReply(selectedInquiry: InquiryInfoUpdate): Observable<InquiryInfoUpdate> {
        this.updateInquiry(selectedInquiry);
        var url = '/inquiry/response';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, selectedInquiry);
    }

}
