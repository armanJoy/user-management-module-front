import { Injectable } from '@angular/core';
import { AppConstant } from 'src/app/config/app-constant';
import { FaqInfoView, FaqTypeView } from 'src/app/models/view/faq-view';
import { ControlValidation, ValidationMessage, ValidationReport } from 'src/app/models/view/validation-models';
import { LanguageService } from 'src/app/services/visitor-services/language.service';

@Injectable({
    providedIn: 'root'
})
export class AddFaqValidator {

    constructor(private languageService: LanguageService) { }

    public faqFormValidator = (data: FaqInfoView) => {
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

        var componentMessage: any = this.languageService.getUiLabels(AppConstant.COMP.ADD_FAQ_QUESTION_ANSWER_FORM, AppConstant.UI_MESSAGE_TEXT);

        if (this.validatorRepository.faqQuestionValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.faqQuestionValidator.controlId,
                controlName: this.validatorRepository.faqQuestionValidator[controlName],
                validations: []
            }
            this.validatorRepository.faqQuestionValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; }) => {
                if (!eachValidation.function(data.faqInfoQuestion)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.faqQuestionValidator.controlId],
                    }
                    controlValidation.validations.push(formatValidationMessage);
                    validationReport.invalidCount++;
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.faqAnswerDescriptionValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.faqAnswerDescriptionValidator.controlId,
                controlName: this.validatorRepository.faqAnswerDescriptionValidator[controlName],
                validations: []
            }
            this.validatorRepository.faqAnswerDescriptionValidator.validators.forEach((eachValidation: { [x: string]: any; function: (arg0: String) => any; }) => {
                if (!eachValidation.function(data.faqInfoAnswer)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: componentMessage[this.validatorRepository.faqAnswerDescriptionValidator.controlId],
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

        faqQuestionValidator: {
            controlId: 'faqQuestionValidator',
            controlNameEng: 'Faq Question',
            controlNameJpn: 'Faq Question',
            validators: [
                {
                    function: (faqQuestion: String) => {
                        return (faqQuestion && faqQuestion.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the FAQ question',
                    invalidMsgJpn: 'Please enter the FAQ question',
                    sampleValueEng: 'What is industrial waste?',
                    sampleValueJpn: 'What is industrial waste?'

                }
            ]
        },
        faqAnswerDescriptionValidator: {
            controlId: 'faqAnswerValidator',
            controlNameEng: 'Faq Answer',
            controlNameJpn: 'Faq Answer',
            validators: [
                {
                    function: (faqAnswer: String) => {
                        return (faqAnswer && faqAnswer.length > 0) ? true : false;
                    },
                    validMsg: '',
                    invalidMsgEng: 'Please enter the FAQ answer',
                    invalidMsgJpn: 'Please enter the FAQ answer',
                    sampleValueEng: 'Industrial waste is the waste produced by industrial activity which includes any material that is rendered useless during a manufacturing process such as that of factories, mills, and mining operations.',
                    sampleValueJpn: 'Industrial waste is the waste produced by industrial activity which includes any material that is rendered useless during a manufacturing process such as that of factories, mills, and mining operations.',
                }
            ]
        },
    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}
