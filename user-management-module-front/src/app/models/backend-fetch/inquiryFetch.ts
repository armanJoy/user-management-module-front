export interface InquiryInfoFetch {
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

export interface InquiryReply {
    inquiryId: string,
    replyId: string,
    reply: string,
    frontendDate: string,
    backendDate: string,
    userType: string

}

export interface UserInquiry {
    emailAddress: string,
    userCode: string
}