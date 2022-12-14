import {
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { CompanyCategorySelection, CompanyPaymentMethodSelection } from "../models/backend-fetch/business-agreement";
import { ProjectStatusFilter } from "../models/backend-fetch/initiate-project-fetch";

export class AppConstant {
    // public static BANK_PAYMENT_MODE = "B";
    // public static CASH_PAYMENT_MODE = "C";

    // public static PAYMENT_METHOD_FILTER = [
    //     {
    //         titleKey: 'bankPayment',
    //         value: AppConstant.BANK_PAYMENT_MODE
    //     },
    //     {
    //         titleKey: 'cashPayment',
    //         value: AppConstant.CASH_PAYMENT_MODE
    //     }
    // ];

    // public static MAX_INVOICE_TARGET_COMPANY = 1;

    // public static AGREEMENT_PARTNER_PAYMENT_METHOD: CompanyPaymentMethodSelection[] = [
    //     {
    //         methodId: '1',
    //         title: 'Bank',
    //         isSelected: false
    //     },
    //     {
    //         methodId: '2',
    //         title: 'Cash',
    //         isSelected: false
    //     }
    // ];

    // // public static LOAD_UNLOAD_FILTER_ID = "loadUnloadUI";

    // public static MATCH_LOAD_MENU_WEB = '\"loadMenuWeb\"';
    // public static MATCH_UNLOAD_MENU_WEB = '\"unloadMenuWeb\"';

    // public static USER_MANAGEMENT_MENU_ID = "menudef00012";
    // public static DATA_RESTORE_MENU_ID = "dataRestoreMenu";

    // public static LOAD_UNLOAD_FILTER_ID = "loadUnloadUI";
    // public static LOAD_UNLOAD_FILTER_DEF: ProjectStatusFilter = {
    //     statusId: "loadUnloadUI",
    //     statusTitle: "tripStatusLabel",
    //     isSelected: true
    // }

    // public static TRIP_CONFIRMATION_DASHBOARD_FILTER_DEF: ProjectStatusFilter = {
    //     statusId: "tripConfirmationDashboardUi",
    //     statusTitle: "tripStatusLabel",
    //     isSelected: true
    // }

    public static TRUE_STATEMENT = "1";
    public static FALSE_STATEMENT = "0";



    // public static LOAD_MENU_ID_STRING = "\"loadMenu\"";
    // public static UNLOAD_MENU_ID_STRING = "\"unloadMenu\"";
    // public static LOAD_OP = 'loadOp';
    // public static UNLOAD_OP = 'unloadOp';

    // public static TRANSPORTER_INVOICE = 'tranporter-invoice';
    // public static PROCESSOR_INVOICE = 'processor-invoice';

    // public static MAX_AGREEMENT_PARTNER = 2;

    // public static MULTIPLE_OVERLAPPED_TRIP_FLAG = "00000";

    // public static CREATE_SCHEDULE_MENU_ID = 'projectScheduleMenu';
    // public static AGREEMENT_COMPANY_CATEGORY_IDS = ['1', '2', '3'];


    // public static HIDE_AGREEMENT_OPERATION_FILTER_DROPDOWN = true;
    // public static HIDE_PROJECT_OPERATION_FILTER_DROPDOWN = true;

    // public static LANGUAGE_DEF_LOCALSTORAGE_KEY = "languageDef";

    // public static REMOVED_USER_COOKIE_KEY = "removedUser";
    // public static REMOVED_COMPANY_COOKIE_KEY = "removedCompany";

    public static COMPANY_LOGOUT = "company-logout";
    public static USER_LOGOUT = "user-logout";

    public static LOGGED_USER_COOKIE_KEY = "dxrUsers";
    public static BROWSER_SESSION_KEY = "browserSession";

    // public static DUMPER_ADMIN_OUTLET = 'dumperAdminOutlet';
    // public static COMPANY_ADMIN_OUTLET = 'companyAdminOutlet';
    // public static SYSTEM_ADMIN_OUTLET = 'dxrSysAdminOutlet';

    // public static HIDE_SECONDARY_MENU = true;

    // public static PROCESS_COMPELETION_MENU_ID = "processCompletionMenu";
    // public static LOAD_MENU_ID = "loadMenuWeb";
    // public static UNLOAD_MENU_ID = "unloadMenuWeb";

    // public static ROLE_COMPANY_ADMIN_ID = "roledef0001"
    // public static ROLE_PERSON_IN_CHARGE_DUMPER = "roledef0002";

    // public static ROLE_PERSON_IN_CHARGE_TRANSPORTER = "roledef0003";

    // public static ROLE_PERSON_IN_CHARGE_PROCESSOR = "roledef0004";

    // public static ROLE_DRIVER = "roledef0005";

    // public static ROLE_RECEPTION_MANAGER_PROCESSOR = "roledef0006";

    // public static ROLE_COMPANY_ACCOUNTANT = "roledef0007";

    // public static ROLE_RECEIVING_MANAGER_PROCESSOR = "roledef0008";

    // public static ROLE_TEMPORARY_USER = "roledef0009";

    // public static ROLE_REFERENCE_USER = "roledef0010";

    // public static MONTH_DATE_ARRAY: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // public static MONTH_NUMBER_ARRAY: string[] = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    // public static VALID_PICK_INFO = "0";
    // public static INVALID_TRIP_TIME = "1";
    // public static INVALID_DRIVER = "2";
    // public static INVALID_PICK_QUANTITY = "3";
    // public static NEW_WASTE = "1";
    // public static EXISTING_WASTE = "0";

    // public static SUCCESS_RESPONSE_FROM_BACKEND = '1';

    // public static MONTH_ARRAY: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // public static OPERATION_WISE_CO2_FILTER = "001";
    // public static PROJECT_WISE_CO2_FILTER = "002";


    // public static MANIFESTO_REPORT_FILE_NAME = "final_manifesto_report_2022-07-25.rptdesign";
    // public static MANIFESTO_REPORT_TYPE = "final_manifesto_report.pdf";

    // public static REMOVED_TOAST: any = {
    //     eng: 'Item has been removed',
    //     jpn: 'Item has been removed'
    // }



    // public static PROCESSOR_MOBILE_MENU_REDIRECT_INFO = {
    //     parentSegment: '/unload',
    //     url: 'processor-trip-scan',
    //     outlet: 'unloadOutlet'
    // };

    // public static SUBSCRIPTION_NOTIFICAIONT_ID = "notificationType001";

    // public static INQUIRY_NOTIFICAIONT_ID = "notificationType002";

    // public static WASTE_REQUEST_NOTIFICAIONT_ID = "notificationType003";

    // public static AGREEMENT_NOTIFICAIONT_ID = "notificationType004";

    // public static PROJECT_NOTIFICAIONT_ID = "notificationType005";

    // public static PROJECT_SCHEDULE_NOTIFICAIONT_ID = "notificationType006";

    // public static INVOICE_NOTIFICAIONT_ID = "notificationType007";

    // public static MANIFESTO_NOTIFICAIONT_ID = "notificationType008";

    // public static DXR_SYSTEM_ADMIN_MENU_ID = "menudefSystemAdmin";
    // public static COMPANY_ADMIN_MENU_ID = "menudef0002";

    // public static Subscription_Menu_Id = "sysAdminSubscription";
    // public static Inquiry_Menu_Id = "sysAdminInquiry";
    // public static Waste_Request_Menu_Id = "sysAdminWasteRequest";
    // public static Agreement_Menu_Id = "menudefBusinessAgreement";
    // public static Project_Menu_Id = "initiateProject";
    // public static Schedule_Menu_Id = "projectScheduleMenu";
    // public static Invoice_Menu_Id = "invoiceMenu";
    // public static Menifesto_Menu_Id = "menifestoMenu";

    // public static PICK_STATUS_LOADED = "1";
    // public static PICK_STATUS_UNLOADED = "2";

    // public static MANIFESTO_TYPE_GENERATED = 'menifestoType0001';
    // public static MANIFESTO_TYPE_MANUAL = 'menifestoType0002';

    // public static DISPOSE_WISE_SCHEDULE_CONFIRM_NOT_DONE = "0";
    // public static DISPOSE_WISE_SCHEDULE_CONFIRM_DONE = "1";

    // public static PROJECT_SCHEDULE_CONFIRM_NOT_DONE = "0";
    // public static PROJECT_SCHEDULE_CONFIRM_DONE = "1";

    // public static MENIFESTO_STATUS_LOADED = "1";
    // public static MENIFESTO_STATUS_UNLOADED = "2";
    // public static MENIFESTO_PROCESSING_COMPLETE_STATUS = "3";

    // public static MENIFESTO_PROGRESS_FILTER = AppConstant.MENIFESTO_STATUS_LOADED + "|" + AppConstant.MENIFESTO_STATUS_UNLOADED;
    // public static PROCESS_COMPLETE_PROGRESS_FILTER = AppConstant.MENIFESTO_STATUS_UNLOADED;
    // public static COMPLATED_FILTER = AppConstant.MENIFESTO_PROCESSING_COMPLETE_STATUS;

    // public static INITIAL_PROJECT_STATUS = 'statusProjectInUse|statusNewProject'
    // public static AGREEMENT_INITIALLY_SELECTED_STATUS = 'statusNewAgreement';

    // public static INITIAL_PAGE_NO = 0;
    // public static INITIAL_SEARCH_TEXT = '';
    // public static INITIAL_SEARCH_STATUS = '';

    // public static REQUEST_INITIAL_FILTER = 'New';
    // public static NEW_FILTER = '0';
    // public static REPLIED_FILTER = '1';

    // public static INQUIRY_INITIAL_FILTER = 'Unanswered';
    // public static ANSWERED_FILTER = '1';
    // public static UNANSWERED_FILTER = '0';

    // public static RHIRD_LABEL_VIEW = false;

    // public static Data_Ends_Label = 'No more data found...';
    // public static DXR_LIST_VIEW_PAGE_SIZE = 10;

    // public static SUBSCRIPTION_NEW_COMPANY_STATUS = "statusInUse";
    // public static SUBSCRIPTION_TEMPORARY_COMPANY_STATUS = "statusTemporaryUse";

    // public static SUBSCRIPTION_SUSPENSION_STATUS = "statusSuspended";

    // public static SUBSCRIPTION_REJECTION_STATUS = "statusRejected";

    // public static SUBSCRIPTION_ACCEPT_STATUS = "Accept";
    // public static SUBSCRIPTION_PROCESS_ACCESS_NONE = "none";
    // public static SUBSCRIPTION_INITIAL_STATUS = "statusWaitingForConfirmation"
    // public static PROJECR_TERMINATE_OPERATION_ID = "opTermination";
    // public static PROJECR_TERMINATE_STATUS_ID = "statusTerminationReadyForApprove";

    // public static PROJECR_COMPLETION_OPERATION_ID = "opCompletion";
    // public static PROJECR_COMPLETION_READY_FOR_APPROVE_STATUS_ID = "statusCompletionWaitingForApproval";

    // public static AGREEMENT_CANCELED_OPERATION_ID = "opCancelation";
    // public static AGREEMENT_CANCELED_STATUS_ID = "statusAgreementCanceled";
    // public static AGREEMENT_REVIVE_READY_FOR_SEND_OPERATION_ID = "opRevive";
    // public static AGREEMENT_REVIVE_READY_FOR_SEND_STATUS_ID = "statusReviveReadyForSend";

    // public static DXR_COMPANY_ID = "dxr00001";

    public static COOKIE_EXPIRE_DATE = "Thu, 01 Jan 1970 00:00:00 GMT";
    public static COOKIE_EXPIRE_MONTH = 1;

    // public static PROJECT_STATUS_FOR_CREATE_SCHEDULE_BUTTON = "statusWaitingForAproval|";
    // public static INVOICE_PROCESS_ACCESS_NONE = "none";
    // public static INVOICE_PROCESS_ACCESS_VIEW = "view";
    // // public static INVOICE_PROCESS_ACCESS_EDIT = "edit";

    // public static MONTH: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // public static MONTH_JPN: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

    // public static DUMPER_EMISSION_TYPE_METHODE_ID = "emimissionTypeId001";
    // public static PROCESSING_EMISSION_TYPE_METHODE_ID = "emimissionTypeId002";

    // public static MOBILE_MENU_IDS = "homeMenu|loadMenu|dashboardMenu|pickListMenu|packageScanMenu|tripScanMenu|packageDefMenu|handoverMenu|unloadMenu|unloadDashboardMenu|handoverByDriverMenu|tripCompletionMenu|tripInfoScanByProcessorMenu|verificationMenu|weightDeclarationMenu|wasteReceiveMenu|";
    // // loadMenuWeb| unloadMenuWeb |

    // public static REPORT_FILE_FORMAT_PDF = "pdf";


    // public static APPROVAL_REQUIRED_STATUS_OF_PROJECT: string[] = ["statusWaitingForAproval", "statusWaitingForAmmendmentApprove", "statusCancelationReadyForApprove", "statusSuspensionReadyForApprove", "statusReviveReadyForApprove"];

    // public static PROJECT_STATUS_NEW = 'statusNewProject';
    // public static PROJECT_STATUS_IN_USE = 'statusProjectInUse';

    // public static PROJECT_OPERATION_TITLE_ENG = "operationTitleEng";
    // public static PROJECT_OPERATION_TITLE_JPN = "operationTitleJpn";

    // public static PROJECT_PROCESS_ACCESS_NONE = "none";
    // public static PROJECT_PROCESS_ACCESS_VIEW = "view";
    // public static PROJECT_PROCESS_ACCESS_EDIT = "edit";

    // public static AGREEMENT_OPERATION_TITLE_ENG = "operationTitleEng";
    // public static AGREEMENT_OPERATION_TITLE_JPN = "operationTitleJpn";

    // public static USER_TYPE_ADMIN = 'Admin';
    // public static USER_TYPE_VISITOR = 'Visitor';

    // public static COMPANY_CATEGORY_LIST: any = [
    //     {
    //         "id": "1",
    //         "eng": "Dumper",
    //         "jpn": "排出事業者"
    //     },
    //     {
    //         "id": "3",
    //         "eng": "Transporter",
    //         "jpn": "運搬事業者"
    //     },
    //     {
    //         "id": "2",
    //         "eng": "Processor",
    //         "jpn": "処理事業者"
    //     }
    // ];

    // public static APPROVAL_REQUIRED_STATUS_OF_AGREEMENT: string[] = ["statusWaitingForAproval", "statusWaitingForTerminationApprove", "statusCompletionForApprove"];

    // public static AGREEMENT_STATUS_NEW = 'statusNewAgreement';
    // public static AGREEMENT_STATUS_IN_USE = 'statusAgreementInUse';

    // public static COMPANY_CATEGORY_TITLE_ENG = "eng";
    // public static COMPANY_CATEGORY_TITLE_JPN = "jpn";

    // public static COMPANY_CATEGORY_NAME: any = {
    //     "Dumper": {
    //         "eng": "Dumper",
    //         "jpn": "Dumper"
    //     },
    //     "Transporter": {
    //         "eng": "Transporter",
    //         "jpn": "Transporter"
    //     },
    //     "Processor": {
    //         "eng": "Processor",
    //         "jpn": "Processor"
    //     },
    //     "1": {
    //         "eng": "Dumper",
    //         "jpn": "Dumper"
    //     },
    //     "3": {
    //         "eng": "Transporter",
    //         "jpn": "Transporter"
    //     },
    //     "2": {
    //         "eng": "Processor",
    //         "jpn": "Processor"
    //     }
    // }


    // public static PROCESS_TITLE_KEY_ENG = 'processTitleEng';
    // public static PROCESS_TITLE_KEY_JPN = 'processTitleJpn';

    // public static ACTION_TITLE_KEY_ENG = 'actionTitleEng';
    // public static ACTION_TITLE_KEY_JPN = 'actionTitleJpn';

    // public static STATUS_TITLE_KEY_ENG = 'statusTitleEng';
    // public static STATUS_TITLE_KEY_JPN = 'statusTitleJpn';

    // public static AGREEMENT_PROCESS_ACCESS_NONE = "none";
    // public static AGREEMENT_PROCESS_ACCESS_VIEW = "view";
    // public static AGREEMENT_PROCESS_ACCESS_EDIT = "edit";



    // public static USE_SAVED_BANK_ACCOUNT = 'savedAccount';
    // public static USE_OTHER_BANK_ACCOUNT = 'otherAccount';

    // public static JAPANESE_CURRENCY_SIGN = '¥';

    // public static MENU_CATEGORY_COMPANY_MANAGEMENT = 'menucat001';
    // public static MENU_CATEGORY_COMPANY_OPERATIONS = 'menucat002';
    // public static ADMIN = "Admin";
    public static USER_CATEGORY_ADMIN = "usercategory0001";
    public static USER_CATEGORY_GENERAL_USER = "usercategory0002";
    // public static DUMPER_CATEGORY_VALUE_ID = "1";
    // public static PROCESSOR_CATEGORY_VALUE_ID = "2";
    // public static TRANSPOTER_CATEGORY_VALUE_ID = "3";
    public static MENU_TYPE_PRIMARY = "menutype0001";
    public static MENU_TYPE_SECONDARY = "menutype0002";

    // public static MENU_TYPE_NAME_PRIMARY = "Primary Menu";
    // public static MENU_TYPE_NAME_SECONDARY = "Secondary Menu";

    public static PASSWORD_NOT_MATCHED_FLAG = '0';
    public static PASSWORD_MATCHED_FLAG = '1';
    public static PASSWORD_LENGTH_NOT_MATCHED_FLAG = '2';
    public static PASSWORD_LENGTH_MATCHED_FLAG = '1';

    public static SELECTED_COMPANY_ID_KEY = 'companyId';

    // public static COMPANYADDRESS = 'Company Address : ';
    // public static BRANCHADDRESS = 'Branch';

    // public static PAYMENT_MODE = ['Cash', 'Bank Transfer'];
    // public static PAYMENT_MODE_CASH = 'Cash';
    // public static PAYMENT_MODE_BANK_TRANSFER = 'Bank Transfer';

    // public static GASOLINE_TYPE = ['Regular (petrol)', 'Diesel', 'High Octane', 'CNG', 'Electric'];
    // public static GASOLINE_TYPE_PETROL = 'Regular (petrol)';
    // public static GASOLINE_TYPE_DIESEL = 'Diesel';
    // public static GASOLINE_TYPE_OCTANE = 'High Octane';
    // public static GASOLINE_TYPE_CNG = 'CNG';
    // public static GASOLINE_TYPE_ELECTRIC = 'Electric';

    // public static CATEGORY_NAME_DUMPER = 'Dumper';
    // public static CATEGORY_NAME_TRANSPORTER = 'Transporter';
    // public static CATEGORY_NAME_PROCESSOR = 'Processor';

    // public static SUBSCRIPTION_INITIAL_SUBMIT_STATUS = '00000';
    // public static CACHE_DEFAULT_DATE = '00000000000000'
    // public static URL_DIRECTION_GET = 'get';
    // public static URL_DIRECTION_SAVE = 'save';



    public static USER_ID_OR_PASSWORD_NOT_MATCH_FLAG = "0";
    // public static ONE_TIME_ACCESS_FLAG_TRUE = "1";
    // public static ONE_TIME_ACCESS_FLAG_FALSE = "0";

    // public static CONTROL_NAME_ENGLISH = 'controlNameEng';
    // public static CONTROL_NAME_JAPANESE = 'controlNameJpn';
    // public static INAVALID_MESSAGE_KEY_ENGLISH = 'invalidMsgEng';
    // public static INAVALID_MESSAGE_KEY_JAPANESE = 'invalidMsgJpn';
    // public static SAMPLE_VALUE_KEY_ENGLISH = 'sampleValueEng';
    // public static SAMPLE_VALUE_KEY_JAPANESE = 'sampleValueJpn';
    // public static SNACKBAR_HORIZONTAL_POSITION: MatSnackBarHorizontalPosition = 'center';
    // public static SNACKBAR_VERTICAL_POSITION: MatSnackBarVerticalPosition = 'top';
    // public static SNACKBAR_TIME_DURATION = 2 * 1000;
    // public static COMPANY_CATEGORY = ['Dumper', 'Transporter', 'Processor'];
    public static AUTH_ID_KEY = "auth-id";
    public static AUTH_PASS_KEY = "auth-pass"
    public static DXR_AUTH_ID = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqWV9jSRh/Rm9MYMdnCfneNWIS8qB04vGtXlWqbEzvnlJkeTd908Nz/u0ZAAqWusLnrfO5ndp32QmyrbnM9TPrw2Dn+BeeXWVb2v2VM7hEJ35H+UMEJvTZNuE/udg9pIsc+u465xvUXbMbPe3/1jGQaXpTsRDoShjLPDEIYvfsXOxYTW2ZZ3P7mKQBJcEthcbcwWjbm2JnD4sRBZo6CY+5l8pCXrtZoYmRmcZO0E9YiDDvhfRbLfwnsuuSsAc5/nSirBzS0hf9DzOBRCZQfBZauZlhosQm/uFToEKs2NkwAVuhC/AZqPJcmt/8vo6VNZSF4uQ1rstqkKWcIGWgw8iXQIDAQAB";
    public static HTTP_GET = 'GET';
    public static HTTP_POST = 'POST';
    public static HTTP_DELETE = 'DELETE';
    // public static UI_MENU_LIST = 'menus';
    // public static ENGLISH_MENU_TITLE = 'menuTitleEng';
    // public static JAPANESE_MENU_TITLE = 'menuTitleJpn';
    // public static BASE_URL: string = 'http://192.168.68.104:8000/web';
    // public static MY_BASE_URL: string = 'http://192.168.68.104:8000/web';
    // // public static BASE_URL: string = 'http://100.24.84.98:9000/web';
    // // public static BASE_URL: string = 'http://172.31.95.49:9000/web';
    // public static ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    public static EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // public static CONTACT_NO_REGEX = /^\+\d{10}$/;
    // public static ZIP_CODE_REGEX = /^[0-9]{3}([- /]?[0-9]{4})?$/;
    // public static LANG_INDEX_ENG = 'eng';
    // public static LANG_INDEX_JPN = 'jpn';
    // public static UI_LABEL_TEXT = 'labels';
    // public static UI_MESSAGE_TEXT = 'messages';
    // public static UI_NOTIFICATION_TEXT = 'notifications';
    // public static ADD_OP = 'addItem';
    // public static EDIT_OP = 'editItem';



    // public static MENU_ID = {
    //     SYSTEM_ADMIN_MENU_ID: 'menudefSystemAdmin',
    //     DUMPER_ADMIN_MENU_ID: 'menudef0002',
    //     COMPANY_MANAGEMENT_MENU_ID: 'menudef0001',
    // };

    // public static MENIFESTO_FILTER_FOR_PROJECT_DASHBOARD = AppConstant.MENIFESTO_STATUS_LOADED + "|" + AppConstant.MENIFESTO_STATUS_UNLOADED + "|" + AppConstant.COMPLATED_FILTER;
    // static BULK_SUBSCRIPTION: string;

    // public static BI_PARTY_AGREEMENT_ROLE_CHECK_MAP: Map<string, boolean> = new Map<string, boolean>([
    //     [AppConstant.CATEGORY_NAME_DUMPER, false],
    //     [AppConstant.CATEGORY_NAME_TRANSPORTER, false],
    //     [AppConstant.CATEGORY_NAME_PROCESSOR, false]
    // ])
}