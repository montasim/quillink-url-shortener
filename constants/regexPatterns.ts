const SHORT_KEY_REGEX = /^[a-zA-Z0-9_-]{7}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_CHARACTER_REGEX = /[@$!%*?&#]/;

const REGEX_PATTERNS = {
    SHORT_KEY_REGEX,
    EMAIL_REGEX,
    UPPERCASE_REGEX,
    LOWERCASE_REGEX,
    NUMBER_REGEX,
    SPECIAL_CHARACTER_REGEX,
};

export default REGEX_PATTERNS;
