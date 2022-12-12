import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { StaticPageFetch } from 'src/app/models/backend-fetch/dxr-system';
import { UriService } from './uri.service';

@Injectable({
    providedIn: 'root'
})
export class SystemOverviewService {

    constructor(private uriService: UriService) { }

    getStaticPage(pageId: string, callBack?: any) {

        var url = '/system-overview/getPage';
        var cacheUrl = url + '/' + pageId;
        this.uriService.callBackendWithCache(url, AppConstant.HTTP_POST, cacheUrl, pageId, callBack);
    }

    getStaticPages(): Observable<StaticPageFetch[]> {
        var url = '/system-overview/getAllPages';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST);
    }

    saveStaticPage(staticPage: StaticPageFetch): Observable<StaticPageFetch> {
        var url = '/system-overview/savePage';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, staticPage);
    }
}
