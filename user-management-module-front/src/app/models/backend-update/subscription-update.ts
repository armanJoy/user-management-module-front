import { SubscriptionStatus } from "../backend-fetch/subscription-fetch";

export interface SubscriptionUpdateInfo {
    id: string;
    companyName: string;
    address: string;
    contactNo: string;
    subscriptionEmail: string;
    companyCategory: Array<string>;
    isHuman: boolean;
    isAgree: boolean;
    response: string;
    subscriberName: string;
    subscriberMail: string;
    zipCode: string,
    password: string;
    status: SubscriptionStatus;
    requesterMail: string;
    isSelected?: boolean;
    isSaved?: boolean;
    isExistingCompany?: boolean;
    wasteProcessingLicenceNo?: string;
}
export interface SubscriptionUpdateInfoForForm {
    id: string;
    companyName: string;
    address: string;
    contactNo: string;
    subscriptionEmail: string;
    companyCategory: Array<string>;
    isHuman: boolean;
    isAgree: boolean;
    response: string;
    subscriberName: string;
    subscriberMail: string;
    zipcode: string;
    newPassword: string;
    confirmPassword: string;
    requesterMail: string;
    wasteProcessingLicenceNo: string;
}

export interface Catagory {
    name: string;
    isCheck: boolean;
    label: any;
}