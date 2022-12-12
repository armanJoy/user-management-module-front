import { Injectable } from "@angular/core";
import { AppConstant } from "src/app/config/app-constant";
import { SubscriptionUpdateInfo } from "src/app/models/backend-update/subscription-update";
import { ControlValidation, ValidationMessage, ValidationReport } from "src/app/models/view/validation-models";
import { LanguageService } from "src/app/services/visitor-services/language.service";


@Injectable({
    providedIn: 'root'
})
export class SubscriptionFormValidator {
    constructor(private languageService: LanguageService,) {

    }
    public subscriptionFormValidator = (data: SubscriptionUpdateInfo) => {
        var validationReport: ValidationReport = {
            componentCode: 'SubscriptionFormComponent',
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

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.SUBSCRIPTION_FORM, AppConstant.UI_MESSAGE_TEXT);

        if (this.validatorRepository.companyNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.companyNameValidator.controlId,
                controlName: this.validatorRepository.companyNameValidator[controlName],
                validations: []
            }
            this.validatorRepository.companyNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.companyName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.companyNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);

        }

        if (this.validatorRepository.addressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.addressValidator.controlId,
                controlName: this.validatorRepository.addressValidator[controlName],
                validations: []
            }
            this.validatorRepository.addressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.address)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.addressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);

        }

        if (this.validatorRepository.contactNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.contactNoValidator.controlId,
                controlName: this.validatorRepository.contactNoValidator[controlName],
                validations: []
            }
            this.validatorRepository.contactNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.contactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.contactNoValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);

        }

        // if (this.validatorRepository.subscritionEmailValidator.validators) {

        //     var controlValidation: ControlValidation = {
        //         controlId: this.validatorRepository.subscritionEmailValidator.controlId,
        //         controlName: this.validatorRepository.subscritionEmailValidator[controlName],
        //         validations: []
        //     }
        //     this.validatorRepository.subscritionEmailValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
        //         if (!eachValidation.function(data.subscriptionEmail)) {
        //             var formatValidationMessage: ValidationMessage = {
        //                 message: componentMessage[this.validatorRepository.subscritionEmailValidator.controlId],
        //                 sampleValue: eachValidation[sampleValue]
        //             }
        //             controlValidation.validations.push(formatValidationMessage);
        //             validationReport.invalidCount++;
        //         }
        //     });
        //     validationReport.controls.push(controlValidation);

        // }

        if (this.validatorRepository.subscriberNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.subscriberNameValidator.controlId,
                controlName: this.validatorRepository.subscriberNameValidator[controlName],
                validations: []
            }
            this.validatorRepository.subscriberNameValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.subscriberName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.subscriberNameValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.subscriberEmailValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.subscriberEmailValidator.controlId,
                controlName: this.validatorRepository.subscriberEmailValidator[controlName],
                validations: []
            }

            this.validatorRepository.subscriberEmailValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.subscriberMail)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.subscriberEmailValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.companyCatagoryValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.companyCatagoryValidator.controlId,
                controlName: this.validatorRepository.companyCatagoryValidator[controlName],
                validations: []
            }

            this.validatorRepository.companyCatagoryValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string[]) => any; }) => {
                if (!eachValidation.function(data.companyCategory)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.companyCatagoryValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.privacyPolicyValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.privacyPolicyValidator.controlId,
                controlName: this.validatorRepository.privacyPolicyValidator[controlName],
                validations: []
            }
            this.validatorRepository.privacyPolicyValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function((data.isAgree == true) ? 'true' : '')) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation[invalidMsg],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.licenseNoValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.licenseNoValidator.controlId,
                controlName: this.validatorRepository.licenseNoValidator[controlName],
                validations: []
            }

            this.validatorRepository.licenseNoValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: any) => any; }) => {
                if (!eachValidation.function(data.wasteProcessingLicenceNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation[invalidMsg],
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
        companyNameValidator: {
            controlId: 'companyNameValidator',
            controlNameEng: 'Company Name',
            controlNameJpn: '会社名（屋号）',
            validators: [
                {
                    function: (companyName: String) => {
                        return (companyName && companyName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to fill up the company name',
                    invalidMsgJpn: '会社名が必要です。',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',


                },


            ]
        },
        subscriberNameValidator: {
            controlId: 'subscriberNameValidator',
            controlNameEng: 'Subscriber Name',
            controlNameJpn: '加入者 名前',
            validators: [
                {
                    function: (companyName: String) => {
                        return (companyName && companyName.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to provide a subsc. Name',
                    invalidMsgJpn: '申込者名*サブスクライバー名を指定する必要があります。',
                    sampleValueEng: 'Jhon',
                    sampleValueJpn: 'Jhon',

                },


            ]
        },
        addressValidator: {
            controlId: 'addressValidator',
            controlNameEng: 'Address',
            controlNameJpn: '住所',
            validators: [
                {
                    function: (address: String) => {
                        return (address && address.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter and specify the address',
                    invalidMsgJpn: '「住所を入力指定下さい」',
                    sampleValueEng: 'Tokyo',
                    sampleValueJpn: 'Tokyo',

                }
            ]
        },
        contactNoValidator: {
            controlId: 'contactNoValidator',
            controlNameEng: 'Contact No',
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

        },

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
        subscriberEmailValidator: {
            controlId: 'subscriberMailValidator',
            controlNameEng: 'Subscriber Email',
            controlNameJpn: '加入者 郵便物',
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
        companyCatagoryValidator: {
            controlId: 'catagoryValidator',
            controlNameEng: 'Company Catagory',
            controlNameJpn: '事業内容',
            validators: [
                {
                    function: (companyCatgory: String[]) => {
                        return (companyCatgory.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to select business type at least one type',
                    invalidMsgJpn: '少なくとも1つのタイプの業種を選択する必要があります。',
                    sampleValueEng: 'Dumper',
                    sampleValueJpn: 'Dumper',

                }
            ]
        },
        privacyPolicyValidator: {
            controlId: 'isAgreeValidator',
            controlNameEng: 'Privacy policy',
            controlNameJpn: '利用規約・プライバシーポリシーを確認して同意します。',
            validators: [
                {
                    function: (isAgree: String) => {
                        return (isAgree.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please agree to the terms of use and privacy policy',
                    invalidMsgJpn: '「利用規約・プライバシーポリシーに同意して下さい」',
                    sampleValueEng: 'Dumper',
                    sampleValueJpn: 'Dumper',

                }
            ]
        },
        licenseNoValidator: {
            controlId: 'licenseNoValidator',
            controlNameEng: 'License No',
            controlNameJpn: 'License No',
            validators: [
                {
                    function: (licenseNo: any) => {
                        return (licenseNo && licenseNo.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You need to fill up the license no',
                    invalidMsgJpn: 'You need to fill up the license no',
                    sampleValueEng: 'DX-R',
                    sampleValueJpn: 'DX-R',
                },
            ]
        }


    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}