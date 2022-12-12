export interface InquiryInfoUpdate {
    id: string,
    companyName: string,
    personName: string,
    contactNo: string,
    contactNoFormated: string | '',
    emailAddress: string,
    inquiryTitle: string,
    inquiryDetail: string,
    response: string,
    isHuman: boolean,
    isAgreed: boolean
}