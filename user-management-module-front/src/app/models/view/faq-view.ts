import { FaqTypeFetch, FaqInfoFetch } from "../backend-fetch/faq-fetch"

export interface FaqTypeView {
    faqTypeId: string,
    faqType: String,
    faqTypeDescription: String,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}

export interface FaqInfoView {
    faqInfoId: string,
    faqInfoQuestion: String,
    faqInfoAnswer: String,
    faqTypeId: string,
    backendDate: String,
    frontendDate: String,
    dxrInfoCache: String
}

export interface FaqDetailView {
    faq: FaqTypeView,
    faqInfoList: FaqInfoView[]
}


