export interface SubscriptionInfoFetch {
    id: string;
    companyName: string;
    zipCode: string;
    address: string;
    contactNo: string;
    subscriptionEmail: string;
    companyCategory: Array<string>;
    isHuman: boolean;
    isAgree: boolean;
    response: string;
    backendDate: string;
    frontendDate: string;
    subscriberName: string;
    subscriberMail: string;
    status: SubscriptionStatus;
    processsList: any[];
    requesterMail: string;
}

export interface SubscriptionStatus {
    statusId: string;
    statusTitle: string;
}