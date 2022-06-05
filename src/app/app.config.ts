import { environment } from '../environments/environment';
export let config = {
    /**
     * @author Prabesh Shrestha
     * these four are the main api url
     */
    serverMainApiUrl: environment.serverMainApiUrl,
    serveMainAuthApiUrl: environment.serveMainAuthApiUrl,
    serverFileApiUrl : environment.serverMainApiUrl.concat('file/'),
    /**
     * Below all all api are the sub url that need to concate with the base url while calling
    */
    sign_up_api: 'users/merchant',
    login_api: 'realms/' + environment.realm + '/protocol/openid-connect/token',
    logout_api: 'realms/' + environment.realm + '/protocol/openid-connect/logout',
    customer_profile_fillup: 'customers',
    profile: 'merchant/profile',
    update_customer_profile: 'customers/update',
    transaction_summary_dashboard: 'transaction/preview',
    transaction_list: 'transaction/list',
    forgot_password: 'users/password-forget',
    transaction_summary_statement: 'customers/statement',
    country_dropdown_list: 'countries/dropdown',
	industry_dropdown_list: 'merchant/dropdown/industry',
    state_dropdown_list: 'states/dropdown',
    district_dropdown_list: 'districts/dropdown',
    city_dropdown_list: 'cities/dropdown',
    education_dropdown_list: 'education-qualification/dropdown',
    account_submission: 'customers/acc-submit',

	//MERCHANT API
	API_PROFILE_ADD: 'merchant/profile',
	API_PROFILE_DETAILS: 'merchant/profile',
	API_MERCHANT_DASHBOARD: 'merchant/dashboard',
	API_MERCHANT_PAYMENT_LIST: 'merchant/transaction/filter',
	API_MERCHANT_REFUND_LIST: 'merchant/refunds/filter',
	API_MERCHANT_SETTLEMENT_LIST: 'merchant/settlements/filter',
	API_SETTLEMENT_CREATE: 'merchant/settlements',
	API_MERCHANT_PAYMENT_PREVIEW: 'merchant/transaction/',
	API_MERCHANT_PAYMENT_REFUND: 'merchant/refunds',
	API_PAGE_SETUP_ADD: 'merchant/paymentGateway/page',
	API_PAGE_SETUP_UPDATE: 'merchant/paymentGateway/page/',
	API_PAGE_SETUP_DISPLAY_UPDATE: 'merchant/paymentGateway/page/displayControl',
	API_GENERATE_CREDENTIAL: 'merchant/appCredential',
	API_PAYMENT_GATEWAY_LIST: 'merchant/paymentGateway/page/filter',
	API_APP_CREDENTIAL_LIST: 'merchant/appCredential/filter',
	API_PAGE_SETUP_PREVIEW: 'merchant/paymentGateway/page',
	API_CUSTOMERS_LIST: 'merchant/paymentGateway/customer/filter',
	API_DROPDOWN_SETTLEMENT_STATUS: 'merchant/dropdown/settlementStatus',
	API_DROPDOWN_ENROLLMENT_STATUS: 'merchant/dropdown/enrollmentStatus',
	API_PAYMENT_GATEWAY_UPDATE_CREDENTIAL: 'merchant/appCredential',

    /**
     * OTP validation
     */
    get_verification_code: 'users/get-verification-code/mobile',
    verify_mobile: 'users/verify/mobile',
    loan_request: 'loans',

    // flagged field detection
    detect_flagged_field: 'customers/kyc-verify/flagged/data',

    request_to_be_an_agent: 'customers/request-to-be-agent',

}
