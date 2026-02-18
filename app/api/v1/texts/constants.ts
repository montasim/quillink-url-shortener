const CONSTANTS = Object.freeze({
    TEXT_SHARE_CREATION_LIMIT: {
        GUEST: 10,
        USER_WITHOUT_SUBSCRIPTION: 20,
    },
    MAX_CONTENT_LENGTH_KB: 100,
    MAX_VIEW_LIMIT: 1000,
} as const);

export default CONSTANTS;
