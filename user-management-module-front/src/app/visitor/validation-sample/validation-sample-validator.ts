import { Injectable } from "@angular/core";
import { AppConstant } from "src/app/config/app-constant";
import { ControlValidation, ValidationMessage, ValidationReport } from "src/app/models/view/validation-models";
import { SampleModel } from "./validation-sample.component";
@Injectable({
    providedIn: 'root'
})
export class ValidationSampleValidator {

    public sampleFormValidator = (data: SampleModel) => {
        var validationReport: ValidationReport = {
            componentCode: 'ValidationSampleComponent',
            data: data,
            controls: [],
            invalidCount: 0,
        };

        if (this.validatorRepository.userNameValidator.validators) {

            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.userNameValidator.controlName,
                controlName: this.validatorRepository.userNameValidator.controlName,
                validations: []
            }
            this.validatorRepository.userNameValidator.validators.forEach((eachValidation) => {
                if (!eachValidation.function(data.userName)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation.invalidMsg,
                    }
                    controlValidation.validations.push(formatValidationMessage);
                }
            });
            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.ageValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.ageValidator.controlName,
                controlName: this.validatorRepository.ageValidator.controlName,
                validations: []
            }
            this.validatorRepository.ageValidator.validators.forEach((eachValidation) => {
                if (!eachValidation.function(data.age)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation.invalidMsg
                    }
                    controlValidation.validations.push(formatValidationMessage);
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.zipCodeValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.zipCodeValidator.controlId,
                controlName: this.validatorRepository.zipCodeValidator.controlName,
                validations: []
            }
            this.validatorRepository.zipCodeValidator.validators.forEach((eachValidation) => {
                if (!eachValidation.function(data.zipCode)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation.invalidMsg
                    }
                    controlValidation.validations.push(formatValidationMessage);
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.emailValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.emailValidator.controlId,
                controlName: this.validatorRepository.emailValidator.controlName,
                validations: []
            }
            this.validatorRepository.emailValidator.validators.forEach((eachValidation) => {
                if (!eachValidation.function(data.email)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation.invalidMsg
                    }
                    controlValidation.validations.push(formatValidationMessage);
                }
            });

            validationReport.controls.push(controlValidation);
        }

        if (this.validatorRepository.contactNoValidator.validators) {
            var controlValidation: ControlValidation = {
                controlId: this.validatorRepository.contactNoValidator.controlId,
                controlName: this.validatorRepository.contactNoValidator.controlName,
                validations: []
            }
            this.validatorRepository.contactNoValidator.validators.forEach((eachValidation) => {
                if (!eachValidation.function(data.contactNo)) {
                    var formatValidationMessage: ValidationMessage = {
                        message: eachValidation.invalidMsg
                    }
                    controlValidation.validations.push(formatValidationMessage);
                }
            });

            validationReport.controls.push(controlValidation);
        }

        return validationReport;
    }

    validatorRepository = {
        userNameValidator: {
            controlId: 'userName',
            controlName: 'User Name',
            validators: [
                {
                    function: (userName: String) => {
                        var regex = new RegExp(AppConstant.ALPHA_NUMERIC_REGEX);
                        return this.checkRegex(regex, userName);
                    },
                    validMsg: '',
                    invalidMsg: 'Username have to be unique',
                    sampleValue: 'user127'
                },
            ]
        },
        ageValidator: {
            controlId: 'age',
            controlName: 'Age',
            validators: [
                {
                    function: (age: Number) => {
                        return (age > 0 && age < 150) ? true : false;
                    },
                    validMsg: '',
                    invalidMsg: 'Invalid age',
                    sampleValue: '22'
                }
            ]
        },
        zipCodeValidator: {
            controlId: 'zipCode',
            controlName: 'Zip Code',
            validators: [
                {
                    function: (zipCode: String) => {
                        var regex = new RegExp(/^[0-9]{3}([- /]?[0-9]{4})?$/);
                        return this.checkRegex(regex, zipCode);
                    },
                    validMsg: '',
                    invalidMsg: 'Invalid Zipcode',
                    sampleValue: '333-0001'
                }
            ]
        },
        emailValidator: {
            controlId: 'email',
            controlName: 'Email',
            validators: [
                {
                    function: (email: String) => {
                        var mailFormatCheckRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        return this.checkRegex(mailFormatCheckRegex, email);
                    },
                    validMsg: '',
                    invalidMsg: 'Invalid Email Address',
                    sampleValue: 'example@mangrovesystemsbd.com'
                }
            ]
        },
        contactNoValidator: {
            controlId: 'contactNo',
            controlName: 'Contact No',
            validators: [
                {
                    function: (contactNo: String) => {
                        return (contactNo && contactNo.length == 11) ? true : false;
                    },
                    validMsg: '',
                    invalidMsg: 'Contact Number have at least 10 digits',
                    sampleValue: ''
                },
                {
                    function: (contactNo: String) => {
                        var regex = new RegExp(/^\+\d{10}$/);
                        return this.checkRegex(regex, contactNo);
                    },
                    validMsg: '',
                    invalidMsg: 'Contact Number have to start with country code',
                    sampleValue: ''
                }
            ]
        },


    };

    public checkRegex(regex: RegExp, data: any) {
        return regex.test(data);
    }
}