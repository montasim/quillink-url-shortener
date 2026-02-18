const REGEX_PATTERNS = Object.freeze({
    SHORT_KEY: /^[a-zA-Z0-9]{7}$/,
    CUSTOM_SLUG: /^[a-zA-Z0-9_-]{1,50}$/,
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    UPPERCASE: /[A-Z]/,
    LOWERCASE: /[a-z]/,
    NUMBER: /[0-9]/,
    SPECIAL_CHARACTER: /[@$!%*?&#]/,

    // Added new regex patterns for number-related validations
    NUMBERS_ONLY: /^\d+$/,
    FLOAT_STRING: /^-?\d+(\.\d+)?$/,
    POSITIVE_INTEGER_STRING: /^(0|[1-9]\d*)$/,
    ENGLISH_LETTERS_ONLY: /^[a-zA-Z]+$/,
    ENGLISH_LETTERS_AND_SPACES: /^[a-zA-Z\s]+$/,
    ENGLISH_ALPHANUMERIC_ONLY: /^[a-zA-Z0-9]+$/,

    // You might also want a regex for general alphanumeric strings if needed
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
    ALPHANUMERIC_WITH_SPACES: /^[a-zA-Z0-9\s]+$/,

    // Bengali (Bangla) letter regex patterns (assuming you're also including these)
    BENGALI_LETTERS_ONLY: /^\p{Script=Bengali}+$/u,
    BENGALI_LETTERS_AND_SPACES: /^\p{Script=Bengali}[\p{Script=Bengali}\s]*$/u,
    BENGALI_ALPHANUMERIC: /^[০-৯\p{Script=Bengali}]+$/u,
    BENGALI_ALPHANUMERIC_AND_SPACES: /^[০-৯\p{Script=Bengali}\s]+$/u,
} as const);

export default REGEX_PATTERNS;
