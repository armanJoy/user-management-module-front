import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppConstant } from 'src/app/config/app-constant';
import { FaqTypeView } from 'src/app/models/view/faq-view';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Injectable({
    providedIn: 'root'
})
export class AddFaqCategoryValidatorService {

    constructor(private languageService: LanguageService) { }

    public faqTypeFormValidator = (data: FaqTypeView) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        var controlName = AppConstant.CONTROL_NAME_JAPANESE;
        var invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_JAPANESE;
        var sampleValue = AppConstant.SAMPLE_VALUE_KEY_JAPANESE;

        var langIndex = this.languageService.getSelectedLanguageIndex();

        if (langIndex == AppConstant.LANG_INDEX_ENG) {

            controlName = AppConstant.CONTROL_NAME_ENGLISH;

            invalidMsg = AppConstant.INAVALID_MESSAGE_KEY_ENGLISH;

            sampleValue = AppConstant.SAMPLE_VALUE_KEY_ENGLISH;

        }

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_CATEGORY_FORM, AppConstant.UI_MESSAGE_TEXT);

        var menu =
        {
            menuId: 'languageSetup',
            menuTitleEng: 'Language Setup',
            menuTitleJpn: 'Language Setup',
            menuUrl: '/super-admin/component-list'
        }

        if (this.validatorRepository.faqTypeValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.faqTypeValidator.controlId,
                controlName: this.validatorRepository.faqTypeValidator[controlName],
                validations: []
            }
            this.validatorRepository.faqTypeValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.faqType)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.faqTypeValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.faqDescriptionValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.faqDescriptionValidator.controlId,
                controlName: this.validatorRepository.faqDescriptionValidator[controlName],
                validations: []
            }
            this.validatorRepository.faqDescriptionValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; sampleValue: any; }) => {
                if (!eachValidation.function(data.faqTypeDescription)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.faqDescriptionValidator.controlId],
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

        faqTypeValidator: {
            controlId: 'faqTypeValidation',
            controlNameEng: 'Faq Type',
            controlNameJpn: 'Faq Type',
            validators: [
                {
                    function: (faqType: String) => {
                        return (faqType && faqType.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the FAQ type',
                    invalidMsgJpn: 'Please enter the FAQ type',
                    sampleValueEng: 'Waste',
                    sampleValueJpn: 'Waste',
                }
            ]
        },
        faqDescriptionValidator: {
            controlId: 'faqDescriptionValidation',
            controlNameEng: 'Faq Description',
            controlNameJpn: 'Faq Description',
            validators: [
                {
                    function: (faqDescription: String) => {
                        return (faqDescription && faqDescription.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the FAQ description',
                    invalidMsgJpn: 'Please enter the FAQ description',
                    sampleValueEng: 'FAQs about waste',
                    sampleValueJpn: 'FAQs about waste'
                }
            ]
        },
    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}
