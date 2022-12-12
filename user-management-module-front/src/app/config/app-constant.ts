import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { CompanyCategorySelection, CompanyPaymentMethodSelection } from "../models/backend-fetch/business-agreement";
import { ProjectStatusFilter } from "../models/backend-fetch/initiate-project-fetch";

export class AppConstant {
    public static BANK_PAYMENT_MODE = "B";
    public static CASH_PAYMENT_MODE = "C";

    public static PAYMENT_METHOD_FILTER = [
        {
            titleKey: 'bankPayment',
            value: AppConstant.BANK_PAYMENT_MODE
        },
        {
            titleKey: 'cashPayment',
            value: AppConstant.CASH_PAYMENT_MODE
        }
    ];

    public static MAX_INVOICE_TARGET_COMPANY = 1;

    public static AGREEMENT_PARTNER_PAYMENT_METHOD: CompanyPaymentMethodSelection[] = [
        {
            methodId: '1',
            title: 'Bank',
            isSelected: false
        },
        {
            methodId: '2',
            title: 'Cash',
            isSelected: false
        }
    ];

    // public static LOAD_UNLOAD_FILTER_ID = "loadUnloadUI";

    public static MATCH_LOAD_MENU_WEB = '\"loadMenuWeb\"';
    public static MATCH_UNLOAD_MENU_WEB = '\"unloadMenuWeb\"';

    public static USER_MANAGEMENT_MENU_ID = "menudef00012";
    public static DATA_RESTORE_MENU_ID = "dataRestoreMenu";

    public static LOAD_UNLOAD_FILTER_ID = "loadUnloadUI";
    public static LOAD_UNLOAD_FILTER_DEF: ProjectStatusFilter = {
        statusId: "loadUnloadUI",
        statusTitle: "tripStatusLabel",
        isSelected: true
    }

    public static TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF: ProjectStatusFilter = {
        statusId: "tripConfirmationDashboardUi",
        statusTitle: "tripStatusLabel",
        isSelected: true
    }

    public static TRUE_STATEMENT = "1";
    public static FALSE_STATEMENT = "0";

    public static MANIFESTO_LOAD_STATUS = {
        id: "1",
        titleEng: "Loaded",
        titleJpn: "Loaded"
    };

    public static MANIFESTO_UNLOAD_STATUS = {
        id: "2",
        titleEng: "Unloaded",
        titleJpn: "Unloaded"
    };

    public static LOAD_MENU_ID_STRING = "\"loadMenu\"";
    public static UNLOAD_MENU_ID_STRING = "\"unloadMenu\"";
    public static LOAD_OP = 'loadOp';
    public static UNLOAD_OP = 'unloadOp';

    public static TRANSPORTER_INVOICE = 'tranporter-invoice';
    public static PROCESSOR_INVOICE = 'processor-invoice';

    public static MAX_AGREEMENT_PARTNER = 2;

    public static MULTIPLE_OVERLAPPED_TRIP_FLAG = "00000";

    public static CREATE_SCHEDULE_MENU_ID = 'projectScheduleMenu';
    public static AGREEMENT_COMPANY_CATEGORY_IDS = ['1', '2', '3'];

    public static dxrCompanyBusinessCategory: CompanyCategorySelection[] = [
        {
            categoryId: '1',
            title: 'Dumper',
            isSelected: false,
            isDisable: true
        },
        {
            categoryId: '2',
            title: 'Processor',
            isSelected: false,
            isDisable: true
        },
        {
            categoryId: '3',
            title: 'Transporter',
            isSelected: false,
            isDisable: true
        }
    ];

    public static HIDE_AGREEMENT_OPERATION_FILTER_DROPDOWN = true;
    public static HIDE_PROJECT_OPERATION_FILTER_DROPDOWN = true;

    public static LANGUAGE_DEF_LOCALSTORAGE_KEY = "languageDef";

    public static REMOVED_USER_COOKIE_KEY = "removedUser";
    public static REMOVED_COMPANY_COOKIE_KEY = "removedCompany";

    public static COMPANY_LOGOUT = "company-logout";
    public static USER_LOGOUT = "user-logout";

    public static LOGGED_USER_COOKIE_KEY = "dxrUsers";
    public static BROWSER_SESSION_KEY = "browserSession";

    public static DUMPER_ADMIN_OUTLET = 'dumperAdminOutlet';
    public static COMPANY_ADMIN_OUTLET = 'companyAdminOutlet';
    public static SYSTEM_ADMIN_OUTLET = 'dxrSysAdminOutlet';

    public static HIDE_SECONDARY_MENU = true;

    public static PROCESS_COMPELETION_MENU_ID = "processCompletionMenu";
    public static LOAD_MENU_ID = "loadMenuWeb";
    public static UNLOAD_MENU_ID = "unloadMenuWeb";

    public static ROLE_COMPANY_ADMIN_ID = "roledef0001"
    public static ROLE_PERSON_IN_CHARGE_DUMPER = "roledef0002";

    public static ROLE_PERSON_IN_CHARGE_TRANSPORTER = "roledef0003";

    public static ROLE_PERSON_IN_CHARGE_PROCESSOR = "roledef0004";

    public static ROLE_DRIVER = "roledef0005";

    public static ROLE_RECEPTION_MANAGER_PROCESSOR = "roledef0006";

    public static ROLE_COMPANY_ACCOUNTANT = "roledef0007";

    public static ROLE_RECEIVING_MANAGER_PROCESSOR = "roledef0008";

    public static ROLE_TEMPORARY_USER = "roledef0009";

    public static ROLE_REFERENCE_USER = "roledef0010";

    public static MONTH_DATE_ARRAY: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    public static MONTH_NUMBER_ARRAY: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    public static VALID_PICK_INFO = "0";
    public static INVALID_TRIP_TIME = "1";
    public static INVALID_DRIVER = "2";
    public static INVALID_PICK_QUANTITY = "3";
    public static NEW_WASTE = "1";
    public static EXISTING_WASTE = "0";

