import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { findIndex } from 'rxjs/operators';
import { VehicleTypeSetupInfoFetch, GasolineCo2EmissionInfo } from 'src/app/models/backend-fetch/carbon-emmition';
import { UriService } from '../visitor-services/uri.service';
import { AppConstant } from 'src/app/config/app-constant';
import { DataForwardLinkReturn, RemoveTriggerData } from 'src/app/models/backend-fetch/dxr-system';
@Injectable({
    providedIn: 'root'
})
export class VehicleSetupOperationService {

    constructor(private uriService: UriService) { }

    getCompanyGasolineList(): Observable<GasolineCo2EmissionInfo[]> {
        var url = '/carbon/gasolin-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }
    getCompanyVehicleTypeList(): Observable<VehicleTypeSetupInfoFetch[]> {
        var url = '/carbon/vehicle-type-list';
        return this.uriService.callBackend(url, AppConstant.HTTP_GET);
    }
    saveVehicleType(vehicleTypeInfo: VehicleTypeSetupInfoFetch): Observable<VehicleTypeSetupInfoFetch> {
        var url = '/carbon/save-vehicle-type';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, vehicleTypeInfo);
    }
    saveGasolineType(gasolineInfo: GasolineCo2EmissionInfo): Observable<GasolineCo2EmissionInfo> {
        var url = '/carbon/add-gasolin';
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, gasolineInfo);
    }

    getVehicleTypeForwardLinks(vehicleTypeId: string): Observable<DataForwardLinkReturn> {
        var url = "/carbon/vehicle-type-forward-link";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, vehicleTypeId);
    }

    removeVehicleType(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/carbon/remove-vehicle-type";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }


    getGasolineTypeForwardLinks(vehicleTypeId: string): Observable<DataForwardLinkReturn> {
        var url = "/carbon/gasoline-type-forward-link";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, vehicleTypeId);
    }

    removeGasolineType(removeTriggerData: RemoveTriggerData): Observable<any> {
        var url = "/carbon/remove-gasoline-type";
        return this.uriService.callBackend(url, AppConstant.HTTP_POST, removeTriggerData);
    }
}
