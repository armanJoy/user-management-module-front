import { Injectable } from "@angular/core";
import { AppConstant } from "src/app/config/app-constant";
import { InquiryInfoUpdate } from "src/app/models/backend-update/inquiryUpdate";
import { ControlValidation, ValidationMessage, ValidationReport } from "src/app/models/view/validation-models";
import { LanguageService } from "src/app/services/visitor-services/language.service";


@Injectable({
    providedIn: 'root'
})

export class InquiryFormValidator {

    constructor(private languageService: LanguageService) { }

    public inquiryFormValidator = (data: InquiryInfoUpdate) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;
        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {
            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;
            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;
            controlName = AppConstant.CONTROL_NAME_ENGLISH;
        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.INQUIRY_FORM, AppConstant.UI_MESSAGE_TEXT);

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
        if (this.validatorRepository.emailAddressValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.emailAddressValidator.controlId,
                controlName: this.validatorRepository.emailAddressValidator[controlName],
                validations: []
            }
            this.validatorRepository.emailAddressValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.emailAddress)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.emailAddressValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.validatorRepository.inquiryTitleValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.inquiryTitleValidator.controlId,
                controlName: this.validatorRepository.inquiryTitleValidator[controlName],
                validations: []
            }
            this.validatorRepository.inquiryTitleValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.inquiryTitle)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.inquiryTitleValidator.controlId],
                        sampleValue: eachValidation[sampleValue]
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }
        if (this.validatorRepository.inquiryDetailValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.inquiryDetailValidator.controlId,
                controlName: this.validatorRepository.inquiryDetailValidator[controlName],
                validations: []
            }
            this.validatorRepository.inquiryDetailValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: string) => any; }) => {
                if (!eachValidation.function(data.inquiryDetail)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.inquiryDetailValidator.controlId],
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
                if (!eachValidation.function((data.isAgreed) ? "true" : "")) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.privacyPolicyValidator.controlId],
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

        contactNoValidator: {
            controlId: 'contactNoValidator',
            controlNameEng: 'Contact No',
            controlNameJpn: '電話番号(任意)',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length > 9) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'If Contact no file input text text is not allowed',
                    invalidMsgJpn: '連絡先番号にテックスは許可されていません。',
                    sampleValueEng: '03-2222-2222',
                    sampleValueJpn: '03-2222-2222'
                }
            ]
        },

        emailAddressValidator: {
            controlId: 'emailAddressValidator',
            controlNameEng: 'Email Address',
            controlNameJpn: 'メールアドレス',
            validators: [
                {
                    function: (emailAddress: String) => {
                        var mailFormatCheckRegex = new RegExp(AppConstant.EMAIL_REGEX);
                        return this.checkRegex(mailFormatCheckRegex, emailAddress);
                    },
                    validMsg: '',
                    invalidMsgEng: 'Need to fill up the Correct mail formate',
                    invalidMsgJpn: '「メールアドレスを入力指定下さい」。',
                    sampleValueEng: 'example@mangrovesystemsbd.com',
                    sampleValueJpn: 'example@mangrovesystemsbd.com'
                }
            ]
        },

        inquiryTitleValidator: {
            controlId: 'inquiryTitleValidator',
            controlNameEng: 'Inquiry Title',
            controlNameJpn: '件　　　名',
            validators: [
                {
                    function: (inquiryTitle: String) => {
                        return (inquiryTitle && inquiryTitle.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot keep the subject empty',
                    invalidMsgJpn: '件名を空に保つことはできません。',
                    sampleValueEng: 'Subscription Fees',
                    sampleValueJpn: 'Subscription Fees'
                },
            ]
        },

        inquiryDetailValidator: {
            controlId: 'inquiryDetailValidator',
            controlNameEng: 'Inquiry Detail',
            controlNameJpn: '内　　　容',
            validators: [
                {
                    function: (inquiryDetail: String) => {
                        return (inquiryDetail && inquiryDetail.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'You cannot keep the details empty',
                    invalidMsgJpn: '内容を空にしておくことはできません。',
                    sampleValueEng: 'Please tell me about the Subscription Fees',
                    sampleValueJpn: 'Please tell me about the Subscription Fees'
                },
            ]
        },
        privacyPolicyValidator: {
            controlId: 'isAgreedValidator',
            controlNameEng: 'Privacy Policy',
            controlNameJpn: '利用規約・プライバシーポリシーを確認して同意します。',
            validators: [
                {
                    function: (isAgreed: string) => {
                        return (isAgreed == "true") ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please agree to the terms of use and privacy policy',
                    invalidMsgJpn: '「利用規約・プライバシーポリシーに同意して下さい」',
                    sampleValueEng: '',
                    sampleValueJpn: ''
                },
            ]
        },



        // ageValidator: {
        //     controlName: 'age',
        //     validators: [
        //         {
        //             function: (age: Number) => {
        //                 return (age > 0 && age < 150) ? true : false;
        //             },
        //             validMsg: '',
        //             invalidMsg: 'Invalid age',
        //             sampleValue: '22'
        //         }
        //     ]
        // },
        // zipCodeValidator: {
        //     controlId: 'zipCode',
        //     controlName: 'Zip Code',
        //     validators: [
        //         {
        //             function: (zipCode: String) => {
        //                 var regex = new RegExp(/^[0-9]{3}([- /]?[0-9]{4})?$/);
        //                 return this.checkRegex(regex, zipCode);
        //             },
        //             validMsg: '',
        //             invalidMsg: 'Invalid Zipcode',
        //             sampleValue: '333-0001'
        //         }
        //     ]
        // },




    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }

}