export interface FaqTypeFetch {
    faqTypeId: string,
    faqType: String,
    faqTypeDescription: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String

}

export interface FaqInfoFetch {
    faqInfoId: string,
    faqInfoQuestion: String,
    faqInfoAnswer: String,
    faqTypeId: string,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}



