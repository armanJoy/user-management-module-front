export interface InquiryView {
    id: string,
    companyName: string,
    personName: string,
    contactNo: string,
    contactNoFormated: string | '',
    emailAddress: string,
    inquiryTitle: string,
    inquiryDetail: string,
    frontendDate: string,
    backendDate: string,
    response: string,
    isHuman: boolean,
    isAgreed: boolean
}

export interface InquiryThreadView {
    id: string,
    emailAddress: string,
    inquiryDetail: string,

}