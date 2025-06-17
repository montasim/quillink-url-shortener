const URL_CREATION_MESSAGES = {
    VALIDATION_ERROR: 'The provided data is invalid. Please check your input.',
    OWN_DOMAIN_VALIDATION_ERROR:
        'You cannot shorten a URL that points to this service.',
    URL_ALREADY_EXISTS: 'This URL has already been shortened.',
    URL_CREATED_SUCCESS: 'The short URL was created successfully.',
    INTERNAL_ERROR: 'An unexpected error occurred. Please try again later.',
};

const SHORT_URL_RETRIEVAL_MESSAGES = {
    NOT_FOUND: 'The requested short URL was not found.',
    SUCCESSFUL: 'Short URL retrieved successfully.',
};

const QR_CODE_GENERATION_MESSAGES = {
    VALIDATION_ERROR: {
        MISSING_SHORT_KEY:
            'Missing shortKey. Please provide the short key to generate the QR code.',
    },
    NOT_FOUND: 'Short URL not found for QR code generation.',
    SUCCESSFUL: 'QR code generated successfully.',
};

const URL_DELETION_MESSAGES = {
    NOT_FOUND: 'The short URL to delete was not found.',
    SUCCESSFUL: 'Short URL deleted successfully.',
};

const SINGLE_URL_DETAILS_MESSAGES = {
    NOT_FOUND: 'The details for this short URL were not found.',
    EXPIRED: 'This short URL has expired.',
    SUCCESSFUL: 'Short URL details fetched successfully.',
};

const URL_REDIRECT_MESSAGES = {
    NOT_FOUND: 'The short URL for redirection was not found.',
    EXPIRED: 'This short URL has expired and cannot be redirected.',
};

const ALL_URLS_LISTING_MESSAGES = {
    NOT_FOUND: 'No short URLs found matching your criteria.',
    SUCCESSFUL: 'All short URLs fetched successfully.',
};

const URL_VALIDATION = {
    INVALID_SHORT_KEY: 'Invalid short key format.',
};

const USER_LOGIN_MESSAGES = {
    VALIDATION_ERROR: 'Invalid request data.',
    UNAUTHORIZED:
        'Unauthorized access. Please check your email and password and try again.',
    AUTHORIZED: 'Authorized',
};

const USER_SIGNUP_MESSAGES = {
    VALIDATION_ERROR: 'Invalid request data.',
    ALREADY_EXISTS: 'Account already exists.',
    CREATED: 'Signup successful. Login to your account.',
};

const COMMON = {
    VALIDATION_REQUIRED: 'This field is required.',
    VALIDATION_ERROR: 'Invalid request data.',
};

const MESSAGES = {
    URL_CREATION_MESSAGES,
    SHORT_URL_RETRIEVAL_MESSAGES,
    QR_CODE_GENERATION_MESSAGES,
    URL_DELETION_MESSAGES,
    SINGLE_URL_DETAILS_MESSAGES,
    URL_REDIRECT_MESSAGES,
    ALL_URLS_LISTING_MESSAGES,
    URL_VALIDATION,
    USER_LOGIN_MESSAGES,
    USER_SIGNUP_MESSAGES,
    COMMON,
};

export default MESSAGES;
