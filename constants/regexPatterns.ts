const REGEX_PATTERNS = Object.freeze({
    SHORT_KEY_REGEX: /^[a-zA-Z0-9_-]{7}$/,
    EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    UPPERCASE_REGEX: /[A-Z]/,
    LOWERCASE_REGEX: /[a-z]/,
    NUMBER_REGEX: /[0-9]/,
    SPECIAL_CHARACTER_REGEX: /[@$!%*?&#]/,
} as const);

export default REGEX_PATTERNS;
