export interface DefaultCompany {
    userId: string;
    defaultCompanyId: string;
}

export interface LogoutEventInfo {
    browserSessionId: string;
    userId: string;
    companyId: string;
    logoutType: string;
}

export interface UserSession {
    userSessionId: string;
    userSessionEmail: string;
    userSessionStartDate: string;
}

export interface UserIdentification {
    userId: string;
    userAuth: string;
}

export interface ChangeUserIdentification {
    userId: string;
    accessCode: string;
    oneTimeAccessFlag: string;
    newAuth: string;
}

export interface UserInfoUpdate {
    userInfoId: String;
    userName: String;
    userAddress: String;
    departmentTitle: String;
    userEmail: String;
    userContact: String;
    userCompanyId: String;
    userCategoryId: String;
    newPassword: string;
    confirmPassword: string;
    pass: string;
}

export interface UserInfoFetch {
    name: String,
    address: String,
    departmentTitle: String,
    email: String,
    mobile: String,
    companyId: String
}

export interface AccessInfoView {
    accessFlag: String,
    accessInfo: any[]
}
export interface UserIdentificationFetch {
    userIdentification: string;
}