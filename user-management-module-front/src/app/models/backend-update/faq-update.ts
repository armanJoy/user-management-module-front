export interface FaqTypeUpdate {
    faqTypeId: string,
    faqType: String,
    faqTypeDescription: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}

export interface FaqInfoUpdate {
    faqInfoId: string,
    faqInfoQuestion: String,
    faqInfoAnswer: String,
    faqTypeId: string,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}


