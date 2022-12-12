import { Component, OnInit, Inject, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material/dialog';
import { CompanyInfoFetch, UserInfoFetch, AddUserView, BranchInfoFetch, AddressDropDownView, DxrRoleSelectionView, RoleWiseMenuAcccessFetch, SelectedUserView, UserMenuAccessView, DxrRole } from 'src/app/models/backend-fetch/user-management-fetch';
import { AppConstant } from 'src/app/config/app-constant';
import { ValidationReportPopupComponent } from 'src/app/common-directives/validation-report-popup/validation-report-popup.component';
import { UserMangementOperatinService } from 'src/app/services/operation-services/user-mangement-operatin.service';
import { AddUserValidator } from './add-user-validator';
import { UtilService } from 'src/app/services/visitor-services/util.service';
import { LanguageService } from 'src/app/services/visitor-services/language.service';


@Component({
    selector: 'app-add-user-popup',
    templateUrl: './add-user-popup.component.html',
    styleUrls: ['./add-user-popup.component.css']
})
export class AddUserPopupComponent implements OnInit {
    @Input()
    isViewMode!: boolean;
    DxrRoleListViewForSelectedUser: DxrRoleSelectionView[] = [];
    selectedUserInfo!: UserInfoFetch;
    selectedUser!: SelectedUserView;
    SendUserInfo!: UserInfoFetch;
    dxrRolelist: DxrRole[] = [];
    roleList: DxrRoleSelectionView[] = [];
    userInfo!: AddUserView;
    isDriver: boolean = false;

    constructor(private breakpointObserver: BreakpointObserver, public dialogRef: MatDialogRef<AddUserPopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private matDialog: MatDialog, private userMangementOperatinService: UserMangementOperatinService, private validation: AddUserValidator, private utilService: UtilService, private languageService: LanguageService) { }
    officeAddress: any;
    zipCode: any;
    formateContactNo: any;


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {

        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.ADD_USER_POPUP;

        this.isViewMode = false;
        if (this.data.userData.users) {
            this.formUserInfo = Object.assign({}, this.data.userData.users);
            this.dxrRolelist = Object.assign([], this.data.userData.users.userRoles);
            this.onCheckBoxSelectionChange(this.dxrRolelist);
        }

        if (this.data.userRole)
            this.DxrRoleListViewForSelectedUser = this.userMangementOperatinService.prepareSelectedUserRole(this.formUserInfo, this.data.userRole)

        this.branchList = this.data.userData.companyInfo.branches;
        this.addressDropDownViewList = this.prepareAddressDropDownViewList();
        this.formUserInfo.companyId = this.data.userData.companyInfo.companyId;
        this.prepareView();
        this.userMangementOperatinService.getUserFile(this.formUserInfo.userInfoId).subscribe((data) => {
            if (data) {
                this.formUserInfo.drivingLicenseUpload = data.drivingLicenseFile;
                this.formUserInfo.userSealUploadedFile = data.userSealFile;
            }
        });
        // this.selectedUser = this.prepareUserForView()
    }

    public sendRole = (dxrRoleList: DxrRole[]): void => {
        this.dxrRolelist = dxrRoleList;
        this.onCheckBoxSelectionChange(dxrRoleList);

    }
    prepareView() {
        this.officeAddress = '';
        this.zipCode = '';
        this.formateContactNo = '';
        var flag = false;
        for (var i = 0; i < this.formUserInfo.officeAddress.length; i++) {
            if (this.formUserInfo.officeAddress[i] == ',')
                flag = true;
            else if (flag == false) {
                this.zipCode += this.formUserInfo.officeAddress[i];
            }
            else if (flag == true) {
                this.officeAddress += this.formUserInfo.officeAddress[i];
            }

        }
        this.formateContactNo = this.formUserInfo.officeContactNo;
    }
    prepareAddressDropDownViewList(): AddressDropDownView[] {
        var dropDownViewList: AddressDropDownView[] = [];
        this.branchList.forEach(element => {
            var data: AddressDropDownView = {
                id: '',
                name: '',
                address: '',
                contactNo: '',
                zipcode: ''
            }
            data.name = element.branchName;
            data.address = element.branchAddress;
            data.zipcode = element.zipcode;
            data.id = element.branchId;
            data.contactNo = element.branchContactNo;
            dropDownViewList.push(data);
        });
        var data: AddressDropDownView = {
            id: '',
            name: '',
            address: '',
            contactNo: '',
            zipcode: ''
        }
        data.name = this.data.userData.companyInfo.companyName;
        data.zipcode = this.data.userData.companyInfo.zipcode;
        data.address = this.data.userData.companyInfo.companyAddress;
        data.id = this.data.userData.companyInfo.companyId;
        data.contactNo = this.data.userData.companyInfo.telephoneNumber;
        dropDownViewList.push(data);
        return dropDownViewList;
    }
    branchList: BranchInfoFetch[] = [];
    addressDropDownViewList: AddressDropDownView[] = [];
    formUserInfo: UserInfoFetch = {
        companyId: '',
        userInfoId: '',
        userIdentificationId: '',
        officeName: '',
        officeAddress: '',
        officeContactNo: '',
        userCatagory: AppConstant.USER_CATEGORY_COMPANY_USER,
        userName: '',
        userAddress: '',
        userEmail: '',
        userContactNo: '',
        userId: '',
        tempPassword: '',
        department: '',
        jobTitle: '',
        role: '',
        licenseNo: '',
        remarks: '',
        drivingLicenseUpload: '',
        userSealUploadedFile: '',
        userRoles: [],
        userContactNoFormated: ''
    }
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_USER_POPUP, AppConstant.UI_LABEL_TEXT);
    // uiLabels: any = {
    //     title: 'User Form',
    //     name: 'Name',
    //     userId: 'User ID',
    //     email: 'Email',
    //     department: 'Department',
    //     jobTitle: 'Job Title',
    //     officeName: 'Office Name',
    //     officeAddress: 'Office Address',
    //     officeContactNo: 'Office Contact No',
    //     mobileNo: 'Mobile No',
    //     licenseNo: 'License No',
    //     licenseUpload: 'License Upload',
    //     password: 'Password',
    //     saveBtn: 'Save',
    //     closeBtn: 'Close',
    //     remarks: 'Remarks'
    // }
    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    doSomething(item: any) {
        this.formateContactNo = item.value.contactNo;
        this.zipCode = this.utilService.prepareZipCodeFormate(item.value.zipcode);
        this.officeAddress = item.value.address;
        // this.formUserInfo.officeAddress = item.value.address;
    }
    prepareOfficeAddress(): string {
        var address: string = '';
        address = this.zipCode + ', ' + this.officeAddress;
        return address;
    }

    onClick(userInfo: UserInfoFetch) {
        userInfo.officeAddress = this.prepareOfficeAddress();
        userInfo.officeContactNo = this.formateContactNo;
        var validationReport = this.validation.sampleFormValidator(userInfo);
        if (validationReport && validationReport.invalidCount > 0) {
            this.matDialog.open(ValidationReportPopupComponent, {
                width: '700px',
                data: validationReport,
            });
        }
        else {
            userInfo.userRoles = this.dxrRolelist;
            // this.updateUserDxrRoleList = Object.assign([], this.roleTabChild.updateDxrRoleListForUser);
            this.dialogRef.close(userInfo);
        }

    }

    upLoadFile(event: any, index: number) {

        this.utilService.convertFileToBase64(event, ((convertedBase64String: string) => {
            if (convertedBase64String) {
                if (index == 1) {
                    this.formUserInfo.drivingLicenseUpload = convertedBase64String;
                }
                else if (index == 2) {
                    this.formUserInfo.userSealUploadedFile = convertedBase64String;

                }

            }
        }));
    }
    
    prepareUserForView(userInfo: UserInfoFetch): SelectedUserView {
        var user: SelectedUserView = {
            email: '',
            name: '',
            contactNo: ''
        }
        user.name = userInfo.userName;
        user.email = userInfo.userEmail;
        user.contactNo = this.utilService.prepareContactNoFormate(userInfo.userContactNo);
        return user;
    }

    onCheckBoxSelectionChange(dxrRoleList: DxrRole[]) {
        if (JSON.stringify(dxrRoleList).includes("roledef0005")) {
            this.isDriver = true;
        }
        else {
            this.isDriver = false;

        }
    }

}
