import { Component, OnInit } from '@angular/core';
import { UserLoginService } from 'src/app/services/visitor-services/user-login.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LanguageService } from 'src/app/services/visitor-services/language.service';
import { UserInfoUpdate } from 'src/app/models/backend-update/user-login';
import { SuperAdminService } from 'src/app/services/operation-services/super-admin.service';
import { AppConstant } from 'src/app/config/app-constant';
import { UtilService } from 'src/app/services/visitor-services/util.service';

@Component({
    selector: 'app-create-dxr-admin',
    templateUrl: './create-dxr-admin.component.html',
    styleUrls: ['./create-dxr-admin.component.css']
})
export class CreateDxrAdminComponent implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private utilService: UtilService) { }

    // uiLabels: any = {
    //     formTitle: 'Create DXR Admin',
    //     fullName: 'Full Name',
    //     address: 'Address',
    //     deptTitle: 'Department Title',
    //     email: 'Email',
    //     mobile: 'Mobile',
    //     createBtn: 'Create',
    //     resenCodeBtn: 'Resend Code'
    // };
    uiLabels: any = this.languageService.getUiLabels(AppConstant.COMP.CREATE_DXR_ADMIN, AppConstant.UI_LABEL_TEXT);
    userInfoUpdate: UserInfoUpdate = {
        userInfoId: '',
        userName: '',
        userAddress: '',
        departmentTitle: '',
        userEmail: '',
        userContact: '',
        userCompanyId: 'dxr00001',
        userCategoryId: 'usercategory0001'
    }


    componentCode!: string;
    isSystemAdmin: boolean = false;

    ngOnInit(): void {
        this.isSystemAdmin = this.utilService.languageEditMode();
        this.componentCode = AppConstant.COMP.CREATE_DXR_ADMIN;
    }

    isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]).pipe(
        map(result => result.matches),
        shareReplay()
    );

    loadUserINfoByEmail() {

        this.superAdminService.getUserInfoByMail(this.userInfoUpdate.userEmail).subscribe(response => {
            if (response) {
                this.userInfoUpdate = response;
            }
        })
    }

    loadUserINfoByContact() {
        this.superAdminService.getUserInfoByContact(this.userInfoUpdate.userContact).subscribe(response => {
            if (response) {
                this.userInfoUpdate = response;
            }
        })
    }

    createUser() {
        if (this.userInfoUpdate) {
            this.userInfoUpdate.userCategoryId = AppConstant.USER_CATEGORY_DXR_ADMIN;
            this.userInfoUpdate.userCompanyId = AppConstant.DXR_COMPANY_ID;
            this.userInfoUpdate.userInfoId = this.utilService.generateUniqueId();

            this.superAdminService.createDxrAdminUser(this.userInfoUpdate).subscribe(data => {
                if (data) {

                }
            })

            alert('DXR Admin Created');
            this.resetForm();

        }
    }

    resendAccessCode() {
        if (this.userInfoUpdate.userInfoId) {
            this.superAdminService.resendUserAccess(this.userInfoUpdate.userEmail).subscribe((response: String) => {
                if (response && response == AppConstant.SUCCESS_RESPONSE_FROM_BACKEND) {
                    alert('Please check mail for your user access information.')
                } else {
                    alert('Resend unsuccessful. Please try again.')
                }
            });

        }
    }

    resetForm() {
        this.userInfoUpdate = {
            userInfoId: '',
            userName: '',
            userAddress: '',
            departmentTitle: '',
            userEmail: '',
            userContact: '',
            userCompanyId: 'dxr00001',
            userCategoryId: 'usercategory0001'
        }
    }



}
