import { AgreementPartnerInfo } from "./business-agreement";
import { BankAccountInfo } from "./company-settings-fetch";
import { MenifestoInfo } from "./menifesto";

export interface Invoice {
    invoiceId: string;
    invoiceNo: string;
    subject: string;
    billAmount: number;
    remark: string;
    frontendDate: string;
    backendDate: string;
    status: Status;
    generatorCompInfo: AgreementPartnerInfo;
    receiveCompInfo: AgreementPartnerInfo;
    manifestoList: MenifestoInfo[];
    processsList: any[];
}
export interface Status {
    statusId: string;
    statusTitle: string;
}

export interface OwnApprovalStatus {
    invoiceId: string;
    companyId: string;
    isApproved: boolean;
}

export interface InvoiceStatusUpdate {
    invoiceId: string;
    statusId: string;
    isApprovalRequired: boolean;
    requestedCompanyId: string;
    requestedCompanyType: string;
    isApproved: boolean;
}

