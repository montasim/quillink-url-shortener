const MESSAGES = Object.freeze({
    URL_CREATION: {
        VALIDATION_ERROR:
            'The provided types is invalid. Please check your input.',
        OWN_DOMAIN_ERROR:
            'You cannot shorten a URL that points to this service.',
        ALREADY_EXISTS: 'This URL has already been shortened.',
        SUCCESS: 'The short URL was created successfully.',
        INTERNAL_ERROR: 'An unexpected error occurred. Please try again later.',
        NEED_LOGIN: 'Limit reached. Sign in to create more.',
        NEED_SUBSCRIPTION: 'Limit reached. Sign in to create more.',
    },

    URL_RETRIEVAL: {
        NOT_FOUND: 'The requested short URL was not found.',
        SUCCESS: 'Short URL retrieved successfully.',
    },

    QR_CODE_GENERATION: {
        MISSING_SHORT_KEY:
            'Missing shortKey. Please provide the short key to generate the QR code.',
        NOT_FOUND: 'Short URL not found for QR code generation.',
        SUCCESS: 'QR code generated successfully.',
    },

    URL_DELETION: {
        NOT_FOUND: 'The short URL to delete was not found.',
        SUCCESS: 'Short URL deleted successfully.',
    },

    SINGLE_URL_DETAILS: {
        NOT_FOUND: 'The details for this short URL were not found.',
        EXPIRED: 'This short URL has expired.',
        SUCCESS: 'Short URL details fetched successfully.',
    },

    URL_REDIRECT: {
        NOT_FOUND: 'The short URL for redirection was not found.',
        EXPIRED: 'This short URL has expired and cannot be redirected.',
    },

    ALL_URLS_LISTING: {
        NOT_FOUND: 'No short URLs found matching your criteria.',
        SUCCESS: 'All short URLs fetched successfully.',
    },

    URL_VALIDATION: {
        INVALID_SHORT_KEY_FORMAT: 'Invalid short key format.',
    },

    USER_LOGIN: {
        VALIDATION_ERROR: 'Invalid request types.',
        UNAUTHORIZED: 'Invalid email or password. Please try again.',
        SUCCESS: 'Login successful.',
    },

    USER_SIGNUP: {
        VALIDATION_ERROR: 'Invalid request types.',
        ALREADY_EXISTS: 'An account with this email already exists.',
        SUCCESS: 'Signup successful. You can now log in.',
    },

    GOOGLE_AUTH: {
        MISSING_CODE: 'Missing authorization code from Google.',
        TOKEN_EXCHANGE_FAILED:
            'Failed to exchange authorization code for tokens.',
        PROFILE_FETCH_FAILED: 'Failed to fetch user profile from Google.',
        UPSERT_FAILED: 'Failed to process Google user profile.',
        INTERNAL_ERROR:
            'An internal error occurred during Google authentication. Please try again.',
        SUCCESS: 'Google authentication successful.',
    },

    AUTHENTICATION: {
        UNAUTHORIZED: 'Unauthorized access. Please log in.',
        INVALID_TOKEN: 'Invalid token. Please log in again.',
        NO_TOKEN_PROVIDED: 'Authentication token not provided.',
        SUCCESS: 'Authentication successful.',
    },
    REFRESH_TOKEN: {
        NO_TOKEN_PROVIDED: 'No refresh token provided.',
        UNAUTHORIZED: 'Invalid refresh token. Please log in again.',
        SUCCESS: 'Token refreshed successfully.',
    },

    ME_HANDLER: {
        UNAUTHORIZED: 'Unauthorized access to user profile.',
        SUCCESS: 'User profile retrieved successfully.',
    },

    LOGOUT_HANDLER: {
        SUCCESS: 'Logged out successfully.',
    },

    COMMON: {
        VALIDATION_REQUIRED: 'This field is required.',
        VALIDATION_ERROR: 'Invalid request types provided.',
        INTERNAL_SERVER_ERROR: 'An unexpected internal server error occurred.',
    },
} as const);

export default MESSAGES;