    public static SUCCESS_RESPONSE_FROM_BACKEND = '1';

    public static MONTH_ARRAY: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    public static OPERATION_WISE_CO2_FILTER = "001";
    public static PROJECT_WISE_CO2_FILTER = "002";

    public static MENU_SEQUENCE: any[] = [
        {
            id: "systemOverview",
            serial: "100.000.000.000",
            name: "System Overview"
        },
        // --------------------------------------
        {
            id: "subscription",
            serial: "101.000.000.000",
            name: "Subscription"
        },
        // --------------------------------------
        {
            id: "faq",
            serial: "102.000.000.000",
            name: "FAQ"
        },
        // --------------------------------------
        {
            id: "inquiry",
            serial: "103.000.000.000",
            name: "Inquiry"
        },
        // --------------------------------------
        {
            id: "menudefSystemAdmin",
            serial: "104.000.000.000",
            name: "DX-R Admin"
        },
        {
            id: "sysAdminSystemOverview",
            serial: "104.100.000.000",
            name: "System Overview"
        },
        {
            id: "sysAdminSubscription",
            serial: "104.101.000.000",
            name: "Subscription"
        },
        {
            id: "sysAdminFaq",
            serial: "104.102.000.000",
            name: "FAQ"
        },
        {
            id: "sysAdminInquiry",
            serial: "104.103.000.000",
            name: "Inquiry"
        },
        {
            id: "sysAdminRoleDef",
            serial: "104.104.000.000",
            name: "Role Definition"
        },
        {
            id: "vehicleSetup",
            serial: "104.105.000.000",
            name: "Vehicle Setup"
        },
        {
            id: "sysAdminWasteDef",
            serial: "104.106.000.000",
            name: "Waste Def"
        },
        {
            id: "sysAdminWasteRequest",
            serial: "104.107.000.000",
            name: "Waste Request"
        },
        // --------------------------------------
        {
            id: "menudef0001",
            serial: "105.000.000.000",
            name: "Company Management"
        },
        {
            id: "menudef00011",
            serial: "105.100.000.000",
            name: "Company Settings"
        },
        {
            id: "menudef00012",
            serial: "105.101.000.000",
            name: "User Management"
        },
        // --------------------------------------
        {
            id: "menudef0002",
            serial: "106.000.000.000",
            name: "Company Operations"
        },
        {
            id: "menudefBusinessAgreement",
            serial: "106.101.000.000",
            name: "Agreement"
        },
        {
            id: "initiateProject",
            serial: "106.102.000.000",
            name: "Initiate Project"
        },
        {
            id: "projectScheduleMenu",
            serial: "106.103.000.000",
            name: "Create Schedule"
        },

        {
            id: "loadMenuWeb",
            serial: "106.104.000.000",
            name: "Load"
        },
        {
            id: "unloadMenuWeb",
            serial: "106.105.000.000",
            name: "Unload"
        },
        {
            id: "menifestoMenu",
            serial: "106.106.000.000",
            name: "Menifesto"
        },
        {
            id: "processCompletionMenu",
            serial: "106.107.000.000",
            name: "Process Completion"
        },
        {
            id: "invoiceMenu",
            serial: "106.108.000.000",
            name: "Invoice"
        },
        {
            id: "dataRestoreMenu",
            serial: "106.109.000.000",
            name: "Data Restore"
        },
        // ----------------------------------------------
        {
            id: "loadMenu",
            serial: "107.000.000.000",
            name: "Load"
        },
        {
            id: "loadDashboardMenu",
            serial: "107.100.000.000",
            name: "Dashboard"
        },
        {
            id: "pickListMenu",
            serial: "107.101.000.000",
            name: "Pick List"
        },
        {
            id: "wasteLoadMenu",
            serial: "107.102.000.000",
            name: "Waste Load"
        },
        {
            id: "tripScanMenu",
            serial: "107.103.000.000",
            name: "Trip Scan"
        },
        {
            id: "wasteListMenu",
            serial: "107.104.000.000",
            name: "Waste List"
        },
        {
            id: "packageDefMenu",
            serial: "107.104.000.000",
            name: "Package Def"
        },
        {
            id: "handoverMenu",
            serial: "107.104.000.000",
            name: "Handover"
        },
        // -----------------------------------------------
        {
            id: "unloadMenu",
            serial: "108.000.000.000",
            name: "Unload"
        },
        {
            id: "unloadDashboardMenu",
            serial: "108.100.000.000",
            name: "Dashboard"
        },
        {
            id: "handoverByDriverMenu",
            serial: "108.101.000.000",
            name: "Handover"
        },
        {
            id: "tripCompletionMenu",
            serial: "108.102.000.000",
            name: "Trip Completion"
        },
        {
            id: "tripInfoScanByProcessorMenu",
            serial: "108.103.000.000",
            name: "Trip Info"
        },
        {
            id: "verificationMenu",
            serial: "108.104.000.000",
            name: "Trip Verification"
        },
        {
            id: "weightDeclarationMenu",
            serial: "108.105.000.000",
            name: "Weight Declaration"
        },
        {
            id: "wasteReceiveMenu",
            serial: "108.106.000.000",
            name: "Waste Receive"
        },
        // ------------------------------------------------
        {
            id: "dxrSuperAdmin",
            serial: "109.000.000.000",
            name: "System Admin Op"
        },
        {
            id: "languageSetup",
            serial: "109.100.000.000",
            name: "Language Setup"
        },
        {
            id: "createDxrAdmin",
            serial: "109.101.000.000",
            name: "Create DXR Admin"
        },
        {
            id: "setDxrAdminAccess",
            serial: "109.102.000.000",
            name: "Set DXR Admin Access"
        },
        {
            id: "setCompanyAdminAccess",
            serial: "109.103.000.000",
            name: "Set Company Admin Access"
        },
        {
            id: "subscriptionProcessDef",
            serial: "109.104.000.000",
            name: "Set Subscription Process Def"
        },
        {
            id: "agreementProcessDef",
            serial: "109.105.000.000",
            name: "Set Agreement Process Def"
        },
        {
            id: "projectProcessDef",
            serial: "109.106.000.000",
            name: "Set Project Process Def"
        },
        {
            id: "invoiceProcessDef",
            serial: "109.107.000.000",
            name: "Set Invoice Process Def"
        },
        {
            id: "notificationProcessDef",
            serial: "109.108.000.000",
            name: "Set notification Process Def"
        }
    ]

