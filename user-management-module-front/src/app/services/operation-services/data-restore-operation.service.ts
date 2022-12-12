import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { RemovedData, RemoveTriggerData, RestoreInfo } from 'src/app/models/backend-fetch/dxr-system';
import { UriService } from '../visitor-services/uri.service';
import { UtilService } from '../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})
export class DataRestoreOperationService {

    constructor(private uriService: UriService, private utilService: UtilService) { }


    getRemovedDataByCompany(companyId: String, pageNo: number, searchText: string, status: string): Observable<RemovedData[]> {
        var url = "/data-restore/get-removed-items";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId, pageNo, searchText, status);
    }

    restoreRemovedDataByCompany(restoreInfo: RestoreInfo): Observable<RemovedData[]> {
        var url = "/data-restore/restore-removed-items";

        return this.uriService.callBackend(url, AppConstant.HTTP_POST, restoreInfo);
    }
}
