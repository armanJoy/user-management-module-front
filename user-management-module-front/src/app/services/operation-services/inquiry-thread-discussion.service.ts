import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { InquiryInfoFetch, InquiryReply, UserInquiry } from 'src/app/models/backend-fetch/inquiryFetch';
import { InquiryThreadView } from 'src/app/models/view/inquiryView';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';

@Injectable({
    providedIn: 'root'
})
export class InquiryThreadDiscussionService {

    constructor(private http: HttpClient, private uriService: UriService, private languageService: LanguageService) { }

    inquiryInfoList: InquiryInfoFetch[] = [
        // { id: '00001', companyName: 'MSBD', personName: 'Rakib', contactNo: '01752709413', emailAddress: 'rakibsobuz@gmail.com', inquiryTitle: 'Subscription Fees', inquiryDetail: 'Please tell me about the amount of Subscription Fees', frontendDate: '', backendDate: '', response: '1000Tk per year', isHuman: true, isAgreed: true },
        // { id: '00002', companyName: 'RFL', personName: 'Rakib', contactNo: '01521493608', emailAddress: 'rakibsobuz@gmail.com', inquiryTitle: 'System Benefits', inquiryDetail: 'Please tell me about the benefits of subscription', frontendDate: '', backendDate: '', response: '', isHuman: true, isAgreed: true },
        // { id: '00003', companyName: 'RTV', personName: 'Rakib', contactNo: '01943239180', emailAddress: 'rakibsobuz@gmail.com', inquiryTitle: 'Salary of Driver', inquiryDetail: 'Please tell me about the salary of driver', frontendDate: '', backendDate: '', response: '10000Tk per month', isHuman: true, isAgreed: true }

    ];

    getInquiryInfoList(userLoginInfo: UserInquiry): Observable<InquiryInfoFetch[]> {
        var url = '/inquiry/inquiry-thread';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, userLoginInfo);
        // return of(this.inquiryInfoList);
    }

    inquiryReplyList: InquiryReply[] = [
        { inquiryId: '00001', replyId: 'R001', frontendDate: '12.12.20', backendDate: '', reply: '1000Tk per year', userType: 'Admin' },
        { inquiryId: '00001', replyId: 'R002', frontendDate: '10.10.21', backendDate: '', reply: '2000Tk per year', userType: 'Visitor' },
        { inquiryId: '00001', replyId: 'R003', frontendDate: '11.11.22', backendDate: '', reply: '3000Tk per year', userType: 'Admin' },
    ];

    public getReplyThread(inquiryId: string): Observable<InquiryReply[]> {
        var url = '/inquiry/inquiry-thread/read';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inquiryId);
        // return of(this.inquiryReplyList);
    }

    public addReplyInfo(newReply: InquiryReply): Observable<InquiryReply> {
        this.inquiryReplyList.push(newReply);
        // return of(newReply);
        var url = '/inquiry/inquiry-reply/save';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, newReply);

    }



    // prepareViewList(inquiryList: InquiryInfoFetch[]): InquiryThreadView[] {
    //     const inquiryViewList: InquiryThreadView[] = [];
    //     inquiryList.forEach(element => {
    //         const inquiry: InquiryThreadView = {
    //             id: element.id,
    //             emailAddress: element.emailAddress,
    //             inquiryDetail: element.inquiryDetail
    //         };
    //         inquiryViewList.push(inquiry);

    //     });
    //     return inquiryViewList;
    // }

}