    public static MANIFESTO_REPORT_FILE_NAME = "final_manifesto_report_2022-07-25.rptdesign";
    public static MANIFESTO_REPORT_TYPE = "final_manifesto_report.pdf";

    public static REMOVED_TOAST: any = {
        eng: 'Item has been removed',
        jpn: 'Item has been removed'
    }

    removeOperationTitleLabels = {
        "dxr-waste-category-remove-op": "Dxr Waste Category Remove Op",
        "dxr-waste-type-remove-op": "Dxr Waste Type Remove Op",
        "dxr-waste-item-remove-op": "Dxr Waste Item Remove Op",
        "company-branch-remove-op": "Company Branch Remove Op",
        "company-bank-account-remove-op": "Company Bank Account Remove Op",
        "company-vehicle-remove-op": "Company Vehicle Remove Op",
        "company-scale-remove-op": "Company Scale Remove Op",
        "company-waste-remove-op": "Company Waste Remove Op",
        "faq-type-remove-op": "Faq Type Remove Op",
        "faq-info-remove-op": "Faq Info Remove Op",
        "company-subscription-remove-op": "Company Subscription Remove Op",
        "vehicle-type-remove-op": "Vehicle Type Remove Op",
        "gasoline-type-remove-op": "Gasoline Type Remove Op"

    }

    public static WASTE_CATEGORY_REMOVE_OPERATION = "dxr-waste-category-remove-op";
    public static WASTE_TYPE_REMOVE_OPERATION = "dxr-waste-type-remove-op";
    public static WASTE_DEF_REMOVE_OPERATION = "dxr-waste-item-remove-op";
    public static BRANCH_REMOVE_OPERATION = "company-branch-remove-op";
    public static BANK_ACCOUNT_REMOVE_OPERATION = "company-bank-account-remove-op";
    public static VEHICLE_REMOVE_OPERATION = "company-vehicle-remove-op";
    public static SCALE_REMOVE_OPERATION = "company-scale-remove-op";
    public static COMPANY_WASTE_REMOVE_OPERATION = "company-waste-remove-op";
    public static COMPANY_USER_REMOVE_OPERATION = "company-user-remove-op";
    public static FAQ_TYPE_REMOVE_OPERATION = "faq-type-remove-op";
    public static FAQ_INFO_REMOVE_OPERATION = "faq-info-remove-op";
    public static COMPANY_SUBSCRIPTION_REMOVE_OPERATION = "company-subscription-remove-op";
    public static VEHICLE_TYPE_REMOVE_OPERATION = "vehicle-type-remove-op";
    public static GASOLINE_TYPE_REMOVE_OPERATION = "gasoline-type-remove-op";
    public static PICK_REMOVE_OPERATION = "pick-remove-op";
    public static AGREEMENT_REMOVE_OPERATION = "agreement-remove-op";
    public static PROJECT_REMOVE_OPERATION = "project-remove-op";


