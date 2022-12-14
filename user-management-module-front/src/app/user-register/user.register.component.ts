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
        userName: 'Arman Reza',
        userAddress: 'Dhaka',
        departmentTitle: 'Software Engineer',
        userEmail: 'email2arjoy@gmail.com',
        userContact: '0123456789',
        userCompanyId: '',
        userCategoryId: AppConstant.USER_CATEGORY_GENERAL_USER,
        newPassword: '',
        confirmPassword: '',
        pass: ''
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
        debugger
        var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
        var validEmail = this.utilService.checkRegex(mailFormatCheckRegex, this.userInfoUpdate.userEmail);

        if (this.userInfoUpdate && this.passwordMatchFlag == this.passwordMatchedFlag && validEmail) {
            this.userInfoUpdate.userCategoryId = AppConstant.USER_CATEGORY_GENERAL_USER;
            this.userInfoUpdate.userInfoId = this.utilService.generateUniqueId();

            var newUser: UserInfoUpdate = JSON.parse(JSON.stringify(this.userInfoUpdate));
            const encPass = this.utilService.encrypt(newUser.newPassword);

            newUser.pass = (encPass) ? encPass : "";

            this.superAdminService.createDxrAdminUser(newUser).subscribe(data => {
                if (data) {
                    alert('Registration Complete');
                    this.resetForm();
                }
            })

        } else {
            this.utilService.showSnackbar("Please provide valid information", 3000)
        }
    }

    passwordMatchFlag = '';
    passwordMatchedFlag = AppConstant.PASSWORD_MATCHED_FLAG;
    passwordNotMatchedFlag = AppConstant.PASSWORD_NOT_MATCHED_FLAG;
    checkPasswordSimilarity() {

        if (this.userInfoUpdate.newPassword == this.userInfoUpdate.confirmPassword) {
            this.passwordMatchFlag = AppConstant.PASSWORD_MATCHED_FLAG;

        } else {
            this.passwordMatchFlag = AppConstant.PASSWORD_NOT_MATCHED_FLAG;

        }
    }

    passwordLengthFlag = '';
    passwordLengthMatchedFlag = AppConstant.PASSWORD_LENGTH_MATCHED_FLAG;
    passwordLengthNotMatchedFlag = AppConstant.PASSWORD_LENGTH_NOT_MATCHED_FLAG;

    checkPasswordLength() {
        if (this.userInfoUpdate.newPassword.length < 6) {
            this.passwordLengthFlag = AppConstant.PASSWORD_LENGTH_NOT_MATCHED_FLAG;
        } else {
            this.passwordLengthFlag = AppConstant.PASSWORD_LENGTH_MATCHED_FLAG;
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
            userCompanyId: '',
            userCategoryId: AppConstant.USER_CATEGORY_GENERAL_USER,
            newPassword: '',
            confirmPassword: '',
            pass: ''
        }
    }



}

