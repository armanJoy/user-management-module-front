import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { WasteRequestInfo, WasteRequestResponse } from 'src/app/models/backend-fetch/company-settings-fetch';
import { WasteRequest } from 'src/app/models/backend-fetch/waste-def';
import { LanguageService } from '../../visitor-services/language.service';
import { UriService } from '../../visitor-services/uri.service';
import { UtilService } from '../../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})
export class WasteRequestService {

    constructor(private languageService: LanguageService, private utilService: UtilService, private uriService: UriService) { }

    prepareWasteRequestView(wasteList: WasteRequestInfo[]) {
        if (wasteList) {
            wasteList.forEach(element => {
                element.ContactNoFormated = this.utilService.prepareContactNoFormate(element.contactNo);
            });
        }

        return wasteList;
    }

    public getWasteRequestInfoList(pageNo: number, searchText: string, status: string): Observable<WasteRequestInfo[]> {
        var url = '/system-admin/new-waste-request-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET, '', pageNo, searchText, status);
    };



    public updateWasteRequestInfo(request: WasteRequestResponse): Observable<WasteRequestResponse> {
        var url = '/system-admin/update-waste-request';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, request);
    };
}
