import { Injectable } from "@angular/core";
import { AppConstant } from "src/app/config/app-constant";
import { ControlValidation, ValidationMessage, ValidationReport } from "src/app/models/view/validation-models";
import { LanguageService } from "src/app/services/visitor-services/language.service";
import { CompanyInfoFetch, UserInfoFetch, AddUserView, BranchInfoFetch, AddressDropDownView } from 'src/app/models/backend-fetch/user-management-fetch';

@Injectable({
    providedIn: 'root'
})
export class AddUserValidator {
    constructor(private languageService: LanguageService,) {

    }
    public sampleFormValidator = (data: UserInfoFetch) => {
        var validationReport: ValidationReport = {
            componentCode: 'AddUserPopupComponent',
            data: data,
            controls: [],
            invalidCount: 0
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.CONTROL_NAME_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_USER_POPUP, AppConstant.UI_MESSAGE_TEXT);

        if (this.validatorRepository.userNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.userNameValidator.controlId,
                controlName: this.validatorRepository.userNameValidator[controlName],
                validations: []
            }
            this.validatorRepository.userNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.userName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.userNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }
        if (this.validatorRepository.userEmailValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.userEmailValidator.controlId,
                controlName: this.validatorRepository.userEmailValidator[controlName],
                validations: []
            }
            this.validatorRepository.userEmailValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.userEmail)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.userEmailValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }

        if (this.validatorRepository.departmentIdValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.departmentIdValidator.controlId,
                controlName: this.validatorRepository.departmentIdValidator[controlName],
                validations: []
            }
            this.validatorRepository.departmentIdValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.department)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.departmentIdValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }
        if (this.validatorRepository.jobTitleIdValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.jobTitleIdValidator.controlId,
                controlName: this.validatorRepository.jobTitleIdValidator[controlName],
                validations: []
            }
            this.validatorRepository.jobTitleIdValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.jobTitle)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.jobTitleIdValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }

        if (this.validatorRepository.officeAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.officeAddressValidator.controlId,
                controlName: this.validatorRepository.officeAddressValidator[controlName],
                validations: []
            }
            this.validatorRepository.officeAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.officeAddress)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.officeAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }
        if (this.validatorRepository.mobileNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.mobileNoValidator.controlId,
                controlName: this.validatorRepository.mobileNoValidator[controlName],
                validations: []
            }
            this.validatorRepository.mobileNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.userContactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.mobileNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }

        return validationReport;
    }


    validatorRepository: any = {
        userNameValidator: {
            controlId: 'userNameValidator',
            controlNameEng: 'Name',
            controlNameJpn: '氏名',
            validators: [
                {
                    function: (userName: String) => {
                        return (userName && userName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to fill up the User name',
                    invalidMsgJpn: '会社名が必要です。',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',


                },


            ]
        },
        userEmailValidator: {
            controlId: 'userEmailValidator',
            controlNameEng: 'Email',
            controlNameJpn: 'メールアドレス',
            validators: [
                {
                    function: (email: String) => {
                        var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
                        return this.checkRegex(mailFormatCheckRegex, email);
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter and specify your e-mail address',
                    invalidMsgJpn: '「メールアドレスを入力指定下さい」',
                    sampleValueEng: 'example@gmail.com',
                    sampleValueJpn: 'example@gmail.com',

                }
            ]
        },

        departmentIdValidator: {
            controlId: 'departmentIdValidator',
            controlNameEng: 'Department',
            controlNameJpn: '部署',
            validators: [
                {
                    function: (department: String) => {
                        return (department && department.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to fill up the Department',
                    invalidMsgJpn: '会社名が必要です。',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',


                },


            ]
        },
        jobTitleIdValidator: {
            controlId: 'jobTitleIdValidator',
            controlNameEng: 'Job Title',
            controlNameJpn: '役職',
            validators: [
                {
                    function: (jobTitle: String) => {
                        return (jobTitle && jobTitle.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to fill up the Job Title',
                    invalidMsgJpn: '会社名が必要です。',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',


                },


            ]
        },
        officeAddressValidator: {
            controlId: 'officeAddressValidator',
            controlNameEng: 'Office Address',
            controlNameJpn: 'Office Address',
            validators: [
                {
                    function: (jobTitle: String) => {
                        return (jobTitle && jobTitle.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to Select Office Address',
                    invalidMsgJpn: '会社名が必要です。',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',


                },


            ]
        },
        mobileNoValidator: {
            controlId: 'mobileNoValidator',
            controlNameEng: 'Mobile No',
            controlNameJpn: '連絡先電話番号',
            validators: [

                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;

                    },
                    validMsg: '',
                    invalidMsgEng: 'Please Enter Your 10 Digit Contact Number',
                    invalidMsgJpn: '10桁の電話番号を提供する必要があります。',
                    sampleValueEng: '01-2345-6789',
                    sampleValueJpn: '01-2345-6789',

                }
            ]

        }

        // subscriberNameValidator: {
        //     controlId: 'subscriberNameValidator',
        //     controlNameEng: 'Subscriber Name',
        //     controlNameJpn: '加入者 名前',
        //     validators: [
        //         {
        //             function: (companyName: String) => {
        //                 return (companyName && companyName.length > 0) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'You need to provide a subsc. Name',
        //             invalidMsgJpn: '申込者名*サブスクライバー名を指定する必要があります。',
        //             sampleValueEng: 'Jhon',
        //             sampleValueJpn: 'Jhon',

        //         },


        //     ]
        // },
        // addressValidator: {
        //     controlId: 'addressValidator',
        //     controlNameEng: 'Address',
        //     controlNameJpn: '住所',
        //     validators: [
        //         {
        //             function: (address: String) => {
        //                 return (address && address.length > 0) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'Please enter and specify the address',
        //             invalidMsgJpn: '「住所を入力指定下さい」',
        //             sampleValueEng: 'Tokyo',
        //             sampleValueJpn: 'Tokyo',

        //         }
        //     ]
        // },
        // contactNoValidator: {
        //     controlId: 'contactNoValidator',
        //     controlNameEng: 'Contact No',
        //     controlNameJpn: '連絡先電話番号',
        //     validators: [

        //         {
        //             function: (contactNo: String) => {
        //                 return (contactNo && contactNo.length > 9) ? true : false;

        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'Please Enter Your 10 Digit Contact Number',
        //             invalidMsgJpn: '10桁の電話番号を提供する必要があります。',
        //             sampleValueEng: '01-2345-6789',
        //             sampleValueJpn: '01-2345-6789',

        //         }
        //     ]

        // },

        // subscritionEmailValidator: {
        //     controlId: 'subscriptionEmailValidator',
        //     controlNameEng: 'Subcription Email',
        //     controlNameJpn: 'メールアドレス',
        //     validators: [
        //         {
        //             function: (email: String) => {
        //                 var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
        //                 return this.checkRegex(mailFormatCheckRegex, email);
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'Please enter and specify your e-mail address',
        //             invalidMsgJpn: '「メールアドレスを入力指定下さい」',
        //             sampleValueEng: 'example@mangrovesystemsbd.com',
        //             sampleValueJpn: 'example@mangrovesystemsbd.com',

        //         }
        //     ]
        // },
        // subscriberEmailValidator: {
        //     controlId: 'subscriberMailValidator',
        //     controlNameEng: 'Subscriber Email',
        //     controlNameJpn: '加入者 郵便物',
        //     validators: [
        //         {
        //             function: (email: String) => {
        //                 var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
        //                 return this.checkRegex(mailFormatCheckRegex, email);
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'Please enter and specify your e-mail address',
        //             invalidMsgJpn: '「メールアドレスを入力指定下さい」',
        //             sampleValueEng: 'example@gmail.com',
        //             sampleValueJpn: 'example@gmail.com',

        //         }
        //     ]
        // },
        // companyCatagoryValidator: {
        //     controlId: 'catagoryValidator',
        //     controlNameEng: 'Company Catagory',
        //     controlNameJpn: '事業内容',
        //     validators: [
        //         {
        //             function: (companyCatgory: String[]) => {
        //                 return (companyCatgory.length > 0) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'You need to select business type at least one type',
        //             invalidMsgJpn: '少なくとも1つのタイプの業種を選択する必要があります。',
        //             sampleValueEng: 'Dumper',
        //             sampleValueJpn: 'Dumper',

        //         }
        //     ]
        // },
        // privacyPolicyValidator: {
        //     controlId: 'isAgreeValidator',
        //     controlNameEng: 'Privacy policy',
        //     controlNameJpn: '利用規約・プライバシーポリシーを確認して同意します。',
        //     validators: [
        //         {
        //             function: (isAgree: String) => {
        //                 return (isAgree.length > 0) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsgEng: 'Please agree to the terms of use and privacy policy',
        //             invalidMsgJpn: '「利用規約・プライバシーポリシーに同意して下さい」',
        //             sampleValueEng: 'Dumper',
        //             sampleValueJpn: 'Dumper',

        //         }
        //     ]
        // },



    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}