    public static MONTH_DAY: string[] = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];

    public static DUMPER_MOBILE_MENU_REDIRECT_INFO = {
        parentSegment: '/load',
        url: 'dumper-trip-scan',
        outlet: 'driverOutlet'
    };

    public static PROCESSOR_MOBILE_MENU_REDIRECT_INFO = {
        parentSegment: '/unload',
        url: 'processor-trip-scan',
        outlet: 'unloadOutlet'
    };

    public static SUBSCRIPTION_NOTIFICAIONT_ID = "notificationType001";

    public static INQUIRY_NOTIFICAIONT_ID = "notificationType002";

    public static WASTE_REQUEST_NOTIFICAIONT_ID = "notificationType003";

    public static AGREEMENT_NOTIFICAIONT_ID = "notificationType004";

    public static PROJECT_NOTIFICAIONT_ID = "notificationType005";

    public static PROJECT_SCHEDULE_NOTIFICAIONT_ID = "notificationType006";

    public static INVOICE_NOTIFICAIONT_ID = "notificationType007";

    public static MANIFESTO_NOTIFICAIONT_ID = "notificationType008";

    public static DXR_SYSTEM_ADMIN_MENU_ID = "menudefSystemAdmin";
    public static COMPANY_ADMIN_MENU_ID = "menudef0002";

    public static Subscription_Menu_Id = "sysAdminSubscription";
    public static Inquiry_Menu_Id = "sysAdminInquiry";
    public static Waste_Request_Menu_Id = "sysAdminWasteRequest";
    public static Agreement_Menu_Id = "menudefBusinessAgreement";
    public static Project_Menu_Id = "initiateProject";
    public static Schedule_Menu_Id = "projectScheduleMenu";
    public static Invoice_Menu_Id = "invoiceMenu";
    public static Menifesto_Menu_Id = "menifestoMenu";

    public static PICK_STATUS_LOADED = "1";
    public static PICK_STATUS_UNLOADED = "2";

    public static MANIFESTO_TYPE_GENERATED = 'menifestoType0001';
    public static MANIFESTO_TYPE_MANUAL = 'menifestoType0002';

    public static DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE = "0";
    public static DISPOSE_WISE_SCHEDULE_CONFIRM_DONE = "1";

    public static PROJECT_SCHEDULE_CONFIRM_NOT_DONE = "0";
    public static PROJECT_SCHEDULE_CONFIRM_DONE = "1";

    public static MENIFESTO_STATUS_LOADED = "1";
    public static MENIFESTO_STATUS_UNLOADED = "2";
    public static MENIFESTO_PROCESSING_COMPLETE_STATUS = "3";

    public static MENIFESTO_PROGRESS_FILTER = AppConstant.MENIFESTO_STATUS_LOADED + "|" + AppConstant.MENIFESTO_STATUS_UNLOADED;
    public static PROCESS_COMPLETE_PROGRESS_FILTER = AppConstant.MENIFESTO_STATUS_UNLOADED;
    public static COMPLATED_FILTER = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;

    public static INITIAL_PROJECT_STATUS = 'statusProjectInUse|statusNewProject'
    public static AGREEMENT_INITIALLY_SELECTED_STATUS = 'statusNewAgreement';

    public static INITIAL_PAGE_NO = 0;
    public static INITIAL_SEARCH_TEXT = '';
    public static INITIAL_SEARCH_STATUS = '';

    public static REQUEST_INITIAL_FILTER = 'New';
    public static NEW_FILTER = '0';
    public static REPLIED_FILTER = '1';

    public static INQUIRY_INITIAL_FILTER = 'Unanswered';
    public static ANSWERED_FILTER = '1';
    public static UNANSWERED_FILTER = '0';

    public static RHIRD_LABEL_VIEW = false;

    public static Data_Ends_Label = 'No more data found...';
    public static DXR_LIST_VIEW_PAGE_SIZE = 10;

    public static SUBSCRIPTION_NEW_COMPANY_STATUS = "statusInUse";
    public static SUBSCRIPTION_TEMPORARY_COMPANY_STATUS = "statusTemporaryUse";

    public static SUBSCRIPTION_SUSPENSION_STATUS = "statusSuspended";

    public static SUBSCRIPTION_REJECTION_STATUS = "statusRejected";

    public static SUBSCRIPTION_ACCEPT_STATUS = "Accept";
    public static SUBSCRIPTION_PROCESS_ACCESS_NONE = "none";
    public static SUBSCRIPTION_INITIAL_STATUS = "statusWaitingForConfirmation"
    public static PROJECR_TERMINATE_OPERATION_ID = "opTermination";
    public static PROJECR_TERMINATE_STATUS_ID = "statusTerminationReadyForApprove";

    public static PROJECR_COMPLETION_OPERATION_ID = "opCompletion";
    public static PROJECR_COMPLETION_READY_FOR_APPROVE_STATUS_ID = "statusCompletionWaitingForApproval";

    public static AGREEMENT_CANCELED_OPERATION_ID = "opCancelation";
    public static AGREEMENT_CANCELED_STATUS_ID = "statusAgreementCanceled";
    public static AGREEMENT_REVIVE_READY_FOR_SEND_OPERATION_ID = "opRevive";
    public static AGREEMENT_REVIVE_READY_FOR_SEND_STATUS_ID = "statusReviveReadyForSend";

    public static DXR_COMPANY_ID = "dxr00001";

    public static COOKIE_EXPIRE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";
    public static COOKIE_EXPIRE_MONTH = 1;

    public static PROJECT_STATUS_FOR_CREATE_SCHEDULE_BUTTON = "statusWaitingForAproval|";
    public static INVOICE_PROCESS_ACCESS_NONE = "none";
    public static INVOICE_PROCESS_ACCESS_VIEW = "view";
    // public static INVOICE_PROCESS_ACCESS_EDIT = "edit";

    public static MONTH: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    public static MONTH_JPN: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    public static DUMPER_EMISSION_TYPE_METHODE_ID = "emimissionTypeId001";
    public static PROCESSING_EMISSION_TYPE_METHODE_ID = "emimissionTypeId002";

    public static MOBILE_MENU_IDS = "homeMenu|loadMenu|dashboardMenu|pickListMenu|packageScanMenu|tripScanMenu|packageDefMenu|handoverMenu|unloadMenu|unloadDashboardMenu|handoverByDriverMenu|tripCompletionMenu|tripInfoScanByProcessorMenu|verificationMenu|weightDeclarationMenu|wasteReceiveMenu|";
    // loadMenuWeb| unloadMenuWeb |

    public static REPORT_FILE_FORMAT_PDF = "pdf";


    public static APPROVAL_REQUIRED_STATUS_OF_PROJECT: string[] = ["statusWaitingForAproval", "statusWaitingForAmmendmentApprove", "statusCancelationReadyForApprove", "statusSuspensionReadyForApprove", "statusReviveReadyForApprove"];

    public static PROJECT_STATUS_NEW = 'statusNewProject';
    public static PROJECT_STATUS_IN_USE = 'statusProjectInUse';

    public static PROJECT_OPERATION_TITLE_ENG = "operationTitleEng";
    public static PROJECT_OPERATION_TITLE_JPN = "operationTitleJpn";

    public static PROJECT_PROCESS_ACCESS_NONE = "none";
    public static PROJECT_PROCESS_ACCESS_VIEW = "view";
    public static PROJECT_PROCESS_ACCESS_EDIT = "edit";

    public static AGREEMENT_OPERATION_TITLE_ENG = "operationTitleEng";
    public static AGREEMENT_OPERATION_TITLE_JPN = "operationTitleJpn";

    public static USER_TYPE_ADMIN = 'Admin';
    public static USER_TYPE_VISITOR = 'Visitor';

    public static COMPANY_CATEGORY_LIST: any = [
        {
            "id": "1",
            "eng": "Dumper",
            "jpn": "排出事業者"
        },
        {
            "id": "3",
            "eng": "Transporter",
            "jpn": "運搬事業者"
        },
        {
            "id": "2",
            "eng": "Processor",
            "jpn": "処理事業者"
        }
    ];

    public static APPROVAL_REQUIRED_STATUS_OF_AGREEMENT: string[] = ["statusWaitingForAproval", "statusWaitingForTerminationApprove", "statusCompletionForApprove"];

    public static AGREEMENT_STATUS_NEW = 'statusNewAgreement';
    public static AGREEMENT_STATUS_IN_USE = 'statusAgreementInUse';

    public static COMPANY_CATEGORY_TITLE_ENG = "eng";
    public static COMPANY_CATEGORY_TITLE_JPN = "jpn";

    public static COMPANY_CATEGORY_NAME: any = {
        "Dumper": {
            "eng": "Dumper",
            "jpn": "Dumper"
        },
        "Transporter": {
            "eng": "Transporter",
            "jpn": "Transporter"
        },
        "Processor": {
            "eng": "Processor",
            "jpn": "Processor"
        },
        "1": {
            "eng": "Dumper",
            "jpn": "Dumper"
        },
        "3": {
            "eng": "Transporter",
            "jpn": "Transporter"
        },
        "2": {
            "eng": "Processor",
            "jpn": "Processor"
        }
    }


    public static PROCESS_TITLE_KEY_ENG = 'processTitleEng';
    public static PROCESS_TITLE_KEY_JPN = 'processTitleJpn';

    public static ACTION_TITLE_KEY_ENG = 'actionTitleEng';
    public static ACTION_TITLE_KEY_JPN = 'actionTitleJpn';

    public static STATUS_TITLE_KEY_ENG = 'statusTitleEng';
    public static STATUS_TITLE_KEY_JPN = 'statusTitleJpn';

    public static AGREEMENT_PROCESS_ACCESS_NONE = "none";
    public static AGREEMENT_PROCESS_ACCESS_VIEW = "view";
    public static AGREEMENT_PROCESS_ACCESS_EDIT = "edit";

    public static USER_EMAIL_FOR_LANGUAGE_UPDATE = [
        'yallohate@gmail.com',
        'upalism@gmail.com',
        'mokid.mangrovesystemsbd@gmail.com',
        'joy.mangrovesystemsbd@gmail.com',
        'rakib.mangrovesystemsbd@gmail.com',
        'asadul83.islam@gmail.com',
        'abdullah.kayesh@gmail.com',
        'dxrsysadmin@gmail.com',
        'mrraju.ice.iu@gmail.com'
    ];

    public static USE_SAVED_BANK_ACCOUNT = 'savedAccount';
    public static USE_OTHER_BANK_ACCOUNT = 'otherAccount';

    public static JAPANESE_CURRENCY_SIGN = '¥';

    public static MENU_CATEGORY_COMPANY_MANAGEMENT = 'menucat001';
    public static MENU_CATEGORY_COMPANY_OPERATIONS = 'menucat002';
    public static ADMIN = "Admin";
    public static USER_CATEGORY_DXR_ADMIN = "usercategory0001";
    public static USER_CATEGORY_COMPANY_ADMIN = "usercategory0002";
    public static USER_CATEGORY_COMPANY_USER = "usercategory0003";
    public static DUMPER_CATEGORY_VALUE_ID = "1";
    public static PROCESSOR_CATEGORY_VALUE_ID = "2";
    public static TRANSPOTER_CATEGORY_VALUE_ID = "3";
    public static MENU_TYPE_PRIMARY = "menutype0001";
    public static MENU_TYPE_SECONDARY = "menutype0002";

    public static MENU_TYPE_NAME_PRIMARY = "Primary Menu";
    public static MENU_TYPE_NAME_SECONDARY = "Secondary Menu";

    public static PASSWORD_NOT_MATCHED_FLAG = '0';
    public static PASSWORD_MATCHED_FLAG = '1';
    public static PASSWORD_LENGTH_NOT_MATCHED_FLAG = '2';
    public static PASSWORD_LENGTH_MATCHED_FLAG = '1';

    public static SELECTED_COMPANY_ID_KEY = 'companyId';

    public static COMPANYADDRESS = 'Company Address : ';
    public static BRANCHADDRESS = 'Branch';

    public static PAYMENT_MODE = ['Cash', 'Bank Transfer'];
    public static PAYMENT_MODE_CASH = 'Cash';
    public static PAYMENT_MODE_BANK_TRANSFER = 'Bank Transfer';

    public static GASOLINE_TYPE = ['Regular (petrol)', 'Diesel', 'High Octane', 'CNG', 'Electric'];
    public static GASOLINE_TYPE_PETROL = 'Regular (petrol)';
    public static GASOLINE_TYPE_DIESEL = 'Diesel';
    public static GASOLINE_TYPE_OCTANE = 'High Octane';
    public static GASOLINE_TYPE_CNG = 'CNG';
    public static GASOLINE_TYPE_ELECTRIC = 'Electric';

    public static CATEGORY_NAME_DUMPER = 'Dumper';
    public static CATEGORY_NAME_TRANSPORTER = 'Transporter';
    public static CATEGORY_NAME_PROCESSOR = 'Processor';

    public static SUBSCRIPTION_INITIAL_SUBMIT_STATUS = '00000';
    public static CACHE_DEFAULT_DATE = '00000000000000'
    public static URL_DIRECTION_GET = 'get';
    public static URL_DIRECTION_SAVE = 'save';

    public static CACHE_URLS = [
        {
            name: 'language-setup',
            urlRegex: /\/language-competency\/language/,
            direction: AppConstant.URL_DIRECTION_GET
        },
        {
            name: 'static-page',
            urlRegex: /\/system-overview\/getPage/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'faq',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_GET
        },
        {
            name: 'language-setup',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'static-page',
            urlRegex: /\d_[a-zA-Z]+_\/savePage/,
            direction: AppConstant.URL_DIRECTION_SAVE
        },
        {
            name: 'faq',
            urlRegex: /\d_[a-zA-Z]+_\/test\/web/,
            direction: AppConstant.URL_DIRECTION_SAVE
        }
    ]

    public static CACHE_SAVE_URLS = [

    ]

    public static FOOTER_ROUTES = {
        COSTING: '/visitor/system-overview/2',
        COMPANY_USING_IT: '/visitor/system-overview/3',
        TERMS_OF_USE: '/visitor/terms-of-use',
        PRIVACY_POLICY: '/visitor/privacyPolicy',

    }

    public static USER_ID_OR_PASSWORD_NOT_MATCH_FLAG = "0";
    public static ONE_TIME_ACCESS_FLAG_TRUE = "1";
    public static ONE_TIME_ACCESS_FLAG_FALSE = "0";

    public static CONTROL_NAME_ENGLISH = 'controlNameEng';
    public static CONTROL_NAME_JAPANESE = 'controlNameJpn';
    public static INAVALID_MESSAGE_KEY_ENGLISH = 'invalidMsgEng';
    public static INAVALID_MESSAGE_KEY_JAPANESE = 'invalidMsgJpn';
    public static SAMPLE_VALUE_KEY_ENGLISH = 'sampleValueEng';
    public static SAMPLE_VALUE_KEY_JAPANESE = 'sampleValueJpn';
    public static SNACKBAR_HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = 'center';
    public static SNACKBAR_VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';
    public static SNACKBAR_TIME_DURATION = 2 * 1000;
    public static COMPANY_CATEGORY = ['Dumper', 'Transporter', 'Processor'];
    public static AUTH_ID_KEY = "auth-id";
    public static AUTH_PASS_KEY = "auth-pass"
    public static DXR_AUTH_ID = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqWV9jSRh/Rm9MYMdnCfneNWIS8qB04vGtXlWqbEzvnlJkeTd908Nz/u0ZAAqWusLnrfO5ndp32QmyrbnM9TPrw2Dn+BeeXWVb2v2VM7hEJ35H+UMEJvTZNuE/udg9pIsc+u465xvUXbMbPe3/1jGQaXpTsRDoShjLPDEIYvfsXOxYTW2ZZ3P7mKQBJcEthcbcwWjbm2JnD4sRBZo6CY+5l8pCXrtZoYmRmcZO0E9YiDDvhfRbLfwnsuuSsAc5/nSirBzS0hf9DzOBRCZQfBZauZlhosQm/uFToEKs2NkwAVuhC/AZqPJcmt/8vo6VNZSF4uQ1rstqkKWcIGWgw8iXQIDAQAB";
    public static HTTP_GET = 'GET';
    public static HTTP_POST = 'POST';
    public static HTTP_DELETE = 'DELETE';
    public static UI_MENU_LIST = 'menus';
    public static ENGLISH_MENU_TITLE = 'menuTitleEng';
    public static JAPANESE_MENU_TITLE = 'menuTitleJpn';
    public static BASE_URL: string = 'http://192.168.68.104:8000/web';
    public static MY_BASE_URL: string = 'http://192.168.68.104:8000/web';
    // public static BASE_URL: string = 'http://100.24.84.98:9000/web';
    // public static BASE_URL: string = 'http://172.31.95.49:9000/web';
    public static LANG_INDEX_KEY = 'langIndex';
    public static ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    public static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    public static CONTACT_NO_REGEX = /^\+\d{10}$/;
    public static ZIP_CODE_REGEX = /^[0-9]{3}([- /]?[0-9]{4})?$/;
    public static LANG_INDEX_ENG = 'eng';
    public static LANG_INDEX_JPN = 'jpn';
    public static UI_LABEL_TEXT = 'labels';
    public static UI_MESSAGE_TEXT = 'messages';
    public static UI_NOTIFICATION_TEXT = 'notifications';
    public static ADD_OP = 'addItem';
    public static EDIT_OP = 'editItem';

    public static COMP = {
        APP_ROOT: 'appRoot',
        SYSTEM_ADMIN: 'system-admin',
        FAQ_VISITOR: 'faq-visitor',
        FAQ_CATEGORY: 'faq-category',
        FAQ_QUESTION_ANSWER: 'faq-question-answer',
        FAQ_ADMIN: 'faq-admin',
        ADD_FAQ_CATEGORY_ADMIN: 'faq-category-admin',
        SUBSCRIPTION_FORM: 'subscriptionForm',
        SUBSCRIPTION_SUCCESSFULL_POPUP: "subscription-success-popup",
        SUBSCRIPTION_LIST: "admin-subscription-list",
        SUBSCRIPTION_SUBMISSION_INFO: "admin-submission-info",
        SUBSCRIPTION_LIST_POPUP: "admin-subscription-list-popup",
        SUBSCRIPTION_CONFIRMATION: "admin-subscription-confirmation",
        ADD_FAQ_CATEGORY_FORM: 'add-faq-category-form',
        ADD_FAQ_QUESTION_ANSWER_ADMIN: 'faq-question-answer-admin',
        ADD_FAQ_QUESTION_ANSWER_FORM: 'faq-add-question-answer',
        USER_LOGIN: 'userLogin',
        INQUIRY_FORM: 'inquiry-form',
        INQUIRY_TABS: 'inquiry-tabs',
        INQUIRY_INFO_LIST: 'inquiry-info-list',
        RESPONSE_TAB: 'app-response',
        REPLY_POPUP: 'inquiry-reply',
        SYSTEM_OVERVIEW: 'admin-system-overview',
        CLIENT_LIST_TAB: 'clientListTab',
        HOW_TO_USE_IT: 'howToUseItTab',
        CASE_STUDY_TAB: 'caseStudyTab',
        BENEFITS_TAB: 'benefitsTab',
        CHANGE_PASSWORD: 'changePassword',
        SUBMITION_POPUP: 'submition-popup',
        TERMSANDCONDITION_POPUP: 'terms-condition-popup',
        VALIDATION_POPUP: 'validation-report-popup',
        INTORODUCTION_FLOW_TAB: 'introductionFlowTab',
        COMPANY_USING_IT_TAB: 'companyUsingItTab',
        COSTING_TAB: 'costingTab',
        TERMS_OF_USED: 'termsofUsed',
        PRIVACY_POLICY: 'privacyPolicy',
        COMPONENT_LIST: 'componentList',
        LANGUAGESETUP: 'languageSetupPopup',
        LANGUAGEMESSAGE: 'laguageJsonMessage',
        CREATE_DXR_ADMIN: 'create-dxr-admin',
        SET_DXR_ADMIN: 'set-dxr-admin',
        ROLE_DEF_ADMIN: 'role-definition-admin',
        ROLE_DEF_LIST: 'role-def-list',
        ROLE_ASSIGN: 'role-assign-popup',
        USER_MANAGEMENT_MENU: 'user-management-menu',
        USER_LIST_TAB: 'user-list',
        ADD_USER_POPUP: 'add-user-popup',
        VIEW_USER_INFO_POPUP: 'view-user-info-popup',
        DEFINE_ROLE_TAB: 'define-role-tab',
        SET_ROLE_POPUP: 'set-role-popup',
        ROLE_TAB: 'role-tab',
        MENU_ACCESS_TAB: 'menu-Access-tab',

        WASTE_DEF_MENU: 'wasteDefMenu',
        WASTE_CATEGORY_TAB: 'wasteCategoryTab',
        WASTE_CATEGORY_FORM: 'wasteCategoryForm',
        WASTE_ITEM_TAB: 'wasteItemTab',
        WASTE_ITEM_FORM: 'wasteItemForm',
        COMPANY_SETTINGS_TABS: 'company-settings-tabs',
        COMPANY_INFO_TAB: 'company-info-tab',
        COMPANY_INFO_POPUP: 'company-info-popup',
        ACCOUNT_INFO_TAB: 'account-info-tab',
        ACCOUNT_INFO_POPUP: 'account-info-popup',
        BANK_AACOUNT_INFO_POPUP: 'bank-account-info-popup',
        BRANCH_INFO_TAB: 'branch-info-tab',
        BRANCH_INFO_ADD_POPUP: 'branch-info-add-popup',
        BRANCH_INFO_VIEW_POPUP: 'branch-info-view-popup',
        VEHICLE_INFO_TAB: 'vehicle-info-tab',
        VEHICLE_INFO_ADD_POPUP: 'vehicle-info-add-popup',
        VEHICLE_INFO_VIEW_POPUP: 'vehicle-info-view-popup',
        BASE_PRICE_TAB: 'base-price-tab',
        ADD_WASTE_POPUP: 'add-waste-popup',
        PRICE_SELECTION_POPUP: 'price-selection-popup',
        DATE_TIME_DIRECTIVE: 'date-time-format',
        VIEW_LICENSE_POPUP: 'view-license-popup',
        COMPANY_MANAGEMENT_MENU: 'company-management-menu',
        SCALE_SETTING_TAB: 'scale-setting-tab',
        SCALE_SETTING_POPUP: 'scale-setting-popup',
        AGREEMENT_LIST_TAB: 'agreement-list-tab',
        AGREEMENT_TAB: 'agreement-tab',
        BUSINESS_PARTNER_TABS: 'business-partner-tabs',
        PARTNER_DETAILS_POPUP: 'partner-details-popup',
        PARTNER_LIST_TAB: 'partner-list-tab',
        SELECT_AGREEMENT_PARTNER_POPUP: 'select-agreement-partner-popup',
        SELECT_BANK_POPUP: 'select-bank-popup',
        SELECT_PERSON_IN_CHARGE_POPUP: 'select-person-inCharge-popup',
        SELECT_WASTE_POPUP: 'select-waste-popup',
        WASTE_REQUEST_FORM: 'waste-request-form',
        REQUEST_SUBMIT_POPUP: 'request-submit-popup',
        WASTE_REQUEST_TABS: 'waste-request-tabs',
        WASTE_REQUEST_LIST: 'waste-request-list-tab',
        REQUEST_RESPONSE: 'request-response-tab',
        REQUEST_REPLY_POPUP: 'request-reply-popup',
        CREATE_WASTE_TAB: 'create-waste-tab',
        SWITCH_COMPANY: 'switch-company-context',
        CATEGORY_FORM: 'categoryForm',
        CATEGORY_TAB: 'categoryTab',
        AGREEMENT_ACTION_CONFIRM_POPUP: 'agreement-action-confirm-popup',
        FAQ_VISITOR_VIEW: 'faqVisitorview',
        AGREEMENT_LIST_TAB_COMPONENT: 'AgreementListTabComponent',
        CREATE_NEW_PROJECT_TAB_COMPONENT: 'CreateNewProjectTabComponent',
        INITIATE_PROJECT_MENU_COMPONEN: 'InitiateProjectMenuComponen',
        PICK_SCHEDULE_TAB_COMPONENT: 'PickScheduleTabComponent',
        PROCEES_SCHEDULE_TAB_COMPONENT: 'ProceesScheduleTabComponent',
        PROJECT_LIST_DASH_BOARD_TAB_COMPONENT: 'ProjectListDashBoardTabComponent',
        SELECT_AGREEMENT_POPUP_COMPONENT: 'SelectAgreementPopupComponent',
        WASTE_PICK_TAB_COMPONENT: 'WastePickTabComponent',
        ADD_PICK_POPUP_COMPONENT: 'AddPickPopupComponent',
        ADD_TRIP_POPUP: 'AddTripPopupComponent',
        CREATE_SCHEDULE_MENU: 'CreateScheduleMenuComponent',
        DRIVER_BAND_VIEW_POPUP: 'DriverBandViewPopupComponent',
        DRIVER_SCHEDULE_COMPONENT: 'DriverScheduleComponent',
        PROJECT_INFO_TAB: 'ProjectInfoTabComponent',
        PROJECT_TRIP_SCHEDULE_TAB: 'ProjectTripScheduleComponent',
        SCHEDULE_DASHBOARD_TAB: 'ScheduleDashboardTabComponent',
        TRIP_DETAILS_POPUP: 'TripDetailsPopupComponent',
        VEHICLE_TRIP_MATRIX: 'VehicleTripMatrixComponent',
        VEHICLE_TRIP_SCHEDULE_TAB: 'VehicleTripScheduleComponent',
        INQUIRY_VISITOR_TABS: 'inquiryVisitorTabs',
        INQUIRY_DISCUSSION_TAB: 'inquiryDiscussionTab',
        DISCUSSION_THREAD_POPUP: 'discussionThreadPopup',
        PROJECT_ACTION_CONFIRM_POPUP: 'project-action-confirm-popup',
        COMPANY_OPERATION_MENU: 'companyOperationMenu',
        CONFIRM_SCHEDULE_POPUP: 'ConfirmSchedulePopupComponent',
        GASOLINE_TAB: "GasolineTabComponent",
        VEHICLE_TAB: "VehicleTabComponent",
        VEHICLE_SETUP_MENU: "VehicleSetupMenuComponent",
        CarbonDioxide_TabComponent: "CarbonDioxideTabComponent",
        ADD_METHODE_POPUP: "AddMethodePopupComponent",
        CO2_DEATAIL_POPUP: "Co2DetailPopupComponent",
        Co2_Tab_Component: "Co2TabComponent",
        Dumping_Operation_Tab_Component: "DumpingOperationTabComponent",
        Processing_Operation_Tab_Component: "ProcessingOperationTabComponent",
        Transporting_Operation_Tab_Component: "TransportingOperationTabComponent",
        Set_Methode_Popup_Component: "SetMethodePopupComponent",

        INVOICE_MENU: 'invoiceMenu',
        MENIFESTO_LIST: 'menifestoList',
        INVOICE_ACTION_CONFIRM_POPUP: 'invoice-action-confirm-popup',
        STATUS_ACTION_CONFIRM_POPUP: 'subscription-action-confirm-popup',
        INVITATION_FORM: 'invitation-form',
        Notification_Detail_Component: "NotificationDetailComponent",
        Notification_Component: "NotificationComponent",
        Notification_Menu_Component: "NotificationMenuComponent",
        PAGINATION: 'pagination',
        MANIFESTO_TABS: 'manifesto-tabs',
        MANUAL_MANIFESTO_TAB: 'manual-manifesto-tab',
        LOAD_MENU: 'loadMenuWeb',
        UNLOAD_MENU: 'unloadMenuWeb',
        PROCESS_COMPLETION_MENU: 'processCompletionMenu',
        GENERATED_MANIFESTO_LIST: 'generatedManifestoList',
        ADD_DISPOSAL_DATE: 'addDisposalDate',
        MANIFESTO_lIST_DIRECTIVE: 'manifestoListDirective',
        COMPANY_WASTE_COEFFICIENT_TAB: 'Company Waste Coefficient Tab',
        CONFIRM_COMPLETION_REVERT_POPUP: 'Confirm Completion Revert Popup',
        ACTION_CONFIRM_POPUP: 'action-confirm-popup',
        FORM_PROCESSING_TAB: 'formProcessingTab',
        DELETE_CONFITMATION_POPUP: 'delete-confirmation-popup',
        DATA_RESTORE_MENU: 'data-restore-menu',
        DEFAULT_COMPANY_SWITCH_COMPONENT: 'default-company-switch-component',
        COMPLETE_MANIFESTO_PROCESS_POPUP: 'complete-manifesto-process-popup',
        LOAD_HANDOVER_CODE: "LOAD_HANDOVER_CODE",
        CASH_INVOICE_POPUP: "CASH_INVOICE_POPUP",
        TARGET_COMPANY_TAB: "TARGET_COMPANY_TAB",
        CASH_MANIFESTO_TAB: "CASH_MANIFESTO_TAB",
        TRIP_CONFIRMATION_DASHBOARD: "TRIP_CONFIRMATION_DASHBOARD",
        BULK_SUBSCRIPTION: "BULK_SUBSCRIPTION",
    };
    public static Tabs = [
        {
            tabName: 'Case study',
            staticPageId: 'staticcontent0001',
            tabIndex: 0
        },
        {
            tabName: 'How to use it',
            staticPageId: 'staticcontent0002',
            tabIndex: 1
        },
        {
            tabName: 'Introduction Flow',
            staticPageId: 'staticcontent0003',
            tabIndex: 2
        },
        {
            tabName: 'Company Using it',
            staticPageId: 'staticcontent0004',
            tabIndex: 3
        },
        {
            tabName: 'Costing',
            staticPageId: 'staticcontent0005',
            tabIndex: 4
        },
        {
            tabName: 'Terms of use',
            staticPageId: 'staticcontent0006',
            tabIndex: 5
        },
        {
            tabName: 'Privacy Policy',
            staticPageId: 'staticcontent0007',
            tabIndex: 6
        },
    ];

    public static MENU_ID = {
        SYSTEM_ADMIN_MENU_ID: 'menudefSystemAdmin',
        DUMPER_ADMIN_MENU_ID: 'menudef0002',
        COMPANY_MANAGEMENT_MENU_ID: 'menudef0001',
    };

    public static MENIFESTO_FILTER_FOR_PROJECT_DASHBOARD = AppConstant.MENIFESTO_STATUS_LOADED + "|" + AppConstant.MENIFESTO_STATUS_UNLOADED + "|" + AppConstant.COMPLATED_FILTER;
    static BULK_SUBSCRIPTION: string;

    public static BI_PARTY_AGREEMENT_ROLE_CHECK_MAP: Map<string, boolean> = new Map<string, boolean>([
        [AppConstant.CATEGORY_NAME_DUMPER, false],
        [AppConstant.CATEGORY_NAME_TRANSPORTER, false],
        [AppConstant.CATEGORY_NAME_PROCESSOR, false]
    ])
}