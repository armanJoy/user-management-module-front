import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstant } from 'src/app/config/app-constant';
import { CompanyInfo, CompanyTripFetch, DriverTripPlan, PickInfo, RedirectUserInfo, TripQrData } from 'src/app/models/backend-fetch/load-unload';
import { environment } from 'src/environments/environment';
import { LanguageService } from '../visitor-services/language.service';
import { UriService } from '../visitor-services/uri.service';
import { UtilService } from '../visitor-services/util.service';

@Injectable({
    providedIn: 'root'
})
export class LoadUnloadService {

    constructor(private uriService: UriService, private utilService: UtilService, private languageService: LanguageService) { }

    confirmHandover(handoverPickIds: string[], isManifestoTrip: boolean): Observable<PickInfo[]> {
        var url = '/mob/load/confirm-handover-picks';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, handoverPickIds, 0, "", "", isManifestoTrip);
    }

    generateManifestoForTrip(driverTripPlan: DriverTripPlan): Observable<string> {
        var url = '/menifesto/generate-trip-load-manifesto';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripPlan);
    }

    getEnglishFormatDate(inputDate: string): Observable<any> {
        var url = '/mob/load/format-to-eng-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, inputDate);
    }

    getCurrentDate(): Observable<any> {
        var url = '/mob/load/current-date';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }

    getPartnerCompanyInfo(companyId: string): Observable<CompanyInfo> {
        var url = '/mob/load/partner-com-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, companyId);
    }

    getCompanyTrip(driverTripFetch: CompanyTripFetch): Observable<DriverTripPlan[]> {
        var url = '/mob/load/company-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, driverTripFetch);
    }

    setMobileAppRedirectInfo(redirectUserInfo: RedirectUserInfo): Observable<any> {
        var url = '/mob/redirect/save-mob-app-redirect-info';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, redirectUserInfo);
    }

    getTripPlan(tripInfoId: string, isManualManifestoTrip: boolean): Observable<DriverTripPlan> {
        var url = '/mob/load/scanned-trip-plan';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, { tripInfoId, isManualManifestoTrip });
    }

    loadPick(selectedTrip: DriverTripPlan, selectedPickIndex: number, tripDate: string) {

        var qrData: TripQrData = {
            tripInfoId: selectedTrip.tripInfoId,
            pickLocation: "",
            driverCompanyId: selectedTrip.vehicleInfo.companyId,
            driverId: selectedTrip.driverId,
        }

        if (selectedPickIndex >= 0) {
            qrData.pickLocation = selectedTrip.pickList[selectedPickIndex].disposalInfo.pickZipCode + ', ' + selectedTrip.pickList[selectedPickIndex].disposalInfo.pickLocation
        }

        this.getEnglishFormatDate(tripDate).subscribe(response => {
            if (response) {
                var redirectUserInfo: RedirectUserInfo = {
                    redirectSessionId: this.utilService.generateUniqueId(),
                    userId: this.utilService.getUserIdCookie(),
                    userAuth: this.utilService.getUserAuthPassCookie(),
                    companyId: this.utilService.getCompanyIdCookie(),
                    tripQrData: JSON.stringify(qrData),
                    redirectMenuUrlParentSegment: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.parentSegment,
                    redirectMenuUrl: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.url,
                    redirectMenuOutlet: AppConstant.DUMPER_MOBILE_MENU_REDIRECT_INFO.outlet,
                    userMenuAccess: JSON.stringify(this.languageService.getUserAccessInfo()),
                    selectedDate: response.date,
                    langIndex: this.utilService.getSelectedLanguageIndex()
                }
                console.log("Load Op: " + tripDate + " => " + response.date);
                this.setMobileAppRedirectInfo(redirectUserInfo).subscribe(response => {
                    if (response) {

                        // setTimeout(() => window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank'), 10)
                        window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank');

                    }
                });
            }
        })

    }

    redirectToUnloadOp() {

        var redirectUserInfo: RedirectUserInfo = {
            redirectSessionId: this.utilService.generateUniqueId(),
            userId: this.utilService.getUserIdCookie(),
            userAuth: this.utilService.getUserAuthPassCookie(),
            companyId: this.utilService.getCompanyIdCookie(),
            tripQrData: '',
            redirectMenuUrlParentSegment: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.parentSegment,
            redirectMenuUrl: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.url,
            redirectMenuOutlet: AppConstant.PROCESSOR_MOBILE_MENU_REDIRECT_INFO.outlet,
            userMenuAccess: JSON.stringify(this.languageService.getUserAccessInfo()),
            selectedDate: '',
            langIndex: this.utilService.getSelectedLanguageIndex()
        }

        this.setMobileAppRedirectInfo(redirectUserInfo).subscribe(response => {
            if (response) {
                // setTimeout(() => window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank'), 10);
                window.open(environment.MOBILE_APP_BASE_URL.concat(redirectUserInfo.redirectSessionId), '_blank');
            }
        })

    }
}
