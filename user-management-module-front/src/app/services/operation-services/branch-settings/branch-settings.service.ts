import { Injectable } from '@angular/core';
import { BranchInfoFetch, CompanyUserInfoFetch } from 'src/app/models/backend-fetch/branch-settings-fetch';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from 'src/app/config/app-constant';
import { UriService } from '../../visitor-services/uri.service';
import { BranchUserInfoUpdate, VehicleInfoUpdate } from 'src/app/models/backend-update/branch-settings-update';
@Injectable({
    providedIn: 'root'
})
export class BranchSettingsService {

    constructor() { }

    branchInfo: BranchInfoFetch[] = [
        { branchId: '00001', branchName: 'Software', branchAddress: 'Dhaka', branchManagerName: 'Rakib', frontendDate: '', backendDate: '', vehicleList: [{ vehicleId: '00001', frontendDate: '', backendDate: '', manufacturerName: 'Ashock', vehicleType: 'Large', modelName: 'Ecomet 1015 HE', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' }], userList: [{ userId: 'rakib@gmail.com', name: 'Rakib', address: 'Meherpur', email: 'rakib@gmail.com', contactNo: '01752709413', department: 'Dumper', jobTitle: 'Admin', frontendDate: '', backendDate: '', isSelected: true }] },
        { branchId: '00002', branchName: 'Hardware', branchAddress: 'Khulna', branchManagerName: 'Hasan', frontendDate: '', backendDate: '', vehicleList: [{ vehicleId: '00001', frontendDate: '', backendDate: '', manufacturerName: 'TATA', vehicleType: 'Large', modelName: 'Ultra-2015', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' }], userList: [{ userId: 'hasan@gmail.com', name: 'Hasan', address: 'Rajsahi', email: 'hasan@gmail.com', contactNo: '01521493608', department: 'Processor', jobTitle: 'Incharge', frontendDate: '', backendDate: '', isSelected: false }] },
        { branchId: '00003', branchName: 'RFL', branchAddress: 'Rajsahi', branchManagerName: 'Sobuj', frontendDate: '', backendDate: '', vehicleList: [{ vehicleId: '00001', frontendDate: '', backendDate: '', manufacturerName: 'Ashock', vehicleType: 'Large', modelName: 'Ecomet 1015 MK', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' }], userList: [{ userId: 'sobuj@gmail.com', name: 'Sobuj', address: 'Meherpur', email: 'sobuj@gmail.com', contactNo: '01943239180', department: 'Transporter', jobTitle: 'Admin', frontendDate: '', backendDate: '', isSelected: true }] }
    ];


    public getBranchInfo(): Observable<BranchInfoFetch[]> {
        return of(this.branchInfo);
    };

    companyUserInfo: CompanyUserInfoFetch[] = [
        { userId: 'rakib@gmail.com', name: 'Rakib', address: 'Meherpur', email: 'rakib@gmail.com', contactNo: '01752709413', department: 'Dumper', jobTitle: 'Driver', licenseNo: 'LC1263DM', Licensepdf: 'License Is Here', picture: 'Loading', dumperRole: 'Admin', transporterRole: 'Incharge', processorRole: 'Incharge', frontendDate: '', backendDate: '', isSelected: true },
        { userId: 'hasan@gmail.com', name: 'Hasan', address: 'Rajsahi', email: 'hasan@gmail.com', contactNo: '01521493608', department: 'Processor', jobTitle: 'Driver', licenseNo: 'LC1263DM', Licensepdf: 'License Is Here', picture: 'Loading', dumperRole: 'Admin', transporterRole: 'Driver', processorRole: 'Incharge', frontendDate: '', backendDate: '', isSelected: false },
        { userId: 'sobuj@gmail.com', name: 'Sobuj', address: 'Meherpur', email: 'sobuj@gmail.com', contactNo: '01943239180', department: 'Transporter', jobTitle: 'Driver', licenseNo: 'LC1263DM', Licensepdf: 'License Is Here', picture: 'Loading', dumperRole: 'Admin', transporterRole: 'Incharge', processorRole: 'Admin', frontendDate: '', backendDate: '', isSelected: true }
    ];


    public getCompanyUserInfo(): Observable<CompanyUserInfoFetch[]> {
        return of(this.companyUserInfo);
    };

    vehicleInfo: VehicleInfoUpdate[] = [
        { vehicleId: '00001', manufacturerName: 'Ashock', vehicleType: 'Large', modelName: 'Ecomet 1015 HE', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' },
        { vehicleId: '00001', manufacturerName: 'TATA', vehicleType: 'Large', modelName: 'Ultra-2015', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' },
        { vehicleId: '00001', manufacturerName: 'Ashock', vehicleType: 'Large', modelName: 'Ecomet 1015 MK', vehicleRegNo: 'H-123T', vehicleCapacity: '1000 kg', vehicleWeight: '500kg', gasolineType: 'Diesel', inspectionDate: '12-2-2020', vehicleOwnerShip: ['Company vehicle,Temporary vehicle ,Rented Vehicle'], remarks: 'Nothing' },


    ];

    public addVehicleInfo(vehicle: VehicleInfoUpdate): Observable<VehicleInfoUpdate> {
        this.vehicleInfo.unshift(vehicle);
        return of(vehicle);
    };

    branchUserInfo: BranchUserInfoUpdate[] = [
        { userId: 'rakib@gmail.com', name: 'Rakib', address: 'Meherpur', email: 'rakib@gmail.com', contactNo: '01752709413', department: 'Dumper', jobTitle: 'Admin', isSelected: true },
        { userId: 'hasan@gmail.com', name: 'Hasan', address: 'Rajsahi', email: 'hasan@gmail.com', contactNo: '01521493608', department: 'Processor', jobTitle: 'Incharge', isSelected: false },
        { userId: 'sobuj@gmail.com', name: 'Sobuj', address: 'Meherpur', email: 'sobuj@gmail.com', contactNo: '01943239180', department: 'Transporter', jobTitle: 'Admin', isSelected: true }
    ];

    public updateBranchUser(user: BranchUserInfoUpdate): Observable<BranchUserInfoUpdate> {
        this.branchUserInfo.unshift(user);
        return of(user);
    }
}
