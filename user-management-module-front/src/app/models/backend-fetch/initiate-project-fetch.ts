import { AgreementInfo, AgreementInvoiceWasteInfo, AgreementWasteProcessInfo, AgreementWasteTransportInfo, CompanyCategorySelection } from "./business-agreement";
import { DisposeWisePickInfo } from "./create-schedule";
import { MenifestoInfo } from "./menifesto";

export interface CompanyProjectFetch {
    companyProjectList: ProjectInfoFetch[],
}

export interface CompanyBranchFetch {
    branchInfoList: BranchInfoFetch[],
}

export interface CompanyAgreementFetch {
    agreementList: AgreementInfoFetch[],
}

export interface ProjectInfoFetch {
    companyId: string;
    projectScheduleStatus: string;
    initiatorCompanyName: string;
    operatingOfficeName: string;
    operatingOfficeId: string;
    projectInfoId: string;
    projectTitle: string;
    projectCreationDate: string;
    projectStartDate: string;
    projectEndDate: string;
    projectCreationDateView: string;
    projectStartDateView: string;
    projectEndDateView: string;
    operatingBranch: BranchInfoFetch;
    dumperPartner: AgreementPartnerCompanyFetch;
    processorPartner: AgreementPartnerCompanyFetch;
    transporterPartner: AgreementPartnerCompanyFetch;
    wasteItemList: wasteItemInfo[]
    status: StatusInfo;
    agreementInfo: AgreementInfoFetch[];
    wastePickInfo: WasteCollectionInfoFetch[];
    wasteProcessInfo: wasteProcessInfoFetch[];
    wasteDisposalInfo: DisposalInfoFetch[];
    operatingAddress: string;
    operatingZipCode: string;
    processsList: any[];
    isApproveRequiredState: boolean;
    isTransporter: boolean | false;
    isBasicInfoFetched: boolean;
    isOpen: boolean;
    manifestoList: MenifestoInfo[];
    remarks: string;
    projectViewerIds?: string;
    creatorRole?: string;
    companyCategorySelection: CompanyCategorySelection[] | [];
    roleIndex?: number | -1;
    missingRole?: string;
    initialAgreementId?: string;
    agreementWasteTransportInfo?: AgreementWasteTransportInfo[];
    agreementWasteProcessInfo?: AgreementWasteProcessInfo[];
    invoiceWasteInfo?: AgreementInvoiceWasteInfo[];
}

export interface StatusInfo {
    statusId: string;
    statusCode: string;
    statusName: string;
    statusDescription: string;
}

export interface wasteItemInfo {
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
}

export interface BranchInfoFetch {
    companyId: string,
    branchId: string,
    branchName: string,
    zipcode: string,
    branchAddress: string,
    branchContactNo: string,
    branchInchargeName: string,
    branchBusinessCategory: Array<string>,
    remark: string,
}

export interface WasteCollectionInfoFetch {
    wasteCollectionId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickZipCode: string;
    pickAddress: string;
    dropZipCode: string;
    dropAddress: string;
    price: number;
    unit: string;
    wasteShape: string;
    wastePackage: string;
}

export interface DisposalInfoFetch {
    transportDistance: number;
    projectId: string;
    projectTitle: string;
    disposalInfoId: string;
    disposalViewId: string | null;
    collectionId: string;
    fromDate: string;
    fromDateView: string;
    startBackendDate: string;
    toDate: string;
    toDateView: string;
    endBackendDate: string;
    quantity: number;
    planQuantity: number;
    remainingQuantity: number;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickLocation: string;
    pickZipCode: string;
    dropLocation: string;
    dropZipCode: string;
    isParent: boolean;
    unit: string;
    price: number;
    disposeWisePickList: DisposeWisePickInfo[];
    scheduleConfirmStatus: string | '0';
    wasteShape: string;
    wastePackage: string;
    remarks?: string | '';
}

export interface wasteProcessInfoFetch {
    wasteProcessId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    processStartDate: string;
    startBackendDate: string;
    processEndDate: string;
    endBackendDate: string;
    quantity: number;
    price: number;
    unit: string;
    totalPrice: number;
}

export interface AgreementInfoFetch {
    companyId: string;
    agreementId: string;
    agreementTitle: string;
    agreementValidDate: string;
    dumperPartner: AgreementPartnerCompanyFetch;
    processorPartner: AgreementPartnerCompanyFetch;
    transporterPartner: AgreementPartnerCompanyFetch;
    wastePickList: WasteCollectionInfoFetch[];
    processList: AgreementWasteProcessInfo[],
    isSelected?: boolean
    invoiceReceiverComId: string;
    isTransportPriceApply: boolean;
    isProcessingPriceApply: boolean;
    agreementInvoiceWasteList: AgreementInvoiceWasteInfo[];

}

export interface AgreementPartnerCompanyFetch {
    companyInfoId: string;
    companyName: string;
    personIncharge: string;
    personInchargeEmail: string;
    assignRoles: string;
    approvalStatus?: string;
}

export interface AgreementPopupView {
    projectInfo: ProjectInfoFetch | null;
    agreementList: AgreementInfoFetch[];
    selectedAgreementIds?: string[];
    creatorRole: string;
    partnerRole: string;
}
export interface WasteCollectionInfoView {

    wasteCollectionId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    pickZipCode: string;
    pickAddress: string;
    dropZipCode: string;
    dropAddress: string;
    price: number;
    unit: string;
    isCheck: boolean;
    wasteShape: string;
    wastePackage: string;
    transporterInvoiceInfo?: boolean;
    transporterInvoicePrice?: number;
    processorInvoiceInfo?: boolean;
    processorInvoicePrice?: number;
}

export interface AgreementInfoView {
    companyId: string;
    agreementId: string;
    agreementTitle: string;
    agreementValidDate: string;
}

export interface ProjectWasteItem {
    wasteCollectionId: string;
    agreementId: string;
    wasteTypeId: string;
    wasteTypeName: string;
    wasteItemId: string;
    wasteItemName: string;
    unit: string;
    price: number;
}

export interface AgreementPopupSaveDetails {
    selectAgreement: AgreementInfoFetch[];
    selectDiposalList: DisposalInfoFetch[];
    selectProceessList: wasteProcessInfoFetch[];
    selectedWasteItemList: wasteItemInfo[];
    newAgreementForSave?: AgreementInfo;
}

export interface ProjectFilter {
    operationId: string;
    operationTitle: string;
    statusList: ProjectStatusFilter[];
}

export interface ProjectStatusFilter {
    statusId: string;
    statusTitle: string;
    isSelected: boolean;
}

export interface OwnApprovalStatus {
    projectId: string;
    companyId: string;
    isApproved: boolean;
}

export interface ProjectStatusUpdate {
    projectId: string;
    statusId: string;
    isApprovalRequired: boolean;
    requestedCompanyId: string;
    requestedCompanyType: string;
    isApproved: boolean;
}

export interface ProjectActionConfirmPopupData {
    currentStatus: string;
    newStatus: string;
    isApprovedByOtherParty: boolean;
}
