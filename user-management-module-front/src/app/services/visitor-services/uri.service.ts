import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { environment } from 'src/environments/environment';
import { LanguageService } from './language.service';
import { UtilService } from './util.service';

@Injectable({
    providedIn: 'root'
})

export class UriService {

    BASE_URL: string = environment.serverUrl;

    constructor(private cookieService: CookieService, private http: HttpClient, private utilService: UtilService) { }

    public getHttpOptions() {
        var header = {
            headers: {
                app: 'arcgen'
            }
        }

        return header;
    }

    public getUrl(url: string): string {

        return (url.startsWith('/mob')) ? this.BASE_URL.replace('/web', '').concat(url) : this.BASE_URL.concat(url);
    }

    public callBackend(url: string, methodType: String, data?: any): Observable<any> {

        var response: any;
        var fullUrl: string = this.getUrl(url);
        // var fullUrl: string = baseUrl.concat(url);
        var options: any = this.getHttpOptions();


        if (methodType == AppConstant.HTTP_GET) {

            response = this.http.get<any>(fullUrl, options);

        } else if (methodType == AppConstant.HTTP_POST) {

            response = this.http.post<any>(fullUrl, data, options);

        } else if (methodType == AppConstant.HTTP_DELETE) {
            options.body = data;
            response = this.http.delete<any>(fullUrl, options);

        }

        return response;
    }

    getZipCodeInformation(zipCode: string): Observable<any> {
        var url = '/util/zip';
        return this.callBackend(url, AppConstant.HTTP_POST, zipCode);
    }


}
