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
    selector: 'app-user-register-admin',
    templateUrl: './user.register.component.html',
    styleUrls: ['./user.register.component.css']
})
export class UserRegister implements OnInit {

    constructor(private breakpointObserver: BreakpointObserver, private languageService: LanguageService, private userLoginService: UserLoginService, private superAdminService: SuperAdminService, private utilService: UtilService) { }

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


    ngOnInit(): void {

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

